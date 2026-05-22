<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: https://radio.kesug.com");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");

session_start();
require_once "conexion.php";

// Verificar que el usuario esté loggeado
if (!isset($_SESSION["IdUsuario"])) {
    echo json_encode(["ok" => false, "mensaje" => "No autorizado."]);
    exit;
}

$idUsuario = $_SESSION["IdUsuario"];
$accion    = $_GET["accion"] ?? "";

// ── CARGAR favoritos del usuario ──────────────────────────
if ($accion === "cargar") {
    $stmt = $pdo->prepare("
        SELECT f.IdFavorito, e.Nombre, e.Stream_url, e.Genero, c.Nombre AS Ciudad, p.Nombre AS Pais
        FROM Favoritos f
        JOIN Estaciones e ON f.IdEstacion = e.IdEstacion
        JOIN Ciudades   c ON e.IdCiudad   = c.IdCiudad
        JOIN Pais       p ON c.IdPais     = p.IdPais
        WHERE f.IdUsuario = ?
        ORDER BY f.FechaAgregado DESC
    ");
    $stmt->execute([$idUsuario]);
    $favoritos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["ok" => true, "favoritos" => $favoritos]);
    exit;
}

// ── GUARDAR favorito ──────────────────────────────────────
if ($accion === "guardar") {
    $datos      = json_decode(file_get_contents("php://input"), true);
    $nombre     = trim($datos["nombre"]    ?? "");
    $stream_url = trim($datos["streamUrl"] ?? "");
    $genero     = trim($datos["genero"]    ?? "");
    $ciudad     = trim($datos["ciudad"]    ?? "Desconocida");
    $pais       = trim($datos["pais"]      ?? "Desconocido");

    if (empty($nombre) || empty($stream_url)) {
        echo json_encode(["ok" => false, "mensaje" => "Datos incompletos."]);
        exit;
    }

    // Buscar o crear el Pais
    $stmtP = $pdo->prepare("SELECT IdPais FROM Pais WHERE Nombre = ?");
    $stmtP->execute([$pais]);
    $filaPais = $stmtP->fetch(PDO::FETCH_ASSOC);
    if ($filaPais) {
        $idPais = $filaPais["IdPais"];
    } else {
        $pdo->prepare("INSERT INTO Pais (Nombre, CodigoISO) VALUES (?, ?)")
            ->execute([$pais, strtoupper(substr($pais, 0, 3))]);
        $idPais = $pdo->lastInsertId();
    }

    // Buscar o crear la Ciudad
    $stmtC = $pdo->prepare("SELECT IdCiudad FROM Ciudades WHERE Nombre = ? AND IdPais = ?");
    $stmtC->execute([$ciudad, $idPais]);
    $filaCiudad = $stmtC->fetch(PDO::FETCH_ASSOC);
    if ($filaCiudad) {
        $idCiudad = $filaCiudad["IdCiudad"];
    } else {
        $pdo->prepare("INSERT INTO Ciudades (IdPais, Nombre) VALUES (?, ?)")
            ->execute([$idPais, $ciudad]);
        $idCiudad = $pdo->lastInsertId();
    }

    // Buscar o crear la Estacion
    $stmtE = $pdo->prepare("SELECT IdEstacion FROM Estaciones WHERE Stream_url = ?");
    $stmtE->execute([$stream_url]);
    $filaEst = $stmtE->fetch(PDO::FETCH_ASSOC);
    if ($filaEst) {
        $idEstacion = $filaEst["IdEstacion"];
    } else {
        $pdo->prepare("INSERT INTO Estaciones (IdCiudad, Nombre, Stream_url, Genero) VALUES (?, ?, ?, ?)")
            ->execute([$idCiudad, $nombre, $stream_url, $genero]);
        $idEstacion = $pdo->lastInsertId();
    }

    // Verificar que no esté ya en favoritos
    $stmtF = $pdo->prepare("SELECT IdFavorito FROM Favoritos WHERE IdUsuario = ? AND IdEstacion = ?");
    $stmtF->execute([$idUsuario, $idEstacion]);
    if ($stmtF->rowCount() > 0) {
        echo json_encode(["ok" => false, "mensaje" => "Ya está en favoritos."]);
        exit;
    }

    // Insertar en Favoritos
    $pdo->prepare("INSERT INTO Favoritos (IdUsuario, IdEstacion) VALUES (?, ?)")
        ->execute([$idUsuario, $idEstacion]);

    echo json_encode(["ok" => true, "mensaje" => "Agregado a favoritos."]);
    exit;
}

// ── ELIMINAR favorito ─────────────────────────────────────
if ($accion === "eliminar") {
    $datos       = json_decode(file_get_contents("php://input"), true);
    $idFavorito  = intval($datos["idFavorito"] ?? 0);

    if (!$idFavorito) {
        echo json_encode(["ok" => false, "mensaje" => "ID inválido."]);
        exit;
    }

    // Solo puede eliminar sus propios favoritos
    $stmt = $pdo->prepare("DELETE FROM Favoritos WHERE IdFavorito = ? AND IdUsuario = ?");
    $stmt->execute([$idFavorito, $idUsuario]);

    echo json_encode(["ok" => true, "mensaje" => "Eliminado de favoritos."]);
    exit;
}

echo json_encode(["ok" => false, "mensaje" => "Acción no reconocida."]);
?>