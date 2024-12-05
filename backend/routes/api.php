<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EtudiantController;
use App\Http\Controllers\EnseignantController;
use App\Http\Controllers\EntrepriseController;
use App\Http\Controllers\PFEController;
use App\Http\Controllers\SoutenanceController;

// Public routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::get('/login', function () {
    return response()->json(['message' => 'Please send a POST request to this endpoint with your login credentials.'], 405);
});

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', [AuthController::class, 'logout']);

    // User routes
    Route::apiResource('users', UserController::class);

    // Student routes
    Route::apiResource('etudiants', EtudiantController::class);

    // Teacher routes
    Route::apiResource('enseignants', EnseignantController::class);

    // Company routes
    Route::apiResource('entreprises', EntrepriseController::class);

    // PFE routes
    Route::apiResource('pfes', PFEController::class);

    // Defense routes
    Route::apiResource('soutenances', SoutenanceController::class);
});

