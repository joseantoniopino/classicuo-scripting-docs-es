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
 * @example
 * ```typescript
 * if (player.hits < 10) {
 *     player.say('¡Me voy!');
 *     exit();
 * }
 * ```
 */
declare function exit(): void;

/**
 * Registra un mensaje en la consola de ClassicUO.
 * Los argumentos se mostrarán en el área de consola debajo de la ventana de scripting.
 * @param args Lista de objetos a registrar en la consola
 * @example
 * ```typescript
 * log('¡Hola!');
 * log(`Mi nombre es ${player.name}`);
 * log(`Mi casco es`, player.equippedItems.helmet);
 * ```
 */
declare function log(...args: any[]): void;

/**
 * Pausa la ejecución del script por el tiempo especificado.
 * Nota: La precisión del tiempo para duraciones largas no está garantizada.
 * @param milliseconds Tiempo en milisegundos para pausar
 * @example
 * ```typescript
 * player.useSkill(Skills.Anatomy);
 * sleep(10000); // pausa 10 segundos
 * player.useSkill(Skills.Meditation);
 * ```
 */
declare function sleep(milliseconds: number): void;

// ===== TYPE ALIASES =====

/** Tipo que acepta un número serial o una entidad */
type SerialOrEntity = number | Entity;

/** Número serial de un objeto */
type SerialObject = number;

// ===== BASE INTERFACES =====

/**
 * Interfaz base para todos los objetos del juego.
 * Proporciona propiedades básicas como posición, gráfico y color.
 */
interface GameObject {
    /** Número serial único del objeto */
    serial: number;
    /** ID del gráfico que representa el objeto */
    graphic: number;
    /** Color/tinte del objeto (0 = color original) */
    hue: number;
    /** Coordenada X en el mundo */
    x: number;
    /** Coordenada Y en el mundo */
    y: number;
    /** Coordenada Z (altura) en el mundo */
    z: number;
}

/**
 * Interfaz que extiende GameObject con propiedades específicas de entidades.
 * Representa tanto mobiles (criaturas/jugadores) como items que pueden tener vida.
 */
interface Entity extends GameObject {
    /** Dirección hacia la que mira la entidad */
    direction: Directions;
    /** Puntos de vida actuales */
    hits: number;
    /** Puntos de vida máximos */
    maxHits: number;
    /** Indica si la entidad está oculta/invisible */
    isHidden: boolean;
    /** Nombre de la entidad (cadena vacía si no se conoce) */
    name: string;
}

/**
 * Interfaz que representa un mobile (criatura, jugador, NPC).
 * Extiende Entity con propiedades específicas de seres vivos.
 */
interface Mobile extends Entity {
    /** Puntos de maná actuales (1-100 para otros jugadores, valor real para el jugador) */
    mana: number;
    /** Puntos de maná máximos */
    maxMana: number;
    /** Puntos de stamina actuales */
    stamina: number;
    /** Puntos de stamina máximos */
    maxStamina: number;
    /** Estado de notoriedad (inocente, criminal, etc.) */
    notoriety: Notorieties;
    /** Items equipados por el mobile (solo para humanoides) */
    equippedItems: {
        /** Arma de una mano */
        oneHanded: Item | null;
        /** Arma de dos manos */
        twoHanded: Item | null;
        /** Zapatos */
        shoes: Item | null;
        /** Pantalones */
        pants: Item | null;
        /** Camisa */
        shirt: Item | null;
        /** Sombrero/casco */
        hat: Item | null;
        /** Guantes */
        gloves: Item | null;
        /** Anillo */
        ring: Item | null;
        /** Talismán */
        talisman: Item | null;
        /** Collar */
        necklace: Item | null;
        /** Cabello */
        hair: Item | null;
        /** Cinturón */
        waist: Item | null;
        /** Torso interior */
        innerTorso: Item | null;
        /** Brazalete */
        bracelet: Item | null;
        /** Cara */
        face: Item | null;
        /** Torso medio */
        middleTorso: Item | null;
        /** Pendientes */
        earrings: Item | null;
        /** Brazos */
        arms: Item | null;
        /** Capa */
        cloak: Item | null;
        /** Mochila */
        backpack: Item | null;
        /** Torso exterior */
        outerTorso: Item | null;
        /** Piernas exteriores */
        outerLegs: Item | null;
        /** Piernas interiores */
        innerLegs: Item | null;
        /** Montura */
        mount: Item | null;
        /** Compra en tienda */
        shopBuy: Item | null;
        /** Reventa en tienda */
        shopResale: Item | null;
        /** Venta en tienda */
        shopSell: Item | null;
    };
}

/**
 * Interfaz que representa un item/objeto del juego.
 * Extiende GameObject con propiedades específicas de items.
 */
interface Item extends GameObject {
    /** Cantidad/número de items en la pila */
    amount: number;
    /** Serial del contenedor que contiene este item (null si está en el suelo) */
    container: SerialObject | null;
    /** Array de items contenidos dentro de este item (si es un contenedor) */
    contents: Item[];
    /** Capa de equipamiento donde se encuentra el item */
    layer: Layers;
    /** Array de propiedades del item (tooltip) */
    properties: string[];
}

/**
 * Interfaz que representa al jugador actual.
 * Extiende Mobile con propiedades y métodos específicos del jugador.
 */
interface Player extends Mobile {
    // ===== PROPIEDADES BÁSICAS =====

    /** Fuerza del jugador */
    str: number;
    /** Destreza del jugador */
    dex: number;
    /** Inteligencia del jugador */
    int: number;
    /** Peso actual transportado */
    weight: number;
    /** Peso máximo que puede transportar */
    maxWeight: number;
    /** Cantidad de oro que posee */
    gold: number;
    /** Número actual de seguidores/mascotas */
    followers: number;
    /** Número máximo de seguidores permitidos */
    followersMax: number;
    /** Resistencia al fuego */
    fireResist: number;
    /** Resistencia al frío */
    coldResist: number;
    /** Resistencia al veneno */
    poisonResist: number;
    /** Resistencia a la energía */
    energyResist: number;
    /** Suerte del jugador */
    luck: number;
    /** Daño mínimo en combate */
    minDamage: number;
    /** Daño máximo en combate */
    maxDamage: number;
    /** Puntos de tithing (religión) */
    tithing: number;

