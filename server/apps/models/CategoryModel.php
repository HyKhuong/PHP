<?php
class CategoryModel {
    private $conn;
    private $table = 'categories';

    public $id;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Get all tours
    public function getAll() {
        $query = "SELECT * FROM " . $this->table;   
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Get single tour
    public function getById() {
        $query = "SELECT * FROM " . $this->table . " WHERE category_id = ? LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();
        return $stmt;
    }
}
?>