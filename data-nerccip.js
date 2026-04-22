window.FRAMEWORK_DATA = window.FRAMEWORK_DATA || {};
FRAMEWORK_DATA["nerc-cip"] = {
  domains: [
    { code: "CIP004", name: "Personnel & Training",   icon: "👤", color: "#B45309" },
    { code: "CIP005", name: "Electronic Security",    icon: "🌐", color: "#92400E" },
    { code: "CIP007", name: "System Security",        icon: "🛡️", color: "#78350F" },
  ],
  practices: [
    {
      id: "NERC-CIP004-R4", domain: "Personnel & Training", domainCode: "CIP004", tier: 1,
      description: "CIP-004-6 R4 — Access Management Program: Implement and maintain a program for managing access to BES Cyber Systems, including authorization, provisioning, and revocation.",
      modules: ["kpam", "sso"], coverage: "full",
      guidance: "KeeperPAM provides the technical backbone of the BES Cyber System access management program.",
      alignment: {
        kpam: "KeeperPAM Core implements the BES Cyber System access management program — providing workflow-based authorization, audited provisioning of privileged access, and automated revocation when access is no longer required, with complete audit trails for NERC compliance evidence.",
        sso: "SSO & Directory Integration manages the identity lifecycle for BES Cyber System access — provisioning from authoritative HR/directory sources and revoking access immediately upon role change or employment termination."
      }
    },
    {
      id: "NERC-CIP004-R4.2", domain: "Personnel & Training", domainCode: "CIP004", tier: 1,
      description: "CIP-004-6 R4.2 — Authorize and maintain access for each individual based on least privilege necessary for performing assigned work functions.",
      modules: ["kpam"], coverage: "full",
      guidance: "JIT provisioning enforces least-privilege access to BES Cyber Systems.",
      alignment: {
        kpam: "KeeperPAM Core enforces least-privilege access to BES Cyber Systems through JIT provisioning — operators are granted only the minimum access required for their assigned maintenance or operational task, with access automatically revoked on task completion."
      }
    },
    {
      id: "NERC-CIP005-R1", domain: "Electronic Security", domainCode: "CIP005", tier: 2,
      description: "CIP-005-7 R1 — Electronic Security Perimeter: Define and protect Electronic Security Perimeters (ESPs) to control access to BES Cyber Systems.",
      modules: ["kcm"], coverage: "partial",
      guidance: "Connection Manager provides access control layer within the ESP for privileged sessions.",
      alignment: {
        kcm: "Keeper Connection Manager operates within the Electronic Security Perimeter as a privileged access gateway — all access to BES Cyber Systems within the ESP flows through the monitored, encrypted Connection Manager tunnel, providing a controllable access layer for NERC compliance. Organizations must supplement with network-level ESP controls (firewalls, IDS)."
      }
    },
    {
      id: "NERC-CIP005-R2", domain: "Electronic Security", domainCode: "CIP005", tier: 2,
      description: "CIP-005-7 R2 — Remote Access Management: Implement and manage remote access to BES Cyber Systems, including interactive remote access and machine-to-machine communications.",
      modules: ["kcm", "kpam"], coverage: "full",
      guidance: "Connection Manager provides the managed interactive remote access gateway for BES Cyber Systems.",
      alignment: {
        kcm: "Keeper Connection Manager implements the managed interactive remote access solution required by CIP-005-7 R2 — all interactive remote sessions to BES Cyber Systems flow through the encrypted, authenticated gateway with full session recording for NERC evidence.",
        kpam: "KeeperPAM Core manages the authorization and credential vaulting for remote access to BES Cyber Systems — ensuring only authorized personnel with active, time-bounded access grants can initiate remote sessions."
      }
    },
    {
      id: "NERC-CIP007-R5", domain: "System Security", domainCode: "CIP007", tier: 3,
      description: "CIP-007-6 R5 — System Access Management: Manage system access to BES Cyber Systems, including user accounts and shared accounts.",
      modules: ["kpm", "sso"], coverage: "full",
      guidance: "Centralized credential management with directory-driven lifecycle management satisfies R5.",
      alignment: {
        kpm: "Keeper Password Manager manages system access credentials for BES Cyber Systems — enforcing unique account policies, eliminating shared accounts, and providing a centralized credential vault that satisfies CIP-007-6 R5 documentation requirements.",
        sso: "SSO & Directory Integration manages the system account lifecycle — provisioning and deprovisioning BES Cyber System access based on authoritative directory sources, with changes logged for NERC evidence packets."
      }
    },
    {
      id: "NERC-CIP007-R5.2", domain: "System Security", domainCode: "CIP007", tier: 3,
      description: "CIP-007-6 R5.2 — Change default passwords for hardware or software where technically feasible.",
      modules: ["kpm", "ksm"], coverage: "full",
      guidance: "Keeper manages credential rotation for BES Cyber System components including default password remediation.",
      alignment: {
        kpm: "Keeper Password Manager vaults unique, complex credentials for all BES Cyber System components — replacing default passwords with high-entropy alternatives and providing a centralized record for NERC evidence that all defaults have been changed.",
        ksm: "Keeper Secrets Manager automates credential rotation for BES Cyber System service accounts and applications, ensuring default and static credentials are systematically replaced and rotated on schedule."
      }
    },
    {
      id: "NERC-CIP007-R5.3", domain: "System Security", domainCode: "CIP007", tier: 3,
      description: "CIP-007-6 R5.3 — Password complexity and change requirements for BES Cyber System accounts.",
      modules: ["kpm"], coverage: "full",
      guidance: "Keeper's policy engine enforces NERC-compliant password complexity for all BES system accounts.",
      alignment: {
        kpm: "Keeper Password Manager enforces password complexity policies for BES Cyber System accounts — minimum length, character class requirements, and change intervals are centrally defined and enforced, with policy compliance reports available for NERC assessors."
      }
    },
    {
      id: "NERC-CIP007-R4", domain: "System Security", domainCode: "CIP007", tier: 3,
      description: "CIP-007-6 R4 — Security Event Monitoring: Log and monitor security events on BES Cyber Systems to detect unauthorized activity.",
      modules: ["reporting", "kcm"], coverage: "full",
      guidance: "Privileged session recording and behavioral alerting support CIP-007-6 R4 event monitoring.",
      alignment: {
        reporting: "Advanced Reporting & Alerts generates security event logs for all privileged access to BES Cyber Systems — including authentication events, session initiations, credential accesses, and policy violations — with SIEM integration for centralized security event monitoring.",
        kcm: "Keeper Connection Manager records all privileged session activity on BES Cyber Systems with full keystroke and video capture, providing the session-level security event records required by CIP-007-6 R4 for NERC evidence."
      }
    },
    {
      id: "NERC-CIP010-R1", domain: "Electronic Security", domainCode: "CIP005", tier: 2,
      description: "CIP-010-4 R1 — Configuration Change Management: Develop a baseline configuration for BES Cyber Systems and authorize and document changes.",
      modules: ["reporting"], coverage: "partial",
      guidance: "Reporting provides audit trails for credential and access configuration changes to BES systems.",
      alignment: {
        reporting: "Advanced Reporting & Alerts captures all changes to KeeperPAM policies, access configurations, and credential settings for BES Cyber Systems — providing the change audit trail for NERC evidence. Organizations should supplement with dedicated configuration management tools for system-level baseline tracking."
      }
    }
  ]
};