    // ===== PROPIEDADES DE COMBATE =====

    /** Porcentaje de posibilidad de acertar ataques */
    attackChance: number;
    /** Porcentaje de posibilidad de defenderse */
    defenseChance: number;
    /** Porcentaje de reducción del costo de maná */
    lowerManaCost: number;
    /** Porcentaje de reducción del costo de reagentes */
    lowerReagentCost: number;
    /** Porcentaje de aumento de daño mágico */
    spellDamageIncrease: number;
    /** Velocidad de recuperación de hechizos */
    fasterCastRecovery: number;
    /** Velocidad de lanzamiento de hechizos */
    fasterCasting: number;
    /** Porcentaje de aumento de posibilidad de acertar */
    hitChanceIncrease: number;
    /** Porcentaje de aumento de velocidad de swing */
    swingSpeedIncrease: number;
    /** Porcentaje de aumento de daño */
    damageIncrease: number;

    // ===== PROPIEDADES MÁGICAS =====

    /** Skill de resistencia mágica */
    magicResist: number;

    // ===== PROPIEDADES DE SEGUIDOR =====

    /** Serial de la mascota actual */
    petSerial: number;

    // ===== MÉTODOS =====

    /**
     * Mueve un item entre contenedores o posiciones específicas.
     * @param item Item a mover
     * @param destination Contenedor de destino
     * @param amount Cantidad a mover (opcional)
     * @param x Coordenada X específica dentro del contenedor (opcional)
     * @param y Coordenada Y específica dentro del contenedor (opcional)
     * @returns true si el movimiento fue exitoso
     * @example
     * ```typescript
     * // Mover una túnica de jugador a la mochila
     * if (player.equippedItems.shirt) {
     *     player.moveItem(player.equippedItems.shirt, player.backpack);
     * }
     * ```
     */
    moveItem(item: Item, destination: Item, amount?: number, x?: number, y?: number): boolean;

    /**
     * Mueve un item al suelo en las coordenadas especificadas.
     * @param item Item a mover
     * @param x Coordenada X del mundo
     * @param y Coordenada Y del mundo
     * @param z Coordenada Z del mundo
     * @param amount Cantidad a mover (opcional)
     * @returns true si el movimiento fue exitoso
     */
    moveItemToGround(item: Item, x: number, y: number, z: number, amount?: number): boolean;

    /**
     * Suelta un item en el suelo (alias de moveItemToGround).
     * @param item Item a soltar
     * @param x Coordenada X del mundo
     * @param y Coordenada Y del mundo
     * @param z Coordenada Z del mundo
     * @returns true si se soltó exitosamente
     */
    dropItem(item: Item, x: number, y: number, z: number): boolean;

    /**
     * Intenta equipar un item si es posible.
     * @param item Item a equipar
     * @returns true si se equipó exitosamente
     * @example
     * ```typescript
     * const hacha = client.findType(0x0f49); // ID gráfico de hacha
     * if (hacha) {
     *     player.equip(hacha);
     * }
     * ```
     */
    equip(item: Item): boolean;

    /**
     * Desequipa un item de la capa especificada.
     * @param layer Capa de equipamiento a desequipar
     * @returns true si se desequipó exitosamente
     */
    unequip(layer: Layers): boolean;

    /**
     * Usa un objeto (doble clic).
     * @param item Item o entidad a usar
     * @returns true si se usó exitosamente
     * @example
     * ```typescript
     * const daga = client.findType(0x0f52); // ID gráfico de daga
     * if (daga) {
     *     player.use(daga);
     * }
     * ```
     */
    useObject(item: SerialOrEntity): boolean;

    /**
     * Alias de useObject - usa un objeto.
     * @param item Item o entidad a usar
     * @returns true si se usó exitosamente
     */
    use(item: SerialOrEntity): boolean;

    /**
     * Usa un objeto del tipo especificado.
     * @param type ID gráfico del tipo de objeto
     * @param hue Color específico (opcional)
     * @returns true si se encontró y usó el objeto
     * @example
     * ```typescript
     * player.useType(0xe21); // Usar vendajes
     * target.waitTargetSelf(); // Auto-vendarse
     * ```
     */
    useType(type: number, hue?: number): boolean;

    /**
     * Ataca a un mobile específico.
     * @param target Mobile objetivo a atacar
     * @returns true si se inició el ataque
     * @example
     * ```typescript
     * player.attack(target.lastSerial);
     * ```
     */
    attack(target: SerialOrEntity): boolean;

    /**
     * Lanza un hechizo, opcionalmente dirigido a un objetivo.
     * @param spell Nombre o ID del hechizo
     * @param target Objetivo del hechizo (opcional)
     * @returns true si se lanzó el hechizo
     * @example
     * ```typescript
     * player.cast("Heal"); // Lanzar Heal
     * target.waitTargetSelf(); // Dirigir a sí mismo
     * ```
     */
    cast(spell: string, target?: SerialOrEntity): boolean;

    /**
     * Envía un mensaje de chat como el jugador.
     * @param message Mensaje a enviar
     * @param hue Color del mensaje (opcional)
     * @returns true si se envió el mensaje
     * @example
     * ```typescript
     * player.say('¡Hola a todos!');
     * player.say('Mensaje en rojo', 33);
     * ```
     */
    say(message: string, hue?: number): boolean;

    /**
     * Envía un mensaje susurrando.
     * @param message Mensaje a susurrar
     * @param hue Color del mensaje (opcional)
     * @returns true si se envió el mensaje
     */
    whisper(message: string, hue?: number): boolean;

    /**
     * Envía un mensaje gritando.
     * @param message Mensaje a gritar
     * @param hue Color del mensaje (opcional)
     * @returns true si se envió el mensaje
     */
    yell(message: string, hue?: number): boolean;

