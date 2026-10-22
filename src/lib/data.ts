import pPregnancy from "@/assets/p-pregnancy.jpg";
import pFeeding from "@/assets/p-feeding.jpg";
import pHygiene from "@/assets/p-hygiene.jpg";
import pLearning from "@/assets/p-learning.jpg";

/* ---------- Stages & areas ---------- */
export type StageId = "pregnancy" | "infant" | "toddler" | "preschool" | "school";

export const stages: { id: StageId; emoji: string; en: string; ar: string; age: string; ageAr: string }[] = [
  { id: "pregnancy", emoji: "🤰", en: "Pregnancy", ar: "الحمل", age: "Months 1–9", ageAr: "الشهر ١–٩" },
  { id: "infant", emoji: "👶", en: "Infant Care", ar: "رعاية الرضيع", age: "0–12 Months", ageAr: "٠–١٢ شهر" },
  { id: "toddler", emoji: "🧸", en: "Toddler & Parenting", ar: "الطفل والتربية", age: "1–3 Years", ageAr: "١–٣ سنوات" },
  { id: "preschool", emoji: "🎨", en: "Preschool & Nursery", ar: "الحضانة", age: "3–5 Years", ageAr: "٣–٥ سنوات" },
  { id: "school", emoji: "🎒", en: "School Enrollment", ar: "الالتحاق بالمدرسة", age: "5+ Years", ageAr: "+٥ سنوات" },
];

export type Area = "New Cairo" | "Maadi" | "Sheikh Zayed" | "Heliopolis" | "Nasr City" | "Zamalek";
export const areas: { id: Area; ar: string }[] = [
  { id: "New Cairo", ar: "القاهرة الجديدة" },
  { id: "Maadi", ar: "المعادي" },
  { id: "Sheikh Zayed", ar: "الشيخ زايد" },
  { id: "Heliopolis", ar: "مصر الجديدة" },
  { id: "Nasr City", ar: "مدينة نصر" },
  { id: "Zamalek", ar: "الزمالك" },
];

/* ---------- Pregnancy tracker ---------- */
export const pregnancyMonths = [
  { m: 1, fruit: "Poppy seed", emoji: "🌱", size: "0.2 cm", baby: ["Embryo implants in the uterus", "Neural tube begins forming"], mom: ["Missed period", "Fatigue and mild cramps"] },
  { m: 2, fruit: "Raspberry", emoji: "🫐", size: "1.5 cm", baby: ["Heart starts beating", "Tiny arm and leg buds appear"], mom: ["Morning sickness", "Tender breasts, frequent urination"] },
  { m: 3, fruit: "Lime", emoji: "🍋", size: "6 cm", baby: ["Fingers and toes separate", "All major organs formed"], mom: ["Nausea starts easing", "First ultrasound & NT scan"] },
  { m: 4, fruit: "Avocado", emoji: "🥑", size: "12 cm", baby: ["Makes facial expressions", "Can hear muffled sounds"], mom: ["Energy returns", "Small bump starts showing"] },
  { m: 5, fruit: "Mango", emoji: "🥭", size: "16 cm", baby: ["You may feel first kicks", "Develops sleep cycles"], mom: ["Anatomy scan around week 20", "Back ache and leg cramps"] },
  { m: 6, fruit: "Papaya", emoji: "🍈", size: "30 cm", baby: ["Responds to your voice", "Lungs developing"], mom: ["Glucose screening test", "Swelling in feet"] },
  { m: 7, fruit: "Eggplant", emoji: "🍆", size: "37 cm", baby: ["Opens eyes", "Gains fat under the skin"], mom: ["Shortness of breath", "Choose your delivery hospital"] },
  { m: 8, fruit: "Pineapple", emoji: "🍍", size: "45 cm", baby: ["Rapid brain growth", "Turning head-down"], mom: ["Braxton Hicks contractions", "Pack your hospital bag"] },
  { m: 9, fruit: "Watermelon", emoji: "🍉", size: "50 cm", baby: ["Ready for birth", "Lungs fully mature"], mom: ["Baby drops lower", "Watch for labour signs"] },
];

