<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../apps/config/Database.php';
require_once '../apps/models/LocationModel.php';
require_once '../apps/controllers/LocationController.php';

try {
    // Initialize database connection
    $database = new Database();
    $db = $database->getConnection();
    
    $locationController = new LocationController($db);

    $method = $_SERVER['REQUEST_METHOD'];
    
    // Handle preflight OPTIONS request
    if ($method === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    // Parse request URI
    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $uriSegments = explode('/', trim($uri, '/'));
    
    // Adjust index based on your actual URL structure (e.g., /api/tours/123)
    $id = isset($uriSegments[3]) ? (int)$uriSegments[3] : null;
    
    // Get input data for POST/PUT
    $input = json_decode(file_get_contents("php://input"), true);
    
    switch ($method) {
        case 'GET':
            if ($id) {
                if (!is_numeric($id) || $id <= 0) {
                    http_response_code(400);
                    echo json_encode(['message' => 'Invalid ID parameter']);
                    break;
                }
                $locationController->getLocation($id);
            } else {
                $locationController->getAllLocations();
            }
            break;
            
        case 'POST':
            if (empty($input)) {
                http_response_code(400);
                echo json_encode(['message' => 'No input data provided']);
                break;
            }
            $locationController->createLocation($input);
            break;
            
        case 'PUT':
            if (!$id || !is_numeric($id)) {
                http_response_code(400);
                echo json_encode(['message' => 'Invalid or missing ID']);
                break;
            }
            if (empty($input)) {
                http_response_code(400);
                echo json_encode(['message' => 'No input data provided']);
                break;
            }
            $locationController->updateLocation($id, $input);
            break;
            
        case 'DELETE':
            if (!$id || !is_numeric($id)) {
                http_response_code(400);
                echo json_encode(['message' => 'Invalid or missing ID']);
                break;
            }
            $locationController->deleteLocation($id);
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