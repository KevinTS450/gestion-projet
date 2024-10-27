<?php

use App\Http\Controllers\Project\projectController;
use App\Http\Controllers\Roles\roleController;
use Illuminate\Support\Facades\Route;



Route::prefix('roles')->group(function () {

  
    Route::get('/', [roleController::class, 'getRole']);
    Route::post('/assignRoles', [projectController::class, 'assignRoles']);

});
