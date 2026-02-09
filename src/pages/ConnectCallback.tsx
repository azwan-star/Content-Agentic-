import React, { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { getCurrentUserId, setCurrentUserId } from '../lib/appIdentity';

const WEBHOOK_URL =
  import.meta.env.VITE_N8N_CONNECT_WEBHOOK_URL || 'https://n8n.onlyaitool.com/webhook-test/auth/facebook';

export default function ConnectCallback() {
  useEffect(() => {
    const run = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      const state = params.get('state');
      if (!code) { 
        window.alert('Missing code from Facebook.');
        window.location.href = '/settings';
        return;
      }

      try {
        // This app may not have an authenticated Supabase session.
        // Use a stable fallback user ID so webhook calls still execute.
        let userId = getCurrentUserId();
        try {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          if (user?.id) {
            userId = user.id;
            setCurrentUserId(user.id);
          }
        } catch (authErr) {
          console.warn('No Supabase auth session found. Using fallback userId.', authErr);
        }

        const res = await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code, state, userId }),
        });

        if (!res.ok) throw new Error('Webhook call failed');

        window.alert('Connected!');
      } catch (err) {
        console.error(err);
        window.alert('Failed to connect.');
      } finally {
        window.location.href = '/settings';
      }
    };
    run();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <div className="text-center space-y-2">
        <p className="text-lg font-semibold">Completing connection...</p>
        <p className="text-slate-400 text-sm">Please wait a moment.</p>
      </div>
    </div>
  );
}