    /**
     * Camina un paso en la dirección especificada.
     * @param direction Dirección hacia donde caminar
     * @returns true si el personaje puede caminar
     * @example
     * ```typescript
     * player.walk(Directions.North);
     * ```
     */
    walk(direction: Directions): boolean;

    /**
     * Corre un paso en la dirección especificada.
     * @param direction Dirección hacia donde correr
     * @returns true si el personaje puede correr
     * @example
     * ```typescript
     * player.run(Directions.South);
     * ```
     */
    run(direction: Directions): boolean;

    /**
     * Activa o desactiva el modo de guerra.
     * @param enabled true para activar modo guerra, false para desactivar
     * @returns true si se cambió el modo exitosamente
     */
    warMode(enabled: boolean): boolean;

    /**
     * Usa cualquier puerta directamente en frente de donde está mirando el jugador.
     * @returns true si se abrió una puerta
     * @example
     * ```typescript
     * player.openDoor();
     * ```
     */
    openDoor(): boolean;

    /**
     * Hace una reverencia.
     * @returns true si se realizó la acción
     */
    bow(): boolean;

    /**
     * Hace un saludo militar.
     * @returns true si se realizó la acción
     */
    salute(): boolean;
}

/**
 * Interfaz que representa una habilidad del jugador.
 */
interface Skill {
    /** Nombre de la habilidad */
    name: string;
    /** Valor actual de la habilidad (ej: 74.6 se representa como 746) */
    value: number;
    /** Valor base de la habilidad sin modificadores */
    baseValue: number;
    /** Límite máximo de la habilidad */
    cap: number;
    /** Estado de bloqueo de la habilidad (arriba/abajo/bloqueado) */
    lock: number;
}

// ===== CLIENT NAMESPACE =====

/**
 * Namespace principal para interactuar con el cliente ClassicUO y el mundo del juego.
 * Proporciona métodos para buscar objetos, manipular la interfaz y realizar consultas.
 */
declare namespace Client {
    // ===== MÉTODOS DE BÚSQUEDA =====

    /**
     * Busca un objeto específico por su serial.
     * @param serial Serial del objeto a buscar
     * @returns El objeto encontrado o null si no existe
     * @example
     * ```typescript
     * const runebookSerial = 0x401c37fb;
     * const runebook = client.findObject(runebookSerial);
     * if (runebook) {
     *     player.use(runebook);
     * } else {
     *     client.headMsg('¡Runebook perdido!', player);
     * }
     * ```
     */
    function findObject(serial: SerialOrEntity): GameObject | null;

    /**
     * Busca el primer objeto del tipo especificado.
     * @param type ID gráfico del tipo de objeto
     * @param hue Color específico (opcional)
     * @param container Contenedor donde buscar (opcional, por defecto busca en el mundo)
     * @param range Rango de búsqueda o profundidad del contenedor (opcional)
     * @returns El primer objeto encontrado o null
     * @example
     * ```typescript
     * // Usar vendajes si se encuentran
     * const vendajes = client.findType(0xe21);
     * if (vendajes) {
     *     player.use(vendajes);
     *     target.waitTargetSelf();
     * } else {
     *     client.headMsg('Sin vendajes', player);
     * }
     * ```
     */
    function findType(type: number, hue?: number, container?: SerialOrEntity, range?: number): Item | null;

    /**
     * Busca todos los objetos del tipo especificado.
     * @param type ID gráfico del tipo de objeto
     * @param hue Color específico (opcional)
     * @param container Contenedor donde buscar (opcional)
     * @param range Rango de búsqueda (opcional)
     * @returns Array con todos los objetos encontrados
     * @example
     * ```typescript
     * const pilaOro = 0xeed;
     * const pilas = client.findTypeEx(pilaOro, undefined, 'world');
     * if (pilas.length > 0) {
     *     client.headMsg(`Encontradas ${pilas.length} pilas de oro`, player);
     * }
     * ```
     */
    function findTypeEx(type: number, hue?: number, container?: SerialOrEntity, range?: number): Item[];

    /**
     * Busca un objeto por su alias.
     * @param alias Nombre del alias a buscar
     * @returns Serial del objeto o null si no se encuentra
     */
    function findAlias(alias: string): SerialOrEntity | null;

    /**
     * Establece un alias para un serial específico.
     * @param alias Nombre del alias
     * @param serial Serial del objeto
     * @example
     * ```typescript
     * client.setAlias('miEspada', 0x40123456);
     * ```
     */
    function setAlias(alias: string, serial: SerialOrEntity): void;

    /**
     * Elimina un alias.
     * @param alias Nombre del alias a eliminar
     */
    function unsetAlias(alias: string): void;

    /**
     * Promueve un alias (no está claro qué hace exactamente en la documentación).
     * @param alias Nombre del alias
     * @returns true si se promocionó exitosamente
     */
    function promoteAlias(alias: string): boolean;

    /**
     * Establece la distancia de búsqueda por defecto.
     * @param distance Distancia en tiles
     */
    function setFindDistance(distance: number): void;

    // ===== BÚSQUEDA DE ENTIDADES =====

    /**
     * Busca una entidad basada en opciones de búsqueda específicas.
     * @param searchOption Opciones de búsqueda (enemigo, inocente, etc.)
     * @param searchRange Opciones de rango (más cercano, siguiente, etc.)
     * @param hue Color específico (opcional)
     * @param range Rango de búsqueda (opcional)
     * @returns Mobile encontrado o null
     */
    function searchEntity(searchOption: SearchEntityOptions, searchRange: SearchEntityRangeOptions, hue?: number, range?: number): Mobile | null;

    /**
     * Busca una entidad por tipo específico.
     * @param type ID gráfico del tipo
     * @param searchRange Opciones de rango de búsqueda
     * @param hue Color específico (opcional)
     * @param range Rango de búsqueda (opcional)
     * @returns Entidad encontrada o null
     */
    function searchEntityByType(type: number, searchRange: SearchEntityRangeOptions, hue?: number, range?: number): Entity | null;

