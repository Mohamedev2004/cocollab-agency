<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\UserActivity;
use Carbon\Carbon;

class AuthenticatedSessionController extends Controller
{
    /**
     * Show the login page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();
        $request->session()->regenerate();

        $user = Auth::user();

        // Record login activity
        if (in_array($user->role, ['brand', 'influencer'])) {
            UserActivity::create([
                'user_id' => $user->id,
                'activity_date' => now()->toDateString(),
                'type' => 'login',
            ]);
        }

        // Redirect based on role
        if ($user->role === 'admin') {
            return redirect()->intended(route('dashboard')); // admin dashboard
        } elseif ($user->role === 'influencer') {
            return redirect()->intended(route('influencer.dashboard')); // influencer dashboard
        } elseif ($user->role === 'brand') {
            return redirect()->intended(route('brand.dashboard')); // brand dashboard
        }

        // fallback
        return redirect()->intended('/');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
