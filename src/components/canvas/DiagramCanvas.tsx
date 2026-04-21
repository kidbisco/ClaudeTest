import { useCallback } from 'react';
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  MarkerType,
  type Node,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useDiagramStore } from '../../store/diagramStore';
import { LeafNode } from '../nodes/LeafNode';
import { GroupNode } from '../nodes/GroupNode';
import { AnnotationNode } from '../nodes/AnnotationNode';
import { DefaultEdge } from '../edges/DefaultEdge';
import { NodeEditPanel } from '../nodes/NodeEditPanel';

const nodeTypes = {
  leaf: LeafNode,
  group: GroupNode,
  annotation: AnnotationNode,
};

const edgeTypes = {
  default: DefaultEdge,
};

const defaultEdgeOptions = {
  type: 'default',
  markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6', width: 16, height: 16 },
};

export function DiagramCanvas() {
  const {
    nodes, edges,
    onNodesChange, onEdgesChange, onConnect,
    addNode,
    setEditingNodeId,
  } = useDiagramStore();

  const { screenToFlowPosition } = useReactFlow();

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const raw = e.dataTransfer.getData('application/reactflow');
      if (!raw) return;
      const { type, data } = JSON.parse(raw) as { type: string; data: Record<string, unknown> };
      const position = screenToFlowPosition({ x: e.clientX, y: e.clientY });
      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data,
        ...(type === 'group' ? { style: { width: 300, height: 200 } } : {}),
      };
      addNode(newNode);
    },
    [screenToFlowPosition, addNode]
  );

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div
      style={{ flex: 1, height: '100%', width: '100%' }}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        nodesDraggable
        nodesConnectable
        elementsSelectable
        onNodeDoubleClick={(_, node) => setEditingNodeId(node.id)}
        onPaneClick={() => setEditingNodeId(null)}
        fitView
        fitViewOptions={{ padding: 0.12 }}
        minZoom={0.1}
        maxZoom={3}
        deleteKeyCode={['Delete', 'Backspace']}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#1e2d47" />
        <Controls position="bottom-right" />
        <MiniMap
          position="bottom-left"
          nodeColor={(node) => {
            if (node.type === 'group') return 'rgba(59,130,246,0.3)';
            if (node.type === 'annotation') return '#2a3550';
            return '#1b3566';
          }}
          maskColor="rgba(7,12,26,0.7)"
        />
        <NodeEditPanel />
      </ReactFlow>
    </div>
  );
}
