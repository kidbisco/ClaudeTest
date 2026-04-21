import { useState, useCallback } from 'react';
import { type NodeProps, useReactFlow } from '@xyflow/react';
import type { AnnotationNodeData } from '../../types/diagram';

export function AnnotationNode({ id, data, selected }: NodeProps) {
  const { label, body } = data as unknown as AnnotationNodeData;
  const { updateNodeData } = useReactFlow();
  const [editing, setEditing] = useState<'label' | 'body' | null>(null);

  const commitEdit = useCallback((field: 'label' | 'body', value: string) => {
    updateNodeData(id, { [field]: value });
    setEditing(null);
  }, [id, updateNodeData]);

  return (
    <div
      className={`max-w-[220px] rounded-md border p-3 text-left transition-colors ${
        selected ? 'border-text-muted' : 'border-border-default'
      }`}
      style={{ background: 'rgba(15,24,41,0.85)' }}
    >
      {editing === 'label' ? (
        <input
          autoFocus
          defaultValue={label}
          onBlur={(e) => commitEdit('label', e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') commitEdit('label', e.currentTarget.value);
            if (e.key === 'Escape') setEditing(null);
            e.stopPropagation();
          }}
          onClick={(e) => e.stopPropagation()}
          className="mb-1 w-full rounded bg-bg-elevated px-1 text-[10px] font-semibold uppercase tracking-wider text-text-secondary outline outline-1 outline-accent-blue"
        />
      ) : (
        label && (
          <p
            className="mb-1 cursor-text text-[10px] font-semibold uppercase tracking-wider text-text-secondary"
            onDoubleClick={(e) => { e.stopPropagation(); setEditing('label'); }}
          >
            {label}
          </p>
        )
      )}

      {editing === 'body' ? (
        <textarea
          autoFocus
          defaultValue={body}
          rows={4}
          onBlur={(e) => commitEdit('body', e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setEditing(null);
            e.stopPropagation();
          }}
          onClick={(e) => e.stopPropagation()}
          className="w-full rounded bg-bg-elevated px-1 text-[10px] leading-relaxed text-text-muted outline outline-1 outline-accent-blue"
        />
      ) : (
        <p
          className="cursor-text text-[10px] leading-relaxed text-text-muted"
          onDoubleClick={(e) => { e.stopPropagation(); setEditing('body'); }}
        >
          {body}
        </p>
      )}
    </div>
  );
}
