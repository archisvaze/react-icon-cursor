import { useState } from 'react';
import useReactIconCursor from '../index.js';

import { FaArrowsAlt, FaBan, FaCrosshairs, FaHandPaper, FaHandPointer } from 'react-icons/fa';
import { FaArrowPointer } from 'react-icons/fa6';
import { LuMousePointer2 } from 'react-icons/lu';
import { MdDoNotDisturb, MdOpenWith, MdPanTool, MdTextFields, MdTitle } from 'react-icons/md';
import { PiMaskHappyFill } from 'react-icons/pi';
import { RiDragMove2Fill } from 'react-icons/ri';
import { TbTargetArrow, TbTextSize } from 'react-icons/tb';

const defaultIcons = [
    { id: 'FaArrowPointer', Icon: FaArrowPointer },
    { id: 'PiMaskHappyFill', Icon: PiMaskHappyFill },
    { id: 'TbTargetArrow', Icon: TbTargetArrow },
    { id: 'FaCrosshairs', Icon: FaCrosshairs },
    { id: 'FaArrowsAlt', Icon: FaArrowsAlt },
];

const pointerIcons = [
    { id: 'FaHandPointer', Icon: FaHandPointer },
    { id: 'MdPanTool', Icon: MdPanTool },
    { id: 'FaHandPaper', Icon: FaHandPaper },
    { id: 'MdOpenWith', Icon: MdOpenWith },
    { id: 'RiDragMove2Fill', Icon: RiDragMove2Fill },
];

const textIcons = [
    { id: 'MdTextFields', Icon: MdTextFields },
    { id: 'MdTitle', Icon: MdTitle },
    { id: 'TbTextSize', Icon: TbTextSize },
    { id: 'LuMousePointer2', Icon: LuMousePointer2 },
];

const grabIcons = [
    { id: 'FaHandPaper', Icon: FaHandPaper },
    { id: 'MdPanTool', Icon: MdPanTool },
    { id: 'RiDragMove2Fill', Icon: RiDragMove2Fill },
    { id: 'FaArrowsAlt', Icon: FaArrowsAlt },
    { id: 'MdOpenWith', Icon: MdOpenWith },
];

const moveIcons = [
    { id: 'FaArrowsAlt', Icon: FaArrowsAlt },
    { id: 'RiDragMove2Fill', Icon: RiDragMove2Fill },
    { id: 'MdOpenWith', Icon: MdOpenWith },
    { id: 'TbTargetArrow', Icon: TbTargetArrow },
    { id: 'FaCrosshairs', Icon: FaCrosshairs },
];

const crosshairIcons = [
    { id: 'FaCrosshairs', Icon: FaCrosshairs },
    { id: 'TbTargetArrow', Icon: TbTargetArrow },
    { id: 'FaArrowPointer', Icon: FaArrowPointer },
    { id: 'LuMousePointer2', Icon: LuMousePointer2 },
    { id: 'MdOpenWith', Icon: MdOpenWith },
];

const notAllowedIcons = [
    { id: 'FaBan', Icon: FaBan },
    { id: 'MdDoNotDisturb', Icon: MdDoNotDisturb },
    { id: 'FaCrosshairs', Icon: FaCrosshairs },
    { id: 'TbTargetArrow', Icon: TbTargetArrow },
    { id: 'FaArrowPointer', Icon: FaArrowPointer },
];

const colors = ['#e04400', '#2563eb', '#16a34a', '#9333ea', '#000000', '#ef4444', '#f59e0b', '#10b981', '#06b6d4', '#8b5cf6', '#ec4899'];

