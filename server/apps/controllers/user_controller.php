<?php
// server/apps/controllers/UserController.php

require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../apps/models/user.php';

class UserController
{
    private $pdo;
    private $userModel;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
        $this->userModel = new UserModel($pdo);
    }

    // Hàm lấy tất cả người dùng
    public function getAllUsers()
    {
        $users = $this->userModel->getAllUsers();

        header('Content-Type: application/json');
        echo json_encode(['users' => $users]);
    }

    public function getUserById($userid)
    {
        $user = $this->userModel->getUserById($userid);

        header('Content-Type: application/json');
        if ($user) {
            echo json_encode(['success' => true, 'user' => $user]);
        } else {
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'User not found']);
        }
    }
}
