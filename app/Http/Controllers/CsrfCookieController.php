<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CsrfCookieController extends Controller
{
     public function show(Request $request)
    {
        return response()->json(['csrf_token_set' => true]);
    }
}
