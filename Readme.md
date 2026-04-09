# react-icon-cursor

Use React icons as custom cursors. No images, no assets, just components.

---

## Install

```
npm install react-icon-cursor react-icons
```

react-icons is required because this library renders icon components into SVG cursors.

---

## Basic Usage

```
import useReactIconCursor from 'react-icon-cursor';
import { FaArrowPointer } from 'react-icons/fa6';

function App() {
  useReactIconCursor({
    body: {
      icon: FaArrowPointer,
      size: 24,
      color: '#2563eb'
    }
  });

  return <div>Hover anywhere</div>;
}
```

---

## API

```
useReactIconCursor({
  [selector]: {
    icon: ReactComponent,
    size: number,
    color: string,
    hotspot: string | [x, y],
    fallback: string
  }
})
```

Defaults:

- size: 16
- color: black
- hotspot: topLeft
- fallback: auto

---

## Selectors

Any valid CSS selector works:

```
{
  body: {...},
  '.button': {...},
  '#app': {...},
  'a:hover': {...}
}
```

---

## Hotspot

Defines where the click happens inside the cursor.

Presets:

topLeft  
top  
topRight  
left  
center  
right  
bottomLeft  
bottom  
bottomRight

Example:

```
{
  body: {
    icon: FaArrowPointer,
    hotspot: 'topLeft'
  }
}
```

Custom coordinates:

```
{
  body: {
    icon: FaArrowPointer,
    hotspot: [4, 2]
  }
}
```

---

## Fallback

Always include a fallback:

fallback: 'pointer'

If the custom cursor fails, the browser falls back to this.

---

## Notes

- Desktop browsers only. Mobile ignores cursors.
- Keep sizes reasonable. Large SVGs may fail.
- Some browsers have data URL limits.

---

## Example

```
import { FaArrowPointer, FaHandPointer } from 'react-icons/fa6';

useReactIconCursor({
  body: {
    icon: FaArrowPointer,
    size: 24,
    color: '#2563eb',
    hotspot: 'topLeft'
  },
  '.clickable': {
    icon: FaHandPointer,
    size: 20,
    color: '#111',
    fallback: 'pointer'
  }
});
```

---

## Why this exists

Custom cursors are usually image files and annoying to manage.

This keeps everything inside React and lets you reuse your icon system.

---

## License

MIT
