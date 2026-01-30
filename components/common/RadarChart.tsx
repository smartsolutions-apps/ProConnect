
import React from 'react';

interface RadarChartProps {
  data: Record<string, number>;
  overlayData?: Record<string, number>;
  axes: string[];
  maxVal?: number;
  size?: number;
  showLabels?: boolean;
}

export const RadarChart: React.FC<RadarChartProps> = ({
  data,
  overlayData,
  axes,
  maxVal = 10,
  size = 300,
  showLabels = true
}) => {
  const center = size / 2;
  const radius = (size / 2) - 40; // Padding for labels
  const angleSlice = (Math.PI * 2) / axes.length;

  // Helper to calculate coordinates
  const getCoordinates = (value: number, index: number) => {
    const angle = index * angleSlice - (Math.PI / 2); // Start at 12 o'clock
    const r = (value / maxVal) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  // Generate polygon points string
  const getPolygonPoints = (dataset: Record<string, number>) => {
    return axes.map((axis, i) => {
      const { x, y } = getCoordinates(dataset[axis.toLowerCase()] || 0, i);
      return `${x},${y}`;
    }).join(' ');
  };

  return (
    <div className="relative flex justify-center items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Grid Circles */}
        {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => (
          <circle
            key={i}
            cx={center}
            cy={center}
            r={radius * scale}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="1"
          />
        ))}

        {/* Axes Lines */}
        {axes.map((axis, i) => {
          const { x, y } = getCoordinates(maxVal, i);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="#E5E7EB"
              strokeWidth="1"
            />
          );
        })}

        {/* User Data Polygon */}
        <polygon
          points={getPolygonPoints(data)}
          fill="rgba(14, 165, 233, 0.2)"
          stroke="#0EA5E9"
          strokeWidth="2"
          className="transition-all duration-500 ease-out"
        />

        {/* Overlay Data Polygon (Ideal Candidate) */}
        {overlayData && (
          <polygon
            points={getPolygonPoints(overlayData)}
            fill="rgba(16, 185, 129, 0.2)"
            stroke="#10B981"
            strokeWidth="2"
            strokeDasharray="4 4"
            className="transition-all duration-500 ease-out animate-in fade-in"
          />
        )}

        {/* Labels */}
        {showLabels && axes.map((axis, i) => {
          const angle = i * angleSlice - (Math.PI / 2);
          const labelRadius = radius + 25;
          const x = center + labelRadius * Math.cos(angle);
          const y = center + labelRadius * Math.sin(angle);
          
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[10px] sm:text-xs font-bold fill-gray-600 uppercase tracking-wider"
            >
              {axis}
            </text>
          );
        })}

        {/* Data Points (Dots) for User */}
        {axes.map((axis, i) => {
          const { x, y } = getCoordinates(data[axis.toLowerCase()] || 0, i);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="3"
              fill="#0EA5E9"
              className="transition-all duration-500 ease-out"
            />
          );
        })}
      </svg>
    </div>
  );
};
