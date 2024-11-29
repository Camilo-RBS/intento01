import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const MessageList = ({ messages, currentUser }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.sender === currentUser.email ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[70%] rounded-lg p-3 ${
              message.sender === currentUser.email
                ? 'bg-emerald-500 text-white'
                : 'bg-gray-700 text-white'
            }`}
          >
            <p className="text-sm">{message.content}</p>
            <p className="text-xs mt-1 opacity-75">
              {format(message.timestamp, 'HH:mm', { locale: es })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};