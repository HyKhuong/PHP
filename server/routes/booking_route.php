<?php
require_once __DIR__ . '/../apps/controllers/bookings_controller.php';


// routes/user_route.php


// Đảm bảo $router được lấy từ phạm vi toàn cục
global $router;

// Định nghĩa các route sử dụng đối tượng $router
$router->get('/api/bookings', function () {
    $bookingController = new BookingController($GLOBALS['pdo']);
    $bookingController->getAllBookings();
});

$router->put('/api/bookings/:bookingid/status', function ($bookingid) {
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');

    $bookingController = new BookingController($GLOBALS['pdo']);
    $bookingController->updateStatus($bookingid);
});
