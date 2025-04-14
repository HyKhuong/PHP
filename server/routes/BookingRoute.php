<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../apps/config/Database.php';
require_once '../apps/models/BookingModel.php';
require_once '../apps/controllers/BookingController.php';

try {
    // Initialize database connection
    $database = new Database();
    $db = $database->getConnection();

    $bookingController = new BookingController($db);

    $method = $_SERVER['REQUEST_METHOD'];

    // Handle preflight OPTIONS request
    if ($method === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    // Parse request URI
    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $uriSegments = explode('/', trim($uri, '/'));

    // Adjust index based on your actual URL structure (e.g., /api/bookings/123)
    $endpoint = $uriSegments[2] ?? null;
    $subEndpoint = $uriSegments[3] ?? null; // có thể là 'users' hoặc booking_id
    $subId = $uriSegments[4] ?? null;

    $input = json_decode(file_get_contents("php://input"), true);

    switch ($method) {
        case 'GET':
            if ($endpoint === 'booking') {
                if ($subEndpoint === 'users' && $subId) {
                    // GET /bookings/users/{user_id}
                    $bookingController->getUserBooking($subId);
                } elseif ($subEndpoint) {
                    // GET /bookings/{booking_id}
                    $bookingController->getBookingById($subEndpoint);
                } else {
                    // GET /bookings
                    $bookingController->getAllBookings();
                }
            }
            break;

        case 'POST':
            if (empty($input)) {
                http_response_code(400);
                echo json_encode(['message' => 'Invalid input data']);
                break;
            }
            $bookingController->createBooking($input);
            break;

        case 'PUT':
            if (!$id || empty($input)) {
                http_response_code(400);
                echo json_encode(['message' => 'Invalid ID or input data']);
                break;
            }
            $bookingController->updateBooking($id, $input);
            break;

        case 'DELETE':
            if (!$id) {
                http_response_code(400);
                echo json_encode(['message' => 'Invalid ID parameter']);
                break;
            }
            $bookingController->deleteBooking($id);
            break;

        default:
            http_response_code(405);
            echo json_encode(['message' => 'Method not allowed']);
            break;
    }
} catch (Exception $e) {
    // Log the error (you should implement proper logging)
    error_log($e->getMessage());

    http_response_code(500);
    echo json_encode([
        'message' => 'An error occurred',
        'error' => $e->getMessage()
    ]);
}
