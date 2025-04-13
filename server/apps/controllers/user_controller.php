<?php
// server/apps/controllers/UserController.php

require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../models/user.php';

class UserController
{
    private $pdo;
    private $userModel;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
        $this->userModel = new UserModel($pdo); // Fixed typo: was "this->" instead of "$this->"
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

    public function updateUser($userId)
    {
        try {
            $data = json_decode(file_get_contents("php://input"), true);

            if (!isset($data['user_name']) || !isset($data['email'])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Missing required fields']);
                return;
            }

            $result = $this->userModel->updateUser($userId, $data);

            header('Content-Type: application/json');
            if ($result) {
                $updatedUser = $this->userModel->getUserById($userId);
                echo json_encode([
                    'success' => true,
                    'message' => 'User updated successfully',
                    'data' => $updatedUser
                ]);
            } else {
                http_response_code(500);
                echo json_encode(['success' => false, 'message' => 'Failed to update user']);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
    }

    public function deleteUser($userId)
    {
        try {
            if (!$this->userModel->getUserById($userId)) {
                http_response_code(404);
                echo json_encode(['success' => false, 'message' => 'User not found']);
                return;
            }

            $result = $this->userModel->deleteUser($userId);

            header('Content-Type: application/json');
            if ($result) {
                echo json_encode(['success' => true, 'message' => 'User deleted successfully']);
            } else {
                http_response_code(500);
                echo json_encode(['success' => false, 'message' => 'Failed to delete user']);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
    }
}
