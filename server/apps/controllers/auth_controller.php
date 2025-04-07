<?php
// server/apps/controllers/AuthController.php

require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../apps/models/user.php';

class AuthController
{
    private $pdo;
    private $userModel;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
        $this->userModel = new UserModel($pdo);
    }

    // Đăng ký
    public function register()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        error_log("DEBUG: Received registration data - " . json_encode($data));

        $user_name = trim($data['user_name'] ?? '');
        $email = trim($data['email'] ?? '');
        $password = $data['password'] ?? '';

        $errors = [];
        if (empty($user_name)) $errors[] = "Tên không được để trống";
        if (empty($email)) $errors[] = "Email không được để trống";
        if (empty($password)) $errors[] = "Mật khẩu không được để trống";
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "Email không hợp lệ";
        if (strlen($password) < 6) $errors[] = "Mật khẩu phải có ít nhất 6 ký tự";

        if (!empty($errors)) {
            error_log("DEBUG: Validation errors - " . json_encode($errors));
            http_response_code(400);
            echo json_encode(['errors' => $errors]);
            return;
        }

        // Check existing email
        if ($this->userModel->getUserByEmail($email)) {
            http_response_code(400);
            echo json_encode(['errors' => ["Email đã được đăng ký"]]);
            return;
        }

        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        if ($this->userModel->createUser($user_name, $email, $hashedPassword)) {
            http_response_code(201);
            echo json_encode(['message' => "Đăng ký thành công"]);
        } else {
            http_response_code(500);
            echo json_encode(['errors' => ["Đăng ký thất bại"]]);
        }
    }

    // Đăng nhập
    public function login()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        error_log("DEBUG: Login attempt with data: " . json_encode($data));

        $email = trim($data['email'] ?? '');
        $password = $data['password'] ?? '';

        if (empty($email) || empty($password)) {
            http_response_code(400);
            echo json_encode(['errors' => ["Email và mật khẩu không được để trống"]]);
            return;
        }

        $user = $this->userModel->getUserByEmail($email);
        error_log("DEBUG: Found user: " . json_encode($user));

        if (!$user || !password_verify($password, $user['password'])) {
            error_log("DEBUG: Invalid credentials for email: $email");
            http_response_code(401);
            echo json_encode(['errors' => ["Email hoặc mật khẩu không chính xác"]]);
            return;
        }

        // Remove password from response
        unset($user['password']);
        error_log("DEBUG: Login successful for user: " . json_encode($user));

        echo json_encode([
            'message' => 'Đăng nhập thành công',
            'user' => $user
        ]);
    }
}
