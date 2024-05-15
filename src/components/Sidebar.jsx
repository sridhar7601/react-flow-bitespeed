import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export default function Sidebar({
  nodes,
  edges,
  selectedNode,
  setSelectedNode,
  setNodes,
  setSelectedElements,
}) {
  const [nodeText, setNodeText] = useState('');

  useEffect(() => {
    if (selectedNode) {
      setNodeText(selectedNode.data.label);
    } else {
      setNodeText('');
    }
  }, [selectedNode]);

  const handleInputChange = (event) => {
    setNodeText(event.target.value);
  };

  const checkNodesWithEdges = () => {
    const nodesWithoutEdges = nodes.filter(
      (node) => !edges.some((edge) => edge.source === node.id || edge.target === node.id)
    );

    if (nodesWithoutEdges.length > 0) {
      toast.warn(`Nodes without edges: ${nodesWithoutEdges.map((node) => node.data.label).join(', ')}`);
    } else {
      toast.success('All nodes have at least one edge.');
    }
  };

  const saveNodeText = () => {
    const updatedNodes = nodes.map((node) =>
      node.id === selectedNode.id ? { ...node, data: { ...node.data, label: nodeText } } : node
    );
    setNodes(updatedNodes);
    setSelectedElements([]);
  };

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="border-r-2 border-gray-200 p-4 text-sm bg-gray-100 w-64 h-screen text-black">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl text-blue-900">Nodes Panel</h3>
        <button
          className="bg-green-500 text-white rounded p-2 hover:bg-green-600"
          onClick={checkNodesWithEdges}
          disabled={nodes.length === 0} // Disable button if no nodes
        >
          Check Nodes
        </button>
      </div>
      {selectedNode && selectedNode.type === 'custom' ? (
        <div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Node Text:</label>
            <input
              type="text"
              className="block w-full pt-2 px-3 pb-3 text-gray-700 border border-gray-300 rounded-lg bg-white focus:outline-none focus:border-gray-500"
              value={nodeText}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              className="bg-gray-500 text-white rounded p-2 hover:bg-gray-600 mr-2"
              onClick={() => setSelectedElements()}
            >
              Go Back
            </button>
            <button
              className="bg-green-500 text-white rounded p-2 hover:bg-green-600"
              onClick={saveNodeText}
            >
              Save Text
            </button>
          </div>
        </div>
      ) : (
        <>
          <div
            className="bg-white p-3 border-2 border-gray-500 rounded cursor-move text-gray-500 hover:bg-gray-100 transition-colors duration-200 mt-4"
            onDragStart={(event) => onDragStart(event, 'textnode')}
            draggable
          >
            <div className="flex">
              <div className="rounded-full w-12 h-12 flex justify-center items-center bg-gray-100">
                📝
              </div>
              <div className="ml-2">
                <div className="text-lg font-bold">Message Node</div>
                <div className="text-gray-500">Customize your message</div>
              </div>
            </div>
          </div>
        </>
      )}
      <ToastContainer />
    </aside>
  );
}