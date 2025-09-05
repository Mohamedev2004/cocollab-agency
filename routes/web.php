<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CountdownController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\UserActivityController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;

//------------------------------ PUBLIC ROUTES ------------------------------//
Route::middleware(['guest', 'countdown'])->group(function () {

    Route::get('/', [PageController::class, 'homePage'])->name('home');

    Route::get('/contact', [PageController::class, 'contactPage'])->name('contact');

    Route::get('/influencers', [PageController::class, 'influencerPage'])->name('influencers');

    Route::get('/brands', [PageController::class, 'brandPage'])->name('brands');

    Route::get('/press', [PageController::class, 'pressPage'])->name('press');

    Route::get('/influencer-profile', [PageController::class, 'influencerProfilePage'])->name('influencer-profile');
});


// Countdown for public pages
Route::get('/countdown', [CountdownController::class, 'show'])->name('countdown');


//------------------------------ ADMIN ROUTES ------------------------------//
Route::prefix('admin')->middleware(['auth', 'admin'])->group(function () {

    Route::get('/', [PageController::class, 'homePage'])->name('admin.home');
    Route::get('/contact', [PageController::class, 'contactPage'])->name('admin.contact');
    Route::get('/influencers', [PageController::class, 'influencerPage'])->name('admin.influencers');
    Route::get('/brands', [PageController::class, 'brandPage'])->name('admin.brands');
    Route::get('/press', [PageController::class, 'pressPage'])->name('admin.press');


    Route::prefix('dashboard')->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

        // Newsletters
        Route::get('/newsletters', [NewsletterController::class, 'index'])->name('newsletters.index');
        Route::post('/newsletters', [NewsletterController::class, 'store'])->name('newsletters.store');
        Route::put('/newsletters/{id}', [NewsletterController::class, 'update'])->name('newsletters.update');
        Route::post('/newsletters/bulk-delete', [NewsletterController::class, 'bulkDelete'])->name('newsletters.bulk-delete');
        Route::delete('/newsletters/{id}', [NewsletterController::class, 'destroy'])->name('newsletters.destroy');
        Route::post('/newsletters/{id}/restore', [NewsletterController::class, 'restore'])->name('newsletters.restore');
        Route::get('/newsletters/export', [NewsletterController::class, 'export'])->name('newsletters.export');
        Route::post('/newsletters/import', [NewsletterController::class, 'import'])->name('newsletters.import');
        Route::post('/newsletters/restore-all', [NewsletterController::class, 'restoreAll'])->name('newsletters.restoreAll');

        // Contacts
        Route::get('/contacts', [ContactController::class, 'index'])->name('contacts.index');
        Route::post('/contacts', [ContactController::class, 'store'])->name('contacts.store');
        Route::put('/contacts/{id}', [ContactController::class, 'update'])->name('contacts.update');
        Route::post('/contacts/bulk-delete', [ContactController::class, 'bulkDelete'])->name('contacts.bulk-delete');
        Route::delete('/contacts/{id}', [ContactController::class, 'destroy'])->name('contacts.destroy');
        Route::post('/contacts/{id}/restore', [ContactController::class, 'restore'])->name('contacts.restore');
        Route::get('/contacts/export', [ContactController::class, 'export'])->name('contacts.export');
        Route::post('/contacts/restore-all', [ContactController::class, 'restoreAll'])->name('contacts.restoreAll');

        // Users
        Route::get('/users', [UserController::class, 'index'])->name('users.index');
        Route::post('/users', [UserController::class, 'store'])->name('users.store');
        Route::put('/users/{id}', [UserController::class, 'update'])->name('users.update');
        Route::post('/users/bulk-delete', [UserController::class, 'bulkDelete'])->name('users.bulk-delete');
        Route::delete('/users/{id}', [UserController::class, 'destroy'])->name('users.destroy');
        Route::post('/users/{id}/restore', [UserController::class, 'restore'])->name('users.restore');
        Route::get('/users/export', [UserController::class, 'export'])->name('users.export');
        Route::post('/users/import', [UserController::class, 'import'])->name('users.import');
        Route::post('/users/restore-all', [UserController::class, 'restoreAll'])->name('users.restoreAll');
        Route::post('/users/{id}/set-active', [UserController::class, 'setActive'])->name('users.setActive');
        Route::post('/users/{id}/set-inactive', [UserController::class, 'setInactive'])->name('users.setInactive');

        // Testimonials
        Route::get('/testimonials', [TestimonialController::class, 'index'])->name('testimonials.index');
        Route::post('/testimonials', [TestimonialController::class, 'store'])->name('testimonials.store');
        Route::put('/testimonials/{id}', [TestimonialController::class, 'update'])->name('testimonials.update');
        Route::post('/testimonials/bulk-delete', [TestimonialController::class, 'bulkDelete'])->name('testimonials.bulk-delete');
        Route::delete('/testimonials/{id}', [TestimonialController::class, 'destroy'])->name('testimonials.destroy');
        Route::post('/testimonials/{id}/restore', [TestimonialController::class, 'restore'])->name('testimonials.restore');
        Route::get('/testimonials/export', [TestimonialController::class, 'export'])->name('testimonials.export');
        Route::post('/testimonials/import', [TestimonialController::class, 'import'])->name('testimonials.import');
        Route::post('/testimonials/restore-all', [TestimonialController::class, 'restoreAll'])->name('testimonials.restoreAll');

        // Countdown
        Route::get('/countdown', [CountdownController::class, 'index'])->name('countdown.index');
        Route::post('/countdown', [CountdownController::class, 'createOrUpdate'])->name('countdown.createOrUpdate');
        Route::delete('/countdown/{countdown}', [CountdownController::class, 'destroy'])->name('countdown.destroy');

        // Appointments
        Route::get('/appointments', [AppointmentController::class, 'index'])->name('appointments.index');

        // Notifications
        Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');
        Route::post('/notifications/{id}/mark-as-read', [NotificationController::class, 'markAsRead'])->name('notifications.markAsRead');
        Route::post('/notifications/mark-all-as-read', [NotificationController::class, 'markAllAsRead'])->name('notifications.markAllAsRead');
        Route::get('/notifications/unread-count', [NotificationController::class, 'unreadCount'])->name('notifications.unreadCount');

    });
});


