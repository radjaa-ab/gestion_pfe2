<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Login the user and return an access token.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Attempt to authenticate the user
        if (Auth::attempt($request->only('email', 'password'))) {
            $user = Auth::user();

            // Load role-specific data
            switch ($user->role) {
                case 'teacher':
                    $user->load('teacher');
                    break;
                case 'student':
                    $user->load('student');
                    break;
                case 'company':
                    $user->load('company');
                    break;
            }

            // Load roles relationship
            $user->load('roles');

            // Generate API token
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => $user,
            ]);
        }

        // Return error if credentials are invalid
        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
        ]);
    }

    /**
     * Logout the user by deleting the current access token.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        // Revoke the current access token
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }

    /**
     * Return the authenticated user's data.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function user(Request $request)
    {
        $user = $request->user();

        // Load role-specific data
        switch ($user->role) {
            case 'teacher':
                $user->load('teacher');
                break;
            case 'student':
                $user->load('student');
                break;
            case 'company':
                $user->load('company');
                break;
        }

        // Load roles relationship and return the user data
        return response()->json($user->load('roles'));
    }
}
