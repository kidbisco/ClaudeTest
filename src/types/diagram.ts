export type GroupColor = 'orange' | 'blue' | 'red' | 'purple' | 'green' | 'gray' | 'teal';

export type LeafColor = 'default' | 'blue' | 'teal' | 'purple' | 'orange' | 'red' | 'green' | 'gray';
export type LeafShape = 'rectangle' | 'square' | 'circle' | 'oval' | 'triangle';

export interface LeafNodeData {
  label: string;
  sublabel?: string;
  color?: LeafColor;
  shape?: LeafShape;
}

export interface GroupNodeData {
  label: string;
  color: GroupColor;
}

export interface AnnotationNodeData {
  label: string;
  body: string;
}
