"use client";

import React, { useState } from "react";
import {
  Star,
  BadgeCheck,
  Send,
  Bookmark,
  Instagram,
  Facebook,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";

interface InfluencerCardProps {
  name: string;
  image: string;
  stats: {
    rating: string;
    followers: string;
    posts: string;
  };
}

// Default sample data
const defaultInfluencer: InfluencerCardProps = {
  name: "Steve Rogers",
  image: "/assets/influencers/3.jpg",
  stats: {
    rating: "4.9",
    followers: "80K",
    posts: "57K",
  },
};

const InfluencerCard: React.FC<Partial<InfluencerCardProps>> = (props) => {
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [message, setMessage] = useState("");

  const data: InfluencerCardProps = {
    ...defaultInfluencer,
    ...props,
    stats: {
      ...defaultInfluencer.stats,
      ...props.stats,
    },
  };

  const handleSend = () => {
    if (!message.trim()) return;
    console.log("Message sent:", message);
    setMessage("");
    setShowMessageBox(false);
  };

  return (
    <aside className="bg-white rounded-3xl shadow-lg p-4 w-full lg:w-80 lg:sticky top-24">
      {/* Profile Image with Bookmark */}
      <div className="relative">
        <img
          loading="lazy"
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
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 text-black transition"
          >
            <Instagram size={24} />
          </a>
          <a
            href="#"
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 text-black transition"
          >
            <Facebook size={24} />
          </a>
          <a
            href="#"
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 text-black transition"
          >
            <X size={24} />
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-around items-center my-6 border-y border-gray-200 py-4">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1">
            <Star size={18} className="text-yellow-500 fill-yellow-500" />
            <span className="font-semibold text-black">{data.stats.rating}</span>
          </div>
          <span className="text-xs text-gray-500 mt-1">Stars</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-semibold text-black">{data.stats.followers}</span>
          <span className="text-xs text-gray-500 mt-1">Followers</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-semibold text-black">{data.stats.posts}</span>
          <span className="text-xs text-gray-500 mt-1">Posts</span>
        </div>
      </div>

      {/* CTA */}
      {!showMessageBox && (
        <Button
          onClick={() => setShowMessageBox(true)}
          className="flex items-center gap-2 justify-center w-full py-2 px-6 
            bg-[var(--color-cocollab)] text-white rounded-xl font-semibold cursor-pointer
            shadow hover:bg-[var(--color-cocollab)]/90 transition"
        >
          <Send size={18} />
          Send Message
        </Button>
      )}

      {/* Animated Message Box */}
      <AnimatePresence>
        {showMessageBox && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="mt-4 flex flex-col gap-3"
          >
            <Textarea
              placeholder={`Write a message to ${data.name}...`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="!bg-white text-black border border-gray-300"
            />
            <div className="flex gap-2 justify-end">
              <Button variant='outline' onClick={() => setShowMessageBox(false)} className="">
                Cancel
              </Button>
              <Button
                onClick={handleSend}
                className="bg-[var(--color-cocollab)] hover:bg-[var(--color-cocollab)]/90 text-white"
              >
                Send
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
};

export default InfluencerCard;
