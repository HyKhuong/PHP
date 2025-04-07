<?php
require_once __DIR__ . '/../apps/controllers/tour_controller.php';


// routes/user_route.php


// Đảm bảo $router được lấy từ phạm vi toàn cục
global $router;

// Định nghĩa các route sử dụng đối tượng $router
$router->get('/api/tour/:tourid', function ($tourid) {
    header('Content-Type: application/json');

    if (!is_numeric($tourid)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid tour ID']);
        return;
    }

    $tourController = new TourController($GLOBALS['pdo']);
    $result = $tourController->getTourById($tourid);

    if ($result === false) {
        http_response_code(404);
        echo json_encode(['error' => 'Tour not found']);
        return;
    }

    http_response_code(200);
    echo json_encode($result);
});


$router->get('/api/tours', function () {
    $tourController = new TourController($GLOBALS['pdo']);
    $tourController->getAllTours();
});
