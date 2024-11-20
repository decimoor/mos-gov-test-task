export const generatePosition = (
  index: number,
  nodesAmount: number,
  radius: number
) => {
  if (index === 0) {
    return {
      x: radius * 2,
      y: radius,
    };
  }

  const stepLength = (Math.PI * 2) / nodesAmount;

  const angle = stepLength * index;

  const x = radius * Math.cos(angle) + radius;
  const y = (radius * Math.sin(angle) - radius) * -1;

  return { x, y };
};

export const generateTextPosition = (index: number, nodesAmount: number) => {
  const stepLength = (Math.PI * 2) / nodesAmount;
  const angle = stepLength * index;

  const radius = 70;

  const x = Math.cos(angle) * radius - radius / 2;
  const y = Math.sin(angle) * radius * -1;

  return { x, y };
};
