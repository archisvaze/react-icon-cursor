import { createElement, useEffect } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

export default function useReactIconCursor({ color = '#000000', size = 24, cursors } = {}) {
    useEffect(() => {
        if (!cursors || typeof cursors !== 'object' || Object.keys(cursors).length === 0) {
            console.warn('No cursors provided');
            return;
        }

        const styleId = '__react-icon-cursor';
        let style = document.getElementById(styleId);

        if (!style) {
            style = document.createElement('style');
            style.id = styleId;
            document.head.appendChild(style);
        }

        const generateCursor = (IconComponent) => {
            if (!IconComponent) return null;

            let raw;
            try {
                raw = renderToStaticMarkup(createElement(IconComponent));
            } catch (e) {
                console.error('Failed to render icon:', e.message);
                return null;
            }

            const viewBoxMatch = raw.match(/viewBox="([^"]*)"/);
            const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';

            const innerMatch = raw.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
            if (!innerMatch) {
                console.error('Could not parse SVG');
                return null;
            }

            // Replace currentColor
            let inner = innerMatch[1].replace(/currentColor/g, color);

            // If icon has no fill/stroke, force fill
            if (!/fill=/.test(inner) && !/stroke=/.test(inner)) {
                inner = `<g fill="${color}">${inner}</g>`;
            }

            const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${viewBox}">${inner}</svg>`;

            return `data:image/svg+xml,${encodeURIComponent(svg)}`;
        };

        const cursorSelectors = {
            default: 'body',
            pointer: 'a, button, [role="button"]',
            text: 'input, textarea, [contenteditable="true"]',
            grab: '[draggable="true"]',
        };

        let css = '';

        Object.entries(cursors).forEach(([type, IconComponent]) => {
            const selector = cursorSelectors[type];
            if (!selector || !IconComponent) return;

            const encoded = generateCursor(IconComponent);
            if (!encoded) return;

            css += `${selector} { cursor: url("${encoded}"), auto !important; }\n`;
        });

        if (!css) {
            console.warn('No valid cursor entries');
            style.textContent = '';
            return;
        }

        style.textContent = css;

        return () => {
            if (style && style.parentNode) {
                style.parentNode.removeChild(style);
            }
        };
    }, [cursors, color, size]);
}
