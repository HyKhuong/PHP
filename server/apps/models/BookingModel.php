<?php
class BookingModel {
    private $conn;
    private $table = 'bookings';

    // Booking properties
    public $booking_id;
    public $user_id;
    public $tour_id;
    public $booking_date;
    public $number_of_people;
    public $total_price;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Get all bookings
    public function getAll() {
        $query = "SELECT * FROM " . $this->table;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Get single booking by ID
    public function getById() {
        $query = "SELECT * FROM {$this->table} WHERE user_id = :user_id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $this->user_id, PDO::PARAM_INT);
        $stmt->execute();
    
        // Trả về một dòng dữ liệu dưới dạng array
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getBookingById() {
        $query = "SELECT * FROM {$this->table} WHERE booking_id = :booking_id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':booking_id', $this->booking_id, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Create new booking
    public function create() {
        $query = "INSERT INTO " . $this->table . " 
                  (booking_id, user_id, tour_id, booking_date, number_of_people, total_price) 
                  VALUES (:booking_id, :user_id, :tour_id, :booking_date, :number_of_people, :total_price)";
        
        $stmt = $this->conn->prepare($query);

        // Bind parameters
        $stmt->bindParam(':booking_id', $this->booking_id);
        $stmt->bindParam(':user_id', $this->user_id);
        $stmt->bindParam(':tour_id', $this->tour_id);
        $stmt->bindParam(':booking_date', $this->booking_date);
        $stmt->bindParam(':number_of_people', $this->number_of_people);
        $stmt->bindParam(':total_price', $this->total_price);

        // Execute query
        if($stmt->execute()) {
            return true;
        }

        // Print error if something goes wrong
        printf("Error: %s.\n", $stmt->error);
        return false;
    }

    // Update booking
    public function update() {
        $query = "UPDATE " . $this->table . " 
                  SET 
                    user_id = :user_id,
                    tour_id = :tour_id,
                    booking_date = :booking_date,
                    number_of_people = :number_of_people,
                    total_price = :total_price
                  WHERE 
                    booking_id = :booking_id";
        
        $stmt = $this->conn->prepare($query);

        // Bind parameters
        $stmt->bindParam(':booking_id', $this->booking_id);
        $stmt->bindParam(':user_id', $this->user_id);
        $stmt->bindParam(':tour_id', $this->tour_id);
        $stmt->bindParam(':booking_date', $this->booking_date);
        $stmt->bindParam(':number_of_people', $this->number_of_people);
        $stmt->bindParam(':total_price', $this->total_price);

        // Execute query
        if($stmt->execute()) {
            return true;
        }

        // Print error if something goes wrong
        printf("Error: %s.\n", $stmt->error);
        return false;
    }

    // Delete booking
    public function delete() {
        $query = "DELETE FROM " . $this->table . " WHERE booking_id = :booking_id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':booking_id', $this->booking_id);
        
        // Execute query
        if($stmt->execute()) {
            return true;
        }

        // Print error if something goes wrong
        printf("Error: %s.\n", $stmt->error);
        return false;
    }
}
?>