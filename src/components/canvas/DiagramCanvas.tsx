import { useCallback } from 'react';
import {
  ReactFlow,
  Background,
  BackgroundVariant,
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
import { ZoomControls } from './ZoomControls';

const nodeTypes = { leaf: LeafNode, group: GroupNode, annotation: AnnotationNode };
const edgeTypes = { default: DefaultEdge };
const defaultEdgeOptions = {
  type: 'default',
  markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6', width: 16, height: 16 },
};

export function DiagramCanvas() {
  const nodes = useDiagramStore((s) => s.diagrams[s.activeDiagramId]?.nodes ?? []);
  const edges = useDiagramStore((s) => s.diagrams[s.activeDiagramId]?.edges ?? []);
  const { onNodesChange, onEdgesChange, onConnect, addNode, setEditingNodeId, setNodeParent } =
    useDiagramStore();

  const { screenToFlowPosition, getNodes, getIntersectingNodes } = useReactFlow();

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

  const onNodeDragStop = useCallback(
    (_: React.MouseEvent, draggedNode: Node) => {
      if (draggedNode.type === 'group' || draggedNode.type === 'annotation') return;

      const allNodes = getNodes();

      // Find overlapping groups, prefer smallest (most specific)
      const overlappingGroups = getIntersectingNodes(draggedNode, true)
        .filter((n) => n.type === 'group')
        .sort((a, b) => {
          const aArea = ((a.style?.width as number) ?? 300) * ((a.style?.height as number) ?? 200);
          const bArea = ((b.style?.width as number) ?? 300) * ((b.style?.height as number) ?? 200);
          return aArea - bArea;
        });

      const newParentId = overlappingGroups[0]?.id;
      const currentParentId = draggedNode.parentId;

      if (newParentId === currentParentId) return;

      // Helper: get absolute position of a node (handles one level of nesting)
      const absPos = (node: Node) => {
        if (!node.parentId) return node.position;
        const parent = allNodes.find((n) => n.id === node.parentId);
        return parent
          ? { x: node.position.x + parent.position.x, y: node.position.y + parent.position.y }
          : node.position;
      };

      const draggedAbsPos = absPos(draggedNode);

      if (newParentId) {
        const newParent = allNodes.find((n) => n.id === newParentId)!;
        setNodeParent(draggedNode.id, newParentId, {
          x: draggedAbsPos.x - newParent.position.x,
          y: draggedAbsPos.y - newParent.position.y,
        });
      } else {
        setNodeParent(draggedNode.id, undefined, draggedAbsPos);
      }
    },
    [getNodes, getIntersectingNodes, setNodeParent]
  );

  return (
    <div style={{ flex: 1, height: '100%', width: '100%' }} onDrop={onDrop} onDragOver={onDragOver}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDragStop={onNodeDragStop}
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
        <ZoomControls />
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
