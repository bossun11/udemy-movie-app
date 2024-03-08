<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\ReviewController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/reviews/{media_type}/{media_id}', [ReviewController::class, 'index']);
Route::post('/reviews', [ReviewController::class, 'store']);
Route::get('/review/{review}', [ReviewController::class, 'show']);
Route::put('/review/{review}', [ReviewController::class, 'update']);
Route::delete('/reviews/{review}', [ReviewController::class, 'destroy']);

Route::Post('/comments', [CommentController::class, 'store']);
Route::Delete('/comments/{comment}', [CommentController::class, 'destroy']);

