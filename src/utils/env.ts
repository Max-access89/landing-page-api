import { config } from "dotenv";

config();

export const variables = {
  DATABASE_URL: String(process.env.DATABASE_URL),

  LOCAL_DATABASE_URL: String(process.env.LOCAL_DATABASE_URL),

  A89_DASHBOARD_URL: String(process.env.A89_DASHBOARD_URL),
  PROSPECTURL: String(process.env.PROSPECTURL),

  // AUTH0
  AUTH0_DOMAIN: String(process.env.AUTH0_DOMAIN),
  AUTH0_SPA_CLIENT_ID: String(process.env.AUTH0_SPA_CLIENT_ID),
  AUTH0_SPA_CLIENT_SECRET: String(process.env.AUTH0_SPA_CLIENT_SECRET),
  AUTH0_SPA_AUDIENCE: String(process.env.AUTH0_SPA_AUDIENCE),
  AUTH0_API_CLIENT_ID: String(process.env.AUTH0_API_CLIENT_ID),
  AUTH0_API_ID: String(process.env.AUTH0_API_ID),
  AUTH0_API_CLIENT_SECRET: String(process.env.AUTH0_API_CLIENT_SECRET),
  AUTH0_API_AUDIENCE: String(process.env.AUTH0_API_AUDIENCE),
  AUTH0_CONNECTION: String(process.env.AUTH0_CONNECTION),
  AUTH0_CONNECTION_ID: String(process.env.AUTH0_CONNECTION_ID),

  THIRD_PARTY_SERVICES: String(process.env.THIRD_PARTY_SERVICES),
  ENGINE_API: String(process.env.ENGINE_API),
  ENVIRONMENT: String(process.env.ENVIRONMENT),

  ERP_BASEURL: String(process.env.ERP_BASEURL),
  ERP_APIKEY: String(process.env.ERP_APIKEY),
  ERP_APISECRET: String(process.env.ERP_APISECRET),
};
