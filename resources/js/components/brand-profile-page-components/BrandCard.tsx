"use client";

import React, { useState } from "react";
import {
  BadgeCheck,
  Send,
  Bookmark,
  Instagram,
  Facebook,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface BrandCardProps {
  name: string;
  image: string;
  stats: {
    campaigns: string;
    followers: string;
    budget: string;
  };
}

// Default sample data for a brand
const defaultBrand: BrandCardProps = {
  name: "Coca-Cola",
  image: "/assets/brands/1.jpg",
  stats: {
    campaigns: "12",
    followers: "1.2M",
    budget: "$50K",
  },
};

const BrandCard: React.FC<Partial<BrandCardProps>> = (props) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const data: BrandCardProps = {
    ...defaultBrand,
    ...props,
    stats: {
      ...defaultBrand.stats,
      ...props.stats,
    },
  };

  const handleSend = () => {
    if (!message.trim()) return;
    console.log("Message sent to brand:", message); // Replace with API call
    setMessage("");
    setOpen(false);
  };

  return (
    <aside className="bg-white rounded-3xl shadow-lg p-4 w-full lg:w-80 lg:sticky top-24">
      {/* Profile Image with Bookmark */}
      <div className="relative">
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-auto rounded-2xl object-cover"
        />
        <button
          className="absolute top-4 right-4 bg-white backdrop-blur-md cursor-pointer 
            rounded-full p-2 shadow-md hover:opacity-85 transition"
        >
          <Bookmark size={24} className="text-black" />
        </button>
      </div>

      {/* Name and Social Icons */}
      <div className="flex flex-col mt-4">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-semibold text-gray-900">{data.name}</h2>
          <BadgeCheck
            size={24}
            className="text-white fill-[var(--color-cocollab)]"
          />
        </div>
        <div className="flex justify-around space-x-3 mt-8">
          <a
            href="#"
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
          >
            <Instagram size={24} />
          </a>
          <a
            href="#"
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
          >
            <Facebook size={24} />
          </a>
          <a
            href="#"
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
          >
            <X size={24} />
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-around items-center my-6 border-y border-gray-200 py-4">
        {/* Campaigns */}
        <div className="flex flex-col items-center">
          <span className="font-semibold">{data.stats.campaigns}</span>
          <span className="text-xs text-gray-500 mt-1">Campaigns</span>
        </div>

        {/* Followers */}
        <div className="flex flex-col items-center">
          <span className="font-semibold">{data.stats.followers}</span>
          <span className="text-xs text-gray-500 mt-1">Followers</span>
        </div>

        {/* Budget */}
        <div className="flex flex-col items-center">
          <span className="font-semibold">{data.stats.budget}</span>
          <span className="text-xs text-gray-500 mt-1">Budget</span>
        </div>
      </div>

      {/* CTA with modal */}
      <Button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 justify-center w-full py-2 px-6 
          bg-[var(--color-cocollab)] text-white rounded-xl font-semibold cursor-pointer
          shadow hover:bg-[var(--color-cocollab)]/90 transition"
      >
        <Send size={18} />
        Send Message
      </Button>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send a Message to {data.name}</DialogTitle>
          </DialogHeader>
          <Textarea
            placeholder="Write your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="mt-2"
          />
          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSend}
              className="bg-[var(--color-cocollab)] hover:bg-[var(--color-cocollab)]/90"
            >
              Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </aside>
  );
};

export default BrandCard;
