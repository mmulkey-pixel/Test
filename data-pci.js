window.FRAMEWORK_DATA = window.FRAMEWORK_DATA || {};
FRAMEWORK_DATA["pci-dss"] = {
  domains: [
    { code: "IAM",  name: "Identity & Access Management", icon: "🔐", color: "#059669" },
    { code: "AUTH", name: "Authentication",                icon: "🪪", color: "#047857" },
    { code: "LOG",  name: "Logging & Monitoring",          icon: "📋", color: "#0D9488" },
    { code: "POL",  name: "Policy & Risk",                 icon: "📜", color: "#065F46" },
  ],
  practices: [
    {
      id: "PCI-7.2.1", domain: "Identity & Access Management", domainCode: "IAM", tier: 1,
      description: "Req 7.2.1 — All user IDs and authentication factors have access privileges commensurate with their job function.",
      modules: ["kpam", "sso"], coverage: "full",
      guidance: "KeeperPAM enforces role-based access aligned to job function with directory-driven provisioning.",
      alignment: {
        kpam: "KeeperPAM Core defines permission sets that mirror job function roles, ensuring every user ID has only the access required for their specific responsibilities — with access reviewed and adjusted through an audited workflow.",
        sso: "SSO & Directory Integration syncs job role attributes from Active Directory or HR systems, automatically adjusting KeeperPAM permission sets when roles change and revoking access when personnel leave."
      }
    },
    {
      id: "PCI-7.2.2", domain: "Identity & Access Management", domainCode: "IAM", tier: 1,
      description: "Req 7.2.2 — Access to all system components is restricted based on least privilege.",
      modules: ["kpam"], coverage: "full",
      guidance: "JIT provisioning and standing privilege elimination enforce least-privilege access to CDE systems.",
      alignment: {
        kpam: "KeeperPAM Core eliminates standing privileged access to cardholder data environment systems — users receive time-bound JIT elevation only when needed, with access automatically revoked when the session ends or the time limit expires."
      }
    },
    {
      id: "PCI-8.2.1", domain: "Identity & Access Management", domainCode: "IAM", tier: 1,
      description: "Req 8.2.1 — All user IDs and associated authentication factors are managed through an account lifecycle process.",
      modules: ["kpm", "sso"], coverage: "full",
      guidance: "Directory sync manages the complete identity lifecycle from provisioning through deprovisioning.",
      alignment: {
        kpm: "Keeper Password Manager enforces unique credential policies for every user ID, preventing shared accounts and ensuring every authentication event in the CDE is attributable to a specific individual.",
        sso: "SSO & Directory Integration manages the full account lifecycle — provisioning users from HR/directory sources on onboarding and immediately revoking access on termination or role change."
      }
    },
    {
      id: "PCI-8.2.3", domain: "Identity & Access Management", domainCode: "IAM", tier: 1,
      description: "Req 8.2.3 — User accounts for terminated users are immediately removed or disabled.",
      modules: ["sso", "kpam"], coverage: "full",
      guidance: "Real-time directory sync propagates account disabling to all KeeperPAM-managed systems instantly.",
      alignment: {
        sso: "SSO & Directory Integration listens for deprovisioning events from Active Directory and LDAP, immediately invalidating authentication tokens and revoking KeeperPAM vault access for terminated users.",
        kpam: "KeeperPAM Core terminates any active privileged sessions for a deprovisioned user and removes their access to all vaulted credentials and connection targets without delay."
      }
    },
    {
      id: "PCI-8.3.6", domain: "Authentication", domainCode: "AUTH", tier: 1,
      description: "Req 8.3.6 — User passwords/passphrases meet a minimum length of at least 12 characters.",
      modules: ["kpm"], coverage: "full",
      guidance: "Keeper's centralized password policy engine enforces complexity and length requirements.",
      alignment: {
        kpm: "Keeper Password Manager's admin policy console enforces minimum password length (configurable to 12+ characters), required character classes, and prohibits dictionary words — policies apply to all stored credentials and cannot be bypassed by end users."
      }
    },
    {
      id: "PCI-8.3.9", domain: "Authentication", domainCode: "AUTH", tier: 1,
      description: "Req 8.3.9 — Passwords for service accounts are changed periodically or upon compromise.",
      modules: ["ksm"], coverage: "full",
      guidance: "Keeper Secrets Manager automates service account credential rotation on schedule or on demand.",
      alignment: {
        ksm: "Keeper Secrets Manager automates rotation of service account passwords, API keys, and database credentials on configurable schedules or immediately upon suspected compromise — ensuring no standing static credentials remain in CDE systems."
      }
    },
    {
      id: "PCI-8.4.2", domain: "Authentication", domainCode: "AUTH", tier: 1,
      description: "Req 8.4.2 — MFA is implemented for all access into the cardholder data environment (CDE).",
      modules: ["kpm", "sso"], coverage: "full",
      guidance: "Keeper enforces FIDO2, TOTP, and Duo MFA as a prerequisite for any CDE access.",
      alignment: {
        kpm: "Keeper Password Manager mandates MFA (FIDO2/WebAuthn, TOTP, Duo) at vault authentication, creating an enforced gate before any CDE credential can be retrieved or used.",
        sso: "SSO & Directory Integration enforces organizational MFA policies at the IdP level, ensuring MFA is satisfied before SAML assertions grant access to KeeperPAM-protected CDE systems."
      }
    },
    {
      id: "PCI-8.5.1", domain: "Authentication", domainCode: "AUTH", tier: 1,
      description: "Req 8.5.1 — MFA systems are implemented to prevent misuse and replay attacks.",
      modules: ["kpm"], coverage: "full",
      guidance: "Keeper uses FIDO2 and TOTP mechanisms that are inherently replay-resistant.",
      alignment: {
        kpm: "Keeper Password Manager supports FIDO2/WebAuthn hardware security keys that bind authentication to the specific origin and device, and TOTP codes that are time-limited and single-use — both are inherently resistant to phishing and replay attacks."
      }
    },
    {
      id: "PCI-10.2.1", domain: "Logging & Monitoring", domainCode: "LOG", tier: 2,
      description: "Req 10.2.1 — Audit logs capture all individual user access to cardholder data.",
      modules: ["reporting", "kcm"], coverage: "full",
      guidance: "Every credential access and privileged session is logged with user identity and timestamp.",
      alignment: {
        reporting: "Advanced Reporting & Alerts captures every vault access event, credential retrieval, and administrative action with user identity, timestamp, and source IP — providing the complete audit trail required for PCI DSS compliance.",
        kcm: "Keeper Connection Manager logs every privileged session to CDE systems including session duration, commands executed, files transferred, and the authenticated user identity."
      }
    },
    {
      id: "PCI-10.3.3", domain: "Logging & Monitoring", domainCode: "LOG", tier: 2,
      description: "Req 10.3.3 — Audit logs are protected from destruction and modifications.",
      modules: ["reporting"], coverage: "full",
      guidance: "Keeper's audit log infrastructure uses tamper-evident storage that cannot be modified by end users.",
      alignment: {
        reporting: "Advanced Reporting stores audit logs in tamper-evident, append-only storage with role separation ensuring that even KeeperPAM administrators cannot modify or delete historical event records — logs can be exported to immutable SIEM storage for additional protection."
      }
    },
    {
      id: "PCI-10.7.1", domain: "Logging & Monitoring", domainCode: "LOG", tier: 2,
      description: "Req 10.7.1 — Failures of critical security controls are detected, reported, and responded to promptly.",
      modules: ["reporting"], coverage: "full",
      guidance: "Real-time alerting on security control failures with SIEM integration for automated response.",
      alignment: {
        reporting: "Advanced Reporting & Alerts sends real-time notifications via email, webhook, and SIEM integration when security controls fail — including MFA bypass attempts, policy violations, and anomalous access patterns that indicate a potential control failure."
      }
    },
    {
      id: "PCI-12.3.4", domain: "Policy & Risk", domainCode: "POL", tier: 3,
      description: "Req 12.3.4 — Hardware and software are reviewed annually to confirm they continue to receive security fixes.",
      modules: ["reporting"], coverage: "partial",
      guidance: "Keeper's reporting provides credential and access hygiene data to support annual reviews.",
      alignment: {
        reporting: "Advanced Reporting generates credential security reports and access hygiene dashboards that support annual reviews of security control effectiveness — organizations should supplement with dedicated vulnerability management tools for hardware/software inventory."
      }
    }
  ]
};
