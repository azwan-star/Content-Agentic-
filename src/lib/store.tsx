import React, { createContext, useContext, useState, ReactNode } from 'react';
import { addDays, subDays } from 'date-fns';

export type Platform = 'linkedin' | 'twitter' | 'instagram';
export type PostStatus = 'pending' | 'scheduled' | 'published' | 'rejected';

export interface Post {
  id: string;
  content: string;
  platform: Platform;
  imageUrl?: string;
  status: PostStatus;
  scheduledDate?: Date;
}

interface GhostWriteContextType {
  posts: Post[];
  generateDrafts: (topic: string) => Promise<void>;
  updatePostStatus: (id: string, status: PostStatus, date?: Date) => void;
  getPendingPosts: () => Post[];
  getScheduledAndPublishedPosts: () => Post[];
}

const GhostWriteContext = createContext<GhostWriteContextType | undefined>(undefined);

// Initial Mock Data
const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    content: "Just launched our new AI features! 🚀 The productivity gains we're seeing are insane. #Tech #AI #Startup",
    platform: 'twitter',
    status: 'published',
    scheduledDate: subDays(new Date(), 2),
  },
  {
    id: '2',
    content: "Remote work isn't going anywhere. Here are 5 tips to manage your distributed team effectively in 2024.",
    platform: 'linkedin',
    status: 'scheduled',
    scheduledDate: addDays(new Date(), 2),
    imageUrl: 'https://images.unsplash.com/photo-1593642632823-8f78536788c6?w=800&auto=format&fit=crop&q=60'
  }
];

export function GhostWriteProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);

  const generateDrafts = async (topic: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newDrafts: Post[] = [
      {
        id: Math.random().toString(36).substr(2, 9),
        content: `${topic} is transforming how we connect. It's not just a trend, it's a shift in consciousness. ☕️✨ #CoffeeLover #FutureTrends`,
        platform: 'instagram',
        status: 'pending',
        imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=60'
      },
      {
        id: Math.random().toString(36).substr(2, 9),
        content: `Unpopular opinion: ${topic} is the most underrated productivity hack of the decade. Here's why... 🧵`,
        platform: 'twitter',
        status: 'pending',
      },
      {
        id: Math.random().toString(36).substr(2, 9),
        content: `As we look towards 2026, ${topic} presents a unique opportunity for businesses to innovate. Are you ready?`,
        platform: 'linkedin',
        status: 'pending',
        imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=60'
      }
    ];

    setPosts(prev => [...prev, ...newDrafts]);
  };

  const updatePostStatus = (id: string, status: PostStatus, date?: Date) => {
    setPosts(prev => prev.map(post => 
      post.id === id 
        ? { ...post, status, scheduledDate: date || post.scheduledDate } 
        : post
    ));
  };

  const getPendingPosts = () => posts.filter(p => p.status === 'pending');
  
  const getScheduledAndPublishedPosts = () => 
    posts.filter(p => p.status === 'scheduled' || p.status === 'published');

  return (
    <GhostWriteContext.Provider value={{ 
      posts, 
      generateDrafts, 
      updatePostStatus, 
      getPendingPosts,
      getScheduledAndPublishedPosts 
    }}>
      {children}
    </GhostWriteContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useGhostWrite() {
  const context = useContext(GhostWriteContext);
  if (context === undefined) {
    throw new Error('useGhostWrite must be used within a GhostWriteProvider');
  }
  return context;
}
