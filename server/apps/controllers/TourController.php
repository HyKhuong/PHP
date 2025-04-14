<?php
require_once __DIR__ . '/../models/ToursModel.php';

class TourController {
    private $toursModel;

    public function __construct($db) {
        $this->toursModel = new ToursModel($db);
    }

    // Get all tours
    public function getAllTours() {
        try {
            $stmt = $this->toursModel->getAll();
            $tours = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if(count($tours) > 0) {
                http_response_code(200);
                echo json_encode([
                    "status" => "success",
                    "data" => $tours
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
    public function getTour($id) {
        try {
            
            $this->toursModel->id = (int)$id;
            $stmt = $this->toursModel->getById();
            $tour = $stmt->fetch(PDO::FETCH_ASSOC);

            if($tour) {
                http_response_code(200);
                echo json_encode([
                    "status" => "success",
                    "data" => $tour
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

    // Get tour base on locaiton id
    public function getToursByLocation($locationId) {
        try {
            // Get all tours for this location
            $tours = $this->toursModel->getByLocationId($locationId);
    
            if (!empty($tours)) {
                http_response_code(200);
                echo json_encode([
                    "status" => "success",
                    "data" => $tours
                ]);
            } else {
                http_response_code(404);
                echo json_encode([
                    "status" => "success",  // Changed from "error" since no tours is a valid case
                    "message" => "No tours found for this location",
                    "data" => []
                ]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Failed to retrieve tours by location",
                "error" => $e->getMessage()
            ]);
        }
    }

    // Get tour base on category id
    public function getToursByCategory($categoryId) {
        try {
            // Get all tours for this location
            $tours = $this->toursModel->getByCategoryId($categoryId);

            if (!empty($tours)) {
                http_response_code(200);
                echo json_encode([
                    "status" => "success",
                    "data" => $tours
                ]);
            } else {
                http_response_code(404);
                echo json_encode([
                    "status" => "success",  // Changed from "error" since no tours is a valid case
                    "message" => "No tours found for this location",
                    "data" => []
                ]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Failed to retrieve tours by location",
                "error" => $e->getMessage()
            ]);
        }
    }

    public function getToursWithFilter($queryParams) {
        try {
            $filteredTours = $this->toursModel->getWithFilter($queryParams);

            if (!empty($filteredTours)) {
                http_response_code(200);
                echo json_encode([
                    "status" => "success",
                    "data" => $filteredTours
                ]);
            } else {
                http_response_code(404);
                echo json_encode([
                    "status" => "success",
                    "message" => "No tours matched the filters.",
                    "data" => []
                ]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Failed to retrieve filtered tours.",
                "error" => $e->getMessage()
            ]);
        }
    }

    // Create tour
    public function createTour($data) {
        try {
            // Validate required fields
            $required = ['title', 'price', 'location_id', 'start_date', 'end_date', 'status'];
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
    
            // Set and sanitize values
            $this->toursModel->title = htmlspecialchars(strip_tags($data['title']));
            $this->toursModel->description = isset($data['description']) ? htmlspecialchars(strip_tags($data['description'])) : '';
            $this->toursModel->price = (float)$data['price'];
            $this->toursModel->location_id = (int)$data['location_id'];
            $this->toursModel->category_id = isset($data['category_id']) ? (int)$data['category_id'] : 1;
            $this->toursModel->available = isset($data['available']) ? (int)$data['available'] : 0;
            $this->toursModel->start_date = $data['start_date'];
            $this->toursModel->end_date = $data['end_date'];
            $this->toursModel->status = $data['status'];
            $this->toursModel->create_at = isset($data['create_at']) ? $data['create_at'] : date('Y-m-d H:i:s');
            $this->toursModel->image_url = !empty(trim($data['image_url'])) ? $data['image_url'] : "http://localhost:3000/uploads/default.png";
    
            $newTour = $this->toursModel->create($data);
    
            if ($newTour) {
                http_response_code(201);
                echo json_encode([
                    "status" => "success",
                    "message" => "Tour created successfully.",
                    "data" => $newTour
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
    public function updateTour($id, $data) {
        try {
            if (empty($id) || !isset($data['number_people'])) {
                http_response_code(400);
                echo json_encode([
                    "status" => "error",
                    "message" => "Tour ID and number_people are required."
                ]);
                return;
            }
    
            $this->toursModel->id = (int)$id;
    
            if ($this->toursModel->update((int)$data['number_people'])) {
                http_response_code(200);
                echo json_encode([
                    "status" => "success",
                    "message" => "Tour availability updated successfully."
                ]);
            } else {
                throw new Exception("Database error or not enough availability.");
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

    // Admin update tour (full fields)
    public function updateTourAdmin($id, $updateData) {
        try {
            $updatedTour = $this->toursModel->updateTourModel($id, $updateData);

            if ($updatedTour) {
                echo json_encode([
                    'status' => 'success',
                    'message' => 'Tour updated successfully',
                    'data' => $updatedTour
                ]);
            } else {
                echo json_encode([
                    'status' => 'failure',
                    'message' => 'Tour update failed. No changes were made.'
                ]);
            }
        } catch (Exception $e) {
            echo json_encode([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }
    
    // Delete tour
    public function deleteTour($id) {
        try {
            if (empty($id)) {
                http_response_code(400);
                echo json_encode([
                    "status" => "error",
                    "message" => "Invalid tour ID"
                ]);
                return;
            }

            $this->toursModel->id = (int)$id;

            if($this->toursModel->delete()) {
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