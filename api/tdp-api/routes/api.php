<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Competition;
use App\Http\Controllers\CompetitionsController;

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

Route::get('competitions', [CompetitionsController::class, 'index']);
Route::get('competitions/{competition}', [CompetitionsController::class, 'show']);
Route::post('competitions', [CompetitionsController::class, 'store']);
Route::put('competitions/{competition}', [CompetitionsController::class, 'update']);
Route::delete('competitions/{competition}', [CompetitionsController::class, 'delete']);