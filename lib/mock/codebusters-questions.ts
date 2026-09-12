/**
 * Codebusters 2027 initial question bank — cbus-q1–cbus-q40.
 *
 * Text-only items based on the six ciphers listed in RULES_2027.md.
 * The short cipher examples were independently checked during authoring.
 */
import type {
  DifficultyLevel,
  Question,
  QuestionVerificationStatus,
} from "@/lib/types";

export const CODEBUSTERS_EVENT_ID = "codebusters";

export const CODEBUSTERS_TOPIC_IDS = [
  "baconian",
  "porta",
  "aristocrat",
  "cryptarithm",
  "caesar-atbash",
  "cryptanalysis-strategy",
] as const;

export type CodebustersTopicId = (typeof CODEBUSTERS_TOPIC_IDS)[number];

export type CodebustersCognitiveDemand =
  | "recall"
  | "recognition"
  | "distinction"
  | "application"
  | "multi-step";

export type CodebustersSourceType = "rules-derived";

export type CodebustersQuestion = Question & {
  topicId: CodebustersTopicId;
  cognitiveDemand: CodebustersCognitiveDemand;
  sourceType: CodebustersSourceType;
  sourceNote: string;
  evidenceIds: string[];
  verificationStatus: QuestionVerificationStatus;
  imageRequired: false;
};

const EVENT_ID = CODEBUSTERS_EVENT_ID;

function cbus(input: {
  id: string;
  topicId: CodebustersTopicId;
  difficulty: DifficultyLevel;
  prompt: string;
  choiceTexts: [string, string, string, string];
  correctChoiceId: "a" | "b" | "c" | "d";
  hint: string;
  explanation: string;
  cognitiveDemand: CodebustersCognitiveDemand;
  evidenceId: string;
}): CodebustersQuestion {
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
    explanation: input.explanation,
    cognitiveDemand: input.cognitiveDemand,
    sourceType: "rules-derived",
    sourceNote: "RULES_2027.md CIPHERS section.",
    evidenceIds: [input.evidenceId],
    verificationStatus: "verified",
    imageRequired: false,
  };
}

