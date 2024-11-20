import { outerNodes } from '@/app/components/chart-data';
import OuterNode from './outer-node';
import OuterCirclePath from '@/public/outer_circle_path.svg';

interface OuterCircleProps {
    active: number[];
}

export default function OuterCircle({ active }: OuterCircleProps) {

    return (
        <div className='w-full h-full absolute top-0 left-0 '>
            <OuterCirclePath className='w-full h-full' />
            {outerNodes.map((node, index) => {
                return <OuterNode active={active.includes(index)} key={index} node={node} nodesAmount={outerNodes.length} index={index} />
            })}
        </div>
    )
}