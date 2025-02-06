<?php

/**
 * This file has been auto-generated
 * by the Symfony Routing Component.
 */

return [
    false, // $matchHost
    [ // $staticRoutes
        '/api/customers' => [[['_route' => 'api_create_customer', '_controller' => 'App\\Controller\\CustomerController::createCustomer'], null, ['POST' => 0, 'OPTIONS' => 1], null, false, false, null]],
        '/api/match-products' => [[['_route' => 'app_match_products', '_controller' => 'App\\Controller\\ProductMatchingController::matchProducts'], null, ['POST' => 0], null, false, false, null]],
    ],
    [ // $regexpList
        0 => '{^(?'
                .'|/_error/(\\d+)(?:\\.([^/]++))?(*:35)'
            .')/?$}sDu',
    ],
    [ // $dynamicRoutes
        35 => [
            [['_route' => '_preview_error', '_controller' => 'error_controller::preview', '_format' => 'html'], ['code', '_format'], null, null, false, true, null],
            [null, null, null, null, false, false, 0],
        ],
    ],
    null, // $checkCondition
];
