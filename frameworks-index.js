const KEEPER_MODULES = {
  kpm:       { name: "Keeper Password Manager",    icon: "🔑" },
  kcm:       { name: "Keeper Connection Manager",  icon: "🖥️" },
  ksm:       { name: "Keeper Secrets Manager",     icon: "🔒" },
  kpam:      { name: "KeeperPAM Core",             icon: "🛡️" },
  reporting: { name: "Advanced Reporting & Alerts",icon: "📊" },
  sso:       { name: "SSO & Directory Integration",icon: "🔗" },
};

const FRAMEWORK_INDEX = [
  {
    id: "cmmc", name: "CMMC 2.0",
    fullName: "Cybersecurity Maturity Model Certification 2.0",
    shortDesc: "Tiered cybersecurity standard for DoD contractors protecting FCI and CUI.",
    authority: "U.S. Department of Defense", applicability: "Defense industrial base contractors",
    assessmentType: "Self-assessment (L1) · C3PAO (L2) · Gov. (L3)",
    category: "federal", color: "#0057FF", icon: "🛡️", mappedControls: 17,
    sectors: ["Defense", "Government"],
    tiers: [
      { label: "Level 1", name: "Foundational", desc: "17 basic cyber hygiene practices for all FCI contractors." },
      { label: "Level 2", name: "Advanced",     desc: "110 practices aligned to NIST SP 800-171 for CUI protection." },
      { label: "Level 3", name: "Expert",       desc: "110+ practices with NIST SP 800-172 additions for critical programs." }
    ]
  },
  {
    id: "pci-dss", name: "PCI DSS 4.0",
    fullName: "Payment Card Industry Data Security Standard 4.0",
    shortDesc: "Security standard for organizations that store, process, or transmit payment card data.",
    authority: "PCI Security Standards Council", applicability: "Any entity handling cardholder data",
    assessmentType: "SAQ (self-assessment) or QSA audit",
    category: "financial", color: "#059669", icon: "💳", mappedControls: 12,
    sectors: ["Financial Services", "Retail", "E-Commerce"],
    tiers: [
      { label: "Req 7–8",  name: "Identity & Access",     desc: "Control and authenticate access to system components and cardholder data." },
      { label: "Req 10",   name: "Logging & Monitoring",  desc: "Log and monitor all access to network resources and cardholder data." },
      { label: "Req 12",   name: "Policy & Risk",         desc: "Support information security with organizational policies and risk management." }
    ]
  },
  {
    id: "hipaa", name: "HIPAA",
    fullName: "Health Insurance Portability and Accountability Act — Security Rule",
    shortDesc: "Federal law protecting sensitive patient health information (ePHI) at rest and in transit.",
    authority: "HHS Office for Civil Rights", applicability: "Covered entities and business associates handling PHI",
    assessmentType: "Self-attestation + HHS OCR audit",
    category: "healthcare", color: "#DC2626", icon: "🏥", mappedControls: 9,
    sectors: ["Healthcare", "Health IT", "Insurance"],
    tiers: [
      { label: "§164.312(a)", name: "Access Controls",    desc: "Unique user IDs, emergency access, automatic logoff, and encryption." },
      { label: "§164.312(b)", name: "Audit Controls",     desc: "Hardware, software, and procedural mechanisms to record ePHI access." },
      { label: "§164.312(d–e)", name: "Auth & Transmission", desc: "Person/entity authentication and encryption of ePHI in transit." }
    ]
  },
  {
    id: "gdpr", name: "GDPR",
    fullName: "General Data Protection Regulation (EU) 2016/679",
    shortDesc: "EU regulation governing personal data processing, privacy rights, and data protection obligations.",
    authority: "European Data Protection Board (EDPB)", applicability: "Any organization processing EU/EEA personal data",
    assessmentType: "DPA audits and self-assessment",
    category: "international", color: "#7C3AED", icon: "🇪🇺", mappedControls: 7,
    sectors: ["All Industries", "Technology", "Financial Services"],
    tiers: [
      { label: "Art. 5",      name: "Core Principles",        desc: "Lawfulness, accuracy, storage limitation, integrity, and confidentiality." },
      { label: "Art. 25 & 32", name: "Controller Obligations", desc: "Data protection by design and appropriate technical/organizational measures." },
      { label: "Art. 33–34",  name: "Incident Management",    desc: "Breach notification to supervisory authorities and affected data subjects." }
    ]
  },
  {
    id: "soc2", name: "SOC 2",
    fullName: "Service Organization Control 2 — Trust Services Criteria",
    shortDesc: "AICPA auditing standard for service organizations based on five Trust Service Criteria.",
    authority: "American Institute of CPAs (AICPA)", applicability: "SaaS, cloud, and managed service providers",
    assessmentType: "Independent CPA audit (Type I or Type II)",
    category: "international", color: "#9333EA", icon: "✅", mappedControls: 9,
    sectors: ["Technology", "SaaS", "Cloud Services"],
    tiers: [
      { label: "CC6", name: "Logical Access",    desc: "Logical access controls, authentication, and encryption criteria." },
      { label: "CC7", name: "System Operations", desc: "Vulnerability detection, monitoring, and incident response." },
      { label: "CC9", name: "Risk Mitigation",   desc: "Vendor and business partner risk management controls." }
    ]
  },
  {
    id: "iso27001", name: "ISO 27001",
    fullName: "ISO/IEC 27001:2022 — Information Security Management",
    shortDesc: "International standard for establishing and certifying an Information Security Management System (ISMS).",
    authority: "International Organization for Standardization (ISO)", applicability: "Any organization seeking ISMS certification",
    assessmentType: "Accredited certification body audit (3-year cycle)",
    category: "international", color: "#6D28D9", icon: "🌐", mappedControls: 10,
    sectors: ["All Industries", "Technology", "Government"],
    tiers: [
      { label: "A.5", name: "Organizational Controls", desc: "Access control policies, identity management, and authentication standards." },
      { label: "A.8", name: "Technological Controls",  desc: "Privileged access, secure authentication, logging, monitoring, and cryptography." }
    ]
  },
  {
    id: "fedramp", name: "FedRAMP",
    fullName: "Federal Risk and Authorization Management Program",
    shortDesc: "U.S. government-wide program providing standardized security assessment for cloud services.",
    authority: "GSA / Joint Authorization Board (JAB)", applicability: "Cloud service providers serving federal agencies",
    assessmentType: "3PAO assessment + JAB or agency authorization",
    category: "federal", color: "#1D4ED8", icon: "☁️", mappedControls: 10,
    sectors: ["Cloud Services", "Government IT", "Defense"],
    tiers: [
      { label: "Low",      name: "Low Impact",      desc: "Limited adverse effect on agency operations if compromised." },
      { label: "Moderate", name: "Moderate Impact",  desc: "Serious adverse effect; required baseline for most federal systems." },
      { label: "High",     name: "High Impact",      desc: "Severe or catastrophic effect; law enforcement, emergency services." }
    ]
  },
  {
    id: "nist-800-63", name: "NIST SP 800-63",
    fullName: "NIST Special Publication 800-63: Digital Identity Guidelines",
    shortDesc: "NIST guidelines for digital identity proofing, authentication, and federation assurance levels.",
    authority: "National Institute of Standards and Technology", applicability: "Federal agencies and organizations implementing digital identity",
    assessmentType: "Agency self-assessment",
    category: "federal", color: "#2563EB", icon: "🪪", mappedControls: 6,
    sectors: ["Government", "Financial Services", "Healthcare"],
    tiers: [
      { label: "AAL1", name: "Assurance Level 1", desc: "Single-factor authentication; low risk if authenticator is compromised." },
      { label: "AAL2", name: "Assurance Level 2", desc: "MFA required; proof of possession of an approved authenticator." },
      { label: "AAL3", name: "Assurance Level 3", desc: "Hardware-based cryptographic authenticator required; highest assurance." }
    ]
  },
  {
    id: "glba", name: "GLBA",
    fullName: "Gramm-Leach-Bliley Act — FTC Safeguards Rule (16 CFR Part 314)",
    shortDesc: "FTC Safeguards Rule requiring financial institutions to protect customer financial information.",
    authority: "Federal Trade Commission (FTC)", applicability: "Financial institutions subject to FTC jurisdiction",
    assessmentType: "FTC examination",
    category: "financial", color: "#047857", icon: "🏦", mappedControls: 7,
    sectors: ["Financial Services", "Insurance", "Mortgage"],
    tiers: [
      { label: "§314.4(c)(1–2)", name: "Access & Encryption",  desc: "Control access to customer information and encrypt data in transit and at rest." },
      { label: "§314.4(c)(5–6)", name: "MFA & Dev Practices",  desc: "Multi-factor authentication and secure development practices for credentials." },
      { label: "§314.4(f) & (h)", name: "Monitoring & IR",     desc: "Monitor authorized users and maintain a written incident response plan." }
    ]
  },
  {
    id: "nydfs-500", name: "NYDFS Part 500",
    fullName: "NYDFS Cybersecurity Regulation (23 NYCRR Part 500)",
    shortDesc: "New York Department of Financial Services cybersecurity requirements for licensed financial institutions.",
    authority: "New York Dept. of Financial Services (DFS)", applicability: "NYDFS-licensed financial institutions operating in New York",
    assessmentType: "Annual certification + DFS examination",
    category: "financial", color: "#0D9488", icon: "🗽", mappedControls: 6,
    sectors: ["Banking", "Insurance", "Financial Services"],
    tiers: [
      { label: "§500.7",  name: "Access Privileges",    desc: "Limit access to minimum necessary and review user access annually." },
      { label: "§500.12", name: "Multi-Factor Auth",    desc: "MFA for remote access, privileged accounts, and critical systems." },
      { label: "§500.16", name: "Incident Response",    desc: "Maintain an IR plan and notify DFS of material cybersecurity events within 72 hours." }
    ]
  },
  {
    id: "fisma", name: "FISMA",
    fullName: "Federal Information Security Modernization Act",
    shortDesc: "U.S. law requiring federal agencies to implement and report on information security programs.",
    authority: "OMB / CISA", applicability: "Federal agencies and their contractors/service providers",
    assessmentType: "Annual self-assessment + OIG audit",
    category: "federal", color: "#1E40AF", icon: "🏛️", mappedControls: 9,
    sectors: ["Government", "Federal Contractors"],
    tiers: [
      { label: "Low",      name: "Low Impact",      desc: "Limited adverse effect on operations, assets, or individuals." },
      { label: "Moderate", name: "Moderate Impact",  desc: "Serious adverse effect; the majority of federal information systems." },
      { label: "High",     name: "High Impact",      desc: "Severe or catastrophic effect on mission-critical systems." }
    ]
  },
  {
    id: "sox", name: "SOX",
    fullName: "Sarbanes-Oxley Act — IT General Controls (Section 404)",
    shortDesc: "Federal law requiring strong internal controls over IT systems that support financial reporting.",
    authority: "SEC / PCAOB", applicability: "Public companies and IT systems supporting financial reporting",
    assessmentType: "External auditor assessment (Section 404)",
    category: "financial", color: "#0891B2", icon: "📈", mappedControls: 7,
    sectors: ["Public Companies", "Financial Services", "Technology"],
    tiers: [
      { label: "PC4", name: "Access Controls",    desc: "Logical access, privileged access management, and separation of duties." },
      { label: "PC5", name: "Change Management",  desc: "Audit trails for changes to systems supporting financial reporting." },
      { label: "PC6", name: "IT Operations",      desc: "Job scheduling, backup, recovery, and IT operations controls." }
    ]
  },
  {
    id: "ncua", name: "NCUA",
    fullName: "National Credit Union Administration — Cybersecurity Program",
    shortDesc: "NCUA cybersecurity examination framework for federally insured credit unions.",
    authority: "National Credit Union Administration", applicability: "Federally insured credit unions",
    assessmentType: "NCUA examination using AIRES questionnaire",
    category: "financial", color: "#065F46", icon: "🏧", mappedControls: 7,
    sectors: ["Credit Unions", "Financial Services"],
    tiers: [
      { label: "Identity & Access",  name: "Access Controls",    desc: "User identification, authentication, and privileged access management." },
      { label: "Audit & Monitoring", name: "Logging & Alerts",   desc: "Audit logs, event monitoring, and anomaly detection." },
      { label: "Incident Response",  name: "IR & Recovery",      desc: "Incident response planning, regulatory reporting, and business continuity." }
    ]
  },
  {
    id: "cis", name: "CIS Controls",
    fullName: "CIS Critical Security Controls v8",
    shortDesc: "Prioritized set of 18 security controls to defend against the most prevalent cyber attacks.",
    authority: "Center for Internet Security (CIS)", applicability: "Any organization seeking a prioritized, risk-based security baseline",
    assessmentType: "Self-assessment against Implementation Groups (IG1–IG3)",
    category: "infrastructure", color: "#D97706", icon: "🔧", mappedControls: 9,
    sectors: ["All Industries", "Technology", "Critical Infrastructure"],
    tiers: [
      { label: "IG1", name: "Essential Hygiene",   desc: "Basic cyber hygiene essential for small organizations with limited IT resources." },
      { label: "IG2", name: "Foundational",         desc: "Controls for organizations with IT staff supporting multiple business departments." },
      { label: "IG3", name: "Organizational",       desc: "Advanced controls for mature security teams facing sophisticated adversaries." }
    ]
  },
  {
    id: "dod-il5", name: "DoD IL5",
    fullName: "DoD Cloud Computing SRG — Impact Level 5",
    shortDesc: "DoD security requirements for sensitive CUI and National Security System data hosted in commercial cloud.",
    authority: "Defense Information Systems Agency (DISA)", applicability: "DoD cloud deployments hosting sensitive CUI or NSS workloads",
    assessmentType: "DISA Provisional Authorization (PA) + FedRAMP High baseline",
    category: "federal", color: "#0F3460", icon: "🎖️", mappedControls: 14,
    sectors: ["Defense", "Government", "DIB"],
    tiers: [
      { label: "FedRAMP High", name: "Baseline Controls",         desc: "NIST SP 800-53 High baseline inherited by all IL5 systems from the underlying CSP authorization." },
      { label: "DoD Overlay",  name: "IL5-Specific Requirements", desc: "Additional DoD-mandated controls and parameter values beyond the FedRAMP High baseline." },
      { label: "Mission Owner", name: "Enhanced Protections",     desc: "Supplemental controls applied by mission owners for specific workload sensitivity." }
    ]
  },
  {
    id: "nerc-cip", name: "NERC-CIP",
    fullName: "NERC Critical Infrastructure Protection Standards",
    shortDesc: "Mandatory reliability standards protecting the North American bulk electric system from cyber threats.",
    authority: "North American Electric Reliability Corporation (NERC)", applicability: "Owners, operators, and users of the bulk electric system (BES)",
    assessmentType: "NERC/Regional Entity triennial audit",
    category: "infrastructure", color: "#B45309", icon: "⚡", mappedControls: 9,
    sectors: ["Energy", "Utilities", "Critical Infrastructure"],
    tiers: [
      { label: "CIP-004", name: "Personnel & Training", desc: "Security awareness training and access management program." },
      { label: "CIP-005", name: "Electronic Security",  desc: "Electronic security perimeters and remote access management." },
      { label: "CIP-007", name: "System Security",      desc: "Ports and services, security patch management, and system access controls." }
    ]
  }
];
