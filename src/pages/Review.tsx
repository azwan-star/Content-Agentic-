import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { Loader2, Layers, ArrowRight } from 'lucide-react';
import { Post } from '../components/PostPreview';
import CampaignModal, { Campaign } from '../components/CampaignModal';
import { getCurrentUserId } from '../lib/appIdentity';

export default function Review() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  const groupPostsByTopic = useCallback((posts: Post[]): Campaign[] => {
    const groups: Record<string, Campaign> = {};
    
    posts.forEach(post => {
      const topic = post.topic || 'General Drafts';
      
      if (!groups[topic]) {
        groups[topic] = {
          topic,
          mainImage: '',
          posts: []
        };
      }
      
      groups[topic].posts.push(post);
      
      // Set main image from the first post that has one
      if (!groups[topic].mainImage && post.image_url) {
        groups[topic].mainImage = post.image_url;
      }
    });

    return Object.values(groups);
  }, []);

  const fetchPosts = useCallback(async () => {
    try {
      const userId = getCurrentUserId();
      
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Normalize platform naming so UI lookups are reliable
      const normalizePlatform = (value: string | null) => {
        const raw = (value || '').trim().toLowerCase();
        if (raw === 'x' || raw === 'x-twitter' || raw === 'xtwitter') return 'twitter';
        if (raw === 'twitter') return 'twitter';
        return raw;
      };

      const cleanedPosts = (data || []).map(post => ({
        ...post,
        platform: normalizePlatform(post.platform)
      }));

      const grouped = groupPostsByTopic(cleanedPosts);
      setCampaigns(grouped);
      
      setSelectedCampaign((current) => {
        if (!current) return current;
        const updatedSelected = grouped.find(c => c.topic === current.topic);
        return updatedSelected || current;
      });
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  }, [groupPostsByTopic]);

  useEffect(() => {
    console.log('Review Page Mounted - Grouped View Active');
    fetchPosts();
  }, [fetchPosts]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="h-[50vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Campaign Review <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded ml-2">v2.0</span></h1>
          <p className="text-slate-400 mt-2">Manage your content campaigns by topic.</p>
        </div>
        <button 
          onClick={fetchPosts}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Refresh
        </button>
      </div>

      {campaigns.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-slate-800 border-dashed">
          <p className="text-slate-500 text-lg">No campaigns found. Go to Dashboard to generate some!</p>
        </div>
      ) : (
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {campaigns.map((campaign) => (
            <motion.div
              key={campaign.topic}
              variants={item}
              onClick={() => setSelectedCampaign(campaign)}
              className="group cursor-pointer relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col h-full"
            >
              {/* Image Section */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-800">
                {campaign.mainImage ? (
                  <img 
                    src={campaign.mainImage} 
                    alt={campaign.topic} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                    <Layers className="w-12 h-12 text-slate-700" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-80" />
                
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white truncate shadow-sm">{campaign.topic}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/20">
                      {campaign.posts.length} Drafts
                    </span>
                    <span className="text-xs text-slate-400">
                      {campaign.posts.filter(p => p.status === 'approved').length} Approved
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="flex gap-2 mb-4">
                  {['twitter', 'linkedin', 'instagram', 'facebook'].map(platform => {
                    const hasPost = campaign.posts.some(p => p.platform === platform);
                    return (
                      <div 
                        key={platform}
                        className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                          hasPost 
                            ? 'bg-slate-800 border-slate-700 text-slate-300' 
                            : 'bg-slate-900/50 border-slate-800 text-slate-700'
                        }`}
                        title={platform}
                      >
                        <span className="text-[10px] font-bold capitalize">{platform[0]}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
                  <span className="text-xs text-slate-500">Last updated today</span>
                  <div className="flex items-center gap-1 text-indigo-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
                    Review <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      <CampaignModal 
        campaign={selectedCampaign} 
        isOpen={!!selectedCampaign} 
        onClose={() => setSelectedCampaign(null)}
        onUpdate={fetchPosts}
      />
    </div>
  );
}
