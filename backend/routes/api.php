<?php
//? INFO: Use singular when it's an ACTION not a resource!! 

//? Controllers
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CartItemController;
use App\Http\Controllers\OrderController;
use App\Models\CartItem;
use App\Models\Order;
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
Route::middleware('auth:sanctum')->group(function () {
    //* ALL PROTECTED ROUTES HERE 
    //* -------- Auth & User Api --------  
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [UserController::class, 'getProfile']);
    Route::patch('/profile', [UserController::class, 'updateProfile']);
    
    //* -------- Address Api --------  
    Route::get('/addresses', [AddressController::class, 'getAddresses']);
    Route::post('/addresses', [AddressController::class, 'addAddress']);
    Route::patch('/addresses/{id}', [AddressController::class, 'updateAddress']);
    Route::delete('/addresses/{id}', [AddressController::class, 'deleteAddress']);
    Route::patch('/addresses/{id}/default', [AddressController::class, 'setDefault']);
    
    //* -------- Cart Api --------  
    Route::get('/cart', [CartController::class, 'index']);
    Route::delete('/cart', [CartController::class, 'clear']);

    //* -------- Cart Item Api --------    
    Route::post('/cart/items', [CartItemController::class, 'store']);
    Route::patch('/cart/items', [CartItemController::class, 'update']);
    Route::delete('/cart/items', [CartItemController::class, 'destroy']);

    //* -------- Order  Api --------    
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);

    //TODO: Pages that needs to be here payment, checkout
});

//* ------------------------------------------------------------

//* ---------------------- PRODUCT ROUTES ----------------------  

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
// TODO: Pages that needs product inventory, product images

//* ---------------------------------------------------------- 

//* ---------------------- CATEGORY ROUTES ----------------------  

Route::get('categories', [CategoryController::class, 'index']);
Route::get('categories/{id}', [CategoryController::class, 'show']);

//* ---------------------------------------------------------- 

