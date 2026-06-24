<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\GameController;

Route::get('/', [GameController::class, 'welcome'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::resource('games', GameController::class);


});

require __DIR__ . '/settings.php';
