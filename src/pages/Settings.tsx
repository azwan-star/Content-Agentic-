import React, { useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';
import {
  getCurrentUserId,
  getSelectedFacebookPageId,
  setSelectedFacebookPageId,
} from '../lib/appIdentity';

type FacebookConnection = {
  page_id: string;
  page_name: string;
};

const META_APP_ID = import.meta.env.VITE_META_APP_ID || '1962199107730228';

export default function Settings() {
  const [connections, setConnections] = useState<FacebookConnection[]>([]);
  const [loadingConnections, setLoadingConnections] = useState(false);
  const [selectedPageId, setSelectedPageId] = useState<string>(getSelectedFacebookPageId() || '');

  const userId = useMemo(() => getCurrentUserId(), []);

  const fetchConnections = async () => {
    try {
      setLoadingConnections(true);
      const { data, error } = await supabase
        .from('social_connections')
        .select('page_id,page_name')
        .eq('user_id', userId)
        .eq('platform', 'facebook');
      if (error) throw error;

      // Keep one entry per page_id in case the connect webhook inserted duplicates.
      const uniqueByPage = new Map<string, FacebookConnection>();
      (data || []).forEach((row) => {
        if (!row.page_id) return;
        uniqueByPage.set(row.page_id, {
          page_id: row.page_id,
          page_name: row.page_name || row.page_id,
        });
      });

      const values = Array.from(uniqueByPage.values());
      setConnections(values);

      if (values.length === 0) {
        setSelectedPageId('');
        return;
      }

      const currentSaved = getSelectedFacebookPageId();
      const exists = currentSaved && values.some((c) => c.page_id === currentSaved);
      const nextSelected = exists ? currentSaved! : values[0].page_id;
      setSelectedPageId(nextSelected);
      setSelectedFacebookPageId(nextSelected);
    } catch (err) {
      console.error('Failed to load facebook connections:', err);
    } finally {
      setLoadingConnections(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  const handleConnectFacebook = () => {
    const redirectUri = `${window.location.origin}/connect/callback`;
    const state = 'facebook';
    const url = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${META_APP_ID}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&state=${state}&scope=pages_manage_posts,pages_read_engagement,pages_show_list`;
    window.location.href = url;
  };

  const handleSelectPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pageId = e.target.value;
    setSelectedPageId(pageId);
    if (pageId) setSelectedFacebookPageId(pageId);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-slate-400 mt-2">Manage your account and integrations.</p>
      </div>

      <div className="grid gap-6 max-w-3xl">
        <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl space-y-4">
          <h2 className="text-xl font-semibold text-white">Profile Information</h2>
          <div className="space-y-2">
            <label className="text-sm text-slate-400">Display Name</label>
            <input
              type="text"
              defaultValue="Demo User"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
          <p className="text-xs text-slate-500">Current userId: {userId}</p>
        </div>

        <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl space-y-4">
          <h2 className="text-xl font-semibold text-white">Social Integrations</h2>
          <p className="text-slate-400 text-sm">
            Connect Facebook, then choose which page should be used when you click Post Now.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleConnectFacebook}
              className="px-4 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-colors"
            >
              Connect Facebook Page
            </button>
            <button
              onClick={fetchConnections}
              className="px-4 py-3 rounded-lg border border-slate-700 text-slate-200 hover:bg-slate-800 transition-colors"
              disabled={loadingConnections}
            >
              {loadingConnections ? 'Refreshing...' : 'Refresh Pages'}
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-slate-400">Selected Facebook Page</label>
            <select
              value={selectedPageId}
              onChange={handleSelectPage}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
            >
              {connections.length === 0 && <option value="">No connected pages found</option>}
              {connections.map((conn) => (
                <option key={conn.page_id} value={conn.page_id}>
                  {conn.page_name} ({conn.page_id})
                </option>
              ))}
            </select>
            <p className="text-xs text-slate-500">
              This selected page is used by the publish webhook payload.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
