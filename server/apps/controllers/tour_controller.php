<?php
// api/controllers/TourController.php

require_once __DIR__ . '/../models/tours.php';

class TourController {
    private $tourModel;

    public function __construct($db) {
        $this->tourModel = new TourModel($db);
    }

    // GET /tours - Lấy tất cả tour
    public function index() {
        $stmt = $this->tourModel->getAllTours();
        $tours = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        http_response_code(200);
        echo "Danh sách tours";
        echo json_encode($tours);
    }

    // GET /tours/[id] - Lấy tour theo ID
    public function get($id) {
        $stmt = $this->tourModel->getTourById($id);
        $tour = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($tour) {
            http_response_code(200);
            echo json_encode($tour);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "Tour not found"]);
        }
    }
}
?>