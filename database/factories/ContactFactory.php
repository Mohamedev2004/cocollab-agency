<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Contact>
 */
class ContactFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // This array defines the structure and type of fake data
        // that will be generated for each record.
        return [
            // Generates a fake name for the contact
            'contact_name' => fake()->name(),
            
            // Generates a fake phone number
            'contact_phone' => fake()->phoneNumber(),

            // Generates a unique, safe email address
            'contact_email' => fake()->unique()->safeEmail(),
            
            // Generates a short sentence for the subject
            'contact_subject' => fake()->sentence(3),

            // Generates a short sentence for the message to fit the string column
            'contact_message' => fake()->sentence(10),
            
            // The `softDeletes` column is handled automatically by Laravel,
            // so we don't need to define it here.
        ];
    }
}