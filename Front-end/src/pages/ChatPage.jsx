import React, { useEffect, useState } from 'react';
import { ChatList } from '../components/chat/ChatList'
import { ChatContent } from '../components/chat/ChatContent'

export const ChatPage = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    useEffect(() => {
        // Ngăn chặn cuộn trang
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        // Xóa lệnh cuộn trang khi component unmount
        return () => {
            document.documentElement.style.overflow = 'unset';
            document.body.style.overflow = 'unset';
        };
    }, []);
  return (
    <>
        <div className='flex h-screen'>
            <ChatList setSelectedItem={setSelectedItem} />
            {selectedItem !== null && (
                <ChatContent selectedItem={selectedItem} />
            )}
        </div>
    </>
  )
}
