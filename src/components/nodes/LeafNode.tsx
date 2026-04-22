import { Handle, Position, type NodeProps, NodeResizer } from '@xyflow/react';
import type { LeafColor, LeafNodeData, LeafShape } from '../../types/diagram';

export const LEAF_COLORS: Record<LeafColor, { border: string; bg: string }> = {
  default: { border: '#2a4a8a', bg: '#1b3566' },
  blue:    { border: '#3b82f6', bg: '#1e3a6e' },
  teal:    { border: '#14b8a6', bg: '#0d3d38' },
  purple:  { border: '#7c3aed', bg: '#2e1065' },
  orange:  { border: '#f97316', bg: '#431407' },
  red:     { border: '#ef4444', bg: '#450a0a' },
  green:   { border: '#22c55e', bg: '#052e16' },
  gray:    { border: '#94a3b8', bg: '#1c2538' },
};

function containerStyle(
  shape: LeafShape,
  bg: string,
  borderColor: string,
  selected: boolean
): React.CSSProperties {
  const base: React.CSSProperties = {
    width: '100%',
    height: '100%',
    minWidth: 80,
    minHeight: 48,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: selected ? '0 0 0 2px rgba(59,130,246,0.35)' : undefined,
  };
  switch (shape) {
    case 'triangle':
      return { ...base, background: 'transparent', border: 'none', boxShadow: 'none', minWidth: 100, minHeight: 80 };
    case 'circle':
      return { ...base, background: bg, border: `1.5px solid ${borderColor}`, borderRadius: '50%', aspectRatio: '1 / 1' };
    case 'square':
      return { ...base, background: bg, border: `1.5px solid ${borderColor}`, borderRadius: 6, aspectRatio: '1 / 1' };
    case 'oval':
      return { ...base, background: bg, border: `1.5px solid ${borderColor}`, borderRadius: '50%' };
    default: // rectangle
      return { ...base, background: bg, border: `1.5px solid ${borderColor}`, borderRadius: 6 };
  }
}

export function LeafNode({ data, selected }: NodeProps) {
  const {
    label,
    sublabel,
    color = 'default',
    shape = 'rectangle',
  } = data as unknown as LeafNodeData;

  const { border, bg } = LEAF_COLORS[color] ?? LEAF_COLORS.default;
  const borderColor = selected ? '#60a5fa' : border;
  const isTriangle = shape === 'triangle';
  const isRound = shape === 'circle' || shape === 'oval';

  return (
    <div style={containerStyle(shape, bg, borderColor, selected)}>
      <NodeResizer
        minWidth={80}
        minHeight={48}
        isVisible={selected}
        color={border}
        lineStyle={{ borderColor: border, borderStyle: 'dashed', borderWidth: 1 }}
        handleStyle={{ background: border, width: 8, height: 8, borderRadius: '50%', border: '2px solid #080e1e' }}
      />

      <Handle type="target" position={Position.Left} />
      <Handle type="target" position={Position.Top} />

      {/* SVG triangle rendered behind text */}
      {isTriangle && (
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <polygon
            points="50,2 2,98 98,98"
            fill={bg}
            stroke={borderColor}
            strokeWidth={selected ? 2.5 : 1.5}
          />
        </svg>
      )}

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          padding: isRound ? '6px 14px' : '4px 10px',
          marginTop: isTriangle ? '48%' : undefined,
        }}
      >
        <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: '#f1f5f9', lineHeight: 1.3 }}>
          {label}
        </p>
        {sublabel && !isTriangle && (
          <p style={{ margin: '2px 0 0', fontSize: 9, color: '#64748b', lineHeight: 1.3 }}>
            {sublabel}
          </p>
        )}
      </div>

      <Handle type="source" position={Position.Right} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
