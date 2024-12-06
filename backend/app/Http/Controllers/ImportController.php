<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Etudiant;
use App\Models\Enseignant;
use App\Models\Entreprise;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ImportController extends Controller
{
    public function importUsers(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:csv,txt',
            'type' => 'required|in:etudiant,enseignant,entreprise'
        ]);

        $file = $request->file('file');
        $type = $request->input('type');

        DB::beginTransaction();

        try {
            $handle = fopen($file->getPathname(), 'r');
            $header = fgetcsv($handle);

            while (($row = fgetcsv($handle)) !== false) {
                $data = array_combine($header, $row);

                $user = User::create([
                    'name' => $data['nom'] . ' ' . $data['prenom'],
                    'email' => $data['email'],
                    'password' => Hash::make('password'), // Temporary password
                    'role' => $type,
                ]);

                switch ($type) {
                    case 'student':
                        Student::create([
                            'user_id' => $user->id,
                            'option' => $data['option'],
                            'moyenne_m1' => $data['moyenne_m1'],
                        ]);
                        break;
                    case 'teacher':
                        Teacher::create([
                            'user_id' => $user->id,
                            'grade' => $data['grade'],
                            'date_recrutement' => $data['date_recrutement'],
                        ]);
                        break;
                    case 'company':
                        Company::create([
                            'user_id' => $user->id,
                            'denomination' => $data['denomination'],
                        ]);
                        break;
                }
            }

            fclose($handle);
            DB::commit();

            return response()->json(['message' => 'Import successful'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Import error: ' . $e->getMessage());
            return response()->json(['message' => 'Import error: ' . $e->getMessage()], 500);
        }
    }
}

