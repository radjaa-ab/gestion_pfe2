<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PfeProposalController;

// API Routes for login, logout, and user
Route::prefix('api')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
});

// Catch-all route for React frontend
Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');



//Route::resource('pfe-proposals', PfeProposalController::class);