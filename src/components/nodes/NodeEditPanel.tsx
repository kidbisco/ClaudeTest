import { Panel, useReactFlow } from '@xyflow/react';
import { useDiagramStore } from '../../store/diagramStore';
import type { GroupColor } from '../../types/diagram';

const GROUP_COLORS: { color: GroupColor; hex: string }[] = [
  { color: 'blue',   hex: '#3b82f6' },
  { color: 'orange', hex: '#f97316' },
  { color: 'red',    hex: '#ef4444' },
  { color: 'purple', hex: '#7c3aed' },
  { color: 'green',  hex: '#22c55e' },
  { color: 'teal',   hex: '#14b8a6' },
  { color: 'gray',   hex: '#94a3b8' },
];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-3">
      <label className="mb-1 block text-[9px] font-semibold uppercase tracking-wider text-text-muted">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  'w-full rounded border border-border-default bg-bg-elevated px-2 py-1 text-[11px] text-text-primary outline-none focus:border-accent-blue';

export function NodeEditPanel() {
  const { editingNodeId, setEditingNodeId, nodes } = useDiagramStore();
  const { updateNodeData } = useReactFlow();

  if (!editingNodeId) return null;

  const node = nodes.find((n) => n.id === editingNodeId);
  if (!node) return null;

  const data = node.data as Record<string, unknown>;

  return (
    <Panel position="top-right" style={{ margin: 0 }}>
      {/* key forces remount (and defaultValue reset) when switching nodes */}
      <div
        key={editingNodeId}
        style={{
          width: 240,
          background: '#0f1829',
          border: '1px solid #2a3550',
          borderRadius: 8,
          padding: 16,
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <span style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8' }}>
            Edit Node
          </span>
          <button
            onClick={() => setEditingNodeId(null)}
            style={{ color: '#64748b', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, lineHeight: 1 }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#f1f5f9')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#64748b')}
          >
            ✕
          </button>
        </div>

        {/* Label — all types */}
        <Field label="Label">
          <input
            autoFocus
            className={inputCls}
            defaultValue={String(data.label ?? '')}
            onChange={(e) => updateNodeData(editingNodeId, { label: e.target.value })}
            onKeyDown={(e) => e.key === 'Escape' && setEditingNodeId(null)}
          />
        </Field>

        {/* Sublabel — leaf only */}
        {node.type === 'leaf' && (
          <Field label="Sublabel">
            <input
              className={inputCls}
              defaultValue={String(data.sublabel ?? '')}
              onChange={(e) => updateNodeData(editingNodeId, { sublabel: e.target.value })}
              onKeyDown={(e) => e.key === 'Escape' && setEditingNodeId(null)}
            />
          </Field>
        )}

        {/* Body — annotation only */}
        {node.type === 'annotation' && (
          <Field label="Body">
            <textarea
              className={inputCls}
              rows={4}
              defaultValue={String(data.body ?? '')}
              onChange={(e) => updateNodeData(editingNodeId, { body: e.target.value })}
              onKeyDown={(e) => e.key === 'Escape' && setEditingNodeId(null)}
            />
          </Field>
        )}

        {/* Color — group only */}
        {node.type === 'group' && (
          <Field label="Color">
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {GROUP_COLORS.map(({ color, hex }) => (
                <button
                  key={color}
                  onClick={() => updateNodeData(editingNodeId, { color })}
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: hex,
                    border: 'none',
                    cursor: 'pointer',
                    outline: data.color === color ? `2px solid ${hex}` : '2px solid transparent',
                    outlineOffset: 2,
                  }}
                  title={color}
                />
              ))}
            </div>
          </Field>
        )}
      </div>
    </Panel>
  );
}
