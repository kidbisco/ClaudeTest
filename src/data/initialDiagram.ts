import type { Node, Edge } from '@xyflow/react';

export const initialNodes: Node[] = [
  // ── Group: TNR Operational Data Stores ─────────────────────────────────────
  {
    id: 'grp-tnr',
    type: 'group',
    position: { x: 20, y: 60 },
    style: { width: 200, height: 300 },
    data: { label: 'TNR Operational Data Stores', color: 'orange' },
  },
  {
    id: 'tnr-db1',
    type: 'leaf',
    parentId: 'grp-tnr',
    extent: 'parent',
    position: { x: 20, y: 60 },
    data: { label: 'Accounting DB 1', sublabel: 'Single Tenant · MSSQL Server' },
  },
  {
    id: 'tnr-db2',
    type: 'leaf',
    parentId: 'grp-tnr',
    extent: 'parent',
    position: { x: 20, y: 140 },
    data: { label: 'Accounting DB 2', sublabel: 'Single Tenant · MSSQL Server' },
  },
  {
    id: 'tnr-dbn',
    type: 'leaf',
    parentId: 'grp-tnr',
    extent: 'parent',
    position: { x: 20, y: 220 },
    data: { label: 'Accounting DB N', sublabel: 'Single Tenant · MSSQL Server' },
  },

  // ── Group: Operational Data Access Layer ───────────────────────────────────
  {
    id: 'grp-odal',
    type: 'group',
    position: { x: 270, y: 60 },
    style: { width: 210, height: 220 },
    data: { label: 'Operational Data Access Layer', color: 'blue' },
  },
  {
    id: 'odal-api',
    type: 'leaf',
    parentId: 'grp-odal',
    extent: 'parent',
    position: { x: 20, y: 60 },
    data: {
      label: 'Internal REST API',
      sublabel: 'HTTPS Secured · Service Account Auth · Multi-Tenant Data Access',
    },
  },

  // ── Standalone: TNR Warehouse Ingestion Service ───────────────────────────
  {
    id: 'tnr-ingestion',
    type: 'leaf',
    position: { x: 540, y: 110 },
    data: {
      label: 'TNR Warehouse Ingestion Service',
      sublabel: 'Authorized Service Account · API Data Extraction',
    },
  },

  // ── Group: Total Return Operational Data Stores ───────────────────────────
  {
    id: 'grp-trod',
    type: 'group',
    position: { x: 20, y: 400 },
    style: { width: 200, height: 310 },
    data: { label: 'Total Return Operational Data Stores', color: 'red' },
  },
  {
    id: 'trod-c1',
    type: 'leaf',
    parentId: 'grp-trod',
    extent: 'parent',
    position: { x: 20, y: 60 },
    data: { label: 'Client Instance 1', sublabel: 'Single Tenant · Rocket Universe' },
  },
  {
    id: 'trod-c2',
    type: 'leaf',
    parentId: 'grp-trod',
    extent: 'parent',
    position: { x: 20, y: 145 },
    data: { label: 'Client Instance 2', sublabel: 'Single Tenant · Rocket Universe' },
  },
  {
    id: 'trod-cn',
    type: 'leaf',
    parentId: 'grp-trod',
    extent: 'parent',
    position: { x: 20, y: 230 },
    data: { label: 'Client Instance N', sublabel: 'Single Tenant · Rocket Universe' },
  },

  // ── Standalone: Total Return Ingestion Service ────────────────────────────
  {
    id: 'tr-ingestion',
    type: 'leaf',
    position: { x: 270, y: 490 },
    data: {
      label: 'Total Return Ingestion Service',
      sublabel: 'Client Instance Pull · Transform to Parquet',
    },
  },

  // ── Group: SSNC Private Network Trust Boundary ────────────────────────────
  {
    id: 'grp-boundary',
    type: 'group',
    position: { x: 490, y: 280 },
    style: { width: 1030, height: 520 },
    data: { label: 'SSNC Private Network Trust Boundary', color: 'gray' },
  },

  // ── Standalone: Raw Private Object Storage (inside boundary) ─────────────
  {
    id: 'raw-pos',
    type: 'leaf',
    parentId: 'grp-boundary',
    extent: 'parent',
    position: { x: 20, y: 200 },
    data: {
      label: 'Raw Private Object Storage',
      sublabel: 'Internal S3 Bucket · Private Object Storage · Parquet Files',
    },
  },

  // ── Standalone: Bronze Ingestion ─────────────────────────────────────────
  {
    id: 'bronze-ingestion',
    type: 'leaf',
    parentId: 'grp-boundary',
    extent: 'parent',
    position: { x: 240, y: 330 },
    data: { label: 'Bronze Ingestion', sublabel: '' },
  },

  // ── Group: Lakehouse Data Platform ────────────────────────────────────────
  {
    id: 'grp-lakehouse',
    type: 'group',
    parentId: 'grp-boundary',
    extent: 'parent',
    position: { x: 380, y: 20 },
    style: { width: 630, height: 490 },
    data: { label: 'Lakehouse Data Platform', color: 'gray' },
  },

  // ── Group: Silver Layer Warehouse ─────────────────────────────────────────
  {
    id: 'grp-silver',
    type: 'group',
    parentId: 'grp-lakehouse',
    extent: 'parent',
    position: { x: 20, y: 40 },
    style: { width: 230, height: 130 },
    data: { label: 'Silver Layer Warehouse', color: 'blue' },
  },
  {
    id: 'silver-warehouse',
    type: 'leaf',
    parentId: 'grp-silver',
    extent: 'parent',
    position: { x: 15, y: 45 },
    data: {
      label: 'Multi-Tenant MSSQL Warehouse',
      sublabel: 'Cleansed / Deduplicated Data',
    },
  },

  // ── Standalone: Controlled Data Export ───────────────────────────────────
  {
    id: 'ctrl-export',
    type: 'leaf',
    parentId: 'grp-lakehouse',
    extent: 'parent',
    position: { x: 270, y: 75 },
    data: { label: 'Controlled Data Export', sublabel: 'Parquet File Generation' },
  },

  // ── Group: Private Object Storage ─────────────────────────────────────────
  {
    id: 'grp-pvt-storage',
    type: 'group',
    parentId: 'grp-lakehouse',
    extent: 'parent',
    position: { x: 400, y: 40 },
    style: { width: 210, height: 130 },
    data: { label: 'Private Object Storage', color: 'purple' },
  },
  {
    id: 'pvt-storage',
    type: 'leaf',
    parentId: 'grp-pvt-storage',
    extent: 'parent',
    position: { x: 15, y: 45 },
    data: {
      label: 'Internal S3 Bucket',
      sublabel: 'Private Object Storage · Parquet Files',
    },
  },

  // ── Group: Starrocks Bronze Layer ─────────────────────────────────────────
  {
    id: 'grp-bronze',
    type: 'group',
    parentId: 'grp-lakehouse',
    extent: 'parent',
    position: { x: 20, y: 230 },
    style: { width: 230, height: 120 },
    data: { label: 'Starrocks Bronze Layer', color: 'gray' },
  },
  {
    id: 'bronze-data',
    type: 'leaf',
    parentId: 'grp-bronze',
    extent: 'parent',
    position: { x: 15, y: 40 },
    data: { label: 'Append-only tabular', sublabel: 'Ingested data' },
  },

  // ── Standalone: Silver Enrichment ─────────────────────────────────────────
  {
    id: 'silver-enrich',
    type: 'leaf',
    parentId: 'grp-lakehouse',
    extent: 'parent',
    position: { x: 270, y: 255 },
    data: { label: 'Silver Enrichment', sublabel: '' },
  },

  // ── Group: Starrocks Silver Layer ─────────────────────────────────────────
  {
    id: 'grp-silver-sr',
    type: 'group',
    parentId: 'grp-lakehouse',
    extent: 'parent',
    position: { x: 400, y: 230 },
    style: { width: 210, height: 120 },
    data: { label: 'Starrocks Silver Layer', color: 'gray' },
  },
  {
    id: 'silver-sr-data',
    type: 'leaf',
    parentId: 'grp-silver-sr',
    extent: 'parent',
    position: { x: 15, y: 40 },
    data: { label: 'Starrocks Silver', sublabel: 'Conformed Data' },
  },

  // ── Group: Gold Analytics Layer ───────────────────────────────────────────
  {
    id: 'grp-gold',
    type: 'group',
    parentId: 'grp-lakehouse',
    extent: 'parent',
    position: { x: 430, y: 130 },  // spans vertically between silver and starrocks-silver
    style: { width: 180, height: 260 },
    data: { label: 'Gold Analytics Layer', color: 'green' },
  },
  {
    id: 'gold-transform',
    type: 'leaf',
    parentId: 'grp-gold',
    extent: 'parent',
    position: { x: 10, y: 50 },
    data: { label: 'Gold Transformations', sublabel: '' },
  },
  {
    id: 'gold-schema',
    type: 'leaf',
    parentId: 'grp-gold',
    extent: 'parent',
    position: { x: 10, y: 160 },
    data: { label: 'Gold Schema Tables', sublabel: 'Analytics / BI' },
  },

  // ── Annotation: Security Control ──────────────────────────────────────────
  {
    id: 'annotation-security',
    type: 'annotation',
    position: { x: 1390, y: 650 },
    data: {
      label: 'Security Control',
      body: 'All systems operate entirely within the SSNC internal network. No data leaves the network and no data traverses the public internet.',
    },
  },
];

