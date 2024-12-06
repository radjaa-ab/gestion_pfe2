<?php

namespace App\Http\Controllers;

use App\Models\EmailParameter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class EmailParameterController extends Controller
{
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'email_type' => 'required|string',
                'send_date' => 'required|date',
                'reminder_date' => 'required|date|after:send_date',
                'closure_date' => 'required|date|after:reminder_date',
            ]);

            $emailParameter = EmailParameter::create($validatedData);

            return response()->json($emailParameter, 201);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la création du paramètre email: ' . $e->getMessage());
            return response()->json(['message' => 'Une erreur est survenue lors de la création du paramètre email.'], 500);
        }
    }
}

