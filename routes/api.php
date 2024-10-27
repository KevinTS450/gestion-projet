<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
require base_path('routes/user/user.php');
require base_path('routes/auth/auth.php');
require base_path('routes/role/role.php');
require base_path('routes/project/project.php');

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});




