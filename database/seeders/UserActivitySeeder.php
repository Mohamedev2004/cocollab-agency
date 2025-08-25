<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\UserActivity;

class UserActivitySeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();

        foreach ($users as $user) {
            // Create 60 random activities per user
            UserActivity::factory()
                ->count(200)
                ->state([
                    'user_id' => $user->id, // ensure correct user
                ])
                ->create();
        }
    }
}