    // ===== MÉTODOS DE INTERFAZ =====

    /**
     * Muestra un mensaje sobre la cabeza de una entidad.
     * @param message Mensaje a mostrar
     * @param target Entidad objetivo sobre la cual mostrar el mensaje
     * @param hue Color del mensaje (opcional)
     * @example
     * ```typescript
     * client.headMsg('¡Mensaje en rojo!', player, 33);
     * client.headMsg('¡Mensaje en verde!', player, 66);
     * ```
     */
    function headMsg(message: string, target: SerialOrEntity, hue?: number): void;

    /**
     * Muestra un mensaje del sistema en el chat.
     * @param message Mensaje a mostrar
     * @param hue Color del mensaje (opcional)
     * @example
     * ```typescript
     * client.sysMsg('Sistema: Todo funcionando correctamente');
     * ```
     */
    function sysMsg(message: string, hue?: number): void;

    /**
     * Imprime un mensaje en el cliente (alias de sysMsg).
     * @param message Mensaje a imprimir
     * @param hue Color del mensaje (opcional)
     */
    function clientPrint(message: string, hue?: number): void;

    /**
     * Cierra todos los gumps del cliente.
     */
    function closeClientGumps(): void;

    /**
     * Cierra un gump específico por su ID.
     * @param gumpId ID del gump a cerrar
     */
    function closeGump(gumpId: number): void;

    /**
     * Obtiene información sobre una habilidad específica.
     * @param skillName Nombre de la habilidad
     * @returns Objeto con información de la habilidad o null
     */
    function getSkill(skillName: string): Skill | null;

    /**
     * Obtiene información sobre todas las habilidades.
     * @returns Array con información de todas las habilidades
     */
    function getSkills(): Skill[];

    // ===== COMERCIO =====

    /**
     * Solicita intercambio comercial con otro jugador.
     * @param target Jugador con quien comerciar
     * @returns true si se envió la solicitud
     */
    function tradeRequest(target: SerialOrEntity): boolean;

    /**
     * Responde a una solicitud de intercambio comercial.
     * @param accept true para aceptar, false para rechazar
     */
    function tradeResponse(accept: boolean): void;

    // ===== CONSULTAS =====

    /**
     * Verifica si un objeto existe en el mundo.
     * @param serial Serial del objeto a verificar
     * @returns true si el objeto existe
     */
    function isObjectExist(serial: SerialOrEntity): boolean;

    /**
     * Calcula la distancia entre dos objetos.
     * @param obj1 Primer objeto
     * @param obj2 Segundo objeto (opcional, por defecto usa el jugador)
     * @returns Distancia en tiles
     */
    function getDistance(obj1: SerialOrEntity, obj2?: SerialOrEntity): number;

    /**
     * Obtiene la dirección entre dos objetos.
     * @param obj1 Objeto origen
     * @param obj2 Objeto destino (opcional, por defecto usa el jugador)
     * @returns Dirección como valor del enum Directions
     */
    function getDir(obj1: SerialOrEntity, obj2?: SerialOrEntity): Directions;

    /**
     * Verifica si el jugador está en modo guerra.
     * @returns true si está en modo guerra
     */
    function isWarMode(): boolean;

    /**
     * Verifica si el jugador está muerto.
     * @returns true si está muerto
     */
    function isDead(): boolean;

    /**
     * Verifica si el jugador está oculto.
     * @returns true si está oculto
     */
    function isHidden(): boolean;

    /**
     * Verifica si el jugador está envenenado.
     * @returns true si está envenenado
     */
    function isPoisoned(): boolean;

    /**
     * Verifica si el jugador está paralizado.
     * @returns true si está paralizado
     */
    function isParalyzed(): boolean;

    /**
     * Verifica si el jugador tiene vida amarilla (invulnerable).
     * @returns true si tiene vida amarilla
     */
    function isYellowHits(): boolean;

    /**
     * Verifica si una entidad está en la lista de ignorados.
     * @param serial Serial de la entidad a verificar
     * @returns true si está en la lista de ignorados
     */
    function isInIgnoreList(serial: SerialOrEntity): boolean;

    // ===== PROPIEDADES =====

    /** Indica si el jugador está muerto */
    const dead: boolean;
    /** Indica si el jugador está en modo guerra */
    const warmode: boolean;
    /** Indica si el jugador está oculto */
    const hidden: boolean;
    /** Indica si el jugador está paralizado */
    const paralyzed: boolean;
    /** Indica si el jugador está envenenado */
    const poisoned: boolean;
    /** Indica si el jugador tiene vida amarilla */
    const yellowHits: boolean;
    /** Indica si está conectado al servidor */
    const connected: boolean;
}

// ===== TARGET NAMESPACE =====

/**
 * Namespace para manejar el sistema de targeting (selección de objetivos).
 * Permite apuntar a entidades, terreno y manejar la cola de targets.
 */
declare namespace Target {
    // ===== PROPIEDADES =====

    /** Indica si hay un target activo esperando selección */
    const hasTarget: boolean;
    /** Serial del último objeto objetivo */
    const targetSerial: SerialObject;
    /** Tipo del último target */
    const targetType: number;
    /** Coordenada X del último target */
    const targetX: number;
    /** Coordenada Y del último target */
    const targetY: number;
    /** Coordenada Z del último target */
    const targetZ: number;

    // ===== MÉTODOS =====

    /**
     * Establece el target del lado del cliente a un serial específico.
     * @param serial Serial del objeto objetivo
     */
    function setTargetClient(serial: SerialOrEntity): void;

    /**
     * Establece el target hacia uno mismo.
     */
    function setTargetToSelf(): void;

    /**
     * Establece el target hacia una ubicación específica.
     * @param x Coordenada X
     * @param y Coordenada Y
     * @param z Coordenada Z
     */
    function setTargetToLoc(x: number, y: number, z: number): void;

    /**
     * Espera a que se abra un target dentro del tiempo especificado.
     * @param timeout Tiempo límite en milisegundos (opcional)
     * @returns true si se abrió el target
     * @example
     * ```typescript
     * player.cast("Heal");
     * target.waitTarget();
     * target.setTargetToSelf();
     * ```
     */
    function waitTarget(timeout?: number): boolean;

