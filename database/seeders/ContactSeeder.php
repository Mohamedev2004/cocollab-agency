<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Contact;

class ContactSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Use the ContactFactory to create 50 fake contact records.
        // You can change the number '50' to whatever you like.
        Contact::factory()->count(50)->create();
    }
}
