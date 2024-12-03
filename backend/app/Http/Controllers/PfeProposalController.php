<?php

namespace App\Http\Controllers;

use App\Models\PfeProposal;                   
use Illuminate\Http\Request;
use App\Http\Requests\PfeProposalRequest;
use Illuminate\Support\Facades\Auth;

class PfeProposalController extends Controller
{
    public function index()
    {
        $proposals = PfeProposal::where('user_id', Auth::id())->get();
        return response()->json($proposals);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'technologies' => 'required|string',
            'material_needs' => 'required|string',
        ]);
    
        $proposal = PfeProposal::create($validated);
    
        return response()->json($proposal, 201);
    }

    public function show(PfeProposal $pfeProposal)
    {
        $this->authorize('view', $pfeProposal);
        return response()->json($pfeProposal);
    }

    public function update(PfeProposalRequest $request, PfeProposal $pfeProposal)
    {
        $this->authorize('update', $pfeProposal);
        $pfeProposal->update($request->validated());
        return response()->json($pfeProposal);
    }

    public function destroy(PfeProposal $pfeProposal)
    {
        $this->authorize('delete', $pfeProposal);
        $pfeProposal->delete();
        return response()->json(null, 204);
    }
}