/* ---------- Milestones (non-pregnancy) ---------- */
export const milestones: Record<Exclude<StageId, "pregnancy">, { title: string; physical: string[]; psychological: string[]; behavioral: string[] }> = {
  infant: { title: "First year milestones", physical: ["Holds head up (2–4 m)", "Rolls over (4–6 m)", "Sits unsupported (6–8 m)", "Crawls & stands (9–12 m)"], psychological: ["Social smile (6–8 weeks)", "Recognises your face", "Stranger anxiety (8–10 m)"], behavioral: ["Coos & babbles", "Responds to own name", "Waves bye-bye"] },
  toddler: { title: "Toddler milestones", physical: ["Walks independently", "Climbs stairs with help", "Kicks a ball"], psychological: ["Shows independence", "Big emotions & tantrums", "Begins pretend play"], behavioral: ["50+ words by age 2", "2–3 word sentences", "Follows simple instructions"] },
  preschool: { title: "Preschool milestones", physical: ["Hops on one foot", "Draws circles & people", "Dresses with little help"], psychological: ["Understands feelings of others", "Develops friendships", "Separates from parents easily"], behavioral: ["Tells simple stories", "Takes turns in games", "Counts to 10"] },
  school: { title: "School-age milestones", physical: ["Rides a bicycle", "Fine motor control for writing", "Loses baby teeth"], psychological: ["Growing self-esteem", "Understands rules & fairness", "Handles small frustrations"], behavioral: ["Reads simple words", "Works in groups", "Follows daily routines"] },
};

/* ---------- Quick health cards ---------- */
export type QuickCard = { id: string; icon: string; title: string; points: string[]; disclaimer?: boolean; tone?: "warn" };
export const quickCards: Record<StageId, QuickCard[]> = {
  pregnancy: [
    { id: "q1", icon: "🌙", title: "Hormonal & Psychological Changes", points: ["hCG and progesterone rise sharply in the first trimester", "Mood swings and anxiety are common", "Talk to your doctor if low mood lasts 2+ weeks"] },
    { id: "q2", icon: "💊", title: "Vitamins & Supplements Guide", points: ["Folic acid — usually started before week 12", "Iron & calcium — often from the second trimester", "Vitamin D & Omega-3 (DHA)"], disclaimer: true },
    { id: "q3", icon: "🚨", title: "Warning Signs & Symptoms", points: ["Vaginal bleeding", "Severe headache or blurred vision", "Reduced baby movement after week 28"], tone: "warn" },
    { id: "q4", icon: "🧘", title: "Daily Care Routine", points: ["8–10 glasses of water", "30 minutes of gentle walking", "Sleep on your left side in later months"] },
  ],
  infant: [
    { id: "q5", icon: "🍼", title: "Feeding Basics", points: ["Breastfeed every 2–3 hours for newborns", "Solids usually start around 6 months", "Burp after every feed"] },
    { id: "q6", icon: "💉", title: "Vaccinations", points: ["Follow the Egyptian MoH schedule", "First doses at birth (BCG, Hep B)", "Keep the vaccination card safe"], disclaimer: true },
    { id: "q7", icon: "🚨", title: "Warning Signs", points: ["Fever above 38°C under 3 months", "Difficulty breathing", "Refusing feeds or fewer wet diapers"], tone: "warn" },
    { id: "q8", icon: "😴", title: "Safe Sleep & Hygiene", points: ["Always on the back, firm flat surface", "No pillows or loose blankets", "Keep umbilical stump dry"] },
  ],
  toddler: [
    { id: "q9", icon: "🥦", title: "Toddler Nutrition", points: ["3 meals + 2 snacks daily", "Limit juice and sugar", "Offer new foods many times"] },
    { id: "q10", icon: "💛", title: "Tantrums & Emotions", points: ["Stay calm and name the feeling", "Offer two simple choices", "Praise good behaviour"] },
    { id: "q11", icon: "🚨", title: "When to see a doctor", points: ["High fever over 3 days", "Not walking by 18 months", "No words by 16 months"], tone: "warn" },
    { id: "q12", icon: "🦷", title: "Daily Routine", points: ["Brush teeth twice daily", "11–14 hours of sleep", "Limit screen time to 1 hour"] },
  ],
  preschool: [
    { id: "q13", icon: "🏫", title: "Nursery Readiness", points: ["Basic toilet training", "Short separations without distress", "Interest in other children"] },
    { id: "q14", icon: "🎨", title: "Learning Through Play", points: ["Puzzles and building blocks", "Daily story time", "Outdoor play every day"] },
    { id: "q15", icon: "🚨", title: "Common Illnesses", points: ["Hand, foot & mouth disease", "Ear infections", "Seek care for dehydration signs"], tone: "warn" },
    { id: "q16", icon: "🥗", title: "Healthy Habits", points: ["Packed lunch with protein & fruit", "Hand-washing routine", "10–13 hours of sleep"] },
  ],
  school: [
    { id: "q17", icon: "📚", title: "School Readiness", points: ["Recognises letters and numbers", "Can follow a routine", "Manages toilet & lunch alone"] },
    { id: "q18", icon: "💬", title: "Emotional Support", points: ["Ask open questions about their day", "Watch for signs of bullying", "Celebrate effort, not only grades"] },
    { id: "q19", icon: "🚨", title: "Health Checks", points: ["Annual vision & hearing tests", "Dental check every 6 months", "Watch posture with heavy bags"], tone: "warn" },
    { id: "q20", icon: "⏰", title: "Daily Routine", points: ["9–12 hours of sleep", "Homework at a fixed time", "Active play for 1 hour"] },
  ],
};

