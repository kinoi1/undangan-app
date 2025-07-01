<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TemplateController;
use App\Http\Controllers\CsrfCookieController;
use App\Http\Controllers\Api\WeddingController;
use App\Http\Controllers\InvitationRenderController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('/api/render/{slug}', [InvitationRenderController::class, 'render']);
Route::get('/templates', [TemplateController::class, 'index']);
Route::get('/admin/wedding', [WeddingController::class, 'index']);
Route::get('/admin/wedding/{id}', [WeddingController::class, 'edit']);
Route::post('/admin/wedding/update/{id}', [WeddingController::class, 'update']);
Route::post('/wedding', [WeddingController::class, 'store']);
Route::get('/invitation/{id}', [WeddingController::class, 'invitationbyid']);
Route::get('/wedding-viewer/{id}', [WeddingController::class, 'invitationbyid']);

Route::get('/csrf-cookie', [CsrfCookieController::class, 'show']);
Route::get('/app', function () {
    return view('react');
});
Route::get('/app/{any}', function () {
    return view('react'); // View yang memuat React
})->where('any', '.*');


