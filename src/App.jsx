// App.js
import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap
} from 'reactflow';
import 'reactflow/dist/style.css';
import Sidebar from './components/Sidebar';
import './index.css';
import CustomNode from './components/CustomNode';

const nodeTypes = {
  custom: CustomNode,
};

const initNodes = [
  
];

const initEdges = [
  
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const App = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = useCallback(
    (params) => {
      const newEdge = {
        ...params,
        animated: true, // Add the animated prop here
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) {
        return;
      }
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type: 'custom',
        position,
        data: {
          label: type === 'textnode' ? 'Text Node' : '',
          name: 'Jane Doe',
          job: '',
          emoji: '😎',
        },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <div className="dndflow" style={{ height: '90vh' }}>
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
            onNodeClick={(event, node) => setSelectedNode(node)}
            className="bg-teal-50"

          >
            {/* <MiniMap /> */}
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar
          nodes={nodes}
          edges={edges}
          selectedNode={selectedNode}
          setSelectedNode={setSelectedNode}
          setNodes={setNodes}
          setSelectedElements={() => setSelectedNode(null)}
        />
      </ReactFlowProvider>
    </div>
  );
};

export default App;