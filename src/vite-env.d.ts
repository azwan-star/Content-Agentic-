/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_META_APP_ID?: string;
  readonly VITE_N8N_CONNECT_WEBHOOK_URL?: string;
  readonly VITE_N8N_PUBLISH_WEBHOOK_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
