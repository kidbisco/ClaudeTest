import { type NodeProps } from '@xyflow/react';
import type { AnnotationNodeData } from '../../types/diagram';

export function AnnotationNode({ data, selected }: NodeProps) {
  const { label, body } = data as unknown as AnnotationNodeData;
  return (
    <div
      className={`max-w-[220px] rounded-md border p-3 text-left transition-colors ${
        selected ? 'border-text-muted' : 'border-border-default'
      }`}
      style={{ background: 'rgba(15,24,41,0.85)' }}
    >
      {label && (
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
          {label}
        </p>
      )}
      <p className="text-[10px] leading-relaxed text-text-muted">{body}</p>
    </div>
  );
}
