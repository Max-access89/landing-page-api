import { app } from "@azure/functions";

// import { Authenticate } from "../middleware/authenticate";
import { HandleCreateProspect } from "../handlers/crm/prospect/handlers";

// Prospect
app.http("landing-create-prospect", {
  methods: ["POST"],
  authLevel: "anonymous",
  // handler: (r, c) => Authenticate(r, c, HandleCreateProspect),
  handler: HandleCreateProspect,

  route: "landing/create/prospect",
});
