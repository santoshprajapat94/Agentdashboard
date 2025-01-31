import { CircularProgress, IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';

const ChatComponent = () => {
    const [loading ,setLoading] = useState(false)
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Hello! 😊 How can I assist you today?' },
        { sender: 'bot', text: 'Are you interested in learning more about EHR lOGIC products and services?' },
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
        <div className="flex flex-col h-[calc(100vh-80px)] max-w-md mx-auto  text-white rounded-sm shadow-lg">
            <div className="flex items-center justify-between p-4 bg-gray-100 rounded-t-lg shadow-lg">
                <div className="flex items-center text-slate-700 space-x-3">
                    <img
                        src="https://i.pravatar.cc/150?img=3"
                        alt="SP"
                        className="w-10 h-10 rounded-full border-2 border-indigo-500"
                    />
                    <div>
                        <h3 className="text-sm font-semibold text-gray-800">Chat With AI</h3>
                        <p className="text-xs" style={{color:'#12bcab',textAlign:'left'}}>Online</p>
                    </div>
                </div>
                <IconButton
                    sx={{
                        padding: '0.5rem',
                        background: '#1e293b',
                        color: '#fff',
                        transition: 'background 0.3s ease, color 0.3s ease',
                        '&:hover': {
                        background: '#334155', 
                        color: '#e2e8f0', 
                        },
                    }}
                    >
  {loading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : <ChatIcon />}
</IconButton>

            </div>

            <div className="flex-1 p-2 space-y-4 overflow-y-auto">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                        className={`p-2 rounded-lg text-slate-600 ${message.sender === 'user' ? 'bg-slate-100': 'bg-zinc-200'}`}>
                            {message.text}
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 bg-gray-100 rounded-b-sm shadow-lg">
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        placeholder="Type your message here"
                        className="flex-1 px-3 py-2 text-sm text-stone-700 bg-stone-200 text-white rounded-lg focus:outline-none"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <IconButton
                        sx={{
                            backgroundColor: '#1e293b',
                            padding:'0.5rem',
                            color: '#fff', 
                            transition: 'background 0.3s ease, color 0.3s ease',
                            '&:hover': {
                            background: '#334155', 
                            color: '#e2e8f0', 
                            },
                        }}
                        type="submit"
                    >
                        <FiSend size={20} />
                    </IconButton>
                </div>
            </div>
        </div>
    );
};

export default ChatComponent;
