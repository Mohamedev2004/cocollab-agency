"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

interface PressHeroProps {
  heading?: string;
  description?: string;
  image?: { src: string; alt: string };
}

const PressHero: React.FC<PressHeroProps> = ({
  heading = "The Art of Inspiring the Media",
  description =
    "Targeted strategy, impactful storytelling, and a ready-to-go media network: we connect your brand with the right voices for press influence that truly matters. Ideal for: product launches, brand storytelling, reputation management, or strengthening your industry presence.",
  image = {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    alt: "Press relations hero image showing media strategy",
  },
}) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    appointment_name: "",
    appointment_phone: "",
    appointment_email: "",
    appointment_message: "",
    appointment_date: "",
  });

  const [showFormModal, setShowFormModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Date & time state
  const [date, setDate] = useState<Date | undefined>(
    data.appointment_date ? new Date(data.appointment_date) : undefined
  );
  const [time, setTime] = useState<string>(
    data.appointment_date
      ? format(new Date(data.appointment_date), "HH:mm")
      : "10:30"
  );
  const [datePopoverOpen, setDatePopoverOpen] = useState(false);

  // Sync date + time to appointment_date
  useEffect(() => {
    if (date && time) {
      const [hours, minutes] = time.split(":").map(Number);
      const newDate = new Date(date);
      newDate.setHours(hours);
      newDate.setMinutes(minutes);
      setData(
        "appointment_date",
        newDate.toISOString().slice(0, 16) // YYYY-MM-DDTHH:mm
      );
    }
  }, [date, time, setData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("appointments.storing"), {
      onSuccess: () => {
        reset();
        setShowFormModal(false);
        setSuccessMessage("Votre rendez-vous a été réservé avec succès !");
        setShowSuccessModal(true);
      },
      preserveScroll: true,
      preserveState: true,
    });
  };

  return (
    <section className="bg-white sm:py-22 py-10 px-4 rounded-2xl">
      <div className="container mx-auto">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* Left Side */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h1 className="my-6 text-pretty font-title text-black text-4xl font-light lg:text-6xl">
              {heading}
            </h1>
            <p className="text-muted-foreground mb-8 max-w-xl lg:text-xl">
              {description}
            </p>

            {/* Form Dialog */}
            <Dialog open={showFormModal} onOpenChange={setShowFormModal}>
              <DialogTrigger asChild>
                <button className="flex items-center justify-center px-6 py-2.5 bg-[var(--color-cocollab)] text-white font-semibold rounded-xl shadow-lg cursor-pointer transition duration-300 ease-in-out transform hover:opacity-90">
                  Consult Us
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    ></path>
                  </svg>
                </button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-lg overflow-visible bg-white text-black [&>button]:text-black [&>button:hover]:text-gray-700">
                <DialogHeader>
                  <DialogTitle className="text-black">Book an Appointment</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="text"
                    className="text-black"
                    placeholder="Name"
                    value={data.appointment_name}
                    onChange={(e) =>
                      setData("appointment_name", e.target.value)
                    }
                    required
                  />
                  {errors.appointment_name && (
                    <p className="text-red-500">{errors.appointment_name}</p>
                  )}

                  <Input
                    type="tel"
                    className="text-black"
                    placeholder="Phone (10 digits)"
                    value={data.appointment_phone}
                    onChange={(e) =>
                      setData(
                        "appointment_phone",
                        e.target.value.replace(/\D/g, "").slice(0, 10)
                      )
                    }
                    maxLength={10}
                    required
                  />
                  {errors.appointment_phone && (
                    <p className="text-red-500">{errors.appointment_phone}</p>
                  )}

                  <Input
                    type="email"
                    className="text-black"
                    placeholder="Email"
                    value={data.appointment_email}
                    onChange={(e) =>
                      setData("appointment_email", e.target.value.toLowerCase())
                    }
                  />
                  {errors.appointment_email && (
                    <p className="text-red-500">{errors.appointment_email}</p>
                  )}

                  <Textarea
                    placeholder="Message (optional)"
                    value={data.appointment_message}
                    onChange={(e) =>
                      setData("appointment_message", e.target.value)
                    }
                    className="resize-none max-h-32 text-black !bg-white "
                  />

                  {/* Date + Time */}
                  <div className="flex gap-2">
                    {/* Date Popover */}
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium text-black">Date</label>
                      <Popover
                        open={datePopoverOpen}
                        onOpenChange={setDatePopoverOpen}
                      >
                        <PopoverTrigger asChild>
                          <Button
                          variant={"outline"}
                            className="w-32 justify-between font-normal border border-gray-300 text-black !bg-white"
                          >
                            {date ? format(date, "dd/MM/yyyy") : "Select date"}
                            <CalendarIcon className="w-4 h-4 ml-1" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-0 pointer-events-auto"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(d) => {
                              setDate(d || undefined);
                              setDatePopoverOpen(false);
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Time */}
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium text-black">Time</label>
                      <Input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-[120px] text-black"
                        required
                      />
                    </div>
                  </div>
                  {errors.appointment_date && (
                    <p className="text-red-500">{errors.appointment_date}</p>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-[var(--color-cocollab)] text-white hover:bg-[var(--color-cocollab)]/80 cursor-pointer"
                    disabled={processing}
                  >
                    {processing ? "Saving..." : "Save Appointment"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Right Side Image */}
          {image && (
            <img
              loading="lazy"
              src={image.src}
              alt={image.alt}
              className="max-h-126 w-full rounded-md object-cover"
            />
          )}
        </div>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="bg-[var(--color-cocollab)] text-center">
          <DialogHeader>
            <DialogTitle className="text-white text-xl font-bold">
              Rendez-vous enregistré !
            </DialogTitle>
          </DialogHeader>
          <p className="text-white text-lg">{successMessage}</p>
          <DialogFooter className="flex justify-center">
            <Button
              onClick={() => setShowSuccessModal(false)}
              className="bg-white font-semibold text-[var(--color-cocollab)] hover:bg-[var(--color-cocollab)] hover:text-white"
            >
              Terminer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PressHero;
