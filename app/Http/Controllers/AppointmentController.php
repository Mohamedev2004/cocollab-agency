<?php

namespace App\Http\Controllers;

use App\Exports\AppointmentsExport;
use App\Models\Appointment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

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

    public function confirmMany(Request $request)
    {
        $validated = $request->validate([
            'appointment_ids' => 'required|array|min:1',
            'appointment_ids.*' => 'integer|exists:appointments,id',
        ]);

        $appointments = Appointment::whereIn('id', $validated['appointment_ids'])
            ->where('status', 'Pending') // only confirm pending ones
            ->get();

        $updated = 0;

        foreach ($appointments as $appointment) {
            $appointment->update(['status' => 'Confirmed']);
            $updated++;
        }

        return redirect()->back()->with('status', "{$updated} rendez-vous confirmés avec succès !");
    }


    public function cancelMany(Request $request)
    {
        $validated = $request->validate([
            'appointment_ids' => 'required|array|min:1',
            'appointment_ids.*' => 'integer|exists:appointments,id',
        ]);

        $appointments = Appointment::whereIn('id', $validated['appointment_ids'])
            ->where('status', 'Pending') // only confirm pending ones
            ->get();

        $updated = 0;

        foreach ($appointments as $appointment) {
            $appointment->update(['status' => 'Cancelled']);
            $updated++;
        }

        return redirect()->back()->with('status', "{$updated} rendez-vous annulés avec succès !");
    }


    public function completeMany(Request $request)
    {
        $validated = $request->validate([
            'appointment_ids' => 'required|array|min:1',
            'appointment_ids.*' => 'integer|exists:appointments,id',
        ]);

        $appointments = Appointment::whereIn('id', $validated['appointment_ids'])
            ->where('status', 'Confirmed') // only confirm pending ones
            ->get();

        $updated = 0;

        foreach ($appointments as $appointment) {
            $appointment->update(['status' => 'Completed']);
            $updated++;
        }

        return redirect()->back()->with('status', "{$updated} rendez-vous complétés avec succès !");
    }

    public function export()
    {
        return Excel::download(new AppointmentsExport, 'appointments.xlsx');
    }
}
