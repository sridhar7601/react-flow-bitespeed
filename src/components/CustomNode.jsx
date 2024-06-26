import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

function CustomNode({ data }) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
      <div className="flex">
        <div className="rounded-full w-12 h-12 flex justify-center items-center bg-gray-100">
          {data.emoji}
        </div>
        <div className="ml-2">
          <div className="text-lg font-bold">{data.label || data.name}</div>
          <div className="text-gray-500">{data.job}</div>
        </div>
      </div>
      <Handle type="target" position={Position.Right}  />
      <Handle type="source" position={Position.Left}  />
    </div>
  );
}

export default memo(CustomNode);