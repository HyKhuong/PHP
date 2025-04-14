<?php
class BookingController {
    private $bookingModel;

    public function __construct($db) {
        $this->bookingModel = new BookingModel($db);
    }

    // Get all bookings
    public function getAllBookings() {
        try {
            $stmt = $this->bookingModel->getAll();
            $bookings = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if(count($bookings) > 0) {
                http_response_code(200);
                echo json_encode([
                    "status" => "success",
                    "data" => $bookings
                ]);
            } else {
                http_response_code(404);
                echo json_encode([
                    "status" => "success",
                    "message" => "No bookings found.",
                    "data" => []
                ]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Failed to retrieve bookings.",
                "error" => $e->getMessage()
            ]);
        }
    }

    // Get single booking
    public function getUserBooking($id) {
        try {
            $this->bookingModel->user_id = $id;
            $booking = $this->bookingModel->getById();

            if($booking) {
                http_response_code(200);
                echo json_encode([
                    "status" => "success",
                    "data" => $booking
                ]);
            } else {
                http_response_code(404);
                echo json_encode([
                    "status" => "error",
                    "message" => "user booking not found."
                ]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Failed to retrieve booking.",
                "error" => $e->getMessage()
            ]);
        }
    }

    public function getBookingById($id) {
        try {
            $this->bookingModel->booking_id = $id;
            $booking = $this->bookingModel->getBookingById();

            if($booking) {
                http_response_code(200);
                echo json_encode([
                    "status" => "success",
                    "data" => $booking
                ]);
            } else {
                http_response_code(404);
                echo json_encode([
                    "status" => "error",
                    "message" => "Booking not found."
                ]);
            }
        } catch(Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Failed to retrieve booking.",
                "error" => $e->getMessage()
            ]);
        }
    }

    // Create new booking
    public function createBooking($data) {
        try {
            // Set booking properties
            $this->bookingModel->booking_id = $data['booking_id'];
            $this->bookingModel->user_id = $data['user_id'];
            $this->bookingModel->tour_id = $data['tour_id'];
            $this->bookingModel->booking_date = $data['booking_date'];
            $this->bookingModel->number_of_people = $data['number_of_people'];
            $this->bookingModel->total_price = $data['total_price'];

            // Create booking
            if($this->bookingModel->create()) {
                http_response_code(201);
                echo json_encode([
                    "status" => "success",
                    "message" => "Booking created successfully."
                ]);
            } else {
                http_response_code(400);
                echo json_encode([
                    "status" => "error",
                    "message" => "Unable to create booking."
                ]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Failed to create booking.",
                "error" => $e->getMessage()
            ]);
        }
    }

    // Update booking
    public function updateBooking($id, $data) {
        try {
            // Set ID property
            $this->bookingModel->booking_id = $id;

            // Check if booking exists first
            $stmt = $this->bookingModel->getById();
            if(!$stmt->fetch(PDO::FETCH_ASSOC)) {
                http_response_code(404);
                echo json_encode([
                    "status" => "error",
                    "message" => "Booking not found."
                ]);
                return;
            }

            // Set booking properties
            $this->bookingModel->user_id = $data['user_id'];
            $this->bookingModel->tour_id = $data['tour_id'];
            $this->bookingModel->booking_date = $data['booking_date'];
            $this->bookingModel->number_of_people = $data['number_of_people'];
            $this->bookingModel->total_price = $data['total_price'];

            // Update booking
            if($this->bookingModel->update()) {
                http_response_code(200);
                echo json_encode([
                    "status" => "success",
                    "message" => "Booking updated successfully."
                ]);
            } else {
                http_response_code(400);
                echo json_encode([
                    "status" => "error",
                    "message" => "Unable to update booking."
                ]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Failed to update booking.",
                "error" => $e->getMessage()
            ]);
        }
    }

    // Delete booking
    public function deleteBooking($id) {
        try {
            // Set ID property
            $this->bookingModel->booking_id = $id;

            // Check if booking exists first
            $stmt = $this->bookingModel->getById();
            if(!$stmt->fetch(PDO::FETCH_ASSOC)) {
                http_response_code(404);
                echo json_encode([
                    "status" => "error",
                    "message" => "Booking not found."
                ]);
                return;
            }

            // Delete booking
            if($this->bookingModel->delete()) {
                http_response_code(200);
                echo json_encode([
                    "status" => "success",
                    "message" => "Booking deleted successfully."
                ]);
            } else {
                http_response_code(400);
                echo json_encode([
                    "status" => "error",
                    "message" => "Unable to delete booking."
                ]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Failed to delete booking.",
                "error" => $e->getMessage()
            ]);
        }
    }
}
?>