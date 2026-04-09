# react-icon-cursor

Turn any React icon into your cursor. A ghost. A rocket. A sword. Your call.

![Screen Recording](https://github.com/user-attachments/assets/626d09c3-9d51-430f-b913-8aad031a9a47)

## What is this?

A tiny hook that takes a React icon, converts it into an SVG data URL, and injects it into CSS as a cursor.

No canvas hacks. No external assets. Just React → SVG → cursor.

---

## Install

```bash
npm install react-icon-cursor react-icons
```

---

## Usage

### 1. Import the hook

```js
import { useReactIconCursor } from 'react-icon-cursor';
```

---

### 2. Pick an icon

```js
import { FaGhost } from 'react-icons/fa6';
```

---

### 3. Configure the cursor

```js
const config = {
    body: {
        icon: FaGhost,
        size: 24,
        style: { color: '#60a5fa' },
        hotspot: 'topLeft',
        fallback: 'auto',
    },
};
```

---

### 4. Use the hook

```js
useReactIconCursor(config);
```

---

## Config API

Each selector maps to a cursor config.

```js
{
    selector: {
        (icon, size, style, hotspot, fallback);
    }
}
```

### selector

Any valid CSS selector.

```js
'*'; // everything
'button'; // only buttons
'.card'; // class
'#app'; // id
```

---

### icon (required)

A React icon component.

```js
import { FaRocket } from 'react-icons/fa6';

icon: FaRocket;
```

---

### size (default: 16)

Pixel size of the cursor.

```js
size: 32;
```

---

### style (default: black)

Inline styles applied to the icon.

```js
style: {
    color: '#ff0000';
}
```

You can pass any style attributes that static svgs support:

- color
- fill
- stroke
- strokeWidth
- opacity
- transform
- transformOrigin
- transformBox
- filter

---

### hotspot (default: topLeft)

Controls the actual click point.

You can use:

#### Named positions

```js
topLeft;
top;
topRight;
left;
center;
right;
bottomLeft;
bottom;
bottomRight;
```

#### Or exact coordinates

```js
hotspot: [10, 10];
```

---

### fallback (default: auto)

Fallback cursor if something fails.

```js
fallback: 'auto';
```

---

## Multiple cursors

You can scope different cursors to different elements.

```js
const config = {
    '*': {
        icon: FaGhost,
    },
    button: {
        icon: FaHandPointer,
        fallback: 'pointer',
    },
};
```

---

## How it works

- React icon → rendered to static SVG
- SVG → encoded into data URL
- CSS injected into `<style>` tag
- Browser uses it as cursor

---

## Gotchas

- Very large sizes can look blurry depending on the browser
- Some browsers clamp cursor size
- If your cursor is not updating, check selector specificity
- Animations do not work (cursor images are always static)
- Layout styles like `margin`, `padding`, `position` are ignored
- `background` / `backgroundColor` won’t apply
- Styles may not override icons with hardcoded `fill`/`stroke`
- External CSS cannot target the SVG (it’s a data URL)
- Transforms may need `transformBox: 'fill-box'` for consistency

---

## Why this exists

Because default cursors are boring.

And because React icons are already in your bundle, so why not reuse them in the weirdest possible way.

---

## Final note

If you end up shipping a production app where users have a sword as a cursor, that’s on you lol.
