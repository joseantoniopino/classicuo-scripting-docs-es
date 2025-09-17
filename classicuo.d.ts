/**
 * ClassicUO Scripting API Type Definitions
 * 
 * Definiciones de tipos TypeScript para la API de Scripting de ClassicUO.
 * Estas definiciones proporcionan IntelliSense completo y verificación de tipos
 * para el desarrollo de scripts en ClassicUO.
 * 
 * @version 4.0.x
 * @author Comunidad ClassicUO
 */

// ===== GLOBAL FUNCTIONS =====

/**
 * Termina la ejecución del script actual
 */
declare function exit(): void;

/**
 * Registra un mensaje en la consola de ClassicUO
 * @param message Mensaje a registrar
 */
declare function log(message: any): void;

/**
 * Pausa la ejecución del script por el tiempo especificado
 * @param milliseconds Tiempo en milisegundos para pausar
 */
declare function sleep(milliseconds: number): void;

// ===== TYPE ALIASES =====

type SerialOrEntity = number | Entity;
type SerialObject = number;

// ===== BASE INTERFACES =====

interface GameObject {
    serial: number;
    graphic: number;
    hue: number;
    x: number;
    y: number;
    z: number;
}

interface Entity extends GameObject {
    direction: Directions;
    hits: number;
    maxHits: number;
    isHidden: boolean;
    name: string;
}

interface Mobile extends Entity {
    mana: number;
    maxMana: number;
    stamina: number;
    maxStamina: number;
    notoriety: Notorieties;
    equippedItems: {
        oneHanded: Item | null;
        twoHanded: Item | null;
        shoes: Item | null;
        pants: Item | null;
        shirt: Item | null;
        hat: Item | null;
        gloves: Item | null;
        ring: Item | null;
        talisman: Item | null;
        necklace: Item | null;
        hair: Item | null;
        waist: Item | null;
        innerTorso: Item | null;
        bracelet: Item | null;
        face: Item | null;
        middleTorso: Item | null;
        earrings: Item | null;
        arms: Item | null;
        cloak: Item | null;
        backpack: Item | null;
        outerTorso: Item | null;
        outerLegs: Item | null;
        innerLegs: Item | null;
        mount: Item | null;
        shopBuy: Item | null;
        shopResale: Item | null;
        shopSell: Item | null;
    };
}

interface Item extends GameObject {
    amount: number;
    container: SerialObject | null;
    contents: Item[];
    layer: Layers;
    properties: string[];
}

interface Player extends Mobile {
    // Basic properties
    str: number;
    dex: number;
    int: number;
    weight: number;
    maxWeight: number;
    gold: number;
    followers: number;
    followersMax: number;
    fireResist: number;
    coldResist: number;
    poisonResist: number;
    energyResist: number;
    luck: number;
    minDamage: number;
    maxDamage: number;
    tithing: number;
    
    // Combat properties
    attackChance: number;
    defenseChance: number;
    lowerManaCost: number;
    lowerReagentCost: number;
    spellDamageIncrease: number;
    fasterCastRecovery: number;
    fasterCasting: number;
    hitChanceIncrease: number;
    swingSpeedIncrease: number;
    damageIncrease: number;
    
    // Magic properties  
    magicResist: number;
    
    // Follower properties
    petSerial: number;
    
    // Methods
    moveItem(item: Item, destination: Item, amount?: number, x?: number, y?: number): boolean;
    moveItemToGround(item: Item, x: number, y: number, z: number, amount?: number): boolean;
    dropItem(item: Item, x: number, y: number, z: number): boolean;
    equip(item: Item): boolean;
    unequip(layer: Layers): boolean;
    useObject(item: SerialOrEntity): boolean;
    use(item: SerialOrEntity): boolean;
    useType(type: number, hue?: number): boolean;
    attack(target: SerialOrEntity): boolean;
    cast(spell: string, target?: SerialOrEntity): boolean;
    say(message: string, hue?: number): boolean;
    whisper(message: string, hue?: number): boolean;
    yell(message: string, hue?: number): boolean;
    walk(direction: Directions): boolean;
    run(direction: Directions): boolean;
    warMode(enabled: boolean): boolean;
    openDoor(): boolean;
    bow(): boolean;
    salute(): boolean;
}

interface Skill {
    name: string;
    value: number;
    baseValue: number;
    cap: number;
    lock: number;
}

// ===== CLIENT NAMESPACE =====

declare namespace Client {
    // Search methods
    function findObject(serial: SerialOrEntity): GameObject | null;
    function findType(type: number, hue?: number, container?: SerialOrEntity, range?: number): Item | null;
    function findTypeEx(type: number, hue?: number, container?: SerialOrEntity, range?: number): Item[];
    function findAlias(alias: string): SerialOrEntity | null;
    function setAlias(alias: string, serial: SerialOrEntity): void;
    function unsetAlias(alias: string): void;
    function promoteAlias(alias: string): boolean;
    function setFindDistance(distance: number): void;
    
