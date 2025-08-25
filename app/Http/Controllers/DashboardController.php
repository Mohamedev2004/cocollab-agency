<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/dashboard');
    }

    public function unreadCount()
    {
        $count = DB::table('notifications')->where('read', false)->count();
        return response()->json(['count' => $count]);
    }

    public function homePage(): Response
    {
        return Inertia::render('welcome');
    }

    public function contactPage(): Response
    {
        return Inertia::render('contact');
    }
}
