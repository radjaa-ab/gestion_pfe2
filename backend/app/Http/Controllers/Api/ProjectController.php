<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::with('supervisor', 'students')->get();
        return response()->json($projects);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'required|string|in:classic,innovative,internship',
            'status' => 'required|string|in:proposed,approved,in_progress,completed',
            'supervisor_id' => 'required|exists:users,id',
        ]);

        $project = Project::create($validatedData);
        return response()->json($project, 201);
    }

    // Add other CRUD methods as needed
}