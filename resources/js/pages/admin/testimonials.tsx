"use client"

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, router } from '@inertiajs/react';
import { createColumns, Testimonial } from "@/components/admin/testimonials/columns";
import { DataTable } from "@/components/admin/testimonials/data-table";
import { useState, useEffect } from 'react';
import { CheckCircle2, Plus, XCircle, Trash2, Download, Undo2, Upload } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ImageCropper from '@/components/ImageCropper';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Testimonials',
        href: '/testimonials',
    },
];

interface Props {
    testimonials: Testimonial[];
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

export default function Testimonials({ testimonials, flash, auth }: Props) {
    const [data, setData] = useState<Testimonial[]>(testimonials ?? []);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
    const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const { data: createFormData, setData: setCreateFormData, post, processing: createProcessing, errors: createErrors, reset: resetCreateForm } = useForm({
        testimonial_name: '',
        testimonial_position: '',
        testimonial_feedback: '',
        testimonial_image: null as File | null,
    });

    const { data: updateFormData, setData: setUpdateFormData, post: postUpdate, processing: updateProcessing, errors: updateErrors, reset: resetUpdateForm } = useForm({
        testimonial_name: '',
        testimonial_position: '',
        testimonial_feedback: '',
        testimonial_image: null as File | null,
        _method: 'PUT' as const,
    });

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [testimonialToDelete, setTestimonialToDelete] = useState<Testimonial | null>(null);
    const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
    const [testimonialToRestore, setTestimonialToRestore] = useState<Testimonial | null>(null);
    const [isRestoreAllModalOpen, setIsRestoreAllModalOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');
    
    const [createImagePreview, setCreateImagePreview] = useState<string | null>(null);
    const [updateImagePreview, setUpdateImagePreview] = useState<string | null>(null);
    
    // Image cropping states
    const [isCropperOpen, setIsCropperOpen] = useState(false);
    const [cropperImageFile, setCropperImageFile] = useState<File | null>(null);
    const [cropperMode, setCropperMode] = useState<'create' | 'update'>('create');

    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const {
        data: importFormData,
        setData: setImportFormData,
        post: postImport,
        processing: importProcessing,
        errors: importErrors,
        reset: resetImportForm,
    } = useForm({
        file: null as File | null,
    });

    useEffect(() => {
        setData(testimonials);
    }, [testimonials]);

    useEffect(() => {
        if (selectedTestimonial) {
            setUpdateFormData({
                testimonial_name: selectedTestimonial.testimonial_name,
                testimonial_position: selectedTestimonial.testimonial_position,
                testimonial_feedback: selectedTestimonial.testimonial_feedback,
                testimonial_image: null,
                _method: 'PUT',
            });
            setIsUpdateModalOpen(true);
        }
    }, [selectedTestimonial, setUpdateFormData]);

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

    useEffect(() => {
        return () => {
            if (createImagePreview) {
                URL.revokeObjectURL(createImagePreview);
            }
        };
    }, [createImagePreview]);

    useEffect(() => {
        return () => {
            if (updateImagePreview) {
                URL.revokeObjectURL(updateImagePreview);
            }
        };
    }, [updateImagePreview]);

    const handleUpdateClick = (testimonial: Testimonial) => {
        setSelectedTestimonial(testimonial);
        setUpdateImagePreview(null);
    };

    const handleDeleteClick = (testimonial: Testimonial) => {
        setTestimonialToDelete(testimonial);
        setIsDeleteModalOpen(true);
    };

    const handleRestoreClick = (testimonial: Testimonial) => {
        setTestimonialToRestore(testimonial);
        setIsRestoreModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (testimonialToDelete) {
            router.delete(route('testimonials.destroy', testimonialToDelete.id), {
            onSuccess: () => {
                setIsDeleteModalOpen(false);
                setTestimonialToDelete(null);
                setToastMessage('Testimonial deleted successfully!');
                setToastType('success');
                setShowToast(true);
            },
            onError: (errors) => {
                console.error('Delete failed:', errors);
                setToastMessage('Failed to delete testimonial.');
                setToastType('error');
                setShowToast(true);
            },
            });
        }
    };

    const handleConfirmRestore = () => {
        if (testimonialToRestore) {
            router.post(
            route('testimonials.restore', testimonialToRestore.id),
            {},
            {
                onSuccess: () => {
                setIsRestoreModalOpen(false);
                setTestimonialToRestore(null);
                setToastMessage('Testimonial restored successfully!');
                setToastType('success');
                setShowToast(true);
                },
                onError: (errors) => {
                console.error('Restore failed:', errors);
                setToastMessage('Failed to restore testimonial.');
                setToastType('error');
                setShowToast(true);
                },
            }
            );
        }
    };

    const handleUpdateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedTestimonial) {
            // Use POST with method spoofing instead of PUT for file uploads
            postUpdate(route('testimonials.update', selectedTestimonial.id), {
            forceFormData: true,
            onSuccess: () => {
                setIsUpdateModalOpen(false);
                setSelectedTestimonial(null);
                resetUpdateForm();
                setUpdateImagePreview(null);
                setToastMessage('Testimonial updated successfully!');
                setToastType('success');
                setShowToast(true);
            },
            onError: (errors) => {
                console.error('Update failed:', errors);
                setToastMessage('Failed to update testimonial.');
                setToastType('error');
                setShowToast(true);
            },
            });
        }
    };

