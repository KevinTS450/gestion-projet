<?php

use App\Http\Controllers\Auth\authController;
use Illuminate\Support\Facades\Route;



Route::prefix('auth')->group(function () {

Route::post('/', [authController::class, 'handleLogin']);
Route::post('/logout', [authController::class, 'handleLogout']);

});