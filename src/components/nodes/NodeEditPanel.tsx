import { Panel, useReactFlow } from '@xyflow/react';
import { useDiagramStore } from '../../store/diagramStore';
import type { GroupColor, LeafColor, LeafShape } from '../../types/diagram';

const GROUP_COLORS: { color: GroupColor; hex: string }[] = [
  { color: 'blue',   hex: '#3b82f6' },
  { color: 'orange', hex: '#f97316' },
  { color: 'red',    hex: '#ef4444' },
  { color: 'purple', hex: '#7c3aed' },
  { color: 'green',  hex: '#22c55e' },
  { color: 'teal',   hex: '#14b8a6' },
  { color: 'gray',   hex: '#94a3b8' },
];

const LEAF_COLOR_LIST: { color: LeafColor; hex: string }[] = [
  { color: 'default', hex: '#2a4a8a' },
  { color: 'blue',    hex: '#3b82f6' },
  { color: 'teal',    hex: '#14b8a6' },
  { color: 'purple',  hex: '#7c3aed' },
  { color: 'orange',  hex: '#f97316' },
  { color: 'red',     hex: '#ef4444' },
  { color: 'green',   hex: '#22c55e' },
  { color: 'gray',    hex: '#94a3b8' },
];

const SHAPES: { shape: LeafShape; label: string }[] = [
  { shape: 'rectangle', label: 'Rect' },
  { shape: 'square',    label: 'Square' },
  { shape: 'circle',    label: 'Circle' },
  { shape: 'oval',      label: 'Oval' },
  { shape: 'triangle',  label: 'Triangle' },
];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b', marginBottom: 6 }}>
        {label}
      </div>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#1c2538',
  border: '1px solid #2a3550',
  borderRadius: 4,
  padding: '4px 8px',
  fontSize: 11,
  color: '#f1f5f9',
  outline: 'none',
  boxSizing: 'border-box',
};

function ColorDot({ hex, active, onClick, title }: { hex: string; active: boolean; onClick: () => void; title: string }) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        width: 20, height: 20, borderRadius: '50%', background: hex,
        border: 'none', cursor: 'pointer',
        outline: active ? `2px solid ${hex}` : '2px solid transparent',
        outlineOffset: 2,
      }}
    />
  );
}

export function NodeEditPanel() {
  const editingNodeId = useDiagramStore((s) => s.editingNodeId);
  const setEditingNodeId = useDiagramStore((s) => s.setEditingNodeId);
  const setNodeParent = useDiagramStore((s) => s.setNodeParent);
  const nodes = useDiagramStore((s) => s.diagrams[s.activeDiagramId]?.nodes ?? []);
  const { updateNodeData } = useReactFlow();

  if (!editingNodeId) return null;
  const node = nodes.find((n) => n.id === editingNodeId);
  if (!node) return null;

  const data = node.data as Record<string, unknown>;
  const isInGroup = !!node.parentId;

  return (
    <Panel position="top-right" style={{ margin: 0 }}>
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
            {node.type === 'leaf' ? 'Node' : node.type === 'group' ? 'Group' : 'Annotation'}
          </span>
          <button
            onClick={() => setEditingNodeId(null)}
            style={{ color: '#64748b', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14 }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#f1f5f9')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#64748b')}
          >✕</button>
        </div>

        {/* Label */}
        <Field label="Label">
          <input
            autoFocus
            style={inputStyle}
            defaultValue={String(data.label ?? '')}
            onChange={(e) => updateNodeData(editingNodeId, { label: e.target.value })}
            onKeyDown={(e) => e.key === 'Escape' && setEditingNodeId(null)}
          />
        </Field>

        {/* Sublabel — leaf only */}
        {node.type === 'leaf' && (
          <Field label="Sublabel">
            <input
              style={inputStyle}
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
              style={{ ...inputStyle, resize: 'vertical' }}
              rows={4}
              defaultValue={String(data.body ?? '')}
              onChange={(e) => updateNodeData(editingNodeId, { body: e.target.value })}
              onKeyDown={(e) => e.key === 'Escape' && setEditingNodeId(null)}
            />
          </Field>
        )}

        {/* Color — leaf */}
        {node.type === 'leaf' && (
          <Field label="Color">
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {LEAF_COLOR_LIST.map(({ color, hex }) => (
                <ColorDot
                  key={color}
                  hex={hex}
                  active={data.color === color || (!data.color && color === 'default')}
                  onClick={() => updateNodeData(editingNodeId, { color })}
                  title={color}
                />
              ))}
            </div>
          </Field>
        )}

        {/* Color — group */}
        {node.type === 'group' && (
          <Field label="Color">
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {GROUP_COLORS.map(({ color, hex }) => (
                <ColorDot
                  key={color}
                  hex={hex}
                  active={data.color === color}
                  onClick={() => updateNodeData(editingNodeId, { color })}
                  title={color}
                />
              ))}
            </div>
          </Field>
        )}

        {/* Shape — leaf only */}
        {node.type === 'leaf' && (
          <Field label="Shape">
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {SHAPES.map(({ shape, label }) => {
                const active = data.shape === shape || (!data.shape && shape === 'rectangle');
                return (
                  <button
                    key={shape}
                    onClick={() => updateNodeData(editingNodeId, { shape })}
                    title={label}
                    style={{
                      padding: '3px 8px',
                      fontSize: 10,
                      borderRadius: 4,
                      border: `1px solid ${active ? '#3b82f6' : '#2a3550'}`,
                      background: active ? 'rgba(59,130,246,0.2)' : 'transparent',
                      color: active ? '#60a5fa' : '#94a3b8',
                      cursor: 'pointer',
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </Field>
        )}

        {/* Remove from group — shown when node is inside a group */}
        {isInGroup && node.type !== 'group' && (
          <button
            onClick={() => {
              const allNodes = nodes;
              const parent = allNodes.find((n) => n.id === node.parentId);
              const absPos = parent
                ? { x: node.position.x + parent.position.x, y: node.position.y + parent.position.y }
                : node.position;
              setNodeParent(editingNodeId, undefined, absPos);
            }}
            style={{
              width: '100%',
              marginTop: 4,
              padding: '5px 0',
              fontSize: 10,
              borderRadius: 4,
              border: '1px solid #2a3550',
              background: 'transparent',
              color: '#94a3b8',
              cursor: 'pointer',
            }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.color = '#ef4444'; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = '#2a3550'; e.currentTarget.style.color = '#94a3b8'; }}
          >
            Remove from group
          </button>
        )}
      </div>
    </Panel>
  );
}
