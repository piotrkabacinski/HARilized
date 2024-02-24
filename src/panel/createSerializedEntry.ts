import type { SerializedEntry } from "./state";
import { createReport } from "./createReport";
import { getReportTemplate } from "../utils/getReportTemplate";

export const createSerializedEntry = async (
  request: chrome.devtools.network.Request
): Promise<SerializedEntry> => {
  const { status } = request.response;
  const { method, url } = request.request;

  const template = await getReportTemplate();

  const report = await createReport(request, template);

  return {
    id: crypto.randomUUID().split("-").slice(0, 2).join(""),
    dateTime: request.startedDateTime,
    status,
    method,
    url,
    report,
  };
};