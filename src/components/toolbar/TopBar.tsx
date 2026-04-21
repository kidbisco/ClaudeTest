import { useState } from 'react';
import { useDiagramStore } from '../../store/diagramStore';
import type { Node } from '@xyflow/react';

export function TopBar() {
  const diagrams = useDiagramStore((s) => s.diagrams);
  const activeDiagramId = useDiagramStore((s) => s.activeDiagramId);
  const { createDiagram, switchDiagram, renameDiagram, deleteDiagram, addNode } =
    useDiagramStore();

  const [renaming, setRenaming] = useState(false);
  const activeDiagram = diagrams[activeDiagramId];
  const diagramList = Object.values(diagrams);

  function handleDropdown(e: React.ChangeEvent<HTMLSelectElement>) {
    switchDiagram(e.target.value);
  }

  function handleAddLeaf() {
    const id = `leaf-${Date.now()}`;
    const node: Node = {
      id,
      type: 'leaf',
      position: { x: 200 + Math.random() * 300, y: 150 + Math.random() * 200 },
      data: { label: 'New Node', sublabel: '' },
    };
    addNode(node);
  }

  function handleRenameCommit(value: string) {
    const trimmed = value.trim();
    if (trimmed) renameDiagram(activeDiagramId, trimmed);
    setRenaming(false);
  }

  function handleDeleteDiagram() {
    if (diagramList.length <= 1) return;
    if (confirm(`Delete "${activeDiagram?.name}"? This cannot be undone.`)) {
      deleteDiagram(activeDiagramId);
    }
  }

  return (
    <header className="flex h-11 shrink-0 items-center gap-3 border-b border-border-default bg-bg-surface px-4">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="grid h-6 w-6 grid-cols-2 gap-0.5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-[2px] bg-accent-teal" />
          ))}
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-text-primary">
          Flowcraft
        </span>
      </div>

      <div className="h-5 w-px bg-border-default" />

      {/* Diagram name — click to rename */}
      {renaming ? (
        <input
          autoFocus
          defaultValue={activeDiagram?.name ?? ''}
          className="rounded border border-accent-blue bg-bg-elevated px-2 py-0.5 text-xs text-text-primary outline-none"
          onBlur={(e) => handleRenameCommit(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleRenameCommit(e.currentTarget.value);
            if (e.key === 'Escape') setRenaming(false);
          }}
        />
      ) : (
        <button
          className="text-xs font-medium text-text-primary hover:text-accent-blue"
          onClick={() => setRenaming(true)}
          title="Click to rename"
        >
          {activeDiagram?.name ?? '—'}
        </button>
      )}

      {/* Diagram switcher */}
      <select
        className="rounded border border-border-default bg-bg-elevated px-2 py-0.5 text-xs text-text-secondary outline-none hover:border-accent-blue"
        value={activeDiagramId}
        onChange={handleDropdown}
      >
        {diagramList.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>

      {/* New diagram */}
      <button
        onClick={() => createDiagram('New Diagram')}
        className="flex items-center gap-1 rounded border border-border-default bg-bg-elevated px-2 py-0.5 text-xs text-text-secondary transition-colors hover:border-accent-blue hover:text-text-primary"
        title="New diagram"
      >
        + New
      </button>

      {/* Delete diagram (hidden when only one exists) */}
      {diagramList.length > 1 && (
        <button
          onClick={handleDeleteDiagram}
          className="rounded border border-border-default bg-bg-elevated px-2 py-0.5 text-xs text-text-muted transition-colors hover:border-accent-red hover:text-accent-red"
          title="Delete this diagram"
        >
          Delete
        </button>
      )}

      <div className="flex-1" />

      {/* Actions */}
      <button
        onClick={handleAddLeaf}
        className="flex items-center gap-1.5 rounded-full border border-border-default bg-bg-elevated px-3 py-1 text-xs text-text-secondary transition-colors hover:border-accent-blue hover:text-text-primary"
      >
        <span className="text-base leading-none">+</span> Add Node
      </button>

      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-teal text-[11px] font-bold text-white">
        SB
      </div>
    </header>
  );
}
