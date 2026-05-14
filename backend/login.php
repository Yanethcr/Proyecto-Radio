<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: https://radio.kesug.com");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

session_set_cookie_params([
    'lifetime' => 0,
    'path'     => '/',
    'domain'   => 'radio.kesug.com',
    'secure'   => true,
    'httponly' => true,
    'samesite' => 'None'
]);
session_start();
require_once "conexion.php";

$datos = json_decode(file_get_contents("php://input"), true);

$correo     = trim($datos["correo"]     ?? "");
$contrasena = trim($datos["contrasena"] ?? "");

if (empty($correo) || empty($contrasena)) {
    echo json_encode(["ok" => false, "mensaje" => "Correo y contraseña son obligatorios."]);
    exit;
}

$stmt = $pdo->prepare("SELECT IdUsuario, Username, Contrasena FROM Usuarios WHERE Correo = ?");
$stmt->execute([$correo]);
$usuario = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$usuario || !password_verify($contrasena, $usuario["Contrasena"])) {
    echo json_encode(["ok" => false, "mensaje" => "Correo o contraseña incorrectos."]);
    exit;
}

$_SESSION["IdUsuario"] = $usuario["IdUsuario"];
$_SESSION["Username"]  = $usuario["Username"];

echo json_encode([
    "ok"       => true,
    "mensaje"  => "Inicio de sesión exitoso.",
    "username" => $usuario["Username"]
]);
?>