    /**
     * Espera a que se abra un target y automáticamente se dirige hacia uno mismo.
     * @param timeout Tiempo límite en milisegundos (opcional)
     * @returns true si se completó el targeting
     * @example
     * ```typescript
     * player.useType(0xe21); // Usar vendajes
     * target.waitTargetSelf(); // Auto-vendarse
     * ```
     */
    function waitTargetSelf(timeout?: number): boolean;

    /**
     * Espera target y automáticamente selecciona el primer objeto del tipo especificado.
     * @param type ID gráfico del tipo de objeto
     * @param timeout Tiempo límite en milisegundos (opcional)
     * @returns true si se encontró y seleccionó el objeto
     */
    function waitTargetType(type: number, timeout?: number): boolean;

    /**
     * Espera target y automáticamente selecciona el objeto especificado.
     * @param obj Objeto objetivo
     * @param timeout Tiempo límite en milisegundos (opcional)
     * @returns true si se seleccionó el objeto
     */
    function waitTargetObject(obj: SerialOrEntity, timeout?: number): boolean;

    /**
     * Espera target y automáticamente selecciona un tile específico.
     * @param tileType Tipo de tile
     * @param x Coordenada X
     * @param y Coordenada Y
     * @param z Coordenada Z
     * @param timeout Tiempo límite en milisegundos (opcional)
     * @returns true si se seleccionó el tile
     */
    function waitTargetTile(tileType: number, x: number, y: number, z: number, timeout?: number): boolean;

    /**
     * Cancela el target actual.
     */
    function cancel(): void;

    /**
     * Limpia la cola de targets.
     */
    function clearQueue(): void;

    /**
     * Realiza targeting desde una lista usando un alias.
     * @param alias Nombre del alias en la lista
     * @returns true si se realizó el targeting exitosamente
     */
    function performTargetFromList(alias: string): boolean;
}

// ===== JOURNAL NAMESPACE =====

/**
 * Namespace para manejar el sistema de journal (registro de mensajes).
 * Permite buscar y filtrar mensajes del chat y sistema.
 */
declare namespace Journal {
    // ===== MÉTODOS =====

    /**
     * Limpia todo el contenido del journal.
     */
    function clear(): void;

    /**
     * Busca un texto específico en el journal.
     * @param text Texto a buscar
     * @param author Autor del mensaje (opcional)
     * @param ignoreCase Ignorar mayúsculas/minúsculas (opcional, por defecto false)
     * @returns true si se encontró el texto
     */
    function search(text: string, author?: string, ignoreCase?: boolean): boolean;

    /**
     * Busca un texto por tipo de mensaje.
     * @param text Texto a buscar
     * @param type Tipo de mensaje
     * @param ignoreCase Ignorar mayúsculas/minúsculas (opcional)
     * @returns true si se encontró el texto
     */
    function searchByType(text: string, type: MessageType, ignoreCase?: boolean): boolean;

    /**
     * Busca un texto por color específico.
     * @param text Texto a buscar
     * @param hue Color del mensaje
     * @param ignoreCase Ignorar mayúsculas/minúsculas (opcional)
     * @returns true si se encontró el texto
     */
    function searchByColor(text: string, hue: number, ignoreCase?: boolean): boolean;

    /**
     * Espera hasta encontrar un texto específico en el journal.
     * @param text Texto a esperar
     * @param author Autor del mensaje (opcional)
     * @param timeout Tiempo límite en milisegundos (opcional)
     * @param ignoreCase Ignorar mayúsculas/minúsculas (opcional)
     * @returns true si se encontró el texto antes del timeout
     */
    function waitForText(text: string, author?: string, timeout?: number, ignoreCase?: boolean): boolean;

    /**
     * Espera hasta encontrar un texto de un tipo específico.
     * @param text Texto a esperar
     * @param type Tipo de mensaje
     * @param timeout Tiempo límite en milisegundos (opcional)
     * @param ignoreCase Ignorar mayúsculas/minúsculas (opcional)
     * @returns true si se encontró el texto antes del timeout
     */
    function waitForTextByType(text: string, type: MessageType, timeout?: number, ignoreCase?: boolean): boolean;

    /**
     * Obtiene todos los textos de un tipo específico.
     * @param type Tipo de mensaje
     * @param author Autor específico (opcional)
     * @returns Array de mensajes encontrados
     */
    function getTextByType(type: MessageType, author?: string): string[];

    /**
     * Obtiene el texto del journal en una posición específica.
     * @param index Índice del mensaje
     * @returns Texto del mensaje
     */
    function getJournalText(index: number): string;

    /**
     * Obtiene la cantidad total de entradas en el journal.
     * @returns Número de entradas
     */
    function length(): number;
}

// ===== GUMP CLASS =====

/**
 * Clase para manejar las ventanas de interfaz gráfica (gumps).
 * Los gumps son ventanas del juego como inventarios, menús, diálogos, etc.
 */
declare class Gump {
    // ===== MÉTODOS ESTÁTICOS =====

    /**
     * Busca un gump específico por su ID.
     * @param gumpId ID del gump a buscar (opcional)
     * @returns Instancia del gump encontrado o null
     */
    static findGump(gumpId?: number): Gump | null;

    /**
     * Busca todos los gumps de un tipo específico.
     * @param gumpId ID del tipo de gump (opcional)
     * @returns Array de gumps encontrados
     */
    static findGumps(gumpId?: number): Gump[];

    /**
     * Cierra un gump específico por su ID.
     * @param gumpId ID del gump a cerrar
     */
    static closeGump(gumpId: number): void;

    /**
     * Cierra todos los gumps abiertos.
     */
    static closeAllGumps(): void;

    /**
     * Verifica si hay algún gump abierto.
     * @returns true si hay al menos un gump abierto
     */
    static hasGump(): boolean;

