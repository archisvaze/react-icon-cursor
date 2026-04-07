import { useState } from 'react';
import useReactIconCursor from '../index.js';

import { FaHandPaper, FaHandPointer } from 'react-icons/fa';
import { FaArrowPointer } from 'react-icons/fa6';
import { TbPointerFilled } from 'react-icons/tb';

const defaultIcons = [
    { id: 'FaArrowPointer', Icon: FaArrowPointer },
    { id: 'TbPointerFilled', Icon: TbPointerFilled },
];

const pointerIcons = [
    { id: 'FaHandPointer', Icon: FaHandPointer },
    { id: 'FaHandPaper', Icon: FaHandPaper },
];

const colors = ['#e04400', '#2563eb', '#16a34a', '#9333ea', '#000000', '#ef4444', '#f59e0b', '#10b981', '#06b6d4', '#8b5cf6', '#ec4899'];

export default function App() {
    const [defaultIcon, setDefaultIcon] = useState('FaArrowPointer');
    const [pointerIcon, setPointerIcon] = useState('FaHandPointer');

    const [color, setColor] = useState('#e04400');
    const [size, setSize] = useState(28);

    const getIcon = (list, id) => list.find((i) => i.id === id).Icon;

    useReactIconCursor({
        color,
        size,
        cursors: {
            default: getIcon(defaultIcons, defaultIcon),
            pointer: getIcon(pointerIcons, pointerIcon),
            // text: getIcon(textIcons, textIcon),
            // grab: getIcon(grabIcons, grabIcon),
            // move: getIcon(moveIcons, moveIcon),
            // crosshair: getIcon(crosshairIcons, crosshairIcon),
            // 'not-allowed': getIcon(notAllowedIcons, notAllowedIcon),
        },
    });

    return (
        <div className='p-6 max-w-5xl mx-auto space-y-8'>
            <h2 className='text-2xl font-semibold'>React Icon Cursor Demo</h2>

            <div>
                <h4 className='text-sm font-medium mb-2 text-gray-500'>Default</h4>
                <div className='flex flex-wrap gap-2'>
                    {defaultIcons.map(({ id, Icon }) => (
                        <button
                            key={id}
                            onClick={() => setDefaultIcon(id)}
                            className={`p-2 rounded-lg border transition 
                                ${defaultIcon === id ? 'border-black bg-gray-100' : 'border-gray-200 hover:bg-gray-50'}`}
                        >
                            <Icon size={20} />
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <h4 className='text-sm font-medium mb-2 text-gray-500'>Pointer</h4>
                <div className='flex flex-wrap gap-2'>
                    {pointerIcons.map(({ id, Icon }) => (
                        <button
                            key={id}
                            onClick={() => setPointerIcon(id)}
                            className={`p-2 rounded-lg border transition 
                                ${pointerIcon === id ? 'border-black bg-gray-100' : 'border-gray-200 hover:bg-gray-50'}`}
                        >
                            <Icon size={20} />
                        </button>
                    ))}
                </div>
            </div>

            <div className='flex flex-wrap gap-3'>
                {colors.map((c) => (
                    <button
                        key={c}
                        onClick={() => setColor(c)}
                        className={`w-8 h-8 rounded-md border transition 
                            ${color === c ? 'border-black scale-110' : 'border-gray-300'}`}
                        style={{ background: c }}
                    />
                ))}
            </div>

            <div className='space-y-2'>
                <label className='text-sm text-gray-600'>Size: {size}</label>
                <input
                    className='w-full cursor-pointer'
                    type='range'
                    min={16}
                    max={48}
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                />
            </div>
        </div>
    );
}
