<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UpdateUserPasswordsSeeder extends Seeder
{
    public function run()
    {
        $users = User::all();

        foreach ($users as $user) {
            $user->password = Hash::make('password'); // Set a default password
            $user->save();
        }

        $this->command->info('All user passwords have been updated to use Bcrypt hashing.');
    }
}

