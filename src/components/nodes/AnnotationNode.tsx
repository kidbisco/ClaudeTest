import { type NodeProps, NodeResizer } from '@xyflow/react';
import type { AnnotationNodeData } from '../../types/diagram';

export function AnnotationNode({ data, selected }: NodeProps) {
  const { label, body } = data as unknown as AnnotationNodeData;

  return (
    <div
      style={{ width: '100%', height: '100%', minWidth: 150, minHeight: 60, background: 'rgba(15,24,41,0.85)' }}
      className={`rounded-md border p-3 text-left transition-colors ${
        selected ? 'border-text-muted' : 'border-border-default'
      }`}
    >
      <NodeResizer
        minWidth={150}
        minHeight={60}
        isVisible={selected}
        color="#94a3b8"
        lineStyle={{ borderColor: '#94a3b8', borderStyle: 'dashed', borderWidth: 1 }}
        handleStyle={{ background: '#94a3b8', width: 8, height: 8, borderRadius: '50%', border: '2px solid #080e1e' }}
      />
      {label && (
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
          {label}
        </p>
      )}
      <p className="text-[10px] leading-relaxed text-text-muted">{body}</p>
    </div>
  );
}
