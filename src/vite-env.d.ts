/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
  readonly VITE_URL_CURRENT_CONDITIONS: string;
  readonly VITE_URL_FORECAST: string;
  readonly VITE_URL_AUTOCOMPLETE: string;
  readonly VITE_URL_LOCATION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
