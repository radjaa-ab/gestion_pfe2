<?php

return [
    'manifest_path' => public_path('build/.vite/manifest.json'),

    'build_path' => 'build',

    'manifest' => [
        'path' => public_path('build/.vite/manifest.json'),
        'url' => env('APP_URL') . '/build/.vite/manifest.json',
    ],
];

