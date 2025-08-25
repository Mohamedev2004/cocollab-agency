<?php

namespace App\Http\Controllers;

use App\Exports\TestimonialsExport;
use App\Imports\TestimonialsImport;
use Illuminate\Http\Request;
use App\Models\Testimonial;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;


class TestimonialController extends Controller
{
    /**
     * Display a listing of the testimonials.
     */
    public function index()
    {
        $testimonials = Testimonial::withTrashed()->get();

        return Inertia::render('admin/testimonials', [
            'testimonials' => $testimonials,
        ]);
    }

    /**
     * Store a newly created testimonial in storage.
     */
    public function store(Request $request)
    {
        // 1. Validate the incoming request data.
        $request->validate([
            'testimonial_image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'testimonial_name' => 'required|string|max:255',
            'testimonial_position' => 'required|string|max:255',
            'testimonial_feedback' => 'required|string',
        ]);

        // 2. Determine the image path.
        // Check if a file was uploaded.
        if ($request->hasFile('testimonial_image')) {
            // Store the new image.
            $filename = Str::uuid() . '.' . $request->file('testimonial_image')->getClientOriginalExtension();
            $imagePath = $request->file('testimonial_image')->storeAs('testimonials', $filename, 'public');
        } else {
            // Assign a default image path.
            $imagePath = 'testimonials/testimonial.svg';
        }

        // 3. Create the new testimonial record using the determined image path.
        Testimonial::create([
            'testimonial_image' => $imagePath,
            'testimonial_name' => $request->testimonial_name,
            'testimonial_position' => $request->testimonial_position,
            'testimonial_feedback' => $request->testimonial_feedback,
        ]);

        return back()->with('success', 'Testimonial added successfully!');
    }

    public function export()
    {
        return Excel::download(new TestimonialsExport, 'testimonials.xlsx');
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,csv',
        ]);

        Excel::import(new TestimonialsImport, $request->file('file'));

        return back()->with('success', 'Testimonial imported successfully!');
    }

    /**
     * Update the specified testimonial in storage.
     */
    public function update(Request $request, $id)
    {
        $testimonial = Testimonial::findOrFail($id);

        $request->validate([
            'testimonial_image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'testimonial_name' => 'required|string|max:255',
            'testimonial_position' => 'required|string|max:255',
            'testimonial_feedback' => 'required|string',
        ]);

        $data = $request->only(['testimonial_name', 'testimonial_position', 'testimonial_feedback']);

        if ($request->hasFile('testimonial_image')) {
            // Delete old image if exists
            if ($testimonial->testimonial_image && Storage::disk('public')->exists($testimonial->testimonial_image)) {
                Storage::disk('public')->delete($testimonial->testimonial_image);
            }

            // Store new image
            $filename = Str::uuid() . '.' . $request->file('testimonial_image')->getClientOriginalExtension();
            $path = $request->file('testimonial_image')->storeAs('testimonials', $filename, 'public');
            $data['testimonial_image'] = $path;
        }

        $testimonial->update($data);

        return redirect()->back()->with('success', 'Testimonial updated successfully!');
    }

    /**
     * Remove the specified testimonial (soft delete).
     */
    public function destroy($id)
    {
        $testimonial = Testimonial::findOrFail($id);
        $testimonial->delete();

        return back()->with('success', 'Testimonial deleted successfully!');
    }

    /**
     * Bulk delete testimonials.
     */
    public function bulkDelete(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:testimonials,id',
        ]);

        Testimonial::whereIn('id', $request->input('ids'))->delete();

        return back()->with('success', 'Selected testimonials deleted successfully.');
    }

    /**
     * Restore a single soft-deleted testimonial.
     */
    public function restore($id)
    {
        $testimonial = Testimonial::withTrashed()->findOrFail($id);

        if ($testimonial->trashed()) {
            $testimonial->restore();
            return back()->with('success', 'Testimonial restored successfully.');
        }

        return back()->with('error', 'Testimonial is not deleted.');
    }

    /**
     * Restore all soft-deleted testimonials.
     */
    public function restoreAll()
    {
        Testimonial::onlyTrashed()->restore();

        return back()->with('success', 'All testimonials restored successfully.');
    }
}
