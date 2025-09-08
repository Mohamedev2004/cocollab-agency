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
            'appointment_email' => 'required|email|max:255',
            'appointment_message' => 'required|string',
            'appointment_date' => 'required|date',
        ]);

        Appointment::create($request->all());

        // Redirect back with a success flash message
        return redirect()->back()->with('success', 'Appointment booked successfully!');
    }

    public function setConfirmed($id)
    {
        $appointment = Appointment::findOrFail($id);

        $appointment->update(['status' => 'Confirmed']);

        return back()->with('success', 'Appointment status set to Confirmed.');
    }

    public function setCompleted($id)
    {
        $appointment = Appointment::findOrFail($id);

        $appointment->update(['status' => 'Completed']);

        return back()->with('success', 'Appointment status set to Completed.');
    }

    public function setCancelled($id)
    {
        $appointment = Appointment::findOrFail($id);

        $appointment->update(['status' => 'Cancelled']);

        return back()->with('success', 'Appointment status set to Cancelled.');
    }
}
