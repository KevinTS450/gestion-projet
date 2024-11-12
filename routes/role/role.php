<?php

use App\Http\Controllers\Roles\roleController;
use Illuminate\Support\Facades\Route;



Route::prefix('roles')->group(function () {

  
    Route::get('/', [roleController::class, 'getRole']);
    Route::get('/roleOf', [roleController::class, 'getRolesOfUsers']);

    Route::post('/assignRoles', [roleController::class, 'assignRoles']);

});
