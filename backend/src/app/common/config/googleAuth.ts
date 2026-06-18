import 'dotenv/config'
import { google } from "googleapis";

const oAuthClient: InstanceType<typeof google.auth.OAuth2> =
  new google.auth.OAuth2({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    redirectUri: 'http://localhost:5173'
  });

export { oAuthClient };
