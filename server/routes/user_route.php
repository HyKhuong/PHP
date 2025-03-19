<?php
require_once __DIR__ . '/../apps/controllers/user_controller.php';

$uri = $_GET['url'] ?? '';

if ($uri === 'users') {
    $controller = new UserController();
    $controller->index();
} else {
    echo json_encode(['message' => 'Route not found']);
}
