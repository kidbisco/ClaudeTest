import { Handle, Position, type NodeProps, NodeResizer } from '@xyflow/react';
import type { LeafNodeData } from '../../types/diagram';

export function LeafNode({ data, selected }: NodeProps) {
  const { label, sublabel } = data as unknown as LeafNodeData;

  return (
    <div
      style={{ width: '100%', height: '100%', minWidth: 120, minHeight: 48 }}
      className={`rounded-md border px-3 py-2 text-center transition-colors ${
        selected
          ? 'border-accent-blue bg-bg-node shadow-[0_0_0_2px_rgba(59,130,246,0.3)]'
          : 'border-border-node bg-bg-node hover:border-accent-blue'
      }`}
    >
      <NodeResizer
        minWidth={120}
        minHeight={48}
        isVisible={selected}
        color="#3b82f6"
        lineStyle={{ borderColor: '#3b82f6', borderStyle: 'dashed', borderWidth: 1 }}
        handleStyle={{ background: '#3b82f6', width: 8, height: 8, borderRadius: '50%', border: '2px solid #080e1e' }}
      />
      <Handle type="target" position={Position.Left} />
      <Handle type="target" position={Position.Top} />
      <p className="text-[11px] font-semibold leading-snug text-text-primary">{label}</p>
      {sublabel && (
        <p className="mt-0.5 text-[9px] leading-snug text-text-muted">{sublabel}</p>
      )}
      <Handle type="source" position={Position.Right} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
