<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EtudiantController;
use App\Http\Controllers\EnseignantController;
use App\Http\Controllers\EntrepriseController;
use App\Http\Controllers\PFEController;
use App\Http\Controllers\SoutenanceController;


Route::prefix('api')->group(function () {
    // Public routes
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    // Protected routes
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::apiResource('users', UserController::class);
        Route::apiResource('etudiants', EtudiantController::class);
        Route::apiResource('enseignants', EnseignantController::class);
        Route::apiResource('entreprises', EntrepriseController::class);
        Route::apiResource('pfes', PFEController::class);
        Route::apiResource('soutenances', SoutenanceController::class);
    });
});

