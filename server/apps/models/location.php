<?php

namespace App\Models;

use PDO;
use PDOException;

class LocationModel
{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function getAllLocations()
    {
        try {
            $stmt = $this->pdo->prepare("SELECT * FROM locations");
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("Error fetching locations: " . $e->getMessage());
            return false;
        }
    }
}
