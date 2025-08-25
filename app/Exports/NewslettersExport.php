<?php

namespace App\Exports;

use App\Models\Newsletter;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class NewslettersExport implements FromCollection, WithHeadings, WithMapping
{
    /**
     * Return the collection of data.
     */
    public function collection()
    {
        return Newsletter::all();
    }

    /**
     * Map each row to format values.
     */
    public function map($contact): array
    {
        return [
            $contact->id,
            $contact->email,
            $contact->created_at->format('d/m/Y H:i'), // 👈 formatted
        ];
    }

    /**
     * Add headings to the Excel file.
     */
    public function headings(): array
    {
        return ['ID', 'Email', 'Subscribed At'];
    }
}
