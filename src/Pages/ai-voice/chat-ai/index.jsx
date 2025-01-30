import { Cached } from '@mui/icons-material';
import { CircularProgress, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { FiSend, FiRefreshCw } from 'react-icons/fi';

const ChatComponent = () => {
    const [loading ,setLoading] = useState(false)
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
    const bgcolor1 = {
        background: 'linear-gradient(98.28deg, #D7E3F6 0.4%, #F0F3F5 100%)'
      };
      
      const bgcolor2 = {
        background: 'linear-gradient(98.28deg, #EDD9EE 0.4%, #F0F3F5 100%)'
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
                        <p className="text-xs" style={{color:'#12bcab'}}>Online with AI</p>
                    </div>
                </div>
                <IconButton
                  sx={{
                    background: 'linear-gradient(90deg,#214f89,#12bcab)',
                    borderRadius: '4px',
                    color: '#fff',
                    height: '22px',
                    width: '22px',
                    padding: 0
                  }}
                >
                  {loading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : <Cached />}
                </IconButton>
            </div>

            <div className="flex-1 p-2 space-y-4 overflow-y-auto">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
className="p-3 rounded-lg text-slate-600"
style={message.sender === 'user' ? bgcolor1 : bgcolor2}
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
                    <IconButton
                     sx={{
                        background: 'linear-gradient(90deg,#214f89,#12bcab)',
                        borderRadius: '4px',
                        padding:'4px',
                        color: '#fff',
                        height: '32px',
                        width: '32px',
                        
                      }}
                        onClick={handleSendMessage}
                    >
                        <FiSend size={18} />
                    </IconButton>
                </div>
            </div>
        </div>
    );
};

export default ChatComponent;
