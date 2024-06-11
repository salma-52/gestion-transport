<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;

class LoginController extends Controller
{
  public function login(LoginRequest $request){
    $credentials = $request->getCredentials();
        
    $token = auth()->attempt($credentials); 
    if($token){
        return $this->responseWithToken($token , auth()->user());
    }else{
        return response()->json([
            "status" =>"failed",
            "message"=> "Invalide Credentials",
        ], 401);
    }
  }


  // forget Password 

  public function forgetPassword(Request $request){

    $email = $request->email ;
    $password = $request->password;

    $user = User::where('email' , '=' , $email)->first();
    $user->password = $password;
    $user->save();
               

    return response()->json([
       "result" => true
    ], 200);

  }


  public function register(RegisterRequest $request){
    $formFields = $request->validated();
    $formFields['role'] = 1;

    $existe = User::where("email" , '=', $formFields['email'])->first();

    if($existe){

        return response([
            "error" => "user deja Existe",
        ] , 400);

    }else{
        $user = User::create($formFields);

        if($user){
            $token = auth()->login($user);
            return $this->responseWithToken($token , $user);
        }else{
            return response()->json([
                'status' =>'failed', 
                'message'=> 'an error accore while trying to create user'
            ] , 500);
        }
    }

  }


  
  public function responseWithToken($token , $user){

    $info_user = [];

    $info_user['email'] = $user['email'];
    $info_user['role'] = $user['role'];
    $info_user['access_token'] = $token;
    $info_user['type_access'] = 'bearer';
    $info_user['id'] = $user['id'];

    
    return response()->json([
        'status' => 'success' , 
        'info' => $info_user ,
    ] , 200);
}

}
