<?php

//? Controllers
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//* ---------------------- USER ROUTES ----------------------  
//? 1st param -> creates path (the URL/door)
//? 2nd param -> [which controller, which function to run]
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

//TODO: Need to set up the routes for public browsing vs private browsing (with acc) 
//? Checks for user end if logged in or not != blocked by the system 
Route::middleware('auth')->group(function () {
    //* ALL PROTECTED ROUTES HERE 
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [UserController::class, 'getProfile']);
    Route::patch('/profile', [UserController::class, 'updateProfile']);
    //TODO: Pages that needs to be here cart, payment, checkout
});

//* ------------------------------------------------------------

//* ---------------------- PRODUCT ROUTES ----------------------  

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);

//* ---------------------------------------------------------- 

//* ---------------------- CATEGORY ROUTES ----------------------  

Route::get('categories', [CategoryController::class, 'index']);
Route::get('category/{id}', [CategoryController::class, 'show']);

//* ---------------------------------------------------------- 
