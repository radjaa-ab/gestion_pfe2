<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use App\Http\Controllers\PfeProposalController;



use App\Http\Controllers\AuthController;


// Public routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // User management routes
    Route::apiResource('users', UserController::class);
    Route::post('/users/import', [UserController::class, 'importCsv']);
});

// Route pour récupérer les informations de l'utilisateur authentifié
Route::middleware([EnsureFrontendRequestsAreStateful::class, 'auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

////


Route::middleware('auth:sanctum')->group(function () {
    Route::get('pfe-proposals', [PfeProposalController::class, 'index']);
    Route::post('pfe-proposals', [PfeProposalController::class, 'store']);
    Route::get('pfe-proposals/{pfeProposal}', [PfeProposalController::class, 'show']);
    Route::put('pfe-proposals/{pfeProposal}', [PfeProposalController::class, 'update']);
    Route::delete('pfe-proposals/{pfeProposal}', [PfeProposalController::class, 'destroy']);
});

