<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

// Catch-all route for React frontend
Route::view('/{path?}', 'app')->where('path', '.*');

// Test route
Route::get('/test', function () {
    return 'Test route works!';
});

// API Routes for login, logout, and user
Route::prefix('api')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
});
