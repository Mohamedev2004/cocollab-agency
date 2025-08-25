<?php

namespace App\Imports;

use App\Models\Testimonial;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class TestimonialsImport implements ToModel, WithHeadingRow, WithValidation
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Testimonial([
            'testimonial_name' => $row['name'],
            'testimonial_position' => $row['position'],
            'testimonial_feedback' => $row['feedback'],
            'testimonial_image' => null, // We're explicitly setting the image to null
        ]);
    }
    
    /**
     * @return array
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'feedback' => 'required|string',
        ];
    }
}
