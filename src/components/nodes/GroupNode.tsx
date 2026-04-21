import { useState, useCallback } from 'react';
import { type NodeProps, NodeResizer, useReactFlow } from '@xyflow/react';
import type { GroupColor, GroupNodeData } from '../../types/diagram';

const colorMap: Record<GroupColor, { border: string; bg: string; label: string }> = {
  orange: { border: '#f97316', bg: 'rgba(249,115,22,0.06)', label: '#fb923c' },
  blue:   { border: '#3b82f6', bg: 'rgba(59,130,246,0.06)',  label: '#60a5fa' },
  red:    { border: '#ef4444', bg: 'rgba(239,68,68,0.06)',   label: '#f87171' },
  purple: { border: '#7c3aed', bg: 'rgba(124,58,237,0.06)',  label: '#a78bfa' },
  green:  { border: '#22c55e', bg: 'rgba(34,197,94,0.06)',   label: '#4ade80' },
  gray:   { border: '#94a3b8', bg: 'rgba(148,163,184,0.04)', label: '#94a3b8' },
  teal:   { border: '#14b8a6', bg: 'rgba(20,184,166,0.06)',  label: '#2dd4bf' },
};

export function GroupNode({ id, data, selected }: NodeProps) {
  const { label, color } = data as unknown as GroupNodeData;
  const { updateNodeData } = useReactFlow();
  const { border, bg, label: labelColor } = colorMap[color] ?? colorMap.gray;
  const [editing, setEditing] = useState(false);

  const startEdit = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setEditing(true);
  }, []);

  const commitEdit = useCallback((value: string) => {
    updateNodeData(id, { label: value });
    setEditing(false);
  }, [id, updateNodeData]);

  return (
    <div
      className="relative h-full w-full rounded-md"
      style={{
        border: `1.5px solid ${selected ? '#60a5fa' : border}`,
        background: bg,
      }}
    >
      <NodeResizer
        minWidth={120}
        minHeight={80}
        color={border}
        isVisible={selected}
        lineStyle={{ border: `1px dashed ${border}` }}
        handleStyle={{ background: border, width: 8, height: 8, borderRadius: '50%' }}
      />

      {editing ? (
        <input
          autoFocus
          defaultValue={label}
          onBlur={(e) => commitEdit(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') commitEdit(e.currentTarget.value);
            if (e.key === 'Escape') setEditing(false);
            e.stopPropagation();
          }}
          onClick={(e) => e.stopPropagation()}
          className="absolute -top-[13px] left-3 rounded px-1.5 py-px text-[10px] font-semibold uppercase tracking-wider outline outline-1"
          style={{
            color: labelColor,
            background: '#080e1e',
            border: `1px solid ${border}`,
            outlineColor: border,
          }}
        />
      ) : (
        <span
          className="absolute -top-[11px] left-3 cursor-text rounded px-1.5 py-px text-[10px] font-semibold uppercase tracking-wider"
          style={{
            color: labelColor,
            background: '#080e1e',
            border: `1px solid ${border}`,
          }}
          onDoubleClick={startEdit}
        >
          {label}
        </span>
      )}
    </div>
  );
}
