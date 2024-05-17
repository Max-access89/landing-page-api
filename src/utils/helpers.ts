import axios from "axios";
import { variables } from "./env";

export async function ClientCredentials(organization: string) {
  const { data: verified } = await axios({
    method: "POST",
    url: "/organization/verify",
    baseURL: variables.A89_DASHBOARD_URL,
    data: { organization },
    headers: {
      "x-app-env": variables.ENVIRONMENT,
    },
  });

  console.log(
    "🚀🚀 -> file: misc.ts:11 -> ClientCredentials -> verified:",
    verified
  );

  return verified;
}
