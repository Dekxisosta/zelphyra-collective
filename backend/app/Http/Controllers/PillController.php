<?php

namespace App\Http\Controllers;

use App\Models\Pill;
use Illuminate\Http\Request;

class PillController extends Controller
{
    public function index()
    {
        try {
            $pills = Pill::orderBy('priority')->get();
            return response()->json(['pills' => $pills], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}