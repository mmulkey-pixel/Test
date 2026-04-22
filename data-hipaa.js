window.FRAMEWORK_DATA = window.FRAMEWORK_DATA || {};
FRAMEWORK_DATA["hipaa"] = {
  domains: [
    { code: "AC",   name: "Access Controls",        icon: "🔐", color: "#DC2626" },
    { code: "AUD",  name: "Audit Controls",          icon: "📋", color: "#B91C1C" },
    { code: "AUTH", name: "Authentication",           icon: "🪪", color: "#991B1B" },
    { code: "TX",   name: "Transmission Security",   icon: "🌐", color: "#7F1D1D" },
  ],
  practices: [
    {
      id: "HIPAA-164.312(a)(1)", domain: "Access Controls", domainCode: "AC", tier: 1,
      description: "§164.312(a)(1) — Implement technical policies and procedures that allow only authorized persons to access electronic protected health information (ePHI).",
      modules: ["kpam", "kpm"], coverage: "full",
      guidance: "KeeperPAM enforces access boundaries to ePHI systems through RBAC and credential vaulting.",
      alignment: {
        kpam: "KeeperPAM Core defines and enforces access policies for ePHI-containing systems — only users with explicit, role-based authorization can initiate sessions or retrieve credentials for covered systems.",
        kpm: "Keeper Password Manager vaults all credentials for ePHI systems with zero-knowledge encryption, ensuring only authorized personnel with proper vault permissions can access the credentials needed to reach those systems."
      }
    },
    {
      id: "HIPAA-164.312(a)(2)(i)", domain: "Access Controls", domainCode: "AC", tier: 1,
      description: "§164.312(a)(2)(i) — Assign a unique name and/or number for identifying and tracking user identity (Required).",
      modules: ["sso", "kpm"], coverage: "full",
      guidance: "Directory integration and unique credential policies ensure every user has a distinct, trackable identity.",
      alignment: {
        sso: "SSO & Directory Integration assigns and enforces unique user identifiers sourced from the organization's authoritative directory (Active Directory, LDAP, SAML IdP), preventing shared or anonymous accounts from accessing ePHI systems.",
        kpm: "Keeper Password Manager enforces unique credential policies — administrators can detect and remediate shared accounts, ensuring every access event to ePHI systems is tied to a unique individual identity."
      }
    },
    {
      id: "HIPAA-164.312(a)(2)(iii)", domain: "Access Controls", domainCode: "AC", tier: 1,
      description: "§164.312(a)(2)(iii) — Implement electronic procedures that terminate an electronic session after a predetermined time of inactivity (Addressable).",
      modules: ["kpam", "kcm"], coverage: "full",
      guidance: "Configurable session timeouts in KeeperPAM and Connection Manager terminate idle sessions automatically.",
      alignment: {
        kpam: "KeeperPAM Core enforces configurable vault session timeouts, automatically locking the vault after a defined period of inactivity and requiring re-authentication before any further credential access.",
        kcm: "Keeper Connection Manager automatically terminates idle privileged remote sessions after an administrator-defined timeout period, preventing unattended sessions from remaining open to ePHI systems."
      }
    },
    {
      id: "HIPAA-164.312(a)(2)(iv)", domain: "Access Controls", domainCode: "AC", tier: 1,
      description: "§164.312(a)(2)(iv) — Implement a mechanism to encrypt and decrypt electronic protected health information (Addressable).",
      modules: ["kpm", "ksm"], coverage: "full",
      guidance: "AES-256 zero-knowledge encryption protects ePHI-related credentials and secrets at rest and in transit.",
      alignment: {
        kpm: "Keeper Password Manager uses AES-256 client-side encryption so that credentials for ePHI systems are encrypted before leaving the device — decryption occurs only on the authorized user's device using keys derived from their master password.",
        ksm: "Keeper Secrets Manager stores and delivers encryption keys and credentials used by ePHI applications with zero-knowledge AES-256 encryption, ensuring application-level ePHI encryption keys are protected at rest."
      }
    },
    {
      id: "HIPAA-164.312(b)", domain: "Audit Controls", domainCode: "AUD", tier: 2,
      description: "§164.312(b) — Implement hardware, software, and/or procedural mechanisms that record and examine activity in information systems that contain or use ePHI (Required).",
      modules: ["reporting", "kcm"], coverage: "full",
      guidance: "Comprehensive audit logs of all access to ePHI system credentials and privileged sessions.",
      alignment: {
        reporting: "Advanced Reporting & Alerts records every access event for ePHI-system credentials — who accessed them, when, from where — and provides audit-ready reports exportable for OCR investigations or internal compliance reviews.",
        kcm: "Keeper Connection Manager records full session video and keystroke logs for privileged access to ePHI systems, providing the procedural audit mechanism required by HIPAA for session-level activity recording."
      }
    },
    {
      id: "HIPAA-164.312(c)(1)", domain: "Audit Controls", domainCode: "AUD", tier: 2,
      description: "§164.312(c)(1) — Implement policies and procedures to protect ePHI from improper alteration or destruction (Required).",
      modules: ["ksm", "kpm"], coverage: "full",
      guidance: "Zero-knowledge storage and immutable audit logs prevent unauthorized modification of ePHI credentials.",
      alignment: {
        ksm: "Keeper Secrets Manager uses cryptographic integrity checks on all stored secrets, detecting and alerting on any unauthorized modification attempts to credentials used by ePHI systems.",
        kpm: "Keeper Password Manager's tamper-evident vault storage ensures stored credentials cannot be silently modified — all changes are logged and versioned, with the ability to restore previous credential states."
      }
    },
    {
      id: "HIPAA-164.312(d)", domain: "Authentication", domainCode: "AUTH", tier: 3,
      description: "§164.312(d) — Implement procedures to verify that a person or entity seeking access to ePHI is the one claimed (Required).",
      modules: ["sso", "kpm"], coverage: "full",
      guidance: "MFA and SSO federation verify identity before any ePHI system credential is accessible.",
      alignment: {
        sso: "SSO & Directory Integration verifies user identity through trusted IdPs with configurable MFA requirements before issuing authentication tokens for ePHI-system access.",
        kpm: "Keeper Password Manager enforces MFA (FIDO2, TOTP, Duo) at vault authentication, ensuring that only the verified identity holder can retrieve credentials for ePHI systems."
      }
    },
    {
      id: "HIPAA-164.312(e)(1)", domain: "Transmission Security", domainCode: "TX", tier: 3,
      description: "§164.312(e)(1) — Implement technical security measures to guard against unauthorized access to ePHI being transmitted over an electronic communications network (Required).",
      modules: ["kcm", "kpm"], coverage: "full",
      guidance: "TLS 1.3 encryption with zero-knowledge architecture protects all ePHI-adjacent data in transit.",
      alignment: {
        kcm: "Keeper Connection Manager encrypts all remote session traffic to ePHI systems using TLS 1.3, ensuring that keystrokes, screen data, and file transfers cannot be intercepted on the network.",
        kpm: "Keeper Password Manager transmits all credential data over TLS 1.3 with AES-256 end-to-end encryption, so ePHI system credentials are never exposed in transit even over untrusted networks."
      }
    },
    {
      id: "HIPAA-164.312(e)(2)(ii)", domain: "Transmission Security", domainCode: "TX", tier: 3,
      description: "§164.312(e)(2)(ii) — Implement a mechanism to encrypt ePHI whenever deemed appropriate (Addressable).",
      modules: ["kcm", "ksm"], coverage: "full",
      guidance: "All privileged sessions and secret deliveries to ePHI applications use AES-256 + TLS encryption.",
      alignment: {
        kcm: "Keeper Connection Manager provides encrypted tunnels (TLS 1.3) for all remote access to ePHI systems, ensuring session data is encrypted in transit regardless of the underlying network.",
        ksm: "Keeper Secrets Manager delivers encryption keys and credentials to ePHI applications over encrypted API channels, supporting the application-level encryption of ePHI data at rest."
      }
    }
  ]
};
