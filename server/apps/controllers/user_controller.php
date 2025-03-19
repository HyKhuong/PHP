<?php
require_once __DIR__ . '/../models/user.php';

class UserController {
    public function index() {
        $userModel = new User();
        $users = $userModel->getAllUsers();
        echo json_encode($users);
    }
}
