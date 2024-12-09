<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class ImportController extends Controller
{
    public function importUsers(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:csv,txt',
        ]);

        $file = $request->file('file');
        $csvData = array_map('str_getcsv', file($file->getPathname()));
        array_shift($csvData); // Remove header row

        DB::beginTransaction();

        try {
            foreach ($csvData as $row) {
                $email = $row[0];
                $name = $row[1];
                $surname = $row[2];
                $role = $this->mapRole($row[3]);
                $option = $row[4];
                $info = $row[5];

                // Generate a random password
                $password = Str::random(10);

                $user = User::updateOrCreate(
                    ['email' => $email],
                    [
                        'name' => $name . ' ' . $surname,
                        'password' => Hash::make($password), // Hash the password
                        'role' => $role,
                    ]
                );

                // Here, you should send an email to the user with their new password
                // For now, we'll just log it (don't do this in production!)
                Log::info("User {$email} created with password: {$password}");

                switch ($role) {
                    case 'student':
                        Student::updateOrCreate(
                            ['user_id' => $user->id],
                            ['option' => $option, 'moyenne_m1' => $info]
                        );
                        break;
                    case 'teacher':
                        Teacher::updateOrCreate(
                            ['user_id' => $user->id],
                            ['grade' => $option, 'date_recrutement' => $info]
                        );
                        break;
                    case 'company':
                        Company::updateOrCreate(
                            ['user_id' => $user->id],
                            ['denomination' => $info]
                        );
                        break;
                }
            }

            DB::commit();
            return response()->json(['message' => 'Utilisateurs importés avec succès']);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Erreur lors de l\'importation : ' . $e->getMessage());
            return response()->json([
                'message' => 'Une erreur est survenue lors de l\'importation',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    private function mapRole($inputRole)
    {
        $roleMap = [
            'GL' => 'student',
            'IA' => 'student',
            'RSD' => 'student',
            'SIC' => 'student',
            'teacher' => 'teacher',
            'company' => 'company',
            'admin' => 'admin',
        ];

        return $roleMap[$inputRole] ?? throw new \InvalidArgumentException("Rôle non valide : {$inputRole}");
    }
}

