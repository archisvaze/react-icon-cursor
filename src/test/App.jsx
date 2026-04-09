import { useState } from 'react';
import { FaArrowPointer, FaBug, FaCloud, FaCrosshairs, FaGhost, FaHandPointer, FaHeart, FaRocket, FaSkull, FaStar } from 'react-icons/fa6';
import useReactIconCursor from '../index.js';

export default function App() {
    const [size, setSize] = useState(28);
    const [color, setColor] = useState('#60a5fa');
    const [iconType, setIconType] = useState('arrow');
    const [hotspot, setHotspot] = useState('topLeft');

    const iconMap = {
        arrow: FaArrowPointer,
        hand: FaHandPointer,
        crosshair: FaCrosshairs,
        ghost: FaGhost,
        rocket: FaRocket,
        heart: FaHeart,
        skull: FaSkull,
        star: FaStar,
        bug: FaBug,
        cloud: FaCloud,
    };

    const selectedIcon = iconMap[iconType];

    const colors = ['#60a5fa', '#f472b6', '#34d399', '#facc15', '#f87171', '#a78bfa', '#fb923c', '#22d3ee', '#e5e7eb', '#111827'];

    const hotspotPositions = ['topLeft', 'top', 'topRight', 'left', 'center', 'right', 'bottomLeft', 'bottom', 'bottomRight'];

    const config = {
        '*': {
            icon: selectedIcon,
            size,
            color,
            hotspot,
            fallback: 'auto',
        },
    };

    useReactIconCursor(config);

    return (
        <div className='min-h-screen bg-[#0f172a] text-white flex flex-col items-center p-6 gap-8'>
            <div className='text-center space-y-2'>
                <h1 className='text-3xl font-bold'>react-icon-cursor</h1>
                <p className='text-gray-400 text-sm'>Play with cursor icons. What feels fun?</p>
            </div>

            <div className='w-full max-w-md bg-[#111827] border border-gray-800 rounded-2xl p-5 space-y-6 shadow-xl'>
                <div>
                    <label className='text-sm text-gray-400'>Size: {size}px</label>
                    <input
                        type='range'
                        min='16'
                        max='64'
                        value={size}
                        onChange={(e) => setSize(Number(e.target.value))}
                        className='w-full'
                    />
                </div>

                {/* Colors */}
                <div>
                    <label className='text-sm text-gray-400'>Color</label>
                    <div className='flex flex-wrap gap-2 mt-2'>
                        {colors.map((c) => (
                            <button
                                key={c}
                                onClick={() => setColor(c)}
                                className={`
                                    w-8 h-8 rounded-lg border-2 transition
                                    ${color === c ? 'border-white scale-110' : 'border-transparent'}
                                `}
                                style={{ backgroundColor: c }}
                            />
                        ))}
                    </div>
                </div>

                {/* Icons */}
                <div>
                    <label className='text-sm text-gray-400'>Icon</label>
                    <div className='grid grid-cols-5 gap-2 mt-2'>
                        {Object.entries(iconMap).map(([key, Icon]) => {
                            const isActive = iconType === key;

                            return (
                                <button
                                    key={key}
                                    onClick={() => setIconType(key)}
                                    className={`
                                        p-3 rounded-xl border transition flex items-center justify-center
                                        ${
                                            isActive
                                                ? 'bg-blue-500 text-white border-blue-500'
                                                : 'bg-[#020617] text-gray-300 border-gray-700 hover:bg-gray-800'
                                        }
                                    `}
                                >
                                    <Icon size={18} />
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div>
                    <label className='text-sm text-gray-400'>Hotspot</label>

                    <div className='relative mt-3 w-40 h-40 mx-auto bg-[#020617] border border-gray-700 rounded-xl flex items-center justify-center'>
                        {(() => {
                            const SelectedIcon = selectedIcon;
                            return (
                                <SelectedIcon
                                    size={160}
                                    style={{ color, opacity: '0.2' }}
                                />
                            );
                        })()}

                        {hotspotPositions.map((pos) => {
                            const isActive = hotspot === pos;

                            const positionMap = {
                                topLeft: 'top-1 left-1',
                                top: 'top-1 left-1/2 -translate-x-1/2',
                                topRight: 'top-1 right-1',
                                left: 'left-1 top-1/2 -translate-y-1/2',
                                center: 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
                                right: 'right-1 top-1/2 -translate-y-1/2',
                                bottomLeft: 'bottom-1 left-1',
                                bottom: 'bottom-1 left-1/2 -translate-x-1/2',
                                bottomRight: 'bottom-1 right-1',
                            };

                            return (
                                <button
                                    key={pos}
                                    onClick={() => setHotspot(pos)}
                                    className={`
                                        absolute w-4 h-4 rounded-full border
                                        ${
                                            isActive
                                                ? 'bg-blue-500 border-white scale-125'
                                                : 'bg-gray-500 border-gray-300 opacity-70 hover:opacity-100'
                                        }
                                        ${positionMap[pos]}
                                    `}
                                />
                            );
                        })}
                    </div>

                    <p className='text-xs text-gray-500 mt-2 text-center'>Click position = actual click point</p>
                </div>
            </div>

            <pre className='bg-black text-green-400 p-4 rounded text-sm overflow-auto w-full max-w-md'>
                {JSON.stringify(config, null, 2)}
            </pre>
        </div>
    );
}
