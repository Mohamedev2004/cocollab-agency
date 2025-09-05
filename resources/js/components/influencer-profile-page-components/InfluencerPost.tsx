"use client";

import React, { useState } from "react";
import {
  Image,
  Plus,
  Heart,
  Bookmark,
  MoreHorizontal,
  Archive,
  Trash,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface Post {
  id: number;
  image: string;
  caption: string;
  likes: number;
  user: {
    name: string;
    username: string;
    avatar: string;
  };
}

const InfluencerPost: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      image: "/assets/influencers/post1.png",
      caption: "Morning workout vibes 💪🔥 #fitness #motivation",
      likes: 1200,
      user: {
        name: "Sam Guy",
        username: "samguy",
        avatar: "/assets/influencers/3.jpg",
      },
    },
    {
      id: 2,
      image: "/assets/influencers/post3.png",
      caption: "Meal prep Sunday 🍴 #healthyliving",
      likes: 890,
      user: {
        name: "Sam Guy",
        username: "samguy",
        avatar: "/assets/influencers/3.jpg",
      },
    },
    {
      id: 3,
      image: "/assets/influencers/post2.png",
      caption: "Weekend hike 🌲🏞️",
      likes: 560,
      user: {
        name: "Sam Guy",
        username: "samguy",
        avatar: "/assets/influencers/3.jpg",
      },
    },
    {
      id: 4,
      image: "/assets/influencers/post4.png",
      caption: "Morning workout vibes 💪🔥 #fitness #motivation",
      likes: 1200,
      user: {
        name: "Sam Guy",
        username: "samguy",
        avatar: "/assets/influencers/3.jpg",
      },
    },
    {
      id: 5,
      image: "/assets/influencers/post5.png",
      caption: "Meal prep Sunday 🍴 #healthyliving",
      likes: 890,
      user: {
        name: "Sam Guy",
        username: "samguy",
        avatar: "/assets/influencers/3.jpg",
      },
    },
    {
      id: 6,
      image: "/assets/influencers/post6.png",
      caption: "Weekend hike 🌲🏞️",
      likes: 560,
      user: {
        name: "Sam Guy",
        username: "samguy",
        avatar: "/assets/influencers/3.jpg",
      },
    },
  ]);

  const [newCaption, setNewCaption] = useState("");

  const handleCreatePost = () => {
    if (!newCaption.trim()) return;

    const newPost: Post = {
      id: posts.length + 1,
      image: "/assets/influencers/post.png",
      caption: newCaption,
      likes: 0,
      user: {
        name: "Sam Guy",
        username: "samguy",
        avatar: "/assets/influencers/3.jpg",
      },
    };

    setPosts([newPost, ...posts]);
    setNewCaption("");
  };

  const handleDelete = (id: number) => {
    console.log("Deleted post:", id);
    // Later: send to backend delete
  };

  const handleArchive = (id: number) => {
    console.log("Archived post:", id);
    // Later: send to backend archive
  };

  return (
    <div className="w-full space-y-4">
      {/* Create Post */}
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Create Post</h3>
        <div className="flex items-start gap-4">
          <img
            src="/assets/influencers/3.jpg"
            alt="Influencer Avatar"
            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1 space-y-3">
            <textarea
              placeholder="What's on your mind?"
              value={newCaption}
              onChange={(e) => setNewCaption(e.target.value)}
              className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--color-cocollab)] focus:outline-none p-3 text-sm resize-none"
              rows={3}
            />
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border text-sm text-gray-600 hover:bg-gray-100 transition w-full sm:w-auto">
                <Image size={18} />
                Upload Image
              </button>
              <button
                onClick={handleCreatePost}
                className="flex items-center justify-center gap-2 px-5 py-2 bg-[var(--color-cocollab)] text-white text-sm font-semibold rounded-lg hover:opacity-90 transition cursor-pointer w-full sm:w-auto"
              >
                <Plus size={18} />
                Create new Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden w-full"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <img
                  src={post.user.avatar}
                  alt={post.user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">
                    {post.user.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    @{post.user.username}
                  </p>
                </div>
              </div>

              {/* Dropdown Menu */}
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-lg"
                  >
                    <MoreHorizontal size={20} className="text-gray-600" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" side="left" className="w-40">
                  <DropdownMenuItem
                    onClick={() => handleArchive(post.id)}
                    className="cursor-pointer"
                  >
                    <Archive className="mr-2 h-4 w-4" />
                    Archive
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => handleDelete(post.id)}
                    className="cursor-pointer"
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Post Image */}
            <img
              src={post.image}
              alt={post.caption}
              className="w-full h-auto object-cover"
            />

            {/* Actions */}
            <div className="flex items-center justify-between px-4 py-3 text-gray-600">
              <span className="flex items-center text-sm gap-1">
                <Heart
                  size={20}
                  className="cursor-pointer hover:text-black transition"
                />
                {post.likes}
              </span>
              <Bookmark
                size={20}
                className="cursor-pointer hover:text-black transition"
              />
            </div>

            {/* Caption */}
            <div className="px-4 pb-4">
              <p className="text-sm break-words">
                <span className="font-semibold">{post.user.name}</span> <br />
                {post.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfluencerPost;
