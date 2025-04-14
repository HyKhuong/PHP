<?php
class LocationController {
    private $locationsModel;

    public function __construct($db) {
        $this->locationsModel = new LocationModel($db);
    }

    // Get all tours
    public function getAllLocations() {
        try {
            $stmt = $this->locationsModel->getAll();
            $locations = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if(count($locations) > 0) {
                http_response_code(200);
                echo json_encode([
                    "status" => "success",
                    "data" => $locations
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
    public function getLocation($id) {
        try {
            $this->locationsModel->id = (int)$id;
            $stmt = $this->locationsModel->getById();
            $locations = $stmt->fetch(PDO::FETCH_ASSOC);

            if($locations) {
                http_response_code(200);
                echo json_encode([
                    "status" => "success",
                    "data" => $locations
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

    // Create tour
    public function createLocation($data) {
        try {
            // Validate required fields
            $required = ['title', 'description', 'price', 'duration', 'location'];
            foreach ($required as $field) {
                if (empty($data[$field])) {
                    http_response_code(400);
                    echo json_encode([
                        "status" => "error",
                        "message" => "Missing required field: $field"
                    ]);
                    return;
                }
            }

            // Set model properties
            $this->locationsModel->title = htmlspecialchars(strip_tags($data['title']));
            $this->locationsModel->description = htmlspecialchars(strip_tags($data['description']));

            $this->locationsModel->location = htmlspecialchars(strip_tags($data['location']));

            if($this->locationsModel->create()) {
                http_response_code(201);
                echo json_encode([
                    "status" => "success",
                    "message" => "Tour created successfully."
                ]);
            } else {
                throw new Exception("Database error while creating tour");
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Failed to create tour.",
                "error" => $e->getMessage()
            ]);
        }
    }

    // Update tour
    public function updateLocation($id, $data) {
        try {
            // Validate ID
            if (empty($id)) {
                http_response_code(400);
                echo json_encode([
                    "status" => "error",
                    "message" => "Invalid location ID"
                ]);
                return;
            }

            // Validate at least one field is provided
            if (empty($data)) {
                http_response_code(400);
                echo json_encode([
                    "status" => "error",
                    "message" => "No update data provided"
                ]);
                return;
            }

            $this->locationsModel->id = (int)$id;

            // Update only provided fields
            if (isset($data['title'])) $this->locationsModel->title = htmlspecialchars(strip_tags($data['title']));
            if (isset($data['description'])) $this->locationsModel->description = htmlspecialchars(strip_tags($data['description']));
            if (isset($data['location'])) $this->locationsModel->location = htmlspecialchars(strip_tags($data['location']));

            if($this->locationsModel->update()) {
                http_response_code(200);
                echo json_encode([
                    "status" => "success",
                    "message" => "Tour updated successfully."
                ]);
            } else {
                throw new Exception("Database error while updating tour");
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Failed to update tour.",
                "error" => $e->getMessage()
            ]);
        }
    }

    // Delete tour
    public function deleteLocation($id) {
        try {
            if (empty($id)) {
                http_response_code(400);
                echo json_encode([
                    "status" => "error",
                    "message" => "Invalid tour ID"
                ]);
                return;
            }

            $this->locationsModel->id = (int)$id;

            if($this->locationsModel->delete()) {
                http_response_code(200);
                echo json_encode([
                    "status" => "success",
                    "message" => "Tour deleted successfully."
                ]);
            } else {
                throw new Exception("Database error while deleting tour");
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Failed to delete tour.",
                "error" => $e->getMessage()
            ]);
        }
    }
}
?>