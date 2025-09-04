"use client";

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { createColumns, Appointment } from "@/components/admin/appointments/columns";
import { DataTable } from "@/components/admin/appointments/data-table";
import { useState, useEffect } from 'react';

// Shadcn UI components for the modal
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Appointments',
        href: '/appointments',
    },
];

interface Props {
    appointments: Appointment[];
    flash?: {
        success?: string;
        error?: string;
    };
    auth: {
        user: {
            role: 'admin' | 'influencer' | 'brand';
            name: string;
        };
    };
}

export default function Appointments({ appointments, flash, auth }: Props) {
    const [data, setData] = useState<Appointment[]>(appointments ?? []);
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');

    // View modal
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [appointmentToView, setAppointmentToView] = useState<Appointment | null>(null);

    const handleViewClick = (appointment: Appointment) => {
        setAppointmentToView(appointment);
        setIsViewModalOpen(true);
    };

    useEffect(() => {
        setData(appointments);
    }, [appointments]);

    useEffect(() => {
        if (flash?.success) {
            setToastMessage(flash.success);
            setToastType('success');
            setShowToast(true);
        } else if (flash?.error) {
            setToastMessage(flash.error);
            setToastType('error');
            setShowToast(true);
        }
    }, [flash]);

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => setShowToast(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    const columns = createColumns(handleViewClick);

    return (
        <AppLayout breadcrumbs={breadcrumbs} user={auth.user}>
            <Head title="Appointments" />
            <div className="w-full px-6 mx-auto py-10">
                {showToast && (
                    <div
                        className={`fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg p-4 shadow-lg text-white animate-in fade-in slide-in-from-top-5 ${
                            toastType === 'success' ? 'bg-black text-white dark:text-black dark:bg-white' : 'bg-red-500'
                        }`}
                    >
                        <span>{toastMessage}</span>
                    </div>
                )}
                <div className="mb-4">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Manage Your Appointments</h2>
                    <p className="text-sm max-w-4xl sm:text-base text-gray-600 mb-4 dark:text-gray-300">
                        This page displays all appointments. You can view detailed information for each appointment.
                    </p>
                </div>

                <DataTable
                    columns={columns}
                    data={data}
                    rowSelection={rowSelection}
                    setRowSelection={setRowSelection}
                />
            </div>

            {/* View appointment Dialog/Modal */}
            <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
                <DialogContent className="">
                    <DialogHeader>
                        <DialogTitle>Appointment Details</DialogTitle>
                        <DialogDescription>
                            Details for {appointmentToView?.appointment_name ?? 'Appointment'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <span className="text-right font-semibold">Name:</span>
                            <span className="col-span-3">{appointmentToView?.appointment_name}</span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <span className="text-right font-semibold">Email:</span>
                            <span className="col-span-3">{appointmentToView?.appointment_email}</span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <span className="text-right font-semibold">Phone:</span>
                            <span className="col-span-3">{appointmentToView?.appointment_phone}</span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <span className="text-right font-semibold">Date:</span>
                            <span className="col-span-3">{appointmentToView?.appointment_date}</span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <span className="text-right font-semibold">Message:</span>
                            <span className="col-span-3 break-all">{appointmentToView?.appointment_message}</span>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button onClick={() => setIsViewModalOpen(false)}>Close</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
