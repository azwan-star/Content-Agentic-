import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Heart, 
  MessageCircle, 
  Repeat, 
  Send, 
  Bookmark, 
  MoreHorizontal, 
  ThumbsUp, 
  MessageSquare,
  BarChart2
} from 'lucide-react';

export interface Post {
  id: string;
  content: string;
  platform: string;
  status: string;
  created_at: string;
  image_url?: string;
  topic?: string;
}

interface PostPreviewProps {
  post: Post | null;
  isOpen?: boolean;
  onClose?: () => void;
  isInline?: boolean;
  editableContent?: string;
  onContentChange?: (value: string) => void;
  editable?: boolean;
}

export default function PostPreview({
  post,
  isOpen,
  onClose,
  isInline = false,
  editableContent,
  onContentChange,
  editable = false
}: PostPreviewProps) {
  if (!post) return null;

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const contentValue = editableContent ?? post.content;
  const contentNode = editable && onContentChange ? (
    <textarea
      value={contentValue}
      onChange={(e) => onContentChange(e.target.value)}
      className="w-full bg-slate-900/60 border border-slate-800 text-white text-[15px] rounded-xl p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-vertical min-h-[100px] leading-relaxed"
    />
  ) : (
    <p className="text-[15px] text-white mt-1 whitespace-pre-wrap leading-normal">
      {contentValue}
    </p>
  );

  const renderTwitterPreview = () => (
    <div className="bg-black text-white p-4 rounded-xl border border-slate-800 w-full max-w-md mx-auto font-sans shadow-xl">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-slate-700 flex-shrink-0 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" alt="User" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 text-[15px]">
            <span className="font-bold text-white truncate">GhostWrite User</span>
            <span className="text-slate-500 truncate">@ghostwrite_ai</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-500">{formatTime(post.created_at)}</span>
          </div>
          {contentNode}
          {/* For Twitter we keep previews text-only and ignore any attached image */}
          <div className="flex items-center justify-between mt-3 text-slate-500 max-w-[85%]">
            <button className="group flex items-center gap-2 hover:text-sky-500 transition-colors">
              <div className="p-2 rounded-full group-hover:bg-sky-500/10">
                <MessageCircle className="w-4 h-4" />
              </div>
              <span className="text-xs">24</span>
            </button>
            <button className="group flex items-center gap-2 hover:text-green-500 transition-colors">
              <div className="p-2 rounded-full group-hover:bg-green-500/10">
                <Repeat className="w-4 h-4" />
              </div>
              <span className="text-xs">5</span>
            </button>
            <button className="group flex items-center gap-2 hover:text-pink-500 transition-colors">
              <div className="p-2 rounded-full group-hover:bg-pink-500/10">
                <Heart className="w-4 h-4" />
              </div>
              <span className="text-xs">182</span>
            </button>
            <button className="group flex items-center gap-2 hover:text-sky-500 transition-colors">
              <div className="p-2 rounded-full group-hover:bg-sky-500/10">
                <BarChart2 className="w-4 h-4" />
              </div>
              <span className="text-xs">1.2k</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLinkedInPreview = () => (
    <div className="bg-[#1b1f23] text-white rounded-xl border border-slate-700 w-full max-w-md mx-auto font-sans overflow-hidden shadow-xl">
      <div className="p-3 flex gap-3">
        <div className="w-12 h-12 rounded-full bg-slate-700 flex-shrink-0 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" alt="User" />
        </div>
        <div>
          <div className="font-semibold text-sm text-white/90">GhostWrite User</div>
          <div className="text-xs text-white/60">AI Content Specialist</div>
          <div className="text-xs text-white/60 flex items-center gap-1">
            {formatTime(post.created_at)} • <span className="text-[10px]">🌐</span>
          </div>
        </div>
      </div>
      
      <div className="px-3 pb-2 text-sm text-white/90 whitespace-pre-wrap">
        {contentNode}
      </div>

      {post.image_url && (
        <div className="w-full bg-black">
          <img src={post.image_url} alt="Post content" className="w-full h-auto object-contain max-h-[400px]" />
        </div>
      )}

      <div className="px-3 py-2 flex items-center gap-1 border-t border-slate-700/50 mt-1">
        <div className="flex -space-x-1">
          <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-[8px]">👍</div>
          <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-[8px]">❤️</div>
        </div>
        <span className="text-xs text-white/60 hover:text-blue-400 hover:underline cursor-pointer">42 others</span>
      </div>

      <div className="px-2 py-1 border-t border-slate-700 flex justify-between">
        <button className="flex-1 py-3 flex items-center justify-center gap-2 hover:bg-slate-800 rounded-md transition-colors text-white/70 font-medium text-sm">
          <ThumbsUp className="w-4 h-4" /> Like
        </button>
        <button className="flex-1 py-3 flex items-center justify-center gap-2 hover:bg-slate-800 rounded-md transition-colors text-white/70 font-medium text-sm">
          <MessageSquare className="w-4 h-4" /> Comment
        </button>
        <button className="flex-1 py-3 flex items-center justify-center gap-2 hover:bg-slate-800 rounded-md transition-colors text-white/70 font-medium text-sm">
          <Repeat className="w-4 h-4" /> Repost
        </button>
        <button className="flex-1 py-3 flex items-center justify-center gap-2 hover:bg-slate-800 rounded-md transition-colors text-white/70 font-medium text-sm">
          <Send className="w-4 h-4" /> Send
        </button>
      </div>
    </div>
  );

  const renderInstagramPreview = () => (
    <div className="bg-black text-white rounded-xl border border-slate-800 w-full max-w-md mx-auto font-sans overflow-hidden shadow-xl">
      <div className="p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600 p-[2px]">
            <div className="w-full h-full rounded-full border-2 border-black overflow-hidden">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" alt="User" className="w-full h-full object-cover" />
            </div>
          </div>
          <span className="text-sm font-semibold">ghostwrite_ai</span>
        </div>
        <MoreHorizontal className="w-5 h-5" />
      </div>

      {post.image_url ? (
        <div className="w-full aspect-square bg-slate-900 relative">
          <img src={post.image_url} alt="Post content" className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="w-full aspect-square bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center p-8 text-center">
          <p className="text-white font-bold text-xl">{contentValue.slice(0, 100)}...</p>
        </div>
      )}

      <div className="p-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <Heart className="w-6 h-6 hover:text-slate-300 cursor-pointer" />
            <MessageCircle className="w-6 h-6 hover:text-slate-300 cursor-pointer -rotate-90" />
            <Send className="w-6 h-6 hover:text-slate-300 cursor-pointer" />
          </div>
          <Bookmark className="w-6 h-6 hover:text-slate-300 cursor-pointer" />
        </div>
        
        <div className="text-sm font-semibold mb-1">1,234 likes</div>
        
        <div className="text-sm">
          <span className="font-semibold mr-2">ghostwrite_ai</span>
          {editable ? (
            contentNode
          ) : (
            <span className="text-slate-100">{contentValue}</span>
          )}
        </div>
        
        <div className="text-xs text-slate-500 mt-2 uppercase">
          {formatTime(post.created_at)}
        </div>
      </div>
    </div>
  );

  const renderFacebookPreview = () => (
    <div className="bg-[#0f172a] text-white rounded-xl border border-slate-800 w-full max-w-md mx-auto font-sans overflow-hidden shadow-xl">
      <div className="px-4 py-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold">
          F
        </div>
        <div className="flex-1">
          <div className="font-semibold text-sm">GhostWrite User</div>
          <div className="text-xs text-slate-400 flex items-center gap-1">
            {formatTime(post.created_at)} • <span className="text-[10px]">Public</span>
          </div>
        </div>
        <MoreHorizontal className="w-5 h-5 text-slate-400" />
      </div>

      <div className="px-4 pb-3 text-sm text-white/90 whitespace-pre-wrap leading-relaxed">
        {contentNode}
      </div>

      {post.image_url && (
        <div className="w-full bg-black">
          <img src={post.image_url} alt="Post content" className="w-full h-auto object-contain max-h-[420px]" />
        </div>
      )}

      <div className="px-4 py-3 border-t border-slate-800 flex items-center justify-between text-slate-400 text-xs">
        <div className="flex items-center gap-2">
          <ThumbsUp className="w-4 h-4" />
          <span>2.1k</span>
        </div>
        <div className="flex items-center gap-4">
          <span>183 comments</span>
          <span>47 shares</span>
        </div>
      </div>

      <div className="px-2 py-2 border-t border-slate-800 flex">
        {[
          { icon: <ThumbsUp className="w-4 h-4" />, label: 'Like' },
          { icon: <MessageSquare className="w-4 h-4" />, label: 'Comment' },
          { icon: <Send className="w-4 h-4" />, label: 'Share' },
        ].map((item) => (
          <button
            key={item.label}
            className="flex-1 py-2 flex items-center justify-center gap-2 text-white/70 hover:bg-slate-800 rounded-md transition-colors text-sm font-medium"
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );

  const renderContent = () => (
    <div className="flex flex-col items-center w-full">
      {!isInline && (
        <div className="mb-6 text-center">
          <h3 className="text-xl font-bold text-white mb-1">Post Preview</h3>
          <p className="text-slate-400 text-sm">
            Viewing as {post.platform.charAt(0).toUpperCase() + post.platform.slice(1)} post
          </p>
        </div>
      )}

      {post.platform === 'twitter' && renderTwitterPreview()}
      {post.platform === 'linkedin' && renderLinkedInPreview()}
      {post.platform === 'instagram' && renderInstagramPreview()}
      {post.platform === 'facebook' && renderFacebookPreview()}
      
      {!isInline && onClose && (
        <div className="mt-8 flex gap-3 w-full max-w-md justify-center">
            <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-800 text-white hover:bg-slate-700 transition-colors font-medium text-sm"
            >
              Close Preview
            </button>
        </div>
      )}
    </div>
  );

  if (isInline) {
    return renderContent();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl"
          >
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {renderContent()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
