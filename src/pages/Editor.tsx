import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Sparkles, History, Settings2 } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function Editor() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col">
      {/* Editor Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-2 hover:bg-earth-800/5 rounded-full transition-colors text-earth-600"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <input 
              type="text" 
              defaultValue={id === 'new' ? "Untitled Project" : "The Future of AI Design"}
              className="text-xl font-semibold text-earth-900 bg-transparent focus:outline-none focus:bg-white/50 rounded px-2 -ml-2"
            />
            <p className="text-xs text-earth-600 px-2">Last saved just now</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <History className="w-4 h-4 mr-2" />
            History
          </Button>
          <Button size="sm" className="bg-earth-900 text-earth-100">
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Main Writing Area */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm p-8 md:p-12 overflow-y-auto">
          <textarea 
            className="w-full h-full resize-none focus:outline-none text-lg leading-relaxed text-earth-900 placeholder:text-earth-300"
            placeholder="Start writing your masterpiece..."
            defaultValue={id !== 'new' ? "Artificial Intelligence is reshaping the landscape of creative work, not by replacing human ingenuity, but by amplifying it.\n\nIn this new era, the role of the designer shifts from pixel-pusher to curator, from drafter to director. We are no longer limited by the speed of our hands, but by the breadth of our imagination." : ""}
          />
        </div>

        {/* AI Assistant Sidebar */}
        <div className="w-80 hidden lg:flex flex-col gap-4">
          <div className="bg-earth-100/50 rounded-xl p-4 flex-1 flex flex-col">
            <div className="flex items-center gap-2 mb-4 text-earth-900 font-medium">
              <Sparkles className="w-4 h-4" />
              <span>AI Assistant</span>
            </div>
            
            <div className="space-y-3 flex-1 overflow-y-auto">
              <div className="bg-white p-3 rounded-lg text-sm text-earth-600 shadow-sm">
                Try expanding on the "curator vs director" metaphor. It's a strong point that could use a concrete example.
              </div>
              <div className="bg-white p-3 rounded-lg text-sm text-earth-600 shadow-sm">
                Tone check: The introduction feels slightly academic. Consider making it more conversational?
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-earth-800/5">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Ask AI to edit or generate..."
                  className="w-full pl-3 pr-10 py-2 bg-white rounded-lg text-sm border border-earth-800/5 focus:outline-none focus:ring-2 focus:ring-earth-900/10"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-earth-100 rounded">
                  <ArrowLeft className="w-3 h-3 text-earth-600 rotate-180" />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-earth-100/50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-earth-900">Stats</span>
              <Settings2 className="w-4 h-4 text-earth-600" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white p-2 rounded-lg text-center">
                <div className="text-lg font-semibold text-earth-900">428</div>
                <div className="text-[10px] text-earth-600 uppercase tracking-wider">Words</div>
              </div>
              <div className="bg-white p-2 rounded-lg text-center">
                <div className="text-lg font-semibold text-earth-900">2m</div>
                <div className="text-[10px] text-earth-600 uppercase tracking-wider">Read Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
