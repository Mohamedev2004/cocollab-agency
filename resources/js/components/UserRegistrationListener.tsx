/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import Pusher from 'pusher-js';
import { toast } from 'sonner';

interface UserRegistrationListenerProps {
    user: {
        role: 'admin' | 'brand' | 'influencer';
        name?: string;
    };
}

export default function UserRegistrationListener({ user }: UserRegistrationListenerProps) {
    useEffect(() => {
        if (user.role !== 'admin') return; // Only admins receive notifications

        Pusher.logToConsole = true;

        const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
            cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
        });

        const channel = pusher.subscribe('my-channel');

        channel.bind('my-event', function (data: any) {
            console.log('Received data:', data);

            const message = data?.data?.message || 'No message provided';

            toast.success('Nouvelle Registration', {
                description: (
                    <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium">{message}</span>
                    </div>
                ),
                position: 'top-right',
                duration: 7000,
                richColors: true,
                closeButton: false, // <--- close button disabled
                style: {
                    background: '#ffffff', // white for dark mode, black otherwise
                    color: '#000000',       // black text on white, white text on black
                    fontWeight: '600',
                    fontSize: '16px',
                    borderRadius: '12px',
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)',
                    padding: '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                },
            });
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [user.role]);

    return null;
}
