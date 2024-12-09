<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;

use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{ 

    public function register(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:8|confirmed',
        'role' => 'required|in:admin,student,teacher,company',
    ]);

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'role' => $request->role,
    ]);

    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'access_token' => $token,
        'token_type' => 'Bearer',
        'user' => $user,
    ]);
}
    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);

            Log::info('Tentative de connexion pour l\'email: ' . $request->email);

            $user = User::where('email', $request->email)->first();

            if (!$user) {
                Log::warning('Utilisateur non trouvé pour l\'email: ' . $request->email);
                throw ValidationException::withMessages([
                    'email' => ['Utilisateur non trouvé.'],
                ]);
            }

            Log::info('Mot de passe hashé en base de données pour ' . $request->email . ': ' . $user->password);

            if (!Hash::check($request->password, $user->password)) {
                Log::warning('Mot de passe incorrect pour l\'email: ' . $request->email);
                throw ValidationException::withMessages([
                    'email' => ['Mot de passe incorrect.'],
                ]);
            }

            Auth::login($user);
            $token = $user->createToken('auth_token')->plainTextToken;

            Log::info('Connexion réussie pour l\'utilisateur: ' . $user->id);

            return response()->json([
                'status' => 'success',
                'message' => 'Connexion réussie',
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => $user,
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erreur de validation',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la connexion: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Une erreur est survenue lors de la connexion',
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            $request->user()->currentAccessToken()->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Déconnexion réussie',
            ]);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la déconnexion: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Une erreur est survenue lors de la déconnexion',
            ], 500);
        }
    }

    public function changePassword(Request $request)
    {
        try {
            $request->validate([
                'current_password' => 'required',
                'new_password' => 'required|min:8|confirmed',
            ]);

            $user = Auth::user();

            if (!Hash::check($request->current_password, $user->password)) {
                throw ValidationException::withMessages([
                    'current_password' => ['Le mot de passe actuel est incorrect.'],
                ]);
            }

            $user->password = Hash::make($request->new_password);
            $user->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Mot de passe changé avec succès',
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erreur de validation',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            Log::error('Erreur lors du changement de mot de passe: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Une erreur est survenue lors du changement de mot de passe',
            ], 500);
        }
    }
}

