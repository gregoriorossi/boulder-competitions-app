<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Competition;
use App\Http\Controllers\CompetitionsController;
use App\Http\Controllers\CompetitionsBackendController;
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


// BACKEND
Route::get('competitionsBackend/getAll', [CompetitionsBackendController::class, 'index']);
Route::post('competitionsBackend/create', [CompetitionsBackendController::class, 'createCompetition']);
Route::delete('competitionsBackend/{competitionId}', [CompetitionsBackendController::class, 'delete']);
Route::get('competitionsBackend/basicInfoByPublicPath/{publicPath}', [CompetitionsBackendController::class, 'basicInfoByPublicPath']);
Route::get('competitionsBackend/{id}/info', [CompetitionsBackendController::class, 'info']);
Route::post('competitionsBackend/{competitionId}/info', [CompetitionsBackendController::class, 'updateInfo']);
Route::get('competitionsBackend/{competitionId}/{type}/download/ranking', [CompetitionsBackendController::class, 'downloadRanking']);
Route::get('competitionsBackend/{competitionId}/{type}/ranking', [CompetitionsBackendController::class, 'getRanking']);
Route::get('competitionsBackend/{competitionId}/results', [CompetitionsBackendController::class, 'getResults']);


// FRONTEND
Route::get('competitions/getAll', [CompetitionsController::class, 'getAll']);
Route::get('competitions/isUserRegisteredToCompetition/{competitionId}/{email}', [CompetitionsController::class, 'isUserRegisteredToCompetition']);
Route::get('competitions/{path}/infoByPath', [CompetitionsController::class, 'infoByPath']);
Route::delete('competitions/{competitionId}/{athleteId}/register', [CompetitionsController::class, 'deleteRegistration']);
Route::get('competitions/{competitionId}/{athleteId}/results', [CompetitionsController::class, 'getResults']);
Route::post('problems/{competitionId}/setSent', [ProblemsController::class, 'setSent']);


Route::get('competitions/{competitionId}/athletes', [CompetitionsController::class, 'getAthletes']);
Route::get('competitions/{competitionId}/download/athletes', [CompetitionsController::class, 'downloadAthletes']);

Route::post('competitions/{competitionId}/register', [CompetitionsController::class, 'register']);
Route::put('competitions/{competitionId}/{athleteId}/register', [CompetitionsController::class, 'updateRegistration']);


Route::put('competitions/{competition}', [CompetitionsController::class, 'update']);
Route::delete('competitions/{competition}', [CompetitionsController::class, 'delete']);
Route::post('competitions/setState', [CompetitionsController::class, 'setState']);

Route::get('problems/{competitionId}/colors', [ProblemsController::class, 'getColorsByCompetitionId']);
Route::get('problems/{competitionId}', [ProblemsController::class, 'getProblemsByCompetitionId']);

Route::put('problems/{competitionId}/{problemId}', [ProblemsController::class, 'updateProblem']);
Route::post('problems/delete', [ProblemsController::class, 'deleteProblem']);
Route::post('problems/storeMultiple', [ProblemsController::class, 'storeMultiple']);
Route::post('problems/{competitionId}/setSent', [ProblemsController::class, 'setSent']);


