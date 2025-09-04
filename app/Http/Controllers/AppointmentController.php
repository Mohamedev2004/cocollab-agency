<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AppointmentController extends Controller
{

    public function index()
    {
        // Use withTrashed() to get both active and soft-deleted appointments.
        $appointments = Appointment::withTrashed()->get();

        return Inertia::render('admin/appointments', [
            'appointments' => $appointments,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'appointment_name' => 'required|string|max:255',
            'appointment_phone' => 'required|string|max:20',
            'appointment_email' => 'nullable|email|max:255',
            'appointment_message' => 'nullable|string',
            'appointment_date' => 'required|date',
        ]);

        Appointment::create($request->all());

        // Redirect back with a success flash message
        return redirect()->back()->with('success', 'Appointment booked successfully!');
    }
}
