<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function homePage(): Response
    {
        return Inertia::render('welcome');
    }

    public function contactPage(): Response
    {
        return Inertia::render('contact');
    }

    public function influencerPage(): Response
    {
        return Inertia::render('influencers');
    }

    public function brandPage(): Response
    {
        return Inertia::render('brands');
    }
}
