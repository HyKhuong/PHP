<?php
class LocationModel {
    private $conn;
    private $table = 'locations';

    public $id;
    public $title;
    public $description;
    public $location;

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
        $query = "SELECT * FROM " . $this->table . " WHERE location_id = ? LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();
        return $stmt;
    }

    // Create tour
    public function create() {
        $query = "INSERT INTO " . $this->table . " 
                  SET title=:title, description=:description, price=:price, 
                  duration=:duration, location=:location";
        
        $stmt = $this->conn->prepare($query);

        // Sanitize data
        $this->title = htmlspecialchars(strip_tags($this->title));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->location = htmlspecialchars(strip_tags($this->location));

        // Bind parameters
        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":location", $this->location);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }

    // Update tour
    public function update() {
        $query = "UPDATE " . $this->table . " 
                  SET title=:title, description=:description, price=:price, 
                  duration=:duration, location=:location
                  WHERE id = :id";
        
        $stmt = $this->conn->prepare($query);

        // Sanitize data
        $this->title = htmlspecialchars(strip_tags($this->title));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->location = htmlspecialchars(strip_tags($this->location));
        $this->id = htmlspecialchars(strip_tags($this->id));

        // Bind parameters
        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":location", $this->location);
        $stmt->bindParam(":id", $this->id);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }

    // Delete tour
    public function delete() {
        $query = "DELETE FROM " . $this->table . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        
        if($stmt->execute()) {
            return true;
        }
        return false;
    }
}
?>