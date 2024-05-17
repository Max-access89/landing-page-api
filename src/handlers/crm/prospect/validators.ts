import { z } from "zod";

export const HandleCreateProspectSchema = z.object({
  doctype: z.literal("Prospect").default("Prospect"),
  company_name: z.string(),
  owner: z.string().optional(),
  market_segment: z
    .enum(["Lower Income", "Middle Income", "Upper Income"])
    .optional(),
  no_of_employees: z
    .enum(["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"])
    .optional(),
  annual_revenue: z.number().optional(),
  industry: z.string().optional(),
  territory: z
    .enum(["All Territories", "Ghana", "Rest of the world"])
    .optional(),
  website: z.string().optional(),
});
