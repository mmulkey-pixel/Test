window.FRAMEWORK_DATA = window.FRAMEWORK_DATA || {};
FRAMEWORK_DATA["ncua"] = {
  domains: [
    { code: "IAM", name: "Identity & Access",    icon: "🔐", color: "#065F46" },
    { code: "AUD", name: "Audit & Monitoring",   icon: "📋", color: "#064E3B" },
    { code: "IR",  name: "Incident Response",    icon: "🚨", color: "#022C22" },
  ],
  practices: [
    {
      id: "NCUA-748B-AC1", domain: "Identity & Access", domainCode: "IAM", tier: 1,
      description: "Part 748 App B — Establish access controls to limit access to member information systems and data to authorized personnel only.",
      modules: ["kpam", "sso"], coverage: "full",
      guidance: "KeeperPAM enforces authorized-only access to member information systems through RBAC.",
      alignment: {
        kpam: "KeeperPAM Core implements the access control requirement by enforcing RBAC policies that limit access to member information systems to explicitly authorized personnel — every access attempt is evaluated and unauthorized requests are blocked and logged.",
        sso: "SSO & Directory Integration ensures only directory-authorized credit union employees can authenticate to KeeperPAM-protected member information systems, with access rights tied to role-based group memberships."
      }
    },
    {
      id: "NCUA-748B-AUTH", domain: "Identity & Access", domainCode: "IAM", tier: 1,
      description: "Examiner Guide — Implement multi-factor authentication for remote access and privileged account access to systems containing member information.",
      modules: ["kpm", "sso"], coverage: "full",
      guidance: "Keeper enforces MFA for all remote and privileged access to member information systems.",
      alignment: {
        kpm: "Keeper Password Manager enforces MFA (FIDO2/WebAuthn, TOTP, Duo) as a mandatory gate before any member system credential is accessible, satisfying the NCUA examiner guidance on remote access authentication.",
        sso: "SSO & Directory Integration enforces organizational MFA policies at the IdP level, ensuring MFA is completed before any authentication token grants access to KeeperPAM-protected systems."
      }
    },
    {
      id: "NCUA-748B-PAM", domain: "Identity & Access", domainCode: "IAM", tier: 1,
      description: "Examiner Guide — Manage and monitor privileged accounts, limiting standing privilege and ensuring privileged actions are attributable to individuals.",
      modules: ["kpam", "kcm"], coverage: "full",
      guidance: "JIT privilege elevation with session recording limits standing privilege and ensures accountability.",
      alignment: {
        kpam: "KeeperPAM Core eliminates standing privileged accounts through JIT provisioning — credit union administrators operate under standard accounts by default and request time-bounded elevation for specific maintenance tasks.",
        kcm: "Keeper Connection Manager records all privileged sessions to core banking and member systems with full keystroke and video capture, ensuring every privileged action is attributable to a specific individual for NCUA examiner review."
      }
    },
    {
      id: "NCUA-748B-AUDIT", domain: "Audit & Monitoring", domainCode: "AUD", tier: 2,
      description: "Examiner Guide — Maintain and review audit logs of access to systems containing member information.",
      modules: ["reporting", "kcm"], coverage: "full",
      guidance: "Comprehensive audit logs of all member system access with tamper-evident storage.",
      alignment: {
        reporting: "Advanced Reporting & Alerts maintains comprehensive audit logs of all access to KeeperPAM-protected member information systems — logs include user identity, timestamp, source, and action, and are stored in tamper-evident infrastructure for NCUA examiner review.",
        kcm: "Keeper Connection Manager generates session-level audit records for all privileged access to member systems, providing the detailed access logs required by NCUA examiners to verify appropriate system oversight."
      }
    },
    {
      id: "NCUA-748B-MON", domain: "Audit & Monitoring", domainCode: "AUD", tier: 2,
      description: "Examiner Guide — Implement monitoring capabilities to detect unauthorized access to member information and anomalous privileged account behavior.",
      modules: ["reporting"], coverage: "full",
      guidance: "Behavioral analytics detect unauthorized access and anomalous privileged activity in real time.",
      alignment: {
        reporting: "Advanced Reporting & Alerts provides behavioral anomaly detection for all member system access — triggering real-time alerts on off-hours access, geographic impossibilities, and unusual credential usage that may indicate unauthorized access or insider threat."
      }
    },
    {
      id: "NCUA-748B-VENDOR", domain: "Identity & Access", domainCode: "IAM", tier: 1,
      description: "Examiner Guide — Manage third-party and vendor access to credit union systems, ensuring access is limited, monitored, and revoked when no longer needed.",
      modules: ["kpm", "kcm"], coverage: "full",
      guidance: "Isolated credential vaults and monitored sessions manage vendor access to credit union systems.",
      alignment: {
        kpm: "Keeper Password Manager supports vendor access management through isolated credential vaults — vendors receive time-limited credentials through controlled sharing, with access automatically expiring and credentials rotated after vendor engagements end.",
        kcm: "Keeper Connection Manager routes all vendor remote sessions through the monitored gateway, recording all vendor activity for credit union oversight and enabling immediate session termination if suspicious behavior is detected."
      }
    },
    {
      id: "NCUA-748B-IR", domain: "Incident Response", domainCode: "IR", tier: 3,
      description: "Part 748 App A — Maintain and test an incident response program; report cybersecurity incidents to NCUA within required timeframes.",
      modules: ["reporting", "kpam"], coverage: "partial",
      guidance: "KeeperPAM provides rapid response capabilities and audit evidence for NCUA incident reporting.",
      alignment: {
        reporting: "Advanced Reporting & Alerts provides the event timelines and member data impact assessments required for NCUA incident reporting — audit logs identify the scope of unauthorized access to member information for the regulatory notification.",
        kpam: "KeeperPAM Core supports incident containment actions — immediate credential rotation, session termination, and access revocation — enabling rapid response to protect member information during a confirmed security incident."
      }
    }
  ]
};
