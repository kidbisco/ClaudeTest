import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  type EdgeProps,
} from '@xyflow/react';

export function DefaultEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  label,
  selected,
  markerEnd,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const stroke = selected ? '#60a5fa' : '#3b82f6';
  const strokeWidth = selected ? 2 : 1.5;

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        interactionWidth={16}
        style={{ stroke, strokeWidth, transition: 'stroke 0.15s, stroke-width 0.15s' }}
      />
      {label && (
        <EdgeLabelRenderer>
          <div
            className="absolute rounded px-1.5 py-0.5 text-[9px] font-medium text-text-secondary"
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              background: '#0f1829',
              border: '1px solid #2a3550',
              pointerEvents: 'all',
            }}
          >
            {label as string}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
