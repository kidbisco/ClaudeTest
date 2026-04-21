import { useState, useRef, useCallback } from 'react';
import { Handle, Position, type NodeProps, useReactFlow } from '@xyflow/react';
import type { LeafNodeData } from '../../types/diagram';

export function LeafNode({ id, data, selected }: NodeProps) {
  const { label, sublabel } = data as unknown as LeafNodeData;
  const { updateNodeData } = useReactFlow();
  const [editing, setEditing] = useState<'label' | 'sublabel' | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const startEdit = useCallback((field: 'label' | 'sublabel', e: React.MouseEvent) => {
    e.stopPropagation();
    setEditing(field);
    setTimeout(() => inputRef.current?.select(), 0);
  }, []);

  const commitEdit = useCallback((field: 'label' | 'sublabel', value: string) => {
    updateNodeData(id, { [field]: value });
    setEditing(null);
  }, [id, updateNodeData]);

  return (
    <div
      className={`min-w-[130px] max-w-[190px] rounded-md border px-3 py-2 text-center transition-colors ${
        selected
          ? 'border-accent-blue bg-bg-node shadow-[0_0_0_2px_rgba(59,130,246,0.4)]'
          : 'border-border-node bg-bg-node hover:border-accent-blue'
      }`}
    >
      <Handle type="target" position={Position.Left} />
      <Handle type="target" position={Position.Top} />

      {editing === 'label' ? (
        <input
          ref={inputRef}
          autoFocus
          defaultValue={label}
          onBlur={(e) => commitEdit('label', e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') commitEdit('label', e.currentTarget.value);
            if (e.key === 'Escape') setEditing(null);
            e.stopPropagation();
          }}
          onClick={(e) => e.stopPropagation()}
          className="w-full rounded bg-bg-elevated px-1 text-center text-[11px] font-semibold text-text-primary outline outline-1 outline-accent-blue"
        />
      ) : (
        <p
          className="cursor-text text-[11px] font-semibold leading-snug text-text-primary"
          onDoubleClick={(e) => startEdit('label', e)}
        >
          {label}
        </p>
      )}

      {editing === 'sublabel' ? (
        <input
          autoFocus
          defaultValue={sublabel ?? ''}
          onBlur={(e) => commitEdit('sublabel', e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') commitEdit('sublabel', e.currentTarget.value);
            if (e.key === 'Escape') setEditing(null);
            e.stopPropagation();
          }}
          onClick={(e) => e.stopPropagation()}
          className="mt-0.5 w-full rounded bg-bg-elevated px-1 text-center text-[9px] text-text-muted outline outline-1 outline-accent-blue"
        />
      ) : (
        <p
          className="mt-0.5 cursor-text text-[9px] leading-snug text-text-muted"
          onDoubleClick={(e) => startEdit('sublabel', e)}
        >
          {sublabel || <span className="opacity-30">sublabel</span>}
        </p>
      )}

      <Handle type="source" position={Position.Right} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
