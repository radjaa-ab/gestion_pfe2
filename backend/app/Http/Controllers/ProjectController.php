<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::all();
        return response()->json($projects);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'status' => 'required|in:Not Started,In Progress,Completed',
            'proposed_by' => 'required|in:teacher,student,company',
            'approval_status' => 'required|in:pending,validated,rejected',
            'deadline' => 'required|date',
        ]);

        $project = Project::create($validatedData);
        return response()->json($project, 201);
    }

    public function show(Project $project)
    {
        return response()->json($project);
    }

    public function update(Request $request, Project $project)
    {
        $validatedData = $request->validate([
            'title' => 'string|max:255',
            'description' => 'string',
            'status' => 'in:Not Started,In Progress,Completed',
            'approval_status' => 'in:pending,validated,rejected',
            'deadline' => 'date',
        ]);

        $project->update($validatedData);
        return response()->json($project);
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return response()->json(null, 204);
    }
}