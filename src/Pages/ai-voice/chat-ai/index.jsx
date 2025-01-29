import React, { useState } from 'react';
import { FiSend, FiRefreshCw } from 'react-icons/fi';

const ChatComponent = () => {
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Hello! 😊 How can I assist you today?' },
        { sender: 'bot', text: 'Are you interested in learning more about vitefire products and services?' },
    ]);
    const [input, setInput] = useState('');

    const handleSendMessage = () => {
        if (input.trim() === '') return;

        setMessages([...messages, { sender: 'user', text: input }]);
        setInput('');
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { sender: 'bot', text: 'Thank you for your query! I will get back to you shortly.' },
            ]);
        }, 1000);
    };

    return (
        <div className="flex flex-col h-screen max-w-md mx-auto  text-white rounded-sm shadow-lg">
            <div className="flex items-center justify-between p-4 bg-gray-100 rounded-t-lg">
                <div className="flex items-center text-slate-700 space-x-3">
                    <img
                        src="https://i.pravatar.cc/150?img=40"
                        alt="SP"
                        className="w-10 h-10 rounded-full"
                    />
                    <div>
                        <h3 className="text-sm font-semibold text-gray-800">Santosh</h3>
                        <p className="text-xs text-green-700">Online with AI</p>
                    </div>
                </div>
                <button>
                    <FiRefreshCw className="text-white  p-2 bg-blue-500 rounded-full hover:bg-blue-800" size={35} />
                </button>
            </div>

            <div className="flex-1 p-2 space-y-4 overflow-y-auto">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`p-3 rounded-lg ${
                                message.sender === 'user'
                                    ? 'bg-purple-100 text-slate-600'
                                    : 'bg-indigo-100 text-slate-600'
                            }`}
                        >
                            {message.text}
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 bg-stone-100 rounded-b-sm">
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        placeholder="Type your message here"
                        className="flex-1 px-3 py-2 text-sm text-stone-700 bg-stone-200 text-white rounded-lg focus:outline-none"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <button
                        onClick={handleSendMessage}
                        className="p-2 bg-blue-500 rounded-full hover:bg-blue-600"
                    >
                        <FiSend size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatComponent;