    /**
     * Espera hasta que aparezca un gump específico.
     * @param gumpId ID del gump a esperar (opcional)
     * @param timeout Tiempo límite en milisegundos (opcional)
     * @returns true si apareció el gump antes del timeout
     */
    static waitForGump(gumpId?: number, timeout?: number): boolean;

    // ===== PROPIEDADES DE INSTANCIA =====

    /** ID único del gump */
    readonly gumpId: number;
    /** Coordenada X del gump en pantalla */
    readonly x: number;
    /** Coordenada Y del gump en pantalla */
    readonly y: number;
    /** Ancho del gump en píxeles */
    readonly width: number;
    /** Alto del gump en píxeles */
    readonly height: number;

    // ===== MÉTODOS DE INSTANCIA =====

    /**
     * Responde al gump presionando un botón y opcionalmente estableciendo switches y campos de texto.
     * @param buttonId ID del botón a presionar
     * @param switches Array de IDs de switches a activar (opcional)
     * @param textEntries Objeto con entradas de texto por ID (opcional)
     */
    reply(buttonId: number, switches?: number[], textEntries?: { [key: number]: string }): void;

    /**
     * Cierra este gump.
     */
    close(): void;

    /**
     * Obtiene el texto de una línea específica del gump.
     * @param lineNumber Número de línea
     * @returns Texto de la línea
     */
    getLine(lineNumber: number): string;

    /**
     * Obtiene todas las líneas de texto del gump.
     * @returns Array con todas las líneas de texto
     */
    getLines(): string[];

    /**
     * Obtiene el texto de un campo de entrada específico.
     * @param entryId ID del campo de entrada
     * @returns Texto del campo
     */
    getText(entryId: number): string;

    /**
     * Envía una acción específica a un elemento del gump.
     * @param elementId ID del elemento
     * @param action Acción a enviar
     */
    sendAction(elementId: number, action: string): void;

    /**
     * Busca un botón por su texto.
     * @param text Texto del botón a buscar
     * @returns ID del botón o -1 si no se encuentra
     */
    findButton(text: string): number;

    /**
     * Busca si existe un texto específico en el gump.
     * @param text Texto a buscar
     * @returns true si se encontró el texto
     */
    findText(text: string): boolean;
}

// ===== POPUP MENU NAMESPACE =====

/**
 * Namespace para manejar los menús contextuales (popup menus).
 * Estos menús aparecen al hacer clic derecho en objetos o entidades.
 */
declare namespace PopupMenu {
    /**
     * Espera hasta que aparezca un menú contextual.
     * @param timeout Tiempo límite en milisegundos (opcional)
     * @returns true si apareció el menú antes del timeout
     */
    function waitForMenu(timeout?: number): boolean;

    /**
     * Selecciona una opción del menú contextual.
     * @param option Texto de la opción o índice numérico
     * @returns true si se seleccionó la opción exitosamente
     */
    function select(option: string | number): boolean;

    /**
     * Cancela el menú contextual actual.
     */
    function cancel(): void;

    /**
     * Verifica si hay un menú contextual activo.
     * @returns true si hay un menú activo
     */
    function hasMenu(): boolean;

    /**
     * Obtiene todas las opciones disponibles en el menú actual.
     * @returns Array con los textos de las opciones
     */
    function getMenuOptions(): string[];
}

// ===== PROMPT NAMESPACE =====

/**
 * Namespace para manejar las ventanas de prompt (solicitud de entrada de texto).
 * Estas ventanas aparecen cuando el juego solicita entrada de texto del jugador.
 */
declare namespace Prompt {
    /**
     * Espera hasta que aparezca una ventana de prompt.
     * @param timeout Tiempo límite en milisegundos (opcional)
     * @returns true si apareció el prompt antes del timeout
     */
    function waitForPrompt(timeout?: number): boolean;

    /**
     * Responde al prompt con el texto especificado.
     * @param text Texto de respuesta
     */
    function respond(text: string): void;

    /**
     * Cancela el prompt actual.
     */
    function cancel(): void;

    /**
     * Verifica si hay un prompt activo.
     * @returns true si hay un prompt activo
     */
    function hasPrompt(): boolean;
}

// ===== WORLDMAP NAMESPACE =====

/**
 * Namespace para manejar el mapa del mundo.
 * Permite abrir/cerrar el mapa y gestionar pins/marcadores.
 */
declare namespace WorldMap {
    /**
     * Abre el mapa del mundo.
     */
    function open(): void;

    /**
     * Cierra el mapa del mundo.
     */
    function close(): void;

    /**
     * Verifica si el mapa del mundo está abierto.
     * @returns true si el mapa está abierto
     */
    function isOpen(): boolean;

    /**
     * Añade un pin/marcador al mapa.
     * @param x Coordenada X del pin
     * @param y Coordenada Y del pin
     * @param name Nombre del pin
     */
    function addPin(x: number, y: number, name: string): void;

    /**
     * Elimina un pin/marcador del mapa.
     * @param x Coordenada X del pin
     * @param y Coordenada Y del pin
     */
    function removePin(x: number, y: number): void;

    /**
     * Elimina todos los pins/marcadores del mapa.
     */
    function clearPins(): void;
}

// ===== IGNORELIST NAMESPACE =====

/**
 * Namespace para manejar la lista de objetos ignorados.
 * Los objetos en esta lista son omitidos por las funciones de búsqueda.
 */
declare namespace IgnoreList {
    /**
     * Añade un objeto a la lista de ignorados.
     * @param serial Serial del objeto a ignorar
     */
    function add(serial: SerialOrEntity): void;

    /**
     * Elimina un objeto de la lista de ignorados.
     * @param serial Serial del objeto a dejar de ignorar
     */
    function remove(serial: SerialOrEntity): void;

    /**
     * Limpia toda la lista de ignorados.
     */
    function clear(): void;

    /**
     * Verifica si un objeto está en la lista de ignorados.
     * @param serial Serial del objeto a verificar
     * @returns true si el objeto está siendo ignorado
     */
    function contains(serial: SerialOrEntity): boolean;

