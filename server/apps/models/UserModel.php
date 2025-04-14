<?php
class UserModel {
    private $conn;
    private $table_name = "users";

    public $id;
    public $email;
    public $password;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Check if user exists and verify password
    public function login($email, $password)
    {
        try {
            $query = "SELECT * FROM " . $this->table_name . " 
                      WHERE email = :email AND password = :password 
                      LIMIT 1";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":email", $email);
            $stmt->bindParam(":password", $password); // ⚠️ Plain text password
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                $user = $stmt->fetch(PDO::FETCH_ASSOC);

                // Remove sensitive info before returning
                unset($user['password']);

                // Set class properties
                $this->id = $user['user_id'];
                $this->email = $user['email'];

                return $user;
            }

            return false; // No match found
        } catch (PDOException $e) {
            error_log("Login error: " . $e->getMessage());
            return false;
        }
    }

    // Create a new user (for registration, if needed)
    public function register($name, $email, $password) {
        // Validate input
        if (empty($name) || empty($email) || empty($password)) {
            return false;
        }
        
        $query = "INSERT INTO " . $this->table_name . " 
                  (user_name, email, password, create_at) 
                  VALUES (:name, :email, :password, NOW())";
                  
        $stmt = $this->conn->prepare($query);
        
        // Store password in plain text (INSECURE!)
        $stmt->bindParam(":name", $name);
        $stmt->bindParam(":email", $email);
        $stmt->bindParam(":password", $password); // Storing raw password
        
        return $stmt->execute();
    }

    public function getUsers() {
        try {
            $query = "SELECT * FROM " . $this->table_name;
            $stmt = $this->conn->prepare($query);
            $stmt->execute();

            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return $stmt->rowCount() > 0 ? $rows : null;
        } catch (PDOException $e) {
            // Optionally log the error
            error_log("Error in getUsers: " . $e->getMessage());
            throw new Exception("Failed to retrieve users: " . $e->getMessage());
        }
    }

    public function updateUser($id, $name = null, $email = null, $phone_number = null, $address = null, $image = null, $dob = null) {
        $fields = [];
        $params = [];
    
        if ($name !== null)         { $fields[] = "user_name = ?";   $params[] = $name; }
        if ($email !== null)        { $fields[] = "email = ?";       $params[] = $email; }
        if ($phone_number !== null) { $fields[] = "phone_number = ?";$params[] = $phone_number; }
        if ($address !== null)      { $fields[] = "address = ?";     $params[] = $address; }
        if ($image !== null)        { $fields[] = "image = ?";       $params[] = $image; }
        if ($dob !== null)          { $fields[] = "dob = ?";         $params[] = $dob; }
    
        if (empty($fields)) {
            return ["success" => false, "message" => "No fields to update"];
        }
    
        $query = "UPDATE users SET " . implode(", ", $fields) . " WHERE user_id = ?";
        $params[] = $id;
    
        $stmt = $this->conn->prepare($query);
        if ($stmt->execute($params)) {
            return [
                "success" => true,
                "message" => "User updated successfully",
                "data" => ["user_id" => $id]
            ];
        } else {
            return ["success" => false, "message" => "Failed to update user"];
        }
    }    
    
}
?>