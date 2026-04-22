window.FRAMEWORK_DATA = window.FRAMEWORK_DATA || {};
FRAMEWORK_DATA["soc2"] = {
  domains: [
    { code: "CC6", name: "Logical Access Controls", icon: "🔐", color: "#9333EA" },
    { code: "CC7", name: "System Operations",       icon: "📊", color: "#7C3AED" },
    { code: "CC9", name: "Risk Mitigation",         icon: "🛡️", color: "#6D28D9" },
  ],
  practices: [
    {
      id: "SOC2-CC6.1", domain: "Logical Access Controls", domainCode: "CC6", tier: 1,
      description: "CC6.1 — The entity implements logical access security software, infrastructure, and architectures over protected information assets to protect them from security events.",
      modules: ["kpam", "sso"], coverage: "full",
      guidance: "KeeperPAM enforces zero-trust logical access architecture with directory-driven identity verification.",
      alignment: {
        kpam: "KeeperPAM Core provides the logical access security architecture for privileged systems — enforcing role-based controls, JIT provisioning, and session isolation that prevent unauthorized access to protected information assets.",
        sso: "SSO & Directory Integration implements the identity verification layer, ensuring only authenticated, directory-managed identities receive access tokens for KeeperPAM-protected systems."
      }
    },
    {
      id: "SOC2-CC6.2", domain: "Logical Access Controls", domainCode: "CC6", tier: 1,
      description: "CC6.2 — Prior to issuing system credentials and granting system access, the entity registers and authorizes new internal and external users.",
      modules: ["sso", "kpam"], coverage: "full",
      guidance: "Access provisioning workflows require authorization before credentials are issued.",
      alignment: {
        sso: "SSO & Directory Integration gates credential issuance behind directory-managed group membership and role assignments — access is only provisioned after the identity is registered and authorized in the source directory.",
        kpam: "KeeperPAM Core requires explicit administrative authorization before any new user can access vaulted credentials or initiate privileged sessions, supporting formal access request and approval workflows."
      }
    },
    {
      id: "SOC2-CC6.3", domain: "Logical Access Controls", domainCode: "CC6", tier: 1,
      description: "CC6.3 — The entity authorizes, modifies, or removes access to data, software, functions, and other protected information assets based on approved access requests.",
      modules: ["kpam"], coverage: "full",
      guidance: "Workflow-based access modifications with audit trails satisfy SOC 2 access change requirements.",
      alignment: {
        kpam: "KeeperPAM Core provides audited workflows for access grants, modifications, and revocations — every change to user access rights generates an immutable log entry with the approver identity, timestamp, and justification."
      }
    },
    {
      id: "SOC2-CC6.6", domain: "Logical Access Controls", domainCode: "CC6", tier: 1,
      description: "CC6.6 — The entity implements logical access security measures to protect against threats from sources outside its system boundaries.",
      modules: ["kcm", "kpm"], coverage: "full",
      guidance: "Connection Manager routes all external privileged access through a monitored, encrypted gateway.",
      alignment: {
        kcm: "Keeper Connection Manager acts as the secure perimeter gateway for all external privileged access — eliminating direct exposure of sensitive systems to external networks and routing all traffic through an audited, encrypted tunnel.",
        kpm: "Keeper Password Manager protects external access credentials with zero-knowledge encryption, ensuring that even if an external network is compromised, vaulted credentials cannot be extracted."
      }
    },
    {
      id: "SOC2-CC6.7", domain: "Logical Access Controls", domainCode: "CC6", tier: 1,
      description: "CC6.7 — The entity restricts the transmission, movement, and removal of information to authorized internal and external users and processes.",
      modules: ["kcm", "kpm"], coverage: "full",
      guidance: "Encrypted transmission controls and file transfer restrictions limit unauthorized data movement.",
      alignment: {
        kcm: "Keeper Connection Manager controls and logs all file transfers during privileged sessions, with administrators able to restrict or disable file transfer capabilities per connection target to prevent unauthorized data exfiltration.",
        kpm: "Keeper Password Manager restricts credential sharing to explicitly authorized users through encrypted sharing policies — credentials cannot be transmitted outside the vault except to users with explicit share permissions."
      }
    },
    {
      id: "SOC2-CC7.1", domain: "System Operations", domainCode: "CC7", tier: 2,
      description: "CC7.1 — To meet its objectives, the entity uses detection and monitoring procedures to identify changes to configurations or the environment.",
      modules: ["reporting", "kcm"], coverage: "full",
      guidance: "Behavioral analytics and session monitoring detect configuration changes and anomalous activity.",
      alignment: {
        reporting: "Advanced Reporting & Alerts monitors for configuration changes and access anomalies across the KeeperPAM platform, triggering real-time alerts when policy changes, new admin accounts, or unusual access patterns are detected.",
        kcm: "Keeper Connection Manager monitors privileged sessions for indicators of configuration tampering — such as unauthorized command sequences or attempts to modify system settings — and logs all activity for post-incident analysis."
      }
    },
    {
      id: "SOC2-CC7.2", domain: "System Operations", domainCode: "CC7", tier: 2,
      description: "CC7.2 — The entity monitors system components and the operation of those components for anomalies that are indicative of malicious acts, natural disasters, and errors.",
      modules: ["reporting"], coverage: "full",
      guidance: "Real-time anomaly detection alerts on suspicious privileged access patterns.",
      alignment: {
        reporting: "Advanced Reporting & Alerts provides anomaly detection for privileged access behavior — flagging unusual login times, geographic anomalies, high-volume credential accesses, and other indicators of compromise with real-time notifications to security teams."
      }
    },
    {
      id: "SOC2-CC7.4", domain: "System Operations", domainCode: "CC7", tier: 2,
      description: "CC7.4 — The entity responds to identified security incidents by executing a defined incident-response program.",
      modules: ["reporting", "kpam"], coverage: "partial",
      guidance: "KeeperPAM supports incident response with rapid credential rotation and session termination capabilities.",
      alignment: {
        reporting: "Advanced Reporting & Alerts provides incident documentation with complete event timelines, user attribution, and exportable evidence packages for security incident investigation and regulatory reporting.",
        kpam: "KeeperPAM Core supports incident containment by enabling immediate credential rotation, active session termination, and emergency access revocation — reducing attacker dwell time during a confirmed incident."
      }
    },
    {
      id: "SOC2-CC9.2", domain: "Risk Mitigation", domainCode: "CC9", tier: 3,
      description: "CC9.2 — The entity assesses and manages risks associated with vendors and business partners.",
      modules: ["kpm"], coverage: "partial",
      guidance: "Keeper supports vendor access management through isolated credential vaults and session monitoring.",
      alignment: {
        kpm: "Keeper Password Manager enables vendor risk management by providing isolated credential vaults for third-party access — vendors receive time-limited credentials through controlled sharing, with all access logged and credentials rotated after vendor engagements end."
      }
    }
  ]
};
