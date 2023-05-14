<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/editors', function () {
    return view('editors');
});

Route::get('/editors/{any}', function () {
    return view('editors');
})->where('any', '.*');

Route::get('/', function () {
    return view('users');
}); 

Route::get('/{any}', function () {
    return view('users');
})->where('any', '.*');   

