<?php
namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run()
    {
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@pfe-platform.com',
            'password' => Hash::make('password'),
            'role' => 'admin'
        ]);

        $admin->assignRole('admin');
    }
}