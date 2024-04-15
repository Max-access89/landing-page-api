import { InvocationContext } from "@azure/functions";
import axios from "axios";
import { isEmpty } from "lodash";
import { variables } from "../utils/env";

interface DocsData {
  doctype: string;
  [key: string]: any;
}

export async function SaveDocs(
  data: DocsData,
  auth: InvocationContext["auth"]
) {
  const formdata = new FormData();
  formdata.append("action", "Save");
  formdata.append(
    "doc",
    JSON.stringify({ ...data, company: auth.organization.name })
  );

  const { data: response } = await axios<{ docs: [any] }>({
    method: "POST",
    url: "/api/method/frappe.desk.form.save.savedocs",
    baseURL: variables.ERP_BASEURL,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `token ${auth.engine.apiKey}:${auth.engine.apiSecret}`,
    },
    data: formdata,
  });

  return response?.docs.at(0);
}

export async function ListDocs(
  params: DocsData,
  auth: InvocationContext["auth"]
) {
  console.log(params);
  const formdata = new FormData();
  Object.entries(params).forEach(([key, value]) => {
    formdata.append(key, value);
  });

  const { data: response } = await axios<{
    message: { keys: Array<string>; values: Array<Array<any>> };
  }>({
    method: "POST",
    url: "/api/method/frappe.desk.reportview.get",
    baseURL: variables.ERP_BASEURL,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `token ${auth.engine.apiKey}:${auth.engine.apiSecret}`,
    },
    data: formdata,
  });

  if (!isEmpty(response.message)) {
    const keys = response.message?.keys || [];
    const values = response.message?.values || [];

    const parsedResponse = values?.map((value) => {
      const doc: Record<string, any> = {};
      keys.forEach((key, index) => {
        doc[key] = value[index];
      });
      return doc;
    });

    return parsedResponse;
  }

  return [];
}

export async function GetDocById(
  docId: string,
  auth: InvocationContext["auth"]
) {
  const formdata = new FormData();
  formdata.append("name", docId); // Assuming "name" is the unique identifier

  const { data: response } = await axios<{ docs: [any] }>({
    method: "POST",
    url: "/api/method/frappe.desk.form.getdoc",
    baseURL: variables.ERP_BASEURL,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `token ${auth.engine.apiKey}:${auth.engine.apiSecret}`,
    },
    data: formdata,
  });

  return response?.docs.at(0);
}

export async function DeleteDoc(
  docId: string,
  auth: InvocationContext["auth"]
) {
  const formdata = new FormData();
  formdata.append("name", docId); // Assuming "name" is the unique identifier

  const { data: response } = await axios<{ message: string }>({
    method: "POST",
    url: "/api/method/frappe.client.delete",
    baseURL: variables.ERP_BASEURL,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `token ${auth.engine.apiKey}:${auth.engine.apiSecret}`,
    },
    data: formdata,
  });

  return response?.message;
}
