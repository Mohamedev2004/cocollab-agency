<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\UserActivity;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserActivityFactory extends Factory
{
    protected $model = UserActivity::class;

    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->first()?->id ?? User::factory(),
            'activity_date' => $this->faker->dateTimeBetween('-2 months', '+7 months')->format('Y-m-d'),
            'type' => 'login',
        ];
    }
}
