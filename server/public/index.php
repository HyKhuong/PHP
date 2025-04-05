<?php

require_once __DIR__ . '/../apps/controllers/tour_controller.php';

$routes = require 'routes.php';

$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Hàm khớp route
function matchRoute($method, $uri, $routes) {
    foreach ($routes as $route) {
        [$routeMethod, $routePath, $handler] = $route;

        // Kiểm tra method
        if ($method !== $routeMethod) {
            continue;
        }

        // Xử lý biến đường dẫn, ví dụ: /tours/{id}
        $pattern = preg_replace('/\{[a-zA-Z_]+\}/', '([0-9]+)', $routePath);
        $pattern = "#^" . $pattern . "$#";

        if (preg_match($pattern, $uri, $matches)) {
            array_shift($matches); // bỏ kết quả full match
            return [$handler, $matches];
        }
    }

    return [null, []];
}

// Tìm route khớp
[$handler, $params] = matchRoute($method, $uri, $routes);

if ($handler) {
    [$controllerName, $methodName] = explode('@', $handler);
    $controller = new $controllerName();
    call_user_func_array([$controller, $methodName], $params);
} else {
    http_response_code(404);
    echo "404 Not Found";
}
