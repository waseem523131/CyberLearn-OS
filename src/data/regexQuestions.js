/**
 * CyberLearn OS - Regex Question Bank Dataset
 * Structured questions with immediate feedback, detailed option breakdowns, 
 * common mistakes, and cybersecurity use cases.
 */

export const REGEX_QUESTIONS = [
  {
    id: "regex-001",
    courseId: "regex",
    topic: "shorthand-classes",
    difficulty: "easy",
    type: "mcq",
    question: "ما الذي يطابقه الرمز المختصر \\d في التعبير النمطي؟",
    code: "\\d",
    options: [
      { id: "A", text: "أي حرف أجنبي (a-z)" },
      { id: "B", text: "أي رقم من (0 إلى 9)" },
      { id: "C", text: "أي مسافة فارغة (Whitespace)" },
      { id: "D", text: "أي رمز خاص مثل (@, #, $)" }
    ],
    correctAnswer: "B",
    explanation: "في معظم محركات Regex، يمثل الاختصار \\d أي رقم من 0 إلى 9 (يعادل الفئة الرقمية [0-9]).",
    optionExplanations: {
      A: "اخترت A (حرف أجنبي)، ولكن الحروف تطابق بواسطة الاختصار \\w أو الفئة [a-zA-Z].",
      B: "إجابة صحيحة! \\d مخصص للأرقام من 0 إلى 9.",
      C: "اخترت C (مسافة فارغة)، ولكن المسافات تطابق باستخدام الاختصار \\s.",
      D: "اخترت D (رمز خاص)، بينما الرموز الخاصة تطابق عادة بالفئات المنفية أو الرموز الصريحة."
    },
    commonMistake: "الخلط بين \\d (Digit = رقم) و \\w (Word = حرف/رقم/شرطة سفلية).",
    cyberSecurityUseCase: "استخراج الموانئ (Ports)، أرقام المعاملات (Transaction IDs)، وأرقام الحسابات من سجلات النظام.",
    concepts: ["\\d", "Shorthand Class", "Digits"]
  },
  {
    id: "regex-002",
    courseId: "regex",
    topic: "negated-classes",
    difficulty: "easy",
    type: "mcq",
    question: "ماذا تعني الفئة المنفية [^0-9] ؟",
    code: "[^0-9]",
    options: [
      { id: "A", text: "تطابق أي رقم من 0 إلى 9" },
      { id: "B", text: "تطابق أي رمز ليس رقماً" },
      { id: "C", text: "تطابق النصوص التي تبدأ برقم" },
      { id: "D", text: "تطابق النصوص التي تنتهي برقم" }
    ],
    correctAnswer: "B",
    explanation: "الرمز ^ عندما يُكتب في بداية الأقواس المربعة [^...] يعني نفي الفئة، أي مطابقة أي رمز باستثناء الأرقام 0-9.",
    optionExplanations: {
      A: "اخترت A، وهذا مفهوم الفئة [0-9] بدون نفي.",
      B: "إجابة صحيحة! ^ داخل الأقواس تعني نفي المجموعة واستبعاد الأرقام.",
      C: "اخترت C، والرمز ^ خارج الأقواس المربعة هو الذي يشير لبداية النص.",
      D: "اخترت D، والرمز الذي يشير للنهاية هو $ وليس ^."
    },
    commonMistake: "الخلط بين ^ كمستبعد داخل [^...] و ^ كمرساة لبداية النص خارج الأقواس.",
    cyberSecurityUseCase: "تنظيف المدخلات وتصفية الأحرف الغريبة والرموز المشبوهة من حقول النصوص.",
    concepts: ["Negated Class", "[^...]", "Input Sanitization"]
  },
  {
    id: "regex-003",
    courseId: "regex",
    topic: "anchors",
    difficulty: "easy",
    type: "mcq",
    question: "أي تعبير نمطي يضمن أن النص يتكون فقط وحصرياً من الكلمة \"admin\" دون أي أحرف قبلها أو بعدها؟",
    code: "admin",
    options: [
      { id: "A", text: "admin*" },
      { id: "B", text: "^admin$" },
      { id: "C", text: "[admin]" },
      { id: "D", text: "\\badmin" }
    ],
    correctAnswer: "B",
    explanation: "استخدام مرساة البداية ^ ومرساة النهاية $ معاً (^admin$) يضمن تطابق النص بأكمله بدقة مع admin.",
    optionExplanations: {
      A: "اخترت A، والمحدد * يكرر الحرف n فقط صفر أو أكثر.",
      B: "إجابة صحيحة! ^ تثبت البداية و $ تثبت النهاية لتحديد النص كاملاً.",
      C: "اخترت C، والأقواس المربعة تطابق حرفاً واحداً فقط إما a أو d أو m أو i أو n.",
      D: "اخترت D، و \\b تحدد حد الكلمة فقط ولكنها تسمح بوجود كلمات أخرى بعدها."
    },
    commonMistake: "إغفال المرساة ^ و $ عند فحص المدخلات الأمنية مما يسمح بمرور nologin_admin_bypass.",
    cyberSecurityUseCase: "التحقق الحاسم من أسماء المستخدمين والأدوار لتفادي ثغرات Authentication Bypass.",
    concepts: ["Anchors", "^", "$", "Strict Matching"]
  },
  {
    id: "regex-004",
    courseId: "regex",
    topic: "quantifiers",
    difficulty: "medium",
    type: "mcq",
    question: "ما الفرق الرئيسي بين المحدد + والمحدد * ؟",
    code: "a+  vs  a*",
    options: [
      { id: "A", text: "+ يطابق تكراراً واحداً على الأقل (1+) بينما * يطابق صفر أو أكثر (0+)" },
      { id: "B", text: "* يطابق الأحرف الكبيرة فقط و + للأحرف الصغيرة" },
      { id: "C", text: "+ يطابق الأرقام و * يطابق الحروف" },
      { id: "D", text: "+ للمطابقة الكسولة و * للمطابقة الطماعة" }
    ],
    correctAnswer: "A",
    explanation: "المحدد + يشترط وجود العنصر مرة واحدة على الأقل (1 or more)، بينما المحدد * يطابق حتى لو لم يكن العنصر موجوداً إطلاقاً (0 or more).",
    optionExplanations: {
      A: "إجابة صحيحة! + تعني 1+ و * تعني 0+.",
      B: "اخترت B، لا علاقة للمحددات بحالة الأحرف (Upper/Lower case).",
      C: "اخترت C، المحددات تطابق الأعداد والتكرارات لكافة فئات الرموز.",
      D: "اخترت D، كلاهما طماع افتراضياً وتضاف ? لجعل أي منهما كسولاً."
    },
    commonMistake: "استخدام * بدلاً من + مما يؤدي لمطابقة نصوص فارغة بشكل غير متوقع.",
    cyberSecurityUseCase: "فحص الحقول الإلزامية في استمارات تسجيل الدخول لمنع إرسال قيم فارغة.",
    concepts: ["Quantifiers", "+", "*", "Repetition"]
  },
  {
    id: "regex-005",
    courseId: "regex",
    topic: "lazy-matching",
    difficulty: "medium",
    type: "mcq",
    question: "في النص التالي: \"<script>alert(1)</script><script>src=x</script>\"، ماذا سينتج عن استخدام التعبير الطماع \"<script>.*</script>\"؟",
    code: "<script>.*</script>",
    options: [
      { id: "A", text: "يطابق الوسم الأول فقط: <script>alert(1)</script>" },
      { id: "B", text: "يطابق النص كاملاً من أول <script> إلى آخر </script>" },
      { id: "C", text: "يطابق الوسم الثاني فقط" },
      { id: "D", text: "يعطي خطأ في التعبير النمطي" }
    ],
    correctAnswer: "B",
    explanation: "المحدد .* طماع (Greedy)، لذلك سيمتد لأقصى طول ممكن في النص ليصل إلى آخر </script> في السلسلة.",
    optionExplanations: {
      A: "اخترت A، ولكن هذا يحدث فقط مع المطابقة الكسولة <script>.*?</script>.",
      B: "إجابة صحيحة! المطابقة الطماعة ستبحث عن أطول امتداد ممكن يطابق النمط.",
      C: "اخترت C، المحدد يبدأ دائماً من أول نقطة مطابقة في النص.",
      D: "اخترت D، التعبير صحيح تماماً ولا يحتوي أخطاء مصنعية."
    },
    commonMistake: "نسيان تحويل المحدد إلى كسول (Lazy .*?) عند استخراج وسوم HTML أو قيم السجلات.",
    cyberSecurityUseCase: "عزل الأكواد الخبيثة ووسوم XSS بدقة دون ابتلاد باقي أجزاء الصفحة.",
    concepts: ["Greedy Matching", "Lazy Matching", "XSS Extraction"]
  },
  {
    id: "regex-006",
    courseId: "regex",
    topic: "lookahead",
    difficulty: "hard",
    type: "mcq",
    question: "ماذا يطابق التعبير النمطي التالية: \\w+(?=\\s*=\\s*['\"]) ؟",
    code: "\\w+(?=\\s*=\\s*['\"])",
    options: [
      { id: "A", text: "اسم المتغير ومتبوعه بعلامة المساواة والقيمة" },
      { id: "B", text: "اسم المتغير فقط بشرط أن يكون متبوعاً بعلامة مساواة وعلامة اقتباس" },
      { id: "C", text: "علامة المساواة والقيم فقط" },
      { id: "D", text: "النصوص التي لا تحتوي علامة مساواة" }
    ],
    correctAnswer: "B",
    explanation: "التركيب (?=...) هو Positive Lookahead. يتأكد من وجود الشرط (علامة المساواة واقتباس) ولكن يطابق فقط اسم المتغير \\w+ دون استهلاك علامة المساواة.",
    optionExplanations: {
      A: "اخترت A، الشرط داخل (?=...) لا يتم استهلاكه في النتيجة النهائية للمطابقة.",
      B: "إجابة صحيحة! Positive Lookahead يتحقق من الشرط اللاحق دون تضمينه في النتيجة.",
      C: "اخترت C، الرمز \\w+ يطابق الأحرف والكلمات الحرفية السابقة وليس علامات المساواة.",
      D: "اخترت D، هذا وصف Negative Lookahead وليس Positive."
    },
    commonMistake: "الاعتقاد بأن النص المذكور داخل الأقواس (?=...) يظهر في النتيجة الملتقطة.",
    cyberSecurityUseCase: "استخراج أسماء الخصائص والمتغيرات المشبوهة في الأكواد الملغومة (De-obfuscation).",
    concepts: ["Lookahead", "Zero-Width Assertion", "De-obfuscation"]
  },
  {
    id: "regex-007",
    courseId: "regex",
    topic: "lookbehind",
    difficulty: "hard",
    type: "mcq",
    question: "أي تعبير يستخرج عنوان IP فقط إذا كان مسبوقاً بكلمة \"Client: \" دون تضمين كلمة Client في النتيجة؟",
    code: "(?<=Client:\\s)\\d{1,3}(?:\\.\\d{1,3}){3}",
    options: [
      { id: "A", text: "(?<=Client:\\s)\\d{1,3}(?:\\.\\d{1,3}){3}" },
      { id: "B", text: "(?=Client:\\s)\\d{1,3}(?:\\.\\d{1,3}){3}" },
      { id: "C", text: "Client:\\s\\d{1,3}(?:\\.\\d{1,3}){3}" },
      { id: "D", text: "(?!Client:\\s)\\d{1,3}(?:\\.\\d{1,3}){3}" }
    ],
    correctAnswer: "A",
    explanation: "التركيب (?<=...) هو Positive Lookbehind ويتحقق من أن النص السابق يطابق \"Client: \" تماماً دون إضافته للنتيجة.",
    optionExplanations: {
      A: "إجابة صحيحة! (?<=...) يتحقق من البادئة السابقة دون تضمينها.",
      B: "اخترت B، وهذا Lookahead يفحص الأمام وليس الخلف.",
      C: "اخترت C، هذا يطابق الكلمة ويعيدها في النتيجة مما يستوجب اقتطاعها لاحقاً.",
      D: "اخترt D، هذا Negative Lookbehind يستبعد إذا كان مسبوقاً بـ Client."
    },
    commonMistake: "استخدام Lookahead مكان Lookbehind عند فحص السوابق (Prefixes).",
    cyberSecurityUseCase: "عزل العناوين ومؤشرات الاختراق IOCs من سجلات الأجهزة والموجهات (Routers Logs).",
    concepts: ["Lookbehind", "(?<=...)", "IP Extraction"]
  },
  {
    id: "regex-008",
    courseId: "regex",
    topic: "backreferences",
    difficulty: "hard",
    type: "mcq",
    question: "في التعبير النمطي: <([a-z]+)>.*?</\\1> ، ما دور الرمز \\1 ؟",
    code: "<([a-z]+)>.*?</\\1>",
    options: [
      { id: "A", text: "مطابقة الرقم 1 الصريح" },
      { id: "B", text: "يشترط أن يكون اسم وسم الإغلاق مطاباقاً تماماً لاسم وسم الفتح الملتقط في المجموعة الأولى" },
      { id: "C", text: "تكرار النمط مرة واحدة فقط" },
      { id: "D", text: "إلغاء تفعيل الأقواس المربعة" }
    ],
    correctAnswer: "B",
    explanation: "الرمز \\1 هو Backreference يشير إلى المجموعة الملتقطة الأولى ([a-z]+) ويضمن أن وسم الإغلاق مطاطب لوسم الفتح (مثل <div>...</div> وليس <div>...</span>).",
    optionExplanations: {
      A: "اخترت A، المطابقة الصريحة للرقم 1 تكون بالحرف العادي 1 أو \\d.",
      B: "إجابة صحيحة! \\1 مرجع خلفي يعيد استخدام القيمة الملتقطة في المجموعات.",
      C: "اخترت C، التكرارات تحدد بواسطة Quantifiers مثل {1}.",
      D: "اخترت D، الإلغاء يتم بواسطة الرمز الهروبي \\ قبل الأقواس."
    },
    commonMistake: "الاعتقاد أن \\1 تعيد تطبيق النمط فقط (هي تطابق نفس القيمة النصية الحقيقية الملتقطة).",
    cyberSecurityUseCase: "كشف أخطاء التنسيق والهجمات التي تستغل عدم إغلاق الوسوم بشكل صحيح.",
    concepts: ["Backreference", "\\1", "Capturing Group"]
  },
  {
    id: "regex-009",
    courseId: "regex",
    topic: "python-re",
    difficulty: "medium",
    type: "mcq",
    question: "لماذا يفضل كتابة السلاسل في بايثون بالشكل r'pattern' عند التعامل مع Regex؟",
    code: "re.findall(r'\\d+\\s\\w+', text)",
    options: [
      { id: "A", text: "لجعل السلسلة قراءة فقط (Read-only)" },
      { id: "B", text: "لتسريع تنفيذ بايثون كود" },
      { id: "C", text: "لتعريف Raw String وتفادي معالجة بايثون للرمز الهروبي \\ قبل وصوله لمحرك Regex" },
      { id: "D", text: "لتحويل النص إلى حروف كبيرة تلقائياً" }
    ],
    correctAnswer: "C",
    explanation: "استخدام r'...' في بايثون يُنشئ Raw String، مما يمنع مترجم بايثون من تفسير \\n كسطر جديد أو \\t كمكافئ مسافة، ويتركها كما هي لمحرك Regex.",
    optionExplanations: {
      A: "اخترت A، السلاسل النصية في بايثون immutable بطبيعتها كلياً.",
      B: "اخترت B، البادئة r لا تؤثر على سرعة التشغيل بل على كيفية تفسير الرموز الهروبية.",
      C: "إجابة صحيحة! Raw Strings تضمن وصول الشرطة العكسية \\ كما هي لمحرك Regex.",
      D: "اخترت D، تحويل الحروف الكبيرة يتم عبر دوال مثل upper()."
    },
    commonMistake: "إغفال r في بايثون عند كتابة \\b أو \\d مما يتسبب في أخطاء غريبة في المطابقة.",
    cyberSecurityUseCase: "تطوير أدوات التحقيق الجنائي وسكريبتات الأوتوميشين التابعة للسيبراني ببايثون.",
    concepts: ["Python re", "Raw String", "r'...'"]
  },
  {
    id: "regex-010",
    courseId: "regex",
    topic: "redos-security",
    difficulty: "hard",
    type: "mcq",
    question: "ما السبب الرئيس لحدوث هجوم الحرمان من الخدمة عبر الـ Regex (ReDoS)؟",
    code: "^(a+)+$",
    options: [
      { id: "A", text: "استخدام ذاكرة الوصول العشوائي بشكل مفرط" },
      { id: "B", text: "التتبع العكسي الكارثي (Catastrophic Backtracking) عند معالجة أنماط متداخلة غير متطابقة" },
      { id: "C", text: "بطء الاتصال بالشبكة" },
      { id: "D", text: "عدم تفعيل شارة المعالجة الشاملة g" }
    ],
    correctAnswer: "B",
    explanation: "عند استخدام أنماط مثل (a+)+، ويتم تقديم نص يحتوي على أخطاء مثل aaaaaaaaaaX، يجرب المحرك ملايين المسارات في التتبع العكسي مما يرفع استهلاك المعالج إلى 100%.",
    optionExplanations: {
      A: "اخترت A، المشكلة الأساسية في ReDoS هي استهلاك وقت المعالج CPU وليس الذاكرة.",
      B: "إجابة صحيحة! Catastrophic Backtracking هو المسبب الرئيسي لـ ReDoS.",
      C: "اخترت C، المشكلة داخلية في محرك المعالجة وليس لها علاقة بالشبكة.",
      D: "اخترت D، الشارة g تزيد مرات البحث وليس لها علاقة بتعقيد الشجرة."
    },
    commonMistake: "استخدام محددات مفتوحة متداخلة مثل (.*)+ في الحقول المتاحة لجميع المستخدمين.",
    cyberSecurityUseCase: "مراجعة الكود المصدري لمنع هجمات الإسقاط وتجمد تطبيقات الويب.",
    concepts: ["ReDoS", "Catastrophic Backtracking", "Denial of Service"]
  },
  {
    id: "regex-011",
    courseId: "regex",
    topic: "filename-validation",
    difficulty: "medium",
    type: "mcq",
    question: "أي تعبير نمطي يحمي بشكل صحيح من ثغرة Path Traversal و الامتدادات المزدوجة الخبيثة في أسماء الملفات المرفوعة؟",
    code: "^(?!.*\\.\\.)[a-zA-Z0-9_-]+\\.(?:jpg|png|pdf)$",
    options: [
      { id: "A", text: ".*\\.jpg$" },
      { id: "B", text: "^(?!.*\\.\\.)[a-zA-Z0-9_-]+\\.(?:jpg|png|pdf)$" },
      { id: "C", text: "[a-z]+\\.[a-z]+" },
      { id: "D", text: "^.*\\.(jpg|png)$" }
    ],
    correctAnswer: "B",
    explanation: "التعبير B يحظر التسلسل .. عبر Negative Lookahead، ويضمن اقتصار اسم الملف على حروف وأرقام آمنة، ويثبت امتداداً وحيداً معتمداً فقط.",
    optionExplanations: {
      A: "اخترت A، هذا يسمح بملفات مثل shell.php.jpg و ../../etc/passwd.jpg.",
      B: "إجابة صحيحة! يمنع الانتقال للمجلدات العليا والتسميات المزدوجة الخبيثة.",
      C: "اخترت C، تعبير واسع جداً لا يحمي من ثغرات المسارات.",
      D: "اخترت D، يسمح بـ .. والرموز الخاصة الشائعة في الهجمات."
    },
    commonMistake: "الفحص المعتمد فقط على امتداد النهاية دون استبعاد الرموز الحساسة ومسارات الانتقال.",
    cyberSecurityUseCase: "تأمين نماذج Upload في خوادم التطبيقات.",
    concepts: ["Filename Validation", "Path Traversal", "File Upload Security"]
  },
  {
    id: "regex-012",
    courseId: "regex",
    topic: "cyber-log-analysis",
    difficulty: "hard",
    type: "mcq",
    question: "ماذا يكتشف التعبير النمطي التالي في سجلات خادم الويب: (?i)(union\\s+select|select.*from|exec\\s*\\() ؟",
    code: "(?i)(union\\s+select|select.*from|exec\\s*\\()",
    options: [
      { id: "A", text: "محاولات رفع ملفات خبيثة" },
      { id: "B", text: "محاولات حقن أوامر SQL الخبيثة (SQL Injection)" },
      { id: "C", text: "محاولات هجوم الكسر بالقوة بروت (Brute Force)" },
      { id: "D", text: "ثغرات Cross-Site Request Forgery" }
    ],
    correctAnswer: "B",
    explanation: "التعبير يرصد عبارات استعلامات SQL المشهورة مثل UNION SELECT و SELECT FROM بغض النظر عن حالة الأحرف شارة (?i).",
    optionExplanations: {
      A: "اخترت A، رفع الملفات يرتبط بأنماط الامتدادات ونوع Content-Type.",
      B: "إجابة صحيحة! العبارات المسجلة هي الأنماط الشائعة لهجمات SQLi.",
      C: "اخترت C، هجمات Brute Force ترصد بتكرار المحاولات الفاشلة من نفس الـ IP.",
      D: "اخترت D، ثغرات CSRF ترتبط بغياب Tokens في الطلبات."
    },
    commonMistake: "نسيان استخدام شارة ignore case (?i) مما يسمح للمهاجم بتجاوز الفحص بكتابة UnIoN SeLeCt.",
    cyberSecurityUseCase: "صياغة قواعد أنظمة WAF و ModSecurity ورصد التهديدات المباشرة.",
    concepts: ["Log Analysis", "SQL Injection", "WAF Rule"]
  },
  {
    id: "regex-013",
    courseId: "regex",
    topic: "email-validation",
    difficulty: "medium",
    type: "mcq",
    question: "أي نمط هو الأنسب لفحص البريد الإلكتروني ومنع الإدخالات الخبيثة؟",
    code: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
    options: [
      { id: "A", text: ".*@.*" },
      { id: "B", text: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$" },
      { id: "C", text: "\\w+@\\w+" },
      { id: "D", text: "^.+@.+$" }
    ],
    correctAnswer: "B",
    explanation: "النمط B يحقق المرساة الدقيقة في البداية والنهاية، ويسمح بالرموز المقبولة قياسياً فقط قبل وبعد @ وتأكيد امتداد النطاق.",
    optionExplanations: {
      A: "اخترت A، بسيط جداً ويسمح بمدخلات خبيثة نصوصها تحتوي فقط علامة @ في مكان ما.",
      B: "إجابة صحيحة! يحدد البنية القانونية للبريد بدون ثغرات.",
      C: "اخترت C، لا يفحص النقطة . أو امتداد النطاق TLD.",
      D: "اخترت D، واسع جداً ولا يمنع الرموز الخبيثة."
    },
    commonMistake: "استخدام أنماط تبسيطية تسمح بإدخال وسوم سكريبت خبيثة داخل البريد.",
    cyberSecurityUseCase: "Sanitization وتدقيق بيانات المستخدمين في الأنظمة الحساسة.",
    concepts: ["Email Validation", "Input Sanitization", "RegEx Security"]
  },
  {
    id: "regex-014",
    courseId: "regex",
    topic: "non-capturing-groups",
    difficulty: "medium",
    type: "mcq",
    question: "ما الفائدة الرئيسية من استخدام المجموعة غير الملتقطة (?:pattern) بدلاً من المجموعة العادية (pattern)؟",
    code: "(?:https?|ftp)",
    options: [
      { id: "A", text: "منع المطابقة كلياً" },
      { id: "B", text: "تجميع العناصر منطقياً دون استهلاك ذاكرة لحفظ القيمة في مجموعة ملتقطة مما يحسن الأداء" },
      { id: "C", text: "جعل المطابقة غير حساسة لحالة الأحرف" },
      { id: "D", text: "إلغاء تفعيل الرموز الخاصة" }
    ],
    correctAnswer: "B",
    explanation: "المجموعة غير الملتقطة (?:...) تقوم بتجميع الرموز للتخيير أو تطبيق المحددات دون حفظ النتيجة في الذاكرة كسلسلة ملتقطة، مما يرفع كفاءة المعالجة ويحافظ على التكشيف الصحيح للمجموعات الأخرى.",
    optionExplanations: {
      A: "اخترت A، المطابقة تتم كالمعتاد ولكن دون احتفاظ بالذاكرة.",
      B: "إجابة صحيحة! توفر الذاكرة وتحسن الأداء ولا تشغل أرقام المجموعات.",
      C: "اخترت C، حالة الأحرف ترتبط بالشارة i وليس بالمجموعات.",
      D: "اخترت D، تفعيل الرموز يتم بواسطة الشرطة المائلة العكسية \\."
    },
    commonMistake: "استخدام الأقواس العادية ( ) بكثرة مما يستهلك الذاكرة ويربك أرقام المراجع الخلفية.",
    cyberSecurityUseCase: "معالجة ملايين السجلات في أنظمة SIEM بكفاءة عالية وبدون استهلاك مفرط للذاكرة.",
    concepts: ["Non-capturing Group", "(?:...)", "Performance Optimization"]
  },
  {
    id: "regex-015",
    courseId: "regex",
    topic: "boundaries",
    difficulty: "easy",
    type: "mcq",
    question: "ما الذي يطابقه التعبير \\bcat\\b في النص \"the cat in the category\"؟",
    code: "\\bcat\\b",
    options: [
      { id: "A", text: "يطابق cat الأولى و cat في كلمة category" },
      { id: "B", text: "يطابق الكلمة المستقلة cat الأولى فقط" },
      { id: "C", text: "يطابق كلمة category فقط" },
      { id: "D", text: "لا يطابق أي كلمة" }
    ],
    correctAnswer: "B",
    explanation: "الرمز \\b يمثل حد الكلمة (Word Boundary). بالتالي \\bcat\\b تشترط أن تكون cat كلمة كاملة مسبوقة ومتبوعة بحرف غير كلمة، فلا تطابق cat داخل category.",
    optionExplanations: {
      A: "اخترت A، الرمز \\b يمنع مطابقة cat ضمن الكلمات الأطول.",
      B: "إجابة صحيحة! \\b يضمن أن الكلمة مستقلة تماماً.",
      C: "اخترت C، category تحتوي حروفاً إضافية بعد cat يرفضها \\b في النهاية.",
      D: "اخترت D، cat الأولى كلمة كاملة ومطابقة بالكامل."
    },
    commonMistake: "إهمال \\b عند البحث عن كلمات مفتاحية مما يسبب نتائج إيجابية كاذبة (False Positives).",
    cyberSecurityUseCase: "البحث عن كلمات المرور الافتراضية والأوامر المحددة في سجلات الأوامر الحية.",
    concepts: ["Word Boundary", "\\b", "False Positive Reduction"]
  }
];
