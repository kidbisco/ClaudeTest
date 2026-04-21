const SHORTCUTS = [
  { key: 'Drag',       desc: 'Move nodes' },
  { key: 'Ctrl+Drag',  desc: 'Pan canvas' },
  { key: 'Scroll',     desc: 'Zoom in/out' },
  { key: 'Del',        desc: 'Delete selected' },
  { key: 'Ctrl+Z',     desc: 'Undo' },
  { key: 'Ctrl+A',     desc: 'Select all' },
  { key: 'F',          desc: 'Fit to view' },
  { key: 'Dbl-click',  desc: 'Edit label' },
];

export function ControlsPanel() {
  return (
    <div>
      <p className="mb-3 text-[9px] font-semibold uppercase tracking-widest text-text-muted">
        Controls
      </p>
      <ul className="space-y-2">
        {SHORTCUTS.map(({ key, desc }) => (
          <li key={key} className="flex items-center justify-between">
            <span className="text-[10px] text-text-muted">{desc}</span>
            <kbd className="rounded bg-bg-elevated px-1.5 py-0.5 text-[9px] font-mono text-text-secondary border border-border-default">
              {key}
            </kbd>
          </li>
        ))}
      </ul>
    </div>
  );
}
