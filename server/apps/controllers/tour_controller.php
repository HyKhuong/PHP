<?php
// server/apps/controllers/UserController.php

use App\Models\TourModel;

require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../models/tour.php';

class TourController
{
    private $pdo;
    private $tourModel;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
        $this->tourModel = new TourModel($pdo);
    }

    // Hàm lấy tất cả người dùng
    public function getAllTours()
    {
        $tours = $this->tourModel->getAllTours();

        header('Content-Type: application/json');
        echo json_encode(['tours' => $tours]);
    }
    //Hàm lấy thoongt in tour theo id
    public function getTourById($tourid)
    {
        $tour = $this->tourModel->getTourByID($tourid);

        if (!$tour) {
            return false;
        }

        return ['success' => true, 'tours' => $tour];
    }

    public function createTour()
    {
        $data = json_decode(file_get_contents("php://input"), true);

        // Validate required fields
        if (!isset($data['title']) || !isset($data['price']) || !isset($data['location_id'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Missing required fields']);
            return;
        }

        $result = $this->tourModel->createTour($data);

        header('Content-Type: application/json');
        if ($result) {
            http_response_code(201);
            echo json_encode(['success' => true, 'message' => 'Tour created successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Failed to create tour']);
        }
    }

    public function updateTour($tourid)
    {
        try {
            $data = json_decode(file_get_contents("php://input"), true);

            if (!is_numeric($tourid)) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Invalid tour ID']);
                return;
            }

            // Kiểm tra tour có tồn tại không
            $tour = $this->tourModel->getTourByID($tourid);
            if (!$tour) {
                http_response_code(404);
                echo json_encode(['success' => false, 'message' => 'Tour not found']);
                return;
            }

            // Kiểm tra dữ liệu bắt buộc
            if (!isset($data['title']) || !isset($data['price'])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Missing required fields']);
                return;
            }

            $result = $this->tourModel->updateTour($tourid, $data);

            header('Content-Type: application/json');
            if ($result) {
                echo json_encode([
                    'success' => true,
                    'message' => 'Tour updated successfully',
                    'data' => $this->tourModel->getTourByID($tourid)
                ]);
            } else {
                http_response_code(500);
                echo json_encode(['success' => false, 'message' => 'Failed to update tour']);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
    }

    public function deleteTour($tourid)
    {
        if (!is_numeric($tourid)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Invalid tour ID']);
            return;
        }

        // Kiểm tra tour có tồn tại không
        $tour = $this->tourModel->getTourByID($tourid);
        if (!$tour) {
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'Tour not found']);
            return;
        }

        $result = $this->tourModel->deleteTour($tourid);

        header('Content-Type: application/json');
        if ($result) {
            echo json_encode([
                'success' => true,
                'message' => 'Tour deleted successfully'
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Failed to delete tour. The tour may have related bookings.'
            ]);
        }
    }
}
