<?php
class CategoryController {
    private $categoriesModel;

    public function __construct($db) {
        $this->categoriesModel = new CategoryModel($db);
    }

    // Get all tours
    public function getAllCategories() {
        try {
            $stmt = $this->categoriesModel->getAll();
            $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if(count($categories) > 0) {
                http_response_code(200);
                echo json_encode([
                    "status" => "success",
                    "data" => $categories
                ]);
            } else {
                http_response_code(404);
                echo json_encode([
                    "status" => "success",
                    "message" => "No tours found.",
                    "data" => []
                ]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Failed to retrieve tours.",
                "error" => $e->getMessage()
            ]);
        }
    }

    // Get single tour
    public function getCategorie($id) {
        try {
            $this->categoriesModel->id = (int)$id;
            $stmt = $this->categoriesModel->getById();
            $categories = $stmt->fetch(PDO::FETCH_ASSOC);

            if($categories) {
                http_response_code(200);
                echo json_encode([
                    "status" => "success",
                    "data" => $categories
                ]);
            } else {
                http_response_code(404);
                echo json_encode([
                    "status" => "error",
                    "message" => "Tour not found."
                ]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Failed to retrieve tour.",
                "error" => $e->getMessage()
            ]);
        }
    }

}
?>