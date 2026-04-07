import { useState } from 'react';
import useReactIconCursor from '../index.js';

import { FaHandPointer } from 'react-icons/fa';
import { FaArrowPointer } from 'react-icons/fa6';
import { LuMousePointer2 } from 'react-icons/lu';
import { PiMaskHappyFill } from 'react-icons/pi';

const icons = [
    { id: 'FaArrowPointer', Icon: FaArrowPointer },
    { id: 'FaHandPointer', Icon: FaHandPointer },
    { id: 'LuMousePointer2', Icon: LuMousePointer2 },
    { id: 'PiMaskHappyFill', Icon: PiMaskHappyFill },
];

const colors = ['#e04400', '#2563eb', '#16a34a', '#9333ea', '#000000'];

export default function App() {
    const [activeIcon, setActiveIcon] = useState('FaArrowPointer');
    const [color, setColor] = useState('#e04400');
    const [size, setSize] = useState(28);

    const Icon = icons.find((i) => i.id === activeIcon).Icon;

    useReactIconCursor({
        icon: Icon,
        color,
        size,
    });

    return (
        <div style={{ padding: 20 }}>
            <h2>React Icon Cursor Demo</h2>

            <div style={{ display: 'flex', gap: 10 }}>
                {icons.map(({ id, Icon }) => (
                    <button
                        key={id}
                        onClick={() => setActiveIcon(id)}
                        style={{
                            padding: 10,
                            border: activeIcon === id ? '2px solid black' : '1px solid #ccc',
                            background: 'white',
                            cursor: 'pointer',
                        }}
                    >
                        <Icon size={20} />
                    </button>
                ))}
            </div>

            <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
                {colors.map((c) => (
                    <button
                        key={c}
                        onClick={() => setColor(c)}
                        style={{
                            width: 30,
                            height: 30,
                            background: c,
                            border: color === c ? '2px solid black' : '1px solid #ccc',
                            cursor: 'pointer',
                        }}
                    />
                ))}
            </div>

            <div style={{ marginTop: 20 }}>
                <label>Size: {size}</label>
                <input
                    type='range'
                    min={16}
                    max={48}
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    style={{ width: 200, display: 'block', marginTop: 10 }}
                />
            </div>
        </div>
    );
}
