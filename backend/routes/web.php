<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Your custom route for React app
Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');