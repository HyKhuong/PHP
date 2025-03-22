<?php
include 'db.php';

header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'GET':
        if (isset($_GET['category_id'])) {
            $id = $_GET['category_id'];
            $stmt = $conn->prepare("SELECT * FROM Categories WHERE category_id=?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $result = $stmt->get_result();
            $data = $result->fetch_assoc();
            echo json_encode($data);
            $stmt->close();
        } else {
            $result = $conn->query("SELECT * FROM Categories");
            $categories = [];
            while ($row = $result->fetch_assoc()) {
                $categories[] = $row;
            }
            echo json_encode($categories);
        }
        break;

    case 'POST':
        $title = $input['title'];
        $description = $input['description'];
        $image_1 = $input['image_1'];
        $image_2 = $input['image_2'];
        $image_3 = $input['image_3'];
        $image_4 = $input['image_4'];
        $stmt = $conn->prepare("INSERT INTO Categories (title, description, image_1, image_2, image_3, image_4) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssss", $title, $description, $image_1, $image_2, $image_3, $image_4);
        $stmt->execute();
        echo json_encode(["message" => "Category added successfully"]);
        $stmt->close();
        break;

    case 'PUT':
        if (!isset($_GET['category_id']) || empty($_GET['category_id'])) {
            echo json_encode(["error" => "ID is required"]);
            exit;
        }
        $id = intval($_GET['category_id']);

        $input = json_decode(file_get_contents("php://input"), true);

        if (!$input) {
            echo json_encode(["error" => "Invalid JSON input"]);
            exit;
        }

        $title = $input['title'] ?? null;
        $description = $input['description'] ?? null;
        $image_1 = $input['image_1'] ?? null;
        $image_2 = $input['image_2'] ?? null;
        $image_3 = $input['image_3'] ?? null;
        $image_4 = $input['image_4'] ?? null;

        $stmt = $conn->prepare("UPDATE Categories SET title=?, description=?, image_1=?, image_2=?, image_3=?, image_4=? WHERE category_id=?");

        if (!$stmt) {
            die(json_encode(["error" => "SQL Error: " . $conn->error]));
        }

        $stmt->bind_param("ssssssi", $title, $description, $image_1, $image_2, $image_3, $image_4, $id);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            echo json_encode(["message" => "Category updated successfully"]);
        } else {
            echo json_encode(["message" => "No changes made or ID not found"]);
        }

        $stmt->close();
        break;

    case 'DELETE':
        if (!isset($_GET['category_id']) || empty($_GET['category_id'])) {
            echo json_encode(["error" => "ID is required"]);
            exit;
        }

        $id = intval($_GET['category_id']);

        $stmt = $conn->prepare("DELETE FROM Categories WHERE category_id=?");

        if (!$stmt) {
            echo json_encode(["error" => "SQL Error: " . $conn->error]);
            exit;
        }

        $stmt->bind_param("i", $id);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            echo json_encode(["message" => "Category deleted successfully"]);
        } else {
            echo json_encode(["error" => "Category ID not found or already deleted"]);
        }

        $stmt->close();
        break;
}

$conn->close();