/* ---------- Learn ---------- */
export const learnCategories = [
  { id: "physical", en: "Physical & Hormonal", ar: "التغيرات الجسدية" },
  { id: "health", en: "Child Health & Illnesses", ar: "صحة الطفل" },
  { id: "redflag", en: "Red Flag Symptoms", ar: "أعراض خطيرة" },
  { id: "care", en: "Daily Care & Feeding", ar: "الرعاية والتغذية" },
  { id: "parenting", en: "Parenting & Behavior", ar: "التربية والسلوك" },
  { id: "nutrition", en: "Vitamins & Nutrition", ar: "الفيتامينات والتغذية" },
] as const;
export type LearnCat = (typeof learnCategories)[number]["id"];

export type Article = { id: string; stages: StageId[]; cat: LearnCat; title: string; read: string; summary: string; points: string[]; doctor?: boolean };
export const articles: Article[] = [
  { id: "a1", stages: ["pregnancy"], cat: "physical", title: "Your body in the first trimester", read: "4 min", summary: "Why you feel tired, nauseous and emotional — and what helps.", points: ["hCG peaks around week 10, causing nausea", "Eat small frequent meals and ginger", "Rest whenever you can"] },
  { id: "a2", stages: ["pregnancy"], cat: "nutrition", title: "Folic acid, iron & calcium explained", read: "5 min", summary: "The key supplements during pregnancy and why they matter.", points: ["Folic acid helps prevent neural tube defects", "Iron supports increased blood volume", "Calcium builds baby's bones"], doctor: true },
  { id: "a3", stages: ["pregnancy"], cat: "redflag", title: "Pregnancy warning signs you shouldn't ignore", read: "3 min", summary: "Go to the hospital immediately if you notice these.", points: ["Heavy bleeding or fluid leakage", "Severe abdominal pain", "Sudden swelling of face and hands", "Baby moving much less than usual"] },
  { id: "a4", stages: ["pregnancy"], cat: "care", title: "Packing your hospital bag", read: "3 min", summary: "A checklist for mom and baby for Cairo hospitals.", points: ["National ID & marriage certificate copies", "Comfortable nightwear & nursing bra", "Baby clothes, diapers and blanket"] },
  { id: "a5", stages: ["pregnancy"], cat: "physical", title: "Sleep positions in late pregnancy", read: "2 min", summary: "How to rest well as your bump grows.", points: ["Sleep on your left side", "Use a U-shaped pillow between knees", "Avoid lying flat on your back"] },
  { id: "a6", stages: ["infant"], cat: "care", title: "Breastfeeding in the first weeks", read: "6 min", summary: "Latching, frequency and building supply.", points: ["Feed on demand 8–12 times a day", "Check for a deep latch", "6+ wet diapers means enough milk"] },
  { id: "a7", stages: ["infant"], cat: "health", title: "Newborn jaundice", read: "4 min", summary: "Common yellowing of the skin — when it's normal.", points: ["Appears day 2–4, fades in 2 weeks", "Frequent feeding helps", "See a doctor if it spreads to legs"] },
  { id: "a8", stages: ["infant", "toddler"], cat: "redflag", title: "Fever in babies: when to rush", read: "3 min", summary: "Temperature rules by age.", points: ["Under 3 months: any fever 38°C+ is urgent", "Over 3 months: urgent if 39°C+ with lethargy", "Never give aspirin to children"], doctor: true },
  { id: "a9", stages: ["infant"], cat: "nutrition", title: "Starting solid foods", read: "5 min", summary: "First foods and allergy tips at 6 months.", points: ["Start with purees: carrot, potato, banana", "Introduce one new food every 3 days", "No honey before 12 months"] },
  { id: "a10", stages: ["infant"], cat: "health", title: "Colic & crying", read: "4 min", summary: "Soothing techniques that work.", points: ["Swaddle and gentle rocking", "White noise", "Usually ends by 4 months"] },
  { id: "a11", stages: ["toddler"], cat: "parenting", title: "Handling tantrums calmly", read: "5 min", summary: "Positive discipline for ages 1–3.", points: ["Stay calm and close", "Name the emotion", "Avoid giving in to screaming"] },
  { id: "a12", stages: ["toddler"], cat: "care", title: "Potty training readiness", read: "4 min", summary: "Signs your toddler is ready.", points: ["Stays dry for 2 hours", "Shows discomfort with dirty diapers", "Can follow simple instructions"] },
  { id: "a13", stages: ["toddler", "preschool"], cat: "nutrition", title: "Picky eaters", read: "4 min", summary: "Building healthy habits without fights.", points: ["Offer, don't force", "Eat together as a family", "Keep portions small"] },
  { id: "a14", stages: ["preschool"], cat: "parenting", title: "The first day at nursery", read: "3 min", summary: "Making separation easier.", points: ["Visit the nursery together first", "Keep goodbyes short and warm", "Bring a comfort toy"] },
  { id: "a15", stages: ["preschool", "school"], cat: "health", title: "Common childhood infections", read: "5 min", summary: "Colds, ear infections and stomach bugs.", points: ["Hand-washing is the best prevention", "Keep children home with fever", "Watch for dehydration"], doctor: true },
  { id: "a16", stages: ["school"], cat: "parenting", title: "Choosing the right curriculum", read: "6 min", summary: "National vs British vs American vs IB in Cairo.", points: ["Consider your long-term plans", "Language of instruction matters", "Visit and ask about class sizes"] },
  { id: "a17", stages: ["school"], cat: "care", title: "Healthy school lunchbox ideas", read: "3 min", summary: "Easy Egyptian-friendly options.", points: ["Feteer with cheese & veggies", "Boiled egg and fruit", "Water instead of juice"] },
  { id: "a18", stages: ["school", "preschool"], cat: "redflag", title: "Signs of anxiety in children", read: "4 min", summary: "Behaviour changes to watch.", points: ["Stomach aches before school", "Trouble sleeping", "Withdrawing from friends"] },
];

