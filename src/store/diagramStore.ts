import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Connection,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
} from '@xyflow/react';
import { initialNodes, initialEdges } from '../data/initialDiagram';

export interface Diagram {
  id: string;
  name: string;
  nodes: Node[];
  edges: Edge[];
}

interface DiagramState {
  diagrams: Record<string, Diagram>;
  activeDiagramId: string;
  editingNodeId: string | null;

  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  addNode: (node: Node) => void;
  setEditingNodeId: (id: string | null) => void;
  setNodeParent: (nodeId: string, parentId: string | undefined, position: { x: number; y: number }) => void;

  createDiagram: (name: string) => void;
  switchDiagram: (id: string) => void;
  renameDiagram: (id: string, name: string) => void;
  deleteDiagram: (id: string) => void;
}

const INITIAL_ID = 'diagram-initial';

const initialDiagram: Diagram = {
  id: INITIAL_ID,
  name: 'TNR Data Flow',
  nodes: initialNodes,
  edges: initialEdges,
};

function patchActive(
  state: DiagramState,
  patch: (d: Diagram) => Partial<Diagram>
): Partial<DiagramState> {
  const active = state.diagrams[state.activeDiagramId];
  if (!active) return {};
  return {
    diagrams: {
      ...state.diagrams,
      [state.activeDiagramId]: { ...active, ...patch(active) },
    },
  };
}

export const useDiagramStore = create<DiagramState>()(
  persist(
    (set) => ({
      diagrams: { [INITIAL_ID]: initialDiagram },
      activeDiagramId: INITIAL_ID,
      editingNodeId: null,

      onNodesChange: (changes) =>
        set((s) => patchActive(s, (d) => ({ nodes: applyNodeChanges(changes, d.nodes) }))),

      onEdgesChange: (changes) =>
        set((s) => patchActive(s, (d) => ({ edges: applyEdgeChanges(changes, d.edges) }))),

      onConnect: (connection) =>
        set((s) =>
          patchActive(s, (d) => ({
            edges: addEdge({ ...connection, type: 'default' }, d.edges),
          }))
        ),

      addNode: (node) =>
        set((s) => patchActive(s, (d) => ({ nodes: [...d.nodes, node] }))),

      setEditingNodeId: (id) => set({ editingNodeId: id }),

      setNodeParent: (nodeId, parentId, position) =>
        set((s) =>
          patchActive(s, (d) => ({
            nodes: d.nodes.map((n) =>
              n.id === nodeId ? { ...n, parentId, position } : n
            ),
          }))
        ),

      createDiagram: (name) => {
        const id = `diagram-${Date.now()}`;
        set((s) => ({
          diagrams: {
            ...s.diagrams,
            [id]: { id, name, nodes: [], edges: [] },
          },
          activeDiagramId: id,
          editingNodeId: null,
        }));
      },

      switchDiagram: (id) => set({ activeDiagramId: id, editingNodeId: null }),

      renameDiagram: (id, name) =>
        set((s) => ({
          diagrams: { ...s.diagrams, [id]: { ...s.diagrams[id], name } },
        })),

      deleteDiagram: (id) =>
        set((s) => {
          const rest = Object.fromEntries(
            Object.entries(s.diagrams).filter(([k]) => k !== id)
          );
          if (Object.keys(rest).length === 0) return {}; // keep at least one
          const newActive =
            s.activeDiagramId === id
              ? Object.keys(rest)[0]
              : s.activeDiagramId;
          return { diagrams: rest, activeDiagramId: newActive };
        }),
    }),
    {
      name: 'flowcraft-diagrams',
      partialize: (s) => ({
        diagrams: s.diagrams,
        activeDiagramId: s.activeDiagramId,
      }),
    }
  )
);
