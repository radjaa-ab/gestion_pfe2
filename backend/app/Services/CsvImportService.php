<?php

namespace App\Services;

use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Facades\Excel;
use App\Models\User;
use App\Models\Teacher;
use App\Models\Student;
use App\Models\Company;

class CsvImportService
{
    public function importTeachers($file)
    {
        Excel::import(new class {
            public function model(array $row)
            {
                $user = User::create([
                    'name' => $row['first_name'] . ' ' . $row['last_name'],
                    'email' => $row['personal_email'],
                    'password' => Hash::make('password'), // Temporary password
                    'role' => 'teacher'
                ]);

                $user->assignRole('teacher');

                Teacher::create([
                    'user_id' => $user->id,
                    'first_name' => $row['first_name'],
                    'last_name' => $row['last_name'],
                    'personal_email' => $row['personal_email'],
                    'recruitment_date' => $row['recruitment_date'],
                    'grade' => $row['grade']
                ]);
            }
        }, $file);
    }

    public function importStudents($file)
    {
        Excel::import(new class {
            public function model(array $row)
            {
                $user = User::create([
                    'name' => $row['first_name'] . ' ' . $row['last_name'],
                    'email' => $row['university_email'],
                    'password' => Hash::make('password'), // Temporary password
                    'role' => 'student'
                ]);

                $user->assignRole('student');

                Student::create([
                    'user_id' => $user->id,
                    'first_name' => $row['first_name'],
                    'last_name' => $row['last_name'],
                    'university_email' => $row['university_email'],
                    'master_option' => $row['master_option'],
                    'master1_average' => $row['master1_average']
                ]);
            }
        }, $file);
    }

    public function importCompanies($file)
    {
        Excel::import(new class {
            public function model(array $row)
            {
                $user = User::create([
                    'name' => $row['company_name'],
                    'email' => $row['contact_email'],
                    'password' => Hash::make('password'), // Temporary password
                    'role' => 'company'
                ]);

                $user->assignRole('company');

                Company::create([
                    'user_id' => $user->id,
                    'company_name' => $row['company_name'],
                    'contact_first_name' => $row['contact_first_name'],
                    'contact_last_name' => $row['contact_last_name'],
                    'contact_email' => $row['contact_email']
                ]);
            }
        }, $file);
    }
}