<?php

namespace App\Exports;

use App\Models\Contact;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class ContactsExport implements FromCollection, WithHeadings, WithMapping
{
    /**
     * Return the collection of data.
     */
    public function collection()
    {
        // Fetch all contacts to be exported.
        return Contact::all();
    }

    /**
     * Map each row to format values.
     *
     * @param mixed $contact
     */
    public function map($contact): array
    {
        // Define the data for each row in the Excel file.
        // We'll include the ID, name, email, and formatted creation date.
        return [
            $contact->id,
            $contact->contact_name,
            $contact->contact_phone,
            $contact->contact_email,
            $contact->contact_subject,
            $contact->contact_message,
            $contact->created_at->format('d/m/Y H:i'),
        ];
    }

    /**
     * Add headings to the Excel file.
     */
    public function headings(): array
    {
        // Define the column headers for the export.
        return ['ID', 'Name', 'Phone', 'Email', 'Subject', 'Message', 'Created At'];
    }
}
