<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../apps/config/Database.php';
require_once '../apps/models/PaymentModel.php';
require_once '../apps/controllers/PaymentController.php';

try {
    $database = new Database();
    $db = $database->getConnection();

    $paymentController = new PaymentController($db);

    $method = $_SERVER['REQUEST_METHOD'];

    if ($method === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $uriSegments = explode('/', trim($uri, '/'));

    $id = isset($uriSegments[3]) ? (int)$uriSegments[3] : null;
    $input = json_decode(file_get_contents("php://input"), true);

    switch ($method) {

        case 'POST':
            if (empty($input)) {
                http_response_code(400);
                echo json_encode(['message' => 'No input data provided']);
                break;
            }
            $paymentController->createPayment($input);
            break;

        // Optionally, you can add PUT and DELETE later if needed

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