    const handleCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('testimonials.store'), {
            onSuccess: () => {
            setIsCreateModalOpen(false);
            resetCreateForm();
            setCreateImagePreview(null);
            setToastMessage('Testimonial added successfully!');
            setToastType('success');
            setShowToast(true);
            },
            onError: (errors) => {
            console.error('Create failed:', errors);
            setToastMessage('Failed to add testimonial.');
            setToastType('error');
            setShowToast(true);
            },
        });
    };

   const handleImportSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        postImport(route('testimonials.import'), {
            onSuccess: () => {
            setIsImportModalOpen(false);
            resetImportForm();
            setToastMessage("Testimonials imported successfully!");
            setToastType("success");
            setShowToast(true);
            },
            onError: (errors) => {
            console.error("Import failed:", errors);
            setToastMessage("Failed to import testimonials.");
            setToastType("error");
            setShowToast(true);
            },
        });
    };

    const handleBulkDelete = () => {
        const selectedIds = Object.keys(rowSelection).map(id => testimonials[parseInt(id)].id);
        if (selectedIds.length > 0) {
            setIsBulkDeleteModalOpen(true);
        }
    };

    const handleConfirmBulkDelete = () => {
        const selectedIds = Object.keys(rowSelection).map(
            (id) => testimonials[parseInt(id)].id
        );

        router.post(
            route('testimonials.bulk-delete'),
            { ids: selectedIds },
            {
            onSuccess: () => {
                setIsBulkDeleteModalOpen(false);
                setRowSelection({});
                setToastMessage('Selected testimonials deleted successfully!');
                setToastType('success');
                setShowToast(true);
            },
            onError: (errors) => {
                console.error('Bulk delete failed:', errors);
                setToastMessage('Failed to delete selected testimonials.');
                setToastType('error');
                setShowToast(true);
            },
            }
        );
    };

    const handleRestoreAllClick = () => {
        setIsRestoreAllModalOpen(true);
    };

    const handleConfirmRestoreAll = () => {
        router.post(
            route('testimonials.restoreAll'),
            {},
            {
            onSuccess: () => {
                setIsRestoreAllModalOpen(false);
                setToastMessage('All testimonials restored successfully!');
                setToastType('success');
                setShowToast(true);
            },
            onError: (errors) => {
                console.error('Restore all failed:', errors);
                setToastMessage('Failed to restore all testimonials.');
                setToastType('error');
                setShowToast(true);
            },
            }
        );
    };

    const handleImageSelect = (file: File | null, mode: 'create' | 'update') => {
        if (file) {
            setCropperImageFile(file);
            setCropperMode(mode);
            setIsCropperOpen(true);
        }
    };

    const handleCropComplete = (croppedImageFile: File) => {
        if (cropperMode === 'create') {
            setCreateFormData('testimonial_image', croppedImageFile);
            if (createImagePreview) URL.revokeObjectURL(createImagePreview);
            setCreateImagePreview(URL.createObjectURL(croppedImageFile));
        } else {
            setUpdateFormData('testimonial_image', croppedImageFile);
            if (updateImagePreview) URL.revokeObjectURL(updateImagePreview);
            setUpdateImagePreview(URL.createObjectURL(croppedImageFile));
        }
        setIsCropperOpen(false);
        setCropperImageFile(null);
    };

    const handleCropperClose = () => {
        setIsCropperOpen(false);
        setCropperImageFile(null);
    };

    const hasSoftDeleted = testimonials.some(n => n.deleted_at !== null);
    const columns = createColumns(handleUpdateClick, handleDeleteClick, handleRestoreClick);

    return (
        <AppLayout breadcrumbs={breadcrumbs} user={auth.user}>
            <Head title="Testimonials" />
            <div className="w-full px-6 mx-auto py-10">
                {showToast && (
                    <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg p-4 shadow-lg text-white animate-in fade-in slide-in-from-top-5 ${toastType === 'success' ? 'bg-black text-white dark:text-black dark:bg-white' : 'bg-red-500'}`}>
                        {toastType === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                        <span>{toastMessage}</span>
                    </div>
                )}
                <div className="mb-4">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Manage Your Testimonials</h2>
                    <p className="text-sm max-w-4xl sm:text-base text-gray-600 mb-4 dark:text-gray-300">
                        This page is where you manage your testimonials. The data you see here comes directly from the testimonial form on your user pages.
                    </p>

                    <div className="flex flex-col sm:flex-row sm:flex-wrap justify-end gap-2 w-full">
                        {Object.keys(rowSelection).length > 0 && (
                            <Button variant="destructive" onClick={handleBulkDelete} className="w-full sm:w-auto flex items-center justify-center whitespace-nowrap">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Selected ({Object.keys(rowSelection).length})
                            </Button>
                        )}

                        <Button onClick={() => setIsCreateModalOpen(true)} className="w-full sm:w-auto flex items-center justify-center whitespace-nowrap">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Testimonial
                        </Button>

                        {hasSoftDeleted && (
                            <Button variant="outline" onClick={handleRestoreAllClick} className="w-full sm:w-auto flex items-center justify-center whitespace-nowrap">
                                <Undo2 className="mr-2 h-4 w-4" />
                                Restore All
                            </Button>
                        )}

                        <Button variant="outline" onClick={() => window.location.href = route("testimonials.export")} className="w-full sm:w-auto flex items-center justify-center whitespace-nowrap">
                            <Download className="mr-2 h-4 w-4" />
                            Export to Excel
                        </Button>
                        <Button
                        variant="outline"
                        onClick={() => setIsImportModalOpen(true)}
                        className="w-full sm:w-auto flex items-center justify-center whitespace-nowap"
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

            {/* Create Modal */}
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Add New Testimonial</DialogTitle>
                        <DialogDescription>
                            Create a new testimonial record. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCreateSubmit} className="space-y-4">
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="testimonial_image" className="text-right">Image</Label>
                                <div className="col-span-3">
                                    <Input
                                        type="file"
                                        id="testimonial_image"
                                        name="testimonial_image"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0] || null;
                                            handleImageSelect(file, 'create');
                                        }}
                                        className="h-10"
                                    />
                                    {createErrors.testimonial_image && <div className="text-red-500 text-sm mt-1">{createErrors.testimonial_image}</div>}
                                    {createImagePreview && (
                                        <div className="mt-4 flex flex-col space-y-4">
                                            <Label>Image Preview</Label>
                                            <img
                                                src={createImagePreview}
                                                alt="Image Preview"
                                                className="w-24 h-full object-cover rounded-sm shadow-md"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="testimonial_name" className="text-right">Name</Label>
                                <Input
                                    id="testimonial_name"
                                    name="testimonial_name"
                                    className="col-span-3"
                                    value={createFormData.testimonial_name}
                                    onChange={(e) => setCreateFormData('testimonial_name', e.target.value)}
                                />
                                {createErrors.testimonial_name && <div className="col-span-4 text-red-500 text-sm mt-1 text-right">{createErrors.testimonial_name}</div>}
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="testimonial_position" className="text-right">Position</Label>
                                <Input
                                    id="testimonial_position"
                                    name="testimonial_position"
                                    className="col-span-3"
                                    value={createFormData.testimonial_position}
                                    onChange={(e) => setCreateFormData('testimonial_position', e.target.value)}
                                />
                                {createErrors.testimonial_position && <div className="col-span-4 text-red-500 text-sm mt-1 text-right">{createErrors.testimonial_position}</div>}
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="testimonial_feedback" className="text-right">Feedback</Label>
                                <Textarea
                                    id="testimonial_feedback"
                                    name="testimonial_feedback"
                                    className="col-span-3"
                                    value={createFormData.testimonial_feedback}
                                    onChange={(e) => setCreateFormData('testimonial_feedback', e.target.value)}
                                />
                                {createErrors.testimonial_feedback && <div className="col-span-4 text-red-500 text-sm mt-1 text-right">{createErrors.testimonial_feedback}</div>}
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={() => { setIsCreateModalOpen(false); resetCreateForm(); setCreateImagePreview(null); }}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={createProcessing}>
                                {createProcessing ? 'Saving...' : 'Save'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Update Modal */}
            <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Update Testimonial</DialogTitle>
                        <DialogDescription>
                            Update the selected testimonial record. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleUpdateSubmit} className="space-y-4">
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="update_testimonial_image" className="text-right">Image</Label>
                                <div className="col-span-3">
                                    <Input
                                        type="file"
                                        id="update_testimonial_image"
                                        name="testimonial_image"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0] || null;
                                            handleImageSelect(file, 'update');
                                        }}
                                        className="h-10"
                                    />
                                    {updateErrors.testimonial_image && <div className="text-red-500 text-sm mt-1">{updateErrors.testimonial_image}</div>}
                                    <div className="mt-4 flex flex-wrap gap-4">
                                        {selectedTestimonial?.testimonial_image && !updateImagePreview && (
                                            <div className="flex flex-col space-y-2 items-center">
                                                <Label>Current Image</Label>
                                                <img
                                                    src={`/storage/${selectedTestimonial.testimonial_image}`}
                                                    alt="Current Testimonial Image"
                                                    className="w-24 h-full object-cover rounded-md shadow-md"
                                                />
                                            </div>
                                        )}
                                        {updateImagePreview && (
                                            <div className="flex flex-col space-y-4 items-center">
                                                <Label>New Image Preview</Label>
                                                <img
                                                    src={updateImagePreview}
                                                    alt="New Image Preview"
                                                    className="w-24 h-full object-cover rounded-md shadow-md"
                                                />
                                            </div>
                                        )}
                                        {selectedTestimonial?.testimonial_image && updateImagePreview && (
                                            <div className="flex flex-col space-y-4 items-center">
                                                <Label>Current Image</Label>
                                                <img
                                                    src={`/storage/${selectedTestimonial.testimonial_image}`}
                                                    alt="Current Testimonial Image"
                                                    className="w-24 h-full object-cover rounded-md shadow-md"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="update_testimonial_name" className="text-right">Name</Label>
                                <Input
                                    id="update_testimonial_name"
                                    name="testimonial_name"
                                    className="col-span-3"
                                    value={updateFormData.testimonial_name}
                                    onChange={(e) => setUpdateFormData('testimonial_name', e.target.value)}
                                />
                                {updateErrors.testimonial_name && <div className="col-span-4 text-red-500 text-sm mt-1 text-right">{updateErrors.testimonial_name}</div>}
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="update_testimonial_position" className="text-right">Position</Label>
                                <Input
                                    id="update_testimonial_position"
                                    name="testimonial_position"
                                    className="col-span-3"
                                    value={updateFormData.testimonial_position}
                                    onChange={(e) => setUpdateFormData('testimonial_position', e.target.value)}
                                />
                                {updateErrors.testimonial_position && <div className="col-span-4 text-red-500 text-sm mt-1 text-right">{updateErrors.testimonial_position}</div>}
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="update_testimonial_feedback" className="text-right">Feedback</Label>
                                <Textarea
                                    id="update_testimonial_feedback"
                                    name="testimonial_feedback"
                                    className="col-span-3"
                                    value={updateFormData.testimonial_feedback}
                                    onChange={(e) => setUpdateFormData('testimonial_feedback', e.target.value)}
                                />
                                {updateErrors.testimonial_feedback && <div className="col-span-4 text-red-500 text-sm mt-1 text-right">{updateErrors.testimonial_feedback}</div>}
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={() => { setIsUpdateModalOpen(false); setSelectedTestimonial(null); resetUpdateForm(); setUpdateImagePreview(null); }}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={updateProcessing}>
                                {updateProcessing ? 'Saving...' : 'Save'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Modal */}
            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this testimonial from "{testimonialToDelete?.testimonial_name}"? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleConfirmDelete}>
                            Delete
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Bulk Delete Modal */}
            <Dialog open={isBulkDeleteModalOpen} onOpenChange={setIsBulkDeleteModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Bulk Deletion</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete the selected testimonials? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" onClick={() => setIsBulkDeleteModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleConfirmBulkDelete}>
                            Delete Selected
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Restore Modal */}
            <Dialog open={isRestoreModalOpen} onOpenChange={setIsRestoreModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Restoration</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to restore this testimonial from "{testimonialToRestore?.testimonial_name}"?
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" onClick={() => setIsRestoreModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleConfirmRestore}>
                            Restore
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Restore All Modal */}
            <Dialog open={isRestoreAllModalOpen} onOpenChange={setIsRestoreAllModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Restore All</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to restore all testimonials that have been soft-deleted?
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" onClick={() => setIsRestoreAllModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleConfirmRestoreAll}>
                            Restore All
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Import Dialog/Modal */}
            <Dialog open={isImportModalOpen} onOpenChange={setIsImportModalOpen}>
                <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>Import Testimonials</DialogTitle>
                    <DialogDescription>
                    Select an Excel or CSV file to import new testimonials.
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
                        onChange={(e) =>
                            setImportFormData("file", e.target.files?.[0] || null)
                        }
                        className="col-span-3"
                        />
                        {importErrors.file && (
                        <p className="col-span-4 text-sm text-red-500">
                            {importErrors.file}
                        </p>
                        )}
                    </div>
                    </div>
                    <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsImportModalOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={importProcessing || !importFormData.file}
                    >
                        Import
                    </Button>
                    </DialogFooter>
                </form>
                </DialogContent>
            </Dialog>

            {/* Image Cropper */}
            {cropperImageFile && (
                <ImageCropper
                    isOpen={isCropperOpen}
                    onClose={handleCropperClose}
                    onCropComplete={handleCropComplete}
                    imageFile={cropperImageFile}
                    aspectRatio={1} // Square crop, change to desired aspect ratio
                />
            )}
        </AppLayout>
    );
}