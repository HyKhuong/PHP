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
