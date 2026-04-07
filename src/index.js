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
                raw = renderToStaticMarkup(
                    createElement(IconComponent, {
                        size,
                        style: { color },
                    }),
                );
            } catch (e) {
                console.error('Failed to render icon:', e.message);
                return null;
            }

            return `data:image/svg+xml,${encodeURIComponent(raw)}`;
        };

        const cursorSelectors = {
            default: 'body, .cursor-default',
            pointer: 'a, button, [role="button"], .cursor-pointer',
            // text: 'input, textarea, [contenteditable="true"], .cursor-text',
            // grab: '[draggable="true"], .cursor-grab',
            // move: '.cursor-move',
            // crosshair: '.cursor-crosshair',
            // 'not-allowed': '.cursor-not-allowed',
        };

        let css = '';

        Object.entries(cursors).forEach(([type, IconComponent]) => {
            const selector = cursorSelectors[type];
            if (!selector || !IconComponent) return;

            const encoded = generateCursor(IconComponent);
            if (!encoded) return;

            css += `${selector} { cursor: url("${encoded}"), auto !important; }\n`;
        });

        console.log(css);

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