    /**
     * Obtiene todos los serials de objetos ignorados.
     * @returns Array con todos los serials ignorados
     */
    function list(): SerialObject[];
}

// ===== ENUMS =====

/**
 * Direcciones cardinales y diagonales para movimiento y orientación.
 */
enum Directions {
    /** Norte (0) */
    North = 0,
    /** Noreste (1) */
    Right = 1,
    /** Este (2) */
    East = 2,
    /** Sureste (3) */
    Down = 3,
    /** Sur (4) */
    South = 4,
    /** Suroeste (5) */
    Left = 5,
    /** Oeste (6) */
    West = 6,
    /** Noroeste (7) */
    Up = 7
}

/**
 * Tipos de mensajes en el sistema de chat y journal.
 */
enum MessageType {
    /** Mensaje regular de chat */
    Regular = 0,
    /** Mensaje del sistema */
    System = 1,
    /** Emote/acción */
    Emote = 2,
    /** Límite de hechizo 3 */
    Limit3Spell = 3,
    /** Etiqueta */
    Label = 6,
    /** Foco */
    Focus = 7,
    /** Susurro */
    Whisper = 8,
    /** Grito */
    Yell = 9,
    /** Hechizo */
    Spell = 10,
    /** Chat de guild */
    Guild = 13,
    /** Chat de alianza */
    Alliance = 14,
    /** Comando */
    Command = 15,
    /** Mensaje codificado */
    Encoded = 192,
    /** Chat UO */
    UOChat = 254,
    /** Chat de party */
    Party = 255
}

/**
 * Estados de notoriedad que determinan el color del nombre de un mobile.
 */
enum Notorieties {
    /** Desconocido (gris) */
    Unknown = 0,
    /** Inocente (azul) */
    Innocent = 1,
    /** Aliado (verde) */
    Ally = 2,
    /** Gris (gris) */
    Gray = 3,
    /** Criminal (gris) */
    Criminal = 4,
    /** Enemigo (naranja) */
    Enemy = 5,
    /** Asesino (rojo) */
    Murderer = 6,
    /** Invulnerable (amarillo) */
    Invulnerable = 7
}

/**
 * Opciones para búsqueda de entidades por notoriedad.
 */
enum SearchEntityOptions {
    /** Cualquier entidad */
    Any = 1,
    /** Solo enemigos */
    Enemy = 2,
    /** Solo asesinos */
    Murderer = 4,
    /** Solo criminales */
    Criminal = 8,
    /** Solo grises */
    Gray = 16,
    /** Solo inocentes */
    Innocent = 32,
    /** Solo hostiles */
    Unfriendly = 64,
    /** Solo amigos */
    Friend = 128,
    /** Solo invulnerables */
    Invulnerable = 256
}

/**
 * Opciones de rango para búsqueda de entidades.
 */
enum SearchEntityRangeOptions {
    /** Siguiente en la lista */
    Next = 0,
    /** Anterior en la lista */
    Previous = 1,
    /** Más cercano */
    Nearest = 2,
    /** Más cerca (alias de Nearest) */
    Closest = 3
}

/**
 * Opciones de tipo para búsqueda de entidades.
 */
enum SearchEntityTypeOptions {
    /** Solo mobiles */
    Mobile = 1,
    /** Solo items */
    Item = 2,
    /** Mobiles e items */
    Both = 3
}

/**
 * Habilidades especiales de combate.
 */
enum Abilities {
    /** Ninguna habilidad */
    None = 0,
    /** Desarmar */
    Disarm = 1,
    /** Golpe mortal */
    MortalStrike = 2,
    /** Ignorar armadura */
    ArmorIgnore = 3,
    /** Ataque sangrante */
    BleedAttack = 4,
    /** Golpe conmocionante */
    ConcussionBlow = 5,
    /** Golpe aplastante */
    CrushingBlow = 6,
    /** Desarmar 2 */
    Disarm2 = 7,
    /** Desmontar */
    Dismount = 8,
    /** Golpe doble */
    DoubleStrike = 9,
    /** Golpe infeccioso */
    InfectiousStrike = 10,
    /** Golpe mortal 2 */
    MortalStrike2 = 11,
    /** Disparo en movimiento */
    MovingShot = 12,
    /** Golpe paralizante */
    ParalyzingBlow = 13,
    /** Golpe de sombra */
    ShadowStrike = 14,
    /** Ataque torbellino */
    WhirlwindAttack = 15
}

/**
 * Efectos temporales que pueden afectar a un mobile.
 */
enum BuffDebuffs {
    /** Ningún efecto */
    None = 0,
    /** Torpe (reduce destreza) */
    Clumsy = 1,
    /** Mente débil (reduce inteligencia) */
    FeebleMind = 2,
    /** Debilitar (reduce fuerza) */
    Weaken = 3,
    /** Agilidad (aumenta destreza) */
    Agility = 4,
    /** Astucia (aumenta inteligencia) */
    Cunning = 5,
    /** Fuerza (aumenta fuerza) */
    Strength = 6,
    /** Bendición (aumenta todos los stats) */
    Bless = 7,
    /** Maldición (reduce todos los stats) */
    Curse = 8,
    /** Disipación masiva */
    MassDispel = 9,
    /** Curación */
    Heal = 10,
    /** Gran curación */
    GreaterHeal = 11,
    /** Curación menor */
    MiniHeal = 12,
    /** Veneno */
    Poison = 13,
    /** Cura */
    Cure = 14,
    /** Protección */
    Protection = 15,
    /** Daño */
    Harm = 16,
    /** Flecha mágica */
    MagicArrow = 17,
    /** Bola de fuego */
    Fireball = 18,
    /** Rayo */
    Lightning = 19
}

/**
 * Capas de equipamiento donde se pueden colocar items.
 */
