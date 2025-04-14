<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../apps/config/Database.php';
require_once '../apps/models/UserModel.php';
require_once '../apps/controllers/AuthController.php';

try {
    // Initialize database connection
    $database = new Database();
    $db = $database->getConnection();

    $authController = new AuthController($db);

    $method = $_SERVER['REQUEST_METHOD'];

    // Handle preflight OPTIONS request
    if ($method === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    // Parse request URI
    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $uriSegments = explode('/', trim($uri, '/'));

    // The sub-action is the segment after 'auth'
    $subAction = isset($uriSegments[3]) ? $uriSegments[3] : null;

    // Get input data for POST requests
    $input = json_decode(file_get_contents("php://input"), true);

    switch ($method) {
        case 'POST':
            if ($subAction === 'login') {
                if (!is_array($input)) {
                    http_response_code(400);
                    echo json_encode(['message' => 'Invalid JSON data']);
                    break;
                }
                $authController->loginUser($input);
            } elseif ($subAction === 'register') {
                if (!is_array($input)) {
                    http_response_code(400);
                    echo json_encode(['message' => 'Invalid JSON data']);
                    break;
                }
                $authController->registerUser($input);
            } else {
                http_response_code(404);
                echo json_encode(['message' => 'Route not found']);
            }
            break;

        case 'GET':
            if ($subAction === 'logout') {
                $authController->logoutUser();
            } elseif ($subAction === 'current-user') {
                $authController->getUsers();
            } else {
                http_response_code(404);
                echo json_encode(['message' => 'Route not found']);
            }
            break;

        case 'PUT':
        
            // Call the controller
            $authController->updateUser((int)$subAction,$input);
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
