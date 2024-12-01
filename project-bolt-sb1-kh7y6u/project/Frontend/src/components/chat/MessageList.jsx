import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const MessageList = ({ messages, currentUser }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message._id}
          className={`flex ${message.sender._id === currentUser._id ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[70%] rounded-lg p-3 ${
              message.sender._id === currentUser._id
                ? 'bg-emerald-500 text-white'
                : 'bg-gray-700 text-white'
            }`}
          >
            <p className="text-sm font-medium mb-1">{message.sender.name}</p>
            <p className="text-sm">{message.content}</p>
            <p className="text-xs mt-1 opacity-75">
              {format(new Date(message.createdAt), 'HH:mm', { locale: es })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};