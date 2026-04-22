window.FRAMEWORK_DATA = window.FRAMEWORK_DATA || {};
FRAMEWORK_DATA["cmmc"] = {
  domains: [
    { code: "AC",  name: "Access Control",                  icon: "🔐", color: "#0057FF" },
    { code: "IA",  name: "Identification & Authentication", icon: "🪪", color: "#7C3AED" },
    { code: "AU",  name: "Audit & Accountability",          icon: "📋", color: "#059669" },
    { code: "SC",  name: "System & Comms Protection",       icon: "🌐", color: "#DC2626" },
    { code: "SI",  name: "System & Info Integrity",         icon: "🛡️", color: "#0891B2" },
    { code: "PS",  name: "Personnel Security",              icon: "👤", color: "#0D9488" },
    { code: "CM",  name: "Configuration Management",        icon: "⚙️", color: "#D97706" },
  ],
  practices: [
    {
      id: "AC.L1-3.1.1", domain: "Access Control", domainCode: "AC", tier: 1,
      description: "Limit system access to authorized users, processes acting on behalf of authorized users, and devices.",
      modules: ["kpam", "sso", "kpm"], coverage: "full",
      guidance: "KeeperPAM enforces access boundaries through RBAC and JIT provisioning tied to directory identities.",
      alignment: {
        kpam: "KeeperPAM Core enforces granular role-based permission sets so users can only reach the specific systems they are explicitly authorized to access, with JIT provisioning automatically revoking access when sessions end.",
        sso: "SSO & Directory Integration federates identity from Active Directory or LDAP, ensuring only directory-verified users gain entry and that account disabling in the directory immediately propagates to KeeperPAM.",
        kpm: "Keeper Password Manager restricts credential visibility through encrypted sharing policies — users see only the credentials they are explicitly authorized to access, with every view event logged."
      }
    },
    {
      id: "AC.L1-3.1.2", domain: "Access Control", domainCode: "AC", tier: 1,
      description: "Limit system access to the types of transactions and functions that authorized users are permitted to execute.",
      modules: ["kpam", "kcm"], coverage: "full",
      guidance: "KeeperPAM Core defines per-user permission sets; Connection Manager restricts available protocols per session.",
      alignment: {
        kpam: "KeeperPAM Core maps each user to specific allowed actions and systems, preventing lateral movement to systems or functions outside their defined scope.",
        kcm: "Keeper Connection Manager restricts which protocols (RDP, SSH, VNC, Kubernetes) each user may invoke, ensuring access is limited to only the connection types required for their role."
      }
    },
    {
      id: "AC.L2-3.1.5", domain: "Access Control", domainCode: "AC", tier: 2,
      description: "Employ the principle of least privilege, including for specific security functions and privileged accounts.",
      modules: ["kpam", "kcm", "ksm"], coverage: "full",
      guidance: "Just-in-time privilege elevation with time-bound sessions ensures standing privilege is eliminated.",
      alignment: {
        kpam: "KeeperPAM Core provides JIT privilege elevation — users operate under standard accounts by default and must request time-bound privileged access, which is automatically revoked on expiry.",
        kcm: "Keeper Connection Manager enforces protocol-level restrictions per user, preventing over-privileged remote sessions even when system-level access has been approved.",
        ksm: "Keeper Secrets Manager rotates service account credentials after each use, eliminating standing privileged credentials that could be exploited if compromised."
      }
    },
    {
      id: "AC.L2-3.1.12", domain: "Access Control", domainCode: "AC", tier: 2,
      description: "Monitor and control remote access sessions.",
      modules: ["kcm", "reporting"], coverage: "full",
      guidance: "Full session recording with live monitoring and real-time session termination capability.",
      alignment: {
        kcm: "Keeper Connection Manager records full session video, keystroke logs, and metadata for every privileged remote session, with administrators able to observe live sessions and terminate them instantly if suspicious activity is detected.",
        reporting: "Advanced Reporting & Alerts aggregates remote session data, triggers alerts on anomalous access patterns, and exports session records to SIEM platforms for long-term monitoring."
      }
    },
    {
      id: "AC.L2-3.1.14", domain: "Access Control", domainCode: "AC", tier: 2,
      description: "Route remote access via managed access control points.",
      modules: ["kcm"], coverage: "full",
      guidance: "Connection Manager acts as the sole gateway — no direct, unmonitored access to privileged infrastructure.",
      alignment: {
        kcm: "Keeper Connection Manager is the centralized access control point for all privileged remote connections — administrators remove direct SSH/RDP exposure so every session flows through the monitored, encrypted gateway."
      }
    },
    {
      id: "IA.L1-3.5.1", domain: "Identification & Authentication", domainCode: "IA", tier: 1,
      description: "Identify information system users, processes acting on behalf of users, or devices.",
      modules: ["sso", "kpm"], coverage: "full",
      guidance: "Directory integration enforces unique identity; Password Manager eliminates shared credentials.",
      alignment: {
        sso: "SSO & Directory Integration uniquely identifies every user via directory attributes and device certificates, ensuring no anonymous or shared-account access reaches KeeperPAM-protected systems.",
        kpm: "Keeper Password Manager enforces unique credentials per service account and application, eliminating shared passwords that obscure individual user identity in audit logs."
      }
    },
    {
      id: "IA.L1-3.5.2", domain: "Identification & Authentication", domainCode: "IA", tier: 1,
      description: "Authenticate (or verify) the identities of those users, processes, or devices as a prerequisite to allowing access.",
      modules: ["sso", "kpm", "kpam"], coverage: "full",
      guidance: "Multi-layer authentication through SSO federation, MFA, and KeeperPAM identity gates.",
      alignment: {
        sso: "SSO & Directory Integration verifies identity against trusted IdPs (SAML 2.0, OIDC) before any access token is issued, rejecting unauthenticated requests at the perimeter.",
        kpm: "Keeper Password Manager enforces MFA (TOTP, FIDO2, Duo) at vault login, adding an authentication gate before any stored credential is accessible.",
        kpam: "KeeperPAM Core requires verified identity before granting any privileged session, and supports step-up authentication for sensitive targets."
      }
    },
    {
      id: "IA.L2-3.5.3", domain: "Identification & Authentication", domainCode: "IA", tier: 2,
      description: "Use multifactor authentication for local and network access to privileged accounts and for network access to non-privileged accounts.",
      modules: ["kpm", "sso", "kpam"], coverage: "full",
      guidance: "Keeper enforces FIDO2, TOTP, and Duo MFA for all privileged and standard account access.",
      alignment: {
        kpm: "Keeper Password Manager enforces configurable MFA policies (TOTP, FIDO2/WebAuthn hardware keys, Duo, SMS) for every user at vault login, with admins able to mandate stronger factors for privileged users.",
        sso: "SSO & Directory Integration propagates organizational MFA requirements through SAML assertions, ensuring MFA is enforced at the identity provider level before KeeperPAM grants any access.",
        kpam: "KeeperPAM Core requires MFA re-verification before initiating any privileged session, adding an additional authentication checkpoint beyond the initial login."
      }
    },
    {
      id: "IA.L2-3.5.7", domain: "Identification & Authentication", domainCode: "IA", tier: 2,
      description: "Enforce a minimum password complexity and change requirements.",
      modules: ["kpm"], coverage: "full",
      guidance: "Keeper's policy engine centrally enforces complexity rules and rotation schedules.",
      alignment: {
        kpm: "Keeper Password Manager's admin console enforces configurable complexity policies (minimum length, character classes, special characters) and rotation schedules that users cannot bypass, with policy violations flagged in the compliance dashboard."
      }
    },
    {
      id: "IA.L2-3.5.10", domain: "Identification & Authentication", domainCode: "IA", tier: 2,
      description: "Store and transmit only cryptographically-protected passwords.",
      modules: ["kpm"], coverage: "full",
      guidance: "Zero-knowledge AES-256 encryption ensures passwords are never stored or transmitted in plaintext.",
      alignment: {
        kpm: "Keeper Password Manager uses a zero-knowledge, AES-256 encrypted vault architecture where passwords are encrypted client-side before transmission — plaintext credentials never leave the user's device or touch Keeper's servers."
      }
    },
    {
      id: "AU.L2-3.3.1", domain: "Audit & Accountability", domainCode: "AU", tier: 2,
      description: "Create and retain system audit logs and records to enable monitoring, analysis, investigation, and reporting.",
      modules: ["reporting", "kcm"], coverage: "full",
      guidance: "Tamper-evident audit logs with SIEM integration cover all privileged access events.",
      alignment: {
        reporting: "Advanced Reporting & Alerts maintains comprehensive, tamper-evident audit logs for all Keeper events (logins, credential accesses, sharing, policy changes), with configurable retention and SIEM export via syslog or webhook.",
        kcm: "Keeper Connection Manager records full session video, keystroke logs, and file transfer metadata for every privileged remote session, providing forensic-quality records for investigations."
      }
    },
    {
      id: "AU.L2-3.3.2", domain: "Audit & Accountability", domainCode: "AU", tier: 2,
      description: "Ensure that the actions of individual users can be traced to those users so they can be held accountable.",
      modules: ["reporting", "kcm"], coverage: "full",
      guidance: "Every action is tied to an authenticated identity — session recordings create irrefutable user attribution.",
      alignment: {
        reporting: "Advanced Reporting correlates every event to the authenticated user identity, producing non-repudiable records that map specific actions to specific individuals across all KeeperPAM modules.",
        kcm: "Keeper Connection Manager records session activity under the authenticated user's identity — even when shared service accounts are used, the initiating human identity is preserved in the audit trail."
      }
    },
    {
      id: "SC.L2-3.13.8", domain: "System & Comms Protection", domainCode: "SC", tier: 2,
      description: "Implement cryptographic mechanisms to prevent unauthorized disclosure of CUI during transmission.",
      modules: ["kpm", "kcm", "ksm"], coverage: "full",
      guidance: "AES-256 encryption with TLS 1.2+ protects all data in transit across Keeper's platform.",
      alignment: {
        kpm: "Keeper Password Manager transmits all credential data using AES-256 encryption over TLS 1.3, with zero-knowledge architecture ensuring end-to-end protection even in transit through Keeper infrastructure.",
        kcm: "Keeper Connection Manager encrypts all remote session traffic (RDP, SSH, VNC) using TLS 1.3, preventing interception of session data between the user's browser and the target system.",
        ksm: "Keeper Secrets Manager delivers secrets to applications over encrypted API channels, ensuring credentials for CUI-adjacent systems are never transmitted in plaintext."
      }
    },
    {
      id: "SC.L2-3.13.16", domain: "System & Comms Protection", domainCode: "SC", tier: 2,
      description: "Protect the confidentiality of CUI at rest.",
      modules: ["kpm", "ksm"], coverage: "full",
      guidance: "Zero-knowledge AES-256 encryption ensures all stored data is protected at rest.",
      alignment: {
        kpm: "Keeper Password Manager stores all vault data with AES-256 encryption at rest, with keys derived from the user's master password using PBKDF2 — Keeper employees have zero ability to decrypt stored data.",
        ksm: "Keeper Secrets Manager encrypts all secrets at rest using AES-256 in a zero-knowledge architecture, ensuring CUI-related credentials and keys remain protected even in the cloud."
      }
    },
    {
      id: "SI.L2-3.14.6", domain: "System & Info Integrity", domainCode: "SI", tier: 2,
      description: "Monitor organizational systems to detect attacks and indicators of potential attacks.",
      modules: ["reporting", "kcm"], coverage: "full",
      guidance: "Behavioral analytics and session monitoring detect anomalous privileged access in real time.",
      alignment: {
        reporting: "Advanced Reporting & Alerts provides behavioral analytics on privileged access patterns, triggering real-time alerts on anomalies such as off-hours access, geographic impossibilities, or high-volume credential retrievals.",
        kcm: "Keeper Connection Manager monitors all privileged session traffic for suspicious commands or file transfers, with alerts configurable to fire on defined patterns such as bulk data exfiltration attempts."
      }
    },
    {
      id: "SI.L2-3.14.7", domain: "System & Info Integrity", domainCode: "SI", tier: 2,
      description: "Identify unauthorized use of organizational systems.",
      modules: ["reporting", "kpam"], coverage: "full",
      guidance: "KeeperPAM detects unauthorized access attempts and credential sharing violations in real time.",
      alignment: {
        reporting: "Advanced Reporting identifies unauthorized use through anomaly detection, failed login correlation, and unusual access pattern alerts, with events exportable to SIEM for centralized security monitoring.",
        kpam: "KeeperPAM Core detects and blocks unauthorized privilege escalation attempts and logs all denied requests, providing clear evidence of unauthorized access attempts for incident investigation."
      }
    },
    {
      id: "PS.L2-3.9.2", domain: "Personnel Security", domainCode: "PS", tier: 2,
      description: "Ensure that CUI is protected during and after personnel actions such as terminations and transfers.",
      modules: ["kpam", "sso", "kpm"], coverage: "full",
      guidance: "Directory sync instantly revokes all access on termination; shared credentials are auto-rotated.",
      alignment: {
        kpam: "KeeperPAM Core is synchronized with the organization's directory, so when an employee is terminated, all their privileged sessions are immediately terminated and JIT access is revoked.",
        sso: "SSO & Directory Integration propagates deprovisioning events from Active Directory or LDAP in real time, ensuring terminated users cannot re-authenticate to any KeeperPAM-protected system.",
        kpm: "Keeper Password Manager supports automatic credential rotation for shared vaults upon personnel changes, ensuring departing employees cannot retain access to credentials they previously used."
      }
    }
  ]
};
