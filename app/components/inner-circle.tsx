import InnerCirclePath from '@/public/inner-circle-path.svg';
import { innerNodes } from './chart-data';
import InnerNode from './inner-node';

interface InnerCircleProps {
    handleClick: (index: number, node: string) => void;
    active: number | null;
}

export default function InnerCircle({ handleClick, active }: InnerCircleProps) {
    return (
        <div className='w-[255px] h-[255px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
            <InnerCirclePath className='w-full h-full' />
            {innerNodes.map((node, index) => {
                return <InnerNode handleClick={handleClick} key={index} index={index} nodesAmount={innerNodes.length} radius={127.5} node={node} active={active === index} />
            })}
        </div>
    )
}