<?php

namespace Database\Seeders;

use App\Models\Notification;
use App\Models\User;
use Illuminate\Database\Seeder;
use Database\Seeders\NewsletterSeeder;
use Database\Seeders\AppointmentSeeder;
use Database\Seeders\ContactSeeder;
use Database\Seeders\UserActivitySeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create a Super Admin
        User::factory()->create([
            'name' => 'Super Admin',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
            'status' => 'Active',
        ]);

        // Create a Brand User
        User::factory()->create([
            'name' => 'Brand User',
            'email' => 'brand@example.com',
            'password' => bcrypt('password'),
            'role' => 'brand',
            'status' => 'Active',
        ]);

        // Create an Influencer User
        User::factory()->create([
            'name' => 'Influencer User',
            'email' => 'influencer@example.com',
            'password' => bcrypt('password'),
            'role' => 'influencer',
            'status' => 'Active',
        ]);

        // Generate 10 random users
        User::factory(50)->create();

        // Call other seeders
        $this->call([
            NewsletterSeeder::class,
            ContactSeeder::class,
            TestimonialSeeder::class,
            NotificationSeeder::class,
            UserActivitySeeder::class,
            AppointmentSeeder::class,
        ]);
    }
}
