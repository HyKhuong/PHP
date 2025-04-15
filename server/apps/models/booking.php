<?php

namespace App\Models;

use PDO;
use PDOException;

class BookingModel
{

    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    // Hàm lấy thông tin người dùng theo email
    public function getBookingByID($bookingid)
    {
        try {
            $stmt = $this->pdo->prepare("SELECT * FROM bookings WHERE booking_id = ?");
            $stmt->execute([$bookingid]);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("DEBUG: Database error in getBookingID - " . $e->getMessage());
            return false;
        }
    }
    public function getAllBookings()
    {
        try {
            $stmt = $this->pdo->prepare("SELECT * FROM bookings");
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("Error fetching bookings: " . $e->getMessage());
            return false;
        }
    }

    public function updateBookingStatus($bookingId, $status)
    {
        try {
            $sql = "UPDATE bookings SET status = ? WHERE booking_id = ?";
            $stmt = $this->pdo->prepare($sql);
            $result = $stmt->execute([$status, $bookingId]);

            if ($result) {
                error_log("Successfully updated booking status for ID: $bookingId to $status");
                return true;
            }
            return false;
        } catch (PDOException $e) {
            error_log("Error updating booking status: " . $e->getMessage());
            return false;
        }
    }
}
