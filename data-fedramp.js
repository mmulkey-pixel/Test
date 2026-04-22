window.FRAMEWORK_DATA = window.FRAMEWORK_DATA || {};
FRAMEWORK_DATA["fedramp"] = {
  domains: [
    { code: "AC",  name: "Access Control",                  icon: "🔐", color: "#1D4ED8" },
    { code: "IA",  name: "Identification & Authentication", icon: "🪪", color: "#1E40AF" },
    { code: "AU",  name: "Audit & Accountability",          icon: "📋", color: "#1E3A8A" },
    { code: "SC",  name: "System & Comms Protection",       icon: "🌐", color: "#172554" },
  ],
  practices: [
    {
      id: "FED-AC-2", domain: "Access Control", domainCode: "AC", tier: 2,
      description: "AC-2 — Account Management: Manage information system accounts, including establishing, activating, modifying, reviewing, disabling, and removing accounts.",
      modules: ["sso", "kpam"], coverage: "full",
      guidance: "Directory-driven account lifecycle management with automated provisioning and deprovisioning.",
      alignment: {
        sso: "SSO & Directory Integration automates the full account lifecycle — creating accounts upon onboarding, adjusting permissions on role changes, and disabling accounts immediately upon termination or transfer, with all changes audited.",
        kpam: "KeeperPAM Core manages privileged account creation, modification, and removal through workflow-driven processes — supporting periodic account reviews with reporting and automated deprovisioning when accounts are no longer authorized."
      }
    },
    {
      id: "FED-AC-3", domain: "Access Control", domainCode: "AC", tier: 2,
      description: "AC-3 — Access Enforcement: Enforce approved authorizations for logical access to information and system resources.",
      modules: ["kpam"], coverage: "full",
      guidance: "KeeperPAM enforces access authorizations through RBAC with policy-driven session controls.",
      alignment: {
        kpam: "KeeperPAM Core enforces approved access authorizations at the session level — users cannot initiate connections or retrieve credentials for systems they are not explicitly authorized to access, with enforcement occurring in real time at each access attempt."
      }
    },
    {
      id: "FED-AC-6", domain: "Access Control", domainCode: "AC", tier: 2,
      description: "AC-6 — Least Privilege: Employ the principle of least privilege, allowing only authorized accesses for users which are necessary to accomplish assigned tasks.",
      modules: ["kpam", "kcm"], coverage: "full",
      guidance: "JIT privilege elevation eliminates standing access; Connection Manager restricts protocol-level capabilities.",
      alignment: {
        kpam: "KeeperPAM Core implements least privilege through JIT provisioning — users have no standing privileged access and must request time-bounded elevation for specific tasks, with access automatically revoked when the task window expires.",
        kcm: "Keeper Connection Manager enforces least privilege at the protocol level — restricting users to only the connection types (RDP, SSH, VNC) required for their specific role, preventing over-privileged remote access."
      }
    },
    {
      id: "FED-AC-17", domain: "Access Control", domainCode: "AC", tier: 2,
      description: "AC-17 — Remote Access: Establish and document usage restrictions, configuration/connection requirements, and implementation guidance for each type of remote access allowed.",
      modules: ["kcm"], coverage: "full",
      guidance: "Connection Manager provides the documented, controlled remote access gateway for all privileged sessions.",
      alignment: {
        kcm: "Keeper Connection Manager serves as the implementation of the remote access policy — all privileged remote connections are routed through the gateway, configuration requirements are enforced programmatically, and session recordings provide documentation of all remote access activity."
      }
    },
    {
      id: "FED-IA-2", domain: "Identification & Authentication", domainCode: "IA", tier: 2,
      description: "IA-2 — Identification and Authentication (Organizational Users): Uniquely identify and authenticate organizational users and processes acting on behalf of organizational users.",
      modules: ["kpm", "sso"], coverage: "full",
      guidance: "Unique directory identities with MFA provide the identification and authentication baseline.",
      alignment: {
        kpm: "Keeper Password Manager enforces unique credential policies and MFA (FIDO2, TOTP, Duo) at vault authentication, ensuring every user is uniquely identified and authenticated before accessing any vaulted credential.",
        sso: "SSO & Directory Integration provides the authoritative identification layer, binding unique directory identities to KeeperPAM sessions and enforcing organizational MFA requirements through SAML assertions."
      }
    },
    {
      id: "FED-IA-5", domain: "Identification & Authentication", domainCode: "IA", tier: 2,
      description: "IA-5 — Authenticator Management: Manage information system authenticators including establishing initial authenticator content, establishing administrative procedures for compromised authenticators.",
      modules: ["kpm", "ksm"], coverage: "full",
      guidance: "Centralized authenticator lifecycle management with automated rotation and breach detection.",
      alignment: {
        kpm: "Keeper Password Manager manages authenticator lifecycle — enforcing complexity policies, rotation schedules, and breach detection that alerts when a credential is found in known breach databases, enabling immediate remediation.",
        ksm: "Keeper Secrets Manager manages service account authenticators (API keys, certificates, tokens) with automated rotation, ensuring authenticators are refreshed before expiry and immediately upon compromise."
      }
    },
    {
      id: "FED-AU-2", domain: "Audit & Accountability", domainCode: "AU", tier: 2,
      description: "AU-2 — Event Logging: Identify the types of events that the system is capable of logging in support of the audit function.",
      modules: ["reporting"], coverage: "full",
      guidance: "Comprehensive event catalog covering all privileged access events across KeeperPAM modules.",
      alignment: {
        reporting: "Advanced Reporting & Alerts logs a comprehensive catalog of events including authentications, credential accesses, policy changes, session initiations and terminations, administrative actions, and failed access attempts — satisfying FedRAMP's AU-2 event type requirements."
      }
    },
    {
      id: "FED-AU-6", domain: "Audit & Accountability", domainCode: "AU", tier: 2,
      description: "AU-6 — Audit Record Review, Analysis, and Reporting: Review and analyze system audit records for indications of inappropriate or unusual activity.",
      modules: ["reporting"], coverage: "full",
      guidance: "Automated anomaly detection with SIEM integration supports continuous audit record analysis.",
      alignment: {
        reporting: "Advanced Reporting & Alerts provides automated audit record analysis with behavioral anomaly detection, scheduled report generation, and SIEM integration (Splunk, Sentinel, QRadar) — enabling continuous review of privileged access patterns for indications of inappropriate activity."
      }
    },
    {
      id: "FED-SC-28", domain: "System & Comms Protection", domainCode: "SC", tier: 2,
      description: "SC-28 — Protection of Information at Rest: The information system protects the confidentiality and integrity of information at rest.",
      modules: ["kpm", "ksm"], coverage: "full",
      guidance: "Zero-knowledge AES-256 encryption protects all vaulted credentials and secrets at rest.",
      alignment: {
        kpm: "Keeper Password Manager protects all vaulted credentials at rest with AES-256 zero-knowledge encryption — data is encrypted before it leaves the client device and Keeper's infrastructure has no ability to decrypt stored information.",
        ksm: "Keeper Secrets Manager protects all secrets at rest with AES-256 encryption and cryptographic integrity controls, ensuring FedRAMP systems' credentials and keys are protected at the storage layer."
      }
    },
    {
      id: "FED-IA-2(1)", domain: "Identification & Authentication", domainCode: "IA", tier: 3,
      description: "IA-2(1) Enhancement — Multi-Factor Authentication for privileged accounts: Implement MFA for access to privileged accounts.",
      modules: ["kpm", "kpam"], coverage: "full",
      guidance: "Keeper enforces hardware-backed FIDO2 or TOTP MFA for all privileged account access.",
      alignment: {
        kpm: "Keeper Password Manager enforces MFA (FIDO2/WebAuthn hardware keys or TOTP) as a mandatory requirement for privileged vault access — administrators can require stronger authenticator types for users with privileged roles.",
        kpam: "KeeperPAM Core requires MFA re-verification before granting any privileged session, creating an additional authentication checkpoint beyond the initial login to enforce the IA-2(1) enhancement."
      }
    }
  ]
};