export const symptoms = [
  { s: "Fever 38°C+ in a baby under 3 months", level: "urgent" },
  { s: "Difficulty breathing or bluish lips", level: "urgent" },
  { s: "Seizure or unusual stiffness", level: "urgent" },
  { s: "No wet diaper for 8+ hours", level: "urgent" },
  { s: "Persistent vomiting or green vomit", level: "urgent" },
  { s: "Rash that doesn't fade when pressed", level: "urgent" },
  { s: "Fever for more than 3 days", level: "consult" },
  { s: "Ear pulling with fussiness", level: "consult" },
  { s: "Diarrhea for more than 2 days", level: "consult" },
  { s: "Mild cough or runny nose", level: "home" },
  { s: "Mild diaper rash", level: "home" },
  { s: "Teething fussiness", level: "home" },
] as const;

/* ---------- Directory ---------- */
export type Kind = "doctors" | "hospitals" | "nurseries" | "schools";
export type Place = {
  id: string; kind: Kind; name: string; sub: string; area: Area; rating: number; fee: number; feeUnit: string;
  tags: string[]; phone: string; address: string; curriculum?: string; language?: string; ages?: string; admission?: string;
};
export const curricula = ["National", "British IGCSE", "American", "IB", "French", "German"];

export const places: Place[] = [
  // OB/GYN
  { id: "d1", kind: "doctors", name: "Dr. Mona El-Sayed", sub: "OB/GYN", area: "Maadi", rating: 4.8, fee: 800, feeUnit: "consultation", tags: ["High-risk pregnancy", "4D ultrasound"], phone: "+20 100 123 4567", address: "Road 9, Maadi" },
  { id: "d2", kind: "doctors", name: "Dr. Rania Adel", sub: "OB/GYN", area: "New Cairo", rating: 4.9, fee: 1000, feeUnit: "consultation", tags: ["Natural birth", "Fertility"], phone: "+20 111 222 3344", address: "90th St, Fifth Settlement" },
  { id: "d3", kind: "doctors", name: "Dr. Hany Farouk", sub: "OB/GYN", area: "Heliopolis", rating: 4.6, fee: 650, feeUnit: "consultation", tags: ["C-section", "Prenatal care"], phone: "+20 122 456 7890", address: "El Merghany St" },
  { id: "d4", kind: "doctors", name: "Dr. Nadia Samir", sub: "OB/GYN", area: "Sheikh Zayed", rating: 4.7, fee: 900, feeUnit: "consultation", tags: ["Gestational diabetes", "Female doctor"], phone: "+20 106 555 1414", address: "Arkan Plaza" },
  { id: "d5", kind: "doctors", name: "Dr. Tarek Hassan", sub: "OB/GYN", area: "Nasr City", rating: 4.5, fee: 500, feeUnit: "consultation", tags: ["Prenatal care", "Ultrasound"], phone: "+20 109 321 7788", address: "Abbas El Akkad St" },
  { id: "d6", kind: "doctors", name: "Dr. Laila Mansour", sub: "OB/GYN", area: "Zamalek", rating: 4.8, fee: 1200, feeUnit: "consultation", tags: ["Water birth", "Female doctor"], phone: "+20 100 888 9911", address: "26th of July St" },
  // Pediatricians
  { id: "d7", kind: "doctors", name: "Dr. Ahmed Nabil", sub: "Pediatrician", area: "Zamalek", rating: 4.7, fee: 700, feeUnit: "consultation", tags: ["Newborn care", "Vaccinations"], phone: "+20 100 987 6543", address: "Brazil St" },
  { id: "d8", kind: "doctors", name: "Dr. Salma Youssef", sub: "Pediatrician", area: "Sheikh Zayed", rating: 4.8, fee: 750, feeUnit: "consultation", tags: ["Lactation support", "Allergies"], phone: "+20 128 333 2211", address: "Zayed Dunes Mall" },
  { id: "d9", kind: "doctors", name: "Dr. Karim Mostafa", sub: "Pediatrician", area: "Nasr City", rating: 4.5, fee: 450, feeUnit: "consultation", tags: ["Asthma", "Growth monitoring"], phone: "+20 101 444 5566", address: "Makram Ebeid St" },
  { id: "d10", kind: "doctors", name: "Dr. Yasmin Fawzy", sub: "Pediatrician", area: "Maadi", rating: 4.9, fee: 850, feeUnit: "consultation", tags: ["Neonatology", "Development"], phone: "+20 122 909 3030", address: "Road 233, Degla" },
  { id: "d11", kind: "doctors", name: "Dr. Omar Shawky", sub: "Pediatrician", area: "New Cairo", rating: 4.6, fee: 700, feeUnit: "consultation", tags: ["Vaccinations", "Nutrition"], phone: "+20 115 707 6060", address: "Downtown Mall, Fifth Settlement" },
  { id: "d12", kind: "doctors", name: "Dr. Heba Ezzat", sub: "Pediatrician", area: "Heliopolis", rating: 4.7, fee: 600, feeUnit: "consultation", tags: ["Child behaviour", "ADHD"], phone: "+20 127 123 0909", address: "Korba, Baghdad St" },
  // Hospitals
  { id: "h1", kind: "hospitals", name: "Nile Maternity Center", sub: "Maternity", area: "Maadi", rating: 4.7, fee: 30000, feeUnit: "natural delivery", tags: ["NICU", "Private suites", "24/7"], phone: "+20 2 2525 4545", address: "Corniche El Maadi" },
  { id: "h2", kind: "hospitals", name: "Cairo Women's Hospital", sub: "Maternity", area: "Zamalek", rating: 4.6, fee: 25000, feeUnit: "natural delivery", tags: ["NICU", "Lactation clinic"], phone: "+20 2 2735 1111", address: "Abu El Feda St" },
  { id: "h3", kind: "hospitals", name: "New Cairo Birth Hospital", sub: "Maternity", area: "New Cairo", rating: 4.8, fee: 38000, feeUnit: "natural delivery", tags: ["Water birth", "NICU", "Family rooms"], phone: "+20 2 2812 3030", address: "South 90th St" },
  { id: "h4", kind: "hospitals", name: "Little Stars Children's Hospital", sub: "Children's", area: "Heliopolis", rating: 4.8, fee: 600, feeUnit: "ER visit", tags: ["Pediatric ER 24/7", "PICU"], phone: "+20 2 2290 1234", address: "El Hegaz St" },
  { id: "h5", kind: "hospitals", name: "Al-Amal Pediatric Hospital", sub: "Children's", area: "Sheikh Zayed", rating: 4.4, fee: 450, feeUnit: "ER visit", tags: ["Pediatric surgery", "Radiology"], phone: "+20 2 3838 7777", address: "Central Axis" },
  { id: "h6", kind: "hospitals", name: "Nasr Children's Medical Center", sub: "Children's", area: "Nasr City", rating: 4.5, fee: 400, feeUnit: "ER visit", tags: ["Pediatric ER", "Vaccination unit"], phone: "+20 2 2401 5050", address: "Mostafa El Nahas St" },
  // Nurseries (monthly fee)
  { id: "n1", kind: "nurseries", name: "Tiny Steps Nursery", sub: "Montessori", area: "New Cairo", rating: 4.7, fee: 6000, feeUnit: "month", tags: ["Montessori", "Garden", "CCTV"], phone: "+20 109 555 1212", address: "Narges 2", language: "English / Arabic", ages: "6 months – 4 years", admission: "Visit + vaccination card" },
  { id: "n2", kind: "nurseries", name: "Sunflower Kids", sub: "Bilingual", area: "Maadi", rating: 4.5, fee: 4500, feeUnit: "month", tags: ["Bilingual", "Garden", "Meals included"], phone: "+20 120 777 8899", address: "Road 15, Sarayat" , language: "Arabic / English", ages: "1 – 4 years", admission: "Interview + medical report" },
  { id: "n3", kind: "nurseries", name: "Little Explorers", sub: "Play-based", area: "Sheikh Zayed", rating: 4.8, fee: 7500, feeUnit: "month", tags: ["Parent cameras", "Swimming", "Art studio"], phone: "+20 115 999 0000", address: "Beverly Hills", language: "English", ages: "1 – 5 years", admission: "Trial day" },
  { id: "n4", kind: "nurseries", name: "Bambini House", sub: "Reggio Emilia", area: "Zamalek", rating: 4.9, fee: 9000, feeUnit: "month", tags: ["Reggio Emilia", "Music", "French club"], phone: "+20 100 246 8101", address: "Hassan Sabry St", language: "English / French", ages: "18 months – 5 years", admission: "Interview + waiting list" },
  { id: "n5", kind: "nurseries", name: "Happy Hearts", sub: "Bilingual", area: "Nasr City", rating: 4.3, fee: 3200, feeUnit: "month", tags: ["Bilingual", "Transport", "Quran"], phone: "+20 106 135 7911", address: "Zahraa Nasr City", language: "Arabic / English", ages: "1 – 4 years", admission: "Registration form" },
  { id: "n6", kind: "nurseries", name: "Kids Garden Heliopolis", sub: "Play-based", area: "Heliopolis", rating: 4.6, fee: 5000, feeUnit: "month", tags: ["Garden", "Sensory room", "Meals included"], phone: "+20 128 864 2020", address: "El Nozha St", language: "English / Arabic", ages: "6 months – 4 years", admission: "Visit + vaccination card" },
  // Schools (annual fee)
  { id: "s1", kind: "schools", name: "Cairo British Academy", sub: "British IGCSE", area: "New Cairo", rating: 4.7, fee: 180000, feeUnit: "year", tags: ["Swimming", "Robotics", "Drama"], phone: "+20 2 2618 0001", address: "Fifth Settlement", curriculum: "British IGCSE", language: "English", ages: "4 – 18 years", admission: "Assessment + interview" },
  { id: "s2", kind: "schools", name: "Nile American School", sub: "American", area: "Maadi", rating: 4.8, fee: 210000, feeUnit: "year", tags: ["Basketball", "Music", "Debate"], phone: "+20 2 2358 0002", address: "New Maadi", curriculum: "American", language: "English", ages: "4 – 18 years", admission: "MAP test + interview" },
  { id: "s3", kind: "schools", name: "Al-Nour Language School", sub: "National", area: "Nasr City", rating: 4.4, fee: 45000, feeUnit: "year", tags: ["Football", "Art", "Quran"], phone: "+20 2 2274 0003", address: "7th District", curriculum: "National", language: "Arabic / English", ages: "4 – 18 years", admission: "Interview" },
  { id: "s4", kind: "schools", name: "Zayed International School", sub: "IB", area: "Sheikh Zayed", rating: 4.9, fee: 260000, feeUnit: "year", tags: ["Model UN", "Tennis", "Coding"], phone: "+20 2 3851 0004", address: "Zayed 2000", curriculum: "IB", language: "English / French", ages: "3 – 18 years", admission: "Assessment + references" },
  { id: "s5", kind: "schools", name: "Heliopolis German School", sub: "German", area: "Heliopolis", rating: 4.6, fee: 150000, feeUnit: "year", tags: ["Orchestra", "Chess", "Athletics"], phone: "+20 2 2418 0005", address: "Ard El Golf", curriculum: "German", language: "German / Arabic", ages: "4 – 18 years", admission: "Language assessment" },
  { id: "s6", kind: "schools", name: "Lycée Zamalek", sub: "French", area: "Zamalek", rating: 4.7, fee: 165000, feeUnit: "year", tags: ["Theatre", "Library", "Fencing"], phone: "+20 2 2736 0006", address: "Mohamed Mazhar St", curriculum: "French", language: "French / Arabic", ages: "3 – 18 years", admission: "French test + interview" },
  { id: "s7", kind: "schools", name: "Maadi National Academy", sub: "National", area: "Maadi", rating: 4.3, fee: 38000, feeUnit: "year", tags: ["Football", "Science club"], phone: "+20 2 2380 0007", address: "Zahraa El Maadi", curriculum: "National", language: "Arabic / English", ages: "4 – 18 years", admission: "Interview" },
  { id: "s8", kind: "schools", name: "New Cairo American College", sub: "American", area: "New Cairo", rating: 4.6, fee: 195000, feeUnit: "year", tags: ["STEM lab", "Swimming", "Volleyball"], phone: "+20 2 2617 0008", address: "Rehab Road", curriculum: "American", language: "English", ages: "4 – 18 years", admission: "Entrance test" },
];

