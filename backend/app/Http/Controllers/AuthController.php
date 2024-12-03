<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);
          
        $user = $this->authService->register([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'role' => 'user', // Ajoutez un rôle par défaut si nécessaire
        ]);
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $result = $this->authService->login($request->only('email', 'password'));
        if (!$result) {
            throw ValidationException::withMessages([
                'email' => ['Les informations didentification fournies sont incorrectes.'],
            ]);
        }

        return response()->json([
            'user' => $result['user'],
            'token' => $result['token'],
        ]);
    }

    public function logout(Request $request)
    {
        $this->authService->logout();

        return response()->json(['message' => 'Déconnexion réussie']);
    }
    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}