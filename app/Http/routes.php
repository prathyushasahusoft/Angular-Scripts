<?php header('access-control-allow-origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    header('Access-Control-Allow-Headers: Content-type');

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('confirm/email/', 'EmailVerificationController@verifyEmail');

Route::controllers([
    'auth' => 'Auth\AuthController',
    'password' => 'Auth\PasswordController',
]);
// Authentication routes...
Route::get('auth/login', 'Auth\AuthController@getLogin');
Route::post('auth/login', 'Auth\AuthController@postLogin');
Route::get('auth/logout', 'Auth\AuthController@getLogout');

// Registration routes...
Route::get('auth/register', 'Auth\AuthController@getRegister');
Route::post('auth/register', 'Auth\AuthController@postRegister');


Route::get('/', function () {
    return view('landing/index');
});
Route::get('password/email', 'Auth\PasswordController@getEmail');
Route::post('password/email', 'Auth\PasswordController@postEmail');

// Password reset routes...
Route::get('password/reset/{token}', 'Auth\PasswordController@getReset');
Route::post('/password/reset', 'Auth\PasswordController@postReset');

Route::group([
   'middleware' => ['auth']
   ],
   function () {
		Route::get('/dashboard', function () {
			return view('pages.dashboard.home');
		});
		Route::group(['prefix' => 'api/v1'], function() {
		    Route::resource('manage-users', 'Api\v1\UserController');
		    Route::resource('campaign', 'Api\v1\CampaignController');
		    Route::resource('customer', 'Api\v1\customerController');
		    Route::resource('invoice', 'Api\v1\invoiceController');
		    Route::resource('invoice-items', 'Api\v1\invoiceItemController');
		    Route::resource('invoice-summary', 'Api\v1\invoiceSummaryController');
		    Route::resource('test', 'Api\v1\testController');
		});	
		Route::resource('password', 'ChangePasswordController', ['only' => ['index', 'update']]);
	}
);

	