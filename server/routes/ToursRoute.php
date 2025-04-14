<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once __DIR__ . '/../apps/config/Database.php';
require_once __DIR__ . '/../apps/models/ToursModel.php';
require_once __DIR__ . '/../apps/controllers/TourController.php';

try {
    // Handle preflight OPTIONS request
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    // Initialize database connection
    $database = new Database();
    $db = $database->getConnection();
    $tourController = new TourController($db);

    // Parse request
    $method = $_SERVER['REQUEST_METHOD'];
    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $uriSegments = explode('/', trim($uri, '/'));

    // Format: /project-root/public/tour/{type?}/{id?}
    $endpoint = $uriSegments[2] ?? null; // should be 'tour'
    $subEndpoint = $uriSegments[3] ?? null; // could be 'locations', 'categories', or ID
    $subId = $uriSegments[4] ?? null; // if subEndpoint is 'locations' or 'categories'

    $input = json_decode(file_get_contents("php://input"), true);

    switch ($method) {
        case 'GET':
            // $queryParams = $_GET;

            // if(!empty($queryParams)){
            //     $tourController->getToursWithFilter($queryParams);
            // }

            if ($subEndpoint === 'location' && is_numeric($subId)) {
                $tourController->getToursByLocation((int)$subId);
            } elseif ($subEndpoint === 'category' && is_numeric($subId)) {
                $tourController->getToursByCategory((int)$subId);
            } elseif (is_numeric($subEndpoint)) {
                $tourController->getTour((int)$subEndpoint);
            } elseif ($endpoint === 'tours') {
                $tourController->getAllTours();
            } else {
                http_response_code(404);
                echo json_encode(['message' => 'Invalid endpoint or missing ID']);
            }
            break;

        case 'POST':
            if (empty($input)) {
                http_response_code(400);
                echo json_encode(['message' => 'No input data provided']);
                break;
            }
            $tourController->createTour($input);
            break;

        case 'PUT':
            // PUT /tour/admin/{id}
            if ($subEndpoint === 'admin' && is_numeric($subId)) {
                if (empty($input)) {
                    http_response_code(400);
                    echo json_encode(['status' => 'error', 'message' => 'No input data provided']);
                    exit;
                }
                $tourController->updateTourAdmin((int)$subId, $input);
                break;
            }

            // PUT /tour/{id}
            if (!is_numeric($subEndpoint)) {
                http_response_code(400);
                echo json_encode(['status' => 'error', 'message' => 'Invalid or missing ID']);
                exit;
            }

            if (empty($input)) {
                http_response_code(400);
                echo json_encode(['status' => 'error', 'message' => 'No input data provided']);
                exit;
            }

            $tourController->updateTour((int)$subEndpoint, $input);
            break;

        case 'DELETE':
            if (!is_numeric($subEndpoint)) {
                http_response_code(400);
                echo json_encode(['message' => 'Invalid or missing ID']);
                break;
            }
            $tourController->deleteTour((int)$subEndpoint);
            break;

        default:
            http_response_code(405);
            echo json_encode(['message' => 'Method not allowed']);
            break;
    }
} catch (Exception $e) {
    error_log($e->getMessage());
    http_response_code(500);
    echo json_encode([
        'message' => 'An error occurred',
        'error' => $e->getMessage()
    ]);
}
