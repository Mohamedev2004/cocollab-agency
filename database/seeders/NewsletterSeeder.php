<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Newsletter;

class NewsletterSeeder extends Seeder
{
    public function run()
    {
        // Create 50 fake contact subscribers
        Newsletter::factory()->count(50)->create();
    }
}

