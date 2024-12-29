import React from 'react'

export default function Erroemsg({ message}) {
    return (
        <div
          className={`border px-4 py-2 rounded-md flex justify-between items-center bg-red-100 border-red-400 text-red-700 mb-4`}
        >
          <span>{message}</span>
        </div>
      );
}
