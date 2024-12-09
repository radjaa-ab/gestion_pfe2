<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ImportController;
use App\Http\Controllers\PFEController;




Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/change-password', [AuthController::class, 'changePassword']);
        // Routes pour les PFEs
   
    Route::apiResource('pfes', PFEController::class);

    Route::post('/import-users', [ImportController::class, 'importUsers'])->middleware('role:admin');
    
});








