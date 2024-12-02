<?php

namespace App\Services;

use App\Models\User;
use App\Models\Teacher;
use App\Models\Student;
use App\Models\Company;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use League\Csv\Reader;

class CsvImportService
{
    public function importTeachers($file)
    {
        $csv = Reader::createFromPath($file->getPathname(), 'r');
        $csv->setHeaderOffset(0);

        DB::beginTransaction();

        try {
            foreach ($csv as $record) {
                $user = User::create([
                    'name' => $record['name'],
                    'email' => $record['email'],
                    'password' => Hash::make('password'), // Set a default password
                    'role' => 'teacher',
                ]);

                $user->assignRole('teacher');

                Teacher::create([
                    'user_id' => $user->id,
                    'recruitment_date' => $record['recruitment_date'],
                    'grade' => $record['grade'],
                ]);
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function importStudents($file)
    {
        $csv = Reader::createFromPath($file->getPathname(), 'r');
        $csv->setHeaderOffset(0);

        DB::beginTransaction();

        try {
            foreach ($csv as $record) {
                $user = User::create([
                    'name' => $record['name'],
                    'email' => $record['email'],
                    'password' => Hash::make('password'), // Set a default password
                    'role' => 'student',
                ]);

                $user->assignRole('student');

                Student::create([
                    'user_id' => $user->id,
                    'master_option' => $record['master_option'],
                    'average_score' => $record['average_score'],
                ]);
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function importCompanies($file)
    {
        $csv = Reader::createFromPath($file->getPathname(), 'r');
        $csv->setHeaderOffset(0);

        DB::beginTransaction();

        try {
            foreach ($csv as $record) {
                $user = User::create([
                    'name' => $record['name'],
                    'email' => $record['email'],
                    'password' => Hash::make('password'), // Set a default password
                    'role' => 'company',
                ]);

                $user->assignRole('company');

                Company::create([
                    'user_id' => $user->id,
                    'company_name' => $record['company_name'],
                ]);
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}

