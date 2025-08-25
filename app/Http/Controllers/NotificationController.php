<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Notification;

class NotificationController extends Controller
{
    // List notifications
    public function index()
    {
        $notifications = Notification::latest()->get()->map(function ($n) {
            return [
                'id' => $n->id,
                'title' => $n->title,
                'message' => $n->message,
                'type' => $n->type ?? 'info',
                'read' => $n->read,
                'created_at' => $n->created_at->diffForHumans(),
            ];
        });

        return Inertia::render('admin/notifications', [
            'notifications' => $notifications,
        ]);
    }

    // Mark one as read
    public function markAsRead($id)
    {
        $notification = Notification::findOrFail($id);
        $notification->update(['read' => true]);

        return response()->json(['success' => true]);
    }

    // Mark all as read
    public function markAllAsRead()
    {
        Notification::where('read', false)->update(['read' => true]);

        return response()->json(['success' => true]);
    }
}
