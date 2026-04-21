import { useState } from 'react';
import { NodePalette } from './NodePalette';
import { ControlsPanel } from './ControlsPanel';

type Tab = 'palette' | 'controls';

const NAV_ITEMS = [
  { id: 'palette' as Tab, label: 'Nodes', icon: '⬡' },
  { id: 'controls' as Tab, label: 'Controls', icon: '⌨' },
];

export function Sidebar() {
  const [activeTab, setActiveTab] = useState<Tab>('palette');

  return (
    <aside className="flex h-full w-56 shrink-0 flex-col border-r border-border-default bg-bg-surface">
      {/* Tab nav */}
      <div className="flex border-b border-border-default">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-1 items-center justify-center gap-1.5 py-2 text-[11px] font-medium uppercase tracking-wider transition-colors ${
              activeTab === item.id
                ? 'border-b-2 border-accent-blue text-text-primary'
                : 'text-text-muted hover:text-text-secondary'
            }`}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3">
        {activeTab === 'palette' && <NodePalette />}
        {activeTab === 'controls' && <ControlsPanel />}
      </div>
    </aside>
  );
}
