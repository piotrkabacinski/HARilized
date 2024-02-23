import { createReport } from "./createReport";
import { getReportTemplate } from "../utils/getReportTemplate";
import { hydrateButton } from "../utils/hydrateButton";

export const appendEndpointButton = ({
  index,
  entry,
}: {
  index: number;
  entry: chrome.devtools.network.Request;
}): void => {
  const td = document.querySelector<HTMLTableCellElement>(`#button-${index}`);

  if (!td) throw `Cell for button not found: "#button-${index}"`;

  const button = document.createElement("button");

  const url = new URL(entry.request.url);

  button.classList.add("href-button");
  button.setAttribute("data-index", index.toString());
  button.innerText = url.href.replace(url.origin, "");

  td.appendChild(button);

  const reportTr = document.querySelector(`#report-${index}`);

  if (!reportTr) throw `Report tr not found: "#report-${index}"`;

  const callback = async () => {
    const reportContent = reportTr.querySelector("pre");

    if (!reportContent) throw `Report pre element not found`;

    const template = await getReportTemplate();

    if (!reportContent.textContent) {
      const report = await createReport(entry, template);
      reportContent.innerHTML = report;
    }

    reportTr.classList.toggle("hidden");
  };

  hydrateButton(`#button-${index} button.href-button`, callback);
};
