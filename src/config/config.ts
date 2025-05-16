// Define the URL for the domain and public resources, otherwise default to localhost dev environment
const DOMAIN_URL: string = import.meta.env.VITE_DOMAIN_URL || "http://localhost:5173/";
const CLIENT_SIDE_URL: string = import.meta.env.VITE_CLIENT_SIDE_URL || "http://localhost:5173/";

/**
 * * @description
 * This object contains variables that are used in the application.
 */
export const config = {
  DOMAIN_URL,
  CLIENT_SIDE_URL
};
