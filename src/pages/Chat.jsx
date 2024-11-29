import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { MessageList } from '../components/chat/MessageList';
import { MessageInput } from '../components/chat/MessageInput';
import { UserList } from '../components/chat/UserList';

export const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const { user } = useAuthStore();

  // Mock data - In a real app, this would come from a backend
  const users = [
    { id: 1, name: 'Juan Pérez', email: 'juan@gmail.com', role: 'jugador', avatar: '/avatars/juan.jpg' },
    { id: 2, name: 'Carlos Ruiz', email: 'camilo@gmail.com', role: 'entrenador', avatar: '/avatars/carlos.jpg' }
  ];

  const messages = [
    {
      id: 1,
      sender: 'juan@gmail.com',
      content: 'Hola necesito saber si tienes espacio para un jugador más',
      timestamp: new Date(),
      isPrivate: selectedUser !== null
    },
    {
      id: 2,
      sender: 'camilo@gmail.com',
      content: 'Hola, si tengo espacio para uno más',
      timestamp: new Date(),
      isPrivate: selectedUser !== null
    }
  ];

  const handleSendMessage = (content) => {
    // Here you would typically send the message to your backend
    console.log('Sending message:', {
      content,
      to: selectedUser?.email,
      isPrivate: selectedUser !== null
    });
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="bg-gray-800 rounded-lg overflow-hidden h-[calc(100vh-12rem)]">
        <div className="grid grid-cols-4 h-full">
          <div className="col-span-1 border-r border-gray-700">
            <UserList
              users={users}
              selectedUser={selectedUser}
              onSelectUser={setSelectedUser}
              currentUser={user}
            />
          </div>
          <div className="col-span-3 flex flex-col">
            <div className="p-4 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white">
                {selectedUser ? `Chat con ${selectedUser.name}` : 'Comunidad'}
              </h2>
            </div>
            <MessageList
              messages={messages}
              currentUser={user}
            />
            <MessageInput onSendMessage={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};