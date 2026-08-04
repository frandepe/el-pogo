import type { GameState, ShopItem } from "./types";
import { validateConditions } from "./validateConditions";

type ContractPolicy =
  | {
      type: "single-active";
    }
  | {
      cooldownEvents: number;
      type: "cooldown";
    };

export type ShopItemStatus =
  | {
      canPurchase: true;
      label: "Disponible";
      type: "available";
    }
  | {
      canPurchase: false;
      label: "Completado";
      type: "completed";
    }
  | {
      canPurchase: false;
      label: "Activo";
      type: "active";
    }
  | {
      canPurchase: false;
      label: string;
      type: "cooldown";
    }
  | {
      canPurchase: false;
      label: "Dinero insuficiente";
      type: "insufficient-funds";
    };

const contractPolicies: Record<string, ContractPolicy> = {
  "demo-session": {
    type: "single-active",
  },
  "press-campaign": {
    cooldownEvents: 2,
    type: "cooldown",
  },
  "session-musicians": {
    type: "single-active",
  },
  "premium-studio-weekend": {
    type: "single-active",
  },
  "lightning-promo-tour": {
    cooldownEvents: 2,
    type: "cooldown",
  },
};

export const initialShopItems = [
  {
    id: "private-teacher",
    category: "career",
    name: "Profesor particular",
    text: "Un tipo que toca mejor de lo que habla, pero te corrige todo lo que venís haciendo mal.",
    price: 200,
    effects: {
      talent: 4,
    },
  },
  {
    id: "rehearsal-room",
    category: "career",
    name: "Sala de ensayo fija",
    text: "Se terminaron las discusiones por horarios y los amplificadores que no funcionan. Ahora la banda tiene casa.",
    price: 400,
    effects: {
      talent: 2,
      creativity: 2,
    },
  },
  {
    id: "community-manager",
    category: "career",
    name: "Community Manager",
    text: "Mientras vos ensayás, alguien se ocupa de que internet también se entere.",
    price: 700,
    effects: {
      fame: 2,
      fans: 150,
      charisma: 1,
    },
  },

  {
    id: "lawyer",
    category: "career",
    name: "Abogado",
    text: "Hay contratos que se firman con una lapicera. Otros con un buen abogado al lado.",
    price: 700,
    effects: {
      reputation: 3,
      charisma: 1,
    },
  },
  {
    id: "producer",
    category: "career",
    name: "Productor artístico",
    text: "Escucha una canción a medio terminar y ya sabe cuál va a ser el corte difusión.",
    price: 900,
    effects: {
      creativity: 3,
      talent: 2,
    },
  },
  {
    id: "manager",
    category: "career",
    name: "Manager",
    text: "Consigue mejores fechas, negocia contratos y evita que aceptes cualquier cosa por dos pizzas y una birra.",
    price: 1500,
    effects: {
      reputation: 3,
      fame: 2,
      charisma: 1,
    },
  },
  {
    id: "press-agency",
    category: "career",
    name: "Agencia de prensa",
    text: "De golpe empezás a aparecer en lugares donde antes ni sabían que existías.",
    price: 2500,
    effects: {
      fame: 4,
      reputation: 2,
    },
  },
  {
    id: "road-crew",
    category: "career",
    name: "Road Crew",
    text: "Vos preocupate por tocar. Ellos cargan los amplificadores.",
    price: 3200,
    effects: {
      health: 2,
      reputation: 2,
    },
  },
  {
    id: "home-studio",
    category: "career",
    name: "Home Studio",
    text: "Ya no dependés de que alguien te preste un estudio. Las ideas empiezan a grabarse cuando aparecen.",
    price: 5000,
    effects: {
      creativity: 4,
      talent: 2,
    },
  },
  {
    id: "demo-session",
    category: "contract",
    name: "Sesión de demo",
    text: "Un par de horas de estudio para transformar una idea desprolija en algo digno de mostrar.",
    price: 260,
    effects: {
      creativity: 3,
      reputation: 2,
    },
  },
  {
    id: "press-campaign",
    category: "contract",
    name: "Campaña de prensa",
    text: "Durante unas semanas pareciera que todo el mundo habla de vos.",
    price: 160,
    effects: {
      fame: 3,
      reputation: 1,
    },
  },
  {
    id: "session-musicians",
    category: "contract",
    name: "Músicos de sesión",
    text: "Refuerzos precisos para que el próximo tramo suene más grande de lo que es.",
    price: 240,
    effects: {
      talent: 1,
      charisma: 2,
    },
  },
  {
    id: "premium-studio-weekend",
    category: "contract",
    name: "Estudio premium",
    text: "Dos días encerrado grabando. Dormís poco, pero las canciones salen mucho mejor.",
    price: 300,
    effects: {
      creativity: 4,
      health: -1,
    },
  },
  {
    id: "lightning-promo-tour",
    category: "contract",
    name: "Gira promocional",
    text: "Muchos kilómetros, muchas entrevistas y bastante cansancio. Pero cada ciudad suma nuevos seguidores.",
    price: 450,
    effects: {
      fame: 4,
      fans: 400,
      health: -3,
    },
  },
  {
    id: "leather-jacket",
    category: "luxury",
    name: "Campera de cuero",
    text: "No mejora los acordes, pero entra en escena antes que vos.",
    price: 140,
    effects: {
      charisma: 2,
      reputation: 1,
    },
  },
  {
    id: "tattoo-session",
    category: "luxury",
    name: "Manga de tatuajes",
    text: "Tu vieja no lo aprueba. Tus fans sí.",
    price: 1200,
    effects: {
      charisma: 2,
      fame: 1,
    },
  },
  {
    id: "custom-boots",
    category: "luxury",
    name: "Botas personalizadas",
    text: "No son cómodas, pero nadie vino a un recital a mirar zapatillas.",
    price: 900,
    effects: {
      charisma: 1,
      reputation: 1,
    },
  },

  {
    id: "harley-davidson",
    category: "luxury",
    name: "Harley Davidson",
    text: "El motor hace más ruido que algunos teloneros.",
    price: 18000,
    effects: {
      charisma: 3,
      fame: 2,
    },
  },
  {
    id: "classic-car",
    category: "luxury",
    name: "Mustang '67",
    text: "Cada semáforo es una excusa para escuchar el motor.",
    price: 75000,
    effects: {
      fame: 3,
      reputation: -1,
    },
  },
  {
    id: "penthouse",
    category: "luxury",
    name: "Penthouse",
    text: "La ciudad queda allá abajo. Los problemas también.",
    price: 250000,
    effects: {
      health: 2,
      charisma: 2,
    },
  },
  {
    id: "private-jet",
    category: "luxury",
    name: "Jet privado",
    text: "Los aeropuertos comerciales quedaron para otra vida.",
    price: 8000000,
    effects: {
      fame: 6,
      reputation: 2,
    },
  },
  {
    id: "mansion",
    category: "luxury",
    name: "Mansión",
    text: "Tiene tantas habitaciones que una vez tardaste diez minutos en encontrar la cocina.",
    price: 12000000,
    effects: {
      fame: 5,
      health: 3,
    },
  },
] satisfies readonly ShopItem[];

