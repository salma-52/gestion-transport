<?php

use App\Http\Controllers\API\EtudianController;
use App\Http\Controllers\API\LoginController;
use App\Http\Controllers\API\MailController;
use App\Http\Controllers\API\ParentsContoller;
use App\Http\Controllers\API\PDFController;
use App\Http\Controllers\API\PersonnelContoller;
use App\Http\Controllers\API\StatistiqueController;
use App\Http\Controllers\API\TransportController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });



Route::middleware(["api"])->group(function(){
    Route::post('/login' , [LoginController::class , 'login']);
    // Route::post('/register' , [LoginController::class , 'register']);

    Route::post('/email', [MailController::class, 'index']);
    Route::post('/email/verify', [MailController::class, 'verificayions']);
    Route::post('/forgetpassword' , [LoginController::class , 'forgetPassword']);
    Route::post('/email/forgetpassword/veryexistMail', [MailController::class, 'existMailsAndSendCode']);


     // admin 
     Route::prefix('admin')->name("admin.")->group(function(){

        // statistic 
        Route::controller(StatistiqueController::class)->group(function(){

            Route::get('/statistique/total' , "totalStat");
            Route::get('/statistique/transport' , "transport");
          
          
        });
        


        // parents 

        Route::controller(ParentsContoller::class)->group(function(){

            Route::get('/parents' , "allParents");
            Route::post('/parent' , "addParent");
            Route::post('/parent/{parents}' , "updateParent");
            Route::delete('/parent/{parents}' , "deleteParent");
          
        });



        // personnel 
        Route::controller(PersonnelContoller::class)->group(function(){

            Route::get('/personnels' , "allPersonnels");
            Route::post('/personnel' , "addPersonnel");
            Route::post('/personnel/{personnel}' , "updatePersonnel");
            Route::delete('/personnel/{personel}' , "deletePersonnel");
          
        });

        // Etudaint
        Route::controller(EtudianController::class)->group(function(){

            Route::get('/etudiants' , "allEtudiants");
            Route::post('/etudiant' , "addEtudiant");
            Route::post('/etudiant/{etudiant}' , "updateEtudiant");
            Route::delete('/etudiant/{etudiant}' , "deleteEtudiant");
          
        });

        // transport 

        Route::controller(TransportController::class)->group(function(){

            Route::get('/transports' , "allTransport");
            Route::post('/transport' , "addTransport");
            Route::post('/transport/{transport}' , "updateTransport");
            Route::delete('/transport/{transport}' , "deleteTransport");
              // pdf 
            Route::get('/transport/pdf/{transport}','generatePDF');
          
        });

     


    });


    Route::prefix('parent')->name("parent.")->group(function(){

        Route::controller(ParentsContoller::class)->group(function(){

            Route::get('/details/{user}' , "detailsParents");

        });
        
    });


});
