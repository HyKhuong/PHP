<?php
class PaymentModel {
    private $conn;
    private $table = 'payment';

    public $payment_id;
    public $booking_id;
    public $amount;
    public $payment_date;
    public $payment_method;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Create new payment
    public function create() {
        $query = "INSERT INTO " . $this->table . " 
                  (booking_id, amount, payment_date, payment_method) 
                  VALUES (:booking_id, :amount, :payment_date, :payment_method)";
        
        $stmt = $this->conn->prepare($query);

        // Sanitize
        $this->booking_id = htmlspecialchars(strip_tags($this->booking_id));
        $this->amount = htmlspecialchars(strip_tags($this->amount));
        $this->payment_date = htmlspecialchars(strip_tags($this->payment_date));
        $this->payment_method = htmlspecialchars(strip_tags($this->payment_method));

        // Bind values
        $stmt->bindParam(":booking_id", $this->booking_id);
        $stmt->bindParam(":amount", $this->amount);
        $stmt->bindParam(":payment_date", $this->payment_date);
        $stmt->bindParam(":payment_method", $this->payment_method);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }
}
?>
