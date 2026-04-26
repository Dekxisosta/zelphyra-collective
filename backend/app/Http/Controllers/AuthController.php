<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
//? Imports the Auth class
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    //  Function (POST API) sends data to zelphyra_db (register a user)
    public function register(Request $request)
    {
        try {
            // Built-in validation method of Laravel 
            $request->validate([
                'name' => 'required',
                'email' => 'required|email|unique:users',
                // TODO: Room for improvement on the password authentication -> limited to to JUST 8 characters
                'password' => 'required|min:8',
            ]);

            User::create([
                'name' => $request->name,
                'email' => $request->email,
                //? bcrypt() Automatically hashes the password, a built in function
                'password' => bcrypt($request->password)
            ]);
            return response()->json(['message' => 'User registered successfully!!'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }

        //? dd() a built in function of laravel similar to console.log for debugging, it terminates the rest of the code similar to return too. EX: dd($request->all());
    }

    //  Function (POST API) sends data to zelphyra_db, check for exitence then sents back the result
    public function login(Request $request)
    {
        // TODO: Still need to set up middleware for protected routes so pages are consistent on user data credentials.
        try {
            //? attempt() is a built in function from the Auth class. Validates Credential + Logs in
            if (!Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
                return response()->json(['message' => 'Invalid Credentials.'], 401);
            }

            //? automatically creates a cookie and automatically saves it in session (database table), consistent across pages until logged out.
            //* avoids SESSION FIXATION ATTACK PREVENTION, makes a new key per login 
            //* (Hacker has your session ID -> you're STILL logged in -> hacker uses it at the SAME TIME as you -> hacker is in!! )
            //* (hacker accesses AS you (same session, same time))
            $request->session()->regenerate();

            return response()->json(['message' => 'User login successfully!!'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            Auth::logout();
            //* completely destroys session from db
            $request->session()->invalidate();
            //* Avoids getting -> Hacker has your CSRF token → you log out → hacker uses your old CSRF token to send fake requests → BAD!! 
            //* (hacker sends fake requests FOR you (using your CSRF token)
            $request->session()->regenerateToken();

            return response()->json(['message' => 'Logged out successfully!!'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }

        // TODO: Make a fall back for the log out api, currently logging out despite being 'logged out'
    }
}
