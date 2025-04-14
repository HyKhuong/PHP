<?php
// routes.php

$routes = [
    ['GET', '/tours', 'TourController@index'],
    ['GET', '/tours/{id}', 'TourController@get'],
    ['POST', '/tours', 'TourController@create'],
    ['PUT', '/tours/{id}', 'TourController@update'],
    ['DELETE', '/tours/{id}', 'TourController@delete'],
];

return $routes;
