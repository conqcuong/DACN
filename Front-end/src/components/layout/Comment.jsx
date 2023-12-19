import "../../static/init";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import showToast from "../../redux/showToast";
import { useParams } from "react-router-dom";
import { getAllUsers, getAllCmts } from "../../redux/apiRequest";
import Stomp from "stompjs";
import SockJS from "sockjs-client";

export const Comment = () => {
  const [notifications, setNotifications] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [filterData, setFilterData] = useState([]);
  const { id } = useParams();
  const lessonId = parseInt(id);
  /**/
  const dispatch = useDispatch();
  const cmts = useSelector((state) => state.comment.listComments);
  const filteredLessonIds = cmts.filter((item) => item.lessionid === lessonId);
  const users = useSelector((state) => state.user.listUsers);
  console.log()
  console.log(filterData);
  // console.log(users);
  useEffect(() => {
    //
    const fetchData = async () => {
      try {
        await getAllUsers(dispatch);
        await getAllCmts(dispatch);
        // const response = await fetch("http://localhost:8888/getall");
        //     if (!response.ok) {
        //         throw new Error('Network response was not ok.');
        //     }
        //     const data = await response.json();
        //     setFilterData(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();

    const socket = new SockJS("http://localhost:8888/ws");
    const stomp = Stomp.over(socket);
    setStompClient(stomp);
    stomp.connect({}, () => {
      stomp.subscribe(`/topic/notification/loc/` + lessonId, (notification) => {
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

    return () => {
      if (stomp.connected) {
        stomp.disconnect();
      }
    };
  }, [dispatch, notifications]);
  const user = useSelector((state) => state.auth.login.currentUser); //
  const userId = user?.id; // Lấy id user

  const sendMessage = () => {
    if (stompClient && stompClient.connected && newComment.trim() !== "") {
      const commentObject = {
        accountid: userId, // Thay thế bằng ID tài khoản thực tế
        lessionid: id, // Thay thế bằng ID bài học thực tế
        comment: newComment,
      };

      stompClient.send(
        `/app/sendNotification/` + lessonId,
        {},
        JSON.stringify(commentObject)
      );
      setNewComment(""); // Xóa nội dung comment sau khi gửi
    } else {
      // Thử lại sau một khoảng thời gian hoặc hiển thị thông báo cho người dùng
    }
  };

  return (
    <>
      <div className="cmt_body">
        <div className="cmt_detail">
          <div className="cmt_contentHeading">
            <div>
              <h4>1 hỏi đáp</h4>
              <p className="cmt_help my-3">
                (Nếu thấy bình luận spam, các bạn bấm report giúp admin nhé)
              </p>
            </div>
          </div>
          <div className="cmtBox_cmtWrapper">
            <div className="cmtBox_avt">
              <div className="w-[40px] h-[40px] rounded-full mr-5 relative">
                <div className="overflow-hidden rounded-full w-full h-full">
                  <img src={user.avaterimage} />
                </div>
              </div>
            </div>
            <div className="cmtBox_cmtContent">
              <div className="flex flex-wrap">
                <textarea
                  id="message"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Bạn có thắc mắc gì trong khóa học này"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                ></textarea>
                <button
                  onClick={sendMessage}
                  className="mt-4 ml-auto text-14px px-4 py-2.5 bg-primary-colorrounded-2xl"
                >
                  Bình luận
                </button>
              </div>
            </div>
          </div>
          {filteredLessonIds.map((item) => {
            const user = users.find((user) => user.id === item.accountid);
            if (user) {
              return (
                <div className="cmt_detail_comment" key={item.id}>
                  <div className="shrink-0">
                    <div className="fallbackavt">
                      <img
                        className="object-cover rounded-full w-[37.79px]"
                        src={user.avaterimage}
                        alt="User avaterimage"
                      />
                    </div>
                  </div>
                  <div className="cmt_cmtBody">
                    <div className="relative">
                      <div className="inline-block max-w-full">
                        <div className="cmt_cmtContent max-w-[500px] min-w-[400px] sm:min-w-[280px]">
                          <div className="flex items-center justify-between">
                            <span className="text-black inline-block text-14px font-semibold">
                              {user.fullname}
                            </span>
                          </div>
                          <div className="cmt_Comentext">
                            <div className="mt-2 font-normal text-[#292929] text-14px break-words leading-7">
                              <p className="font-normal mt-1.5">
                                {item.comment}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};