/* ---------- Products ---------- */
export const productCats = [
  { id: "pregnancy", en: "Pregnancy Essentials", ar: "مستلزمات الحمل", img: pPregnancy },
  { id: "feeding", en: "Feeding & Bottles", ar: "الرضاعة", img: pFeeding },
  { id: "hygiene", en: "Infant Hygiene", ar: "نظافة الرضيع", img: pHygiene },
  { id: "toys", en: "Educational Toys", ar: "ألعاب تعليمية", img: pLearning },
  { id: "school", en: "School Supplies", ar: "أدوات مدرسية", img: pLearning },
] as const;
export type ProductCat = (typeof productCats)[number]["id"];

export type Product = {
  id: string; name: string; cat: ProductCat; stages: StageId[]; purpose: string;
  variants: { brand: string; note: string; offers: { store: string; branch: string; price: number }[] }[];
};

export const products: Product[] = [
  { id: "p1", name: "Pregnancy Pillow", cat: "pregnancy", stages: ["pregnancy"], purpose: "Supports belly, back and hips for better sleep.", variants: [
    { brand: "U-shaped (full body)", note: "Best support", offers: [{ store: "Mothercare", branch: "City Stars", price: 1450 }, { store: "Amazon.eg", branch: "Delivery", price: 1199 }] },
    { brand: "C-shaped", note: "Saves bed space", offers: [{ store: "Noon", branch: "Delivery", price: 950 }, { store: "Babyshop", branch: "Mall of Arabia", price: 1050 }] },
  ] },
  { id: "p2", name: "Prenatal Multivitamin", cat: "pregnancy", stages: ["pregnancy"], purpose: "Folic acid, iron and DHA in one daily tablet.", variants: [
    { brand: "Pregnacare Original (30)", note: "UK brand", offers: [{ store: "El Ezaby Pharmacy", branch: "Maadi", price: 395 }, { store: "Seif Pharmacy", branch: "Heliopolis", price: 420 }] },
    { brand: "Elevit (30)", note: "Higher folic acid", offers: [{ store: "19011 Pharmacy", branch: "New Cairo", price: 610 }, { store: "El Ezaby Pharmacy", branch: "Zamalek", price: 595 }] },
  ] },
  { id: "p3", name: "Maternity Support Belt", cat: "pregnancy", stages: ["pregnancy"], purpose: "Relieves lower back and pelvic pain.", variants: [
    { brand: "Medical belt", note: "Adjustable", offers: [{ store: "Seif Pharmacy", branch: "Nasr City", price: 380 }, { store: "Amazon.eg", branch: "Delivery", price: 340 }] },
  ] },
  { id: "p4", name: "Stretch Mark Cream", cat: "pregnancy", stages: ["pregnancy"], purpose: "Keeps skin moisturised as your bump grows.", variants: [
    { brand: "Mustela Maternité 150ml", note: "Fragrance free", offers: [{ store: "El Ezaby Pharmacy", branch: "Maadi", price: 1150 }, { store: "Noon", branch: "Delivery", price: 1080 }] },
    { brand: "Bio-Oil 125ml", note: "Budget pick", offers: [{ store: "Carrefour", branch: "Maadi City Center", price: 520 }, { store: "Seif Pharmacy", branch: "Heliopolis", price: 560 }] },
  ] },
  { id: "p5", name: "Anti-colic Baby Bottle", cat: "feeding", stages: ["infant"], purpose: "Reduces air intake to prevent colic and gas.", variants: [
    { brand: "Philips Avent 260ml", note: "Popular", offers: [{ store: "Mothercare", branch: "City Stars", price: 520 }, { store: "Babyshop", branch: "Mall of Egypt", price: 480 }, { store: "Amazon.eg", branch: "Delivery", price: 455 }] },
    { brand: "Dr. Brown's 250ml", note: "Vent system", offers: [{ store: "El Ezaby Pharmacy", branch: "New Cairo", price: 590 }, { store: "Noon", branch: "Delivery", price: 545 }] },
  ] },
  { id: "p6", name: "Electric Breast Pump", cat: "feeding", stages: ["infant"], purpose: "Express milk comfortably for returning to work.", variants: [
    { brand: "Medela Swing", note: "Single pump", offers: [{ store: "El Ezaby Pharmacy", branch: "Zamalek", price: 4200 }, { store: "Amazon.eg", branch: "Delivery", price: 3890 }] },
    { brand: "Philips Avent Double", note: "Faster", offers: [{ store: "Mothercare", branch: "Mall of Arabia", price: 6900 }, { store: "Noon", branch: "Delivery", price: 6450 }] },
  ] },
  { id: "p7", name: "Toddler Sippy Cup", cat: "feeding", stages: ["toddler"], purpose: "Helps transition from bottle to cup.", variants: [
    { brand: "Tommee Tippee", note: "Spill proof", offers: [{ store: "Babyshop", branch: "City Stars", price: 260 }, { store: "Noon", branch: "Delivery", price: 230 }] },
  ] },
  { id: "p8", name: "Newborn Diapers (Size 1)", cat: "hygiene", stages: ["infant"], purpose: "Soft, absorbent diapers for newborn skin.", variants: [
    { brand: "Pampers Premium (84)", note: "Wetness indicator", offers: [{ store: "Carrefour", branch: "Maadi City Center", price: 610 }, { store: "Spinneys", branch: "Sheikh Zayed", price: 640 }, { store: "Noon", branch: "Delivery", price: 589 }] },
    { brand: "Molfix (84)", note: "Local value", offers: [{ store: "Carrefour", branch: "City Stars", price: 420 }, { store: "Seoudi", branch: "Zamalek", price: 445 }] },
  ] },
  { id: "p9", name: "Baby Wash & Shampoo", cat: "hygiene", stages: ["infant", "toddler"], purpose: "Tear-free gentle cleanser for daily baths.", variants: [
    { brand: "Johnson's 500ml", note: "Classic", offers: [{ store: "Seif Pharmacy", branch: "Nasr City", price: 210 }, { store: "Carrefour", branch: "Mall of Egypt", price: 195 }] },
    { brand: "Mustela 500ml", note: "Sensitive skin", offers: [{ store: "El Ezaby Pharmacy", branch: "Maadi", price: 690 }, { store: "Noon", branch: "Delivery", price: 650 }] },
  ] },
  { id: "p10", name: "Diaper Rash Cream", cat: "hygiene", stages: ["infant", "toddler"], purpose: "Protects and soothes irritated skin.", variants: [
    { brand: "Sudocrem 125g", note: "Bestseller", offers: [{ store: "19011 Pharmacy", branch: "Heliopolis", price: 240 }, { store: "Seif Pharmacy", branch: "New Cairo", price: 255 }] },
  ] },
  { id: "p11", name: "Stacking Blocks Set", cat: "toys", stages: ["toddler"], purpose: "Builds motor skills and hand-eye coordination.", variants: [
    { brand: "Wooden blocks (30)", note: "Eco", offers: [{ store: "Toys R Us", branch: "Mall of Arabia", price: 550 }, { store: "Amazon.eg", branch: "Delivery", price: 470 }] },
    { brand: "Mega Bloks (40)", note: "Big pieces", offers: [{ store: "Babyshop", branch: "City Stars", price: 690 }, { store: "Noon", branch: "Delivery", price: 640 }] },
  ] },
  { id: "p12", name: "Wooden Puzzle Pack", cat: "toys", stages: ["preschool", "toddler"], purpose: "Shape and colour recognition for early learners.", variants: [
    { brand: "Melissa & Doug (4 puzzles)", note: "Durable", offers: [{ store: "Toys R Us", branch: "Mall of Egypt", price: 890 }, { store: "Noon", branch: "Delivery", price: 820 }] },
  ] },
  { id: "p13", name: "Washable Crayons (24)", cat: "toys", stages: ["preschool"], purpose: "Safe crayons for drawing and creativity.", variants: [
    { brand: "Crayola", note: "Washable", offers: [{ store: "Samir & Aly", branch: "Heliopolis", price: 180 }, { store: "Amazon.eg", branch: "Delivery", price: 165 }] },
  ] },
  { id: "p14", name: "Ergonomic School Backpack", cat: "school", stages: ["school", "preschool"], purpose: "Padded straps protect your child's back.", variants: [
    { brand: "Skip Hop Zoo", note: "Pre-school", offers: [{ store: "Mothercare", branch: "City Stars", price: 1250 }, { store: "Noon", branch: "Delivery", price: 1100 }] },
    { brand: "Samsonite Kids", note: "Primary school", offers: [{ store: "Samir & Aly", branch: "Maadi", price: 1800 }, { store: "Carrefour", branch: "City Stars", price: 1690 }] },
  ] },
  { id: "p15", name: "Lunch Box Set", cat: "school", stages: ["school", "preschool"], purpose: "Leak-proof compartments for healthy meals.", variants: [
    { brand: "Bento box + bottle", note: "BPA free", offers: [{ store: "Carrefour", branch: "Mall of Egypt", price: 320 }, { store: "Amazon.eg", branch: "Delivery", price: 285 }] },
  ] },
  { id: "p16", name: "School Stationery Kit", cat: "school", stages: ["school"], purpose: "Pencils, notebooks, ruler and sharpener.", variants: [
    { brand: "Faber-Castell kit", note: "Complete", offers: [{ store: "Samir & Aly", branch: "Nasr City", price: 450 }, { store: "Alef Bookstore", branch: "Zamalek", price: 480 }] },
  ] },
];

export const egp = (n: number) => `EGP ${n.toLocaleString("en-US")}`;
export const priceRange = (p: Product) => {
  const all = p.variants.flatMap((v) => v.offers.map((o) => o.price));
  return [Math.min(...all), Math.max(...all)] as const;
};
export const productImage = (p: Product) => productCats.find((c) => c.id === p.cat)!.img;
