import { Panel, useReactFlow } from '@xyflow/react';

const BASE_BTN: React.CSSProperties = {
  width: 36,
  height: 36,
  background: 'none',
  border: 'none',
  color: '#e2e8f0',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background 0.12s, color 0.12s',
};

function Btn({
  title,
  onClick,
  last,
  fontSize = 20,
  children,
}: {
  title: string;
  onClick: () => void;
  last?: boolean;
  fontSize?: number;
  children: React.ReactNode;
}) {
  return (
    <button
      title={title}
      onClick={onClick}
      style={{
        ...BASE_BTN,
        fontSize,
        lineHeight: 1,
        borderBottom: last ? 'none' : '1px solid #2a3550',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = '#2a3a55';
        e.currentTarget.style.color = '#ffffff';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'none';
        e.currentTarget.style.color = '#e2e8f0';
      }}
    >
      {children}
    </button>
  );
}

export function ZoomControls() {
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  return (
    <Panel position="bottom-right" style={{ margin: 12 }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          background: '#1c2538',
          border: '1px solid #3b5a8a',
          borderRadius: 8,
          overflow: 'hidden',
          boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
        }}
      >
        <Btn title="Zoom in" onClick={() => zoomIn({ duration: 200 })}>+</Btn>
        <Btn title="Zoom out" onClick={() => zoomOut({ duration: 200 })}>−</Btn>
        <Btn title="Fit to view" onClick={() => fitView({ duration: 300, padding: 0.12 })} fontSize={14} last>⤢</Btn>
      </div>
    </Panel>
  );
}
