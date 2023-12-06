import "./init";
import React, { useEffect, useState } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";

export const Test = () => {
  const [notifications, setNotifications] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch("http://localhost:8888/getall/2"); //lessionId
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    const socket = new SockJS("http://localhost:8888/ws");
    const stomp = Stomp.over(socket);

    setStompClient(stomp);

    stomp.connect({}, () => {
      stomp.subscribe("/topic/notification/loc/2", (notification) => {
        const newNotification = JSON.parse(notification.body);

        // Kiểm tra xem newNotification đã tồn tại trong state hay chưa
        if (
          !notifications.some(
            (existingNotification) =>
              existingNotification.id === newNotification.id
          )
        ) {
          setNotifications((prevNotifications) => [
            ...prevNotifications,
            newNotification,
          ]);
        }
      });
    });

    fetchComments();

    return () => {
      if (stomp.connected) {
        stomp.disconnect();
      }
    };
  }, [notifications]); // Thêm notifications vào dependency để sử dụng giá trị mới nhất khi kiểm tra

  const sendMessage = () => {
    if (stompClient && stompClient.connected && newComment.trim() !== "") {
      const commentObject = {
        accountid: 2, // Thay thế bằng ID tài khoản thực tế
        // Thay thế bằng ID sản phẩm thực tế
        lessionid: 2, // Thay thế bằng ID bài học thực tế
        comment: newComment,
      };

      stompClient.send(
        "/app/sendNotification/2",
        {},
        JSON.stringify(commentObject)
      );
      setNewComment(""); // Xóa nội dung comment sau khi gửi
    } else {
      // Thử lại sau một khoảng thời gian hoặc hiển thị thông báo cho người dùng
    }
  };

  console.log(comments)
  return (
    <div>
      <h1>Comments</h1>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.comment}</li>
        ))}
      </ul>

      <div>
        <input
          type="text"
          placeholder="Enter your comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={sendMessage}>Send Message</button>
      </div>
    </div>
  );
};
