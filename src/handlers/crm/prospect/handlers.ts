import {
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { errorHandler } from "../../../features/error.handler";
import { responseInfo } from "../../../features/response.info";
import { HandleCreateProspectSchema } from "./validators";
import { ClientCredentials } from "../../../utils/helpers";
import axios from "axios";
import { variables } from "../../../utils/env";

export async function HandleCreateProspect(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const payload: any = await request.json();

    const dataToSend = {
      ...payload,
      doctype: "Prospect",
      territory: "All Territories",
    };

    const token = await ClientCredentials("Cepodek Inc");

    console.log({ dataToSend });

    const response = await axios<{ docs: [any] }>({
      method: "POST",
      url: "/api/crm/create/prospect",
      baseURL: "http://127.0.0.1:7077",
      // baseURL: "https://erpnext-demo.theadvisorylab.net",
      headers: {
        Authorization: `Bearer ${token?.clientCredentials?.access_token}`,
      },

      data: dataToSend,
    });

    return {
      status: 200,
      jsonBody: {
        responseInfo: responseInfo["success"],
      },
    };
  } catch (error) {
    return errorHandler(error);
  }
}
