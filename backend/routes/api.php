<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');*/


use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EtudiantController;
use App\Http\Controllers\EnseignantController;
use App\Http\Controllers\EntrepriseController;
use App\Http\Controllers\PFEController;
use App\Http\Controllers\SoutenanceController;

// Routes publiques
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Routes protégées
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // Routes pour les utilisateurs
    Route::apiResource('users', UserController::class);

    // Routes pour les étudiants
    Route::apiResource('etudiants', EtudiantController::class);

    // Routes pour les enseignants
    Route::apiResource('enseignants', EnseignantController::class);

    // Routes pour les entreprises
    Route::apiResource('entreprises', EntrepriseController::class);

    // Routes pour les PFEs
    Route::apiResource('pfes', PFEController::class);

    // Routes pour les soutenances
    Route::apiResource('soutenances', SoutenanceController::class);
});
