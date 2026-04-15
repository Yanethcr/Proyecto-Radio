<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once "conexion.php";

// Leer datos enviados como JSON
$datos = json_decode(file_get_contents("php://input"), true);

$username    = trim($datos["username"]    ?? "");
$correo      = trim($datos["correo"]      ?? "");
$contrasena  = trim($datos["contrasena"]  ?? "");
$confirmar   = trim($datos["confirmar"]   ?? "");

// Validaciones 
if (empty($username) || empty($correo) || empty($contrasena) || empty($confirmar)) {
    echo json_encode(["ok" => false, "mensaje" => "Todos los campos son obligatorios."]);
    exit;
}

if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["ok" => false, "mensaje" => "Correo electrónico no válido."]);
    exit;
}

if (strlen($contrasena) < 6) {
    echo json_encode(["ok" => false, "mensaje" => "La contraseña debe tener al menos 6 caracteres."]);
    exit;
}

if ($contrasena !== $confirmar) {
    echo json_encode(["ok" => false, "mensaje" => "Las contraseñas no coinciden."]);
    exit;
}

// Verificar si el correo o username ya existen 
$stmt = $pdo->prepare("SELECT IdUsuario FROM Usuarios WHERE Correo = ? OR Username = ?");
$stmt->execute([$correo, $username]);

if ($stmt->rowCount() > 0) {
    echo json_encode(["ok" => false, "mensaje" => "El correo o nombre de usuario ya está registrado."]);
    exit;
}

// Insertar usuario 
$hash = password_hash($contrasena, PASSWORD_BCRYPT);

$insert = $pdo->prepare("INSERT INTO Usuarios (Username, Correo, Contrasena) VALUES (?, ?, ?)");
$insert->execute([$username, $correo, $hash]);

echo json_encode(["ok" => true, "mensaje" => "Cuenta creada exitosamente."]);
?>