export default function App() {
    const [defaultIcon, setDefaultIcon] = useState('FaArrowPointer');
    const [pointerIcon, setPointerIcon] = useState('FaHandPointer');
    const [textIcon, setTextIcon] = useState('MdTextFields');
    const [grabIcon, setGrabIcon] = useState('FaHandPaper');
    const [moveIcon, setMoveIcon] = useState('FaArrowsAlt');
    const [crosshairIcon, setCrosshairIcon] = useState('FaCrosshairs');
    const [notAllowedIcon, setNotAllowedIcon] = useState('FaBan');

    const [color, setColor] = useState('#e04400');
    const [size, setSize] = useState(28);

    const getIcon = (list, id) => list.find((i) => i.id === id).Icon;

    useReactIconCursor({
        color,
        size,
        cursors: {
            default: getIcon(defaultIcons, defaultIcon),
            pointer: getIcon(pointerIcons, pointerIcon),
            text: getIcon(textIcons, textIcon),
            grab: getIcon(grabIcons, grabIcon),
            move: getIcon(moveIcons, moveIcon),
            crosshair: getIcon(crosshairIcons, crosshairIcon),
            'not-allowed': getIcon(notAllowedIcons, notAllowedIcon),
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

            <div>
                <h4 className='text-sm font-medium mb-2 text-gray-500'>Text</h4>
                <div className='flex flex-wrap gap-2'>
                    {textIcons.map(({ id, Icon }) => (
                        <button
                            key={id}
                            onClick={() => setTextIcon(id)}
                            className={`p-2 rounded-lg border transition 
                                ${textIcon === id ? 'border-black bg-gray-100' : 'border-gray-200 hover:bg-gray-50'}`}
                        >
                            <Icon size={20} />
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <h4 className='text-sm font-medium mb-2 text-gray-500'>Grab</h4>
                <div className='flex flex-wrap gap-2'>
                    {grabIcons.map(({ id, Icon }) => (
                        <button
                            key={id}
                            onClick={() => setGrabIcon(id)}
                            className={`p-2 rounded-lg border transition 
                                ${grabIcon === id ? 'border-black bg-gray-100' : 'border-gray-200 hover:bg-gray-50'}`}
                        >
                            <Icon size={20} />
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <h4 className='text-sm font-medium mb-2 text-gray-500'>Move</h4>
                <div className='flex flex-wrap gap-2'>
                    {moveIcons.map(({ id, Icon }) => (
                        <button
                            key={id}
                            onClick={() => setMoveIcon(id)}
                            className={`p-2 rounded-lg border transition 
                                ${moveIcon === id ? 'border-black bg-gray-100' : 'border-gray-200 hover:bg-gray-50'}`}
                        >
                            <Icon size={20} />
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <h4 className='text-sm font-medium mb-2 text-gray-500'>Crosshair</h4>
                <div className='flex flex-wrap gap-2'>
                    {crosshairIcons.map(({ id, Icon }) => (
                        <button
                            key={id}
                            onClick={() => setCrosshairIcon(id)}
                            className={`p-2 rounded-lg border transition 
                                ${crosshairIcon === id ? 'border-black bg-gray-100' : 'border-gray-200 hover:bg-gray-50'}`}
                        >
                            <Icon size={20} />
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <h4 className='text-sm font-medium mb-2 text-gray-500'>Not Allowed</h4>
                <div className='flex flex-wrap gap-2'>
                    {notAllowedIcons.map(({ id, Icon }) => (
                        <button
                            key={id}
                            onClick={() => setNotAllowedIcon(id)}
                            className={`p-2 rounded-lg border transition 
                                ${notAllowedIcon === id ? 'border-black bg-gray-100' : 'border-gray-200 hover:bg-gray-50'}`}
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
                    className='w-full'
                    type='range'
                    min={16}
                    max={48}
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                />
            </div>

            <div className='space-y-4 pt-6'>
                <input
                    className='border border-gray-300 p-4 rounded-xl w-full text-base focus:outline-none focus:ring-2 focus:ring-gray-300'
                    placeholder='Input field'
                />

                <textarea
                    className='border border-gray-300 p-4 rounded-xl w-full text-base focus:outline-none focus:ring-2 focus:ring-gray-300 min-h-[120px]'
                    placeholder='Textarea'
                />

                <div className='grid grid-cols-2 gap-4 pt-2'>
                    <div className='h-28 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl cursor-grab hover:bg-gray-50 transition'>
                        grab area
                    </div>

                    <div className='h-28 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl cursor-move hover:bg-gray-50 transition'>
                        move area
                    </div>

                    <div className='h-28 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl cursor-crosshair hover:bg-gray-50 transition'>
                        crosshair area
                    </div>

                    <div className='h-28 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl cursor-not-allowed hover:bg-gray-50 transition'>
                        not allowed
                    </div>
                </div>
            </div>
        </div>
    );
}
