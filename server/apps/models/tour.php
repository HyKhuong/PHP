<?php

namespace App\Models;

use PDO;
use PDOException;

class TourModel
{

    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    // Hàm lấy thông tin người dùng theo email
    public function getTourByID($tourid)
    {
        try {
            $stmt = $this->pdo->prepare("SELECT * FROM tours WHERE tour_id = ?");
            $stmt->execute([$tourid]);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("DEBUG: Database error in getTourByID - " . $e->getMessage());
            return false;
        }
    }

    public function getAllTours()
    {
        $sql = "SELECT * FROM tours";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function createTour($data)
    {
        try {
            $sql = "INSERT INTO tours (title, description, price, category_id, location_id, available, 
                    start_date, end_date, status) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

            $stmt = $this->pdo->prepare($sql);
            return $stmt->execute([
                $data['title'],
                $data['description'],
                $data['price'],
                $data['category_id'],
                $data['location_id'],
                $data['available'],
                $data['start_date'],
                $data['end_date'],
                $data['status'] ?? 'Active'
            ]);
        } catch (PDOException $e) {
            error_log("Error creating tour: " . $e->getMessage());
            return false;
        }
    }

    public function updateTour($tourid, $data)
    {
        try {
            $currentTour = $this->getTourByID($tourid);
            if (!$currentTour) {
                return false;
            }

            // Chuẩn bị dữ liệu cập nhật, giữ lại giá trị cũ nếu không có giá trị mới
            $updateData = [
                'title' => $data['title'] ?? $currentTour['title'],
                'description' => $data['description'] ?? $currentTour['description'],
                'price' => $data['price'] ?? $currentTour['price'],
                'category_id' => $data['category_id'] ?? $currentTour['category_id'],
                'location_id' => $data['location_id'] ?? $currentTour['location_id'],
                'available' => $data['available'] ?? $currentTour['available'],
                'start_date' => $data['start_date'] ?? $currentTour['start_date'],
                'end_date' => $data['end_date'] ?? $currentTour['end_date'],
                'status' => $data['status'] ?? $currentTour['status']
            ];

            $sql = "UPDATE tours SET 
                    title = ?, description = ?, price = ?, 
                    category_id = ?, location_id = ?, available = ?,
                    start_date = ?, end_date = ?, status = ?
                    WHERE tour_id = ?";

            $stmt = $this->pdo->prepare($sql);
            $result = $stmt->execute([
                $updateData['title'],
                $updateData['description'],
                $updateData['price'],
                $updateData['category_id'],
                $updateData['location_id'],
                $updateData['available'],
                $updateData['start_date'],
                $updateData['end_date'],
                $updateData['status'],
                $tourid
            ]);

            if ($result) {
                return true;
            }
            return false;
        } catch (PDOException $e) {
            error_log("Error updating tour: " . $e->getMessage());
            return false;
        }
    }

    public function deleteTour($tourid)
    {
        try {
            $this->pdo->beginTransaction();

            // 1. Xóa các bookings liên quan đến tour
            $sql = "DELETE FROM bookings WHERE tour_id = ?";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([$tourid]);

            // 2. Xóa tour
            $sql = "DELETE FROM tours WHERE tour_id = ?";
            $stmt = $this->pdo->prepare($sql);
            $result = $stmt->execute([$tourid]);

            if ($result) {
                $this->pdo->commit();
                return true;
            } else {
                $this->pdo->rollBack();
                return false;
            }
        } catch (PDOException $e) {
            $this->pdo->rollBack();
            error_log("Error deleting tour: " . $e->getMessage());
            return false;
        }
    }
}
