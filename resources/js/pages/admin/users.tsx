"use client";

import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, useForm, router } from "@inertiajs/react";
import { createColumns, User } from "@/components/admin/users/columns";
import { DataTable } from "@/components/admin/users/data-table";
import { useState, useEffect } from "react";
import {
  CheckCircle2,
  Plus,
  XCircle,
  Trash2,
  Download,
  Upload,
  Undo2,
} from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Users",
    href: "/users",
  },
];
interface Props {
  users: User[];
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

export default function Users({ users, flash, auth }: Props) {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const {
    data: createFormData,
    setData: setCreateFormData,
    post,
    processing: createProcessing,
    errors: createErrors,
    reset: resetCreateForm,
  } = useForm({
    name: "",
    email: "",
    password: "",
    role: "",
    status: "",
  });
  const {
    data: updateFormData,
    setData: setUpdateFormData,
    put,
    processing: updateProcessing,
    errors: updateErrors,
    reset: resetUpdateForm,
  } = useForm({
    name: "",
    email: "",
    password: "",
    role: "",
    status: "",
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
  const [userToRestore, setUserToRestore] = useState<User | null>(null);
  const [isRestoreAllModalOpen, setIsRestoreAllModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
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
    if (selectedUser) {
      setUpdateFormData({
        name: selectedUser.name,
        email: selectedUser.email,
        password: selectedUser.password,
        role: selectedUser.role,

        status: selectedUser.status,
      });
      setIsUpdateModalOpen(true);
    }
  }, [selectedUser, setUpdateFormData]);
  useEffect(() => {
    if (flash?.success) {
      setToastMessage(flash.success);
      setToastType("success");
      setShowToast(true);
    } else if (flash?.error) {
      setToastMessage(flash.error);
      setToastType("error");
      setShowToast(true);
    }
  }, [flash]);
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);
  const handleUpdateClick = (user: User) => {
    setSelectedUser(user);
  };
  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };
  const handleRestoreClick = (user: User) => {
    setUserToRestore(user);
    setIsRestoreModalOpen(true);
  };

  // New handler for setting user status to Active
  const handleSetActive = (user: User) => {
    router.post(route('users.setActive', user.id),
      {},
      {
        onSuccess: () => {
          setToastMessage("User status set to Active!");
          setToastType("success");
          setShowToast(true);
        },
        onError: (errors) => {
          console.error("Failed to set user active:", errors);
          setToastMessage("Failed to set user active.");
          setToastType("error");
          setShowToast(true);
        },
      },
    );
  };

