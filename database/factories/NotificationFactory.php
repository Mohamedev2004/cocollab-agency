<?php

namespace Database\Factories;

use App\Models\Notification;
use Illuminate\Database\Eloquent\Factories\Factory;

class NotificationFactory extends Factory
{
    protected $model = Notification::class;

    public function definition(): array
    {
        $types = ['success', 'error', 'info', 'warning'];

        return [
            'title'   => $this->faker->sentence(3),
            'message' => $this->faker->paragraph(),
            'type'    => $this->faker->randomElement($types),
            'read'    => $this->faker->boolean(30), // 30% chance it's read
        ];
    }
}
