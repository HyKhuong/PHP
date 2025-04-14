<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once __DIR__ . '/../apps/config/Database.php';

try {
    // Handle preflight OPTIONS request
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    // Parse URI
    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $uriSegments = explode('/', trim($uri, '/'));

    $endpoint = $uriSegments[2] ?? ''; // Assuming format: /server/public/tour

    switch ($endpoint) {
        case 'tours':
            require_once __DIR__ . '/../routes/ToursRoute.php';
            break;
        case 'locations':
            require_once __DIR__ . '/../routes/LocationRoute.php';
            break;
        case 'categories':
            require_once __DIR__ . '/../routes/CategoryRoute.php';
            break;
        case 'auth':
            require_once __DIR__ . '/../routes/AuthRoute.php';
            break;
        case 'booking':
            require_once __DIR__ . '/../routes/BookingRoute.php';
            break;
        case 'payment':
            require_once __DIR__ . '/../routes/PaymentRoute.php';
            break;
        default:
            http_response_code(404);
            echo json_encode(['message' => 'Endpoint not found']);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'message' => 'An internal error occurred.',
        'error' => $e->getMessage()
    ]);
}
