export type GroupColor = 'orange' | 'blue' | 'red' | 'purple' | 'green' | 'gray' | 'teal';

export interface LeafNodeData {
  label: string;
  sublabel?: string;
}

export interface GroupNodeData {
  label: string;
  color: GroupColor;
}

export interface AnnotationNodeData {
  label: string;
  body: string;
}
