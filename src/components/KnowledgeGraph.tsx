'use client';

import { useState, useEffect, useRef } from 'react';
import { KnowledgeNode, KnowledgeEdge } from '@/lib/types';
import { foods, doshas, conditions, viruddhaRules } from '@/lib/data';

interface KnowledgeGraphProps {
  filterType?: 'all' | 'foods' | 'doshas' | 'conditions' | 'viruddha';
  highlightNode?: string;
}

interface GraphNode extends KnowledgeNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface GraphEdge extends KnowledgeEdge {
  sourceNode: GraphNode;
  targetNode: GraphNode;
}

export function KnowledgeGraph({ filterType = 'all', highlightNode }: KnowledgeGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [edges, setEdges] = useState<GraphEdge[]>([]);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  // Build graph data
  useEffect(() => {
    const graphNodes: GraphNode[] = [];
    const graphEdges: KnowledgeEdge[] = [];
    const nodeMap = new Map<string, GraphNode>();

    // Add dosha nodes
    if (filterType === 'all' || filterType === 'doshas') {
      doshas.doshas.forEach(dosha => {
        const node: GraphNode = {
          id: `dosha_${dosha.type}`,
          type: 'dosha',
          label: dosha.name,
          x: Math.random() * dimensions.width,
          y: Math.random() * dimensions.height,
          vx: 0,
          vy: 0,
        };
        graphNodes.push(node);
        nodeMap.set(node.id, node);
      });
    }

    // Add food nodes (limited for performance)
    if (filterType === 'all' || filterType === 'foods') {
      const limitedFoods = foods.slice(0, 20);
      const shouldAddDoshaEdges = filterType === 'all';
      
      limitedFoods.forEach(food => {
        const node: GraphNode = {
          id: `food_${food.id}`,
          type: 'food',
          label: food.name,
          data: { category: food.category },
          x: Math.random() * dimensions.width,
          y: Math.random() * dimensions.height,
          vx: 0,
          vy: 0,
        };
        graphNodes.push(node);
        nodeMap.set(node.id, node);

        // Add edges to doshas
        if (shouldAddDoshaEdges) {
          (['vata', 'pitta', 'kapha'] as const).forEach(dosha => {
            const effect = food.ayurvedic.doshaEffect[dosha];
            if (effect !== 0) {
              graphEdges.push({
                source: node.id,
                target: `dosha_${dosha}`,
                relationship: effect < 0 ? 'pacifies' : 'aggravates',
                weight: Math.abs(effect),
              });
            }
          });
        }
      });
    }

    // Add condition nodes
    if (filterType === 'all' || filterType === 'conditions') {
      conditions.forEach(condition => {
        const node: GraphNode = {
          id: `condition_${condition.id}`,
          type: 'condition',
          label: condition.name,
          x: Math.random() * dimensions.width,
          y: Math.random() * dimensions.height,
          vx: 0,
          vy: 0,
        };
        graphNodes.push(node);
        nodeMap.set(node.id, node);

        // Link to affected doshas
        condition.affectedDoshas.forEach(dosha => {
          if (nodeMap.has(`dosha_${dosha}`)) {
            graphEdges.push({
              source: node.id,
              target: `dosha_${dosha}`,
              relationship: 'affects',
            });
          }
        });
      });
    }

    // Add viruddha (incompatibility) edges
    if (filterType === 'all' || filterType === 'viruddha') {
      viruddhaRules.forEach(rule => {
        const food1Id = `food_${rule.food1}`;
        const food2Id = `food_${rule.food2}`;
        
        if (nodeMap.has(food1Id) && nodeMap.has(food2Id)) {
          graphEdges.push({
            source: food1Id,
            target: food2Id,
            relationship: `incompatible_${rule.severity}`,
          });
        }
      });
    }

    setNodes(graphNodes);
    
    // Convert edges to include node references
    const resolvedEdges: GraphEdge[] = graphEdges
      .filter(e => nodeMap.has(e.source) && nodeMap.has(e.target))
      .map(e => ({
        ...e,
        sourceNode: nodeMap.get(e.source)!,
        targetNode: nodeMap.get(e.target)!,
      }));
    
    setEdges(resolvedEdges);
  }, [filterType, dimensions]);

  // Simple force-directed layout simulation
  useEffect(() => {
    if (nodes.length === 0) return;

    let animationId: number;
    let iteration = 0;
    const maxIterations = 100;

    const simulate = () => {
      if (iteration >= maxIterations) return;

      // Update node positions
      setNodes(prevNodes => {
        const updatedNodes = prevNodes.map(node => {
          let fx = 0, fy = 0;

          // Repulsion between nodes
          prevNodes.forEach(other => {
            if (node.id !== other.id) {
              const dx = node.x - other.x;
              const dy = node.y - other.y;
              const dist = Math.sqrt(dx * dx + dy * dy) || 1;
              const force = 500 / (dist * dist);
              fx += (dx / dist) * force;
              fy += (dy / dist) * force;
            }
          });

          // Attraction to center
          const centerX = dimensions.width / 2;
          const centerY = dimensions.height / 2;
          fx += (centerX - node.x) * 0.01;
          fy += (centerY - node.y) * 0.01;

          // Edge attraction
          edges.forEach(edge => {
            if (edge.source === node.id || edge.target === node.id) {
              const other = edge.source === node.id ? edge.targetNode : edge.sourceNode;
              if (other) {
                const dx = other.x - node.x;
                const dy = other.y - node.y;
                const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                fx += dx * 0.01;
                fy += dy * 0.01;
              }
            }
          });

          // Update velocity and position
          const damping = 0.9;
          const newVx = (node.vx + fx) * damping;
          const newVy = (node.vy + fy) * damping;

          return {
            ...node,
            vx: newVx,
            vy: newVy,
            x: Math.max(50, Math.min(dimensions.width - 50, node.x + newVx)),
            y: Math.max(50, Math.min(dimensions.height - 50, node.y + newVy)),
          };
        });

        return updatedNodes;
      });

      iteration++;
      animationId = requestAnimationFrame(simulate);
    };

    simulate();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [nodes.length, edges, dimensions]);

  // Canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, dimensions.width, dimensions.height);

    // Draw edges
    edges.forEach(edge => {
      const source = nodes.find(n => n.id === edge.source);
      const target = nodes.find(n => n.id === edge.target);
      
      if (source && target) {
        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);
        
        // Color based on relationship
        if (edge.relationship.includes('incompatible')) {
          ctx.strokeStyle = edge.relationship.includes('severe') 
            ? 'rgba(192, 57, 43, 0.6)' 
            : 'rgba(243, 156, 18, 0.4)';
          ctx.lineWidth = 2;
        } else if (edge.relationship === 'pacifies') {
          ctx.strokeStyle = 'rgba(46, 204, 113, 0.4)';
          ctx.lineWidth = 1;
        } else if (edge.relationship === 'aggravates') {
          ctx.strokeStyle = 'rgba(231, 76, 60, 0.4)';
          ctx.lineWidth = 1;
        } else {
          ctx.strokeStyle = 'rgba(139, 115, 85, 0.3)';
          ctx.lineWidth = 1;
        }
        
        ctx.stroke();
      }
    });

    // Draw nodes
    nodes.forEach(node => {
      const isHovered = hoveredNode?.id === node.id;
      const isSelected = selectedNode?.id === node.id;
      const radius = isHovered || isSelected ? 25 : 20;

      // Node circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      
      // Color based on type
      switch (node.type) {
        case 'dosha':
          ctx.fillStyle = node.label === 'Vata' ? '#7eb8da' :
                         node.label === 'Pitta' ? '#e74c3c' : '#2ecc71';
          break;
        case 'food':
          ctx.fillStyle = '#c9a227';
          break;
        case 'condition':
          ctx.fillStyle = '#d35400';
          break;
        default:
          ctx.fillStyle = '#8b7355';
      }
      
      ctx.fill();
      
      if (isSelected) {
        ctx.strokeStyle = '#2d3436';
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      // Label
      ctx.fillStyle = '#2d3436';
      ctx.font = isHovered || isSelected ? 'bold 12px sans-serif' : '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        node.label.length > 12 ? node.label.slice(0, 12) + '...' : node.label,
        node.x,
        node.y + radius + 15
      );
    });
  }, [nodes, edges, hoveredNode, selectedNode, dimensions]);

  // Mouse interaction
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Find node under cursor
    const foundNode = nodes.find(node => {
      const dx = node.x - x;
      const dy = node.y - y;
      return Math.sqrt(dx * dx + dy * dy) < 25;
    });

    setHoveredNode(foundNode || null);
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const foundNode = nodes.find(node => {
      const dx = node.x - x;
      const dy = node.y - y;
      return Math.sqrt(dx * dx + dy * dy) < 25;
    });

    setSelectedNode(foundNode || null);
  };

  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-vata" />
          <span>Vata</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-pitta" />
          <span>Pitta</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-kapha" />
          <span>Kapha</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-primary" />
          <span>Food</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-accent" />
          <span>Condition</span>
        </div>
      </div>

      {/* Canvas */}
      <div className="card p-4 overflow-hidden">
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          onMouseMove={handleMouseMove}
          onClick={handleClick}
          className="cursor-pointer"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </div>

      {/* Node Details */}
      {selectedNode && (
        <div className="card p-4 animate-fade-in">
          <h3 className="font-semibold mb-2">{selectedNode.label}</h3>
          <p className="text-sm text-stone capitalize">Type: {selectedNode.type}</p>
          {selectedNode.data && (
            <p className="text-sm text-stone">
              {JSON.stringify(selectedNode.data)}
            </p>
          )}
          <div className="mt-3">
            <p className="text-sm font-medium">Connections:</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {edges
                .filter(e => e.source === selectedNode.id || e.target === selectedNode.id)
                .slice(0, 10)
                .map((edge, i) => {
                  const otherId = edge.source === selectedNode.id ? edge.target : edge.source;
                  const otherNode = nodes.find(n => n.id === otherId);
                  return (
                    <span key={i} className="text-xs px-2 py-1 bg-sand rounded">
                      {edge.relationship} {otherNode?.label}
                    </span>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

