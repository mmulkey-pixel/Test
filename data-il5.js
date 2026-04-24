window.FRAMEWORK_DATA = window.FRAMEWORK_DATA || {};
FRAMEWORK_DATA["dod-il5"] = {
  domains: [
    { code: "AC",  name: "Access Control",                    icon: "🔐", color: "#0057FF" },
    { code: "AU",  name: "Audit & Accountability",            icon: "📋", color: "#7C3AED" },
    { code: "IA",  name: "Identification & Authentication",   icon: "🪪", color: "#059669" },
    { code: "SC",  name: "System & Communications Protection",icon: "🔒", color: "#D97706" },
    { code: "CM",  name: "Configuration Management",          icon: "⚙️", color: "#0891B2" }
  ],
  practices: [
    {
      id: "AC-2", domain: "Access Control", domainCode: "AC", tier: 1,
      description: "Manage information system accounts, including establishing, activating, modifying, reviewing, disabling, and removing accounts.",
      modules: ["kpam","sso","kpm"], coverage: "full",
      guidance: "KeeperPAM Core automates the full account lifecycle; SSO Integration governs provisioning/deprovisioning; Keeper Password Manager vaults all service account credentials.",
      alignment: {
        kpam: "KeeperPAM Core enforces centralized account lifecycle management with automated onboarding and offboarding workflows, role-based entitlements, and approval chains that satisfy AC-2 at IL5 fidelity.",
        sso:  "SSO & Directory Integration syncs authoritative identity sources (Active Directory, LDAP) to ensure account state changes propagate instantly across all integrated systems.",
        kpm:  "Keeper Password Manager maintains a zero-knowledge vault of all system and service account credentials, ensuring accounts cannot be accessed outside of approved workflows."
      }
    },
    {
      id: "AC-3", domain: "Access Control", domainCode: "AC", tier: 1,
      description: "Enforce approved authorizations for logical access to the system in accordance with applicable access control policies.",
      modules: ["kpam","sso"], coverage: "full",
      guidance: "KeeperPAM Core enforces attribute-based and role-based access policies; SSO Integration federates authorization decisions from the authoritative identity provider.",
      alignment: {
        kpam: "KeeperPAM Core applies granular permission sets per resource, enforcing need-to-know and least-privilege policies that meet the DoD IL5 overlay requirement for mandatory access control on CUI systems.",
        sso:  "SSO & Directory Integration enforces SAML/OIDC-based authorization, ensuring only authenticated and authorized users can access resources according to the IL5 mission owner's access policy."
      }
    },
    {
      id: "AC-6(5)", domain: "Access Control", domainCode: "AC", tier: 2,
      description: "Restrict privileged accounts to only those individuals authorized to perform privileged functions — a DoD IL5 overlay enhancement.",
      modules: ["kpam"], coverage: "full",
      guidance: "KeeperPAM Core provides just-in-time elevation and session brokering so privileged accounts are never persistently exposed.",
      alignment: {
        kpam: "KeeperPAM Core implements just-in-time privileged access with time-bounded sessions, mandatory justification, and automated revocation — directly satisfying the DoD IL5 requirement to eliminate standing privileged credentials on sensitive systems."
      }
    },
    {
      id: "AC-17", domain: "Access Control", domainCode: "AC", tier: 2,
      description: "Establish usage restrictions, configuration requirements, and implementation guidance for remote access connections.",
      modules: ["kcm","kpam"], coverage: "full",
      guidance: "Keeper Connection Manager provides a zero-trust, clientless remote access gateway with full session recording; KeeperPAM Core gates all remote privileged sessions.",
      alignment: {
        kcm:  "Keeper Connection Manager enforces encrypted, proxied RDP/SSH/VNC remote access with no direct network exposure, full session recording, and live monitoring — meeting DoD IL5 remote access restrictions without requiring a native client.",
        kpam: "KeeperPAM Core ensures remote privileged sessions require multi-factor authentication and are bounded by just-in-time policies, satisfying the DoD overlay requirement for continuous authentication during remote access."
      }
    },
    {
      id: "AU-2", domain: "Audit & Accountability", domainCode: "AU", tier: 1,
      description: "Identify the types of events that the system is capable of logging in support of the audit function.",
      modules: ["reporting","kcm"], coverage: "full",
      guidance: "Advanced Reporting captures all credential and session events; Keeper Connection Manager logs every remote session keystroke and screen activity.",
      alignment: {
        reporting: "Advanced Reporting & Alerts provides a comprehensive audit event taxonomy covering credential access, vault changes, administrative actions, and policy violations — satisfying the AU-2 event identification requirement.",
        kcm:       "Keeper Connection Manager logs every remote session with full keystroke and screen recording, ensuring the complete set of privileged remote access events is auditable at IL5."
      }
    },
    {
      id: "AU-12", domain: "Audit & Accountability", domainCode: "AU", tier: 2,
      description: "Generate audit records for events defined in AU-2, with content that allows investigations of security incidents.",
      modules: ["reporting","kcm"], coverage: "full",
      guidance: "All KeeperPAM events are logged with timestamps, user identity, and action context; SIEM integration exports records to agency-approved log management.",
      alignment: {
        reporting: "Advanced Reporting & Alerts generates structured audit records with user identity, timestamp, resource, and action fields and exports them via SIEM integration (Splunk, QRadar) to satisfy AU-12 content requirements.",
        kcm:       "Keeper Connection Manager produces tamper-evident session recordings and metadata records with cryptographic integrity protection, meeting DoD IL5 audit generation requirements for remote access events."
      }
    },
    {
      id: "AU-9", domain: "Audit & Accountability", domainCode: "AU", tier: 2,
      description: "Protect audit information and audit tools from unauthorized access, modification, and deletion.",
      modules: ["reporting"], coverage: "partial",
      guidance: "Advanced Reporting provides immutable audit logs; organizations should also configure SIEM retention policies and access controls per mission owner requirements.",
      alignment: {
        reporting: "Advanced Reporting & Alerts stores audit records with role-based access controls limiting modification to authorized administrators, and supports export to immutable SIEM targets — partially satisfying AU-9; organizations must configure SIEM-side protections to achieve full coverage."
      }
    },
    {
      id: "IA-2", domain: "Identification & Authentication", domainCode: "IA", tier: 1,
      description: "Uniquely identify and authenticate organizational users accessing the information system.",
      modules: ["kpm","sso"], coverage: "full",
      guidance: "SSO Integration enforces federated identity; Keeper Password Manager eliminates shared credentials and enforces unique account ownership.",
      alignment: {
        kpm: "Keeper Password Manager ensures every user has unique, non-shared credentials for all systems through its zero-knowledge vault, eliminating shared accounts that violate IA-2.",
        sso: "SSO & Directory Integration enforces unique SAML/OIDC identities for all users, binding authentication to the DoD-approved identity provider and CAC/PIV where required."
      }
    },
    {
      id: "IA-2(1)", domain: "Identification & Authentication", domainCode: "IA", tier: 2,
      description: "Implement multi-factor authentication for network access to privileged accounts — DoD IL5 overlay requirement.",
      modules: ["sso","kpm"], coverage: "full",
      guidance: "SSO Integration enforces MFA at the identity provider layer; Keeper Password Manager stores and autofills MFA TOTP codes, reducing friction without reducing security.",
      alignment: {
        sso: "SSO & Directory Integration integrates with DoD-approved MFA providers (CAC/PIV, FIDO2) to enforce multi-factor authentication on every privileged network access attempt, satisfying the IL5 overlay IA-2(1) enhancement.",
        kpm: "Keeper Password Manager stores TOTP MFA codes in the zero-knowledge vault and enforces MFA on vault access itself, providing a defense-in-depth layer for privileged account authentication."
      }
    },
    {
      id: "IA-5", domain: "Identification & Authentication", domainCode: "IA", tier: 1,
      description: "Manage information system authenticators including establishing, changing, and protecting authenticators.",
      modules: ["kpm","ksm"], coverage: "full",
      guidance: "Keeper Password Manager manages human authenticators; Keeper Secrets Manager handles machine and application credentials with automated rotation.",
      alignment: {
        kpm: "Keeper Password Manager enforces password complexity, rotation policies, and zero-knowledge storage for all human authenticators, meeting IA-5 authenticator management requirements for IL5 privileged accounts.",
        ksm: "Keeper Secrets Manager automates rotation of application and service account credentials on a configurable schedule, eliminating static credentials that violate IL5 authenticator management requirements."
      }
    },
    {
      id: "SC-28", domain: "System & Communications Protection", domainCode: "SC", tier: 1,
      description: "Implement cryptographic mechanisms to prevent unauthorized disclosure of CUI at rest.",
      modules: ["kpm","ksm"], coverage: "full",
      guidance: "Both Keeper Password Manager and Keeper Secrets Manager use AES-256 zero-knowledge encryption at rest — all credentials and secrets are encrypted before leaving the client.",
      alignment: {
        kpm: "Keeper Password Manager uses AES-256-bit zero-knowledge encryption for all vault data at rest; the encryption key is derived client-side from the master password and never transmitted to Keeper servers, directly satisfying SC-28 for credential data.",
        ksm: "Keeper Secrets Manager encrypts all secrets and application credentials at rest using AES-256 with client-side key derivation, ensuring no plaintext credentials exist in the cloud environment supporting IL5 workloads."
      }
    },
    {
      id: "SC-12", domain: "System & Communications Protection", domainCode: "SC", tier: 2,
      description: "Establish and manage cryptographic keys for required cryptography employed within the information system.",
      modules: ["ksm"], coverage: "partial",
      guidance: "Keeper Secrets Manager handles application-layer cryptographic secrets; organizations must also implement FIPS-validated key management at the infrastructure layer.",
      alignment: {
        ksm: "Keeper Secrets Manager provides centralized management of cryptographic keys and certificates used by applications, with rotation automation and access auditing — partially addressing SC-12; full coverage requires integration with a FIPS 140-2/3 validated HSM."
      }
    },
    {
      id: "CM-6", domain: "Configuration Management", domainCode: "CM", tier: 2,
      description: "Establish and document configuration settings for IT products that reflect the most restrictive mode consistent with operational requirements.",
      modules: ["kpam","reporting"], coverage: "partial",
      guidance: "KeeperPAM Core enforces PAM configuration baselines; Advanced Reporting detects drift from policy; organizations must manage OS/infrastructure configuration separately.",
      alignment: {
        kpam:      "KeeperPAM Core enforces policy-defined privileged access configurations (session timeout, MFA requirements, approved protocols) and prevents deviations, contributing to CM-6 compliance for the PAM layer.",
        reporting: "Advanced Reporting & Alerts monitors PAM configuration state and alerts on policy drift or unauthorized configuration changes, providing the detective control component of CM-6 for IL5 environments."
      }
    },
    {
      id: "CM-11", domain: "Configuration Management", domainCode: "CM", tier: 3,
      description: "Govern the installation of software by users, applying principles of least privilege and documented installation policies.",
      modules: ["kpam"], coverage: "partial",
      guidance: "KeeperPAM Core's just-in-time elevation controls which users can install software by limiting administrator privileges to approved sessions; full CM-11 requires endpoint management tooling.",
      alignment: {
        kpam: "KeeperPAM Core restricts standing local administrator rights, requiring JIT elevation for software installation activities — preventing unauthorized software installation on IL5 systems while preserving operational flexibility through time-bounded approval workflows."
      }
    }
  ]
};
