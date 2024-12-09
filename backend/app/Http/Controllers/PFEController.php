<?php

namespace App\Http\Controllers;

use App\Models\PFE;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class PFEController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $pfes = PFE::where('user_id', $user->id)->get();
        return response()->json($pfes);
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        $validatedData = $request->validate([
            'titre' => 'required|string|max:255',
            'resume' => 'required|string',
            'type' => 'required|in:classique,innovant,stage',
            'option' => 'required|in:GL,IA,RSD,SIC',
            'technologies' => 'required|string',
            'besoins_materiels' => 'nullable|string',
            'student2_id' => 'nullable|exists:users,id',
        ]);

        $pfe = new PFE($validatedData);
        $pfe->user_id = $user->id;
        $pfe->statut = 'proposé';

        if ($user->role === 'student') {
            $pfe->student1_id = $user->id;
            if ($request->student2_id) {
                $pfe->student2_id = $request->student2_id;
                // Send notification to the second student
                $this->notifySecondStudent($request->student2_id, $pfe);
            }
        } elseif ($user->role === 'teacher') {
            $pfe->encadrant_id = $user->id;
            if ($request->co_encadrant_id) {
                $pfe->co_encadrant_id = $request->co_encadrant_id;
            }
        } elseif ($user->role === 'company') {
            $pfe->company_id = $user->company->id;
        }

        $pfe->save();

        return response()->json($pfe, 201);
    }

    public function show(PFE $pfe)
    {
        $this->authorize('view', $pfe);
        return response()->json($pfe);
    }

    public function update(Request $request, PFE $pfe)
    {
        $this->authorize('update', $pfe);

        $validatedData = $request->validate([
            'titre' => 'string|max:255',
            'resume' => 'string',
            'type' => 'in:classique,innovant,stage',
            'option' => 'in:GL,IA,RSD,SIC',
            'technologies' => 'string',
            'besoins_materiels' => 'nullable|string',
        ]);

        $pfe->update($validatedData);

        return response()->json($pfe);
    }

    public function destroy(PFE $pfe)
    {
        $this->authorize('delete', $pfe);

        $pfe->delete();

        return response()->json(null, 204);
    }

    private function notifySecondStudent($studentId, $pfe)
    {
        $student = User::findOrFail($studentId);
        // Send email notification
        // Implement email sending logic here
    }
}

