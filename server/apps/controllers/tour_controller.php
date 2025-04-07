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
}
