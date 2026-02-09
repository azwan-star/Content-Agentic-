import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ghost, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-neo-bg relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      <Card className="w-full max-w-md relative z-10 border-4 shadow-neo-lg">
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-neo-black flex items-center justify-center border-4 border-neo-pink shadow-neo mb-4">
            <Ghost className="w-10 h-10 text-neo-white" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter uppercase text-center">
            Ghost<span className="text-neo-pink">Write</span>
          </h1>
          <p className="text-sm font-bold mt-2 bg-neo-cyan px-2 py-1 border-2 border-black">
            NEO-BRUTALIST EDITION
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="font-bold text-lg">EMAIL ACCESS</label>
            <input
              type="email"
              placeholder="writer@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 bg-white border-4 border-black font-mono focus:outline-none focus:shadow-neo transition-all placeholder:text-gray-400"
              required
            />
          </div>

          <Button type="submit" size="lg" className="w-full group">
            LOGIN WITH MAGIC LINK
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t-4 border-black text-center">
          <p className="text-xs font-bold text-gray-500">NO PASSWORD REQUIRED. JUST RAW ACCESS.</p>
        </div>
      </Card>
    </div>
  );
}
