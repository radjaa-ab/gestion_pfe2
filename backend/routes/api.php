// routes/api.php  (All API routes should be here)
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ImportController;
use App\Http\Controllers\UserController; // Import the UserController
use App\Http\Controllers\PFEController;


Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']); // Add register route

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {  // Route to get authenticated user
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/change-password', [AuthController::class, 'changePassword']);
    Route::apiResource('pfes', PFEController::class);
    Route::post('/import-users', [ImportController::class, 'importUsers'])->middleware('role:admin');
    Route::apiResource('users', UserController::class)->middleware('role:admin'); // Add user resource routes
});
