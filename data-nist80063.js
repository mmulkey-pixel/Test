window.FRAMEWORK_DATA = window.FRAMEWORK_DATA || {};
FRAMEWORK_DATA["nist-800-63"] = {
  domains: [
    { code: "AAL", name: "Authenticator Assurance Levels", icon: "🔐", color: "#2563EB" },
    { code: "IAL", name: "Identity Assurance Levels",      icon: "🪪", color: "#1D4ED8" },
    { code: "FAL", name: "Federation Assurance Levels",    icon: "🔗", color: "#1E3A8A" },
  ],
  practices: [
    {
      id: "NIST63-AAL1", domain: "Authenticator Assurance Levels", domainCode: "AAL", tier: 1,
      description: "AAL1 — Single-factor authentication using a memorized secret (password) or single-factor OTP. Provides some assurance that the claimant controls the authenticator.",
      modules: ["kpm"], coverage: "full",
      guidance: "Keeper Password Manager enforces strong memorized secret policies for AAL1 compliance.",
      alignment: {
        kpm: "Keeper Password Manager generates and stores high-entropy memorized secrets that meet AAL1 requirements — enforcing minimum length, complexity rules, and breach detection that alerts when a password is found in known compromise databases."
      }
    },
    {
      id: "NIST63-AAL2", domain: "Authenticator Assurance Levels", domainCode: "AAL", tier: 2,
      description: "AAL2 — Multi-factor authentication providing high confidence that the claimant controls the authenticator. Requires proof of possession of two distinct authentication factors.",
      modules: ["kpm", "sso"], coverage: "full",
      guidance: "Keeper enforces TOTP and FIDO2 MFA as the second factor for all vault and system access.",
      alignment: {
        kpm: "Keeper Password Manager enforces AAL2 through mandatory MFA — combining a memorized secret (master password) with a second factor (TOTP authenticator app or FIDO2 hardware key) before granting any vault access.",
        sso: "SSO & Directory Integration enforces AAL2 at the federation layer, requiring MFA completion at the IdP before issuing SAML assertions, ensuring all downstream system access inherits the required assurance level."
      }
    },
    {
      id: "NIST63-AAL3", domain: "Authenticator Assurance Levels", domainCode: "AAL", tier: 3,
      description: "AAL3 — Highest assurance. Requires possession of a hardware-based cryptographic authenticator and verifier impersonation resistance (phishing resistance). FIDO2/WebAuthn required.",
      modules: ["kpm"], coverage: "full",
      guidance: "Keeper supports FIDO2/WebAuthn hardware security keys providing AAL3-grade phishing-resistant MFA.",
      alignment: {
        kpm: "Keeper Password Manager supports FIDO2/WebAuthn hardware security keys (YubiKey, Google Titan, etc.) as the second factor — these hardware cryptographic authenticators provide verifier impersonation resistance and satisfy AAL3 requirements for high-assurance access."
      }
    },
    {
      id: "NIST63-IAL2", domain: "Identity Assurance Levels", domainCode: "IAL", tier: 2,
      description: "IAL2 — Remote or in-person identity proofing. Evidence of real-world identity is required before credentials are issued, with validation against authoritative sources.",
      modules: ["sso"], coverage: "partial",
      guidance: "SSO integration with authoritative directories supports IAL2 identity binding after external proofing.",
      alignment: {
        sso: "SSO & Directory Integration binds KeeperPAM accounts to enterprise directory identities that have undergone organizational identity proofing — ensuring credentials are only issued to verified individuals. Formal IAL2 identity proofing must be completed through the organization's HR or identity verification process."
      }
    },
    {
      id: "NIST63-FAL2", domain: "Federation Assurance Levels", domainCode: "FAL", tier: 2,
      description: "FAL2 — Assertion is encrypted to the relying party, providing protection against injection attacks and ensuring the assertion cannot be used by unauthorized parties.",
      modules: ["sso"], coverage: "full",
      guidance: "SAML 2.0 with assertion encryption satisfies FAL2 federation assurance requirements.",
      alignment: {
        sso: "SSO & Directory Integration supports SAML 2.0 with signed and encrypted assertions, ensuring federation tokens are bound to the specific relying party and protected against injection or replay attacks — meeting FAL2 federation assurance requirements."
      }
    },
    {
      id: "NIST63-5.2.3", domain: "Authenticator Assurance Levels", domainCode: "AAL", tier: 1,
      description: "SP 800-63B §5.2.3 — Verifiers shall store memorized secrets in a form that is resistant to offline attacks using a suitable one-way key derivation function.",
      modules: ["kpm"], coverage: "full",
      guidance: "Keeper uses PBKDF2 key derivation to store memorized secrets in a cryptographically resistant form.",
      alignment: {
        kpm: "Keeper Password Manager derives encryption keys from the master password using PBKDF2 with a high iteration count, ensuring that stored credential representations are resistant to offline dictionary and brute-force attacks — satisfying the verifier storage requirements of §5.2.3."
      }
    }
  ]
};
