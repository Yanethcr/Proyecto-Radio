<?php
// ── NUNCA poner header() aquí — lo manda cada archivo que lo necesite ──

$host     = "sql209.infinityfree.com"; // Cámbialo si tu host es diferente
$dbname   = "if0_41721650_radiojamdb"; // Tu nombre real de BD en InfinityFree
$usuario  = "if0_41721650";            // Tu usuario real de BD en InfinityFree
$password = "Arturhm1";        // Tu contraseña real de BD en InfinityFree

try {
    $dsn = "mysql:host=$host;dbname=$dbname;charset=utf8mb4";

    $pdo = new PDO($dsn, $usuario, $password, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]);

} catch (PDOException $e) {
    // Evitar que el mensaje de error rompa el JSON de los otros archivos
    http_response_code(500);
    header("Content-Type: application/json");
    echo json_encode([
        "ok"      => false,
        "error"   => "Error de conexión a la base de datos.",
        "detalle" => $e->getMessage()
    ]);
    exit;
}
