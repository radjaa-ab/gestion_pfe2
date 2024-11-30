<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class TestUsersSeeder extends Seeder
{
    public function run()
    {
        // Create roles
        $roles = ['student', 'teacher', 'company', 'admin'];
        foreach ($roles as $role) {
            Role::create(['name' => $role]);
        }

        $users = [
            [
                'name' => 'Student User',
                'email' => 'student@example.com',
                'password' => 'password123',
                'role' => 'student',
            ],
            [
                'name' => 'Teacher User',
                'email' => 'teacher@example.com',
                'password' => 'password123',
                'role' => 'teacher',
            ],
            [
                'name' => 'Company User',
                'email' => 'company@example.com',
                'password' => 'password123',
                'role' => 'company',
            ],
            [
                'name' => 'Admin User',
                'email' => 'admin@example.com',
                'password' => 'password123',
                'role' => 'admin',
            ],
        ];

        foreach ($users as $userData) {
            $user = User::create([
                'name' => $userData['name'],
                'email' => $userData['email'],
                'password' => Hash::make($userData['password']),
            ]);
            $user->assignRole($userData['role']);
        }
    }
}