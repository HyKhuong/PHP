<?php
require_once __DIR__ . '/../apps/controllers/category_controller.php';

global $router;

$router->get('/api/categories', function () {
    $categoryController = new CategoryController($GLOBALS['pdo']);
    $categoryController->getAllCategories();
});
