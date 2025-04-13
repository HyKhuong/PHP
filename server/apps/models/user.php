<?php
class UserModel
{

    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    // Hàm tạo người dùng mới
    public function createUser($user_name, $email, $password)
    {
        try {
            $stmt = $this->pdo->prepare("INSERT INTO users (user_name, email, password) VALUES (?, ?, ?)");
            $stmt->execute([$user_name, $email, $password]);
            return true;
        } catch (PDOException $e) {
            error_log("DEBUG: Database error - " . $e->getMessage());
            return false;
        }
    }

    // Hàm lấy thông tin người dùng theo email
    public function getUserByEmail($email)
    {
        try {
            $stmt = $this->pdo->prepare("SELECT * FROM users WHERE email = ?");
            $stmt->execute([$email]);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("DEBUG: Database error in getUserByEmail - " . $e->getMessage());
            return false;
        }
    }

    public function getUserById($userid)
    {
        try {
            $stmt = $this->pdo->prepare("SELECT user_id, user_name, email FROM users WHERE user_id = ?");
            $stmt->execute([$userid]);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("DEBUG: Database error in getUserById - " . $e->getMessage());
            return false;
        }
    }

    public function getAllUsers()
    {
        $sql = "SELECT * FROM users";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll();
    }
}
