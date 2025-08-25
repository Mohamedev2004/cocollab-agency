<?php

namespace Database\Factories;

use App\Models\Testimonial;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;

class TestimonialFactory extends Factory
{
    protected $model = Testimonial::class;

    public function definition(): array
    {
        // Ensure directory exists
        Storage::disk('public')->makeDirectory('testimonials');

        // Create a random filename
        $filename = 'testimonials/' . Str::uuid() . '.jpg';

        // Download random image from Picsum and store it
        $image = Http::get('https://picsum.photos/300/300');
        Storage::disk('public')->put($filename, $image->body());

        return [
            'testimonial_image' => $filename,
            'testimonial_name' => $this->faker->name(),
            'testimonial_position' => $this->faker->jobTitle(),
            'testimonial_feedback' => $this->faker->paragraph(3),
        ];
    }
}
