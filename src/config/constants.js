export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://grab-market-server-yang.herokuapp.com"
    : "http://loaclhost:8080";
