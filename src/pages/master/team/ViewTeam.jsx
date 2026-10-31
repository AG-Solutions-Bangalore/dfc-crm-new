
import axios from "axios";
import React, { useEffect, useState } from "react";
import BASE_URL, { TEAM_URL } from "../../../base/BaseUrl";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const DetailRow = ({ label, value, downloadUrl }) => (
  <div className="flex flex-col gap-1 border-b border-slate-100 py-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
    <span className="text-sm font-semibold text-slate-600">
      {label}
    </span>

    {downloadUrl ? (
      <a
        href={downloadUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-fit items-center gap-2 rounded-lg bg-orange-50 px-3 py-2 text-sm font-semibold text-[#F56616] transition hover:bg-orange-100"
        download
      >
        Download
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 16.5v2A1.5 1.5 0 005.5 20h13a1.5 1.5 0 001.5-1.5v-2M12 3v12m0 0l-4-4m4 4l4-4"
          />
        </svg>
      </a>
    ) : (
      <span className="break-words text-sm font-medium text-[#142747] sm:text-right">
        {value || "-"}
      </span>
    )}
  </div>
);

const DetailSection = ({ title, children }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
    <h3 className="mb-2 border-b border-slate-100 pb-3 text-sm font-bold uppercase tracking-wide text-[#0A1F44]">
      {title}
    </h3>
    <div>{children}</div>
  </div>
);

const ViewTeam = ({ teamId }) => {
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/web-fetch-team-by-id/${teamId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTeam(response.data.team);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Team View details:", error);
        setError(error);
        setLoading(false);
      }
    };

    if (teamId) {
      fetchVehicleDetails();
    }
  }, [teamId]);

  if (loading) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <InformationCircleIcon className="h-6 w-6 animate-pulse text-[#F56616]" />
        <p className="text-sm font-medium text-slate-600">
          Loading team details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-5">
        <InformationCircleIcon className="h-6 w-6 shrink-0 text-red-500" />
        <p className="text-sm font-medium text-red-600">
          Unable to fetch Team details
        </p>
      </div>
    );
  }

  if (!teamId) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <InformationCircleIcon className="h-6 w-6 shrink-0 text-amber-500" />
        <p className="text-sm font-medium text-amber-700">
          No Team Id selected
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-[#F8FAFC] shadow-sm">

      {/* Header */}
      <div className="border-b border-slate-200 bg-white px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-orange-100 bg-orange-50">
            <InformationCircleIcon className="h-6 w-6 text-[#F56616]" />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Team Member Details
            </p>
            <h2 className="mt-1 break-words text-lg font-bold text-[#0A1F44]">
              {team.full_name}
            </h2>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="max-h-[24rem] space-y-4 overflow-y-auto p-4 sm:p-5">

        {/* Team Information */}
        <DetailSection title="Team Information">
          <DetailRow label="Company" value={team?.user_company} />
          <DetailRow label="Branch" value={team?.user_branch} />
          <DetailRow label="Mobile No" value={team?.mobile} />
          <DetailRow label="Email" value={team?.email} />
          <DetailRow label="Salary" value={team?.user_salary} />
          <DetailRow label="Address" value={team?.user_address} />
        </DetailSection>

        {/* Bank Details */}
        <DetailSection title="Bank Details">
          <DetailRow label="Bank" value={team?.user_bank} />
          <DetailRow label="Branch" value={team?.user_bank_branch} />
          <DetailRow label="IFSC Code" value={team?.user_ifsc_code} />
          <DetailRow label="Account No" value={team?.user_account_no} />
          <DetailRow label="Insurance" value={team?.user_insurance} />
          <DetailRow label="Insurance No" value={team?.user_insurance_no} />
        </DetailSection>

        {/* Attachments */}
        <DetailSection title="Attachments">
          {team?.user_image && (
            <DetailRow
              label="Photo"
              downloadUrl={`${TEAM_URL}/profiles/${team?.user_image}`}
            />
          )}

          {team?.user_adhar_card && (
            <DetailRow
              label="Aadhar Card"
              downloadUrl={`${TEAM_URL}/profiles_document/${team?.user_adhar_card}`}
            />
          )}

          {team?.user_pan_card && (
            <DetailRow
              label="Pan Card"
              downloadUrl={`${TEAM_URL}/profiles_document/${team?.user_pan_card}`}
            />
          )}

          {team?.user_passbook && (
            <DetailRow
              label="Passbook"
              downloadUrl={`${TEAM_URL}/profiles_document/${team?.user_passbook}`}
            />
          )}

          {team?.user_licence && (
            <DetailRow
              label="Licence"
              downloadUrl={`${TEAM_URL}/profiles_document/${team?.user_licence}`}
            />
          )}
        </DetailSection>
      </div>
    </div>
  );
};

export default ViewTeam;
