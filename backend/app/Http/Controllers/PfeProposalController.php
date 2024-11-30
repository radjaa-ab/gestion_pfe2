<?php

namespace App\Http\Controllers;

use App\Models\PfeProposal;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PfeProposalController extends Controller
{
    public function index()
    {
        $proposals = PfeProposal::with('user')->get();
        return Inertia::render('PfeProposals/Index', ['proposals' => $proposals]);
    }

    public function create()
    {
        return Inertia::render('PfeProposals/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'summary' => 'required|string',
            'type' => 'required|in:classic,innovative,internship',
            'option' => 'required|in:GL,IA,RSD,SIC',
            'technologies' => 'required|string',
            'material_needs' => 'nullable|string',
        ]);

        $proposal = auth()->user()->pfeProposals()->create($validated);

        return redirect()->route('pfe-proposals.index')->with('success', 'Proposition created successfully.');
    }

    public function show(PfeProposal $pfeProposal)
    {
        return Inertia::render('PfeProposals/Show', ['proposal' => $pfeProposal->load('user')]);
    }

    public function edit(PfeProposal $pfeProposal)
    {
        return Inertia::render('PfeProposals/Edit', ['proposal' => $pfeProposal]);
    }

    public function update(Request $request, PfeProposal $pfeProposal)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'summary' => 'required|string',
            'type' => 'required|in:classic,innovative,internship',
            'option' => 'required|in:GL,IA,RSD,SIC',
            'technologies' => 'required|string',
            'material_needs' => 'nullable|string',
        ]);

        $pfeProposal->update($validated);

        return redirect()->route('pfe-proposals.index')->with('success', 'Proposition updated successfully.');
    }

    public function destroy(PfeProposal $pfeProposal)
    {
        $pfeProposal->delete();

        return redirect()->route('pfe-proposals.index')->with('success', 'Proposition deleted successfully.');
    }
}