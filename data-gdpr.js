window.FRAMEWORK_DATA = window.FRAMEWORK_DATA || {};
FRAMEWORK_DATA["gdpr"] = {
  domains: [
    { code: "PRIN", name: "Core Principles",          icon: "⚖️",  color: "#7C3AED" },
    { code: "CTRL", name: "Controller Obligations",   icon: "🏗️",  color: "#6D28D9" },
    { code: "IR",   name: "Incident Management",      icon: "🚨",  color: "#5B21B6" },
  ],
  practices: [
    {
      id: "GDPR-Art5(1)(f)", domain: "Core Principles", domainCode: "PRIN", tier: 1,
      description: "Art. 5(1)(f) — Personal data shall be processed with appropriate security, including protection against unauthorised or unlawful processing and against accidental loss, destruction, or damage (integrity and confidentiality).",
      modules: ["kpm", "ksm"], coverage: "full",
      guidance: "Zero-knowledge AES-256 encryption protects personal data credentials at rest and in transit.",
      alignment: {
        kpm: "Keeper Password Manager stores all credentials for personal-data systems with zero-knowledge AES-256 encryption, ensuring confidentiality is maintained even in the event of infrastructure compromise — decryption is only possible by the authorized key holder.",
        ksm: "Keeper Secrets Manager protects application-level secrets (database credentials, API keys) for systems processing personal data, using cryptographic integrity checks to detect any unauthorised modification."
      }
    },
    {
      id: "GDPR-Art25", domain: "Controller Obligations", domainCode: "CTRL", tier: 2,
      description: "Art. 25 — Data protection by design and by default: implement appropriate technical measures to ensure data protection principles are integrated into processing activities.",
      modules: ["kpam"], coverage: "full",
      guidance: "KeeperPAM enforces least-privilege access by design, limiting personal data exposure by default.",
      alignment: {
        kpam: "KeeperPAM Core implements data protection by design through default-deny access policies — users have no access to personal data systems unless explicitly granted, and JIT provisioning ensures access is time-limited and logged by design rather than as an afterthought."
      }
    },
    {
      id: "GDPR-Art32(1)(a)", domain: "Controller Obligations", domainCode: "CTRL", tier: 2,
      description: "Art. 32(1)(a) — Implement appropriate technical measures including the pseudonymisation and encryption of personal data.",
      modules: ["kpm", "kcm"], coverage: "full",
      guidance: "End-to-end AES-256 encryption protects personal data credentials both at rest and during remote access sessions.",
      alignment: {
        kpm: "Keeper Password Manager's zero-knowledge encryption model ensures that credentials for personal data systems are encrypted client-side with AES-256, satisfying the encryption requirement for data access credentials at rest.",
        kcm: "Keeper Connection Manager encrypts all remote access sessions to personal data systems using TLS 1.3, ensuring that data transmitted during privileged sessions is protected in accordance with Art. 32 encryption requirements."
      }
    },
    {
      id: "GDPR-Art32(1)(b)", domain: "Controller Obligations", domainCode: "CTRL", tier: 2,
      description: "Art. 32(1)(b) — Ensure the ongoing confidentiality, integrity, availability, and resilience of processing systems and services.",
      modules: ["kpm", "ksm"], coverage: "full",
      guidance: "Continuous credential protection and automated rotation maintain security posture without human intervention.",
      alignment: {
        kpm: "Keeper Password Manager maintains ongoing confidentiality of access credentials through continuous encrypted storage, policy enforcement, and breach-watch monitoring that alerts on compromised credentials.",
        ksm: "Keeper Secrets Manager ensures resilience and integrity of application credentials through automated rotation, eliminating the risk of stale or expired secrets causing availability disruptions."
      }
    },
    {
      id: "GDPR-Art32(1)(d)", domain: "Controller Obligations", domainCode: "CTRL", tier: 2,
      description: "Art. 32(1)(d) — Implement a process for regularly testing, assessing, and evaluating the effectiveness of technical and organisational measures.",
      modules: ["reporting"], coverage: "full",
      guidance: "Compliance dashboards and scheduled reports support regular security control evaluation.",
      alignment: {
        reporting: "Advanced Reporting & Alerts provides scheduled compliance reports, access hygiene dashboards, and security posture metrics that enable regular assessment of access control effectiveness — reports can be produced on demand for DPA audits or internal compliance reviews."
      }
    },
    {
      id: "GDPR-Art32(4)", domain: "Controller Obligations", domainCode: "CTRL", tier: 2,
      description: "Art. 32(4) — Take steps to ensure that any natural person acting under the authority of the controller who has access to personal data does not process it except on instructions from the controller.",
      modules: ["kpam", "sso"], coverage: "full",
      guidance: "RBAC and directory-driven provisioning ensure only authorized, instructed actions on personal data systems.",
      alignment: {
        kpam: "KeeperPAM Core enforces controller-defined access policies — every privileged action on personal data systems must be explicitly authorized within the KeeperPAM policy framework before it can be executed.",
        sso: "SSO & Directory Integration binds access rights to directory-managed identities and groups, ensuring that only individuals whose roles include authorized data processing can access the relevant systems."
      }
    },
    {
      id: "GDPR-Art33", domain: "Incident Management", domainCode: "IR", tier: 3,
      description: "Art. 33 — In the case of a personal data breach, notify the supervisory authority within 72 hours and document all relevant facts, effects, and remedial action taken.",
      modules: ["reporting"], coverage: "partial",
      guidance: "KeeperPAM audit logs provide the evidence base for breach documentation and timeline reconstruction.",
      alignment: {
        reporting: "Advanced Reporting & Alerts provides comprehensive event timelines and user attribution reports that support the 72-hour breach notification requirement — audit logs document exactly what personal data was accessed, by whom, and when, enabling accurate breach impact assessment. Organisations should supplement with a dedicated incident response procedure."
      }
    }
  ]
};
