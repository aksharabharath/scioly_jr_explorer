/**
 * Anatomy & Physiology 2027 MVP question bank — ap-q1–ap-q45.
 *
 * Text-first items only. Facts are limited to SOURCE-VERIFIED rows in
 * docs/events/anatomy_and_physiology/EVIDENCE_MATRIX_2027.md.
 * MVP QA pass: items are verified or needs-review (no draft).
 */
import { optionalSecondHintFields } from "@/lib/practice";
import { optionalQuestionHelpFields } from "@/lib/question-help";
import type {
  DifficultyLevel,
  PromptTermRef,
  Question,
  QuestionVerificationStatus,
} from "@/lib/types";

export const ANATOMY_PHYSIOLOGY_EVENT_ID = "anatomy-physiology";

export const ANATOMY_TOPIC_IDS = [
  "integument-functions",
  "integument-structure",
  "integument-conditions",
  "bone-tissue",
  "joints",
  "skeletal-conditions",
  "muscle-physiology",
  "muscle-types",
  "listed-muscles",
] as const;

export type AnatomyTopicId = (typeof ANATOMY_TOPIC_IDS)[number];

export type AnatomyCognitiveDemand =
  | "recall"
  | "recognition"
  | "distinction"
  | "application"
  | "multi-step";

export type AnatomySourceType =
  | "openstax"
  | "nih-niams"
  | "cdc"
  | "nci"
  | "medlineplus"
  | "ncbi-statpearls";

export type AnatomyQuestion = Question & {
  topicId: AnatomyTopicId;
  cognitiveDemand: AnatomyCognitiveDemand;
  sourceType: AnatomySourceType;
  sourceNote: string;
  evidenceIds: string[];
  verificationStatus: QuestionVerificationStatus;
  imageRequired: false;
};

const EVENT_ID = ANATOMY_PHYSIOLOGY_EVENT_ID;

function ap(input: {
  id: string;
  topicId: AnatomyTopicId;
  difficulty: DifficultyLevel;
  prompt: string;
  choiceTexts: [string, string, string, string];
  correctChoiceId: "a" | "b" | "c" | "d";
  hint: string;
  hint2?: string;
  promptTerms?: PromptTermRef[];
  wordingHelp?: string;
  explanation: string;
  cognitiveDemand: AnatomyCognitiveDemand;
  sourceType: AnatomySourceType;
  sourceNote: string;
  evidenceIds: string[];
  verificationStatus: QuestionVerificationStatus;
}): AnatomyQuestion {
  return {
    id: input.id,
    eventId: EVENT_ID,
    topicId: input.topicId,
    prompt: input.prompt,
    difficulty: input.difficulty,
    choices: [
      { id: "a", text: input.choiceTexts[0] },
      { id: "b", text: input.choiceTexts[1] },
      { id: "c", text: input.choiceTexts[2] },
      { id: "d", text: input.choiceTexts[3] },
    ],
    correctChoiceId: input.correctChoiceId,
    hint: input.hint,
    ...optionalSecondHintFields(input.hint2),
    ...optionalQuestionHelpFields(input),
    explanation: input.explanation,
    cognitiveDemand: input.cognitiveDemand,
    sourceType: input.sourceType,
    sourceNote: input.sourceNote,
    evidenceIds: input.evidenceIds,
    verificationStatus: input.verificationStatus,
    imageRequired: false,
  };
}

