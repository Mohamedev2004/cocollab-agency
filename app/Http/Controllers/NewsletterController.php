<?php

namespace App\Http\Controllers;

use App\Events\NewsletterEvent;
use Illuminate\Http\Request;
use App\Models\Newsletter;
use Inertia\Inertia;
use App\Exports\NewslettersExport;
use App\Imports\NewslettersImport;
use Maatwebsite\Excel\Facades\Excel;


class NewsletterController extends Controller
{

    public function index()
    {
        $newsletters = Newsletter::withTrashed()->get(); // Use withTrashed() to get both active and deleted records

        return Inertia::render('admin/newsletters', [
            'newsletters' => $newsletters,
        ]);
    }

    public function export()
    {
        return Excel::download(new NewslettersExport, 'newsletters.xlsx');
    }

    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:newsletters,email',
        ]);

        $contact = Newsletter::create(['email' => $request->email]);

        return back()->with('success', 'Merci pour votre inscription !');
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,csv',
        ]);

        Excel::import(new NewslettersImport, $request->file('file'));

        return back()->with('success', 'Newsletter imported successfully!');
    }

    /**
     * Update the specified contact in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Newsletter  $contact
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, $id)
    {
        // Validate the request data
        $request->validate([
            'email' => 'required|email|unique:newsletters,email',
        ]);

        // Find the payment by ID
        $contact = Newsletter::findOrFail($id);

        // Update the payment details
        $contact->update([
            'email' => $request->email,
        ]);

        return redirect()->back()->with('sucess', 'Newsletter updated successfully!');
    }

    /**
     * Remove the specified contact from storage.
     *
     * @param  \App\Models\Newsletter  $contact
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($id)
    {
        $contact = Newsletter::findOrFail($id);
        $contact->delete();
        return redirect()->back()->with('sucess', 'Newsletter Deleted Successfully!');
    }

    /**
     * Remove multiple newsletters from storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function bulkDelete(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:newsletters,id',
        ]);

        Newsletter::whereIn('id', $request->input('ids'))->delete();

        return back()->with('success', 'Selected newsletters deleted successfully.');
    }

    public function restore($id)
    {
        $contact = Newsletter::withTrashed()->findOrFail($id);

        if ($contact->trashed()) {
            $contact->restore();
            return back()->with('success', 'Newsletter restored successfully.');
        }

        return back()->with('error', 'Newsletter is not deleted.');
    }

    public function restoreAll()
    {
        Newsletter::onlyTrashed()->restore();

        return back()->with('success', 'All newsletters restored successfully.');
    }
}
