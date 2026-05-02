<?php
header("Content-Type: application/json");
session_start();
require_once "conexion.php";

if (!isset($_SESSION["IdUsuario"])) {
    echo json_encode(["ok" => false, "mensaje" => "No autorizado."]);
    exit;
}

$idUsuario = $_SESSION["IdUsuario"];
$accion = $_GET["accion"] ?? "";

if ($accion === "registrar") {
    $datos = json_decode(file_get_contents("php://input"), true);
    $url = $datos["streamUrl"] ?? "";
    $nombre = $datos["nombre"] ?? "Estación";

    if (!$url) {
        echo json_encode(["ok" => false, "mensaje" => "Falta URL"]);
        exit;
    }

    try {
        $stmt = $pdo->prepare("SELECT IdEstacion FROM Estaciones WHERE Stream_url = ?");
        $stmt->execute([$url]);
        $estacion = $stmt->fetch();

        if ($estacion) {
            $idEstacion = $estacion["IdEstacion"];
        } else {
            $stmtIns = $pdo->prepare("INSERT INTO Estaciones (IdCiudad, Nombre, Stream_url, Genero) VALUES (1, ?, ?, 'Radio')");
            $stmtIns->execute([$nombre, $url]);
            $idEstacion = $pdo->lastInsertId();
        }

        // ELIMINA el registro anterior (si existe) para evitar duplicados
        $stmtDel = $pdo->prepare("DELETE FROM Historial WHERE IdUsuario = ? AND IdEstacion = ?");
        $stmtDel->execute([$idUsuario, $idEstacion]);

        // INSERTA el nuevo registro, dejándolo hasta arriba en la lista
        $stmtHist = $pdo->prepare("INSERT INTO Historial (IdUsuario, IdEstacion, FechaEscucha) VALUES (?, ?, NOW())");
        $stmtHist->execute([$idUsuario, $idEstacion]);
        
        echo json_encode(["ok" => true]);
    } catch (Exception $e) {
        echo json_encode(["ok" => false, "error" => $e->getMessage()]);
    }
    exit;
} 

if ($accion === "cargar") {
    try {
        $stmt = $pdo->prepare("
            SELECT e.Nombre, e.Stream_url, c.Nombre as Ciudad, p.Nombre as Pais
            FROM Historial h
            JOIN Estaciones e ON h.IdEstacion = e.IdEstacion
            LEFT JOIN Ciudades c ON e.IdCiudad = c.IdCiudad
            LEFT JOIN Pais p ON c.IdPais = p.IdPais
            WHERE h.IdUsuario = ?
            ORDER BY h.FechaEscucha DESC LIMIT 20
        ");
        $stmt->execute([$idUsuario]);
        echo json_encode(["ok" => true, "historial" => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
    } catch (Exception $e) {
        echo json_encode(["ok" => false, "error" => $e->getMessage()]);
    }
    exit;
}
?>