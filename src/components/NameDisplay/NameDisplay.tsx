import { useUser } from '@/context/UserContext';

export default function NameDisplay() {
  const { fullName } = useUser();
  console.log('NameDisplay rendering with name:', fullName); // Debug log
  
  return (
    <div className="bg-yellow-50 p-4 rounded-lg mb-6">
      <p className="text-lg font-semibold">Name: {fullName || 'Not set'}</p>
    </div>
  );
}