enum Layers {
    /** Capa inválida */
    Invalid = 0,
    /** Arma de una mano */
    OneHanded = 1,
    /** Arma de dos manos */
    TwoHanded = 2,
    /** Zapatos */
    Shoes = 3,
    /** Pantalones */
    Pants = 4,
    /** Camisa */
    Shirt = 5,
    /** Sombrero/casco */
    Hat = 6,
    /** Guantes */
    Gloves = 7,
    /** Anillo */
    Ring = 8,
    /** Talismán */
    Talisman = 9,
    /** Collar */
    Necklace = 10,
    /** Cabello */
    Hair = 11,
    /** Cinturón */
    Waist = 12,
    /** Torso interior */
    InnerTorso = 13,
    /** Brazalete */
    Bracelet = 14,
    /** Cara */
    Face = 15,
    /** Torso medio */
    MiddleTorso = 16,
    /** Pendientes */
    Earrings = 17,
    /** Brazos */
    Arms = 18,
    /** Capa */
    Cloak = 19,
    /** Mochila */
    Backpack = 20,
    /** Torso exterior */
    OuterTorso = 21,
    /** Piernas exteriores */
    OuterLegs = 22,
    /** Piernas interiores */
    InnerLegs = 23,
    /** Montura */
    Mount = 24,
    /** Compra en tienda */
    ShopBuy = 25,
    /** Reventa en tienda */
    ShopResale = 26,
    /** Venta en tienda */
    ShopSell = 27
}

/**
 * Todas las habilidades disponibles en el juego.
 */
enum Skills {
    /** Alquimia */
    Alchemy = 0,
    /** Anatomía */
    Anatomy = 1,
    /** Conocimiento animal */
    AnimalLore = 2,
    /** Identificación de items */
    ItemIdentification = 3,
    /** Conocimiento de armas */
    ArmsLore = 4,
    /** Parar golpes */
    Parrying = 5,
    /** Mendigar */
    Begging = 6,
    /** Herrería */
    Blacksmithing = 7,
    /** Hacer flechas */
    Fletching = 8,
    /** Pacificación */
    Peacemaking = 9,
    /** Acampar */
    Camping = 10,
    /** Carpintería */
    Carpentry = 11,
    /** Cartografía */
    Cartography = 12,
    /** Cocina */
    Cooking = 13,
    /** Detectar ocultos */
    DetectingHidden = 14,
    /** Discordancia */
    Discordance = 15,
    /** Evaluar inteligencia */
    EvaluateIntelligence = 16,
    /** Curación */
    Healing = 17,
    /** Pesca */
    Fishing = 18,
    /** Evaluación forense */
    ForensicEvaluation = 19,
    /** Pastoreo */
    Herding = 20,
    /** Ocultarse */
    Hiding = 21,
    /** Provocación */
    Provocation = 22,
    /** Inscribir */
    Inscribe = 23,
    /** Forzar cerraduras */
    Lockpicking = 24,
    /** Magia */
    Magery = 25,
    /** Resistencia mágica */
    MagicResistance = 26,
    /** Tácticas */
    Tactics = 27,
    /** Espiar */
    Snooping = 28,
    /** Música */
    Musicianship = 29,
    /** Envenenar */
    Poisoning = 30,
    /** Arquería */
    Archery = 31,
    /** Hablar con espíritus */
    SpiritSpeak = 32,
    /** Robar */
    Stealing = 33,
    /** Sastrería */
    Tailoring = 34,
    /** Domar animales */
    AnimalTaming = 35,
    /** Identificar por sabor */
    TasteIdentification = 36,
    /** Reparación */
    Tinkering = 37,
    /** Rastreo */
    Tracking = 38,
    /** Veterinaria */
    Veterinary = 39,
    /** Esgrima */
    Swordsmanship = 40,
    /** Combate con mazas */
    MaceFighting = 41,
    /** Esgrima ligera */
    Fencing = 42,
    /** Lucha */
    Wrestling = 43,
    /** Leñador */
    Lumberjacking = 44,
    /** Minería */
    Mining = 45,
    /** Meditación */
    Meditation = 46,
    /** Sigilo */
    Stealth = 47,
    /** Quitar trampas */
    RemoveTrap = 48,
    /** Nigromancia */
    Necromancy = 49,
    /** Concentración */
    Focus = 50,
    /** Caballería */
    Chivalry = 51,
    /** Bushido */
    Bushido = 52,
    /** Ninjitsu */
    Ninjitsu = 53,
    /** Tejer hechizos */
    SpellWeaving = 54,
    /** Misticismo */
    Mysticism = 55,
    /** Imbuir */
    Imbuing = 56,
    /** Lanzar */
    Throwing = 57
}

// ===== GLOBAL VARIABLES =====

/**
 * Objeto principal para interactuar con el cliente ClassicUO y el mundo del juego.
 * Proporciona acceso a todas las funciones de búsqueda, interfaz y consultas.
 */
declare const client: typeof Client;

/**
 * Referencia al jugador actual mientras está en el juego.
 * Proporciona acceso a todas las propiedades y métodos del personaje del jugador.
 * @example
 * ```typescript
 * while (true) {
 *     if (player.hits < 50) {
 *         player.say('¡Necesito curación!');
 *     }
 *     sleep(500);
 * }
 * ```
 */
declare const player: Player;

/**
 * Sistema de targeting para seleccionar objetivos.
 * Maneja toda la funcionalidad de apuntar a entidades, objetos y ubicaciones.
 */
declare const target: typeof Target;

/**
 * Sistema de journal para manejar mensajes y logs del juego.
 * Permite buscar, filtrar y esperar mensajes específicos.
 */
declare const journal: typeof Journal;

/**
 * Lista de objetos ignorados por las funciones de búsqueda.
 * Útil para evitar seleccionar los mismos objetos repetidamente.
 */
declare const ignoreList: typeof IgnoreList;

/**
 * Sistema de menús contextuales.
 * Maneja la interacción con menús popup del juego.
 */
declare const popupMenu: typeof PopupMenu;

/**
 * Sistema de prompts para entrada de texto.
 * Maneja las ventanas que solicitan entrada de texto del jugador.
 */
declare const prompt: typeof Prompt;

/**
 * Sistema de mapa del mundo.
 * Permite abrir/cerrar el mapa y gestionar marcadores.
 */
declare const worldMap: typeof WorldMap;