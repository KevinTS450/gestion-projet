<?php

use App\Http\Controllers\Auth\authController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Users\userManageController;



Route::prefix('users')->group(function () {

    Route::post('/create', [UserManageController::class, 'createUsers']);
    Route::post('/activation', [UserManageController::class, 'ActivateUsers']);
    Route::post('/uploadDocs', [UserManageController::class, 'handleUploadDocs']);
    Route::get('/showDocs', [userManageController::class, 'showDocs']);
    Route::delete('/deleteDocs', [userManageController::class, 'deleteDocs']);
    Route::get('/ListUsers', [userManageController::class, 'ListUser']);
    Route::get('/showProfile', [userManageController::class, 'showProfile']);

    Route::get('/', [authController::class, 'getUsers']);
});
