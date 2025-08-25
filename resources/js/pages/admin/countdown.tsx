'use client';

import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CheckCircle2, ChevronDownIcon, XCircle } from 'lucide-react';

interface CountdownType {
  id?: number;
  current_end_time: string;
  created_at?: string;
}

interface CountdownProps {
  auth: {
    user: {
      role: 'admin' | 'influencer' | 'brand';
      name: string;
    };
  };
  countdown?: CountdownType | null;
  countdowns?: CountdownType[];
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
];

export default function CountdownIndex({ countdown, auth }: CountdownProps) {

  // State for the toast notification
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    countdown ? new Date(countdown.current_end_time) : undefined
  );
  const [selectedTime, setSelectedTime] = useState(
    countdown ? new Date(countdown.current_end_time).toTimeString().slice(0, 8) : '10:30:00'
  );
  const [datePopoverOpen, setDatePopoverOpen] = useState(false);

// Submit countdown
const submit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!selectedDate) return;

  const [hours, minutes, seconds] = selectedTime.split(':');
  const finalDate = new Date(selectedDate);
  finalDate.setHours(Number(hours), Number(minutes), Number(seconds));

  const mysqlDateTime = `${finalDate.getFullYear()}-${String(finalDate.getMonth() + 1).padStart(
    2, '0'
  )}-${String(finalDate.getDate()).padStart(2, '0')} ${String(finalDate.getHours()).padStart(
    2, '0'
  )}:${String(finalDate.getMinutes()).padStart(2, '0')}:${String(finalDate.getSeconds()).padStart(2, '0')}`;

  router.post(route('countdown.createOrUpdate'), { current_end_time: mysqlDateTime }, {
    onSuccess: () => {
      setToastMessage('Countdown saved successfully!');
      setToastType('success');
      setShowToast(true);
      setIsModalOpen(false);
      setTimeout(() => setShowToast(false), 3000);
    },
    onError: () => {
      setToastMessage('Failed to save countdown.');
      setToastType('error');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    },
  });
};

// Delete countdown
const deleteCountdown = () => {
    if (!countdown?.id) return;
    router.delete(route('countdown.destroy', countdown.id), {
        onSuccess: () => {
            setToastMessage('Countdown deleted successfully!');
            setToastType('success');
            setShowToast(true);
            setIsDeleteModalOpen(false);

            setTimeout(() => setShowToast(false), 3000);
        },
        onError: (errors) => {
            setToastMessage('Failed to delete countdown.');
            setToastType('error');
            setShowToast(true);
            console.error(errors);

            setTimeout(() => setShowToast(false), 3000);
        },
    });
};


  return (
    <AppLayout breadcrumbs={breadcrumbs} user={auth.user}>
      <Head title="Countdown" />
      <div className="p-6">
        {showToast && (
            <div
                className={`fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg p-4 shadow-lg text-white animate-in fade-in slide-in-from-top-5 ${
                    toastType === 'success'
                        ? 'bg-black text-white dark:text-black dark:bg-white'
                        : 'bg-red-500'
                }`}
            >
                {toastType === 'success' ? (
                    <CheckCircle2 className="w-5 h-5" />
                ) : (
                    <XCircle className="w-5 h-5" />
                )}
                <span>{toastMessage}</span>
            </div>
        )}
        <h1 className="text-2xl font-bold mb-4">Countdown</h1>

        {/* Create/Update Countdown Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button>{countdown ? 'Update Countdown' : 'Set Countdown'}</Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md sm:mx-auto rounded-lg shadow-lg overflow-visible">
            <DialogHeader>
              <DialogTitle>
                {countdown ? 'Update Countdown End Time' : 'Set Countdown End Time'}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={submit} className="flex flex-col gap-4 mt-2">
              <div className="flex gap-4">
                {/* Date Picker */}
                <div className="flex flex-col gap-2">
                  <Label>Date</Label>
                  <Popover open={datePopoverOpen} onOpenChange={setDatePopoverOpen}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-32 justify-between font-normal">
                        {selectedDate ? selectedDate.toLocaleDateString() : 'Select date'}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0 pointer-events-auto"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          setSelectedDate(date || undefined);
                          setDatePopoverOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Time Picker */}
                <div className="flex flex-col gap-2">
                  <Label>Time</Label>
                  <Input
                    type="time"
                    step="1"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                  />
                </div>
              </div>

              <DialogFooter className="flex justify-between mt-4">
                <Button type="submit">{countdown ? 'Update' : 'Save'}</Button>
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Countdown Button (outside modal) */}
        {countdown && countdown.id && (
          <>
            <Button
              variant="destructive"
              className="mt-4 ml-4"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              Delete Countdown
            </Button>

            {/* Delete Confirmation Modal */}
            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
              <DialogContent className="sm:max-w-sm sm:mx-auto rounded-lg shadow-lg">
                <DialogHeader>
                  <DialogTitle>Confirm Deletion</DialogTitle>
                </DialogHeader>
                <p className="px-6 text-center">
                  Are you sure you want to delete the countdown ending at{' '}
                  <strong>{new Date(countdown.current_end_time).toLocaleString()}</strong>?
                </p>
                <DialogFooter className="flex justify-between mt-4">
                  <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={deleteCountdown}>
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        )}

        {/* Current Countdown Display */}
        {countdown && (
          <p className="mt-4">
            Current countdown ends at:{' '}
            <strong>{new Date(countdown.current_end_time).toLocaleString()}</strong>
          </p>
        )}

        {/* Countdown History Table */}
        {/* {countdowns.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">Countdown History</h2>
            <div className="overflow-x-auto border rounded-lg">
              <table className="min-w-full divide-y divide-gray-500">
                <thead className="bg-gray-50 dark:bg-transparent">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-white">#</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-white">
                      Countdown End
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-white">
                      Created At
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-transparent divide-y divide-gray-500">
                  {countdowns.map((c, index) => (
                    <tr>
                      <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">{index + 1}</td>
                      <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {new Date(c.current_end_time).toLocaleString()}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {c.created_at ? new Date(c.created_at).toLocaleString() : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )} */}
      </div>
    </AppLayout>
  );
}
