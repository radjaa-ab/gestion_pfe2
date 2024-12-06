<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\studentController;
use App\Http\Controllers\teacherController;
use App\Http\Controllers\companyController;
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
    Route::apiResource('students', StudentController::class);

    // Teacher routes
    Route::apiResource('teachers', TeacherController::class);

    // Company routes
    Route::apiResource('companys', CompanyController::class);

    // PFE routes
    Route::apiResource('pfes', PFEController::class);

    // Defense routes
    Route::apiResource('soutenances', SoutenanceController::class);
});
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::post('/import-users', [ImportController::class, 'importUsers']);
});

///////////
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::apiResource('email-parameters', EmailParameterController::class);
});
////////
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/pfes', [PFEController::class, 'index']);
    Route::get('/pfes/{pfe}', [PFEController::class, 'show']);

    Route::middleware('role:student,teacher,company')->group(function () {
        Route::post('/pfes', [PFEController::class, 'store']);
        Route::put('/pfes/{pfe}', [PFEController::class, 'update']);
        Route::delete('/pfes/{pfe}', [PFEController::class, 'destroy']);
    });
});

