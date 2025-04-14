<?php
class AuthController
{
    private $db;
    private $userModel;

    public function __construct($db)
    {
        $this->db = $db;
        $this->userModel = new UserModel($db);
    }

    // User login
    public function loginUser($data)
    {
        try {
            // Validate required fields
            $required = ['email', 'password'];
            foreach ($required as $field) {
                if (empty($data[$field])) {
                    http_response_code(400);
                    echo json_encode([
                        "success" => false,
                        "message" => "Missing required field: $field",
                        "error" => "validation_error"
                    ]);
                    return;
                }
            }
    
            $username = htmlspecialchars(strip_tags($data['email']));
            $password = $data['password'];
    
            if ($this->userModel->login($username, $password)) {
                // Generate token (use real JWT in production)
                $token = bin2hex(random_bytes(16)); // or use JWT if needed
    
                // Start session (optional if using tokens)
                session_start();
                $_SESSION['user_id'] = $this->userModel->id;
                $_SESSION['email'] = $this->userModel->email;
    
                http_response_code(200);
                echo json_encode([
                    "success" => true,
                    "message" => "Login successful.",
                    "user" => [
                        "id" => $this->userModel->id,
                        "email" => $this->userModel->email
                    ],
                    "token" => $token
                ]);
            } else {
                http_response_code(401);
                echo json_encode([
                    "success" => false,
                    "message" => "Sai tên đăng nhập hoặc mật khẩu",
                    "error" => "invalid_credentials"
                ]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "success" => false,
                "message" => "Lỗi máy chủ khi đăng nhập.",
                "error" => $e->getMessage()
            ]);
        }
    }

    // User logout
    public function logoutUser()
    {
        try {
            session_start();
            if (isset($_SESSION['user_id'])) {
                session_unset();
                session_destroy();

                http_response_code(200);
                echo json_encode([
                    "status" => "success",
                    "message" => "Logout successful."
                ]);
            } else {
                http_response_code(400);
                echo json_encode([
                    "status" => "error",
                    "message" => "No active session to logout."
                ]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Failed to logout.",
                "error" => $e->getMessage()
            ]);
        }
    }

    // User registration (optional, if you want to allow registration via API)
    public function registerUser($data)
    {
        try {
            // Validate required fields
            $required = ['name', 'email', 'password']; // Match your frontend fields
            foreach ($required as $field) {
                if (empty($data[$field])) {
                    http_response_code(400);
                    echo json_encode([
                        "success" => false,  // Match your frontend check
                        "message" => "Missing required field: $field",
                        "error" => "validation_error"
                    ]);
                    return;
                }
            }

            // Sanitize and validate input
            $name = htmlspecialchars(strip_tags($data['name']));
            $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
            $password = $data['password'];

            // Validate email format
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                http_response_code(400);
                echo json_encode([
                    "success" => false,
                    "message" => "Invalid email format",
                    "error" => "invalid_email"
                ]);
                return;
            }

            // Check if 'id' column exists in the 'users' table
            $columnCheck = $this->db->prepare("SHOW COLUMNS FROM users LIKE 'id'");
            $columnCheck->execute();

            $idColumnExists = $columnCheck->rowCount() > 0;

            // Only check email if 'id' column exists
            if ($idColumnExists) {
                $query = "SELECT id FROM users WHERE email = :email LIMIT 1";
                $stmt = $this->db->prepare($query);
                $stmt->bindParam(":email", $email);
                $stmt->execute();

                if ($stmt->rowCount() > 0) {
                    http_response_code(409);
                    echo json_encode([
                        "success" => false,
                        "message" => "Email already exists.",
                        "error" => "email_exists"
                    ]);
                    return;
                }
            }

            // Register the user
            if ($this->userModel->register($name, $email, $password)) {
                http_response_code(201);
                echo json_encode([
                    "success" => true,
                    "message" => "User registered successfully."
                ]);
            } else {
                throw new Exception("Database error while registering user");
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "success" => false,
                "message" => "Failed to register user.",
                "error" => $e->getMessage()
            ]);
        }
    }

    public function updateUser($id, $inputData) {
        try {
            // Validate user ID
            if (empty($id) || !is_numeric($id)) {
                http_response_code(400);
                echo json_encode([
                    "success" => false,
                    "message" => "Invalid or missing user ID"
                ]);
                return;
            }
    
            // Sanitize and collect fields (optional)
            $name         = isset($inputData['user_name']) ? htmlspecialchars(strip_tags($inputData['user_name'])) : null;
            $email        = isset($inputData['email']) ? htmlspecialchars(strip_tags($inputData['email'])) : null;
            $phone_number = isset($inputData['phone_number']) ? htmlspecialchars(strip_tags($inputData['phone_number'])) : null;
            $address      = isset($inputData['address']) ? htmlspecialchars(strip_tags($inputData['address'])) : null;
            $image        = isset($inputData['image']) ? htmlspecialchars(strip_tags($inputData['image'])) : null;
            $dob          = isset($inputData['dob']) ? htmlspecialchars(strip_tags($inputData['dob'])) : null;
    
            // Call model to update
            $result = $this->userModel->updateUser($id, $name, $email, $phone_number, $address, $image, $dob);
    
            // Response
            http_response_code($result['success'] ? 200 : 400);
            echo json_encode($result);
    
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "success" => false,
                "message" => "Server error while updating user",
                "error" => $e->getMessage()
            ]);
        }
    }
    
    

    // Get current user (optional, to check if a user is logged in)
    public function getUsers()
    {
        try {
            $users = $this->userModel->getUsers();

            if ($users !== null) {
                http_response_code(200);
                echo json_encode([
                    "status" => "success",
                    "data" => $users
                ]);
            } else {
                http_response_code(404);
                echo json_encode([
                    "status" => "success",
                    "message" => "No users found.",
                    "data" => []
                ]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Failed to retrieve users.",
                "error" => $e->getMessage()
            ]);
        }
    }
}
