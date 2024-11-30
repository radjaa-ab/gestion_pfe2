<?php

return [
    'manifest_path' => public_path('build/manifest.json'),
    'build_path' => 'build',
    'manifest' => [
        'path' => public_path('build/manifest.json'),
        'url' => env('APP_URL') . '/build/manifest.json',
    ],
];

