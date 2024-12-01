import { useState } from 'react';
import { Search } from 'lucide-react';

export const UserList = ({ users, selectedUser, onSelectUser, currentUser, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Buscar usuario..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-2 pl-10 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-emerald-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <button
          onClick={() => onSelectUser(null)}
          className={`w-full text-left px-4 py-2 rounded-md ${
            !selectedUser ? 'bg-emerald-500 text-white' : 'text-white hover:bg-gray-700'
          }`}
        >
          Chat Global
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="text-sm font-semibold text-gray-400 mb-2">Usuarios</h3>
        <div className="space-y-2">
          {users
            .filter(u => u._id !== currentUser._id)
            .map((user) => (
              <button
                key={user._id}
                onClick={() => onSelectUser(user)}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-md ${
                  selectedUser?._id === user._id
                    ? 'bg-emerald-500 text-white'
                    : 'text-white hover:bg-gray-700'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                  {user.name[0].toUpperCase()}
                </div>
                <div className="text-left">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-400 capitalize">{user.role}</p>
                </div>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};