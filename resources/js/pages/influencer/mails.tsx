import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: route('influencer.dashboard') },
  { title: 'Mails', href: '/dashboard/mails' },
];

interface Mail {
  id: number;
  from: string;
  subject: string;
  preview: string;
  body: string;
}

interface MailsProps {
  auth: {
    user: { id: number; role: 'influencer' | 'brand'; name: string; status?: 'Active' | 'Inactive' };
  };
}

const mails: Mail[] = [
  { id: 1, from: 'John Doe', subject: 'Welcome to our platform', preview: 'This is your first mail. Explore our platform and enjoy the features.', body: `Hi there,\n\nWelcome to our platform! We are excited to have you on board. Take your time to explore all the features we offer and make the most of your experience.\n\nBest regards,\nTeam` },
  { id: 2, from: 'Jane Smith', subject: 'Meeting Reminder', preview: 'Don’t forget about the meeting tomorrow at 10 AM.', body: `Hello,\n\nThis is a reminder about the meeting scheduled for tomorrow at 10 AM. Please prepare the required documents beforehand.\n\nThanks,\nJane` },
  { id: 3, from: 'Support Team', subject: 'Account Update', preview: 'Your account has been updated successfully.', body: `Dear User,\n\nYour account settings have been successfully updated. Please review the changes and ensure everything is correct.\n\nBest,\nSupport Team` },
  { id: 4, from: 'Newsletter', subject: 'Monthly Updates', preview: 'Check out our monthly updates and news.', body: `Hello Subscriber,\n\nHere are the updates and news for this month. We hope you enjoy reading it and find it informative.\n\nBest regards,\nNewsletter Team` },
  { id: 5, from: 'Marketing', subject: 'Special Offer', preview: 'Exclusive special offer just for you.', body: `Hi,\n\nWe are excited to present you with an exclusive offer available only for a limited time. Don’t miss out!\n\nCheers,\nMarketing Team` },
  { id: 6, from: 'HR Department', subject: 'Policy Update', preview: 'Please read the latest policy updates.', body: `Dear Employee,\n\nPlease review the latest updates to our company policies. It’s important to stay informed.\n\nRegards,\nHR Department` },
  { id: 7, from: 'Admin', subject: 'System Maintenance', preview: 'Scheduled system maintenance on Saturday.', body: `Hello,\n\nOur systems will undergo scheduled maintenance this Saturday from 1 AM to 5 AM. Please save your work accordingly.\n\nThank you,\nAdmin Team` },
  { id: 8, from: 'Event Team', subject: 'Upcoming Event', preview: 'Join our upcoming event next week.', body: `Hi,\n\nWe are thrilled to invite you to our upcoming event next week. Make sure to register and be part of the fun!\n\nBest,\nEvent Team` }
];

export default function MailsPage({ auth }: MailsProps) {
  const { user } = auth;
  const [selectedMail, setSelectedMail] = useState<Mail | null>(mails[0] || null);
  const [modalOpen, setModalOpen] = useState(false);

  if (user.status === 'Inactive') {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4 text-lg font-medium text-white">
        <p className='text-center text-wrap'>Your account is inactive. Please contact support.</p>
        <Link href={route('influencer.home')}>
          <Button variant="default"> <span><ArrowLeft /></span> Back</Button>
        </Link>
      </div>
    );
  }

  const handleMailClick = (mail: Mail) => {
    if (window.innerWidth < 768) {
      setSelectedMail(mail);
      setModalOpen(true);
    } else {
      setSelectedMail(mail);
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs} user={user}>
      <Head title="Mails" />
      <div className="flex h-full flex-1 flex-col">
        <div className="relative flex-1 flex rounded-xl">
          <div className="flex w-full flex-col md:flex-row h-full">
            
            {/* Mail List */}
            <div className="md:w-1/3 lg:w-1/4 border-r hide-scrollbar flex flex-col overflow-y-auto h-[calc(100vh-8rem)]">
                <div className="sticky top-0 z-10 bg-background p-4 border-b border-muted/30">
                    <Input placeholder="Search mail..." />
                </div>
                <div className="flex-1 p-4 space-y-2">
                    {mails.map((mail) => (
                    <Card
                        key={mail.id}
                        className={`cursor-pointer py-0 gap-2 hover:bg-muted/50 ${
                        selectedMail?.id === mail.id ? 'bg-muted/30' : ''
                        }`}
                        onClick={() => handleMailClick(mail)}
                    >
                        <CardHeader className="p-3">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(mail.from)}&background=random`}
                            alt={mail.from}
                            className="w-8 h-8 rounded-full"
                            />
                            {mail.from}
                        </CardTitle>
                        </CardHeader>
                        <CardContent className="p-3 pt-0">
                        <p className="text-sm font-semibold">{mail.subject}</p>
                        <p className="text-xs text-muted-foreground truncate">
                            {mail.preview}
                        </p>
                        </CardContent>
                    </Card>
                    ))}
                </div>
            </div>

            {/* Mail Preview (sticky on desktop) */}
            {selectedMail && (
            <div className="hidden md:flex flex-1 overflow-y-auto h-[calc(100vh-8rem)]">
                <div className="sticky top-0 p-6">
                <h1 className="text-xl font-semibold mb-2">{selectedMail.subject}</h1>
                <div className="flex items-center gap-2 mb-4">
                    <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(selectedMail.from)}&background=random`}
                    alt={selectedMail.from}
                    className="w-8 h-8 rounded-full"
                    />
                    <p className="text-sm text-muted-foreground">From: {selectedMail.from}</p>
                </div>
                <div className="prose text-sm whitespace-pre-line">
                    {selectedMail.body}
                </div>
                </div>
            </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal for mobile */}
      {selectedMail && (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogContent className="sm:max-w-lg">
            <DialogHeader>
                <DialogTitle>{selectedMail.subject}</DialogTitle>
                <div className="flex items-center gap-2 mt-1">
                <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(selectedMail.from)}&background=random`}
                    alt={selectedMail.from}
                    className="w-8 h-8 rounded-full"
                />
                <p className="text-sm text-muted-foreground">From: {selectedMail.from}</p>
                </div>
                <DialogClose asChild></DialogClose>
            </DialogHeader>
            <div className="prose text-sm whitespace-pre-line mt-4">
                {selectedMail.body}
            </div>
            </DialogContent>
        </Dialog>
        )}
    </AppLayout>
  );
}
