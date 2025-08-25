<?php

namespace App\Imports;

use App\Models\Newsletter;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class NewslettersImport implements ToModel, WithHeadingRow
{
    /**
     * @param array $row
     *
     * @return Newsletter|null
     */
    public function model(array $row)
    {
        // Skip invalid emails
        if (!filter_var($row['email'], FILTER_VALIDATE_EMAIL)) {
            return null;
        }

        // Insert if email doesn't exist yet
        return Newsletter::firstOrCreate([
            'email' => $row['email'],
        ]);
    }
}
