<?php
require_once __DIR__ . '/../database/database.php';

class TourModel {
    private $conn;
    private $table_name = "tours";

    public $id;
    public $name;
    public $description;
    public $price;
    public $duration;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Lấy tất cả tour
    public function getAllTours() {
        $query = "SELECT * FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Lấy 1 tour theo ID
    public function getTourById($id) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE id = ? LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $id);
        $stmt->execute();
        return $stmt;
    }

    public function addTour($data) {
        $stmt = $this->conn->prepare("INSERT INTO Tours (title, category_id, location_id, description, price, duration, start_date, end_date, available, image_url, status, create_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())");
        $stmt->bind_param("siissississ", $data['title'], $data['category_id'], $data['location_id'], $data['description'], $data['price'], $data['duration'], $data['start_date'], $data['end_date'], $data['available'], $data['image_url'], $data['status']);
        $stmt->execute();
        $stmt->close();
        return $this->conn->insert_id; // Return the ID of the newly inserted tour
    }

    public function updateTour($id, $data) {
        $stmt = $this->conn->prepare("UPDATE Tours SET title=?, category_id=?, location_id=?, description=?, price=?, duration=?, start_date=?, end_date=?, available=?, image_url=?, status=? WHERE tour_id=?");
        $stmt->bind_param("siississssi", $data['title'], $data['category_id'], $data['location_id'], $data['description'], $data['price'], $data['duration'], $data['start_date'], $data['end_date'], $data['available'], $data['image_url'], $data['status'], $id);
        $stmt->execute();
        $stmt->close();
        return $stmt->affected_rows;
    }

    public function deleteTour($id) {
        $stmt = $this->conn->prepare("DELETE FROM Tours WHERE tour_id=?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $stmt->close();
        return $stmt->affected_rows;
    }
}
?>