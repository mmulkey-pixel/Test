window.FRAMEWORK_DATA = window.FRAMEWORK_DATA || {};
FRAMEWORK_DATA["cis"] = {
  domains: [
    { code: "CIS5", name: "Account Management",         icon: "👤", color: "#D97706" },
    { code: "CIS6", name: "Access Control Management",  icon: "🔐", color: "#B45309" },
    { code: "CIS8", name: "Audit Log Management",       icon: "📋", color: "#92400E" },
  ],
  practices: [
    {
      id: "CIS-5.2", domain: "Account Management", domainCode: "CIS5", tier: 1,
      description: "CIS 5.2 — Use unique passwords: Use unique passwords for all enterprise assets, ensure passwords are not reused across accounts.",
      modules: ["kpm"], coverage: "full",
      guidance: "Keeper Password Manager generates and enforces unique passwords for every account.",
      alignment: {
        kpm: "Keeper Password Manager generates unique, high-entropy passwords for every account and enforces policies that prevent reuse — eliminating the credential stuffing risk that shared or reused passwords create."
      }
    },
    {
      id: "CIS-5.3", domain: "Account Management", domainCode: "CIS5", tier: 1,
      description: "CIS 5.3 — Disable dormant accounts: Delete or disable any dormant accounts after a period of inactivity.",
      modules: ["sso", "kpam"], coverage: "full",
      guidance: "Directory sync automatically disables dormant accounts; KeeperPAM reports on inactive privileged accounts.",
      alignment: {
        sso: "SSO & Directory Integration propagates account disabling from Active Directory to KeeperPAM — dormant accounts identified through HR or directory processes are immediately removed from KeeperPAM access.",
        kpam: "KeeperPAM Core's reporting identifies privileged accounts with extended periods of inactivity, supporting the dormant account review process required by CIS Control 5.3."
      }
    },
    {
      id: "CIS-5.4", domain: "Account Management", domainCode: "CIS5", tier: 1,
      description: "CIS 5.4 — Restrict Administrator Privileges to Dedicated Administrator Accounts: Ensure administrator accounts are used exclusively for administrative tasks.",
      modules: ["kpam", "kcm"], coverage: "full",
      guidance: "Privilege tiering and JIT elevation ensure admin accounts are used only for admin tasks.",
      alignment: {
        kpam: "KeeperPAM Core enforces privilege tiering — administrators use standard accounts for day-to-day work and must explicitly elevate to their privileged account for administrative tasks, with JIT provisioning creating a clear separation between standard and admin use.",
        kcm: "Keeper Connection Manager logs all privileged session initiations, providing evidence that administrator accounts are used only for approved administrative functions."
      }
    },
    {
      id: "CIS-5.5", domain: "Account Management", domainCode: "CIS5", tier: 2,
      description: "CIS 5.5 — Establish and maintain an inventory of service accounts: Review service accounts quarterly, or more frequently.",
      modules: ["ksm"], coverage: "full",
      guidance: "Keeper Secrets Manager maintains a complete, auditable inventory of all service account credentials.",
      alignment: {
        ksm: "Keeper Secrets Manager provides a centralized inventory of all service account credentials, API keys, and tokens — enabling quarterly reviews of service account usage, identifying dormant service accounts, and supporting immediate rotation when accounts are no longer needed."
      }
    },
    {
      id: "CIS-6.1", domain: "Access Control Management", domainCode: "CIS6", tier: 1,
      description: "CIS 6.1 — Establish an Access Granting Process: Establish and follow a process for granting access to enterprise assets upon new hire, rights grant, or role change.",
      modules: ["kpam", "sso"], coverage: "full",
      guidance: "Workflow-based access provisioning with directory-driven automation satisfies CIS 6.1.",
      alignment: {
        kpam: "KeeperPAM Core implements the access granting process through documented, workflow-based access requests — every grant requires approval, is logged with approver identity and timestamp, and is tied to a specific business justification.",
        sso: "SSO & Directory Integration automates access granting by triggering KeeperPAM provisioning from directory events — new hires receive appropriate access based on their role group without manual steps."
      }
    },
    {
      id: "CIS-6.4", domain: "Access Control Management", domainCode: "CIS6", tier: 2,
      description: "CIS 6.4 — Require MFA for externally-exposed applications: Require all externally-exposed enterprise applications to use MFA.",
      modules: ["kpm", "sso"], coverage: "full",
      guidance: "Keeper enforces MFA for all external access to applications protected by KeeperPAM.",
      alignment: {
        kpm: "Keeper Password Manager mandates MFA for all vault access — since externally-exposed application credentials are stored in the vault, MFA is a required gate before any external application credential can be accessed.",
        sso: "SSO & Directory Integration enforces MFA at the federation layer for all externally-exposed applications using SAML or OIDC, ensuring MFA is consistently applied regardless of which device or network the user is accessing from."
      }
    },
    {
      id: "CIS-6.5", domain: "Access Control Management", domainCode: "CIS6", tier: 2,
      description: "CIS 6.5 — Require MFA for Remote Network Access: Require MFA for all remote network access.",
      modules: ["kcm", "kpm"], coverage: "full",
      guidance: "MFA is enforced at the Connection Manager gateway for all privileged remote network access.",
      alignment: {
        kcm: "Keeper Connection Manager enforces MFA at the remote access gateway — all users must complete MFA before any privileged remote session is permitted, satisfying CIS 6.5 at the network access layer.",
        kpm: "Keeper Password Manager provides the MFA factor (FIDO2, TOTP, or Duo) used at the Connection Manager gateway, with the authentication event logged for compliance reporting."
      }
    },
    {
      id: "CIS-8.2", domain: "Audit Log Management", domainCode: "CIS8", tier: 1,
      description: "CIS 8.2 — Collect audit logs: Collect audit logs, ensure audit logs are not deleted or modified, and retain logs based on the enterprise's compliance requirements.",
      modules: ["reporting", "kcm"], coverage: "full",
      guidance: "Tamper-evident audit log collection with configurable retention satisfies CIS 8.2.",
      alignment: {
        reporting: "Advanced Reporting & Alerts collects comprehensive audit logs from all KeeperPAM modules, stores them in tamper-evident infrastructure that prevents deletion or modification, and supports configurable retention periods to meet compliance requirements.",
        kcm: "Keeper Connection Manager contributes privileged session logs — including video recordings, keystroke logs, and metadata — to the audit log collection, providing granular access records for security investigations."
      }
    },
    {
      id: "CIS-6.8", domain: "Access Control Management", domainCode: "CIS6", tier: 3,
      description: "CIS 6.8 — Define and Maintain Role-Based Access Control: Define access requirements for each of the enterprise's roles and groups.",
      modules: ["kpam", "sso"], coverage: "full",
      guidance: "Keeper's RBAC framework defines and enforces role-based access control aligned to enterprise roles.",
      alignment: {
        kpam: "KeeperPAM Core implements role-based access control through configurable permission sets aligned to enterprise roles — access requirements are defined per role and consistently enforced, with changes propagating automatically when users change roles.",
        sso: "SSO & Directory Integration maps enterprise directory groups to KeeperPAM permission sets, ensuring that role-based access control is driven by authoritative group membership and updated automatically."
      }
    }
  ]
};
