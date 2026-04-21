import { useState } from 'react';
import { useDiagramStore } from '../../store/diagramStore';
import type { Node } from '@xyflow/react';

const DIAGRAM_TITLES = ['Data Flow v1', 'Infrastructure Map', 'Fund Structure'];

export function TopBar() {
  const [title, setTitle] = useState('Data Flow v1');
  const [editing, setEditing] = useState(false);
  const addNode = useDiagramStore((s) => s.addNode);

  function handleAddLeaf() {
    const id = `leaf-${Date.now()}`;
    const node: Node = {
      id,
      type: 'leaf',
      position: { x: 300 + Math.random() * 200, y: 200 + Math.random() * 200 },
      data: { label: 'New Node', sublabel: '' },
    };
    addNode(node);
  }

  return (
    <header className="flex h-11 shrink-0 items-center gap-3 border-b border-border-default bg-bg-surface px-4">
      {/* Logo + title */}
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

      {/* Diagram title */}
      {editing ? (
        <input
          autoFocus
          className="rounded border border-accent-blue bg-bg-elevated px-2 py-0.5 text-xs text-text-primary outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => setEditing(false)}
          onKeyDown={(e) => e.key === 'Enter' && setEditing(false)}
        />
      ) : (
        <button
          className="text-xs font-medium text-text-primary hover:text-accent-blue"
          onClick={() => setEditing(true)}
        >
          {title}
        </button>
      )}

      {/* Saved diagrams picker */}
      <select
        className="rounded border border-border-default bg-bg-elevated px-2 py-0.5 text-xs text-text-secondary outline-none hover:border-accent-blue"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      >
        {DIAGRAM_TITLES.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <div className="flex-1" />

      {/* Actions */}
      <button
        onClick={handleAddLeaf}
        className="flex items-center gap-1.5 rounded-full border border-border-default bg-bg-elevated px-3 py-1 text-xs text-text-secondary transition-colors hover:border-accent-blue hover:text-text-primary"
      >
        <span className="text-base leading-none">+</span> Add Node
      </button>
      <button className="flex items-center gap-1.5 rounded-full border border-border-default bg-bg-elevated px-3 py-1 text-xs text-text-secondary transition-colors hover:border-accent-blue hover:text-text-primary">
        Export
      </button>

      {/* User avatar */}
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-teal text-[11px] font-bold text-white">
        SB
      </div>
    </header>
  );
}
