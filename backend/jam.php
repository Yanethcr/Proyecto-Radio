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

// CREAR UNA JAM NUEVA
if ($accion === "crear") {
    $datos = json_decode(file_get_contents("php://input"), true);
    $codigo = $datos["codigo"] ?? "";
    $streamUrl = $datos["streamUrl"] ?? "";
    $nombreEstacion = $datos["nombre"] ?? "";

    $stmtE = $pdo->prepare("SELECT IdEstacion FROM Estaciones WHERE Stream_url = ?");
    $stmtE->execute([$streamUrl]);
    $estacion = $stmtE->fetch(PDO::FETCH_ASSOC);

    if ($estacion) { $idEstacion = $estacion["IdEstacion"]; } 
    else {
        $pdo->prepare("INSERT INTO Estaciones (IdCiudad, Nombre, Stream_url, Genero) VALUES (1, ?, ?, 'Jam')")->execute([$nombreEstacion, $streamUrl]);
        $idEstacion = $pdo->lastInsertId();
    }

    $pdo->prepare("INSERT INTO Jam (IdEstacion, IdCreador, Codigo, Estado, FechaInicio) VALUES (?, ?, ?, 'Activa', NOW())")->execute([$idEstacion, $idUsuario, $codigo]);
    $idJam = $pdo->lastInsertId();

    $pdo->prepare("INSERT INTO JamUsuario (IdJam, IdUsuario, Rol) VALUES (?, ?, 'Host')")->execute([$idJam, $idUsuario]);

    echo json_encode(["ok" => true, "idJam" => $idJam]);
    exit;
}

// UNIRSE A UNA JAM
if ($accion === "unirse") {
    $datos = json_decode(file_get_contents("php://input"), true);
    $codigo = strtoupper(trim($datos["codigo"] ?? ""));

    $stmt = $pdo->prepare("SELECT j.IdJam, e.Nombre, e.Stream_url FROM Jam j JOIN Estaciones e ON j.IdEstacion = e.IdEstacion WHERE j.Codigo = ? AND j.Estado = 'Activa'");
    $stmt->execute([$codigo]);
    $jam = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$jam) {
        echo json_encode(["ok" => false, "mensaje" => "Código inválido o Jam terminada."]);
        exit;
    }

    $pdo->prepare("INSERT IGNORE INTO JamUsuario (IdJam, IdUsuario, Rol) VALUES (?, ?, 'Invitado')")->execute([$jam["IdJam"], $idUsuario]);
    echo json_encode(["ok" => true, "estacion" => $jam["Nombre"], "stream_url" => $jam["Stream_url"], "idJam" => $jam["IdJam"]]);
    exit;
}

// ENVIAR INVITACIÓN
if ($accion === "invitar") {
    $datos = json_decode(file_get_contents("php://input"), true);
    $codigoJam = $datos["codigo"] ?? "";
    $amigoUsername = $datos["amigo"] ?? "";

    $stmtU = $pdo->prepare("SELECT IdUsuario FROM Usuarios WHERE Username = ?");
    $stmtU->execute([$amigoUsername]);
    $amigo = $stmtU->fetch();

    $stmtJ = $pdo->prepare("SELECT IdJam FROM Jam WHERE Codigo = ? AND Estado = 'Activa'");
    $stmtJ->execute([$codigoJam]);
    $jam = $stmtJ->fetch();

    if ($amigo && $jam) {
        $pdo->prepare("INSERT INTO InvitacionesJam (IdJam, IdRemitente, IdDestinatario) VALUES (?, ?, ?)")->execute([$jam["IdJam"], $idUsuario, $amigo["IdUsuario"]]);
        echo json_encode(["ok" => true]);
    } else {
        echo json_encode(["ok" => false, "mensaje" => "No se pudo enviar la invitación."]);
    }
    exit;
}

// REVISAR INVITACIONES PENDIENTES CON CADUCIDAD DE 1 MINUTO
if ($accion === "revisar") {
    // Solo toma invitaciones de hace 1 minuto o menos
    $stmt = $pdo->prepare("
        SELECT i.IdInvitacion, j.Codigo, u.Username AS Remitente, e.Nombre AS Estacion
        FROM InvitacionesJam i
        JOIN Jam j ON i.IdJam = j.IdJam
        JOIN Usuarios u ON i.IdRemitente = u.IdUsuario
        JOIN Estaciones e ON j.IdEstacion = e.IdEstacion
        WHERE i.IdDestinatario = ? AND i.Estado = 'Pendiente' AND j.Estado = 'Activa'
        AND i.Fecha >= NOW() - INTERVAL 1 MINUTE
        LIMIT 1
    ");
    $stmt->execute([$idUsuario]);
    $invitacion = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode(["ok" => true, "invitacion" => $invitacion]);
    exit;
}

// RESPONDER A INVITACIÓN
if ($accion === "responder") {
    $datos = json_decode(file_get_contents("php://input"), true);
    $idInvitacion = $datos["idInvitacion"] ?? 0;
    $estado = $datos["estado"] ?? "Rechazada";

    $pdo->prepare("UPDATE InvitacionesJam SET Estado = ? WHERE IdInvitacion = ? AND IdDestinatario = ?")->execute([$estado, $idInvitacion, $idUsuario]);
    echo json_encode(["ok" => true]);
    exit;
}

// LISTAR USUARIOS EN LA SALA
if ($accion === "usuarios") {
    $codigo = $_GET["codigo"] ?? "";
    $stmt = $pdo->prepare("
        SELECT u.Username 
        FROM JamUsuario ju
        JOIN Usuarios u ON ju.IdUsuario = u.IdUsuario
        JOIN Jam j ON ju.IdJam = j.IdJam
        WHERE j.Codigo = ? AND j.Estado = 'Activa'
    ");
    $stmt->execute([$codigo]);
    $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(["ok" => true, "usuarios" => $usuarios]);
    exit;
}
?>