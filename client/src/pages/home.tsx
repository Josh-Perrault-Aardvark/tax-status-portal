import React, { useEffect, useState } from "react";

function getRawFromQuery(): string {
  if (typeof window === "undefined") return "";
  const params = new URLSearchParams(window.location.search);
  const encoded = params.get("tickets");
  if (!encoded) return "";
  try {
    return decodeURIComponent(encoded);
  } catch {
    return encoded;
  }
}

type DisplayRow = {
  clientName: string;
  taxYear: string;
  taxReturnType: string;
  status: string;
  lastUpdatedIso: string;
};

function mapClientStatus(raw: string): string {
  if (!raw) return "";

  const table: Record<string, string> = {
    "In Progress": "In Progress",
    "Preparation in Progress": "In Progress",
    "Preparation Completed": "Ready for Review",
    "Review in Progress": "In Review",
    "Review Completed": "Reviewed",
    "Awaiting Client Documents": "Waiting on You",
    "Tax Return Filed with IRS": "Filed with IRS",
    "Tax Return Accepted": "Accepted by IRS",
    "Extension Filed with IRS": "Extension Filed",
    "Extension Accepted": "Extension Accepted",
    "Tax Return Complete": "Complete",
    "Review SharePoint Folder": "Review SP",
    "Documents Received": "Documents Received"
  };

  return table[raw] ?? raw;
}

function parseRows(rawString: string): DisplayRow[] {
  if (!rawString) return [];

  let rows: any[];
  try {
    rows = JSON.parse(rawString);
  } catch (e) {
    console.error("Bad JSON for tax return status", e);
    return [];
  }

  return rows
    .map((r: any) => ({
      clientName: r.client_name || "",
      taxYear: String(r.tax_year),
      taxReturnType: r.tax_return_type || r.type || "",
      status: mapClientStatus(r.status_label || r.status || ""),
      lastUpdatedIso: r.updated_iso || r.last_updated,
    }))
    .sort((a, b) => Number(b.taxYear) - Number(a.taxYear));
}

function formatDate(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export default function Home() {
  const [rows, setRows] = useState<DisplayRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const fromQuery = getRawFromQuery();
      const raw = fromQuery || "";
      const parsed = parseRows(raw);
      setRows(parsed);
    } catch (e: any) {
      console.error(e);
      setError("Failed to load tax return status data");
    }
  }, []);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="max-w-6xl mx-auto py-8 px-6">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold mb-1">Tax Return Status</h1>
        </header>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <section>
          <div className="overflow-x-auto border border-slate-200 rounded-md bg-white">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100 text-left text-xs font-semibold text-slate-700">
                <tr>
                  <th className="px-6 py-3">Client</th>
                  <th className="px-6 py-3">Tax Year</th>
                  <th className="px-6 py-3">Tax Return Type</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-6 text-center text-slate-500"
                    >
                      No tax return status data available.
                    </td>
                  </tr>
                ) : (
                  rows.map((row, idx) => (
                    <tr
                      key={row.taxYear + "-" + idx}
                      className={
                        idx % 2 === 0
                          ? "bg-white border-t border-slate-100"
                          : "bg-slate-50 border-t border-slate-100"
                      }
                    >
                      <td className="px-6 py-3 font-medium">
                        {row.clientName}
                      </td>
                      <td className="px-6 py-3">{row.taxYear}</td>
                      <td className="px-6 py-3">{row.taxReturnType}</td>
                      <td className="px-6 py-3">{row.status}</td>
                      <td className="px-6 py-3">
                        {formatDate(row.lastUpdatedIso)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}