import { createElement, useEffect } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const defaultSize = 16;
const defaultColor = '#000000';

const hotspotMap = {
    topLeft: [0, 0],
    top: ['50%', 0],
    topRight: ['100%', 0],
    left: [0, '50%'],
    center: ['50%', '50%'],
    right: ['100%', '50%'],
    bottomLeft: [0, '100%'],
    bottom: ['50%', '100%'],
    bottomRight: ['100%', '100%'],
};

export default function useReactIconCursor(config = {}) {
    useEffect(() => {
        if (!config || typeof config !== 'object' || Object.keys(config).length === 0) {
            console.warn('[useReactIconCursor] No cursor config provided');
            return;
        }

        const styleId = '__react-icon-cursor';
        let style = document.getElementById(styleId);

        if (!style) {
            style = document.createElement('style');
            style.id = styleId;
            document.head.appendChild(style);
        }

        const generateCursor = (IconComponent, size, color) => {
            if (!IconComponent) {
                console.warn('[useReactIconCursor] Missing icon component');
                return null;
            }

            try {
                const raw = renderToStaticMarkup(
                    createElement(IconComponent, {
                        size,
                        style: { color },
                    }),
                );

                return `data:image/svg+xml,${encodeURIComponent(raw)}`;
            } catch (e) {
                console.error('[useReactIconCursor] Failed to render icon:', e.message);
                return null;
            }
        };

        const resolveHotspot = (hotspot, size) => {
            if (!hotspot) {
                return '0 0';
            }

            if (Array.isArray(hotspot) && hotspot.length === 2) {
                return `${hotspot[0]} ${hotspot[1]}`;
            }

            if (typeof hotspot === 'string') {
                const mapped = hotspotMap[hotspot];

                if (!mapped) {
                    console.warn(`[useReactIconCursor] Invalid hotspot "${hotspot}". Falling back to topLeft.`);
                    return '0 0';
                }

                const [x, y] = mapped;

                const resolve = (val) => (typeof val === 'string' ? Math.round((parseFloat(val) / 100) * size) : val);

                return `${resolve(x)} ${resolve(y)}`;
            }

            console.warn(`[useReactIconCursor] Invalid hotspot format. Expected string or [x,y]. Falling back to topLeft.`);
            return '0 0';
        };

        let css = '';

        Object.entries(config).forEach(([selector, entry]) => {
            if (!entry || typeof entry !== 'object') {
                console.warn(`[useReactIconCursor] Invalid entry for selector "${selector}"`);
                return;
            }

            const { icon, size = defaultSize, color = defaultColor, fallback = 'auto', hotspot = 'topLeft' } = entry;

            if (!icon) {
                console.warn(`[useReactIconCursor] Missing icon for selector "${selector}"`);
                return;
            }

            const encoded = generateCursor(icon, size, color);
            if (!encoded) {
                return;
            }

            const hotspotCoords = resolveHotspot(hotspot, size);

            css += `
${selector} {
    cursor: url("${encoded}") ${hotspotCoords}, ${fallback} !important;
}
`;
        });

        if (!css.trim()) {
            console.warn('[useReactIconCursor] No valid cursor entries');
            style.textContent = '';
            return;
        }

        style.textContent = css;

        return () => {
            if (style && style.parentNode) {
                style.parentNode.removeChild(style);
            }
        };
    }, [config]);
}