export const MOCK_ANATOMY_PHYSIOLOGY_QUESTIONS: AnatomyQuestion[] = [
  ap({
    id: "ap-q1",
    topicId: "integument-functions",
    difficulty: 1,
    prompt:
      "The skin is described as a first line of defense against grit, microbes, and harmful chemicals. Which skin layer’s keratin and glycolipids also help stop the body from losing water?",
    choiceTexts: [
      "The hypodermis",
      "The stratum corneum",
      "The red bone marrow",
      "The synovial joint cavity",
    ],
    correctChoiceId: "b",
    promptTerms: [{ glossaryId: "keratin" }],
    wordingHelp:
      "This question is asking which layer also helps keep water in the body.",
    hint: "Match the barrier job in the stem with the kind of structure each choice describes.",
    explanation:
      "Keratin and glycolipids in the stratum corneum form a barrier against water loss. The same outer skin also helps defend against microbes and chemicals.",
    cognitiveDemand: "recall",
    sourceType: "openstax",
    sourceNote: "OpenStax A&P 2e §5.3; E-AP-140.",
    verificationStatus: "verified",
    evidenceIds: ["E-AP-140"],
  }),
  ap({
    id: "ap-q2",
    topicId: "integument-functions",
    difficulty: 1,
    prompt:
      "Where does the body first make vitamin D3 (cholecalciferol) when the skin is exposed to UV radiation?",
    choiceTexts: [
      "In the red marrow of long bones",
      "In the synovial fluid of joints",
      "In the intercalated discs of the heart",
      "In the epidermal layer",
    ],
    correctChoiceId: "d",
    hint: "The question asks where the first step happens, not where later organs finish the vitamin.",
    explanation:
      "The epidermis synthesizes vitamin D3 (cholecalciferol) when exposed to UV radiation. The liver and kidneys later convert it to active calcitriol.",
    cognitiveDemand: "recall",
    sourceType: "openstax",
    sourceNote: "OpenStax A&P 2e §5.3; E-AP-144.",
    verificationStatus: "verified",
    evidenceIds: ["E-AP-144"],
  }),
  ap({
    id: "ap-q3",
    topicId: "integument-functions",
    difficulty: 2,
    prompt:
      "After a long run on a hot day, a student’s skin is wet with sweat. How does that sweat help cool the body?",
    choiceTexts: [
      "The sweat freezes on the skin and stores cold",
      "The sweat plugs hair follicles so heat cannot escape",
      "The sweat evaporates from the skin surface, and the body is cooled",
      "The sweat turns into vitamin D and lowers temperature",
    ],
    correctChoiceId: "c",
    hint: "Trace what happens to sweat after it reaches the skin, then compare each proposed cooling process.",
    explanation:
      "When the sweat evaporates from the skin surface, the body is cooled.",
    cognitiveDemand: "application",
    sourceType: "openstax",
    sourceNote: "OpenStax A&P 2e §5.3; E-AP-143.",
    verificationStatus: "verified",
    evidenceIds: ["E-AP-143"],
  }),
  ap({
    id: "ap-q4",
    topicId: "integument-functions",
    difficulty: 3,
    prompt:
      "During hard exercise in heat, the integumentary system uses sweat and a change in dermal blood vessels. What happens to those vessels, and why?",
    choiceTexts: [
      "They constrict so heat stays trapped in the skin only",
      "They dilate so extra heat in the blood can leave through the skin",
      "They close completely so no blood reaches the dermis",
      "They fill with synovial fluid to cushion the skin",
    ],
    correctChoiceId: "b",
    wordingHelp:
      "This question is asking what those blood vessels do, and why they do it.",
    hint: "Compare vessel behavior with the direction heat must move during hard exercise.",
    explanation:
      "When the body is too warm, arterioles in the dermis dilate so excess heat can dissipate through the skin. Sweat evaporating from the skin surface also cools the body.",
    cognitiveDemand: "multi-step",
    sourceType: "openstax",
    sourceNote: "OpenStax A&P 2e §5.3; E-AP-143.",
    verificationStatus: "verified",
    evidenceIds: ["E-AP-143"],
  }),
  ap({
    id: "ap-q5",
    topicId: "integument-functions",
    difficulty: 1,
    prompt:
      "Sweat can help keep microbes from over-colonizing the skin. Which substance in sweat has antibiotic properties that help with that role?",
    choiceTexts: [
      "Melanin",
      "Dermcidin",
      "Acetylcholine",
      "Urate",
    ],
    correctChoiceId: "b",
    hint: "Compare the usual job of each listed chemical with the role sweat is playing in the stem.",
    explanation:
      "Sweat contains dermcidin, which has antibiotic properties that help deter microbes from over-colonizing the skin surface.",
    cognitiveDemand: "recall",
    sourceType: "openstax",
    sourceNote: "OpenStax A&P 2e §5.3; E-AP-141.",
    verificationStatus: "verified",
    evidenceIds: ["E-AP-141"],
  }),
  ap({
    id: "ap-q6",
    topicId: "integument-structure",
    difficulty: 1,
    prompt: "Why can the epidermis be described as avascular?",
    choiceTexts: [
      "It contains only Pacinian corpuscles",
      "It is made entirely of hyaline cartilage",
      "It is a freely moveable synovial joint",
      "It contains no blood vessels",
    ],
    correctChoiceId: "d",
    hint: "Break the term into its parts, then compare each choice’s claim about the tissue.",
    explanation:
      "The epidermis is keratinized stratified squamous epithelium and does not have any blood vessels within it; it is avascular.",
    cognitiveDemand: "recall",
    sourceType: "openstax",
    sourceNote: "OpenStax A&P 2e §5.1; E-AP-021.",
    verificationStatus: "verified",
    evidenceIds: ["E-AP-021"],
  }),
  ap({
    id: "ap-q7",
    topicId: "integument-structure",
    difficulty: 2,
    prompt:
      "Thin skin has four epidermal strata. What extra layer is present in thick skin?",
    choiceTexts: [
      "Stratum basale",
      "Stratum spinosum",
      "Stratum lucidum",
      "Stratum corneum",
    ],
    correctChoiceId: "c",
    promptTerms: [{ glossaryId: "epidermal-strata" }],
    hint: "Use the reference’s thick-skin and thin-skin lists, then compare the layer names in the choices.",
    explanation:
      "Thin skin has four layers (basale, spinosum, granulosum, and corneum). Thick skin has a fifth layer, the stratum lucidum.",
    cognitiveDemand: "distinction",
    sourceType: "openstax",
    sourceNote: "OpenStax A&P 2e §5.1; E-AP-022, E-AP-023.",
    verificationStatus: "verified",
    evidenceIds: ["E-AP-022", "E-AP-023"],
  }),
  ap({
    id: "ap-q8",
    topicId: "integument-structure",
    difficulty: 2,
    prompt:
      "A student compares two touch receptors in the skin. Which pairing is correct?",
    choiceTexts: [
      "Meissner corpuscle detects vibration; Pacinian corpuscle detects light touch",
      "Meissner corpuscle detects light touch; Pacinian corpuscle detects vibration",
      "Both corpuscles detect only pain and temperature",
      "Both corpuscles are found only in hyaline cartilage",
    ],
    correctChoiceId: "b",
    hint: "For each pairing, check the stimulus named for each receptor before choosing.",
    explanation:
      "Meissner (tactile) corpuscles respond to light touch. Pacinian (lamellated) corpuscles respond to vibration.",
    cognitiveDemand: "distinction",
    sourceType: "openstax",
    sourceNote: "OpenStax A&P 2e §5.3; E-AP-142.",
    verificationStatus: "verified",
    evidenceIds: ["E-AP-142"],
  }),
  ap({
    id: "ap-q9",
    topicId: "integument-structure",
    difficulty: 2,
    prompt:
      "Which glands produce hypotonic sweat for thermoregulation and are especially abundant on the palms, soles, and forehead?",
    choiceTexts: [
      "Apocrine sweat glands",
      "Eccrine sweat glands",
      "Meissner corpuscles in the papillary dermis",
      "Red marrow in spongy bone",
    ],
    correctChoiceId: "b",
    promptTerms: [{ glossaryId: "thermoregulation" }],
    hint: "Match the gland’s job and locations with the characteristics described in each choice.",
    explanation:
      "Eccrine sweat glands produce hypotonic sweat for thermoregulation and are especially abundant on the palms, soles, and forehead.",
    cognitiveDemand: "recognition",
    sourceType: "openstax",
    sourceNote: "OpenStax A&P 2e §5.2; E-AP-034.",
    verificationStatus: "verified",
    evidenceIds: ["E-AP-034"],
  }),
  ap({
    id: "ap-q10",
    topicId: "integument-structure",
    difficulty: 2,
    prompt:
      "How do apocrine sweat glands differ from eccrine sweat glands?",
    choiceTexts: [
      "Apocrine glands associate with hair follicles in places such as the armpits, and their sweat includes organic compounds that bacteria can break down, causing odor",
      "Apocrine glands are the main cooling glands on the palms and soles",
      "Apocrine glands produce only hypotonic sweat made of water and salt, with no organic compounds",
      "Apocrine glands are found only inside the synovial cavities of joints",
    ],
    correctChoiceId: "a",
    hint: "Compare each gland option by location, secretion, and role.",
    explanation:
      "Apocrine sweat glands are usually associated with hair follicles in densely hairy areas such as armpits and genital regions. Their sweat includes organic compounds that bacteria can decompose, which can cause odor. Eccrine glands, not apocrine glands, are the main thermoregulatory glands on palms, soles, and forehead.",
    cognitiveDemand: "distinction",
    sourceType: "openstax",
    sourceNote: "OpenStax A&P 2e §5.2; E-AP-034, E-AP-035.",
    verificationStatus: "verified",
    evidenceIds: ["E-AP-034", "E-AP-035"],
  }),
  ap({
    id: "ap-q11",
    topicId: "integument-structure",
    difficulty: 2,
    prompt:
      "Wrinkling of aging skin occurs due to decreased production of which proteins in the dermis?",
    choiceTexts: [
      "Melanin from melanocytes",
      "Keratin of the stratum corneum",
      "Collagen and elastin",
      "Acetylcholine at the neuromuscular junction",
    ],
    correctChoiceId: "c",
    promptTerms: [{ glossaryId: "dermis" }],
    hint: "Use the tissue location in the stem, then compare the protein roles named by each choice.",
    explanation:
      "Wrinkling of the skin occurs due to decreased collagen and elastin production in the dermis. Aging skin also has a thinner epidermis because mitosis in the stratum basale decreases.",
    cognitiveDemand: "recognition",
    sourceType: "openstax",
    sourceNote: "OpenStax A&P 2e §5.3; E-AP-146.",
    verificationStatus: "verified",
    evidenceIds: ["E-AP-146"],
  }),
  ap({
    id: "ap-q12",
    topicId: "integument-conditions",
    difficulty: 1,
    prompt:
      "Which exposure is a documented risk factor for skin cancer?",
    choiceTexts: [
      "Vitamin D made in the epidermis",
      "Eccrine sweat on the palms",
      "Meissner corpuscles in the dermis",
      "Ultraviolet radiation from sunlight or tanning beds",
    ],
    correctChoiceId: "d",
    hint: "Use the source’s prevention guidance, then compare the kind of exposure described in each choice.",
    explanation:
      "Exposure to ultraviolet (UV) radiation is a risk factor for skin cancer. Sunlamps and tanning beds also give off UV radiation.",
    cognitiveDemand: "recall",
    sourceType: "nci",
    sourceNote: "NCI Skin Cancer Prevention PDQ; E-AP-147.",
    verificationStatus: "verified",
    evidenceIds: ["E-AP-147"],
  }),
  ap({
    id: "ap-q13",
    topicId: "integument-conditions",
    difficulty: 3,
    prompt:
      "A person had chickenpox as a child. Years later they develop shingles. What does that later illness tell you about the virus?",
    choiceTexts: [
      "A completely new virus species caused the second illness",
      "Chickenpox is caused by HPV, and shingles is caused by tetanus bacteria",
      "The same varicella-zoster virus stayed dormant and later reactivated",
      "Shingles can occur only if the person never had chickenpox",
    ],
    correctChoiceId: "c",
    wordingHelp:
      "This question is asking what the second illness shows about the virus.",
    hint: "Build a timeline from the two illnesses, then compare what each choice says about the virus.",
    explanation:
      "Chickenpox is caused by varicella-zoster virus (VZV). After recovery, VZV can remain dormant and later reactivate as shingles.",
    cognitiveDemand: "multi-step",
    sourceType: "cdc",
    sourceNote: "CDC About Chickenpox; E-AP-053, E-AP-054.",
    verificationStatus: "verified",
    evidenceIds: ["E-AP-053", "E-AP-054"],
  }),
  ap({
    id: "ap-q14",
    topicId: "integument-conditions",
    difficulty: 2,
    prompt:
      "Melanoma is a cancer of which skin cells?",
    choiceTexts: [
      "Melanocytes",
      "Osteoclasts",
      "Cardiac pacemaker cells",
      "Chondrocytes of hyaline cartilage",
    ],
    correctChoiceId: "a",
    hint: "Focus on the cell type the disease name is referring to.",
    explanation:
      "Melanoma is characterized by the uncontrolled growth of melanocytes. Basal cell carcinoma instead affects stem cells in the stratum basale, and squamous cell carcinoma affects keratinocytes of the stratum spinosum.",
    cognitiveDemand: "recall",
    sourceType: "openstax",
    sourceNote: "OpenStax A&P 2e §5.4; E-AP-044 (related: E-AP-042, E-AP-043).",
    verificationStatus: "verified",
    evidenceIds: ["E-AP-044", "E-AP-042", "E-AP-043"],
  }),
  ap({
    id: "ap-q15",
    topicId: "integument-conditions",
    difficulty: 1,
    prompt:
      "HPV is a common virus that can cause cancers later in life. What is one way to protect against those HPV cancers?",
    choiceTexts: [
      "Avoiding all eccrine sweating",
      "Removing the epiphyseal plate",
      "HPV vaccination",
      "Stretching the sarcomere to 200% of resting length",
    ],
    correctChoiceId: "c",
    hint: "Use the CDC guidance as a reference, then compare each proposed protection with it.",
    explanation:
      "HPV can cause cancers later in life, and HPV vaccination can protect against those cancers. CDC recommends 2 doses starting at ages 11–12 (and vaccination can start at age 9).",
    cognitiveDemand: "recall",
    sourceType: "cdc",
    sourceNote: "CDC About HPV; E-AP-051, E-AP-052.",
    verificationStatus: "verified",
    evidenceIds: ["E-AP-051", "E-AP-052"],
  }),
  ap({
    id: "ap-q16",
    topicId: "bone-tissue",
    difficulty: 1,
    prompt:
      "The skeleton is divided into axial and appendicular parts. Which bones belong to the appendicular skeleton?",
    choiceTexts: [
      "Only the skull and vertebral column",
      "Only the thoracic cage",
      "Only the bones of the head and neck",
      "The bones of the upper and lower limbs, plus the girdle bones that attach the limbs",
    ],
    correctChoiceId: "d",
    hint: "Axial and appendicular are two different lists. Decide which list the question is asking for, then see which choice matches that list rather than the other.",
    explanation:
      "The appendicular skeleton includes all bones of the upper and lower limbs, plus the bones that attach each limb to the axial skeleton. The axial skeleton includes the head, neck, chest, and back.",
    cognitiveDemand: "recall",
    sourceType: "openstax",
    sourceNote: "OpenStax A&P 2e §7.1; E-AP-070, E-AP-071, E-AP-072.",
    verificationStatus: "verified",
    evidenceIds: ["E-AP-070", "E-AP-071", "E-AP-072"],
  }),
  ap({
    id: "ap-q17",
    topicId: "bone-tissue",
    difficulty: 1,
    prompt:
      "What is the microscopic structural unit of compact bone?",
    choiceTexts: [
      "A sarcomere",
      "An osteon (Haversian system)",
      "A Meissner corpuscle",
      "An intercalated disc",
    ],
    correctChoiceId: "b",
    hint: "Use the compact-bone section to compare the scale of each listed structure.",
    explanation:
      "The microscopic structural unit of compact bone is called an osteon, or Haversian system.",
    cognitiveDemand: "recall",
    sourceType: "openstax",
    sourceNote: "OpenStax A&P 2e §6.3; E-AP-076.",
    verificationStatus: "verified",
    evidenceIds: ["E-AP-076"],
  }),
  ap({
    id: "ap-q18",
    topicId: "bone-tissue",
    difficulty: 1,
    prompt:
      "In some spongy bone, red marrow fills the spaces. What process happens there?",
    choiceTexts: [
      "Hematopoiesis (blood-cell production)",
      "Evaporative cooling of sweat",
      "Release of acetylcholine at the NMJ",
      "Formation of a synovial joint cavity",
    ],
    correctChoiceId: "a",
    promptTerms: [{ glossaryId: "spongy-bone" }],
    wordingHelp:
      "This question is asking what process happens in those marrow-filled spaces.",
    hint: "Match each proposed process to the location named in the stem before choosing.",
    explanation:
      "Spaces in some spongy bones contain red marrow, where hematopoiesis (blood-cell production) occurs. Bones also store calcium and phosphate.",
    cognitiveDemand: "recall",
    sourceType: "openstax",
    sourceNote: "OpenStax A&P 2e §6.3 and §7.1; E-AP-078, E-AP-073.",
    verificationStatus: "verified",
    evidenceIds: ["E-AP-078", "E-AP-073"],
  }),
  ap({
    id: "ap-q19",
    topicId: "bone-tissue",
    difficulty: 2,
    prompt:
      "Blood calcium is too low. What does parathyroid hormone (PTH) do to bone tissue in that situation?",
    choiceTexts: [
      "It stimulates osteoclasts so calcium is released from bone into the blood",
      "It converts cartilage directly into vitamin D inside the osteon",
      "It stops all hematopoiesis in red marrow",
      "It turns synovial joints into synarthroses",
    ],
    correctChoiceId: "a",
    hint: "Trace how the hormone changes bone’s calcium balance, then compare the direction of each choice.",
    explanation:
      "When blood calcium is low, PTH stimulates osteoclast proliferation and bone resorption, releasing calcium into the blood.",
    cognitiveDemand: "application",
    sourceType: "openstax",
    sourceNote: "OpenStax A&P 2e §6.7; E-AP-079.",
    verificationStatus: "verified",
    evidenceIds: ["E-AP-079"],
  }),
  ap({
    id: "ap-q20",
    topicId: "bone-tissue",
    difficulty: 1,
    prompt: "Cartilage is described as avascular. What does that mean?",
    choiceTexts: [
      "It is a freely moveable synovial joint",
      "It is the same tissue as compact bone osteons",
      "It pumps blood into arteries",
      "It has no blood vessels supplying it",
    ],
    correctChoiceId: "d",
    hint: "Break the term into its parts, then classify what each option claims about the tissue.",
    explanation:
      "Cartilage is avascular: it has no blood vessels. That is why damaged cartilage does not repair itself as readily as most tissues.",
    cognitiveDemand: "recall",
    sourceType: "openstax",
    sourceNote: "OpenStax A&P 2e §6.4; E-AP-150.",
    verificationStatus: "verified",
    evidenceIds: ["E-AP-150"],
  }),
  ap({
    id: "ap-q21",
    topicId: "bone-tissue",
    difficulty: 3,
    prompt:
      "In endochondral ossification, a hyaline cartilage model is present before bone appears. What is the correct relationship between that cartilage and the bone that follows?",
    choiceTexts: [
      "The cartilage itself turns into bone by changing cell type in place",
      "The cartilage is a template that is replaced by new bone; cartilage does not become bone",
      "The cartilage remains forever as the only tissue of the diaphysis",
      "The cartilage is converted into epidermis by UV light",
    ],
    correctChoiceId: "b",
    hint: "Compare each account of what happens to the temporary model as bone develops.",
    wordingHelp:
      "This question is asking how the cartilage and the bone that comes later are related.",
    explanation:
      "In endochondral ossification, bone develops by replacing hyaline cartilage. Cartilage does not become bone; it serves as a template that is completely replaced by new bone.",
    cognitiveDemand: "distinction",
    sourceType: "openstax",
    sourceNote: "OpenStax A&P 2e §6.4; E-AP-151.",
    verificationStatus: "verified",
    evidenceIds: ["E-AP-151"],
  }),
  ap({
    id: "ap-q22",
    topicId: "bone-tissue",
    difficulty: 2,
    prompt:
      "What is the epiphyseal plate, and what happens when its cartilage is fully replaced by bone?",
    choiceTexts: [
      "It is compact bone that stores yellow marrow; replacement starts hematopoiesis",
      "It is a layer of hyaline cartilage that lets a long bone grow in length; after replacement, an epiphyseal line remains and length growth stops",
      "It is a Meissner corpuscle that detects light touch",
      "It is a motor end-plate that releases acetylcholine",
    ],
    correctChoiceId: "b",
    hint: "Separate each option’s structure claim from its growth outcome, then compare both parts.",
    wordingHelp:
      "This question is asking two things: what that plate is, and what happens after its cartilage is fully replaced by bone.",
    explanation:
      "The epiphyseal plate is a layer of hyaline cartilage and is the area of growth in a long bone. When cartilage there is replaced by bone, longitudinal growth stops and an epiphyseal line remains.",
    cognitiveDemand: "recognition",
    sourceType: "openstax",
    sourceNote: "OpenStax A&P 2e §6.4; E-AP-152.",
    verificationStatus: "verified",
    evidenceIds: ["E-AP-152"],
  }),
  ap({
    id: "ap-q23",
    topicId: "joints",
    difficulty: 2,
    prompt:
      "How is a synovial joint structurally different from a fibrous joint?",
    choiceTexts: [
      "A synovial joint unites bones only with fibrous connective tissue and has no cavity",
      "A synovial joint has a fluid-filled joint cavity; a fibrous joint unites bones with fibrous connective tissue",
      "A synovial joint is always immobile, and a fibrous joint is always freely moveable",
      "A synovial joint is found only in the epidermis",
    ],
    correctChoiceId: "b",
    hint: "Compare the two joints on cavity, connective tissue, and movement claims.",
    explanation:
      "In a fibrous joint, adjacent bones are united by fibrous connective tissue. In a synovial joint, the bones meet inside a fluid-filled joint cavity rather than being directly connected that way. Cartilaginous joints are joined by hyaline cartilage or fibrocartilage.",
    cognitiveDemand: "distinction",
    sourceType: "openstax",
    sourceNote: "OpenStax A&P 2e §9.1; E-AP-154.",
    verificationStatus: "verified",
    evidenceIds: ["E-AP-154"],
  }),
  ap({
    id: "ap-q24",
    topicId: "joints",
    difficulty: 1,
    prompt: "A synarthrosis is a joint that is best described as:",
    choiceTexts: [
      "Freely moveable like every synovial joint",
      "The microscopic unit of compact bone",
      "A hypotonic sweat gland",
      "Immobile",
    ],
    correctChoiceId: "d",
    hint: "Classify the term by the amount of movement it describes, then compare that with each option.",
    explanation:
      "A synarthrosis is an immobile joint. An amphiarthrosis is slightly moveable, and a diarthrosis is a freely moveable joint.",
    cognitiveDemand: "recall",
    sourceType: "openstax",
    sourceNote: "OpenStax A&P 2e §9.1; E-AP-155.",
    verificationStatus: "verified",
    evidenceIds: ["E-AP-155"],
  }),
  ap({
    id: "ap-q25",
    topicId: "joints",
    difficulty: 1,
    prompt:
      "Which two joints are the body’s only ball-and-socket joints?",
    choiceTexts: [
      "Elbow and knee",
      "Hip and shoulder",
      "An osteon and a sarcomere",
      "The epiphyseal plate and the stratum corneum",
    ],
    correctChoiceId: "b",
    hint: "Compare the movement allowed by each joint pair with the joint type named in the question.",
    explanation:
      "The hip joint and the glenohumeral (shoulder) joint are the only ball-and-socket joints of the body. Ball-and-socket joints also have the greatest range of motion among synovial types.",
    cognitiveDemand: "recall",
    sourceType: "openstax",
    sourceNote: "OpenStax A&P 2e §9.4; E-AP-087, E-AP-088.",
    verificationStatus: "verified",
    evidenceIds: ["E-AP-087", "E-AP-088"],
  }),
  ap({
    id: "ap-q26",
    topicId: "joints",
    difficulty: 3,
    prompt:
      "Which pair names the functional class of synovial joints and the synovial type with the greatest range of motion?",
    choiceTexts: [
      "Synarthrosis; hinge",
      "Amphiarthrosis; pivot",
      "Diarthrosis; ball-and-socket",
      "Synarthrosis; plane",
    ],
    correctChoiceId: "c",
    wordingHelp:
      "This question is asking for two names in one pair: the movement class, and the synovial shape with the most movement.",
    hint: "Handle the two parts separately: classify movement, then compare joint shapes by range.",
    explanation:
      "All synovial joints are functionally classified as diarthroses (freely moveable). The joint with the greatest range of motion is the ball-and-socket joint.",
    cognitiveDemand: "multi-step",
    sourceType: "openstax",
    sourceNote: "OpenStax A&P 2e §9.1 and §9.4; E-AP-156, E-AP-088.",
    verificationStatus: "verified",
    evidenceIds: ["E-AP-156", "E-AP-088"],
  }),
  ap({
    id: "ap-q27",
    topicId: "joints",
    difficulty: 2,
    prompt:
      "How is a tendon different from a ligament?",
    choiceTexts: [
      "A tendon attaches a muscle to bone; ligaments are strong bands of fibrous connective tissue",
      "A tendon stores red marrow; a ligament synthesizes vitamin D in the epidermis",
      "A tendon is a Meissner corpuscle; a ligament is a Pacinian corpuscle",
      "A tendon is an osteon; a ligament is a sarcomere",
    ],
    correctChoiceId: "a",
    hint: "For each option, identify what structure it connects or describes.",
    explanation:
      "A tendon is the dense connective tissue structure that attaches a muscle to bone. Ligaments are strong bands of fibrous connective tissue.",
    cognitiveDemand: "distinction",
    sourceType: "openstax",
    sourceNote: "OpenStax A&P 2e §9.4; E-AP-089.",
    verificationStatus: "verified",
    evidenceIds: ["E-AP-089"],
  }),
  ap({
    id: "ap-q28",
    topicId: "skeletal-conditions",
    difficulty: 1,
    prompt: "Osteoarthritis is best described as:",
    choiceTexts: [
      "A softening of bone from vitamin D deficiency in children only",
      "Needle-shaped urate crystals in a joint",
      "A toxin made by Clostridium botulinum",
      "A degenerative joint disease in which joint tissues break down over time",
    ],
    correctChoiceId: "d",
    hint: "Use the condition name, then compare each choice’s disease process with it.",
    explanation:
      "Osteoarthritis is a degenerative joint disease in which the tissues in the joint break down over time.",
    cognitiveDemand: "recall",
    sourceType: "nih-niams",
    sourceNote: "NIAMS Osteoarthritis; E-AP-096.",
    verificationStatus: "verified",
    evidenceIds: ["E-AP-096"],
  }),
  ap({
    id: "ap-q29",
    topicId: "skeletal-conditions",
    difficulty: 1,
    prompt:
      "Osteoporosis develops when bone mineral density and bone mass decrease. When do people typically notice it?",
    choiceTexts: [
      "They typically do not have symptoms until they break a bone",
      "It is noticed as soon as sweat evaporates from the skin",
      "It is noticed only as a first-degree sunburn",
      "It is noticed when varicella-zoster virus reactivates",
    ],
    correctChoiceId: "a",
    hint: "Compare when each choice says a person would notice the change, then match that timing with the bone-density story in the stem.",
    explanation:
      "Osteoporosis develops when bone mineral density and bone mass decrease, which increases fracture risk. People typically do not have symptoms until they break a bone.",
    cognitiveDemand: "recall",
    sourceType: "nih-niams",
    sourceNote: "NIAMS Osteoporosis; E-AP-101.",
    verificationStatus: "verified",
    evidenceIds: ["E-AP-101"],
  }),
  ap({
    id: "ap-q30",
    topicId: "skeletal-conditions",
    difficulty: 3,
    prompt:
      "Vitamin D is needed to absorb calcium and phosphorus. If that vitamin is lacking, which pair of outcomes matches age?",
    choiceTexts: [
      "Children may develop rickets; elderly people may develop osteomalacia (softening of the bones)",
      "Children develop melanoma; elderly people develop HPV",
      "Children develop tetanus lockjaw; elderly people develop chickenpox only",
      "Children develop synovial cavities; elderly people develop stratum lucidum",
    ],
    correctChoiceId: "a",
    hint: "Compare the age group and bone outcome described in each choice with the nutrient problem.",
    explanation:
      "Vitamin D is essential for absorption of calcium and phosphorus. Lack of vitamin D can lead to rickets in children and to osteomalacia, a softening of the bones, in elderly individuals.",
    cognitiveDemand: "multi-step",
    sourceType: "openstax",
    sourceNote: "OpenStax A&P 2e §5.3 and MedlinePlus Osteomalacia; E-AP-145, E-AP-157.",
    verificationStatus: "verified",
    evidenceIds: ["E-AP-145", "E-AP-157"],
  }),
  ap({
    id: "ap-q31",
    topicId: "skeletal-conditions",
    difficulty: 2,
    prompt:
      "In the Salter-Harris system, a Type I (Slipped) fracture goes:",
    choiceTexts: [
      "Through the physis (growth plate) only",
      "Through the physis and the metaphysis",
      "Through the physis into the epiphysis",
      "Through the epiphysis, physis, and metaphysis together",
    ],
    correctChoiceId: "a",
    promptTerms: [{ glossaryId: "salter-harris" }],
    wordingHelp:
      "This question is asking which path a Type I break follows in that system.",
    hint: "Count the named regions in each choice, then compare them with the pattern used for Type I.",
    explanation:
      "Salter-Harris Type I (Slipped) goes through the physis. Type II also involves the metaphysis, Type III involves the epiphysis, and Type IV goes through epiphysis, physis, and metaphysis.",
    cognitiveDemand: "recognition",
    sourceType: "ncbi-statpearls",
    sourceNote: "StatPearls Salter-Harris Fracture; E-AP-093.",
    verificationStatus: "verified",
    evidenceIds: ["E-AP-093"],
  }),
  ap({
    id: "ap-q32",
    topicId: "muscle-physiology",
    difficulty: 1,
    prompt:
      "Besides producing movement, skeletal muscle also helps maintain posture and contributes to homeostasis by:",
    choiceTexts: [
      "Synthesizing cholecalciferol from UV light",
      "Storing yellow marrow in the epidermis",
      "Forming a fluid-filled synovial cavity",
      "Generating heat when ATP is used",
    ],
    correctChoiceId: "d",
    promptTerms: [{ glossaryId: "homeostasis" }],
    wordingHelp:
      "This question is asking how skeletal muscle also helps keep the body’s conditions steady.",
    hint: "Use the reference’s muscle-function list, then compare each option with roles beyond movement and posture.",
    explanation:
      "Skeletal muscles produce movement, help maintain posture, and generate heat. Muscle contraction requires ATP, and breaking down ATP produces heat.",
    cognitiveDemand: "recall",
    sourceType: "openstax",
    sourceNote: "OpenStax A&P 2e §10.2; E-AP-139, E-AP-160.",
    verificationStatus: "verified",
    evidenceIds: ["E-AP-139", "E-AP-160"],
  }),
  ap({
    id: "ap-q33",
    topicId: "muscle-physiology",
    difficulty: 1,
    prompt:
      "The functional unit of a skeletal muscle fiber, running from one Z-disc to the next, is the:",
    choiceTexts: [
      "Osteon",
      "Sarcomere",
      "Pacinian corpuscle",
      "Epiphyseal line",
    ],
    correctChoiceId: "b",
    hint: "Separate the structure’s scale from the tissue system named in the stem, then compare each choice.",
    explanation:
      "The sarcomere is the functional unit of the muscle fiber, bordered by Z-discs. Thin filaments are actin; thick filaments are myosin.",
    cognitiveDemand: "recall",
    sourceType: "openstax",
    sourceNote: "OpenStax A&P 2e §10.2; E-AP-164.",
    verificationStatus: "verified",
    evidenceIds: ["E-AP-164"],
  }),
  ap({
    id: "ap-q34",
    topicId: "muscle-physiology",
    difficulty: 1,
    prompt:
      "At the neuromuscular junction, what chemical messenger does the motor neuron release to signal the muscle fiber?",
    choiceTexts: [
      "Melanin",
      "Acetylcholine (ACh)",
      "Vitamin D3 (cholecalciferol)",
      "Urate",
    ],
    correctChoiceId: "b",
    promptTerms: [{ glossaryId: "neuromuscular-junction" }],
    hint: "The messenger crosses a tiny synaptic cleft to receptors on the motor end-plate.",
    explanation:
      "The neuromuscular junction is where a motor neuron’s terminal meets the muscle fiber. The axon terminal releases acetylcholine (ACh), which binds receptors on the motor end-plate.",
    cognitiveDemand: "recall",
    sourceType: "openstax",
    sourceNote: "OpenStax A&P 2e §10.2; E-AP-165.",
    verificationStatus: "verified",
    evidenceIds: ["E-AP-165"],
  }),
  ap({
    id: "ap-q35",
    topicId: "muscle-physiology",
    difficulty: 2,
    prompt:
      "In excitation-contraction coupling, what must happen before a skeletal muscle fiber can contract?",
    choiceTexts: [
      "The fiber must fire an action potential; calcium ions are then released from the sarcoplasmic reticulum",
      "The epidermis must make vitamin D; phosphate is then stored in sweat",
      "The synovial cavity must fill with marrow; sodium is stored in cartilage",
      "The hair follicle must enter telogen; melanin is released from osteoclasts",
    ],
    correctChoiceId: "a",
    hint: "Trace the excitation-to-contraction sequence and compare the event each choice places before contraction.",
    explanation:
      "For a skeletal muscle fiber to contract, its membrane must be excited—it must fire an action potential. That excitation is coupled to contraction by release of calcium ions (Ca++) from the sarcoplasmic reticulum (SR).",
    cognitiveDemand: "recognition",
    sourceType: "openstax",
    sourceNote: "OpenStax A&P 2e §10.2; E-AP-166.",
    verificationStatus: "verified",
    evidenceIds: ["E-AP-166"],
  }),
  ap({
    id: "ap-q36",
    topicId: "muscle-physiology",
    difficulty: 3,
    prompt:
      "T-tubules carry an action potential into the interior of a skeletal muscle fiber. What happens next that lets sarcomeres contract?",
    choiceTexts: [
      "Keratin in the stratum corneum absorbs the action potential",
      "Calcium channels in the nearby SR open, calcium enters the sarcoplasm, and sarcomeres contract",
      "The epiphyseal plate converts to an epiphyseal line immediately",
      "Apocrine glands release organic sweat into the synaptic cleft",
    ],
    correctChoiceId: "b",
    hint: "Follow the action potential from the T-tubules and compare what each choice says happens next.",
    explanation:
      "T-tubules carry the action potential into the fiber, triggering opening of calcium channels in the adjacent sarcoplasmic reticulum. Arrival of Ca++ in the sarcoplasm initiates contraction of the sarcomeres. That sequence is the heart of excitation-contraction coupling.",
    cognitiveDemand: "multi-step",
    sourceType: "openstax",
    sourceNote: "OpenStax A&P 2e §10.2; E-AP-167, E-AP-166.",
    verificationStatus: "verified",
    evidenceIds: ["E-AP-167", "E-AP-166"],
  }),
  ap({
    id: "ap-q37",
    topicId: "muscle-physiology",
    difficulty: 2,
    prompt:
      "When the biceps brachii flexes the forearm, the triceps brachii can extend it. In that pairing, the triceps is acting as:",
    choiceTexts: [
      "The antagonist (opposite action of the prime mover)",
      "An eccrine sweat gland",
      "A Pacinian corpuscle",
      "Red marrow",
    ],
    correctChoiceId: "a",
    hint: "Compare the two named muscle actions and identify the relationship each choice assigns to that pairing.",
    explanation:
      "The biceps brachii flexes the forearm, and the triceps brachii extends it. A muscle with the opposite action of the prime mover (agonist) is called an antagonist.",
    cognitiveDemand: "distinction",
    sourceType: "openstax",
    sourceNote:
      "OpenStax A&P 2e §11.1; E-AP-121. Biceps/triceps actions: EVIDENCE_MATRIX_2027.md §3 (SOURCE-VERIFIED).",
    verificationStatus: "verified",
    evidenceIds: ["E-AP-121"],
  }),
  ap({
    id: "ap-q38",
    topicId: "muscle-types",
    difficulty: 1,
    prompt:
      "Cardiac muscle tissue is found only in the heart. What is a main job of its coordinated contractions?",
    choiceTexts: [
      "To evaporate sweat from the epidermis",
      "To replace hyaline cartilage in the epiphyseal plate",
      "To produce hypotonic eccrine sweat",
      "To pump blood into the vessels of the circulatory system",
    ],
    correctChoiceId: "d",
    hint: "Use the reference to connect coordinated contractions with their body-level effect, then compare the choices.",
    explanation:
      "Cardiac muscle tissue is found only in the heart. Highly coordinated contractions pump blood into the vessels of the circulatory system.",
    cognitiveDemand: "recall",
    sourceType: "openstax",
    sourceNote: "OpenStax A&P 2e §10.7; E-AP-161.",
    verificationStatus: "verified",
    evidenceIds: ["E-AP-161"],
  }),
  ap({
    id: "ap-q39",
    topicId: "muscle-types",
    difficulty: 2,
    prompt:
      "Which description of cardiac muscle tissue is correct?",
    choiceTexts: [
      "It is striated, organized into sarcomeres, and connected at the ends of fibers by intercalated discs",
      "It is nonstriated and found only in the epidermis",
      "It is the microscopic structural unit of compact bone",
      "It is found in the walls of arteries and veins as involuntary smooth muscle",
    ],
    correctChoiceId: "a",
    hint: "Compare each description on striation, organization, and connections.",
    explanation:
      "Cardiac muscle is striated and organized into sarcomeres. Fibers are connected to one another at their ends by intercalated discs. Coordinated cardiac contractions pump blood into the circulatory vessels.",
    cognitiveDemand: "recognition",
    sourceType: "openstax",
    sourceNote: "OpenStax A&P 2e §10.7; E-AP-162, E-AP-161.",
    verificationStatus: "verified",
    evidenceIds: ["E-AP-162", "E-AP-161"],
  }),
  ap({
    id: "ap-q40",
    topicId: "muscle-types",
    difficulty: 2,
    prompt: "Smooth muscle is described as involuntary. Where is it found?",
    choiceTexts: [
      "Only in the epidermis between Meissner corpuscles",
      "In the walls of hollow organs and in the walls of arteries and veins",
      "Only as the osteon of compact bone",
      "Only attaching biceps brachii to the forearm bones",
    ],
    correctChoiceId: "b",
    promptTerms: [{ glossaryId: "involuntary" }],
    hint: "Use the listed body regions and compare them with the usual location of this muscle tissue.",
    explanation:
      "Smooth muscle is nonstriated and is not under voluntary control. It is present in the walls of hollow organs and in the walls of passageways such as arteries and veins.",
    cognitiveDemand: "distinction",
    sourceType: "openstax",
    sourceNote: "OpenStax A&P 2e §10.8; E-AP-163.",
    verificationStatus: "verified",
    evidenceIds: ["E-AP-163"],
  }),
  ap({
    id: "ap-q41",
    topicId: "listed-muscles",
    difficulty: 2,
    prompt:
      "Which description matches rectus abdominis?",
    choiceTexts: [
      "On the calcaneal tendon; it plantarflexes the foot",
      "On the sternum and ribs 5 and 7; it flexes the vertebral column (as in sitting up)",
      "On the deltoid tuberosity; it abducts the arm",
      "On the central tendon only; it detects vibration",
    ],
    correctChoiceId: "b",
    hint: "Look up the named muscle’s official insertion and action, then compare both with the choices.",
    explanation:
      "Rectus abdominis originates on the pubis and inserts on the sternum and ribs 5 and 7. It is the prime mover for sitting up (flexion of the vertebral column).",
    cognitiveDemand: "recognition",
    sourceType: "openstax",
    sourceNote:
      "EVIDENCE_MATRIX_2027.md §3 Rectus abdominis (SOURCE-VERIFIED O/I/A); OpenStax A&P 2e §11.4 Table 11.6.",
    verificationStatus: "verified",
    evidenceIds: ["E-AP-120"],
  }),
  ap({
    id: "ap-q42",
    topicId: "listed-muscles",
    difficulty: 3,
    prompt:
      "Which description matches the diaphragm?",
    choiceTexts: [
      "On the pubis; it flexes the vertebral column in a sit-up",
      "On the central tendon; it changes thoracic volume during inhalation and exhalation",
      "On the acromion of the scapula; it shrugs the shoulders",
      "On the medial side of the proximal tibia; it flexes the knee and flexes, abducts, and laterally rotates at the hip",
    ],
    correctChoiceId: "b",
    hint: "Find the official insertion and action for the named muscle, then compare that pair with each choice.",
    explanation:
      "The diaphragm inserts on the central tendon. It is the prime mover that changes thoracic volume for inhalation and exhalation.",
    cognitiveDemand: "multi-step",
    sourceType: "openstax",
    sourceNote:
      "EVIDENCE_MATRIX_2027.md §3 Diaphragm (SOURCE-VERIFIED O/I/A); OpenStax A&P 2e §11.4 Table 11.7.",
    verificationStatus: "verified",
    evidenceIds: ["E-AP-120"],
  }),
  ap({
    id: "ap-q43",
    topicId: "listed-muscles",
    difficulty: 2,
    prompt:
      "What is one action of trapezius?",
    choiceTexts: [
      "It flexes the forearm at the elbow",
      "It elevates the shoulders, as in shrugging",
      "It is the prime mover of sitting up",
      "It pumps blood into the aorta",
    ],
    correctChoiceId: "b",
    hint: "Use the muscle reference to compare the actions associated with the named muscle.",
    explanation:
      "Trapezius inserts on the acromion and spine of the scapula and on the clavicle. One action is elevating the shoulders (shrugging). It can also pull the shoulder blades together and tilt the head backwards.",
    cognitiveDemand: "recognition",
    sourceType: "openstax",
    sourceNote:
      "EVIDENCE_MATRIX_2027.md §3 Trapezius (SOURCE-VERIFIED O/I/A); OpenStax A&P 2e §11.5 Table 11.8.",
    verificationStatus: "verified",
    evidenceIds: ["E-AP-120"],
  }),
  ap({
    id: "ap-q44",
    topicId: "listed-muscles",
    difficulty: 3,
    prompt:
      "Sartorius extends from the anterior superior iliac spine to the medial side of the proximal tibia. Which set of actions matches that muscle?",
    choiceTexts: [
      "It only plantarflexes the foot at the ankle",
      "It flexes the leg at the knee and flexes, abducts, and laterally rotates at the hip",
      "It is the prime mover of inhalation by inserting on a central tendon",
      "It produces hypotonic sweat on the forehead",
    ],
    correctChoiceId: "b",
    hint: "Use the named attachments to identify the joints, then compare the action lists.",
    explanation:
      "Sartorius runs from the anterior superior iliac spine to the medial proximal tibia. It flexes the leg at the knee and flexes, abducts, and laterally rotates at the hip.",
    cognitiveDemand: "multi-step",
    sourceType: "openstax",
    sourceNote:
      "EVIDENCE_MATRIX_2027.md §3 Sartorius (SOURCE-VERIFIED O/I/A); OpenStax A&P 2e §11.6.",
    verificationStatus: "verified",
    evidenceIds: ["E-AP-120"],
  }),
  ap({
    id: "ap-q45",
    topicId: "listed-muscles",
    difficulty: 3,
    prompt:
      "What is one action of serratus anterior on the scapula?",
    choiceTexts: [
      "It extends the forearm",
      "It synthesizes vitamin D in the epidermis",
      "It stores red marrow",
      "It protracts the scapula",
    ],
    correctChoiceId: "d",
    hint: "Use the muscle reference to compare the named muscle’s action with each option.",
    explanation:
      "Serratus anterior inserts on the anterior surface of the vertebral border of the scapula and protracts the scapula. (This item does not use a single rib-number origin, because sources give a range.)",
    cognitiveDemand: "recognition",
    sourceType: "openstax",
    sourceNote:
      "EVIDENCE_MATRIX_2027.md §3 Serratus anterior (SOURCE-VERIFIED insertion and action; origin rib range is HUMAN-REVIEW and is not tested); OpenStax A&P 2e §11.5 Table 11.8.",
    verificationStatus: "verified",
    evidenceIds: ["E-AP-120"],
  }),
];

/** Map to the shared Question shape. Keeps verificationStatus for live-practice filtering. */
export function anatomyPhysiologyQuestionToPracticeQuestion(
  question: AnatomyQuestion,
): Question {
  return {
    id: question.id,
    eventId: question.eventId,
    topicId: question.topicId,
    prompt: question.prompt,
    choices: question.choices,
    correctChoiceId: question.correctChoiceId,
    explanation: question.explanation,
    hint: question.hint,
    ...optionalSecondHintFields(question.hint2),
    ...optionalQuestionHelpFields(question),
    difficulty: question.difficulty,
    imageRequired: question.imageRequired,
    verificationStatus: question.verificationStatus,
  };
}
