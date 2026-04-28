<?php

namespace App\Http\Controllers;

use App\Models\UserImages;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserImageController extends Controller
{
    public function show()
    {
        try {
            $avatar = UserImages::where('user_id', Auth::id())->first();

            if (!$avatar) {
                return response()->json(['message' => 'No avatar set.'], 404);
            }

            return response()->json(['avatar' => $avatar], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'avatar_id' => 'required|integer',
            ]);

            $existing = UserImages::where('user_id', Auth::id())->first();

            if ($existing) {
                return response()->json(['message' => 'Avatar already exists. Use update instead.'], 422);
            }

            $avatar = UserImages::create([
                'user_id'   => Auth::id(),
                'avatar_id' => $request->avatar_id,
            ]);

            return response()->json(['message' => 'Avatar set successfully!!', 'avatar' => $avatar], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request)
    {
        try {
            $request->validate([
                'avatar_id' => 'required|integer',
            ]);

            $avatar = UserImages::where('user_id', Auth::id())->first();

            if (!$avatar) {
                return response()->json(['message' => 'No avatar found. Use store instead.'], 404);
            }

            $avatar->update(['avatar_id' => $request->avatar_id]);

            return response()->json(['message' => 'Avatar updated successfully!!', 'avatar' => $avatar], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}