import React, { useState, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';
import './css/chatroom.css'

const ChatRoom = ({ user, closeChatRoom }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [stompClient, setStompClient] = useState(null);
    const [crseq, setCrseq] = useState(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        axios.get(`/api/chat/chatroom/${user.userid}`)
        .then((res) => {
            if (res.status === 200) {
                setMessages(res.data);
                if (res.data.length > 0) {
                    setCrseq(res.data[0].chatroom.crseq);
                }
            }
        })
        .catch(err => console.error(err));

        const client = new Client({
            brokerURL: 'http://localhost:8070/ws',
            connectHeaders: {
                login: 'guest',
                passcode: 'guest',
            },
            onConnect: () => {
                client.subscribe(`/topic/chatroom/${crseq}`, (message) => {
                    const newMessage = JSON.parse(message.body);
                    setMessages((prevMessages) => [...prevMessages, newMessage]);
                });
            },
            onStompError: (frame) => {
                console.error('STOMP error:', frame);
            },
            webSocketFactory: () => new SockJS('http://localhost:8070/ws'),
        });

        setStompClient(client);
        client.activate();

        return () => client.deactivate();
    }, [crseq, user.userid]);

    const handleSendMessage = () => {
        if (message.trim() === '' || !crseq || !stompClient || !stompClient.connected) return;

        const newMessage = {
            type: "CHAT",
            senderType: "user",
            sender: user.userid, // 송신자 ID를 추가
            message: message.trim(),
            isRead: false,
            createdAt: formatDateToTimestamp(new Date()),
            chatroom: {
                crseq: crseq
            },
        };

        stompClient.publish({
            destination: `/app/chatroom/${crseq}/send`,
            body: JSON.stringify(newMessage),
        });

        // Admin 쪽에 알림 보내기
        stompClient.publish({
            destination: `/topic/admin/notifications`,
            body: JSON.stringify({ crseq, message: message.trim() }),
        });

        setMessage('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const formatDateToTimestamp = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    return (
        <div className="chatroom-container">
            <div className="chatroom-header">
                <h3>채팅방</h3>
                <button onClick={closeChatRoom} className="chatroom-close-button">X</button>
            </div>
            <div className="chatroom-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`chatroom-message ${msg.senderType === 'admin' ? 'admin' : 'user'}`}>
                        {msg.message}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="chatroom-input">
                <input 
                    type="text" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    placeholder="메시지를 입력하세요..." 
                    onKeyPress={handleKeyPress}
                />
                <button onClick={handleSendMessage} className="send-button">전송</button>
            </div>
        </div>
    );    
}

export default ChatRoom;
