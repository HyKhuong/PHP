<?php
include 'db.php';

header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'GET':
        if (isset($_GET['tour_id'])) {
            $id = $_GET['tour_id'];
            $stmt = $conn->prepare("SELECT * FROM Tours WHERE tour_id=?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $result = $stmt->get_result();
            $data = $result->fetch_assoc();
            echo json_encode($data);
            $stmt->close();
        } else {
            $result = $conn->query("SELECT * FROM Tours");
            $tours = [];
            while ($row = $result->fetch_assoc()) {
                $tours[] = $row;
            }
            echo json_encode($tours);
        }
        break;

    case 'POST':
        $title = $input['title'];
        $category_id = $input['category_id'];
        $location_id = $input['location_id'];
        $description = $input['description'];
        $price = $input['price'];
        $duration = $input['duration'];
        $start_date = $input['start_date'];
        $end_date = $input['end_date'];
        $available = $input['available'];
        $image_url = $input['image_url'];
        $status = $input['status'];
        
        $stmt = $conn->prepare("INSERT INTO Tours (title, category_id, location_id, description, price, duration, start_date, end_date, available, image_url, status, create_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())");
        $stmt->bind_param("siissississ", $title, $category_id, $location_id, $description, $price, $duration, $start_date, $end_date, $available, $image_url, $status);
        $stmt->execute();
        echo json_encode(["message" => "Tour added successfully"]);
        $stmt->close();
        break;

    case 'PUT':
        if (!isset($_GET['tour_id']) || empty($_GET['tour_id'])) {
            echo json_encode(["error" => "ID is required"]);
            exit;
        }
        $id = intval($_GET['tour_id']);

        $input = json_decode(file_get_contents("php://input"), true);

        if (!$input) {
            echo json_encode(["error" => "Invalid JSON input"]);
            exit;
        }

        $title = $input['title'] ?? null;
        $category_id = $input['category_id'] ?? null;
        $location_id = $input['location_id'] ?? null;
        $description = $input['description'] ?? null;
        $price = $input['price'] ?? null;
        $duration = $input['duration'] ?? null;
        $start_date = $input['start_date'] ?? null;
        $end_date = $input['end_date'] ?? null;
        $available = $input['available'] ?? null;
        $image_url = $input['image_url'] ?? null;
        $status = $input['status'] ?? null;

        $stmt = $conn->prepare("UPDATE Tours SET title=?, category_id=?, location_id=?, description=?, price=?, duration=?, start_date=?, end_date=?, available=?, image_url=?, status=? WHERE tour_id=?");

        if (!$stmt) {
            die(json_encode(["error" => "SQL Error: " . $conn->error]));
        }

        $stmt->bind_param("siississssi", $title, $category_id, $location_id, $description, $price, $duration, $start_date, $end_date, $available, $image_url, $status, $id);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            echo json_encode(["message" => "Tour updated successfully"]);
        } else {
            echo json_encode(["message" => "No changes made or ID not found"]);
        }

        $stmt->close();
        break;

    case 'DELETE':
        if (!isset($_GET['tour_id']) || empty($_GET['tour_id'])) {
            echo json_encode(["error" => "ID is required"]);
            exit;
        }

        $id = intval($_GET['tour_id']);

        $stmt = $conn->prepare("DELETE FROM Tours WHERE tour_id=?");

        if (!$stmt) {
            echo json_encode(["error" => "SQL Error: " . $conn->error]);
            exit;
        }

        $stmt->bind_param("i", $id);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            echo json_encode(["message" => "Tour deleted successfully"]);
        } else {
            echo json_encode(["error" => "Tour ID not found or already deleted"]);
        }

        $stmt->close();
        break;

    default:
        echo json_encode(["message" => "Invalid request method"]);
        break;
}

$conn->close();
?>
