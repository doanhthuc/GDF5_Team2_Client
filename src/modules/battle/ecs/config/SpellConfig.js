const SpellIDInJSONConfig = {
    FIRE_SPELL: 0,
    FROZEN_SPELL: 1,
    TRAP_SPELL: 2,
}

const SpellEntityTypeIdToIdInJSONConfig = {}
SpellEntityTypeIdToIdInJSONConfig[GameConfig.ENTITY_ID.FIRE_SPELL] = SpellIDInJSONConfig.FIRE_SPELL;
SpellEntityTypeIdToIdInJSONConfig[GameConfig.ENTITY_ID.FROZEN_SPELL] = SpellIDInJSONConfig.FROZEN_SPELL;
SpellEntityTypeIdToIdInJSONConfig[GameConfig.ENTITY_ID.TRAP_SPELL] = SpellIDInJSONConfig.TRAP_SPELL;