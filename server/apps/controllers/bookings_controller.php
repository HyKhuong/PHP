<?php
// server/apps/controllers/UserController.php

use App\Models\BookingModel;

require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../models/booking.php';

class BookingController
{
    private $pdo;
    private $bookingModel;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
        $this->bookingModel = new BookingModel($pdo);
    }

    // Get all bookings
    public function getAllBookings()
    {
        $bookings = $this->bookingModel->getAllBookings();

        header('Content-Type: application/json');
        if ($bookings) {
            echo json_encode(['success' => true, 'bookings' => $bookings]);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Failed to fetch bookings']);
        }
    }
}