    // Entity search
    function searchEntity(searchOption: SearchEntityOptions, searchRange: SearchEntityRangeOptions, hue?: number, range?: number): Mobile | null;
    function searchEntityByType(type: number, searchRange: SearchEntityRangeOptions, hue?: number, range?: number): Entity | null;
    
    // Interface methods
    function headMsg(message: string, target: SerialOrEntity, hue?: number): void;
    function sysMsg(message: string, hue?: number): void;
    function clientPrint(message: string, hue?: number): void;
    function closeClientGumps(): void;
    function closeGump(gumpId: number): void;
    function getSkill(skillName: string): Skill | null;
    function getSkills(): Skill[];
    
    // Trading
    function tradeRequest(target: SerialOrEntity): boolean;
    function tradeResponse(accept: boolean): void;
    
    // Queries  
    function isObjectExist(serial: SerialOrEntity): boolean;
    function getDistance(obj1: SerialOrEntity, obj2?: SerialOrEntity): number;
    function getDir(obj1: SerialOrEntity, obj2?: SerialOrEntity): Directions;
    function isWarMode(): boolean;
    function isDead(): boolean;
    function isHidden(): boolean;
    function isPoisoned(): boolean;
    function isParalyzed(): boolean;
    function isYellowHits(): boolean;
    function isInIgnoreList(serial: SerialOrEntity): boolean;
    
    // Properties
    const dead: boolean;
    const warmode: boolean;
    const hidden: boolean;
    const paralyzed: boolean;
    const poisoned: boolean;
    const yellowHits: boolean;
    const connected: boolean;
}

// ===== TARGET NAMESPACE =====

declare namespace Target {
    // Properties
    const hasTarget: boolean;
    const targetSerial: SerialObject;
    const targetType: number;
    const targetX: number;
    const targetY: number;
    const targetZ: number;
    
    // Methods
    function setTargetClient(serial: SerialOrEntity): void;
    function setTargetToSelf(): void;
    function setTargetToLoc(x: number, y: number, z: number): void;
    function waitTarget(timeout?: number): boolean;
    function waitTargetSelf(timeout?: number): boolean;
    function waitTargetType(type: number, timeout?: number): boolean;
    function waitTargetObject(obj: SerialOrEntity, timeout?: number): boolean;
    function waitTargetTile(tileType: number, x: number, y: number, z: number, timeout?: number): boolean;
    function cancel(): void;
    function clearQueue(): void;
    function performTargetFromList(alias: string): boolean;
}

// ===== JOURNAL NAMESPACE =====

declare namespace Journal {
    // Methods
    function clear(): void;
    function search(text: string, author?: string, ignoreCase?: boolean): boolean;
    function searchByType(text: string, type: MessageType, ignoreCase?: boolean): boolean;
    function searchByColor(text: string, hue: number, ignoreCase?: boolean): boolean;
    function waitForText(text: string, author?: string, timeout?: number, ignoreCase?: boolean): boolean;
    function waitForTextByType(text: string, type: MessageType, timeout?: number, ignoreCase?: boolean): boolean;
    function getTextByType(type: MessageType, author?: string): string[];
    function getJournalText(index: number): string;
    function length(): number;
}

// ===== GUMP CLASS =====

declare class Gump {
    // Static methods
    static findGump(gumpId?: number): Gump | null;
    static findGumps(gumpId?: number): Gump[];
    static closeGump(gumpId: number): void;
    static closeAllGumps(): void;
    static hasGump(): boolean;
    static waitForGump(gumpId?: number, timeout?: number): boolean;
    
    // Instance properties
    readonly gumpId: number;
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
    
    // Instance methods
    reply(buttonId: number, switches?: number[], textEntries?: { [key: number]: string }): void;
    close(): void;
    getLine(lineNumber: number): string;
    getLines(): string[];
    getText(entryId: number): string;
    sendAction(elementId: number, action: string): void;
    findButton(text: string): number;
    findText(text: string): boolean;
}

// ===== POPUP MENU NAMESPACE =====

declare namespace PopupMenu {
    function waitForMenu(timeout?: number): boolean;
    function select(option: string | number): boolean;
    function cancel(): void;
    function hasMenu(): boolean;
    function getMenuOptions(): string[];
}

// ===== PROMPT NAMESPACE =====

declare namespace Prompt {
    function waitForPrompt(timeout?: number): boolean;
    function respond(text: string): void;
    function cancel(): void;
    function hasPrompt(): boolean;
}

// ===== WORLDMAP NAMESPACE =====

declare namespace WorldMap {
    function open(): void;
    function close(): void;
    function isOpen(): boolean;
    function addPin(x: number, y: number, name: string): void;
    function removePin(x: number, y: number): void;
    function clearPins(): void;
}

// ===== IGNORELIST NAMESPACE =====

declare namespace IgnoreList {
    function add(serial: SerialOrEntity): void;
    function remove(serial: SerialOrEntity): void;
    function clear(): void;
    function contains(serial: SerialOrEntity): boolean;
    function list(): SerialObject[];
}

// ===== ENUMS =====

