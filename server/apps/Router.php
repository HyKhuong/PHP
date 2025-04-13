<?php
// C:\xampp\htdocs\PHP\server\apps\Router.php

class Router
{
    private $routes = [
        'GET'    => [],
        'POST'   => [],
        'PUT'    => [],
        'DELETE' => []
    ];

    public function get($path, $callback)
    {
        $this->routes['GET'][$path] = $callback;
    }

    public function post($path, $callback)
    {
        $this->routes['POST'][$path] = $callback;
    }

    public function put($path, $callback)
    {
        $this->routes['PUT'][$path] = $callback;
    }

    public function delete($path, $callback)
    {
        $this->routes['DELETE'][$path] = $callback;
    }

    private function matchRoute($routePath, $requestPath)
    {
        $routeParts = explode('/', trim($routePath, '/'));
        $requestParts = explode('/', trim($requestPath, '/'));

        if (count($routeParts) !== count($requestParts)) {
            return false;
        }

        $params = [];
        for ($i = 0; $i < count($routeParts); $i++) {
            if (strpos($routeParts[$i], ':') === 0) {
                $params[substr($routeParts[$i], 1)] = $requestParts[$i];
                continue;
            }
            if ($routeParts[$i] !== $requestParts[$i]) {
                return false;
            }
        }
        return $params;
    }

    public function run()
    {
        $method = $_SERVER['REQUEST_METHOD'];
        // Handle PUT and DELETE requests from forms/AJAX
        if ($method === 'POST' && isset($_SERVER['HTTP_X_HTTP_METHOD'])) {
            if ($_SERVER['HTTP_X_HTTP_METHOD'] === 'PUT' || $_SERVER['HTTP_X_HTTP_METHOD'] === 'DELETE') {
                $method = $_SERVER['HTTP_X_HTTP_METHOD'];
            }
        }

        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $basePath = '/PHP/server/public';
        $route = trim(str_replace($basePath, '', $uri), "/ \n\r\t");

        error_log("DEBUG: Method - " . $method);
        error_log("DEBUG: Route - " . $route);

        if (!isset($this->routes[$method])) {
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
            return;
        }

        foreach ($this->routes[$method] as $path => $callback) {
            $params = $this->matchRoute($path, $route);
            if ($params !== false) {
                return call_user_func_array($callback, $params);
            }
        }

        http_response_code(404);
        echo json_encode(['error' => 'Route not found']);
    }
}
