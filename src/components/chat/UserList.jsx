export const UserList = ({ users, selectedUser, onSelectUser, currentUser }) => {
    return (
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-700">
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
              .filter(u => u.email !== currentUser.email)
              .map((user) => (
                <button
                  key={user.id}
                  onClick={() => onSelectUser(user)}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-md ${
                    selectedUser?.id === user.id
                      ? 'bg-emerald-500 text-white'
                      : 'text-white hover:bg-gray-700'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                    {user.name[0]}
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