<?php

use App\Models\LocationModel;

require_once __DIR__ . '/../models/location.php';

class LocationController
{
    private $pdo;
    private $locationModel;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
        $this->locationModel = new LocationModel($pdo);
    }

    public function getAllLocations()
    {
        $locations = $this->locationModel->getAllLocations();

        header('Content-Type: application/json');
        if ($locations) {
            echo json_encode([
                'success' => true,
                'data' => $locations
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Failed to fetch locations'
            ]);
        }
    }
}
