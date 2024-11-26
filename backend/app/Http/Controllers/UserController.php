<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:csv,txt|max:2048',  // Valider que le fichier est bien un CSV
        ]);
    
        // Logique pour traiter le fichier CSV
        $file = $request->file('file');
        $csvData = file_get_contents($file);
        $lines = array_map('str_getcsv', explode(PHP_EOL, $csvData));
        $header = array_shift($lines);
    
        foreach ($lines as $line) {
            if (count($line) === count($header)) {
                $data = array_combine($header, $line);
                User::updateOrCreate(
                    ['email' => $data['email']],
                    ['name' => $data['name'], 'password' => Hash::make($data['password']), 'role' => $data['role']]
                );
            }
        }
        return response()->json(['message' => 'Importation réussie']);
    }
}

