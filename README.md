<div align="center">
  <img src="https://i.imgur.com/CgpwyIQ.png" alt="ClassicUO Logo" width="200"/>
  
  # 📚 ClassicUO Scripting - Documentación en Español
  
  Una documentación completa y navegable de la API de Scripting de ClassicUO, traducida al español con ejemplos prácticos y mejores prácticas.
  
  ![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)
  ![ClassicUO v4.0.x](https://img.shields.io/badge/ClassicUO-v4.0.x-blue.svg)
  ![Español](https://img.shields.io/badge/Idioma-Español-green.svg)
  ![Discord](https://img.shields.io/badge/Discord-ClassicUO-7289da.svg)
</div>

## 🌟 Características

- ✅ **Documentación completa en español** - Toda la API traducida con explicaciones detalladas
- ✅ **Ejemplos prácticos** - Código JavaScript listo para usar en tus scripts
- ✅ **Definiciones TypeScript** - Soporte completo para IntelliSense y autocompletado
- ✅ **Navegación intuitiva** - Estructura organizada para encontrar rápidamente lo que necesitas
- ✅ **Mejores prácticas** - Patrones recomendados y consejos de optimización
- ✅ **Referencias cruzadas** - Enlaces entre métodos y propiedades relacionadas
- ✅ **Ejemplos de casos de uso** - Scripts reales para tareas comunes del juego
- ✅ **Actualizaciones regulares** - Mantenido al día con las últimas versiones de ClassicUO

## 🚀 Uso Rápido

### Ver la Documentación

1. Abre el archivo `index.html` en tu navegador
2. Navega por las diferentes secciones usando el menú lateral
3. Usa la función de búsqueda para encontrar métodos específicos
4. Copia y pega los ejemplos de código en tus scripts

### Para Desarrollo con WebStorm/IntelliJ

#### 📋 Configuración Paso a Paso

1. **Crear/Abrir Proyecto**
   - Abre WebStorm/IntelliJ IDEA
   - Crea un nuevo proyecto o abre uno existente donde desarrollarás tus scripts

2. **Incluir Definiciones TypeScript**
   - Copia el archivo `classicuo.d.ts` a la raíz de tu proyecto
   - Alternativamente, colócalo en una carpeta `@types/` o `typings/`

3. **Configurar TypeScript (Recomendado)**
   
   Crea un archivo `tsconfig.json` en la raíz del proyecto:
   ```json
   {
     "compilerOptions": {
       "target": "ES2015",
       "lib": ["ES2015", "DOM"],
       "allowJs": true,
       "checkJs": false,
       "declaration": false,
       "outDir": "./dist",
       "strict": false,
       "moduleResolution": "node",
       "allowSyntheticDefaultImports": true,
       "esModuleInterop": true
     },
     "include": [
       "**/*.js",
       "**/*.ts",
       "classicuo.d.ts"
     ]
   }
   ```

4. **Habilitar JavaScript/TypeScript Features**
   - Ve a `File → Settings → Languages & Frameworks → JavaScript`
   - Establece `JavaScript language version` en `ECMAScript 6+`
   - Activa `Use TypeScript service` si está disponible

5. **Verificar Funcionamiento**
   - Crea un archivo `.js` de prueba
   - Escribe `player.` y verifica que aparece autocompletado
   - Haz hover sobre métodos para ver documentación JSDoc

#### 🎯 Funcionalidades Disponibles
- ✅ **Autocompletado inteligente** - IntelliSense completo de la API
- ✅ **Documentación inline** - JSDoc al hacer hover
- ✅ **Navegación de código** - Ir a definición (Ctrl+Click)
- ✅ **Detección de errores** - Validación de tipos en tiempo real
- ✅ **Refactoring seguro** - Renombrado de variables y métodos

### Para Desarrollo con Visual Studio Code

#### 📋 Configuración Paso a Paso

1. **Instalar Extensiones Recomendadas**
   - Instala la extensión oficial de Microsoft: `JavaScript and TypeScript Nightly`
   - Opcionalmente: `Auto Import - ES6, TS, JSX, TSX` para imports automáticos

2. **Configurar Proyecto**
   - Abre tu carpeta de proyecto en VS Code
   - Copia el archivo `classicuo.d.ts` a la raíz del proyecto

3. **Crear Configuración TypeScript**
   
   Crea un archivo `.vscode/settings.json` en tu proyecto:
   ```json
   {
     "typescript.preferences.includePackageJsonAutoImports": "off",
     "typescript.suggest.autoImports": false,
     "javascript.suggest.enabled": true,
     "typescript.validate.enable": true,
     "javascript.validate.enable": true
   }
   ```

4. **Configurar tsconfig.json**
   
   Crea un archivo `tsconfig.json` (mismo contenido que WebStorm):
   ```json
   {
     "compilerOptions": {
       "target": "ES2015",
       "lib": ["ES2015", "DOM"],
       "allowJs": true,
       "checkJs": false,
       "declaration": false,
       "strict": false,
       "moduleResolution": "node"
     },
     "include": [
       "**/*.js",
       "**/*.ts", 
       "classicuo.d.ts"
     ]
   }
   ```

5. **Activar TypeScript para JavaScript**
   - Abre un archivo `.js`
   - Añade al inicio: `// @ts-check` (opcional, para validación estricta)
   - O globalmente: crea `jsconfig.json` en lugar de `tsconfig.json`

#### 🎯 Funcionalidades Disponibles
- ✅ **IntelliSense avanzado** - Autocompletado y sugerencias
- ✅ **Documentación contextual** - Información al hacer hover
- ✅ **Ir a definición** - Navegación rápida con F12
- ✅ **Validación de tipos** - Errores y advertencias en tiempo real
- ✅ **Snippets inteligentes** - Fragmentos de código automáticos

#### 🔧 Consejos y Solución de Problemas

**Para ambos IDEs:**
- Si el autocompletado no funciona, reinicia el servicio TypeScript
- Asegúrate de que el archivo `classicuo.d.ts` esté en la raíz del proyecto
- Verifica que no hay conflictos con otros archivos `.d.ts`
- Para mejor rendimiento, excluye carpetas innecesarias en `tsconfig.json`

**WebStorm/IntelliJ específico:**
- `Help → Find Action → Restart TypeScript Service` si hay problemas
- `File → Invalidate Caches and Restart` para limpiar cache

**VS Code específico:**  
- `Ctrl+Shift+P → TypeScript: Restart TS Server` si es necesario
- Instala `Error Lens` para mejor visualización de errores
- Usa `Ctrl+Space` para forzar autocompletado si no aparece

## 📖 Contenido Documentado

### 🎯 Cliente (Client)
Funciones principales para interactuar con el cliente del juego, incluyendo búsqueda de entidades, manejo de la interfaz, sistema de comercio, y consultas del estado del juego.

### 🎪 Targeting (Target)  
Sistema completo de targeting con propiedades de objetivos actuales, métodos de selección automática, cancelación de targets, y manejo de cursores especializados.

### 📜 Journal
Manejo avanzado del journal del juego con funciones para buscar texto, obtener mensajes recientes, filtrar por tipo de mensaje, y gestión del historial.

### 🖼️ Gumps
Sistema completo de gumps (ventanas del juego) con métodos para encontrar elementos, interactuar con controles, envío de respuestas, y manejo de gumps dinámicos.

## 🎮 Ejemplos de Scripts

### Auto-Heal Básico
```javascript
// Script de auto-curación simple
function autoHeal() {
    if (player.hits < player.maxHits * 0.8) {
        if (client.findType(0x0F0C)) { // Poción de curación
            client.useObject(client.findType(0x0F0C));
            log('Usando poción de curación');
        }
    }
    sleep(1000);
}

// Ejecutar en loop
while (!client.dead) {
    autoHeal();
}
```

### Minería Automática
```javascript
// Script de minería automática con detección de vetas
function autoMining() {
    const pickaxe = client.findType(0x0E86, -1, player.backpack);
    if (!pickaxe) {
        log('No se encontró pico de minería');
        return;
    }
    
    target.setTargetToLoc(player.x, player.y, player.z);
    client.useObject(pickaxe);
    
    // Esperar resultado
    sleep(3000);
    
    // Comprobar si hay metal
    if (journal.search('You dig some')) {
        log('¡Metal encontrado!');
    } else if (journal.search('There is nothing')) {
        log('Veta agotada, moviendo posición');
        // Lógica para mover a nueva posición
    }
}
```

## 🛠️ Desarrollo y Contribuciones

### Estructura del Proyecto
```
classicuo-scripting-docs-es/
├── README.md              # Este archivo
├── LICENSE               # Licencia MIT
├── index.html           # Documentación principal
├── classicuo.d.ts       # Definiciones TypeScript
├── assets/              # Recursos (CSS, imágenes)
└── examples/            # Scripts de ejemplo
```

### Contribuir al Proyecto

1. **Fork** este repositorio
2. **Clona** tu fork localmente
3. **Crea** una nueva rama para tu contribución
4. **Realiza** tus cambios y mejoras
5. **Prueba** que todo funciona correctamente
6. **Commit** tus cambios con mensajes descriptivos
7. **Push** a tu fork y abre un **Pull Request**

## 📊 Estadísticas de Documentación

- ✅ **250+ métodos documentados** - Cobertura completa de la API
- ✅ **15+ enumeraciones** - Todos los tipos y constantes
- ✅ **50+ ejemplos de código** - Casos de uso reales
- ✅ **8 namespaces principales** - Organización lógica
- ✅ **100% en español** - Traducción completa y precisa
- ✅ **TypeScript definitions** - Soporte completo para IDEs

## ⚠️ Notas Importantes

### Compatibilidad
Esta documentación está diseñada para ClassicUO v4.0.x y versiones posteriores. Algunos métodos pueden no estar disponibles en versiones anteriores del cliente.

### Rendimiento
Los scripts deben usar `sleep()` apropiadamente para evitar sobrecargar el cliente. Se recomienda un mínimo de 100ms entre operaciones intensivas.

### Seguridad
Siempre verifica la validez de objetos y entidades antes de usarlos. El estado del juego puede cambiar rápidamente y los scripts deben ser defensivos.

## 🔗 Enlaces Útiles

- [ClassicUO GitHub](https://github.com/ClassicUO/ClassicUO) - Repositorio oficial del cliente
- [ClassicUO Discord](https://discord.gg/VdyCXjQ) - Comunidad oficial
- [Documentación Original](https://www.classicuo.eu/) - Sitio web oficial
- [Ejemplos Avanzados](https://github.com/ClassicUO/Scripts) - Repositorio de scripts

## 🌟 Apoyo al Proyecto Original

ClassicUO es un proyecto de código abierto mantenido por desarrolladores voluntarios. Si encuentras útil este cliente, considera apoyar a los desarrolladores originales:

- [Patreon de ClassicUO](https://www.patreon.com/classicuo)
- [PayPal](https://www.paypal.me/classicuo)

---

<div align="center">
  <strong>💖 Hecho con amor por la comunidad hispana de Ultima Online 💖</strong>
  <br>
  <em>¡Únete a nosotros y ayuda a mejorar esta documentación!</em>
</div>