enum Directions {
    North = 0,
    Right = 1,
    East = 2,
    Down = 3,
    South = 4,
    Left = 5,
    West = 6,
    Up = 7
}

enum MessageType {
    Regular = 0,
    System = 1,
    Emote = 2,
    Limit3Spell = 3,
    Label = 6,
    Focus = 7,
    Whisper = 8,
    Yell = 9,
    Spell = 10,
    Guild = 13,
    Alliance = 14,
    Command = 15,
    Encoded = 192,
    UOChat = 254,
    Party = 255
}

enum Notorieties {
    Unknown = 0,
    Innocent = 1,
    Ally = 2,
    Gray = 3,
    Criminal = 4,
    Enemy = 5,
    Murderer = 6,
    Invulnerable = 7
}

enum SearchEntityOptions {
    Any = 1,
    Enemy = 2,
    Murderer = 4,
    Criminal = 8,
    Gray = 16,
    Innocent = 32,
    Unfriendly = 64,
    Friend = 128,
    Invulnerable = 256
}

enum SearchEntityRangeOptions {
    Next = 0,
    Previous = 1,
    Nearest = 2,
    Closest = 3
}

enum SearchEntityTypeOptions {
    Mobile = 1,
    Item = 2,
    Both = 3
}

enum Abilities {
    None = 0,
    Disarm = 1,
    MortalStrike = 2,
    ArmorIgnore = 3,
    BleedAttack = 4,
    ConcussionBlow = 5,
    CrushingBlow = 6,
    Disarm2 = 7,
    Dismount = 8,
    DoubleStrike = 9,
    InfectiousStrike = 10,
    MortalStrike2 = 11,
    MovingShot = 12,
    ParalyzingBlow = 13,
    ShadowStrike = 14,
    WhirlwindAttack = 15
}

enum BuffDebuffs {
    None = 0,
    Clumsy = 1,
    FeebleMind = 2,
    Weaken = 3,
    Agility = 4,
    Cunning = 5,
    Strength = 6,
    Bless = 7,
    Curse = 8,
    MassDispel = 9,
    Heal = 10,
    GreaterHeal = 11,
    MiniHeal = 12,
    Poison = 13,
    Cure = 14,
    Protection = 15,
    Harm = 16,
    MagicArrow = 17,
    Fireball = 18,
    Lightning = 19
}

enum Layers {
    Invalid = 0,
    OneHanded = 1,
    TwoHanded = 2,
    Shoes = 3,
    Pants = 4,
    Shirt = 5,
    Hat = 6,
    Gloves = 7,
    Ring = 8,
    Talisman = 9,
    Necklace = 10,
    Hair = 11,
    Waist = 12,
    InnerTorso = 13,
    Bracelet = 14,
    Face = 15,
    MiddleTorso = 16,
    Earrings = 17,
    Arms = 18,
    Cloak = 19,
    Backpack = 20,
    OuterTorso = 21,
    OuterLegs = 22,
    InnerLegs = 23,
    Mount = 24,
    ShopBuy = 25,
    ShopResale = 26,
    ShopSell = 27
}

enum Skills {
    Alchemy = 0,
    Anatomy = 1,
    AnimalLore = 2,
    ItemIdentification = 3,
    ArmsLore = 4,
    Parrying = 5,
    Begging = 6,
    Blacksmithing = 7,
    Fletching = 8,
    Peacemaking = 9,
    Camping = 10,
    Carpentry = 11,
    Cartography = 12,
    Cooking = 13,
    DetectingHidden = 14,
    Discordance = 15,
    EvaluateIntelligence = 16,
    Healing = 17,
    Fishing = 18,
    ForensicEvaluation = 19,
    Herding = 20,
    Hiding = 21,
    Provocation = 22,
    Inscribe = 23,
    Lockpicking = 24,
    Magery = 25,
    MagicResistance = 26,
    Tactics = 27,
    Snooping = 28,
    Musicianship = 29,
    Poisoning = 30,
    Archery = 31,
    SpiritSpeak = 32,
    Stealing = 33,
    Tailoring = 34,
    AnimalTaming = 35,
    TasteIdentification = 36,
    Tinkering = 37,
    Tracking = 38,
    Veterinary = 39,
    Swordsmanship = 40,
    MaceFighting = 41,
    Fencing = 42,
    Wrestling = 43,
    Lumberjacking = 44,
    Mining = 45,
    Meditation = 46,
    Stealth = 47,
    RemoveTrap = 48,
    Necromancy = 49,
    Focus = 50,
    Chivalry = 51,
    Bushido = 52,
    Ninjitsu = 53,
    SpellWeaving = 54,
    Mysticism = 55,
    Imbuing = 56,
    Throwing = 57
}

// ===== GLOBAL VARIABLES =====

declare const client: typeof Client;
declare const player: Player;
declare const target: typeof Target;
declare const journal: typeof Journal;
declare const ignoreList: typeof IgnoreList;
declare const popupMenu: typeof PopupMenu;
declare const prompt: typeof Prompt;
declare const worldMap: typeof WorldMap;