'use client';

import { useState, useRef, useEffect } from "react";
import InnerCircle from "./inner-circle";
import OuterCircle from "./outer-circle";
import { chartData, outerNodes } from '@/app/components/chart-data';
import { generatePosition } from "../utils/generate-position";

export default function Chart() {
    const [activeInnerNode, setActiveInnerNode] = useState<null | number>(null);
    const [activeOuterNodes, setActiveOuterNodes] = useState<number[]>([]);
    const svgRef = useRef<SVGSVGElement>(null);

    const handleInnerNodeClick = (index: number, node: string) => {
        setActiveInnerNode(index);

        const mainSkillsNodes = chartData.find(item => item.name === node)?.mainSkills;
        const otherSkillsNodes = chartData.find(item => item.name === node)?.otherSkills;

        const indexes = [];

        if (mainSkillsNodes) {
            indexes.push(...mainSkillsNodes.map(skill => outerNodes.findIndex(node => node === skill)));
        }

        if (otherSkillsNodes) {
            indexes.push(...otherSkillsNodes.map(skill => outerNodes.findIndex(node => node === skill)));
        }

        setActiveOuterNodes(indexes);
    }

    const drawConnections = () => {
        if (!svgRef.current || activeInnerNode === null) return;

        // Удалаяем все линии
        while (svgRef.current.firstChild) {
            svgRef.current.removeChild(svgRef.current.firstChild);
        }

        // Вычисляем координаты точки на внутреннем круге
        const innerNodePos = generatePosition(activeInnerNode, chartData.length, 127.5);
        const startX = innerNodePos.x + 172.5;
        const startY = innerNodePos.y + 172.5;

        // Вычислыем данные для выбранной точки
        const selectedNode = chartData[activeInnerNode];
        const mainSkills = selectedNode.mainSkills || [];

        // Рисуем линии до скилов
        activeOuterNodes.forEach(outerIndex => {
            const outerNodePos = generatePosition(outerIndex, outerNodes.length, 300);
            const currentSkill = outerNodes[outerIndex];

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

            // Вычисляем контрольные точки для кривой Безье
            const dx = outerNodePos.x - startX;
            const controlPoint1X = startX + dx * 0.5;
            const controlPoint1Y = startY;
            const controlPoint2X = startX + dx * 0.5;
            const controlPoint2Y = outerNodePos.y;

            // Создаем path с кубической кривой Безье
            const d = `M ${startX} ${startY} C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${controlPoint2Y}, ${outerNodePos.x} ${outerNodePos.y}`;

            path.setAttribute('d', d);
            // Определяем цвет в зависимости от типа скилла
            path.setAttribute('stroke', mainSkills.includes(currentSkill) ? '#FF7A00' : '#8F59B9');
            path.setAttribute('stroke-width', '2');
            path.setAttribute('fill', 'none');
            path.setAttribute('class', 'animated-line');

            // Получаем длину пути для анимации
            const length = path.getTotalLength();
            path.style.strokeDasharray = length.toString();
            path.style.strokeDashoffset = length.toString();

            svgRef.current?.appendChild(path);
        });
    }

    useEffect(() => {
        drawConnections();
    }, [activeInnerNode, activeOuterNodes]);

    return (
        <div className="w-[600px] h-[600px] relative">
            <svg
                ref={svgRef}
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
            />
            <OuterCircle active={activeOuterNodes} />
            <InnerCircle handleClick={handleInnerNodeClick} active={activeInnerNode} />
        </div>
    )
}