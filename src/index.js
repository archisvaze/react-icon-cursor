import { createElement, useEffect } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

export default function useReactIconCursor({ icon, color = '#000000', size = 24 } = {}) {
    useEffect(() => {
        if (!icon) {
            console.warn('No icon provided');
            return;
        }

        let raw;
        try {
            raw = renderToStaticMarkup(createElement(icon));
        } catch (e) {
            console.error('Failed to render icon:', e.message);
            return;
        }

        const viewBoxMatch = raw.match(/viewBox="([^"]*)"/);
        const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';

        const innerMatch = raw.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
        if (!innerMatch) {
            console.error('Could not parse SVG');
            return;
        }

        // Replace currentColor
        let inner = innerMatch[1].replace(/currentColor/g, color);

        // If icon has no fill/stroke, force fill
        if (!/fill=/.test(inner) && !/stroke=/.test(inner)) {
            inner = `<g fill="${color}">${inner}</g>`;
        }

        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${viewBox}">${inner}</svg>`;

        const encoded = `data:image/svg+xml,${encodeURIComponent(svg)}`;

        const styleId = '__react-icon-cursor';
        let style = document.getElementById(styleId);

        if (!style) {
            style = document.createElement('style');
            style.id = styleId;
            document.head.appendChild(style);
        }

        style.textContent = `body { cursor: url("${encoded}"), auto !important; }`;

        return () => {
            if (style && style.parentNode) {
                style.parentNode.removeChild(style);
            }
        };
    }, [icon, color, size]);
}
