/**
 * CyberLearn OS - Courses Catalog
 * Designed to be modular so future cybersecurity courses can be registered easily.
 */

export const COURSES = [
  {
    id: "regex",
    title: "Regular Expression Language (Regex)",
    titleAr: "اللغة الرمزية المنظمة (Regex)",
    subtitle: "Regex for Cybersecurity",
    subtitleAr: "التعبير النمطي للتحليل والأمن السيبراني",
    description: "تعلم صياغة وتطبيق الـ Regex من الأساسيات حتى التقنيات المتقدمة في فحص السجلات، أنظمة IDS/IPS، والكشف عن التهديدات.",
    icon: "Code2",
    badge: "الأساسي",
    category: "Security Engineering & Analysis",
    categoryAr: "هندسة وتحليل الأمن السيبراني",
    difficulty: "جميع المستويات",
    totalTopics: 31,
    totalQuestions: 35,
    estimatedHours: 8,
    status: "active",
    path: "/courses/regex",
    accentColor: "blue",
    features: [
      "مفاهيم محركات Regex (PCRE2 vs Python vs JS)",
      "تقنيات Lookahead و Lookbehind المتقدمة",
      "تحليل السجلات (Log Parsing) والأنماط السيبرانية",
      "مخاطر الهجمات عبر Regex (ReDoS Mitigation)"
    ]
  },
  {
    id: "net-sec",
    title: "Network Security & Protocol Analysis",
    titleAr: "أمن الشبكات وتحليل البروتوكولات",
    subtitle: "Traffic Analysis & Packet Inspection",
    subtitleAr: "تحليل الحزم والبروتوكولات السيبرانية",
    description: "فهم عميق لنموذج OSI/TCP-IP، تحليل حزم Wireshark، واستخراج الأنماط الخبيثة من حركة المرور.",
    icon: "Network",
    badge: "قريباً",
    category: "Network Defense",
    categoryAr: "الدفاع عن الشبكات",
    difficulty: "متوسط",
    totalTopics: 24,
    totalQuestions: 40,
    estimatedHours: 12,
    status: "coming_soon",
    path: "#",
    accentColor: "cyan",
    features: ["تحليل PCAP", "كشف اختراقات Wireshark", "بروتوكولات DNS/HTTP/TLS"]
  },
  {
    id: "web-sec",
    title: "Web Application Security",
    titleAr: "أمن تطبيقات الويب",
    subtitle: "OWASP Top 10 & Vulnerability Analysis",
    subtitleAr: "ثغرات OWASP والتحليل الجنائي للويب",
    description: "دراسة ثغرات SQLi, XSS, CSRF, SSRF وكيفية تحليل سجلات خوادم الويب للكشف عن الهجمات.",
    icon: "ShieldAlert",
    badge: "قريباً",
    category: "Application Security",
    categoryAr: "أمن التطبيقات",
    difficulty: "متقدم",
    totalTopics: 28,
    totalQuestions: 50,
    estimatedHours: 15,
    status: "coming_soon",
    path: "#",
    accentColor: "purple",
    features: ["ثغرات OWASP", "تحليل سجلات Nginx/Apache", "استراتيجيات الحماية WAF"]
  },
  {
    id: "forensics",
    title: "Digital Forensics & Incident Response",
    titleAr: "التحقيق الجنائي الرقمي والاستجابة للحوادث",
    subtitle: "DFIR & Memory Analysis",
    subtitleAr: "تحليل الذاكرة والسجلات الجنائية",
    description: "طرق جمع الأدلة الرقمية، تحليل سجلات Windows Event Logs، واستخراج مؤشرات الاختراق (IOCs).",
    icon: "FileSearch",
    badge: "قريباً",
    category: "Incident Response",
    categoryAr: "الاستجابة للحوادث",
    difficulty: "متقدم",
    totalTopics: 20,
    totalQuestions: 35,
    estimatedHours: 10,
    status: "coming_soon",
    path: "#",
    accentColor: "green",
    features: ["تحليل Windows Artifacts", "قواعد YARA", "مؤشرات الاختراق IOCs"]
  }
];
