<?php

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
Route::post('/', 'HomeController@index');

Route::post('/uart/speed', 'UartDualBoxCarController@speed');
Route::post('/uart/forword', 'UartDualBoxCarController@forword');
Route::post('/uart/back', 'UartDualBoxCarController@back');
Route::post('/uart/left', 'UartDualBoxCarController@left');
Route::post('/uart/right', 'UartDualBoxCarController@right');
Route::post('/uart/stop', 'UartDualBoxCarController@stop');
