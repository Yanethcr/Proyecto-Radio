<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: https://radio.kesug.com");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");
session_start();
require_once "conexion.php";

if (!isset($_SESSION["IdUsuario"])) {
    echo json_encode(["ok" => false, "mensaje" => "No autorizado."]);
    exit;
}

$idUsuario = $_SESSION["IdUsuario"];
$miUsername = $_SESSION["Username"];
$accion = $_GET["accion"] ?? "";

// 1. LISTAR MIS AMIGOS
if ($accion === "listar") {
    $stmt = $pdo->prepare("
        SELECT a.IdAmigos, u.Username AS AmigoNombre 
        FROM Amigos a
        JOIN Usuarios u ON a.IdUsuarioAmigo = u.IdUsuario
        WHERE a.Username = ?
    ");
    $stmt->execute([$miUsername]);
    echo json_encode(["ok" => true, "amigos" => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
    exit;
}

// 2. BUSCAR NUEVOS USUARIOS
if ($accion === "buscar") {
    $q = $_GET["q"] ?? "";
    if (strlen($q) < 2) {
        echo json_encode(["ok" => true, "resultados" => []]);
        exit;
    }
    
    // Buscar usuarios que coincidan, que NO seas tú mismo, y que NO sean ya tus amigos
    $stmt = $pdo->prepare("
        SELECT IdUsuario, Username 
        FROM Usuarios 
        WHERE Username LIKE ? 
        AND IdUsuario != ?
        AND IdUsuario NOT IN (SELECT IdUsuarioAmigo FROM Amigos WHERE Username = ?)
        LIMIT 5
    ");
    $stmt->execute(["%$q%", $idUsuario, $miUsername]);
    echo json_encode(["ok" => true, "resultados" => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
    exit;
}

// 3. AGREGAR AMIGO
if ($accion === "agregar") {
    $datos = json_decode(file_get_contents("php://input"), true);
    $idAmigo = intval($datos["idAmigo"] ?? 0);

    if ($idAmigo) {
        $stmt = $pdo->prepare("INSERT INTO Amigos (Username, IdUsuarioAmigo, Estado) VALUES (?, ?, 'Aceptado')");
        $stmt->execute([$miUsername, $idAmigo]);
        echo json_encode(["ok" => true]);
    }
    exit;
}

// 4. ELIMINAR AMIGO
if ($accion === "eliminar") {
    $datos = json_decode(file_get_contents("php://input"), true);
    $idAmigos = intval($datos["idAmigos"] ?? 0);

    if ($idAmigos) {
        $stmt = $pdo->prepare("DELETE FROM Amigos WHERE IdAmigos = ? AND Username = ?");
        $stmt->execute([$idAmigos, $miUsername]);
        echo json_encode(["ok" => true]);
    }
    exit;
}
?>