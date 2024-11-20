import { generatePosition, generateTextPosition } from "../utils/generate-position";

interface NodeProps {
    node: string;
    nodesAmount: number;
    index: number;
    active: boolean;
}

export default function Node({ node, nodesAmount, index, active }: NodeProps) {

    const { x, y } = generatePosition(index, nodesAmount, 300);
    const { x: textX, y: textY } = generateTextPosition(index, nodesAmount);

    return (
        <div className="absolute" style={{ top: `${y.toFixed(2)}px`, left: `${x.toFixed(2)}px` }}>
            <span className="absolute text-[10px] font-bold text-[#ADADAD]" style={{ top: `${textY.toFixed(2)}px`, left: `${textX.toFixed(2)}px` }}>
                {node}
            </span>
            <div className={`w-[23px] h-[23px] z-10 ${active ? 'bg-[#FF7A00]' : 'bg-[#FFD4AD]'} transition-all duration-200 rounded-full absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 `}></div>
        </div>
    )
}