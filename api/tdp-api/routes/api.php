<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Competition;
use App\Http\Controllers\CompetitionsController;
use App\Http\Controllers\ProblemsController;

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
Route::get('competitions/{competitionId}', [CompetitionsController::class, 'show']);
Route::get('competitions/{competitionId}/info', [CompetitionsController::class, 'fullInfo']);
Route::post('competitions/{competitionId}/info', [CompetitionsController::class, 'updateInfo']);
Route::get('competitions/{competitionId}/athletes', [CompetitionsController::class, 'getAthletes']);

Route::post('competitions/{competitionId}/register', [CompetitionsController::class, 'register']);
Route::delete('competitions/{competitionId}/{athleteId}/register', [CompetitionsController::class, 'deleteRegistration']);

Route::post('competitions', [CompetitionsController::class, 'store']);
Route::put('competitions/{competition}', [CompetitionsController::class, 'update']);
Route::delete('competitions/{competition}', [CompetitionsController::class, 'delete']);
Route::post('competitions/setState', [CompetitionsController::class, 'setState']);

Route::get('problems/{competitionId}/colors', [ProblemsController::class, 'getColorsByCompetitionId']);
Route::get('problems/{competitionId}', [ProblemsController::class, 'getProblemsByCompetitionId']);

Route::post('problems', [ProblemsController::class, 'store']);
Route::put('problems/{problem}', [ProblemsController::class, 'update']);
Route::post('problems/delete', [ProblemsController::class, 'deleteProblem']);
Route::post('problems/storeMultiple', [ProblemsController::class, 'storeMultiple']);


