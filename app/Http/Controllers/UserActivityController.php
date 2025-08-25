<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;


class UserActivityController extends Controller
{
    public function getActivity(User $user)
    {
        $activities = $user->activities()
        ->selectRaw('activity_date as date, COUNT(*) as count')
        ->where('activity_date', '>=', now()->subYear()->toDateString())
        ->groupBy('activity_date')
        ->pluck('count', 'date');

        return response()->json($activities);
    }

    public function getAvailableYears(User $user)
    {
        $years = $user->activities()
            ->selectRaw('DISTINCT YEAR(activity_date) as year')
            ->orderBy('year', 'desc')
            ->get()
            ->pluck('year');

        return response()->json($years);
    }
}
