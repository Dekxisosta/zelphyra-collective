<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function getProfile(){
        try{
            //? gets the current user -> built-in  (a copy of user not the Eloquent model)
            $user = Auth::user();
    
            //? passes the user
            return response()->json(['message' => 'Profile retrieve successfully.', 'user' => $user], 200);
        }catch(\Exception $e){
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
    public function updateProfile(Request $request){
        try{
            //? gets the copied id from session to look up from database -> finally getting its Eloquent model.
            $user = User::find(Auth::id());

            //? updates the user profile, built-in 
            $user->update([
                'name' => $request->name ?? $user->name,
                'password' => $request->password? bcrypt($request->password) : $user->password
            ]);

            return response()->json(['message'=> 'Profile updated successfully.'], 200);
        }catch(\Exception $e){
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
