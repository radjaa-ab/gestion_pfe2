<?php

namespace App\Http\Controllers;

use App\Models\PFE;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class PFEController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
        $this->middleware('role:student,teacher,company')->only(['store', 'update', 'destroy']);
    }

    public function index()
    {
        $pfes = PFE::with(['student', 'encadrant', 'company'])->get();
        return response()->json($pfes);
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        $validatedData = $this->validatePFE($request, $user->role);

        $pfe = new PFE($validatedData);
        $pfe->statut = 'proposé';

        switch ($user->role) {
            case 'student':
                $pfe->student_id = $user->student->id;
                break;
            case 'teacher':
                $pfe->encadrant_id = $user->teacher->id;
                break;
            case 'company':
                $pfe->company_id = $user->company->id;
                break;
        }

        $pfe->save();

        return response()->json($pfe, 201);
    }

    public function show(PFE $pfe)
    {
        return response()->json($pfe->load(['student', 'encadrant', 'company']));
    }

    public function update(Request $request, PFE $pfe)
    {
        $user = Auth::user();
        
        if (!$this->canModifyPFE($user, $pfe)) {
            return response()->json(['message' => 'Non autorisé à modifier cette proposition de PFE.'], 403);
        }

        $validatedData = $this->validatePFE($request, $user->role, $pfe);
        $pfe->update($validatedData);

        return response()->json($pfe);
    }

    public function destroy(PFE $pfe)
    {
        $user = Auth::user();
        
        if (!$this->canModifyPFE($user, $pfe)) {
            return response()->json(['message' => 'Non autorisé à supprimer cette proposition de PFE.'], 403);
        }

        $pfe->delete();
        return response()->json(null, 204);
    }

    private function validatePFE(Request $request, $role, $pfe = null)
    {
        $rules = [
            'intitule' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => ['required', Rule::in(['classique', 'innovant', 'stage'])],
            'option' => 'required|string|max:255',
        ];

        if ($pfe && $role === 'admin') {
            $rules['statut'] = ['required', Rule::in(['proposé', 'validé', 'refusé', 'en_cours', 'terminé'])];
        }

        return $request->validate($rules);
    }

    private function canModifyPFE($user, $pfe)
    {
        return ($user->role === 'admin') ||
               ($user->role === 'student' && $pfe->student_id === $user->student->id) ||
               ($user->role === 'teacher' && $pfe->encadrant_id === $user->teacher->id) ||
               ($user->role === 'company' && $pfe->company_id === $user->company->id);
    }
}

