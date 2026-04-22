window.FRAMEWORK_DATA = window.FRAMEWORK_DATA || {};
FRAMEWORK_DATA["iso27001"] = {
  domains: [
    { code: "A5", name: "Organizational Controls", icon: "🏛️", color: "#6D28D9" },
    { code: "A8", name: "Technological Controls",  icon: "⚙️",  color: "#5B21B6" },
  ],
  practices: [
    {
      id: "ISO-A.5.15", domain: "Organizational Controls", domainCode: "A5", tier: 1,
      description: "A.5.15 — Access control: Rules to control physical and logical access to information and other associated assets shall be established and implemented.",
      modules: ["kpam", "sso"], coverage: "full",
      guidance: "KeeperPAM implements access control rules through RBAC policies tied to authoritative directory identities.",
      alignment: {
        kpam: "KeeperPAM Core implements the access control rule framework required by A.5.15 — administrators define granular permission policies that control which users can access which systems, with policy enforcement automated and audited.",
        sso: "SSO & Directory Integration enforces access control rules at the identity level, binding KeeperPAM access policies to directory group memberships so that rule changes propagate automatically when roles are updated."
      }
    },
    {
      id: "ISO-A.5.16", domain: "Organizational Controls", domainCode: "A5", tier: 1,
      description: "A.5.16 — Identity management: The full lifecycle of identities shall be managed.",
      modules: ["sso", "kpm"], coverage: "full",
      guidance: "Directory-driven lifecycle management covers provisioning, modification, and deprovisioning.",
      alignment: {
        sso: "SSO & Directory Integration manages the complete identity lifecycle — provisioning new users from directory sources, updating access when roles change, and immediately deprovisioning identities upon termination or transfer.",
        kpm: "Keeper Password Manager participates in identity lifecycle management by automatically rotating shared credentials when identity changes occur, ensuring departed employees cannot retain access through previously known credentials."
      }
    },
    {
      id: "ISO-A.5.17", domain: "Organizational Controls", domainCode: "A5", tier: 1,
      description: "A.5.17 — Authentication information: Management of authentication information shall be controlled by a formal management process.",
      modules: ["kpm"], coverage: "full",
      guidance: "Centralized password policy engine governs the full lifecycle of authentication credentials.",
      alignment: {
        kpm: "Keeper Password Manager provides the formal management process for authentication information — centralized policy enforcement for complexity, rotation schedules, MFA requirements, and breach detection, with all changes logged and reportable."
      }
    },
    {
      id: "ISO-A.5.18", domain: "Organizational Controls", domainCode: "A5", tier: 1,
      description: "A.5.18 — Access rights: Access rights to information and other associated assets shall be provisioned, reviewed, modified, and removed.",
      modules: ["kpam"], coverage: "full",
      guidance: "Audited access rights lifecycle with JIT provisioning and time-bound session management.",
      alignment: {
        kpam: "KeeperPAM Core manages the full access rights lifecycle — provisioning rights through workflow-based requests, supporting periodic access reviews with reporting, and revoking access through automated deprovisioning or time-based JIT expiry."
      }
    },
    {
      id: "ISO-A.5.33", domain: "Organizational Controls", domainCode: "A5", tier: 1,
      description: "A.5.33 — Protection of records: Records shall be protected from loss, destruction, falsification, unauthorized access, and unauthorized release.",
      modules: ["reporting"], coverage: "full",
      guidance: "Tamper-evident audit log storage with role separation protects records from unauthorized modification.",
      alignment: {
        reporting: "Advanced Reporting & Alerts stores all audit records in tamper-evident, append-only infrastructure with role separation — administrators cannot delete or modify historical event records, and logs can be exported to immutable external storage for long-term retention."
      }
    },
    {
      id: "ISO-A.8.2", domain: "Technological Controls", domainCode: "A8", tier: 2,
      description: "A.8.2 — Privileged access rights: The allocation and use of privileged access rights shall be restricted and managed.",
      modules: ["kpam", "kcm"], coverage: "full",
      guidance: "JIT privilege elevation with session recording restricts and manages all privileged access.",
      alignment: {
        kpam: "KeeperPAM Core restricts privileged access rights through JIT provisioning — no standing privilege exists by default, and all privileged access requires explicit request, approval, and time-bounded elevation.",
        kcm: "Keeper Connection Manager records all privileged remote sessions with full video and keystroke capture, providing the management oversight and accountability required for privileged access rights under A.8.2."
      }
    },
    {
      id: "ISO-A.8.5", domain: "Technological Controls", domainCode: "A8", tier: 2,
      description: "A.8.5 — Secure authentication: Secure authentication technologies and procedures shall be implemented based on information access restrictions.",
      modules: ["kpm", "sso"], coverage: "full",
      guidance: "FIDO2, TOTP, and SSO federation provide risk-appropriate authentication for all access tiers.",
      alignment: {
        kpm: "Keeper Password Manager implements secure authentication through FIDO2/WebAuthn hardware keys, TOTP, and Duo MFA — providing strong authentication mechanisms that match the sensitivity of the protected systems.",
        sso: "SSO & Directory Integration delivers federated authentication via SAML 2.0 and OIDC, enabling centralized MFA enforcement and consistent secure authentication procedures across all KeeperPAM-protected systems."
      }
    },
    {
      id: "ISO-A.8.15", domain: "Technological Controls", domainCode: "A8", tier: 2,
      description: "A.8.15 — Logging: Logs that record activities, exceptions, faults, and other relevant events shall be produced, stored, protected, and analysed.",
      modules: ["reporting", "kcm"], coverage: "full",
      guidance: "Comprehensive event logging with tamper-evident storage and SIEM integration.",
      alignment: {
        reporting: "Advanced Reporting & Alerts produces comprehensive logs of all KeeperPAM activities, stores them in tamper-evident infrastructure, and provides analysis tools including anomaly detection, scheduled reports, and SIEM integration for centralized log analysis.",
        kcm: "Keeper Connection Manager generates session logs covering all privileged remote sessions — including video recordings, keystroke logs, and file transfer events — providing the detailed activity records required by A.8.15."
      }
    },
    {
      id: "ISO-A.8.16", domain: "Technological Controls", domainCode: "A8", tier: 2,
      description: "A.8.16 — Monitoring activities: Networks, systems, and applications shall be monitored for anomalous behaviour and appropriate actions taken to evaluate potential information security incidents.",
      modules: ["reporting"], coverage: "full",
      guidance: "Behavioral analytics with real-time alerting monitors privileged access for indicators of compromise.",
      alignment: {
        reporting: "Advanced Reporting & Alerts monitors all KeeperPAM activity for anomalous behavior — triggering real-time alerts on off-hours access, geographic impossibilities, high-volume credential retrievals, and other indicators of compromise, with SIEM integration for centralized security monitoring."
      }
    },
    {
      id: "ISO-A.8.24", domain: "Technological Controls", domainCode: "A8", tier: 2,
      description: "A.8.24 — Use of cryptography: Rules for the effective use of cryptography, including cryptographic key management, shall be defined and implemented.",
      modules: ["kpm", "ksm"], coverage: "full",
      guidance: "Zero-knowledge AES-256 encryption with client-side key management satisfies cryptography requirements.",
      alignment: {
        kpm: "Keeper Password Manager implements AES-256 encryption with PBKDF2 key derivation — cryptographic rules are defined and enforced at the platform level, with keys managed client-side in a zero-knowledge architecture.",
        ksm: "Keeper Secrets Manager provides cryptographic key management for application secrets and encryption keys, ensuring keys are stored, rotated, and delivered according to defined cryptographic policies."
      }
    }
  ]
};
