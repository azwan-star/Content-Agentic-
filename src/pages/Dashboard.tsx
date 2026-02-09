import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { getCurrentUserId } from '../lib/appIdentity';

export default function Dashboard() {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    
    setIsLoading(true);
    
    try {
      const userId = getCurrentUserId();
      
      const response = await fetch('https://n8n.onlyaitool.com/webhook-test/generate-drafts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          text: topic
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Success! Redirect immediately to review page.
      // We do NOT pass data here. The Review page will fetch it from Supabase.
      navigate('/review');
      
    } catch (error) {
      console.error("Generation failed:", error);
      alert("Failed to generate. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[80vh] flex flex-col items-center justify-center max-w-2xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full space-y-8"
      >
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tight">
            What's on your mind?
          </h1>
          <p className="text-lg text-slate-400 max-w-lg mx-auto">
            Enter a topic, and our AI will generate optimized social media drafts for you in seconds.
          </p>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-accent-blue to-accent-purple rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Coffee culture is exploding in 2026"
              className="w-full bg-slate-900/90 border border-slate-700/50 text-white text-lg md:text-xl px-6 py-6 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-blue/50 placeholder:text-slate-600 shadow-2xl"
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              disabled={isLoading}
            />
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isLoading || !topic.trim()}
          className={`
            relative overflow-hidden w-full md:w-auto px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300
            ${isLoading || !topic.trim() 
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
              : 'bg-white text-slate-950 hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]'
            }
          `}
        >
          <div className="flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating Magic...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-accent-purple" />
                <span>Generate Drafts</span>
              </>
            )}
          </div>
        </button>
      </motion.div>
    </div>
  );
}
