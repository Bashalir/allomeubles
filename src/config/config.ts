// Configuration centralisée
export const config = {
  api: {
    baseUrl: import.meta.env.VITE_APP_API_BASE_URL,
    token: import.meta.env.VITE_APP_API_TOKEN,
  },
  environment: import.meta.env.VITE_APP_ENVIRONMENT,
  isDevelopment: import.meta.env.VITE_APP_ENVIRONMENT === 'development',
  isProduction: import.meta.env.VITE_APP_ENVIRONMENT === 'production'
}
