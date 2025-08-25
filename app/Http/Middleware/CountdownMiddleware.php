<?php

namespace App\Http\Middleware;

use App\Models\Countdown;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CountdownMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        // Retrieve the current countdown setting from the database
        $countdown = Countdown::first();
        
        // Allow all requests if no countdown exists or it has ended
        if (!$countdown || now()->greaterThanOrEqualTo($countdown->current_end_time)) {
            if($request->routeIs('countdown'))
                return redirect('/');
            return $next($request);
        }
        
        // Redirect to countdown page for all other routes
        return redirect()->route('countdown');
    }
}