  // New handler for setting user status to Inactive
  const handleSetInactive = (user: User) => {
    router.post(route('users.setInactive', user.id),
      {},
      {
        onSuccess: () => {
          setToastMessage("User status set to Inactive!");
          setToastType("success");
          setShowToast(true);
        },
        onError: (errors) => {
          console.error("Failed to set user inactive:", errors);
          setToastMessage("Failed to set user inactive.");
          setToastType("error");
          setShowToast(true);
        },
      },
    );
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      router.delete(route("users.destroy", userToDelete.id), {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setUserToDelete(null);

          setToastMessage("User deleted successfully!");
          setToastType("success");
          setShowToast(true);
        },
        onError: (errors) => {
          console.error("Delete failed:", errors);
          setToastMessage("Failed to delete user.");
          setToastType("error");
          setShowToast(true);
        },
      });
    }
  };

  const handleConfirmRestore = () => {
    if (userToRestore) {
      router.post(
        route("users.restore", userToRestore.id),
        {},
        {
          onSuccess: () => {
            setIsRestoreModalOpen(false);
            setUserToRestore(null);

            setToastMessage("User restored successfully!");
            setToastType("success");
            setShowToast(true);
          },
          onError: (errors) => {
            console.error("Restore failed:", errors);
            setToastMessage("Failed to restore user.");
            setToastType("error");
            setShowToast(true);
          },
        },
      );
    }
  };

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser) {
      put(route("users.update", selectedUser.id), {
        onSuccess: () => {
          setIsUpdateModalOpen(false);
          setSelectedUser(null);
          resetUpdateForm();

          setToastMessage("User updated successfully!");
          setToastType("success");
          setShowToast(true);
        },
        onError: (errors) => {
          console.error("Update failed:", errors);
          setToastMessage("Failed to update user.");
          setToastType("error");
          setShowToast(true);
        },
      });
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("users.store"), {
      onSuccess: () => {
        setIsCreateModalOpen(false);
        resetCreateForm();
        setToastMessage("User added successfully!");
        setToastType("success");
        setShowToast(true);
      },
      onError: (errors) => {
        console.error("Create failed:", errors);
        setToastMessage("Failed to add user.");
        setToastType("error");
        setShowToast(true);
      },
    });
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    postImport(route("users.import"), {
      onSuccess: () => {
        setIsImportModalOpen(false);
        resetImportForm();
        setToastMessage("Users imported successfully!");
        setToastType("success");
        setShowToast(true);
      },
      onError: (errors) => {
        console.error("Import failed:", errors);
        setToastMessage("Failed to import users.");
        setToastType("error");
        setShowToast(true);
      },
    });
  };

  const handleBulkDelete = () => {
    const selectedIds = Object.keys(rowSelection).map(
      (id) => users[parseInt(id)].id,
    );
    if (selectedIds.length > 0) {
      setIsBulkDeleteModalOpen(true);
    }
  };

  const handleConfirmBulkDelete = () => {
    const selectedIds = Object.keys(rowSelection).map(
      (id) => users[parseInt(id)].id,
    );

    router.post(
      route("users.bulk-delete"),
      { ids: selectedIds },
      {
        onSuccess: () => {
          setIsBulkDeleteModalOpen(false);
          setRowSelection({});
          setToastMessage("Selected users deleted successfully!");
          setToastType("success");
          setShowToast(true);
        },
        onError: (errors) => {
          console.error("Bulk delete failed:", errors);
          setToastMessage("Failed to delete selected users.");
          setToastType("error");
          setShowToast(true);
        },
      },
    );
  };


  const handleRestoreAllClick = () => {
    setIsRestoreAllModalOpen(true);
  };

  const handleConfirmRestoreAll = () => {
    router.post(
      route("users.restoreAll"),
      {},
      {
        onSuccess: () => {
          setIsRestoreAllModalOpen(false);
          setToastMessage("All users restored successfully!");
          setToastType("success");
          setShowToast(true);
        },
        onError: (errors) => {
          console.error("Restore all failed:", errors);
          setToastMessage("Failed to restore all users.");
          setToastType("error");
          setShowToast(true);
        },
      },
    );
  };

  const hasSoftDeleted = users.some((n) => n.deleted_at !== null);

  const columns = createColumns(
    handleUpdateClick,
    handleDeleteClick,
    handleRestoreClick,
    handleSetActive,
    handleSetInactive,
  );
  return (
    <AppLayout breadcrumbs={breadcrumbs} user={auth.user}>
      <Head title="Users" />
      <div className="w-full px-6 mx-auto py-10">
        {showToast && (
          <div
            className={`fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg p-4 shadow-lg text-white animate-in fade-in slide-in-from-top-5 ${
              toastType === "success"
                ? "bg-black text-white dark:text-black dark:bg-white"
                : "bg-red-500"
            }`}
          >
            {toastType === "success" ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <XCircle className="w-5 h-5" />
            )}
            <span>{toastMessage}</span>
          </div>
        )}

        <div className="mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            Manage Your Users
          </h2>
          <p className="text-sm max-w-4xl sm:text-base text-gray-600 mb-4 dark:text-gray-300">
            Manage your users efficiently. Keep this list up to date to maintain
            control over user roles and statuses, and ensure that new features
            or updates are properly communicated.
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
              Add User
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
              onClick={() => (window.location.href = route("users.export"))}
              className="w-full sm:w-auto flex items-center justify-center whitespace-nowrap"
            >
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
          data={users}
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
        />
      </div>

      {/* Create user Dialog/Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new User record.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateSubmit}>
            <div className="grid gap-4 py-4">
              <div
                className="grid grid-cols-4 items-center 
 gap-4"
              >
                <Label htmlFor="name_create" className="text-right">
                  Name
                </Label>
                <Input
                  id="name_create"
                  value={createFormData.name}
                  onChange={(e) => setCreateFormData("name", e.target.value)}
                  className="col-span-3"
                />
                {createErrors.name && (
                  <p className="col-span-4 text-sm text-red-500">
                    {createErrors.name}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email_create" className="text-right">
                  Email
                </Label>
                <Input
                  id="email_create"
                  value={createFormData.email}
                  onChange={(e) => setCreateFormData("email", e.target.value)}
                  className="col-span-3"
                />
                {createErrors.email && (
                  <p className="col-span-4 text-sm text-red-500">
                    {createErrors.email}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password_create" className="text-right">
                  Password
                </Label>
                <Input
                  id="password_create"
                  type="password"
                  value={createFormData.password}
                  onChange={(e) =>
                    setCreateFormData("password", e.target.value)
                  }
                  className="col-span-3"
                />

                {createErrors.password && (
                  <p className="col-span-4 text-sm text-red-500">
                    {createErrors.password}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role_create" className="text-right">
                  Role
                </Label>

                <Select
                  onValueChange={(value) => setCreateFormData("role", value)}
                  value={createFormData.role}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>

                    <SelectItem value="brand">Brand</SelectItem>
                    <SelectItem value="influencer">Influencer</SelectItem>
                  </SelectContent>
                </Select>
                {createErrors.role && (
                  <p className="col-span-4 text-sm text-red-500">
                    {createErrors.role}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status_create" className="text-right">
                  Status
                </Label>
                <Select
                  onValueChange={(value) => setCreateFormData("status", value)}
                  value={createFormData.status}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>

                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>

                {createErrors.status && (
                  <p className="col-span-4 text-sm text-red-500">
                    {createErrors.status}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={createProcessing}>
                Save User
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Update user Dialog/Modal */}
      <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>Update user</DialogTitle>
            <DialogDescription>
              Make changes to the user's profile here. Click save when you're
              done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateSubmit}>
            <div className="grid gap-4 py-4">
              {/* Name */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name_update" className="text-right">
                  Name
                </Label>

                <Input
                  id="name_update"
                  value={updateFormData.name}
                  onChange={(e) => setUpdateFormData("name", e.target.value)}
                  className="col-span-3"
                />

                {updateErrors.name && (
                  <p className="col-span-4 text-sm text-red-500">
                    {updateErrors.name}
                  </p>
                )}
              </div>
              {/* Email */}

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email_update" className="text-right">
                  Email
                </Label>
                <Input
                  id="email_update"
                  value={updateFormData.email}
                  onChange={(e) => setUpdateFormData("email", e.target.value)}
                  className="col-span-3"
                />
                {updateErrors.email && (
                  <p className="col-span-4 text-sm text-red-500">
                    {updateErrors.email}
                  </p>
                )}
              </div>
              {/* Password (optional) */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password_update" className="text-right">
                  Password
                </Label>
                <Input
                  id="password_update"
                  type="password"
                  value={updateFormData.password || ""}
                  onChange={(e) =>
                    setUpdateFormData("password", e.target.value)
                  }
                  placeholder="Leave blank to keep current password"
                  className="col-span-3"
                />
                {updateErrors.password && (
                  <p className="col-span-4 text-sm text-red-500">
                    {updateErrors.password}
                  </p>
                )}
              </div>
              {/* Role */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role_update" className="text-right">
                  Role
                </Label>
                <Select
                  onValueChange={(value) => setUpdateFormData("role", value)}
                  value={updateFormData.role}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="brand">Brand</SelectItem>

                    <SelectItem value="influencer">Influencer</SelectItem>
                  </SelectContent>
                </Select>

                {updateErrors.role && (
                  <p className="col-span-4 text-sm text-red-500">
                    {updateErrors.role}
                  </p>
                )}
              </div>
              {/* Status */}

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status_update" className="text-right">
                  Status
                </Label>
                <Select
                  onValueChange={(value) => setUpdateFormData("status", value)}
                  value={updateFormData.status}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>

                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>

                {updateErrors.status && (
                  <p className="col-span-4 text-sm text-red-500">
                    {updateErrors.status}
                  </p>
                )}
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
              Are you sure you want to delete the user:{" "}
              <span className="font-bold">{userToDelete?.email}</span>? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Confirm Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bulk Delete Dialog */}
      <Dialog
        open={isBulkDeleteModalOpen}
        onOpenChange={setIsBulkDeleteModalOpen}
      >
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>Confirm Bulk Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the selected users? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsBulkDeleteModalOpen(false)}
            >
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
              Are you sure you want to restore the user:{" "}
              <span className="font-bold">{userToRestore?.email}</span>?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsRestoreModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleConfirmRestore}>Confirm Restore</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Restore All Confirmation Dialog/Modal */}
      <Dialog
        open={isRestoreAllModalOpen}
        onOpenChange={setIsRestoreAllModalOpen}
      >
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>Confirm Restore All</DialogTitle>
            <DialogDescription>
              Are you sure you want to restore all soft-deleted users? This
              action will bring back all deleted entries.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsRestoreAllModalOpen(false)}
            >
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
            <DialogTitle>Import Users</DialogTitle>
            <DialogDescription>
              Select an Excel or CSV file to import new users.
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
    </AppLayout>
  );
}
