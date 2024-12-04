<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/user', [AuthController::class, 'user'])->middleware('auth:sanctum');
;

// Route de test
Route::get('/test', function () {
    return response()->json(['message' => 'Test route works!']);
});


// Catch-all route for React frontend
Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('pfe-proposals', PfeProposalController::class);
});

