/* eslint-disable no-irregular-whitespace */
"use client"

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, router } from '@inertiajs/react';
import { createColumns, Contact } from "@/components/admin/contacts/columns";
import { DataTable } from "@/components/admin/contacts/data-table";
import { useState, useEffect } from 'react';
import { CheckCircle2, Plus, XCircle, Trash2, Download, /* Upload */ Undo2 } from 'lucide-react';

// Shadcn UI components for the modal and form
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    /* DialogFooter */
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Contacts',
        href: '/contacts',
    },
];

interface Props {
    contacts: Contact[];
    flash?: {
        success?: string;
        error?: string;
    };
    auth: {
        user: {
            role: 'admin' | 'influencer' | 'brand';
            name: string;
            // add other fields if needed
        };
    };
}


export default function Contacts({ contacts, flash, auth }: Props) {
    const [data, setData] = useState<Contact[]>(contacts ?? []);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

    // State for row selection and bulk delete
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
    const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);

    // State and form for creating a new contact
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const { data: createFormData, setData: setCreateFormData, post, processing: createProcessing, errors: createErrors, reset: resetCreateForm } = useForm({
        contact_name: '',
        contact_phone: '',
        contact_email: '',
        contact_subject: '',
        contact_message: '',
    });

    // State and form for updating an existing contact
    const { data: updateFormData, setData: setUpdateFormData, put, processing: updateProcessing, errors: updateErrors, reset: resetUpdateForm } = useForm({
        contact_name: '',
        contact_phone: '',
        contact_email: '',
        contact_subject: '',
        contact_message: '',
    });

    // State for the delete confirmation modal
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);

    // State for the restore confirmation modal
    const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
    const [contactToRestore, setContactToRestore] = useState<Contact | null>(null);

    // State for the restore all confirmation modal
    const [isRestoreAllModalOpen, setIsRestoreAllModalOpen] = useState(false);

    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [contactToView, setContactToView] = useState<Contact | null>(null);

    const handleViewClick = (contact: Contact) => {
        setContactToView(contact);
        setIsViewModalOpen(true);
    };

    // State for the toast notification
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');

    // State for import modal
    /* const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const { data: importFormData, setData: setImportFormData, post: postImport, processing: importProcessing, errors: importErrors, reset: resetImportForm } = useForm({
        file: null as File | null,
    }); */

    // Effect to update the local data state whenever the contacts prop changes
    useEffect(() => {
        setData(contacts);
    }, [contacts]);

    // Effect to populate the update form when a contact is selected
    useEffect(() => {
        if (selectedContact) {
            setUpdateFormData({
                contact_name: selectedContact.contact_name,
                contact_phone: selectedContact.contact_phone,
                contact_email: selectedContact.contact_email,
                contact_subject: selectedContact.contact_subject,
                contact_message: selectedContact.contact_message,
            });
            setIsUpdateModalOpen(true);
        }
    }, [selectedContact, setUpdateFormData]);

    // Effect to handle flash messages from the server
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

    // Effect to hide the toast after a few seconds
    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => setShowToast(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    // Handler to open the update modal and set the selected contact
    const handleUpdateClick = (contact: Contact) => {
        setSelectedContact(contact);
    };

    // Handler to open the delete confirmation modal
    const handleDeleteClick = (contact: Contact) => {
        setContactToDelete(contact);
        setIsDeleteModalOpen(true);
    };

    // Handler to open the restore confirmation modal
    const handleRestoreClick = (contact: Contact) => {
        setContactToRestore(contact);
        setIsRestoreModalOpen(true);
    };

    // Handler for the delete confirmation
    const handleConfirmDelete = () => {
        if (contactToDelete) {
        router.delete(route("contacts.destroy", contactToDelete.id), {
            onSuccess: () => {
            setIsDeleteModalOpen(false);
            setContactToDelete(null);

            setToastMessage("Contact deleted successfully!");
            setToastType("success");
            setShowToast(true);
            },
            onError: (errors) => {
            console.error("Delete failed:", errors);
            setToastMessage("Failed to delete contact.");
            setToastType("error");
            setShowToast(true);
            },
        });
        }
    };

    // Handler for the restore confirmation
    const handleConfirmRestore = () => {
        if (contactToRestore) {
        router.post(
            route("contacts.restore", contactToRestore.id),
            {},
            {
            onSuccess: () => {
                setIsRestoreModalOpen(false);
                setContactToRestore(null);

                setToastMessage("Contact restored successfully!");
                setToastType("success");
                setShowToast(true);
            },
            onError: (errors) => {
                console.error("Restore failed:", errors);
                setToastMessage("Failed to restore contact.");
                setToastType("error");
                setShowToast(true);
            },
            },
        );
        }
    };

    // Handler for the update form submission
    const handleUpdateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedContact) {
        put(route("contacts.update", selectedContact.id), {
            onSuccess: () => {
            setIsUpdateModalOpen(false);
            setSelectedContact(null);
            resetUpdateForm();

            setToastMessage("Contact updated successfully!");
            setToastType("success");
            setShowToast(true);
            },
            onError: (errors) => {
            console.error("Update failed:", errors);
            setToastMessage("Failed to update contact.");
            setToastType("error");
            setShowToast(true);
            },
        });
        }
    };

    // Handler for the create form submission
    const handleCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("contacts.store"), {
        onSuccess: () => {
            setIsCreateModalOpen(false);
            resetCreateForm();
            setToastMessage("Contact added successfully!");
            setToastType("success");
            setShowToast(true);
        },
        onError: (errors) => {
            console.error("Create failed:", errors);
            setToastMessage("Failed to add contact.");
            setToastType("error");
            setShowToast(true);
        },
        });
    };

    // Handler for import form submission
    /* const handleImportSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        postImport('/contacts/import', {
            onSuccess: () => {
                setIsImportModalOpen(false);
                resetImportForm();
                setToastMessage('Contacts imported successfully!');
                setToastType('success');
                setShowToast(true);
            },
            onError: (errors) => {
                console.error('Import failed:', errors);
                setToastMessage('Failed to import contacts.');
                setToastType('error');
                setShowToast(true);
            },
        });
    }; */

    // Handlers for bulk delete
    const handleBulkDelete = () => {
        const selectedIds = Object.keys(rowSelection).map(id => contacts[parseInt(id)].id);
        if (selectedIds.length > 0) {
            setIsBulkDeleteModalOpen(true);
        }
    };

    const handleConfirmBulkDelete = () => {
        const selectedIds = Object.keys(rowSelection).map(
        (id) => contacts[parseInt(id)].id,
        );

        router.post(
        route("contacts.bulk-delete"),
        { ids: selectedIds },
        {
            onSuccess: () => {
            setIsBulkDeleteModalOpen(false);
            setRowSelection({});
            setToastMessage("Selected contacts deleted successfully!");
            setToastType("success");
            setShowToast(true);
            },
            onError: (errors) => {
            console.error("Bulk delete failed:", errors);
            setToastMessage("Failed to delete selected contacts.");
            setToastType("error");
            setShowToast(true);
            },
        },
        );
    };

    // New handlers for restore all
    const handleRestoreAllClick = () => {
        setIsRestoreAllModalOpen(true);
    };

    const handleConfirmRestoreAll = () => {
        router.post(
        route("contacts.restoreAll"),
        {},
        {
            onSuccess: () => {
            setIsRestoreAllModalOpen(false);
            setToastMessage("All contacts restored successfully!");
            setToastType("success");
            setShowToast(true);
            },
            onError: (errors) => {
            console.error("Restore all failed:", errors);
            setToastMessage("Failed to restore all contacts.");
            setToastType("error");
            setShowToast(true);
            },
        },
        );
    };

    // Check if there are any soft-deleted contacts to show the button
    const hasSoftDeleted = contacts.some(n => n.deleted_at !== null);

    // Create columns with all handlers
    const columns = createColumns(handleUpdateClick, handleDeleteClick, handleRestoreClick, handleViewClick);

    

    return (
        <AppLayout breadcrumbs={breadcrumbs} user={auth.user}>
            <Head title="Contacts" />
            <div className="w-full px-6 mx-auto py-10">
                {showToast && (
                    <div
                        className={`fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg p-4 shadow-lg text-white animate-in fade-in slide-in-from-top-5 ${
                            toastType === 'success' ? 'bg-black text-white dark:text-black dark:bg-white' : 'bg-red-500'
                        }`}
                    >
                        {toastType === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                        <span>{toastMessage}</span>
                    </div>
                )}
                <div className="mb-4">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Manage Your Contacts</h2>
                    <p className="text-sm max-w-4xl sm:text-base text-gray-600 mb-4 dark:text-gray-300">
                    This page is where you manage your contacts. The data you see here comes directly from the contact form on your user pages.
                    </p>

                    <div className="flex flex-col sm:flex-row sm:flex-wrap justify-end gap-2 w-full">
                        {Object.keys(rowSelection).length > 0 && (
                        <Button
                            variant="destructive"
                            onClick={handleBulkDelete}
                            className="w-full sm:w-auto flex items-center justify-center whitespace-nowrap"
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Selected ({Object.keys(rowSelection).length})
                        </Button>
                        )}

                        <Button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="w-full sm:w-auto flex items-center justify-center whitespace-nowrap"
                        >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Contact
                        </Button>

                        {hasSoftDeleted && (
                        <Button
                            variant="outline"
                            onClick={handleRestoreAllClick}
                            className="w-full sm:w-auto flex items-center justify-center whitespace-nowrap"
                        >
                            <Undo2 className="mr-2 h-4 w-4" />
                            Restore All
                        </Button>
                        )}

                        <Button
                        variant="outline"
                        onClick={() => window.location.href = route("contacts.export")}
                        className="w-full sm:w-auto flex items-center justify-center whitespace-nowrap"
                        >
                        <Download className="mr-2 h-4 w-4" />
                        Export to Excel
                        </Button>

                        {/* <Button
                        variant="outline"
                        onClick={() => setIsImportModalOpen(true)}
                        className="w-full sm:w-auto flex items-center justify-center whitespace-nowrap"
                        >
                        <Upload className="mr-2 h-4 w-4" />
                        Import Excel
                        </Button> */}
                    </div>
                </div>
                <DataTable
                    columns={columns}
                    data={data}
                    rowSelection={rowSelection}
                    setRowSelection={setRowSelection}
                />
            </div>

            {/* Create contact Dialog/Modal */}
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogContent className="">
                    <DialogHeader>
                        <DialogTitle>Add New Contact</DialogTitle>
                        <DialogDescription>
                            Fill in the details to add a new Contact record.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCreateSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="contact_name_create" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="contact_name_create"
                                    value={createFormData.contact_name}
                                    onChange={(e) => setCreateFormData('contact_name', e.target.value)}
                                    className="col-span-3"
                                />
                                {createErrors.contact_name && <p className="col-span-4 text-sm text-red-500">{createErrors.contact_name}</p>}
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="contact_email_create" className="text-right">
                                    Email
                                </Label>
                                <Input
                                    id="contact_email_create"
                                    value={createFormData.contact_email}
                                    onChange={(e) => setCreateFormData('contact_email', e.target.value.toLowerCase())}
                                    className="col-span-3"
                                />
                                {createErrors.contact_email && <p className="col-span-4 text-sm text-red-500">{createErrors.contact_email}</p>}
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="contact_phone_create" className="text-right">
                                    Phone
                                </Label>
                                <Input
                                    id="contact_phone_create"
                                    value={createFormData.contact_phone}
                                    onChange={(e) => setCreateFormData('contact_phone', e.target.value.replace(/\D/g, ""))}
                                    maxLength={10}
                                    className="col-span-3"
                                />
                                {createErrors.contact_phone && <p className="col-span-4 text-sm text-red-500">{createErrors.contact_phone}</p>}
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="contact_subject_create" className="text-right">
                                    Subject
                                </Label>
                                <Input
                                    id="contact_subject_create"
                                    value={createFormData.contact_subject}
                                    onChange={(e) => setCreateFormData('contact_subject', e.target.value)}
                                    className="col-span-3"
                                />
                                {createErrors.contact_subject && <p className="col-span-4 text-sm text-red-500">{createErrors.contact_subject}</p>}
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="contact_message_create" className="text-right">
                                    Message
                                </Label>
                                <Textarea
                                    id="contact_message_create"
                                    value={createFormData.contact_message}
                                    onChange={(e) => setCreateFormData('contact_message', e.target.value)}
                                    className="col-span-3"
                                />
                                {createErrors.contact_message && <p className="col-span-4 text-sm text-red-500">{createErrors.contact_message}</p>}
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit" disabled={createProcessing}>
                                Save Contact
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Update contact Dialog/Modal */}
            <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
                <DialogContent className="">
                    <DialogHeader>
                        <DialogTitle>Update contact</DialogTitle>
                        <DialogDescription>
                            Make changes to the contact's profile here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleUpdateSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="contact_name_update" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="contact_name_update"
                                    value={updateFormData.contact_name}
                                    onChange={(e) => setUpdateFormData('contact_name', e.target.value)}
                                    className="col-span-3"
                                />
                                {updateErrors.contact_name && <p className="col-span-4 text-sm text-red-500">{updateErrors.contact_name}</p>}
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="contact_email_update" className="text-right">
                                    Email
                                </Label>
                                <Input
                                    id="contact_email_update"
                                    value={updateFormData.contact_email}
                                    onChange={(e) => setUpdateFormData('contact_email', e.target.value.toLowerCase())}
                                    className="col-span-3"
                                />
                                {updateErrors.contact_email && <p className="col-span-4 text-sm text-red-500">{updateErrors.contact_email}</p>}
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="contact_phone_update" className="text-right">
                                    Phone
                                </Label>
                                <Input
                                    id="contact_phone_update"
                                    value={updateFormData.contact_phone}
                                    onChange={(e) => setUpdateFormData('contact_phone', e.target.value.replace(/\D/g, ""))}
                                    className="col-span-3"
                                />
                                {updateErrors.contact_phone && <p className="col-span-4 text-sm text-red-500">{updateErrors.contact_phone}</p>}
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="contact_subject_update" className="text-right">
                                    Subject
                                </Label>
                                <Input
                                    id="contact_subject_update"
                                    value={updateFormData.contact_subject}
                                    onChange={(e) => setUpdateFormData('contact_subject', e.target.value)}
                                    className="col-span-3"
                                />
                                {updateErrors.contact_subject && <p className="col-span-4 text-sm text-red-500">{updateErrors.contact_subject}</p>}
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="contact_message_update" className="text-right">
                                    Message
                                </Label>
                                <Textarea
                                    id="contact_message_update"
                                    value={updateFormData.contact_message}
                                    onChange={(e) => setUpdateFormData('contact_message', e.target.value)}
                                    className="col-span-3"
                                />
                                {updateErrors.contact_message && <p className="col-span-4 text-sm text-red-500">{updateErrors.contact_message}</p>}
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit" disabled={updateProcessing}>
                                Save changes
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog/Modal */}
            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                <DialogContent className="">
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete the contact: <span className="font-bold">{contactToDelete?.contact_name}</span>? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleConfirmDelete}>
                            Confirm Delete
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Bulk Delete Dialog */}
            <Dialog open={isBulkDeleteModalOpen} onOpenChange={setIsBulkDeleteModalOpen}>
                <DialogContent className="">
                    <DialogHeader>
                        <DialogTitle>Confirm Bulk Deletion</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete the selected contacts? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsBulkDeleteModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleConfirmBulkDelete}>
                            Confirm Delete
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Restore Confirmation Dialog/Modal */}
            <Dialog open={isRestoreModalOpen} onOpenChange={setIsRestoreModalOpen}>
                <DialogContent className="">
                    <DialogHeader>
                        <DialogTitle>Confirm Restore</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to restore the contact: <span className="font-bold">{contactToRestore?.contact_name}</span>?
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsRestoreModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleConfirmRestore}>
                            Confirm Restore
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Restore All Confirmation Dialog/Modal */}
            <Dialog open={isRestoreAllModalOpen} onOpenChange={setIsRestoreAllModalOpen}>
                <DialogContent className="">
                    <DialogHeader>
                        <DialogTitle>Confirm Restore All</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to restore all soft-deleted contacts? This action will bring back all deleted entries.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsRestoreAllModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleConfirmRestoreAll}>
                            Confirm Restore All
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
                <DialogContent className="">
                    <DialogHeader>
                        <DialogTitle>Contact Details</DialogTitle>
                        <DialogDescription>
                            Details for {contactToView?.contact_name}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <span className="text-right font-semibold">Name:</span>
                            <span className="col-span-3">{contactToView?.contact_name}</span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <span className="text-right font-semibold">Email:</span>
                            <span className="col-span-3">{contactToView?.contact_email}</span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <span className="text-right font-semibold">Phone:</span>
                            <span className="col-span-3">{contactToView?.contact_phone}</span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <span className="text-right font-semibold">Subject:</span>
                            <span className="col-span-3">{contactToView?.contact_subject}</span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <span className="text-right font-semibold">Message:</span>
                            <span className="col-span-3 break-all">{contactToView?.contact_message}</span>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button onClick={() => setIsViewModalOpen(false)}>
                            Close
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Import Dialog/Modal */}
            {/* <Dialog open={isImportModalOpen} onOpenChange={setIsImportModalOpen}>
                <DialogContent className="">
                    <DialogHeader>
                        <DialogTitle>Import Contacts</DialogTitle>
                        <DialogDescription>
                            Select an Excel or CSV file to import new contacts.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleImportSubmit} encType="multipart/form-data">
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="file" className="text-right">
                                    File
                                </Label>
                                <Input
                                    id="file"
                                    type="file"
                                    accept=".xlsx,.csv"
                                    onChange={(e) => setImportFormData('file', e.target.files?.[0] || null)}
                                    className="col-span-3"
                                />
                                {importErrors.file && <p className="col-span-4 text-sm text-red-500">{importErrors.file}</p>}
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsImportModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={importProcessing || !importFormData.file}>
                                Import
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog> */}

        </AppLayout>
    );
}