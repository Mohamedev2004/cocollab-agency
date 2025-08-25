"use client"

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, router } from '@inertiajs/react';
import { createColumns, Newsletter } from "@/components/admin/newsletters/columns";
import { DataTable } from "@/components/admin/newsletters/data-table";
import { useState, useEffect } from 'react';
import { CheckCircle2, Plus, XCircle, Trash2, Download, Upload, Undo2 } from 'lucide-react';

// Shadcn UI components for the modal and form
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Newsletters',
        href: '/mewsletters',
    },
];

interface Props {
    newsletters: Newsletter[];
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

export default function Newsletters({ newsletters, flash, auth }: Props) {
    const [data, setData] = useState<Newsletter[]>(newsletters ?? []);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedNewsletter, setSelectedNewsletter] = useState<Newsletter | null>(null);

    // State for row selection and bulk delete
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
    const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);

    // State and form for creating a new newsletter
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const { data: createFormData, setData: setCreateFormData, post, processing: createProcessing, errors: createErrors, reset: resetCreateForm } = useForm({
        email: '',
    });

    // State and form for updating an existing newsletter
    const { data: updateFormData, setData: setUpdateFormData, put, processing: updateProcessing, errors: updateErrors, reset: resetUpdateForm } = useForm({
        email: '',
    });

    // State for the delete confirmation modal
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [newsletterToDelete, setNewsletterToDelete] = useState<Newsletter | null>(null);

    // State for the restore confirmation modal
    const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
    const [newsletterToRestore, setNewsletterToRestore] = useState<Newsletter | null>(null);

    // State for the restore all confirmation modal
    const [isRestoreAllModalOpen, setIsRestoreAllModalOpen] = useState(false);

    // State for the toast notification
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');

    // State for import modal
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const { data: importFormData, setData: setImportFormData, post: postImport, processing: importProcessing, errors: importErrors, reset: resetImportForm } = useForm({
        file: null as File | null,
    });

    // Effect to update the local data state whenever the newsletters prop changes
    useEffect(() => {
        setData(newsletters);
    }, [newsletters]);

    // Effect to populate the update form when a newsletter is selected
    useEffect(() => {
        if (selectedNewsletter) {
            setUpdateFormData({
                email: selectedNewsletter.email,
            });
            setIsUpdateModalOpen(true);
        }
    }, [selectedNewsletter, setUpdateFormData]);

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

    // Handler to open the update modal and set the selected newsletter
    const handleUpdateClick = (newsletter: Newsletter) => {
        setSelectedNewsletter(newsletter);
    };

    // Handler to open the delete confirmation modal
    const handleDeleteClick = (newsletter: Newsletter) => {
        setNewsletterToDelete(newsletter);
        setIsDeleteModalOpen(true);
    };

    // Handler to open the restore confirmation modal
    const handleRestoreClick = (newsletter: Newsletter) => {
        setNewsletterToRestore(newsletter);
        setIsRestoreModalOpen(true);
    };

    // Handler for the delete confirmation
    const handleConfirmDelete = () => {
        if (newsletterToDelete) {
        router.delete(route("newsletters.destroy", newsletterToDelete.id), {
            onSuccess: () => {
            setIsDeleteModalOpen(false);
            setNewsletterToDelete(null);

            setToastMessage("Newsletter deleted successfully!");
            setToastType("success");
            setShowToast(true);
            },
            onError: (errors) => {
            console.error("Delete failed:", errors);
            setToastMessage("Failed to delete newsletter.");
            setToastType("error");
            setShowToast(true);
            },
        });
        }
    };

    // Handler for the restore confirmation
    const handleConfirmRestore = () => {
        if (newsletterToRestore) {
        router.post(
            route("newsletters.restore", newsletterToRestore.id),
            {},
            {
            onSuccess: () => {
                setIsRestoreModalOpen(false);
                setNewsletterToRestore(null);

                setToastMessage("Newsletter restored successfully!");
                setToastType("success");
                setShowToast(true);
            },
            onError: (errors) => {
                console.error("Restore failed:", errors);
                setToastMessage("Failed to restore newsletter.");
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
        if (selectedNewsletter) {
        put(route("newsletters.update", selectedNewsletter.id), {
            onSuccess: () => {
            setIsUpdateModalOpen(false);
            setSelectedNewsletter(null);
            resetUpdateForm();

            setToastMessage("Newsletter updated successfully!");
            setToastType("success");
            setShowToast(true);
            },
            onError: (errors) => {
            console.error("Update failed:", errors);
            setToastMessage("Failed to update newsletter.");
            setToastType("error");
            setShowToast(true);
            },
        });
        }
    };

    // Handler for the create form submission
    const handleCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("newsletters.store"), {
        onSuccess: () => {
            setIsCreateModalOpen(false);
            resetCreateForm();
            setToastMessage("Newsletter added successfully!");
            setToastType("success");
            setShowToast(true);
        },
        onError: (errors) => {
            console.error("Create failed:", errors);
            setToastMessage("Failed to add newsletter.");
            setToastType("error");
            setShowToast(true);
        },
        });
    };

    // Handler for import form submission
    const handleImportSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        postImport(route("newsletters.import"), {
        onSuccess: () => {
            setIsImportModalOpen(false);
            resetImportForm();
            setToastMessage("Newsletters imported successfully!");
            setToastType("success");
            setShowToast(true);
        },
        onError: (errors) => {
            console.error("Import failed:", errors);
            setToastMessage("Failed to import newsletters.");
            setToastType("error");
            setShowToast(true);
        },
        });
    };

    // Handlers for bulk delete
    const handleBulkDelete = () => {
        const selectedIds = Object.keys(rowSelection).map(id => newsletters[parseInt(id)].id);
        if (selectedIds.length > 0) {
            setIsBulkDeleteModalOpen(true);
        }
    };

    const handleConfirmBulkDelete = () => {
        const selectedIds = Object.keys(rowSelection).map(
        (id) => newsletters[parseInt(id)].id,
        );

        router.post(
        route("newsletters.bulk-delete"),
        { ids: selectedIds },
        {
            onSuccess: () => {
            setIsBulkDeleteModalOpen(false);
            setRowSelection({});
            setToastMessage("Selected newsletters deleted successfully!");
            setToastType("success");
            setShowToast(true);
            },
            onError: (errors) => {
            console.error("Bulk delete failed:", errors);
            setToastMessage("Failed to delete selected newsletters.");
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
        route("newsletters.restoreAll"),
        {},
        {
            onSuccess: () => {
            setIsRestoreAllModalOpen(false);
            setToastMessage("All newsletters restored successfully!");
            setToastType("success");
            setShowToast(true);
            },
            onError: (errors) => {
            console.error("Restore all failed:", errors);
            setToastMessage("Failed to restore all newsletters.");
            setToastType("error");
            setShowToast(true);
            },
        },
        );
    };

    // Check if there are any soft-deleted newsletters to show the button
    const hasSoftDeleted = newsletters.some(n => n.deleted_at !== null);

    // Create columns with all handlers
    const columns = createColumns(handleUpdateClick, handleDeleteClick, handleRestoreClick);

    return (
        <AppLayout breadcrumbs={breadcrumbs} user={auth.user}>
            <Head title="Newsletters" />
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
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Manage Your Newsletters</h2>
                    <p className="text-sm max-w-4xl sm:text-base text-gray-600 mb-4 dark:text-gray-300">
                    Manage your newsletters here.
                    Keeping this list updated helps maintain newsletter with your users, and any new features added to the site 
                    will be automatically communicated to subscribers.
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
                        Add Newsletter
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
                        onClick={() => window.location.href = route("newsletters.export")}
                        className="w-full sm:w-auto flex items-center justify-center whitespace-nowrap"
                        >
                        <Download className="mr-2 h-4 w-4" />
                        Export to Excel
                        </Button>

                        <Button
                        variant="outline"
                        onClick={() => setIsImportModalOpen(true)}
                        className="w-full sm:w-auto flex items-center justify-center whitespace-nowrap"
                        >
                        <Upload className="mr-2 h-4 w-4" />
                        Import Excel
                        </Button>
                    </div>
                    </div>
                <DataTable
                    columns={columns}
                    data={data}
                    rowSelection={rowSelection}
                    setRowSelection={setRowSelection}
                />
            </div>

            {/* Create newsletter Dialog/Modal */}
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogContent className="">
                    <DialogHeader>
                        <DialogTitle>Add New Newsletter</DialogTitle>
                        <DialogDescription>
                            Fill in the details to add a new Newsletter record.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCreateSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email_create" className="text-right">
                                    Email
                                </Label>
                                <Input
                                    id="email_create"
                                    value={createFormData.email}
                                    onChange={(e) => setCreateFormData('email', e.target.value)}
                                    className="col-span-3"
                                />
                                {createErrors.email && <p className="col-span-4 text-sm text-red-500">{createErrors.email}</p>}
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit" disabled={createProcessing}>
                                Save Newsletter
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Update newsletter Dialog/Modal */}
            <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
                <DialogContent className="">
                    <DialogHeader>
                        <DialogTitle>Update newsletter</DialogTitle>
                        <DialogDescription>
                            Make changes to the newsletter's profile here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleUpdateSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    value={updateFormData.email}
                                    onChange={(e) => setUpdateFormData('email', e.target.value)}
                                    className="col-span-3"
                                />
                                {updateErrors.email && <p className="col-span-4 text-sm text-red-500">{updateErrors.email}</p>}
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
                            Are you sure you want to delete the newsletter: <span className="font-bold">{newsletterToDelete?.email}</span>? This action cannot be undone.
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
                            Are you sure you want to delete the selected newsletters? This action cannot be undone.
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
                            Are you sure you want to restore the newsletter: <span className="font-bold">{newsletterToRestore?.email}</span>?
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
                            Are you sure you want to restore all soft-deleted newsletters? This action will bring back all deleted entries.
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

            {/* Import Dialog/Modal */}
            <Dialog open={isImportModalOpen} onOpenChange={setIsImportModalOpen}>
                <DialogContent className="">
                    <DialogHeader>
                        <DialogTitle>Import Newsletters</DialogTitle>
                        <DialogDescription>
                            Select an Excel or CSV file to import new newsletters.
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
            </Dialog>

        </AppLayout>
    );
}