//------------------------------ INFLUENCER ROUTES ------------------------------//
Route::prefix('influencer')->middleware(['auth', 'influencer', 'countdown'])->group(function () {

    Route::get('/', [PageController::class, 'homePage'])->name('influencer.home');
    Route::get('/influencers', [PageController::class, 'influencerPage'])->name('influencer.influencers');
    Route::get('/brands', [PageController::class, 'brandPage'])->name('influencer.brands');
    Route::get('/press', [PageController::class, 'pressPage'])->name('influencer.press');
    Route::get('/contact', [PageController::class, 'contactPage'])->name('influencer.contact');

    Route::prefix('dashboard')->group(function () {

        Route::get('/', function () {
            return Inertia::render('influencer/dashboard');
        })->name('influencer.dashboard');


        Route::get('/mails', function () {
            return Inertia::render('influencer/mails');
        })->name('influencer.mails');

        Route::get('/users/{user}/activity', [UserActivityController::class, 'getActivity'])->name('influencer.activity');
        Route::get('/users/{user}/years', [UserActivityController::class, 'getAvailableYears'])->name('influencer.activity.years');
    });
});


//------------------------------ BRAND ROUTES ------------------------------//
Route::prefix('brand')->middleware(['auth', 'brand', 'countdown'])->group(function () {

    Route::get('/', [PageController::class, 'homePage'])->name('brand.home');
    Route::get('/influencers', [PageController::class, 'influencerPage'])->name('brand.influencers');
    Route::get('/brands', [PageController::class, 'brandPage'])->name('brand.brands');
    Route::get('/press', [PageController::class, 'pressPage'])->name('brand.press');
    Route::get('/contact', [PageController::class, 'contactPage'])->name('brand.contact');

    Route::prefix('dashboard')->group(function () {

        Route::get('/', function () {
            return Inertia::render('brand/dashboard');
        })->name('brand.dashboard');

        Route::get('/users/{user}/activity', [UserActivityController::class, 'getActivity'])->name('brand.activity');
        Route::get('/users/{user}/years', [UserActivityController::class, 'getAvailableYears'])->name('brand.activity.years');

    });
});


//------------------------------ PUBLIC ROUTES ------------------------------//
Route::post('/newsletters', [NewsletterController::class, 'store'])
    ->middleware('countdown') // optional, if you still want countdown check
    ->name('newsletter.storing');

Route::post('/contacts', [ContactController::class, 'store'])
    ->middleware('countdown') // optional, if you still want countdown check
    ->name('contacts.storing');

    Route::post('/appointments', [AppointmentController::class, 'store'])
        ->middleware('countdown') // optional, if you still want countdown check
        ->name('appointments.storing');





// Catch-all fallback route
Route::fallback(function (Request $request) {
    return redirect()->back();
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
