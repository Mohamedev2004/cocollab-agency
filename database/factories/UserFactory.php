<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => Hash::make('password'), // default password
            'role' => $this->faker->randomElement(['admin', 'brand', 'influencer']),
            'status' => $this->faker->randomElement(['Active', 'Inactive']),
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the user is admin.
     */
    public function admin(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => 'admin',
            'status' => 'Active',
        ]);
    }

    /**
     * Indicate that the user is brand.
     */
    public function brand(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => 'brand',
            'status' => 'Active',
        ]);
    }

    /**
     * Indicate that the user is influencer.
     */
    public function influencer(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => 'influencer',
            'status' => 'Active',
        ]);
    }
}
