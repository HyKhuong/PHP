<?php
require_once __DIR__ . '/../apps/controllers/auth_controller.php';
require_once __DIR__ . '/../apps/controllers/user_controller.php';

// routes/user_route.php


// Đảm bảo $router được lấy từ phạm vi toàn cục
global $router;

// Định nghĩa các route sử dụng đối tượng $router
$router->post('/api/register', function () {
    // Ví dụ: khởi tạo controller và gọi hàm đăng ký
    $authController = new AuthController($GLOBALS['pdo']);
    $authController->register();
});

$router->post('/api/login', function () {
    $authController = new AuthController($GLOBALS['pdo']);
    $authController->login();
});

$router->get('api/users', function () {
    $userController = new UserController($GLOBALS['pdo']);
    $userController->getAllUsers();
});

$router->get('/api/users/:userid', function ($userid) {
    $userController = new UserController($GLOBALS['pdo']);
    $userController->getUserById($userid);
});
