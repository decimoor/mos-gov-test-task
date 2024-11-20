'use client';

import { generatePosition, generateTextPosition } from "../utils/generate-position";
import { AnimatePresence, motion } from "framer-motion";

interface InnerNodeProps {
    index: number;
    nodesAmount: number;
    radius: number;
    node: string;
    active: boolean;
    handleClick: (index: number, node: string) => void;
}


export default function InnerNode({ index, nodesAmount, radius, node, active, handleClick }: InnerNodeProps) {

    const { x, y } = generatePosition(index, nodesAmount, radius);
    const { x: textX, y: textY } = generateTextPosition(index, nodesAmount);

    return (
        <button onClick={() => handleClick(index, node)} className={`absolute -translate-x-1/2 -translate-y-1/2`} style={{ top: `${y.toFixed(2)}px`, left: `${x.toFixed(2)}px` }}>
            <span className="absolute text-[10px] font-bold text-[#3A3A3A]" style={{ top: `${textY.toFixed(2)}px`, left: `${textX.toFixed(2)}px` }}>
                {node}
            </span>
            <div className={`w-[23px] h-[23px] z-10 hover:bg-[#00A372] transition-all duration-200 rounded-full absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 ${active ? 'bg-[#00A372]' : 'bg-[#ADADAD]'}`}></div>
            <AnimatePresence>
                {active ? (
                    <motion.div
                        initial={{ width: 0, height: 0 }}
                        animate={{ width: 43, height: 43 }}
                        exit={{ width: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute w-[calc(100%+20px)] h-[calc(100%+20px)] rounded-full bg-white left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 border border-[#00A372]">

                    </motion.div>
                ) : null}
            </AnimatePresence>
        </button>
    )
}