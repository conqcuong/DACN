import "../../static/init";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { getAllUsers } from "../../redux/apiRequest";

var stompClient = null;
export const ChatContent = ({ selectedItem }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.listUsers);
  const [selectedItemContent, setSelectedItemContent] = useState(null);
  const [privateChats, setPrivateChats] = useState(new Map());
  const [publicChats, setPublicChats] = useState([]);
  const [tab, setTab] = useState("CHATROOM");
  const user = useSelector((state) => state.auth.login.currentUser);
  const userId = user?.id;
  const userName = user?.fullname;
  const [courseId, setCourseId] = useState(null);
  const [userData, setUserData] = useState({
    username: userName || "",
    receivername: "",
    accountid: userId || null,
    productid: null,
    connected: false,
    message: "",
  });

  useEffect(() => {
    if (selectedItem) {
      setSelectedItemContent(selectedItem);
  
      // Xác định courseId từ selectedItem nếu có giá trị và chứa id
      const courseId = selectedItem.id || null;
      const courseIdFromSelectedItem = selectedItem.id || null;
      setCourseId(courseIdFromSelectedItem);
      // Cập nhật productid trong userData khi chọn selectedItem
      setUserData((prevUserData) => ({
        ...prevUserData,
        productid: courseId,
      }));
    }
  }, [selectedItem]);
  
  useEffect(() => {
    if (courseId) {
  
      const fetchComments = async () => {
        try {
          // Sử dụng courseId được xác định để fetch data
          const response = await fetch(
            `http://localhost:9005/getall/${courseId}`
          );
          await getAllUsers(dispatch);
          const data = await response.json();
          setPublicChats(data);
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
      };
  
      fetchComments();
      connect();
      return () => {
        disconnect();
      };
    }
  }, [courseId, dispatch]);
  
  // const scrollToBottom = () => {
  //     messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  //   };
  //   React.useEffect(() => {
  //     scrollToBottom();
  //   }, [chat]); // Thực hiện scroll khi có thay đổi trong chat

  // console.log(userData);
  const connect = () => {
    let Sock = new SockJS("http://localhost:9005/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);

  };

  const disconnect = () => {
    if (stompClient) {
      stompClient.disconnect(() => {
        console.log("Disconnected");
      });
    }
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe(`/chatroom/public/${courseId}`, onMessageReceived);
    console.log(courseId + "connect");
    userJoin();
  };

  const userJoin = () => {
    var chatMessage = {
      senderName: userData.username,
      status: "JOIN",
    };
    stompClient.send(`/app/message/${selectedItemContent}`, {}, JSON.stringify(chatMessage));
  };

  const onMessageReceived = (payload) => {
    var payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
      case "JOIN":
        if (!privateChats.get(payloadData.senderName)) {
          setPrivateChats((prevPrivateChats) => {
            const newPrivateChats = new Map(prevPrivateChats);
            newPrivateChats.set(payloadData.senderName, []);
            return newPrivateChats;
          });
        }
        break;
      case "MESSAGE":
        setPublicChats((prevPublicChats) => [...prevPublicChats, payloadData]);
        break;
      default:
        break;
    }
  };


  const onError = (err) => {
    console.log(err);
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const sendValue = () => {
    if (stompClient) {
      var chatMessage = {
        senderName: userData.username,
        message: userData.message,
        accountid: userId,
        productid: courseId, // Thiết lập productid từ state
        status: "MESSAGE",
      };
      console.log(courseId + "loc");
      stompClient.send(`/app/message/${courseId}`, {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  return (
    <>
      <div className="w-full">
        {selectedItemContent ? (
          // Hiển thị nội dung tương ứng với selectedItem
          <div className="w-full">
            {/* Header chat */}
            <div className="px-10 pb-5 pt-7 w-full border-b border-1 border-gray-200 bg-[#f4f3f8]">
              <div className="flex">
                <div className="w-[40px] h-[40px] rounded-full mr-5 relative">
                  <div className="overflow-hidden rounded-full w-full h-full ">
                    <img
                      className="w-full h-full object-cover"
                      src={selectedItemContent.apiimage}
                    />
                  </div>
                </div>
                <p className="font-semibold">{selectedItemContent.name}</p>
              </div>
            </div>
            {/* Phần Content Body */}
            <div className="content__body">
              <div className="chat__items pl-10 mt-3">
                {tab === "CHATROOM" ? (
                  // Hiển thị tin nhắn từ publicChats nếu tab là "CHATROOM"
                  <>
                    {publicChats.map((item, index) => {
                      const user = users.find(
                        (user) => user.id === item.accountid
                      );
                      if (user) {
                        return (
                          <div
                            key={item.id}
                            className={`chat__item ${item.senderName === userData.username
                              ? "self"
                              : "other"
                              }`}
                          >
                            <div className="chat__item__content">
                              <div className="text-11px font-semibold user__name">
                                {user.fullname}
                              </div>
                              <div className="chat__msg">{item.message}</div>
                            </div>
                            <div className="w-10 h-10 rounded-full mr-5 relative">
                              <div className="overflow-hidden rounded-full w-full h-full">
                                <img
                                  className="max-w-full object-cover"
                                  src={user.avaterimage}
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </>
                ) : (
                  // Hiển thị tin nhắn từ privateChats nếu tab là người dùng cụ thể
                  <div></div>
                )}
              </div>
            </div>
            {/* Footer Chat */}
            <div className="flex z-2 fixed bottom-0 w-[1200px] mb-3">
              <form className="w-full">
                <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 w-full">
                  <textarea
                    type="text"
                    value={userData.message}
                    onChange={handleMessage}
                    id="chat"
                    rows="2"
                    className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your message..."
                  ></textarea>
                  <button
                    onClick={sendValue}
                    type="button"
                    className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-10"
                  >
                    <svg
                      className="w-5 h-5 rotate-90 rtl:-rotate-90"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 20"
                    >
                      <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                    </svg>
                    <span className="sr-only">Send message</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          // Hiển thị một thông báo nếu không có mục nào được chọn
          <p>Please select an item from the list</p>
        )}
      </div>
    </>
  );
};
