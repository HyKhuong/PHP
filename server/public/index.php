<?php
// public/index.php

// ==============================
// 1. Hiển thị lỗi (dùng trong dev)
// ==============================
ini_set('display_errors', 1);
error_reporting(E_ALL);

// ==============================
// 2. CORS + Header JSON
// ==============================
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// ==============================
// 3. Định nghĩa hằng số bảo vệ
// ==============================
define('INDEX_ACCESS', true);

// ==============================
// 4. Load cấu hình & router
// ==============================
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../apps/Router.php';

// ==============================
// 5. Khởi tạo router
// ==============================
$router = new Router();
$GLOBALS['router'] = $router;

// ==============================
// 6. Xử lý route từ URL
// ==============================
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

$basePath = '/PHP/server/public';
$route = trim(str_replace($basePath, '', $requestUri), "/ \n\r\t");

// Debugging the route
error_log("DEBUG: Requested route - $route");

// ==============================
// 7. Ghi log (debug trong logs/error.log)
// ==============================
error_log("DEBUG: Full URL = " . $_SERVER['REQUEST_URI']);
error_log("DEBUG: Method = " . $_SERVER['REQUEST_METHOD']);

// ==============================
// 8. OPTIONS request (preflight CORS)
// ==============================
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// ==============================
// 9. Tải route và chạy
// ==============================
require_once __DIR__ . '/../routes/user_route.php';
require_once __DIR__ . '/../routes/tour_route.php';
require_once __DIR__ . '/../routes/booking_route.php';
require_once __DIR__ . '/../routes/location_route.php';
require_once __DIR__ . '/../routes/category_route.php';
$router->run();
