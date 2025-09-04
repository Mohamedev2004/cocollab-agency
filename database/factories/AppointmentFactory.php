<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Appointment>
 */
class AppointmentFactory extends Factory
{
    protected $model = \App\Models\Appointment::class;

    public function definition(): array
    {
        return [
            'appointment_name' => $this->faker->name(),
            'appointment_phone' => $this->faker->numerify('06########'), // Moroccan style 10-digit
            'appointment_email' => $this->faker->optional()->safeEmail(),
            'appointment_message' => $this->faker->optional()->sentence(10),
            'appointment_date' => $this->faker->dateTimeBetween('now', '+1 year'),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
