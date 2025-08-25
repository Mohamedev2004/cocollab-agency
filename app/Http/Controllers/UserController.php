<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\UserExport;
use App\Imports\UserImport;


class UserController extends Controller
{
    /**
     * Display a listing of users.
     */
    public function index()
    {
        $users = User::withTrashed()->get();

        return Inertia::render('admin/users', [
            'users' => $users,
        ]);
    }

    public function export()
    {
        return Excel::download(new UserExport, 'users.xlsx');
    }


    /**
     * Store a newly created user.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'role'     => ['required', Rule::in(['admin', 'brand', 'influencer'])],
            'status'   => ['nullable', Rule::in(['Active', 'Inactive'])],
        ]);

        User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'role'     => $request->role,
            'status' => $request->filled('status') ? $request->status : 'Inactive'
        ]);

        return redirect()->back()->with('success', 'User created successfully.');
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,csv',
        ]);

        Excel::import(new UserImport, $request->file('file'));

        return back()->with('success', 'User imported successfully!');
    }


    /**
     * Update the specified user.
     */

    public function update(Request $request, $id)
    {
        // First fetch the user
        $user = User::findOrFail($id);

        // Then validate, now you can safely use $user->id
        $request->validate([
            'name'     => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                Rule::unique('users')->ignore($user->id),
            ],
            'password' => 'nullable|string|min:8',
            'role'     => ['required', Rule::in(['admin', 'brand', 'influencer'])],
            'status'   => ['required', Rule::in(['Active', 'Inactive'])],
        ]);

        // Update data
        $user->update([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => $request->filled('password')
                ? Hash::make($request->password)
                : $user->password,
            'role'     => $request->role,
            'status'   => $request->status,
        ]);

        return redirect()->back()->with('success', 'User updated successfully.');
    }

    /**
     * Remove the specified user.
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return redirect()->back()->with('success', 'User deleted successfully.');
    }

    public function bulkDelete(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:newsletters,id',
        ]);

        User::whereIn('id', $request->input('ids'))->delete();

        return back()->with('success', 'Selected users deleted successfully.');
    }


    public function restore($id)
    {
        $user = User::withTrashed()->findOrFail($id);

        if ($user->trashed()) {
            $user->restore();
            return back()->with('success', 'User restored successfully.');
        }

        return back()->with('error', 'User is not deleted.');
    }

    public function restoreAll()
    {
        User::onlyTrashed()->restore();

        return back()->with('success', 'All users restored successfully.');
    }

    /**
     * Set a user as Active.
     */
    public function setActive($id)
    {
        $user = User::withTrashed()->findOrFail($id);

        $user->update(['status' => 'Active']);

        return back()->with('success', 'User status set to Active.');
    }

    /**
     * Set a user as Inactive.
     */
    public function setInactive($id)
    {
        $user = User::withTrashed()->findOrFail($id);

        $user->update(['status' => 'Inactive']);

        return back()->with('success', 'User status set to Inactive.');
    }

}
