import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useChat } from '../hooks/useChat';
import { useUsers } from '../hooks/useUsers';
import { MessageList } from '../components/chat/MessageList';
import { MessageInput } from '../components/chat/MessageInput';
import { UserList } from '../components/chat/UserList';

export const Chat = () => {
  const location = useLocation();
  const [selectedUser, setSelectedUser] = useState(null);
  const { user } = useAuthStore();
  const { messages, loading: chatLoading, sendMessage, fetchMessages } = useChat();
  const { users, loading: usersLoading, searchUsers } = useUsers();

  useEffect(() => {
    if (location.state?.selectedUserId) {
      const selectedUser = users.find(u => u._id === location.state.selectedUserId);
      if (selectedUser) {
        setSelectedUser(selectedUser);
      }
    }
  }, [location.state, users]);

  useEffect(() => {
    fetchMessages(selectedUser?._id);
  }, [selectedUser, fetchMessages]);

  const handleSearch = async (searchTerm) => {
    if (searchTerm.trim()) {
      await searchUsers(searchTerm);
    }
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    fetchMessages(user?._id);
  };

  const handleSendMessage = async (content) => {
    try {
      await sendMessage(content, selectedUser?._id);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="bg-gray-800 rounded-lg overflow-hidden h-[calc(100vh-12rem)]">
        <div className="grid grid-cols-4 h-full">
          <div className="col-span-1 border-r border-gray-700">
            {usersLoading ? (
              <div className="text-white text-center p-4">Cargando usuarios...</div>
            ) : (
              <UserList
                users={users}
                selectedUser={selectedUser}
                onSelectUser={handleSelectUser}
                currentUser={user}
                onSearch={handleSearch}
              />
            )}
          </div>
          <div className="col-span-3 flex flex-col">
            <div className="p-4 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white">
                {selectedUser ? `Chat con ${selectedUser.name}` : 'Chat Global'}
              </h2>
            </div>
            {chatLoading ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-white">Cargando mensajes...</div>
              </div>
            ) : (
              <MessageList
                messages={messages}
                currentUser={user}
              />
            )}
            <MessageInput onSendMessage={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};