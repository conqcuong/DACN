import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
// import ChatBox from './ChatBox';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

export const Test3 = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);

    const [postData, setPostData] = useState({
        title: '',
        description: '',
        accountid: 1, // Thay đổi userId theo nhu cầu
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPostData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            console.log(postData);

            const response = await axios.post('http://localhost:9008/createStream', postData);
            if (response.data) {

                console.log('Data from server:', response.data);

                setPostData(response.data);
            }

            setLoading(false);
        } catch (error) {
            console.error('Error creating post:', error);
        }

    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Thay thế URL bằng URL thực tế của API bạn muốn lấy dữ liệu
                const response = await axios.get('http://localhost:9008/get-key');
                setData(response.data)

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);
  return (
    <div>
            <p>SecretKey:{data}</p>
            <form>
                <label>
                    Title:
                    <input type="text" name="title" value={postData.title} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Body:
                    <textarea name="description" value={postData.description} onChange={handleInputChange} />
                </label>
                <br />
                <ReactPlayer
                    url={`http://localhost:8080/hls/${data}.m3u8`}
                    controls={true}
                    playing={isPlaying}
                    width="40%"
                    height="auto"
                />
                <button type="button" onClick={handleSubmit}>
                    Create Post
                </button>
                {console.log(data)}

            </form>



            {/* <ChatBox /> */}
        </div>
  )
}
