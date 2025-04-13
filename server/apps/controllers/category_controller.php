<?php

use App\Models\CategoryModel;

require_once __DIR__ . '/../models/category.php';

class CategoryController
{
    private $pdo;
    private $categoryModel;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
        $this->categoryModel = new CategoryModel($pdo);
    }

    public function getAllCategories()
    {
        $categories = $this->categoryModel->getAllCategories();

        header('Content-Type: application/json');
        if ($categories) {
            echo json_encode([
                'success' => true,
                'data' => $categories
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Failed to fetch categories'
            ]);
        }
    }
}
