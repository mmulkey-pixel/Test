window.FRAMEWORK_DATA = window.FRAMEWORK_DATA || {};
FRAMEWORK_DATA["fisma"] = {
  domains: [
    { code: "AC",  name: "Access Control",                  icon: "🔐", color: "#1E40AF" },
    { code: "IA",  name: "Identification & Authentication", icon: "🪪", color: "#1E3A8A" },
    { code: "AU",  name: "Audit & Accountability",          icon: "📋", color: "#172554" },
    { code: "SI",  name: "System & Info Integrity",         icon: "🛡️", color: "#1D4ED8" },
  ],
  practices: [
    {
      id: "FISMA-AC-2(1)", domain: "Access Control", domainCode: "AC", tier: 2,
      description: "AC-2(1) Enhancement — Automated System Account Management: Automate the management of information system accounts through an automated mechanism.",
      modules: ["sso", "kpam"], coverage: "full",
      guidance: "Directory-driven automated account lifecycle management eliminates manual provisioning delays.",
      alignment: {
        sso: "SSO & Directory Integration automates account management through real-time directory synchronization — accounts are provisioned, updated, and deprovisioned automatically based on HR and directory events, satisfying the automation requirement of AC-2(1).",
        kpam: "KeeperPAM Core participates in automated account management through API-driven provisioning workflows — new privileged accounts are created and deprovisioned automatically based on defined triggers, eliminating manual account lifecycle steps."
      }
    },
    {
      id: "FISMA-AC-3", domain: "Access Control", domainCode: "AC", tier: 2,
      description: "AC-3 — Access Enforcement: Enforce approved authorizations for logical access to information and system resources in accordance with applicable access control policies.",
      modules: ["kpam"], coverage: "full",
      guidance: "KeeperPAM enforces RBAC authorization policies at every access attempt in real time.",
      alignment: {
        kpam: "KeeperPAM Core enforces approved access authorizations at the session level — each access attempt is evaluated against the user's defined permissions in real time, with unauthorized attempts blocked and logged."
      }
    },
    {
      id: "FISMA-AC-6(2)", domain: "Access Control", domainCode: "AC", tier: 2,
      description: "AC-6(2) Enhancement — Least Privilege: Non-Privileged Access for Non-Security Functions: Require users to use non-privileged accounts when accessing non-security functions.",
      modules: ["kpam"], coverage: "full",
      guidance: "KeeperPAM enforces privilege tiering — standard accounts by default, elevation only when required.",
      alignment: {
        kpam: "KeeperPAM Core enforces privilege tiering through JIT elevation — users operate under standard accounts by default and must explicitly request and justify privilege elevation for security functions, ensuring non-security tasks never use privileged credentials."
      }
    },
    {
      id: "FISMA-IA-2(1)", domain: "Identification & Authentication", domainCode: "IA", tier: 2,
      description: "IA-2(1) Enhancement — Network Access to Privileged Accounts: Implement MFA for network access to privileged accounts.",
      modules: ["kpm"], coverage: "full",
      guidance: "Keeper enforces MFA as a hard requirement for all privileged account network access.",
      alignment: {
        kpm: "Keeper Password Manager enforces MFA (FIDO2/WebAuthn, TOTP, or Duo) as a non-bypassable requirement for privileged vault access — administrators can require hardware-backed FIDO2 for the highest-privilege accounts."
      }
    },
    {
      id: "FISMA-IA-5(1)", domain: "Identification & Authentication", domainCode: "IA", tier: 2,
      description: "IA-5(1) Enhancement — Password-Based Authentication: Enforce minimum password complexity and change requirements; prohibit password reuse.",
      modules: ["kpm"], coverage: "full",
      guidance: "Keeper's centralized policy engine enforces all password quality requirements with breach detection.",
      alignment: {
        kpm: "Keeper Password Manager centrally enforces password complexity (length, character classes), rotation schedules, and reuse prohibition — all policies are administrator-defined and cannot be bypassed by end users, with breach-watch monitoring adding real-time compromise detection."
      }
    },
    {
      id: "FISMA-AU-2", domain: "Audit & Accountability", domainCode: "AU", tier: 2,
      description: "AU-2 — Event Logging: Identify the types of events that the system is capable of logging in support of the audit function; coordinate the event logging function with other organizations.",
      modules: ["reporting"], coverage: "full",
      guidance: "Comprehensive event catalog with SIEM integration supports the FISMA audit function.",
      alignment: {
        reporting: "Advanced Reporting & Alerts maintains a comprehensive audit event catalog — logging authentications, authorizations, credential accesses, session events, administrative actions, and policy changes — with SIEM integration for coordination with agency-wide audit infrastructure."
      }
    },
    {
      id: "FISMA-AU-9", domain: "Audit & Accountability", domainCode: "AU", tier: 2,
      description: "AU-9 — Protection of Audit Information: Protect audit information and audit tools from unauthorized access, modification, and deletion.",
      modules: ["reporting"], coverage: "full",
      guidance: "Tamper-evident audit log storage with role separation prevents unauthorized modification.",
      alignment: {
        reporting: "Advanced Reporting stores audit logs in tamper-evident, append-only infrastructure with strict role separation — audit records cannot be modified or deleted even by KeeperPAM administrators, and logs can be exported to immutable SIEM storage for additional protection."
      }
    },
    {
      id: "FISMA-SI-4", domain: "System & Info Integrity", domainCode: "SI", tier: 2,
      description: "SI-4 — System Monitoring: Monitor the system to detect attacks and indicators of potential attacks; identify unauthorized use of the system.",
      modules: ["reporting", "kcm"], coverage: "full",
      guidance: "Behavioral analytics and session monitoring provide continuous privileged access surveillance.",
      alignment: {
        reporting: "Advanced Reporting & Alerts monitors all KeeperPAM activity for attack indicators — detecting anomalous access patterns, failed authentication sequences, and unusual privilege elevation attempts with real-time alerting to security operations.",
        kcm: "Keeper Connection Manager monitors all privileged remote sessions for indicators of attack or unauthorized use, with session recording providing forensic-quality evidence for incident investigation."
      }
    },
    {
      id: "FISMA-AC-17", domain: "Access Control", domainCode: "AC", tier: 3,
      description: "AC-17 — Remote Access: Establish and document usage restrictions, configuration/connection requirements, and implementation guidance for each type of remote access allowed.",
      modules: ["kcm"], coverage: "full",
      guidance: "Connection Manager implements and enforces the documented remote access policy for privileged sessions.",
      alignment: {
        kcm: "Keeper Connection Manager serves as the technical implementation of the remote access policy — all configuration requirements, connection restrictions, and usage rules are enforced at the gateway level, with session recordings providing implementation documentation for FISMA assessors."
      }
    }
  ]
};
