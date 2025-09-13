"use client";

import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import ImageCropper from "@/components/ImageCropper";
import { ImageZoom } from "../ImageZoom";
import { Textarea } from "@/components/ui/textarea";

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

// Dummy data (pretend from backend)
const dummyPosts: Post[] = [
  {
    id: 1,
    image: "/assets/influencers/post1.png",
    caption: "Feeling creative today! 🎨✨",
    likes: 1245,
    user: {
      name: "Sam Guy",
      username: "samguy",
      avatar: "/assets/influencers/3.jpg",
    },
  },
  {
    id: 2,
    image: "/assets/influencers/post2.png",
    caption: "Sunday vibes ☕📚",
    likes: 876,
    user: {
      name: "Sam Guy",
      username: "samguy",
      avatar: "/assets/influencers/3.jpg",
    },
  },
  {
    id: 3,
    image: "/assets/influencers/post3.png",
    caption: "Exploring the city 🏙️",
    likes: 2109,
    user: {
      name: "Sam Guy",
      username: "samguy",
      avatar: "/assets/influencers/3.jpg",
    },
  },
  {
    id: 4,
    image: "/assets/influencers/post4.png",
    caption: "Sneak peek at my new project 🤩",
    likes: 1532,
    user: {
      name: "Sam Guy",
      username: "samguy",
      avatar: "/assets/influencers/3.jpg",
    },
  },
  {
    id: 5,
    image: "/assets/influencers/post5.png",
    caption: "Enjoying the sunset 🌅",
    likes: 981,
    user: {
      name: "Sam Guy",
      username: "samguy",
      avatar: "/assets/influencers/3.jpg",
    },
  },
  {
    id: 6,
    image: "/assets/influencers/post6.png",
    caption: "My happy place 🎶",
    likes: 1899,
    user: {
      name: "Sam Guy",
      username: "samguy",
      avatar: "/assets/influencers/3.jpg",
    },
  },
  {
    id: 1,
    image: "/assets/influencers/post1.png",
    caption: "Feeling creative today! 🎨✨",
    likes: 1245,
    user: {
      name: "Sam Guy",
      username: "samguy",
      avatar: "/assets/influencers/3.jpg",
    },
  },
  {
    id: 2,
    image: "/assets/influencers/post2.png",
    caption: "Sunday vibes ☕📚",
    likes: 876,
    user: {
      name: "Sam Guy",
      username: "samguy",
      avatar: "/assets/influencers/3.jpg",
    },
  },
  {
    id: 3,
    image: "/assets/influencers/post3.png",
    caption: "Exploring the city 🏙️",
    likes: 2109,
    user: {
      name: "Sam Guy",
      username: "samguy",
      avatar: "/assets/influencers/3.jpg",
    },
  },
  {
    id: 4,
    image: "/assets/influencers/post4.png",
    caption: "Sneak peek at my new project 🤩",
    likes: 1532,
    user: {
      name: "Sam Guy",
      username: "samguy",
      avatar: "/assets/influencers/3.jpg",
    },
  },
  {
    id: 5,
    image: "/assets/influencers/post5.png",
    caption: "Enjoying the sunset 🌅",
    likes: 981,
    user: {
      name: "Sam Guy",
      username: "samguy",
      avatar: "/assets/influencers/3.jpg",
    },
  },
  {
    id: 6,
    image: "/assets/influencers/post6.png",
    caption: "My happy place 🎶",
    likes: 1899,
    user: {
      name: "Sam Guy",
      username: "samguy",
      avatar: "/assets/influencers/3.jpg",
    },
  },
];

const PAGE_SIZE = 3; // 👈 number of posts per batch

const InfluencerPost: React.FC = () => {
  const [allPosts] = useState<Post[]>(dummyPosts); // pretend backend
  const [posts, setPosts] = useState<Post[]>(allPosts.slice(0, PAGE_SIZE));
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [newCaption, setNewCaption] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // 👇 New states for image upload + crop
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [croppedImage, setCroppedImage] = useState<File | null>(null);
  const [isCropOpen, setIsCropOpen] = useState(false);

  // Infinite scroll fetch function
  const fetchMorePosts = () => {
    const nextPage = page + 1;
    const start = page * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    const newPosts = allPosts.slice(start, end);

    setPosts((prev) => [...prev, ...newPosts]);
    setPage(nextPage);

    if (end >= allPosts.length) {
      setHasMore(false); // no more posts
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setIsCropOpen(true); // open crop dialog
    }
  };

  const handleCropComplete = (file: File) => {
    setCroppedImage(file);
  };

  const handleCreatePost = () => {
    if (!newCaption.trim() && !croppedImage) return;

    const imageUrl = croppedImage
      ? URL.createObjectURL(croppedImage)
      : "/assets/influencers/post1.png";

    const newPost: Post = {
      id: posts.length + 1,
      image: imageUrl,
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
    setCroppedImage(null);
  };

  const handleConfirmDelete = () => {
    setPosts(posts.filter((p) => p.id !== deleteId));
    setDeleteId(null);
  };

  const handleArchive = (id: number) => {
    console.log("Archived post:", id);
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
            <Textarea
              placeholder="What's on your mind?"
              value={newCaption}
              onChange={(e) => setNewCaption(e.target.value)}
              className="w-full rounded-xl border border-gray-300 p-3 text-sm resize-none !bg-white text-black"
              rows={3}
            />
            {croppedImage && (
              <img
                src={URL.createObjectURL(croppedImage)}
                alt="Preview"
                className="w-40 h-auto object-cover rounded-xl border-none"
              />
            )}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-4">
              <label className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-600 hover:bg-gray-100 transition w-full sm:w-auto cursor-pointer">
                <Image size={18} />
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
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

      {/* Posts Feed with Infinite Scroll */}
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMorePosts}
        hasMore={hasMore}
        loader={<p className="text-center py-4">Loading more posts...</p>}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden w-full"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3 text-black">
                  <img
                    src={post.user.avatar}
                    alt={post.user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate">{post.user.name}</p>
                    <p className="text-xs text-gray-500 truncate">@{post.user.username}</p>
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
                      onClick={() => setDeleteId(post.id)}
                      className="cursor-pointer text-red-600"
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Post Image */}
              <ImageZoom>
                <img
                  src={post.image}
                  alt={post.caption}
                  loading="lazy" // 👈 lazy load images
                  className="w-full h-auto object-cover"
                />
              </ImageZoom>

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
                <p className="text-sm break-words text-black">
                  <span className="font-semibold">{post.user.name}</span> <br />
                  {post.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. The post will be permanently deleted.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Image Cropper Dialog */}
      {selectedFile && (
        <ImageCropper
          isOpen={isCropOpen}
          onClose={() => setIsCropOpen(false)}
          imageFile={selectedFile}
          onCropComplete={handleCropComplete}
          aspectRatio={416 / 334}
        />
      )}
    </div>
  );
};

export default InfluencerPost;