export const initialEdges: Edge[] = [
  // TNR DBs → ODAL API
  { id: 'e-tnr-db1-api', source: 'tnr-db1', target: 'odal-api', type: 'default' },
  { id: 'e-tnr-db2-api', source: 'tnr-db2', target: 'odal-api', type: 'default' },
  { id: 'e-tnr-dbn-api', source: 'tnr-dbn', target: 'odal-api', type: 'default' },

  // ODAL API → TNR Warehouse Ingestion
  { id: 'e-api-ingestion', source: 'odal-api', target: 'tnr-ingestion', type: 'default' },

  // TNR Warehouse Ingestion → Silver Warehouse
  { id: 'e-ingestion-silver', source: 'tnr-ingestion', target: 'silver-warehouse', type: 'default' },

  // Total Return Clients → TR Ingestion
  { id: 'e-trod-c1-tri', source: 'trod-c1', target: 'tr-ingestion', type: 'default' },
  { id: 'e-trod-c2-tri', source: 'trod-c2', target: 'tr-ingestion', type: 'default' },
  { id: 'e-trod-cn-tri', source: 'trod-cn', target: 'tr-ingestion', type: 'default' },

  // TR Ingestion → Raw Private Object Storage
  { id: 'e-tri-rawpos', source: 'tr-ingestion', target: 'raw-pos', type: 'default' },

  // Raw POS → Bronze Ingestion
  { id: 'e-rawpos-bi', source: 'raw-pos', target: 'bronze-ingestion', type: 'default' },

  // Bronze Ingestion → Bronze Data
  { id: 'e-bi-bronze', source: 'bronze-ingestion', target: 'bronze-data', type: 'default' },

  // Silver Warehouse → Controlled Data Export
  { id: 'e-silver-export', source: 'silver-warehouse', target: 'ctrl-export', type: 'default' },

  // Controlled Data Export → Private Object Storage
  { id: 'e-export-pvt', source: 'ctrl-export', target: 'pvt-storage', type: 'default' },

  // Bronze Data → Silver Enrichment
  { id: 'e-bronze-enrichment', source: 'bronze-data', target: 'silver-enrich', type: 'default' },

  // Silver Enrichment → Starrocks Silver
  { id: 'e-enrichment-sr-silver', source: 'silver-enrich', target: 'silver-sr-data', type: 'default' },

  // Private Object Storage → Gold Transformations
  { id: 'e-pvt-gold', source: 'pvt-storage', target: 'gold-transform', type: 'default' },

  // Starrocks Silver → Gold Transformations
  { id: 'e-sr-silver-gold', source: 'silver-sr-data', target: 'gold-transform', type: 'default' },

  // Gold Transformations → Gold Schema Tables
  { id: 'e-gold-transform-schema', source: 'gold-transform', target: 'gold-schema', type: 'default' },
];
