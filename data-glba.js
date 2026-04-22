window.FRAMEWORK_DATA = window.FRAMEWORK_DATA || {};
FRAMEWORK_DATA["glba"] = {
  domains: [
    { code: "AE",  name: "Access & Encryption",   icon: "🔐", color: "#047857" },
    { code: "MFA", name: "MFA & Dev Practices",   icon: "🪪", color: "#065F46" },
    { code: "MON", name: "Monitoring & IR",        icon: "📊", color: "#064E3B" },
  ],
  practices: [
    {
      id: "GLBA-314.4(c)(1)", domain: "Access & Encryption", domainCode: "AE", tier: 1,
      description: "§314.4(c)(1) — Access controls on customer information systems, including controls to authenticate and permit access only to authorized users.",
      modules: ["kpam", "sso"], coverage: "full",
      guidance: "KeeperPAM enforces authenticated, authorized access to customer information systems through RBAC and SSO.",
      alignment: {
        kpam: "KeeperPAM Core enforces access controls on customer information systems by requiring explicit authorization before any privileged session — eliminating unauthorized lateral movement to systems containing customer financial data.",
        sso: "SSO & Directory Integration authenticates users against the organization's authoritative directory before permitting any access to KeeperPAM-protected systems containing customer information."
      }
    },
    {
      id: "GLBA-314.4(c)(2)", domain: "Access & Encryption", domainCode: "AE", tier: 1,
      description: "§314.4(c)(2) — Encryption of customer information held or transmitted by the financial institution, both in transit and at rest.",
      modules: ["kpm", "ksm"], coverage: "full",
      guidance: "AES-256 zero-knowledge encryption protects customer information credentials at rest and in transit.",
      alignment: {
        kpm: "Keeper Password Manager encrypts all credentials for customer-information systems with AES-256 in a zero-knowledge architecture — data is encrypted at rest on Keeper's infrastructure and protected end-to-end in transit.",
        ksm: "Keeper Secrets Manager provides encrypted storage and delivery of credentials used by applications that process customer information, satisfying the at-rest and in-transit encryption requirements of §314.4(c)(2)."
      }
    },
    {
      id: "GLBA-314.4(c)(5)", domain: "MFA & Dev Practices", domainCode: "MFA", tier: 2,
      description: "§314.4(c)(5) — Multi-factor authentication for any individual accessing customer information or any system used to access customer information.",
      modules: ["kpm"], coverage: "full",
      guidance: "Keeper enforces MFA as a mandatory gate before any customer information system credential is accessible.",
      alignment: {
        kpm: "Keeper Password Manager mandates MFA (FIDO2/WebAuthn, TOTP, Duo) for all vault access — ensuring that any individual seeking to retrieve credentials for customer information systems must satisfy multi-factor authentication first."
      }
    },
    {
      id: "GLBA-314.4(c)(6)", domain: "MFA & Dev Practices", domainCode: "MFA", tier: 2,
      description: "§314.4(c)(6) — Encryption of customer information in transit or stored in systems, including secure development practices to reduce credential exposure in applications.",
      modules: ["ksm"], coverage: "full",
      guidance: "Keeper Secrets Manager eliminates hardcoded credentials in applications processing customer information.",
      alignment: {
        ksm: "Keeper Secrets Manager removes hardcoded credentials from application code and CI/CD pipelines — developers retrieve secrets via encrypted API at runtime rather than embedding them in code, directly addressing the secure development credential handling requirement of §314.4(c)(6)."
      }
    },
    {
      id: "GLBA-314.4(c)(9)", domain: "Access & Encryption", domainCode: "AE", tier: 1,
      description: "§314.4(c)(9) — Secure development practices for in-house developed applications and procedures for evaluating, assessing, or testing the security of externally developed applications.",
      modules: ["ksm", "reporting"], coverage: "partial",
      guidance: "Secrets Manager eliminates credential exposure in application development workflows.",
      alignment: {
        ksm: "Keeper Secrets Manager integrates directly with CI/CD pipelines and development environments to provide secrets at runtime — eliminating hardcoded credentials from source code and application configurations.",
        reporting: "Advanced Reporting provides credential hygiene reports that identify applications or pipelines with static secrets, supporting the evaluation requirement for externally developed applications."
      }
    },
    {
      id: "GLBA-314.4(f)(1)", domain: "Monitoring & IR", domainCode: "MON", tier: 3,
      description: "§314.4(f)(1) — Monitor and filter email, web browsing, or other applications to detect actual and attempted attacks on or intrusions into any information system.",
      modules: ["reporting", "kcm"], coverage: "full",
      guidance: "Privileged access monitoring and session recording detect intrusion attempts at the access layer.",
      alignment: {
        reporting: "Advanced Reporting & Alerts monitors all privileged access patterns for anomalous behavior — detecting and alerting on potential intrusion indicators such as off-hours access, geographic anomalies, and unusual credential access volumes.",
        kcm: "Keeper Connection Manager monitors all privileged sessions to customer information systems in real time, with the ability to detect and terminate suspicious sessions immediately upon discovery."
      }
    },
    {
      id: "GLBA-314.4(h)", domain: "Monitoring & IR", domainCode: "MON", tier: 3,
      description: "§314.4(h) — Establish a written incident response plan that addresses detection, response, recovery, and notification to affected customers and regulatory agencies.",
      modules: ["reporting", "kpam"], coverage: "partial",
      guidance: "KeeperPAM provides rapid response capabilities and audit evidence to support the incident response plan.",
      alignment: {
        reporting: "Advanced Reporting & Alerts provides the audit evidence and event timelines needed to execute the incident response plan — identifying the scope of a breach, affected customers, and the timeline of unauthorized access for regulatory notification.",
        kpam: "KeeperPAM Core supports incident containment by enabling immediate credential rotation, session termination, and access revocation — reducing attacker dwell time and supporting rapid recovery as defined in the incident response plan."
      }
    }
  ]
};
