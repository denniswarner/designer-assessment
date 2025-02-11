'use client'

import { useUser } from '@/context/UserContext';

export default function NameDisplay() {
  const { fullName } = useUser();
  
  console.log('NameDisplay rendering, fullName:', fullName);
  console.log('localStorage value:', localStorage.getItem('userName'));
  
  if (!fullName) return null;

  return (
    <div className="bg-yellow-50 p-4 rounded-lg mb-6">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-sm font-medium text-gray-500">Name</div>
          <div className="text-lg font-semibold text-gray-900">{fullName}</div>
        </div>
      </div>
    </div>
  );
}