function copyCode(button) {
    const codeBlock = button.closest('.code-block');
    const codeContent = codeBlock.querySelector('.code-content code');
    const textToCopy = codeContent.textContent;

    navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = button.textContent;
        button.textContent = '¡Copiado!';
        button.classList.add('copied');

        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Error al copiar: ', err);
        // Fallback para navegadores más antiguos
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        const originalText = button.textContent;
        button.textContent = '¡Copiado!';
        button.classList.add('copied');

        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
        }, 2000);
    });
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}

// Sistema de navegación activa robusto y smooth scroll
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = Array.from(document.querySelectorAll('section'));
    let isScrolling = false;
    let scrollTimeout;
    let activeSection = null;

    // Función para determinar la sección activa basada en posición
    function getCurrentSection() {
        const scrollPos = window.pageYOffset;
        const viewportHeight = window.innerHeight;
        const offset = viewportHeight * 0.2; // 20% del viewport como offset

        let currentSection = null;
        let maxVisibility = 0;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top + scrollPos;
            const sectionBottom = sectionTop + rect.height;

            // Calcular qué tanto de la sección está visible
            const visibleTop = Math.max(sectionTop, scrollPos + offset);
            const visibleBottom = Math.min(sectionBottom, scrollPos + viewportHeight);
            const visibleHeight = Math.max(0, visibleBottom - visibleTop);
            const visibility = visibleHeight / rect.height;

            // También considerar si la sección está cerca del centro de la pantalla
            const sectionCenter = sectionTop + rect.height / 2;
            const screenCenter = scrollPos + viewportHeight / 2;
            const distanceFromCenter = Math.abs(sectionCenter - screenCenter);
            const centerWeight = 1 / (1 + distanceFromCenter / viewportHeight);

            // Combinar visibilidad y proximidad al centro
            const score = visibility * 0.7 + centerWeight * 0.3;

            if (score > maxVisibility && visibility > 0.1) {
                maxVisibility = score;
                currentSection = section;
            }
        });

        return currentSection;
    }

    // Función para actualizar la navegación activa
    function updateActiveNavigation() {
        const currentSection = getCurrentSection();

        if (currentSection && currentSection !== activeSection) {
            activeSection = currentSection;
            const id = currentSection.id;

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === id) {
                    link.classList.add('active');
                }
            });
        }
    }

    // Función de throttling para optimizar el rendimiento
    function throttle(func, limit) {
        let inThrottle;
        return function () {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Event listener optimizado para scroll
    const handleScroll = throttle(() => {
        if (!isScrolling) {
            updateActiveNavigation();
        }
    }, 16); // ~60fps

    // Detectar cuando el scroll termina para una actualización final
    function handleScrollEnd() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
            updateActiveNavigation();
        }, 100);
    }

    // Event listeners
    window.addEventListener('scroll', () => {
        handleScroll();
        handleScrollEnd();
    }, {passive: true});

    // Inicializar la navegación activa
    updateActiveNavigation();

    // IntersectionObserver como respaldo para casos edge
    const observerOptions = {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: '-10% 0px -10% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        // Solo actuar si no estamos en scroll rápido
        if (!isScrolling) {
            setTimeout(updateActiveNavigation, 50);
        }
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Smooth scroll mejorado
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 20;

                // Smooth scroll con desaceleración
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Cerrar sidebar en móviles
                if (window.innerWidth <= 1024) {
                    document.getElementById('sidebar').classList.remove('open');
                }
            }
        });
    });

    // ============================================================
    // SISTEMA DE TABLAS COLAPSABLES - GENÉRICO
    // Funciona tanto para métodos como para propiedades
    // ============================================================

    /**
     * Función genérica para inicializar filas colapsables
     * @param {string} rowSelector - Selector CSS para las filas clicables (ej: '.method-row')
     * @param {string} detailsSelector - Selector CSS para las filas de detalles (ej: '.method-details')
     * @param {string} dataAttribute - Nombre del atributo data a usar (ej: 'data-method')
     */
    function initCollapsibleRows(rowSelector, detailsSelector, dataAttribute) {
        const rows = document.querySelectorAll(rowSelector);

        rows.forEach(row => {
            // Agregar indicador visual de expansión solo si no existe
            const firstCell = row.querySelector('td:first-child');
            if (firstCell && !firstCell.querySelector('.expand-icon')) {
                firstCell.innerHTML = `<span class="expand-icon">▶</span>${firstCell.innerHTML}`;
            }

            // Event listener para expandir/colapsar
            row.addEventListener('click', function () {
                // Obtener el identificador único del item
                const itemName = this.getAttribute(dataAttribute);
                if (!itemName) return;

                // Buscar la fila de detalles correspondiente
                const detailsRow = document.querySelector(`[${dataAttribute}="${itemName}"]${detailsSelector}`);
                const expandIcon = this.querySelector('.expand-icon');

                if (detailsRow && expandIcon) {
                    const isVisible = detailsRow.style.display !== 'none';

                    // Toggle visibility
                    detailsRow.style.display = isVisible ? 'none' : 'table-row';

                    // Update icon and state
                    expandIcon.textContent = isVisible ? '▶' : '▼';
                    this.classList.toggle('expanded', !isVisible);

                    // Save state in localStorage
                    const storageKey = `${dataAttribute}-${itemName}-expanded`;
                    localStorage.setItem(storageKey, (!isVisible).toString());
                }
            });

            // Restaurar el estado previo desde localStorage
            const itemName = row.getAttribute(dataAttribute);
            if (itemName) {
                const storageKey = `${dataAttribute}-${itemName}-expanded`;
                const wasExpanded = localStorage.getItem(storageKey) === 'true';

                if (wasExpanded) {
                    const detailsRow = document.querySelector(`[${dataAttribute}="${itemName}"]${detailsSelector}`);
                    const expandIcon = row.querySelector('.expand-icon');

                    if (detailsRow && expandIcon) {
                        detailsRow.style.display = 'table-row';
                        expandIcon.textContent = '▼';
                        row.classList.add('expanded');
                    }
                }
            }
        });
    }

    /**
     * Inicializar tablas colapsables para MÉTODOS
     */
    function initCollapsibleMethods() {
        initCollapsibleRows('.method-row', '.method-details', 'data-method');
    }

    /**
     * Inicializar tablas colapsables para PROPIEDADES
     */
    function initCollapsibleProperties() {
        initCollapsibleRows('.property-row', '.property-details', 'data-property');
    }

    // Inicializar ambos tipos de tablas colapsables
    initCollapsibleMethods();
    initCollapsibleProperties();

    // Re-inicializar cuando se agreguen nuevas tablas dinámicamente
    const mutationObserver = new MutationObserver(function (mutations) {
        let needsReinit = false;
        mutations.forEach(function (mutation) {
            mutation.addedNodes.forEach(function (node) {
                if (node.nodeType === 1) {
                    // Detectar si se agregó una tabla de métodos o propiedades
                    if (node.classList.contains('methods-table') ||
                        node.classList.contains('properties-table') ||
                        node.querySelector('.methods-table') ||
                        node.querySelector('.properties-table')) {
                        needsReinit = true;
                    }
                }
            });
        });
        if (needsReinit) {
            setTimeout(() => {
                initCollapsibleMethods();
                initCollapsibleProperties();
            }, 100);
        }
    });

    mutationObserver.observe(document.body, {childList: true, subtree: true});
});