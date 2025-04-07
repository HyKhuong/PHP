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

    // // Hàm tạo người dùng mới
    // public function createUser($user_name, $email, $password)
    // {
    //     try {
    //         $stmt = $this->pdo->prepare("INSERT INTO users (user_name, email, password) VALUES (?, ?, ?)");
    //         $stmt->execute([$user_name, $email, $password]);
    //         return true;
    //     } catch (PDOException $e) {
    //         error_log("DEBUG: Database error - " . $e->getMessage());
    //         return false;
    //     }
    // }

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
        return $stmt->fetchAll();
    }
}
