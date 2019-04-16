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
/*
Route::get('/', function () {
    return view('welcome');
});
*/
Route::get('/','Vw_feitController@index');
//Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
//Route::get('/feit/{feit_id}', 'Vw_feitController@show');
Route::get('feit/{id}', function ($id) {
    return view('feiten.show',['feit_id'=>$id]);        
});

Route::get('/{locale}',function($locale) {
    App::setLocale($locale);
    return App::call('App\Http\Controllers\Vw_feitController@index');
    //return redirect()->route('Vw_feitController@index');
    //return view('feiten.index');

    /*this link will add seson of language wen they click to change language*/
});

Route::post('/feit/post', 'Vw_feitController@store');

Route::resource('feit', 'Vw_feitController');
Route::resource('users', 'UsersController');
Route::resource('subtype', 'SubtypeController');
Route::resource('bron', 'Vw_feit_bronController');
