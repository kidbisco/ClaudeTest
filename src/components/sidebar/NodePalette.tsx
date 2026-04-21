import type { GroupColor } from '../../types/diagram';

const GROUP_COLORS: { color: GroupColor; label: string; hex: string }[] = [
  { color: 'blue',   label: 'Blue',   hex: '#3b82f6' },
  { color: 'orange', label: 'Orange', hex: '#f97316' },
  { color: 'red',    label: 'Red',    hex: '#ef4444' },
  { color: 'purple', label: 'Purple', hex: '#7c3aed' },
  { color: 'green',  label: 'Green',  hex: '#22c55e' },
  { color: 'teal',   label: 'Teal',   hex: '#14b8a6' },
  { color: 'gray',   label: 'Gray',   hex: '#94a3b8' },
];

interface PaletteItemProps {
  type: string;
  color?: string;
  label: string;
  sublabel?: string;
  dragData: object;
}

function PaletteItem({ label, sublabel, color, dragData }: PaletteItemProps) {
  function onDragStart(e: React.DragEvent) {
    e.dataTransfer.setData('application/reactflow', JSON.stringify(dragData));
    e.dataTransfer.effectAllowed = 'move';
  }

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="mb-2 cursor-grab rounded-md border border-border-default bg-bg-elevated px-3 py-2 transition-colors hover:border-accent-blue active:cursor-grabbing"
      style={color ? { borderLeftColor: color, borderLeftWidth: 3 } : undefined}
    >
      <p className="text-[11px] font-medium text-text-primary">{label}</p>
      {sublabel && <p className="text-[9px] text-text-muted">{sublabel}</p>}
    </div>
  );
}

export function NodePalette() {
  return (
    <div>
      <p className="mb-2 text-[9px] font-semibold uppercase tracking-widest text-text-muted">
        Nodes
      </p>
      <PaletteItem
        type="leaf"
        label="Leaf Node"
        sublabel="Service, DB, component"
        dragData={{ type: 'leaf', data: { label: 'New Node', sublabel: '' } }}
      />
      <PaletteItem
        type="annotation"
        label="Annotation"
        sublabel="Notes and callouts"
        dragData={{ type: 'annotation', data: { label: 'Note', body: 'Add description...' } }}
      />

      <p className="mb-2 mt-4 text-[9px] font-semibold uppercase tracking-widest text-text-muted">
        Groups
      </p>
      {GROUP_COLORS.map(({ color, label, hex }) => (
        <PaletteItem
          key={color}
          type="group"
          label={`${label} Group`}
          color={hex}
          dragData={{ type: 'group', data: { label: 'Group', color } }}
        />
      ))}
    </div>
  );
}
