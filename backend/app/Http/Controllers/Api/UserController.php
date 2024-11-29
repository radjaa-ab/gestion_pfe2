<?php
namespace app\Http\Controllers\Api;

use app\Http\Controllers\Controller;
use app\Models\User;
use app\Services\CsvImportService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    protected $csvImportService;

    public function __construct(CsvImportService $csvImportService)
    {
        $this->csvImportService = $csvImportService;
    }

    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|in:admin,teacher,student,company',
        ]);

        $user = User::create($validatedData);
        $user->assignRole($validatedData['role']);

        return response()->json($user, 201);
    }

    public function show(User $user)
    {
        return response()->json($user);
    }

    public function update(Request $request, User $user)
    {
        $validatedData = $request->validate([
            'name' => 'string|max:255',
            'email' => 'string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'string|min:8',
            'role' => 'in:admin,teacher,student,company',
        ]);

        $user->update($validatedData);

        if (isset($validatedData['role'])) {
            $user->syncRoles([$validatedData['role']]);
        }

        return response()->json($user);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(null, 204);
    }

    public function importCsv(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:csv,txt',
            'type' => 'required|in:teachers,students,companies',
        ]);

        $file = $request->file('file');
        $type = $request->input('type');

        try {
            switch ($type) {
                case 'teachers':
                    $this->csvImportService->importTeachers($file);
                    break;
                case 'students':
                    $this->csvImportService->importStudents($file);
                    break;
                case 'companies':
                    $this->csvImportService->importCompanies($file);
                    break;
            }

            return response()->json(['message' => 'Import successful'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Import failed: ' . $e->getMessage()], 500);
        }
    }
}