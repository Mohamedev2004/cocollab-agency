<?php

namespace App\Exports;

use App\Models\Appointment;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class AppointmentsExport implements FromCollection, WithHeadings
{
    public function collection()
    {
        return Appointment::all(['appointment_name', 'appointment_email', 'appointment_phone', 'appointment_date', 'status', 'appointment_message']);
    }

    public function headings(): array
    {
        return [
            'Name',
            'Email',
            'Phone',
            'Date',
            'Status',
            'Message'
        ];
    }
}
