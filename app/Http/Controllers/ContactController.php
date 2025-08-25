<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact; // Updated from Newsletter
use Inertia\Inertia;
use App\Exports\ContactsExport; // Updated from NewslettersExport
/* use App\Imports\ContactsImport; // Updated from NewslettersImport
 */
use Maatwebsite\Excel\Facades\Excel;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        // Use withTrashed() to get both active and soft-deleted contacts.
        $contacts = Contact::withTrashed()->get();

        return Inertia::render('admin/contacts', [
            'contacts' => $contacts,
        ]);
    }

    /**
     * Export all contacts to an Excel file.
     *
     * @return \Illuminate\Http\Response
     */
    public function export()
    {
        return Excel::download(new ContactsExport, 'contacts.xlsx');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $request->validate([
        // Validate all required contact fields.
            'contact_name' => 'required|string|max:255',
            'contact_phone' => 'nullable|string|max:20',
            'contact_email' => 'required|email|max:255',
            'contact_subject' => 'nullable|string|max:255',
            'contact_message' => 'nullable|string|max:20000',
        ]);

        // Create a new Contact record.
        Contact::create($request->all());

        return back()->with('success', 'Contact added successfully!');
    }


    /**
     * Update the specified contact in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Contact  $contact
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, $id)
    {
        // Find the contact by ID.
        $contact = Contact::findOrFail($id);

        // Validate the request data, ignoring the current contact's email for the unique rule.
        $request->validate([
            'contact_name' => 'required|string|max:255',
            'contact_phone' => 'nullable|string|max:20',
            'contact_email' => 'required|email|max:255',
            'contact_subject' => 'nullable|string|max:255',
            'contact_message' => 'nullable|string',
        ]);

        // Update the contact details.
        $contact->update($request->all());

        return redirect()->back()->with('success', 'Contact updated successfully!');
    }

    /**
     * Remove the specified contact from storage (soft delete).
     *
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->delete();
        return redirect()->back()->with('success', 'Contact deleted successfully!');
    }

    /**
     * Remove multiple contacts from storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function bulkDelete(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:contacts,id',
        ]);

        Contact::whereIn('id', $request->input('ids'))->delete();

        return back()->with('success', 'Selected contacts deleted successfully.');
    }

    /**
     * Restore a single soft-deleted contact.
     *
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function restore($id)
    {
        $contact = Contact::withTrashed()->findOrFail($id);

        if ($contact->trashed()) {
            $contact->restore();
            return back()->with('success', 'Contact restored successfully.');
        }

        return back()->with('error', 'Contact is not deleted.');
    }

    /**
     * Restore all soft-deleted contacts.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function restoreAll()
    {
        Contact::onlyTrashed()->restore();

        return back()->with('success', 'All contacts restored successfully.');
    }
}
