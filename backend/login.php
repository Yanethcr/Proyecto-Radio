<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: https://radio.kesug.com");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");

session_start();
require_once "conexion.php";

// Leer datos enviados como JSON
$datos = json_decode(file_get_contents("php://input"), true);

$correo     = trim($datos["correo"]     ?? "");
$contrasena = trim($datos["contrasena"] ?? "");

// Validaciones 
if (empty($correo) || empty($contrasena)) {
    echo json_encode(["ok" => false, "mensaje" => "Correo y contraseña son obligatorios."]);
    exit;
}

// Buscar usuario 
$stmt = $pdo->prepare("SELECT IdUsuario, Username, Contrasena FROM Usuarios WHERE Correo = ?");
$stmt->execute([$correo]);
$usuario = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$usuario || !password_verify($contrasena, $usuario["Contrasena"])) {
    echo json_encode(["ok" => false, "mensaje" => "Correo o contraseña incorrectos."]);
    exit;
}

// ── Guardar sesión ────────────────────────────────────────
$_SESSION["IdUsuario"] = $usuario["IdUsuario"];
$_SESSION["Username"]  = $usuario["Username"];

echo json_encode([
    "ok"       => true,
    "mensaje"  => "Inicio de sesión exitoso.",
    "username" => $usuario["Username"]
]);
?>