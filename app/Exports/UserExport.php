<?php

namespace App\Exports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class UserExport implements FromCollection, WithHeadings, WithMapping
{
    /**
     * Fetch users
     */
    public function collection()
    {
        return User::select('id', 'name', 'email', 'role', 'status', 'created_at')->get();
    }

    /**
     * Map each user row before export
     */
    public function map($user): array
    {
        return [
            $user->id,
            $user->name,
            $user->email,
            $user->role,
            $user->status,
            $user->created_at->format('d-m-Y H:i'), // 👈 formatted datetime
        ];
    }

    /**
     * Column headings
     */
    public function headings(): array
    {
        return [
            'ID',
            'Name',
            'Email',
            'Role',
            'Status',
            'Created At',
        ];
    }
}
