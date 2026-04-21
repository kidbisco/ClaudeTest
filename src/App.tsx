import { ReactFlowProvider } from '@xyflow/react';
import { TopBar } from './components/toolbar/TopBar';
import { Sidebar } from './components/sidebar/Sidebar';
import { DiagramCanvas } from './components/canvas/DiagramCanvas';

export default function App() {
  return (
    <ReactFlowProvider>
      <div className="flex h-full flex-col bg-bg-base">
        <TopBar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <DiagramCanvas />
        </div>
      </div>
    </ReactFlowProvider>
  );
}
