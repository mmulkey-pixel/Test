window.FRAMEWORK_SOURCES = {
  "cmmc": [
    { title: "CMMC 2.0 Program Documentation", org: "U.S. Dept. of Defense", url: "https://dodcio.defense.gov/CMMC/", type: "official", desc: "Official model overview, scoping guidance, assessment requirements, and rulemaking documents." },
    { title: "NIST SP 800-171 Rev 2 — Protecting CUI", org: "NIST", url: "https://csrc.nist.gov/pubs/sp/800/171/r2/upd1/final", type: "standard", desc: "Technical basis for CMMC Level 2; 110 security requirements for nonfederal systems handling CUI." },
    { title: "NIST SP 800-172 — Enhanced CUI Security Requirements", org: "NIST", url: "https://csrc.nist.gov/pubs/sp/800/172/final", type: "standard", desc: "Basis for CMMC Level 3 expert practices; enhanced requirements for advanced persistent threat protection." }
  ],
  "pci-dss": [
    { title: "PCI DSS v4.0 Document Library", org: "PCI Security Standards Council", url: "https://www.pcisecuritystandards.org/document_library/", type: "official", desc: "Official PCI DSS 4.0 standard, supporting documents, and self-assessment questionnaires." },
    { title: "Verizon Data Breach Investigations Report", org: "Verizon Business", url: "https://www.verizon.com/business/resources/reports/dbir/", type: "analyst", desc: "Annual breach analysis; credential theft and privileged account abuse remain top attack vectors year over year." }
  ],
  "hipaa": [
    { title: "HIPAA Security Rule", org: "HHS Office for Civil Rights", url: "https://www.hhs.gov/hipaa/for-professionals/security/index.html", type: "official", desc: "Full Security Rule text, guidance documents, and OCR audit protocols for protecting ePHI." },
    { title: "NIST SP 800-66 Rev 2 — HIPAA Security Rule Guidance", org: "NIST", url: "https://csrc.nist.gov/pubs/sp/800/66/r2/final", type: "standard", desc: "Practical guidance on implementing the HIPAA Security Rule with NIST cybersecurity controls." }
  ],
  "gdpr": [
    { title: "GDPR Full Text — Regulation (EU) 2016/679", org: "EUR-Lex", url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj", type: "official", desc: "Authoritative official text of the General Data Protection Regulation as published in the EU Official Journal." },
    { title: "ENISA Data Protection Guidelines", org: "European Union Agency for Cybersecurity", url: "https://www.enisa.europa.eu/topics/data-protection", type: "government", desc: "Technical guidelines and recommendations from the EU cybersecurity agency on data protection controls." }
  ],
  "soc2": [
    { title: "Trust Services Criteria (TSC) Overview", org: "AICPA-CIMA", url: "https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2", type: "official", desc: "AICPA overview of SOC 2 trust services criteria, engagement types, and reporting guidance." },
    { title: "AICPA SOC 2 Guide for Service Organizations", org: "AICPA", url: "https://www.aicpa-cima.com/resources/landing/system-and-organization-controls-soc-suite-of-services", type: "standard", desc: "Practitioner guide covering SOC 2 scoping, control design, and evidence requirements for Type I and II reports." }
  ],
  "iso27001": [
    { title: "ISO/IEC 27001:2022 Information Security Standard", org: "International Organization for Standardization", url: "https://www.iso.org/standard/27001", type: "standard", desc: "International ISMS certification standard with 93 controls across four themes including access and cryptography." },
    { title: "NIST SP 800-53 Rev 5 — ISO 27001 Mapping", org: "NIST", url: "https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final", type: "standard", desc: "NIST SP 800-53 Rev 5 controls with published mapping to ISO/IEC 27001 Annex A controls." }
  ],
  "fedramp": [
    { title: "FedRAMP Program Documentation", org: "General Services Administration", url: "https://www.fedramp.gov/program-basics/", type: "official", desc: "FedRAMP program overview, authorization packages, marketplace listings, and CONOPS documentation." },
    { title: "NIST SP 800-53 Rev 5 Security & Privacy Controls", org: "NIST", url: "https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final", type: "standard", desc: "The underlying control catalog used for FedRAMP Low, Moderate, and High baselines." }
  ],
  "nist-800-63": [
    { title: "NIST SP 800-63-3 Digital Identity Guidelines", org: "NIST", url: "https://pages.nist.gov/800-63-3/", type: "official", desc: "Suite of guidelines covering identity proofing (800-63A), authentication (800-63B), and federation (800-63C)." },
    { title: "NIST SP 800-63B Authentication & Lifecycle Management", org: "NIST", url: "https://pages.nist.gov/800-63-3/sp800-63b.html", type: "standard", desc: "Detailed requirements for authenticator assurance levels AAL1–AAL3, MFA, and session management." }
  ],
  "glba": [
    { title: "FTC Safeguards Rule (16 CFR Part 314)", org: "Federal Trade Commission", url: "https://www.ftc.gov/business-guidance/privacy-security/gramm-leach-bliley-act/safeguards-rule", type: "official", desc: "Updated Safeguards Rule requiring financial institutions to implement a comprehensive information security program." },
    { title: "FFIEC Information Security IT Examination Handbook", org: "FFIEC", url: "https://www.ffiec.gov/press/pdf/FFIEC_IT_Examination_Handbook_Information_Security.pdf", type: "standard", desc: "Examiner guidance on evaluating financial institution information security programs under GLBA." }
  ],
  "nydfs-500": [
    { title: "NYDFS Cybersecurity Regulation (23 NYCRR Part 500)", org: "NY Dept. of Financial Services", url: "https://www.dfs.ny.gov/industry_guidance/cybersecurity", type: "official", desc: "Full regulation text, FAQs, enforcement actions, and annual certification requirements for DFS-licensed entities." },
    { title: "NYDFS Cybersecurity Frequently Asked Questions", org: "NY Dept. of Financial Services", url: "https://www.dfs.ny.gov/industry_guidance/cybersecurity_faqs", type: "official", desc: "DFS guidance on interpreting regulation requirements including MFA, privileged access, and incident reporting." }
  ],
  "fisma": [
    { title: "FISMA Implementation — CISA", org: "Cybersecurity and Infrastructure Security Agency", url: "https://www.cisa.gov/topics/cyber-threats-and-advisories/federal-information-security-modernization-act", type: "official", desc: "CISA FISMA guidance, annual reporting requirements, and continuous monitoring program documentation." },
    { title: "NIST SP 800-53 Rev 5 — Federal Control Catalog", org: "NIST", url: "https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final", type: "standard", desc: "The authoritative control catalog underlying all FISMA-compliant information security programs." }
  ],
  "sox": [
    { title: "SEC Sarbanes-Oxley Act Resources", org: "U.S. Securities and Exchange Commission", url: "https://www.sec.gov/spotlight/sarbanes-oxley.htm", type: "official", desc: "SEC overview of SOX requirements including Section 302 certifications and Section 404 internal control assessments." },
    { title: "PCAOB AS 2201 — Auditing Internal Controls", org: "Public Company Accounting Oversight Board", url: "https://pcaobus.org/oversight/standards/auditing-standards/details/AS2201", type: "standard", desc: "PCAOB auditing standard for the integrated audit of internal control over financial reporting under SOX 404." }
  ],
  "ncua": [
    { title: "NCUA Cybersecurity Resources", org: "National Credit Union Administration", url: "https://www.ncua.gov/regulation-supervision/regulatory-compliance-resources/cybersecurity-resources", type: "official", desc: "NCUA examination procedures, cybersecurity incident reporting requirements, and member protection guidance." },
    { title: "FFIEC Cybersecurity Assessment Tool", org: "FFIEC", url: "https://www.ffiec.gov/cyberassessmenttool.htm", type: "standard", desc: "Risk and maturity assessment tool used by NCUA examiners to evaluate credit union cybersecurity posture." }
  ],
  "cis": [
    { title: "CIS Critical Security Controls v8", org: "Center for Internet Security", url: "https://www.cisecurity.org/controls/v8", type: "standard", desc: "18 prioritized security controls with implementation groups IG1–IG3, mappable to NIST CSF and other frameworks." },
    { title: "CIS Controls Implementation Groups", org: "Center for Internet Security", url: "https://www.cisecurity.org/controls/implementation-groups", type: "standard", desc: "Guidance for organizations to prioritize control implementation based on risk profile and resource constraints." }
  ],
  "nerc-cip": [
    { title: "NERC CIP Reliability Standards", org: "North American Electric Reliability Corporation", url: "https://www.nerc.com/pa/Stand/Pages/CIPStandards.aspx", type: "official", desc: "Full library of mandatory CIP standards for bulk electric system cybersecurity including CIP-004 through CIP-014." },
    { title: "NERC CIP-007-6 System Security Management", org: "NERC", url: "https://www.nerc.com/pa/Stand/Reliability%20Standards/CIP-007-6.pdf", type: "standard", desc: "Specific standard governing ports/services, security patch management, and system access controls for BES assets." }
  ],
  "dod-il5": [
    { title: "DoD Cloud Computing Security Requirements Guide (CC SRG)", org: "DISA", url: "https://public.cyber.mil/dccs/", type: "official", desc: "Authoritative DISA guidance defining cloud security impact levels IL2–IL6, authorization process, and control overlays." },
    { title: "DoD Zero Trust Strategy and Roadmap", org: "U.S. Dept. of Defense CIO", url: "https://dodcio.defense.gov/Portals/0/Documents/Library/(U)ZT_StrategyAndRoadmap_CalledOut_20211019_508.pdf", type: "official", desc: "DoD strategy for achieving zero trust architecture across all mission systems, with IL5 environments as primary targets." }
  ]
};

window.PAM_INDUSTRY_SOURCES = [
  {
    title: "Magic Quadrant for Privileged Access Management",
    org: "Gartner",
    url: "https://www.gartner.com/en/information-technology/glossary/privileged-access-management-pam",
    type: "analyst",
    desc: "Annual market analysis positioning PAM vendors on ability to execute and completeness of vision. KeeperPAM has been recognized across consecutive reports."
  },
  {
    title: "Forrester Wave™: Privileged Identity Management",
    org: "Forrester Research",
    url: "https://www.forrester.com/blogs/category/security-risk/",
    type: "analyst",
    desc: "Independent wave evaluation of leading PIM/PAM solutions assessing product strategy, feature depth, and market presence."
  },
  {
    title: "NIST Cybersecurity Framework 2.0",
    org: "National Institute of Standards and Technology",
    url: "https://www.nist.gov/cyberframework",
    type: "government",
    desc: "Voluntary cybersecurity framework used across all 15 compliance domains — PAM directly supports the Identify, Protect, and Detect functions."
  },
  {
    title: "CISA Zero Trust Maturity Model v2.0",
    org: "Cybersecurity and Infrastructure Security Agency",
    url: "https://www.cisa.gov/zero-trust-maturity-model",
    type: "government",
    desc: "Federal zero trust roadmap with Identity and Privileged Access as foundational pillars — PAM capabilities map directly to Optimal maturity targets."
  },
  {
    title: "KuppingerCole Leadership Compass: PAM",
    org: "KuppingerCole Analysts AG",
    url: "https://www.kuppingercole.com/research/leadership-compass",
    type: "analyst",
    desc: "European analyst firm's independent assessment of PAM market leaders scoring security, functionality, deployability, and innovation."
  }
];
