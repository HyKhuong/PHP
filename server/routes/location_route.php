<?php
require_once __DIR__ . '/../apps/controllers/location_controller.php';

global $router;

$router->get('/api/locations', function () {
    $locationController = new LocationController($GLOBALS['pdo']);
    $locationController->getAllLocations();
});
