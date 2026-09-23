import { useEffect, useState } from 'react'
import { Background, BackgroundVariant, Controls, MarkerType, Position, ReactFlow, type Edge, type Node } from '@xyflow/react'

const steps = [
  { id: 'scope', title: 'Set audit scope', detail: 'Analyst chooses the target and scan.', position: { x: 20, y: 65 }, targetPosition: Position.Left, sourcePosition: Position.Right },
  { id: 'api', title: 'Django API', detail: 'Validates input and creates a run.', position: { x: 245, y: 65 }, targetPosition: Position.Left, sourcePosition: Position.Right },
  { id: 'queue', title: 'Huey + Redis', detail: 'Schedules long running work.', position: { x: 470, y: 65 }, targetPosition: Position.Left, sourcePosition: Position.Right },
  { id: 'scan', title: 'Scan workers', detail: 'Tools execute and report progress.', position: { x: 695, y: 65 }, targetPosition: Position.Left, sourcePosition: Position.Bottom },
  { id: 'normalize', title: 'Normalize output', detail: 'Mixed results become findings.', position: { x: 695, y: 260 }, targetPosition: Position.Top, sourcePosition: Position.Left },
  { id: 'review', title: 'Analyst review', detail: 'Investigate findings and failures.', position: { x: 470, y: 260 }, targetPosition: Position.Right, sourcePosition: Position.Left },
  { id: 'deliver', title: 'Client reports', detail: 'Export PDF, DOCX, and sheets.', position: { x: 245, y: 260 }, targetPosition: Position.Right, sourcePosition: Position.Left },
]

const nodes: Node[] = steps.map((step, index) => ({
  id: step.id,
  type: 'default',
  position: step.position,
  targetPosition: step.targetPosition,
  sourcePosition: step.sourcePosition,
  draggable: false,
  selectable: false,
  className: 'audit-node',
  data: {
    label: (
      <div className="audit-node-content">
        <span>{String(index + 1).padStart(2, '0')} / PROCESS</span>
        <strong>{step.title}</strong>
        <small>{step.detail}</small>
      </div>
    ),
  },
}))

const links = [
  ['scope', 'api'],
  ['api', 'queue'],
  ['queue', 'scan'],
  ['scan', 'normalize'],
  ['normalize', 'review'],
  ['review', 'deliver'],
]

const edges: Edge[] = links.map(([source, target]) => ({
  id: `${source}-${target}`,
  source,
  target,
  type: 'smoothstep',
  animated: true,
  style: { stroke: '#a4d975', strokeWidth: 1.7 },
  markerEnd: { type: MarkerType.ArrowClosed, color: '#a4d975' },
}))

// Read-only React Flow diagram of the audit pipeline, with pan and zoom for smaller screens.
export default function ExperienceDiagram() {
  const [compact, setCompact] = useState(() => window.innerWidth < 700)

  useEffect(() => {
    const updateLayout = () => setCompact(window.innerWidth < 700)
    window.addEventListener('resize', updateLayout)
    return () => window.removeEventListener('resize', updateLayout)
  }, [])

  const visibleNodes = compact
    ? nodes.map((node, index) => ({
        ...node,
        position: { x: 20, y: index * 148 + 20 },
        targetPosition: Position.Top,
        sourcePosition: Position.Bottom,
      }))
    : nodes

  return (
    <figure className="experience-flow">
      <figcaption><span>CYBERESIST / AUDIT PIPELINE</span><span>{compact ? 'DRAG TO EXPLORE' : 'DRAG TO PAN · USE CONTROLS TO ZOOM'}</span></figcaption>
      <div className="experience-flow-canvas" aria-label="Cyberesist audit pipeline from scope to client reports">
        <ReactFlow
          key={compact ? 'compact' : 'wide'}
          nodes={visibleNodes}
          edges={edges}
          fitView={!compact}
          fitViewOptions={{ padding: 0.12 }}
          defaultViewport={compact ? { x: 18, y: 10, zoom: 1 } : undefined}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          zoomOnScroll={false}
          preventScrolling={false}
          colorMode="dark"
        >
          <Background variant={BackgroundVariant.Lines} gap={24} color="#294939" />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
    </figure>
  )
}
