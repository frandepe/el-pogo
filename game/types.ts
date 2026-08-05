import type { PersonalitySignal } from "./personalitySignals";

export type { PersonalitySignal } from "./personalitySignals";

export type StepType =
  | "CreateArtist"
  | "Upgrade"
  | "Choice"
  | "Info"
  | "Interview"
  | "Market"
  | "Shop"
  | "MiniGame"
  | "Final";

export type InfoTone = "positive" | "neutral" | "negative";

export type GameState = {
  artistName: string;
  bandName: string;
  role: string;
  currentStep: number;
  age: number;
  fame: number;
  fans: number;
  money: number;
  talent: number;
  creativity: number;
  charisma: number;
  reputation: number;
  health: number;
  albums: number;
  concerts: number;
  awards: number;
  grammys: number;
  worldTours: number;
  recordDeals: number;
  bandBreakups: number;
  personalitySignals: Partial<Record<PersonalitySignal, number>>;
  personalityTraits: readonly PersonalityTrait[];
  completedShopItemIds: readonly string[];
  activeContractIds: readonly string[];
  shopCooldowns: readonly ShopCooldown[];
  history: readonly CareerHistoryEntry[];
};

export type CareerHistoryEntry = {
  eventId: string;
  optionId: string;
  variantId?: string;
  outcomeId?: string;
  personalitySignals?: readonly PersonalitySignal[];
};

export type NumericGameStateKey = {
  [Key in keyof GameState]: GameState[Key] extends number ? Key : never;
}[keyof GameState];

export type Effect = Partial<Record<NumericGameStateKey, number>>;

export type TimePassesIntensity = "quiet" | "active" | "intense";

export type TimePasses = {
  months: number;
  intensity: TimePassesIntensity;
};

export type TimePassesResult = {
  effects: Effect;
};

export type OptionRarity = "common" | "uncommon" | "special";

export type ConditionOperator = ">=" | "<=" | ">" | "<" | "=";

export type StatCondition = {
  type?: "stat";
  field: NumericGameStateKey;
  operator: ConditionOperator;
  value: number;
};

export type TraitCondition = {
  type: "trait";
  operator: "has" | "not";
  trait: PersonalityTrait;
};

export type Condition = StatCondition | TraitCondition;

export type EventOption = {
  id: string;
  bandName?: string;
  text: string;
  effects: Effect;
  personalitySignals?: readonly PersonalitySignal[];
  conditions?: readonly Condition[];
  rarity?: OptionRarity;
};

export type GameEvent = {
  id: string;
  stepType: StepType;
  text: string;
  conditions?: readonly Condition[];
  emergencyOption?: EventOption;
  options: readonly EventOption[];
  weight?: number;
};

export type ShopCategory = "career" | "contract" | "luxury";

export type ShopCooldown = {
  itemId: string;
  availableAfterEventCount: number;
};

export type PersonalityTrait =
  | "Rebelde"
  | "Perfeccionista"
  | "Humilde"
  | "Ambicioso"
  | "Impulsivo"
  | "Leal"
  | "Creativo"
  | "Disciplinado"
  | "Auténtico"
  | "Carismático"
  | "Líder"
  | "Intrépido"
  | "Pragmático"
  | "Egocéntrico"
  | "Resiliente";

export type ShopItem = {
  id: string;
  category: ShopCategory;
  name: string;
  text: string;
  price: number;
  effects: Effect;
  conditions?: readonly Condition[];
};

export type CareerEnding =
  | "Promesa de garage"
  | "Figura de culto"
  | "Rockstar nacional"
  | "Leyenda del rock";

export type CareerResult = {
  artistName: string;
  score: number;
  ending: CareerEnding;
  stats: {
    fame: number;
    fans: number;
    money: number;
    talent: number;
    creativity: number;
    charisma: number;
    reputation: number;
    health: number;
    albums: number;
    concerts: number;
    awards: number;
    grammys: number;
    worldTours: number;
    recordDeals: number;
    bandBreakups: number;
  };
  personalityTraits: readonly PersonalityTrait[];
  history: readonly CareerHistoryEntry[];
};
