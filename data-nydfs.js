window.FRAMEWORK_DATA = window.FRAMEWORK_DATA || {};
FRAMEWORK_DATA["nydfs-500"] = {
  domains: [
    { code: "ACC", name: "Access Privileges",   icon: "🔐", color: "#0D9488" },
    { code: "MFA", name: "Multi-Factor Auth",   icon: "🪪", color: "#0F766E" },
    { code: "IR",  name: "Incident Response",   icon: "🚨", color: "#115E59" },
  ],
  practices: [
    {
      id: "NYDFS-500.7(a)", domain: "Access Privileges", domainCode: "ACC", tier: 1,
      description: "§500.7(a) — Limit user access privileges to only what is necessary to perform the user's job functions, and review access rights at least annually.",
      modules: ["kpam", "sso"], coverage: "full",
      guidance: "JIT provisioning and annual access review reporting enforce minimum necessary privilege.",
      alignment: {
        kpam: "KeeperPAM Core implements minimum necessary privilege through JIT access provisioning — users have no standing access to privileged systems and must request time-bounded elevation aligned to specific job functions.",
        sso: "SSO & Directory Integration provides the access review foundation — role-based group memberships determine access rights, and Keeper's reporting tools generate the access certification reports needed for annual reviews."
      }
    },
    {
      id: "NYDFS-500.7(b)", domain: "Access Privileges", domainCode: "ACC", tier: 1,
      description: "§500.7(b) — Disable or remove all unnecessary user accounts, including shared and generic accounts.",
      modules: ["sso", "kpam"], coverage: "full",
      guidance: "Directory sync automatically disables accounts; Keeper enforces unique credential policies eliminating shared accounts.",
      alignment: {
        sso: "SSO & Directory Integration immediately propagates account disabling from Active Directory to KeeperPAM upon employee termination or role change, ensuring unnecessary accounts are disabled without delay.",
        kpam: "KeeperPAM Core enforces policies that eliminate generic or shared accounts — every privileged access event is tied to a unique authenticated identity, with shared account usage flagged as a policy violation."
      }
    },
    {
      id: "NYDFS-500.12(a)", domain: "Multi-Factor Auth", domainCode: "MFA", tier: 2,
      description: "§500.12(a) — Implement multi-factor authentication for remote access to the covered entity's information systems and for any individual accessing internal systems from an external network.",
      modules: ["kpm", "kcm"], coverage: "full",
      guidance: "MFA is enforced at vault access and again at remote session initiation through Connection Manager.",
      alignment: {
        kpm: "Keeper Password Manager mandates MFA (FIDO2/WebAuthn, TOTP, Duo) before any vault credential is accessible, creating an enforced MFA gate for all remote access to covered entity information systems.",
        kcm: "Keeper Connection Manager enforces MFA at the remote session gateway — users must authenticate with a second factor before any privileged remote session to an internal system is permitted."
      }
    },
    {
      id: "NYDFS-500.12(b)", domain: "Multi-Factor Auth", domainCode: "MFA", tier: 2,
      description: "§500.12(b) — Implement multi-factor authentication for any individual accessing privileged accounts.",
      modules: ["kpm", "kpam"], coverage: "full",
      guidance: "Keeper enforces step-up MFA specifically for privileged account access.",
      alignment: {
        kpm: "Keeper Password Manager enforces MFA as a mandatory requirement for privileged vault roles — administrators can apply stronger MFA policies (e.g., FIDO2-only) to users with access to privileged credentials.",
        kpam: "KeeperPAM Core requires MFA re-verification before granting any privileged session initiation, ensuring that privileged account access always satisfies §500.12(b) regardless of the initial login method used."
      }
    },
    {
      id: "NYDFS-500.14(a)", domain: "Access Privileges", domainCode: "ACC", tier: 1,
      description: "§500.14(a) — Implement risk-based policies, procedures, and controls designed to monitor the activity of authorized users and detect unauthorized access or use of, or tampering with, nonpublic information.",
      modules: ["reporting"], coverage: "full",
      guidance: "Behavioral analytics and real-time alerting monitor authorized user activity for unauthorized use.",
      alignment: {
        reporting: "Advanced Reporting & Alerts implements risk-based monitoring by analyzing privileged access behavior patterns — detecting and alerting on unauthorized access attempts, anomalous credential usage, and off-policy activity that could indicate insider threat or account compromise."
      }
    },
    {
      id: "NYDFS-500.16(a)", domain: "Incident Response", domainCode: "IR", tier: 3,
      description: "§500.16(a) — Establish a written incident response plan designed to promptly respond to and recover from cybersecurity events materially affecting confidentiality, integrity, or availability of information systems.",
      modules: ["reporting", "kpam"], coverage: "partial",
      guidance: "KeeperPAM supports IR plan execution with rapid response tools and comprehensive audit evidence.",
      alignment: {
        reporting: "Advanced Reporting & Alerts provides the event timeline, user attribution, and impact assessment data required to execute the incident response plan — enabling rapid determination of what was accessed, by whom, and when for regulatory notification within 72 hours.",
        kpam: "KeeperPAM Core enables immediate containment actions defined in the IR plan: revoking privileged access, rotating compromised credentials, and terminating active sessions — supporting rapid recovery from cybersecurity events."
      }
    }
  ]
};
