<?php

namespace App\Imports;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class UserImport implements ToModel, WithHeadingRow
{
    public function uniqueBy()
    {
        return 'email'; // ensures existing emails get updated
    }

    public function model(array $row)
    {
        return new User([
            'name'     => $row['name'],
            'email'    => $row['email'],
            'password' => Hash::make($row['password'] ?? 'password'),
            'role'     => $row['role'] ?? 'brand',
            'status'   => $row['status'] ?? 'Inactive',
        ]);
    }
}
