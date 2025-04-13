<?php

use App\Models\BookingModel;

class BookingController
{
    private $bookingModel;

    public function __construct($pdo)
    {
        $this->bookingModel = new BookingModel($pdo);
    }

    public function getAllBookings()
    {
        try {
            $bookings = $this->bookingModel->getAllBookings();
            header('Content-Type: application/json');
            echo json_encode(['bookings' => $bookings]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
    }

    public function getBookingById($bookingId)
    {
        try {
            $booking = $this->bookingModel->getBookingById($bookingId);
            header('Content-Type: application/json');
            if ($booking) {
                echo json_encode(['success' => true, 'booking' => $booking]);
            } else {
                http_response_code(404);
                echo json_encode(['success' => false, 'message' => 'Booking not found']);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
    }

    // public function createBooking()
    // {
    //     try {
    //         $data = json_decode(file_get_contents("php://input"), true);

    //         if (!isset($data['user_id']) || !isset($data['tour_id']) || !isset($data['number_of_people']) || !isset($data['total_price'])) {
    //             http_response_code(400);
    //             echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    //             return;
    //         }

    //         $result = $this->bookingModel->createBooking($data);

    //         header('Content-Type: application/json');
    //         if ($result) {
    //             echo json_encode(['success' => true, 'message' => 'Booking created successfully']);
    //         } else {
    //             http_response_code(500);
    //             echo json_encode(['success' => false, 'message' => 'Failed to create booking']);
    //         }
    //     } catch (Exception $e) {
    //         http_response_code(500);
    //         echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    //     }
    // }

    // public function updateBooking($bookingId)
    // {
    //     try {
    //         $data = json_decode(file_get_contents("php://input"), true);

    //         if (!isset($data['number_of_people']) || !isset($data['total_price'])) {
    //             http_response_code(400);
    //             echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    //             return;
    //         }

    //         $result = $this->bookingModel->updateBooking($bookingId, $data);

    //         header('Content-Type: application/json');
    //         if ($result) {
    //             echo json_encode(['success' => true, 'message' => 'Booking updated successfully']);
    //         } else {
    //             http_response_code(500);
    //             echo json_encode(['success' => false, 'message' => 'Failed to update booking']);
    //         }
    //     } catch (Exception $e) {
    //         http_response_code(500);
    //         echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    //     }
    // }

    // public function deleteBooking($bookingId)
    // {
    //     try {
    //         $result = $this->bookingModel->deleteBooking($bookingId);

    //         header('Content-Type: application/json');
    //         if ($result) {
    //             echo json_encode(['success' => true, 'message' => 'Booking deleted successfully']);
    //         } else {
    //             http_response_code(500);
    //             echo json_encode(['success' => false, 'message' => 'Failed to delete booking']);
    //         }
    //     } catch (Exception $e) {
    //         http_response_code(500);
    //         echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    //     }
    // }

    public function updateStatus($bookingId)
    {
        try {
            $data = json_decode(file_get_contents("php://input"), true);

            if (!isset($data['status'])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Status is required']);
                return;
            }

            // Validate status
            $validStatuses = ['Pending', 'Confirmed', 'Cancelled'];
            if (!in_array($data['status'], $validStatuses)) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Invalid status']);
                return;
            }

            $result = $this->bookingModel->updateBookingStatus($bookingId, $data['status']);

            header('Content-Type: application/json');
            if ($result) {
                echo json_encode([
                    'success' => true,
                    'message' => 'Booking status updated successfully'
                ]);
            } else {
                http_response_code(500);
                echo json_encode(['success' => false, 'message' => 'Failed to update booking status']);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
    }
}
