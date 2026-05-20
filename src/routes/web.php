<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Models\Product;
use Illuminate\Support\Facades\Route;

// ==================== ПУБЛИЧНЫЕ МАРШРУТЫ ====================
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/products/{product}', [ProductController::class, 'show'])->name('web.products.show');

// ==================== АУТЕНТИФИКАЦИЯ (СТРАНИЦЫ) ====================
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::get('/register', [AuthController::class, 'showRegister'])->name('register');

// ==================== АДМИН-ПАНЕЛЬ ====================
// Все админ-страницы доступны без middleware,
// проверка авторизации происходит на фронтенде (токен в localStorage)
Route::prefix('admin')->name('admin.')->group(function () {
    // Главная админки (список товаров)
    Route::get('/products', [ProductController::class, 'adminIndex'])->name('products.index');

    // Форма создания товара
    Route::get('/products/create', function () {
        return \Inertia\Inertia::render('Admin/Products/Form', [
            'categories' => \App\Models\Category::all(),
        ]);
    })->name('products.create');

    // Форма редактирования товара
    Route::get('/products/{product}/edit', function (Product $product) {
        return \Inertia\Inertia::render('Admin/Products/Form', [
            'product' => $product->load('category'),
            'categories' => \App\Models\Category::all(),
        ]);
    })->name('products.edit');

    // Удаление товара (вызывает API)
    Route::delete('/products/{product}', [ProductController::class, 'adminDestroy'])->name('products.destroy');
});

Route::get('/sitemap.xml', function () {
    $products = Product::all();
    return response()
        ->view('sitemap', ['products' => $products])
        ->header('Content-Type', 'text/xml');
});
