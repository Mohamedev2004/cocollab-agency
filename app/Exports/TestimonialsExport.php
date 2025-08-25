<?php

namespace App\Exports;

use App\Models\Testimonial;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithDrawings;
use PhpOffice\PhpSpreadsheet\Worksheet\Drawing;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Collection;

class TestimonialsExport implements FromCollection, WithHeadings, WithMapping, WithDrawings
{
    private $testimonials;

    public function __construct()
    {
        $this->testimonials = Testimonial::withTrashed()->get();
    }

    /**
     * Return the collection of data.
     *
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return $this->testimonials;
    }

    /**
     * Map each row to format values.
     *
     * @param mixed $testimonial
     * @return array
     */
    public function map($testimonial): array
    {
        return [
            $testimonial->id,
            $testimonial->testimonial_name,
            $testimonial->testimonial_position,
            $testimonial->testimonial_feedback,
            $testimonial->created_at->format('d/m/Y H:i'),
            // We now leave a blank space for the image to be drawn in the next column
            '', 
        ];
    }

    /**
     * Add headings to the Excel file.
     *
     * @return array
     */
    public function headings(): array
    {
        return ['ID', 'Name', 'Position', 'Feedback', 'Created At', 'Image'];
    }

    /**
     * Add drawings to the Excel file.
     *
     * @return array
     */
    public function drawings()
    {
        $drawings = [];
        $row = 2; // Start from the second row to account for headings

        foreach ($this->testimonials as $testimonial) {
            if ($testimonial->testimonial_image && Storage::disk('public')->exists($testimonial->testimonial_image)) {
                $drawing = new Drawing();
                $drawing->setName($testimonial->testimonial_name);
                $drawing->setDescription($testimonial->testimonial_feedback);
                $drawing->setPath(storage_path('app/public/' . $testimonial->testimonial_image));
                $drawing->setHeight(50); // Set image height
                $drawing->setCoordinates('G' . $row); // Set the column and row for the image
                $drawings[] = $drawing;
            }
            $row++;
        }

        return $drawings;
    }
}
