<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QuestionGameController;
use App\Http\Controllers\QuestionCreationController;

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

// Quiz routes
Route::get('/', [QuestionGameController::class, 'index'])->name('questiongame.start');
Route::post('/{answer:secret_id}', [QuestionGameController::class, 'store'])
        ->name('questiongame.play')
        ->missing(function (Request $request) {
            return redirect()->route('questiongame.start');
        });
