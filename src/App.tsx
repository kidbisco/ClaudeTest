import { ReactFlowProvider } from '@xyflow/react';
import { TopBar } from './components/toolbar/TopBar';
import { Sidebar } from './components/sidebar/Sidebar';
import { DiagramCanvas } from './components/canvas/DiagramCanvas';

export default function App() {
  return (
    <ReactFlowProvider>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', background: '#080e1e' }}>
        <TopBar />
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden', minHeight: 0 }}>
          <Sidebar />
          <DiagramCanvas />
        </div>
      </div>
    </ReactFlowProvider>
  );
}
