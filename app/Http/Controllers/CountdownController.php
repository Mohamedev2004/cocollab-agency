<?php

namespace App\Http\Controllers;

use App\Models\Countdown;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CountdownController extends Controller
{
    public function index()
    {
        $countdown = Countdown::first(); // only one countdown

        return Inertia::render('admin/countdown', [
            'countdown' => $countdown,
        ]);
    }

    public function createOrUpdate(Request $request)
    {
        $request->validate([
            'current_end_time' => 'required|date|after:now',
        ]);

        // Update existing or create new
        $countdown = Countdown::first();
        if ($countdown) {
            $countdown->update([
                'current_end_time' => $request->current_end_time,
            ]);
        } else {
            $countdown = Countdown::create([
                'current_end_time' => $request->current_end_time,
            ]);
        }

        return redirect()->back()->with('success', 'Countdown saved successfully!');
    }

    public function destroy()
    {
        $countdown = Countdown::first();
        if ($countdown) {
            $countdown->delete();
        }

        return redirect()->back()->with('success', 'Countdown deleted successfully!');
    }

    public function show()
    {
        $countdown = Countdown::firstOrCreate([], [
            'current_end_time' => '2025-04-22 19:00:00',
        ]);

        return Inertia::render('countdown', [
            'countdownDate' => $countdown->current_end_time,
            'homeUrl' => url('/'),
        ]);
    }   
}
