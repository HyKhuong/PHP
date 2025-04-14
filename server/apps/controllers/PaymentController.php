<?php
class PaymentController {
    private $paymentModel;

    public function __construct($db) {
        $this->paymentModel = new PaymentModel($db);
    }

    // Create a new payment
    public function createPayment() {
        try {
            // Get raw POST data
            $data = json_decode(file_get_contents("php://input"), true);

            // Validate required fields
            if (
                !isset($data['booking_id']) ||
                !isset($data['amount']) ||
                !isset($data['payment_date']) ||
                !isset($data['payment_method'])
            ) {
                http_response_code(400);
                echo json_encode([
                    "status" => "error",
                    "message" => "Missing required fields."
                ]);
                return;
            }

            // Assign data to model
            $this->paymentModel->booking_id = $data['booking_id'];
            $this->paymentModel->amount = $data['amount'];
            $this->paymentModel->payment_date = $data['payment_date'];
            $this->paymentModel->payment_method = $data['payment_method'];

            // Try to create payment
            if ($this->paymentModel->create()) {
                http_response_code(201);
                echo json_encode([
                    "status" => "success",
                    "message" => "Payment created successfully."
                ]);
            } else {
                http_response_code(500);
                echo json_encode([
                    "status" => "error",
                    "message" => "Failed to create payment."
                ]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error creating payment.",
                "error" => $e->getMessage()
            ]);
        }
    }

    // (Other methods like getAllPayments, getPayment can go here)
}
?>
