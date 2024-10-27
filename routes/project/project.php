<?php

use App\Http\Controllers\Project\projectController;
use Illuminate\Support\Facades\Route;



Route::prefix('project')->group(function () {

  
    Route::post('/', [projectController::class, 'createProject']);
    Route::get('/', [projectController::class, 'listProject']);
    Route::get('/getProject', [projectController::class, 'getProjet']);
    Route::delete('/', [projectController::class, 'deleteProject']);

});