export const MOCK_CODEBUSTERS_QUESTIONS: CodebustersQuestion[] = [
  cbus({
    id: "cbus-q1",
    topicId: "baconian",
    difficulty: 1,
    prompt: "What two symbols does the Baconian cipher use?",
    choiceTexts: ["0 and 1", "A and B", "X and O", "A and Z"],
    correctChoiceId: "b",
    hint: "The cipher names its two symbols directly.",
    explanation:
      "Baconian uses groups made from two symbols: A and B.",
    cognitiveDemand: "recall",
    evidenceId: "CB-RULES-BACONIAN",
  }),
  cbus({
    id: "cbus-q2",
    topicId: "baconian",
    difficulty: 1,
    prompt: "How many A/B symbols represent one Baconian letter?",
    choiceTexts: ["3", "4", "5", "6"],
    correctChoiceId: "c",
    hint: "Count the symbols in AAAAA, the example for the first letter.",
    explanation:
      "Each Baconian letter is represented by a group of five A/B symbols.",
    cognitiveDemand: "recall",
    evidenceId: "CB-RULES-BACONIAN",
  }),
  cbus({
    id: "cbus-q3",
    topicId: "baconian",
    difficulty: 2,
    prompt:
      "Using AAAAA = A, AAAAB = B, and AAABA = C, what letter does AAABB represent?",
    choiceTexts: ["B", "C", "D", "E"],
    correctChoiceId: "c",
    hint: "Continue the five-symbol pattern after AAABA.",
    explanation:
      "AAABB is the fourth pattern in the sequence, so it represents D.",
    cognitiveDemand: "application",
    evidenceId: "CB-RULES-BACONIAN",
  }),
  cbus({
    id: "cbus-q4",
    topicId: "baconian",
    difficulty: 2,
    prompt:
      "Decode the Baconian groups ABBBA AAAAA BAABA. What plaintext do they make?",
    choiceTexts: ["PART", "PATE", "PAT", "PORT"],
    correctChoiceId: "c",
    hint: "Decode one group of five symbols at a time.",
    explanation:
      "ABBBA is P, AAAAA is A, and BAABA is T. Together they spell PAT.",
    cognitiveDemand: "multi-step",
    evidenceId: "CB-RULES-BACONIAN",
  }),
  cbus({
    id: "cbus-q5",
    topicId: "baconian",
    difficulty: 1,
    prompt:
      "In the original Baconian alphabet, which pairs are treated as the same letter?",
    choiceTexts: ["A/B and C/D", "I/J and U/V", "M/N and O/P", "R/S and Y/Z"],
    correctChoiceId: "b",
    hint: "The original alphabet has 24 letters rather than 26.",
    explanation:
      "The original Baconian alphabet treats I and J as one letter and U and V as one letter.",
    cognitiveDemand: "recall",
    evidenceId: "CB-RULES-BACONIAN",
  }),
  cbus({
    id: "cbus-q6",
    topicId: "baconian",
    difficulty: 2,
    prompt:
      "A Baconian message contains 17 A/B symbols. What should you do before decoding it into letters?",
    choiceTexts: [
      "Read all 17 symbols as one letter.",
      "Group the first 15 symbols and check the remaining 2 as an incomplete group.",
      "Add three random symbols to make the message longer.",
      "Reverse every group before counting it.",
    ],
    correctChoiceId: "b",
    hint: "Every decoded letter needs a complete group of five symbols.",
    explanation:
      "Seventeen symbols make three complete groups of five with two symbols left over. The incomplete group signals that the message needs to be checked before all of it can be decoded.",
    cognitiveDemand: "application",
    evidenceId: "CB-RULES-BACONIAN",
  }),
  cbus({
    id: "cbus-q7",
    topicId: "baconian",
    difficulty: 2,
    prompt:
      "Which plaintext is represented by the Baconian groups BABAA AAAAA BAAAA ABABB?",
    choiceTexts: ["WARM", "WORM", "FARM", "WARE"],
    correctChoiceId: "a",
    hint: "Decode BABAA, AAAAA, BAAAA, and ABABB separately.",
    explanation:
      "BABAA is W, AAAAA is A, BAAAA is R, and ABABB is M. The plaintext is WARM.",
    cognitiveDemand: "multi-step",
    evidenceId: "CB-RULES-BACONIAN",
  }),
  cbus({
    id: "cbus-q8",
    topicId: "porta",
    difficulty: 1,
    prompt: "What does the repeating keyword do in a Porta cipher?",
    choiceTexts: [
      "It changes every space into a number.",
      "It tells you how many letters to delete.",
      "It chooses which substitution alphabet is used at each position.",
      "It supplies the five A/B symbols for each letter.",
    ],
    correctChoiceId: "c",
    hint: "The keyword repeats to match the message length.",
    explanation:
      "In Porta, each plaintext position is matched with a repeating keyword letter, which selects the substitution alphabet for that position.",
    cognitiveDemand: "recognition",
    evidenceId: "CB-RULES-PORTA",
  }),
  cbus({
    id: "cbus-q9",
    topicId: "porta",
    difficulty: 1,
    prompt: "What is special about Porta decryption?",
    choiceTexts: [
      "It removes spaces before the reverse operation.",
      "It always shifts every letter back by one.",
      "It requires a different keyword for every letter.",
      "It uses the exact same reciprocal process as encryption.",
    ],
    correctChoiceId: "d",
    hint: "The rules call the cipher reciprocal.",
    explanation:
      "Porta is reciprocal, so the same keyword and substitution process can be used for both encoding and decoding.",
    cognitiveDemand: "recall",
    evidenceId: "CB-RULES-PORTA",
  }),
  cbus({
    id: "cbus-q10",
    topicId: "porta",
    difficulty: 2,
    prompt:
      "A Porta message has eight letters and uses the keyword KEY. Which keyword letters align with message positions 1 through 8?",
    choiceTexts: [
      "K E Y K Y E K Y",
      "K E Y K E Y K E",
      "K K K E E E Y Y",
      "K E Y E K Y E K",
    ],
    correctChoiceId: "b",
    hint: "Write KEY repeatedly until it reaches eight positions.",
    explanation:
      "Repeating KEY across eight positions gives KEYKEYKE.",
    cognitiveDemand: "application",
    evidenceId: "CB-RULES-PORTA",
  }),
  cbus({
    id: "cbus-q11",
    topicId: "porta",
    difficulty: 2,
    prompt:
      "When two plaintext letters use the same aligned Porta keyword letter, what should you expect?",
    choiceTexts: [
      "The keyword must restart at the next letter.",
      "They must become the same ciphertext letter.",
      "The second letter must be shifted one extra place.",
      "They use the same substitution alphabet for those positions.",
    ],
    correctChoiceId: "d",
    hint: "The keyword selects an alphabet; it does not decide the plaintext letter itself.",
    explanation:
      "The same keyword letter selects the same Porta substitution alphabet, although different plaintext letters can still encrypt to different ciphertext letters.",
    cognitiveDemand: "distinction",
    evidenceId: "CB-RULES-PORTA",
  }),
  cbus({
    id: "cbus-q12",
    topicId: "porta",
    difficulty: 2,
    prompt:
      "You know the Porta keyword but not the plaintext. What is the best first step?",
    choiceTexts: [
      "Remove repeated letters before using the keyword.",
      "Assume every ciphertext letter is the letter before it.",
      "Translate each letter with Atbash first.",
      "Repeat the keyword across the ciphertext and use the matching reference-sheet alphabets.",
    ],
    correctChoiceId: "d",
    hint: "Use the information the cipher requires: the keyword and its alphabets.",
    explanation:
      "A known Porta keyword lets you align the repeating key and select the correct reference-sheet alphabet at each position.",
    cognitiveDemand: "application",
    evidenceId: "CB-RULES-PORTA",
  }),
  cbus({
    id: "cbus-q13",
    topicId: "porta",
    difficulty: 2,
    prompt:
      "For this question, use the provided reciprocal alphabet A↔N, B↔O, C↔P, D↔Q, and so on through M↔Z. What is the encryption of BAD?",
    choiceTexts: ["OQN", "NPO", "ONQ", "QNO"],
    correctChoiceId: "c",
    hint: "Apply the provided pairs one letter at a time.",
    explanation:
      "B maps to O, A maps to N, and D maps to Q. The result is ONQ.",
    cognitiveDemand: "application",
    evidenceId: "CB-RULES-PORTA",
  }),
  cbus({
    id: "cbus-q14",
    topicId: "porta",
    difficulty: 3,
    prompt:
      "A Porta solver uses keyword KEY but shifts the keyword one position before starting. What is the main error?",
    choiceTexts: [
      "Every message position is matched with the wrong substitution alphabet.",
      "Porta keywords may not contain the letter K.",
      "Porta requires a new keyword for every word.",
      "A reciprocal cipher cannot be decoded.",
    ],
    correctChoiceId: "a",
    hint: "Compare the intended alignment KEYKEY... with the shifted alignment.",
    explanation:
      "The keyword letter aligned with each message position selects the substitution alphabet. Starting one position late shifts every selection and can make the whole solution incorrect.",
    cognitiveDemand: "multi-step",
    evidenceId: "CB-RULES-PORTA",
  }),
  cbus({
    id: "cbus-q15",
    topicId: "aristocrat",
    difficulty: 1,
    prompt: "What kind of cipher is an aristocrat?",
    choiceTexts: [
      "A code using only A and B groups of five",
      "A substitution cipher using a different letter for each alphabet letter",
      "A digit puzzle using only addition",
      "A reverse-alphabet substitution with no possible key",
    ],
    correctChoiceId: "b",
    hint: "Focus on what replaces each plaintext letter.",
    explanation:
      "An aristocrat replaces each letter of the alphabet with a different letter.",
    cognitiveDemand: "recall",
    evidenceId: "CB-RULES-ARISTOCRAT",
  }),
  cbus({
    id: "cbus-q16",
    topicId: "aristocrat",
    difficulty: 1,
    prompt:
      "What happens to spaces and punctuation when an aristocrat is encrypted?",
    choiceTexts: [
      "They are moved to the end of the message.",
      "They are replaced by the letter Z.",
      "They are removed before substitution.",
      "They stay in the same positions.",
    ],
    correctChoiceId: "d",
    hint: "The rules distinguish letters from spaces and punctuation.",
    explanation:
      "Aristocrat substitution changes letters, while spaces and punctuation remain as they were.",
    cognitiveDemand: "recall",
    evidenceId: "CB-RULES-ARISTOCRAT",
  }),
  cbus({
    id: "cbus-q17",
    topicId: "aristocrat",
    difficulty: 1,
    prompt: "Which rule applies to an aristocrat's letter substitution?",
    choiceTexts: [
      "A letter cannot decipher to itself.",
      "Every word must have the same number of letters.",
      "Only vowels can be replaced.",
      "A letter must decipher to the next letter alphabetically.",
    ],
    correctChoiceId: "a",
    hint: "Look for the rule that prevents a letter from keeping its own identity.",
    explanation:
      "The 2027 rules state that an aristocrat cannot map a letter to itself.",
    cognitiveDemand: "recall",
    evidenceId: "CB-RULES-ARISTOCRAT",
  }),
  cbus({
    id: "cbus-q18",
    topicId: "aristocrat",
    difficulty: 2,
    prompt:
      "Use this substitution: M→Q, E→L, T→R, A→X, N→B, O→K. Decode QLLR XR BKKB.",
    choiceTexts: ["MEET AT MOON", "MEET IN MOON", "TELL AT NOON", "MEET AT NOON"],
    correctChoiceId: "d",
    hint: "Reverse each listed pair and keep the spaces.",
    explanation:
      "Q L L R reverses to M E E T, X R to A T, and B K K B to N O O N. The plaintext is MEET AT NOON.",
    cognitiveDemand: "multi-step",
    evidenceId: "CB-RULES-ARISTOCRAT",
  }),
  cbus({
    id: "cbus-q19",
    topicId: "aristocrat",
    difficulty: 2,
    prompt:
      "Using A→X, B→Y, C→Z, and D→W, encode the text BAD.",
    choiceTexts: ["YXW", "XYW", "WYX", "Y X W with spaces"],
    correctChoiceId: "a",
    hint: "Replace B, then A, then D. Do not insert spaces between letters.",
    explanation:
      "B becomes Y, A becomes X, and D becomes W. BAD becomes YXW.",
    cognitiveDemand: "application",
    evidenceId: "CB-RULES-ARISTOCRAT",
  }),
  cbus({
    id: "cbus-q20",
    topicId: "aristocrat",
    difficulty: 2,
    prompt:
      "An aristocrat hint says Q deciphers to E. What does that tell you?",
    choiceTexts: [
      "Every E in the ciphertext represents Q in the plaintext only once.",
      "Every Q in the ciphertext represents E in the plaintext.",
      "Q and E must be removed from the message.",
      "The whole message uses a Caesar shift of Q.",
    ],
    correctChoiceId: "b",
    hint: "A hint gives a letter-to-letter mapping.",
    explanation:
      "The hint supplies the substitution pair Q→E for every occurrence of Q in the ciphertext.",
    cognitiveDemand: "application",
    evidenceId: "CB-RULES-ARISTOCRAT",
  }),
  cbus({
    id: "cbus-q21",
    topicId: "cryptanalysis-strategy",
    difficulty: 2,
    prompt:
      "In an aristocrat, the ciphertext letter X appears twice. Which statement must be true?",
    choiceTexts: [
      "The two X positions represent different plaintext letters.",
      "X always represents the plaintext letter E.",
      "Both X positions represent the same plaintext letter.",
      "Spaces are encrypted as X.",
    ],
    correctChoiceId: "d",
    hint: "A substitution mapping stays consistent throughout one message.",
    explanation:
      "In an aristocrat, one ciphertext letter consistently represents one plaintext letter. Therefore both X positions represent the same plaintext letter.",
    cognitiveDemand: "application",
    evidenceId: "CB-RULES-ARISTOCRAT",
  }),
  cbus({
    id: "cbus-q22",
    topicId: "cryptarithm",
    difficulty: 1,
    prompt: "What does a cryptarithm replace with letters?",
    choiceTexts: [
      "Only spaces in a sentence",
      "Digits in a math puzzle",
      "Five A/B symbols per letter",
      "Alphabet letters with their reverses",
    ],
    correctChoiceId: "c",
    hint: "It is described as a math cipher.",
    explanation:
      "A cryptarithm presents a math puzzle in which digits are replaced by letters. The goal is to determine the digit for each letter.",
    cognitiveDemand: "recall",
    evidenceId: "CB-RULES-CRYPTARITHM",
  }),
  cbus({
    id: "cbus-q23",
    topicId: "cryptarithm",
    difficulty: 2,
    prompt: "In a cryptarithm, A=2 and B=5. What digit must C be if A + B = C?",
    choiceTexts: ["5", "6", "7", "8"],
    correctChoiceId: "c",
    hint: "Substitute the known digits and add them.",
    explanation: "2 + 5 = 7, so C must represent digit 7.",
    cognitiveDemand: "application",
    evidenceId: "CB-RULES-CRYPTARITHM",
  }),
  cbus({
    id: "cbus-q24",
    topicId: "cryptarithm",
    difficulty: 2,
    prompt: "In a cryptarithm, A=9 and B=4. What digit must C be if A − B = C?",
    choiceTexts: ["3", "4", "5", "6"],
    correctChoiceId: "c",
    hint: "Subtract the second known digit from the first.",
    explanation: "9 − 4 = 5, so C must represent digit 5.",
    cognitiveDemand: "application",
    evidenceId: "CB-RULES-CRYPTARITHM",
  }),
  cbus({
    id: "cbus-q25",
    topicId: "cryptarithm",
    difficulty: 2,
    prompt:
      "A solver adds two cryptarithm columns from right to left. Why might the next column need an extra 1?",
    choiceTexts: [
      "The solver has to reverse the equation.",
      "Every cryptarithm column always adds 1.",
      "The alphabet has 26 letters.",
      "The previous column produced a carry.",
    ],
    correctChoiceId: "d",
    hint: "Use the same carrying idea as ordinary addition.",
    explanation:
      "When a column total is 10 or more, the extra ten is carried into the next column as 1.",
    cognitiveDemand: "application",
    evidenceId: "CB-RULES-CRYPTARITHM",
  }),
  cbus({
    id: "cbus-q26",
    topicId: "cryptarithm",
    difficulty: 2,
    prompt:
      "In the equation A + B = C, A=6 and C=9. Which digit must B represent?",
    choiceTexts: ["2", "3", "4", "5"],
    correctChoiceId: "b",
    hint: "Find the missing addend by subtracting A from C.",
    explanation: "9 − 6 = 3, so B must represent digit 3.",
    cognitiveDemand: "application",
    evidenceId: "CB-RULES-CRYPTARITHM",
  }),
  cbus({
    id: "cbus-q27",
    topicId: "cryptarithm",
    difficulty: 3,
    prompt:
      "Solve this addition: A7 + B = C2. If A=3 and B=5, which digit must C represent?",
    choiceTexts: ["2", "3", "4", "5"],
    correctChoiceId: "c",
    hint: "Substitute A and B, then add 37 and 5.",
    explanation: "A7 + B becomes 37 + 5 = 42, so C represents digit 4.",
    cognitiveDemand: "multi-step",
    evidenceId: "CB-RULES-CRYPTARITHM",
  }),
  cbus({
    id: "cbus-q28",
    topicId: "caesar-atbash",
    difficulty: 1,
    prompt: "What operation defines a Caesar cipher?",
    choiceTexts: [
      "Assign a digit to each letter in an addition puzzle.",
      "Replace each letter with its opposite in the alphabet.",
      "Group letters into five A/B symbols.",
      "Shift each letter by the same number of alphabet positions.",
    ],
    correctChoiceId: "d",
    hint: "The cipher uses a fixed movement through the alphabet.",
    explanation:
      "Caesar encryption shifts every letter by a specific number of places down the alphabet.",
    cognitiveDemand: "recall",
    evidenceId: "CB-RULES-CAESAR",
  }),
  cbus({
    id: "cbus-q29",
    topicId: "caesar-atbash",
    difficulty: 2,
    prompt: "Using a Caesar shift of 3 forward, what does CAT become?",
    choiceTexts: ["ECV", "FDW", "DBU", "Z X Q"],
    correctChoiceId: "b",
    hint: "Move C, A, and T forward three places, wrapping only if needed.",
    explanation:
      "C→F, A→D, and T→W. Therefore CAT becomes FDW.",
    cognitiveDemand: "application",
    evidenceId: "CB-RULES-CAESAR",
  }),
  cbus({
    id: "cbus-q30",
    topicId: "caesar-atbash",
    difficulty: 2,
    prompt: "Decode FDW using a Caesar shift of 3 backward.",
    choiceTexts: ["CAT", "DOG", "BAD", "FAR"],
    correctChoiceId: "a",
    hint: "Move F, D, and W backward three places.",
    explanation:
      "F→C, D→A, and W→T. The plaintext is CAT.",
    cognitiveDemand: "application",
    evidenceId: "CB-RULES-CAESAR",
  }),
  cbus({
    id: "cbus-q31",
    topicId: "caesar-atbash",
    difficulty: 2,
    prompt: "With a Caesar shift of 2 forward, what does YZ become?",
    choiceTexts: ["ZA", "XY", "AB", "BC"],
    correctChoiceId: "c",
    hint: "Continue past Z by wrapping back to A.",
    explanation:
      "Y shifted two places forward is A, and Z shifted two places forward is B. The result is AB.",
    cognitiveDemand: "application",
    evidenceId: "CB-RULES-CAESAR",
  }),
  cbus({
    id: "cbus-q32",
    topicId: "caesar-atbash",
    difficulty: 2,
    prompt:
      "A Caesar ciphertext has no stated shift. What is a reasonable first strategy?",
    choiceTexts: [
      "Try possible shifts and look for readable words.",
      "Use the Baconian alphabet immediately.",
      "Keep every letter in the same position.",
      "Reverse the alphabet only once and stop.",
    ],
    correctChoiceId: "a",
    hint: "A Caesar cipher has a small set of possible fixed shifts.",
    explanation:
      "When the shift is not provided, testing possible fixed shifts is a practical way to find the one that produces readable plaintext.",
    cognitiveDemand: "application",
    evidenceId: "CB-RULES-CAESAR",
  }),
  cbus({
    id: "cbus-q33",
    topicId: "caesar-atbash",
    difficulty: 3,
    prompt:
      "A solver decodes FDW by shifting forward 3 and gets I G Z. What should the solver notice?",
    choiceTexts: [
      "The direction is wrong; decoding should shift backward 3.",
      "The message must use Baconian.",
      "The letters should be sorted alphabetically first.",
      "The shift must be increased to 6 for every Caesar message.",
    ],
    correctChoiceId: "a",
    hint: "The rules describe decoding as reversing the encoding shift.",
    explanation:
      "If FDW was made by shifting forward 3, decoding requires shifting backward 3, producing CAT. Shifting forward again moves farther from the plaintext.",
    cognitiveDemand: "multi-step",
    evidenceId: "CB-RULES-CAESAR",
  }),
  cbus({
    id: "cbus-q34",
    topicId: "caesar-atbash",
    difficulty: 1,
    prompt: "What mapping defines Atbash?",
    choiceTexts: [
      "Each letter shifts forward by three places.",
      "Each letter maps to its opposite in the reversed alphabet.",
      "Each letter receives a digit from 0 to 9.",
      "Each letter becomes five A/B symbols.",
    ],
    correctChoiceId: "b",
    hint: "Think of writing the alphabet in one row and its reverse below it.",
    explanation:
      "Atbash maps the standard alphabet to its exact reverse: A↔Z, B↔Y, and so on.",
    cognitiveDemand: "recall",
    evidenceId: "CB-RULES-ATBASH",
  }),
  cbus({
    id: "cbus-q35",
    topicId: "caesar-atbash",
    difficulty: 2,
    prompt: "Using Atbash, what does CODE become?",
    choiceTexts: ["WLVX", "XLMV", "XLDE", "XLWV"],
    correctChoiceId: "d",
    hint: "Match each letter with its opposite in the alphabet.",
    explanation:
      "C→X, O→L, D→W, and E→V. CODE becomes XLWV.",
    cognitiveDemand: "application",
    evidenceId: "CB-RULES-ATBASH",
  }),
  cbus({
    id: "cbus-q36",
    topicId: "caesar-atbash",
    difficulty: 2,
    prompt: "Using Atbash, decode XLWV.",
    choiceTexts: ["CODE", "COLD", "WAVE", "TONE"],
    correctChoiceId: "a",
    hint: "Atbash is reciprocal, so use the same opposite-letter pairs.",
    explanation:
      "X→C, L→O, W→D, and V→E. The plaintext is CODE.",
    cognitiveDemand: "application",
    evidenceId: "CB-RULES-ATBASH",
  }),
  cbus({
    id: "cbus-q37",
    topicId: "caesar-atbash",
    difficulty: 1,
    prompt: "Which Atbash pair is correct?",
    choiceTexts: ["A↔Z", "B↔C", "M↔N", "D↔W only in Caesar"],
    correctChoiceId: "a",
    hint: "Pair the first letter with the last, then continue inward.",
    explanation:
      "Atbash pairs the alphabet from opposite ends, so A pairs with Z.",
    cognitiveDemand: "recognition",
    evidenceId: "CB-RULES-ATBASH",
  }),
  cbus({
    id: "cbus-q38",
    topicId: "cryptanalysis-strategy",
    difficulty: 2,
    prompt:
      "Which clue best separates Atbash from a Caesar cipher when the method is unknown?",
    choiceTexts: [
      "Atbash always uses a repeating keyword, while Caesar uses five-symbol groups.",
      "Atbash uses addition, while Caesar uses subtraction only.",
      "There is no difference in their letter mappings.",
      "Atbash always uses fixed opposite-letter pairs, while Caesar uses one fixed shift.",
    ],
    correctChoiceId: "d",
    hint: "Compare the rule used to choose the replacement letter.",
    explanation:
      "Atbash uses the reversed alphabet, while Caesar uses a constant shift amount. Those are different substitution patterns.",
    cognitiveDemand: "distinction",
    evidenceId: "CB-RULES-ATBASH",
  }),
  cbus({
    id: "cbus-q39",
    topicId: "cryptanalysis-strategy",
    difficulty: 1,
    prompt:
      "For how long can a team earn bonus points on the timed aristocrat?",
    choiceTexts: [
      "Until ten minutes have elapsed",
      "Until the full 40-minute event ends",
      "Only during the first minute",
      "Bonus points are available for every question",
    ],
    correctChoiceId: "a",
    hint: "The rules give a specific time limit for bonus eligibility.",
    explanation:
      "The timed aristocrat can earn bonus points only before ten minutes have elapsed. After that, it still counts as a standard question.",
    cognitiveDemand: "recall",
    evidenceId: "CB-RULES-COMPETITION",
  }),
  cbus({
    id: "cbus-q40",
    topicId: "cryptarithm",
    difficulty: 3,
    prompt:
      "Solve this final-column cryptarithm step: A + B + 1 carry = 10. If A=4, which digit must B represent?",
    choiceTexts: ["4", "5", "6", "7"],
    correctChoiceId: "b",
    hint: "Write the equation as 4 + B + 1 = 10.",
    explanation:
      "Subtract 4 and the carry 1 from 10: B = 10 − 4 − 1 = 5.",
    cognitiveDemand: "multi-step",
    evidenceId: "CB-RULES-CRYPTARITHM",
  }),
];

export function codebustersQuestionToPracticeQuestion(
  question: CodebustersQuestion,
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
    difficulty: question.difficulty,
    imageRequired: question.imageRequired,
    verificationStatus: question.verificationStatus,
  };
}
