import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mic, Type, Sparkles, AlignLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export default function NewProject() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('blog');

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-earth-800/5 rounded-full transition-colors text-earth-600"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-semibold text-earth-900">Create New Project</h1>
          <p className="text-earth-600 text-sm">Choose how you want to start writing.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { id: 'blog', icon: AlignLeft, label: 'Blog Post', desc: 'Long-form content' },
          { id: 'social', icon: Type, label: 'Social Post', desc: 'Short & punchy' },
          { id: 'voice', icon: Mic, label: 'Voice Note', desc: 'Speak your mind' },
        ].map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedType(type.id)}
            className={`p-6 rounded-xl border text-left transition-all duration-200 ${
              selectedType === type.id
                ? 'bg-earth-900 text-earth-100 border-earth-900 shadow-lg'
                : 'bg-white text-earth-900 border-transparent hover:border-earth-800/10 hover:shadow-md'
            }`}
          >
            <type.icon className={`w-6 h-6 mb-4 ${selectedType === type.id ? 'text-earth-100' : 'text-earth-600'}`} />
            <h3 className="font-medium mb-1">{type.label}</h3>
            <p className={`text-xs ${selectedType === type.id ? 'text-earth-100/70' : 'text-earth-600'}`}>
              {type.desc}
            </p>
          </button>
        ))}
      </div>

      <Card className="p-8 bg-white border-none shadow-sm space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-earth-900">Project Title</label>
          <input 
            type="text" 
            placeholder="e.g., The Future of Minimalist Design"
            className="w-full p-3 bg-earth-50 border border-earth-800/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-earth-900/10 transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-earth-900">Initial Thoughts / Keywords</label>
          <textarea 
            placeholder="What's on your mind?"
            className="w-full p-3 h-32 bg-earth-50 border border-earth-800/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-earth-900/10 transition-all resize-none"
          />
        </div>

        <div className="pt-4 flex justify-end gap-3">
          <Button variant="ghost" onClick={() => navigate('/dashboard')}>Cancel</Button>
          <Button onClick={() => navigate('/editor/new')}>
            <Sparkles className="w-4 h-4 mr-2" />
            Generate Draft
          </Button>
        </div>
      </Card>
    </div>
  );
}
