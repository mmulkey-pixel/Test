window.FRAMEWORK_DATA = window.FRAMEWORK_DATA || {};
FRAMEWORK_DATA["sox"] = {
  domains: [
    { code: "PC4", name: "Access Controls",    icon: "🔐", color: "#0891B2" },
    { code: "PC5", name: "Change Management",  icon: "🔄", color: "#0E7490" },
    { code: "PC6", name: "IT Operations",      icon: "⚙️",  color: "#155E75" },
  ],
  practices: [
    {
      id: "SOX-PC4.1", domain: "Access Controls", domainCode: "PC4", tier: 1,
      description: "PC4.1 — Logical Access Controls: Ensure only authorized individuals have access to systems, applications, and data supporting financial reporting.",
      modules: ["kpam", "sso"], coverage: "full",
      guidance: "KeeperPAM enforces authorized-only access to financial reporting systems with full audit trails.",
      alignment: {
        kpam: "KeeperPAM Core ensures only authorized individuals access systems supporting financial reporting through RBAC and JIT provisioning — unauthorized access attempts are blocked and logged for external auditor review.",
        sso: "SSO & Directory Integration ties access rights to authoritative directory identities — only users whose directory roles include financial system access receive KeeperPAM authorization, with changes propagating automatically."
      }
    },
    {
      id: "SOX-PC4.2", domain: "Access Controls", domainCode: "PC4", tier: 1,
      description: "PC4.2 — Privileged Access Management: Restrict and monitor privileged (administrator-level) access to systems and data that impact financial reporting.",
      modules: ["kpam", "kcm"], coverage: "full",
      guidance: "JIT privilege elevation and full session recording restrict and document all privileged access.",
      alignment: {
        kpam: "KeeperPAM Core restricts privileged access to financial reporting systems through JIT provisioning — administrators have no standing privileged access and must request time-bounded elevation, creating a clear approval and usage audit trail for SOX assessors.",
        kcm: "Keeper Connection Manager records all privileged remote sessions to financial systems with full keystroke and video capture — providing the session-level audit trail required for SOX privileged access monitoring."
      }
    },
    {
      id: "SOX-PC4.3", domain: "Access Controls", domainCode: "PC4", tier: 1,
      description: "PC4.3 — User Provisioning and Deprovisioning: Ensure access is granted based on approved requests and promptly removed when no longer required.",
      modules: ["sso", "kpam"], coverage: "full",
      guidance: "Workflow-based provisioning and automated deprovisioning create an auditable access lifecycle.",
      alignment: {
        sso: "SSO & Directory Integration automates provisioning from approved HR/directory events and immediately deprovisions access upon termination — creating a documented, auditable lifecycle trail for every user account.",
        kpam: "KeeperPAM Core supports SOX provisioning requirements through workflow-based access requests requiring documented approval — each grant and revocation is logged with approver identity and timestamp for external auditor evidence."
      }
    },
    {
      id: "SOX-PC4.4", domain: "Access Controls", domainCode: "PC4", tier: 1,
      description: "PC4.4 — Segregation of Duties: Ensure incompatible duties are separated to prevent a single individual from having end-to-end control over a financial process.",
      modules: ["kpam"], coverage: "full",
      guidance: "KeeperPAM supports separation of duties through dual-control approvals and role segregation.",
      alignment: {
        kpam: "KeeperPAM Core enforces separation of duties through dual-control access workflows — sensitive privileged operations require approval from a second authorized administrator, preventing any single individual from having unchecked end-to-end control over financial systems."
      }
    },
    {
      id: "SOX-PC4.5", domain: "Access Controls", domainCode: "PC4", tier: 1,
      description: "PC4.5 — Password Management: Enforce strong password policies for accounts with access to systems supporting financial reporting.",
      modules: ["kpm"], coverage: "full",
      guidance: "Centralized password policy engine enforces complexity, rotation, and uniqueness for financial system accounts.",
      alignment: {
        kpm: "Keeper Password Manager enforces strong password policies across all accounts with access to financial reporting systems — minimum complexity, rotation schedules, reuse prohibition, and MFA requirements are centrally managed and cannot be bypassed."
      }
    },
    {
      id: "SOX-PC5.1", domain: "Change Management", domainCode: "PC5", tier: 2,
      description: "PC5.1 — Change Management Audit Trail: Maintain audit trails of changes to systems and configurations supporting financial reporting.",
      modules: ["ksm", "reporting"], coverage: "full",
      guidance: "Secrets Manager tracks credential changes; Reporting provides complete change audit trails.",
      alignment: {
        ksm: "Keeper Secrets Manager maintains a versioned history of all credential and configuration changes for financial system service accounts — providing the change audit trail required for SOX assessors to verify that changes were authorized and documented.",
        reporting: "Advanced Reporting & Alerts captures all policy changes, access modifications, and administrative actions with timestamps and user attribution — providing external auditors with the complete change history for systems supporting financial reporting."
      }
    },
    {
      id: "SOX-PC4.6", domain: "Access Controls", domainCode: "PC4", tier: 1,
      description: "PC4.6 — Periodic Access Reviews: Conduct periodic reviews of user access rights to ensure appropriateness.",
      modules: ["reporting"], coverage: "full",
      guidance: "Access review reports support quarterly or annual user access certifications.",
      alignment: {
        reporting: "Advanced Reporting & Alerts generates access certification reports listing all users, their roles, and last-access dates for financial systems — providing the evidence base for periodic access reviews and enabling management sign-off for SOX Section 404 compliance."
      }
    }
  ]
};