export function getVisibleShopItems(
  gameState: GameState,
  items: readonly ShopItem[] = initialShopItems,
): readonly ShopItem[] {
  return items.filter((item) => validateConditions(gameState, item.conditions));
}

export function getAvailableShopItems(
  gameState: GameState,
  items: readonly ShopItem[] = initialShopItems,
): readonly ShopItem[] {
  return getVisibleShopItems(gameState, items).filter(
    (item) => getShopItemStatus(gameState, item).canPurchase,
  );
}

export function getShopItemStatus(
  gameState: GameState,
  item: ShopItem,
): ShopItemStatus {
  if (item.category !== "contract") {
    if (gameState.completedShopItemIds.includes(item.id)) {
      return {
        canPurchase: false,
        label: "Completado",
        type: "completed",
      };
    }

    return getMoneyStatus(gameState, item);
  }

  const policy = contractPolicies[item.id];

  if (policy?.type === "single-active") {
    if (gameState.activeContractIds.includes(item.id)) {
      return {
        canPurchase: false,
        label: "Activo",
        type: "active",
      };
    }

    return getMoneyStatus(gameState, item);
  }

  if (policy?.type === "cooldown") {
    const cooldown = gameState.shopCooldowns.find(
      (entry) => entry.itemId === item.id,
    );

    if (cooldown) {
      const remainingEvents =
        cooldown.availableAfterEventCount - getNarrativeEventCount(gameState);

      if (remainingEvents > 0) {
        return {
          canPurchase: false,
          label:
            remainingEvents === 1
              ? "Disponible después de 1 evento"
              : `Disponible después de ${remainingEvents} eventos`,
          type: "cooldown",
        };
      }
    }

    return getMoneyStatus(gameState, item);
  }

  return getMoneyStatus(gameState, item);
}

export function completeShopPurchase(
  gameState: GameState,
  item: ShopItem,
): Pick<
  GameState,
  "activeContractIds" | "completedShopItemIds" | "shopCooldowns"
> {
  if (item.category !== "contract") {
    return {
      activeContractIds: gameState.activeContractIds,
      completedShopItemIds: addUnique(gameState.completedShopItemIds, item.id),
      shopCooldowns: gameState.shopCooldowns,
    };
  }

  const policy = contractPolicies[item.id];

  if (policy?.type === "single-active") {
    return {
      activeContractIds: addUnique(gameState.activeContractIds, item.id),
      completedShopItemIds: gameState.completedShopItemIds,
      shopCooldowns: gameState.shopCooldowns,
    };
  }

  if (policy?.type === "cooldown") {
    return {
      activeContractIds: gameState.activeContractIds,
      completedShopItemIds: gameState.completedShopItemIds,
      shopCooldowns: upsertCooldown(
        gameState.shopCooldowns,
        item.id,
        getNarrativeEventCount(gameState) + policy.cooldownEvents,
      ),
    };
  }

  return {
    activeContractIds: gameState.activeContractIds,
    completedShopItemIds: gameState.completedShopItemIds,
    shopCooldowns: gameState.shopCooldowns,
  };
}

export function consumeContract(
  gameState: GameState,
  itemId: string,
): GameState {
  return {
    ...gameState,
    activeContractIds: gameState.activeContractIds.filter(
      (activeItemId) => activeItemId !== itemId,
    ),
  };
}

function getMoneyStatus(gameState: GameState, item: ShopItem): ShopItemStatus {
  if (gameState.money < item.price) {
    return {
      canPurchase: false,
      label: "Dinero insuficiente",
      type: "insufficient-funds",
    };
  }

  return {
    canPurchase: true,
    label: "Disponible",
    type: "available",
  };
}

function getNarrativeEventCount(gameState: GameState) {
  return gameState.history.filter((entry) => entry.eventId !== "shop").length;
}

function addUnique(values: readonly string[], value: string) {
  return values.includes(value) ? values : [...values, value];
}

function upsertCooldown(
  cooldowns: GameState["shopCooldowns"],
  itemId: string,
  availableAfterEventCount: number,
) {
  return [
    ...cooldowns.filter((cooldown) => cooldown.itemId !== itemId),
    {
      itemId,
      availableAfterEventCount,
    },
  ];
}
