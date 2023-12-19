import React, { useRef, useState, useEffect } from "react";
import { resultInialState } from "../static/data";
// import { AnswerTimes } from "../components/quiz/AnswerTimes";
import logo from "../assets/imgs/f8-icon.png";
import { FaChevronLeft, FaChevronRight, FaBars, FaArrowRight, FaComments, FaXmark } from 'react-icons/fa6'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { Comment } from "../components/layout/Comment";
import { format } from 'date-fns';

export const QuizPage = () => {
    // Get Data
    const [data, setData] = useState([]);
    const [questions, setQuestions] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8889/Answer/GetLession/5/10')
            .then(res => res.json())
            .then(data => {
                setQuestions(data);
            })
            .catch(err => console.log(err));
    }, []);
    console.log()
    // Gửi Data
    const sendAnswerToAPI = (data) => {
        const jsonData = JSON.stringify(data);
        console.log(jsonData);
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
                body: jsonData
        };
      
        fetch('http://localhost:8889/Answer/Edit/10', requestOptions)
            .then(response => {
                if (response.ok) {
                    // Xử lý khi yêu cầu thành công
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
          .then(data => {
                // Xử lý dữ liệu trả về (nếu có)
                console.log('Response data:', data);
                setUserAnswers([]);
            })
          .catch(error => {
                // Xử lý lỗi khi gửi yêu cầu
                console.error('Error:', error);
            });
    };
    //

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answerIdx, setAnswerIdx] = useState(null);
    const [choice, setChoice] = useState(null);
    const [result, setResult] = useState(resultInialState);
    const [showResult, setShowResult] = useState(false);
    const [showAnswerTimer, setShowAnswerTimer] = useState(true);
    const [inputAnswer, setInputAnswer] = useState('')
    const [answer, setAnswer] = useState(null);
    //Trích xuất các thông tin cần thiết
    const { question, choices, correctAnswer, type } = questions.length > 0 ? questions[currentQuestion] : {};
    const [userAnswers, setUserAnswers] = useState([]);
    // console.log(userAnswers)
    const [sendingAnswers, setSendingAnswers] = useState(false);
    //Xử lý khi người dùng chọn đáp án
    console.log(userAnswers)
    
    const onAnwswerClick = (choice, index) => {
        setAnswer(choice)
        setAnswerIdx(index);
        if (choice === correctAnswer) {
            setChoice(true);
        } else {
            setChoice(false);
        }
    };
    
    // console.log(currentQuestion)
    const onClickNext = (finalAnswer) => {
        setAnswerIdx(null);
        setShowAnswerTimer(false);
        const userAnswerObj ={
            id: questions[currentQuestion].id,
            accountid: 5, // Change this value according to your logic
            quizid: questions[currentQuestion].quizid,
            answer: answer,
            result: choice ? 1 : 0,
            lessionid: questions[currentQuestion].lessionid,
            productid: questions[currentQuestion].productid,
            question: questions[currentQuestion].question,
            choiceone: questions[currentQuestion].choiceone,
            choicetwo: questions[currentQuestion].choicetwo,
            choicethree: questions[currentQuestion].choicethree,
            choicefour: questions[currentQuestion].choicefour,
            correctAnswer: questions[currentQuestion].correctAnswer,
        }
        setUserAnswers((prevAnswers) => [...prevAnswers, userAnswerObj]);
        setResult((prev) =>
        // 
            finalAnswer
            ? {
                ...prev,
                score: prev.score + 5,
                correctAnswers: prev.correctAnswers + 1,
            }
            : {
                ...prev,
                wrongAnswers: prev.wrongAnswers + 1,
            }
        );
        if (currentQuestion !== questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        } else {
            setCurrentQuestion(0);
            setShowResult(true);
            setSendingAnswers(true); 
        }
        
        setTimeout(() => {
            setShowAnswerTimer(true);
        })
    };

    useEffect(() => {
        if (sendingAnswers && userAnswers.length > 0) {
            sendAnswerToAPI(userAnswers);
            setSendingAnswers(false); // Đặt lại trạng thái của biến sau khi gửi dữ liệu
        }
    }, [sendingAnswers, userAnswers]);

    const onTryAgain = () => {
        setResult(resultInialState);
        setShowResult(false);
    };

    //Set time
    const handleTimeUp = () => {
        // alert('time is up!');
        setChoice(false);
        onClickNext(false);
    }

    

    const handleInputChange = (e) => {
        setInputAnswer(e.target.value);
        if(e.target.value === correctAnswer){
            setChoice(true);
        } else{
            setChoice(false);
        }
    }

    const getAnswerUI = () => {
        if (type === 'FIB') {
            return (
                <input value={inputAnswer} onChange={handleInputChange} />
            );
        }
        if (
            questions.length > 0 &&
            questions[currentQuestion].hasOwnProperty('choiceone') &&
            questions[currentQuestion].hasOwnProperty('choicetwo') &&
            questions[currentQuestion].hasOwnProperty('choicethree') &&
            questions[currentQuestion].hasOwnProperty('choicefour')
        ) {
            return (
                <ul>
                    <li onClick={() => onAnwswerClick(questions[currentQuestion].choiceone, 0)} key={questions   [currentQuestion].choiceone} className={answerIdx === 0 ? 'selected-choice' : null}>
                        {questions[currentQuestion].choiceone}
                    </li>
                    <li onClick={() => onAnwswerClick(questions[currentQuestion].choicetwo, 1)} key={questions[currentQuestion].choicetwo} className={answerIdx === 1 ? 'selected-choice' : null}>
                        {questions[currentQuestion].choicetwo}
                    </li>
                    <li onClick={() => onAnwswerClick(questions[currentQuestion].choicethree, 2)} key={questions[currentQuestion].choicethree} className={answerIdx === 2 ? 'selected-choice' : null}>
                        {questions[currentQuestion].choicethree}
                    </li>
                    <li onClick={() => onAnwswerClick(questions[currentQuestion].choicefour, 3)} key={questions[currentQuestion].choicefour} className={answerIdx === 3 ? 'selected-choice' : null}>
                        {questions[currentQuestion].choicefour}
                    </li>
                </ul>
            );
        } else {
            return null; // Trả về giá trị mặc định hoặc thông báo lỗi tùy theo logic của bạn
        }
    };

  return (
    <>
        <section className="page-container">
            <div className='flex items-center bg-[#29303b] relative z-1 h-[50px]'>
                <div className='flex cursor-pointer h-[50px] w-[60px] transition-background-color duration-200 ease-linear'><Link to='/'><FaChevronLeft className='mx-[25px] my-[17px] text-white'/></Link></div>
                <Link className='ml-2 relative sm:hidden' to='/'><img className='h-[30px] rounded-lg' src={logo}/></Link>
                <div className='text-14px font-bold text-white ml-4 sm:ml-0'>Giới thiệu</div>
            </div>
            <div className="content-quiz">
                <div className="content_wrapper">
                    <div className="quiz-container">
                        {!showResult ? (
                            <>
                                {/* {showAnswerTimer &&(
                                    <AnswerTimes duration={10} onTimeUp={handleTimeUp}/>
                                )}   */}
                                <span className="active-question-no">{currentQuestion + 1}</span>
                                <span className="active-question">/{questions.length}</span>
                                {/* Câu hỏi */}
                                <h2>{question}</h2>
                                {/* Các lựa chọn */}
                                {getAnswerUI()}
                                <div className="quiz-footer">
                                    <button onClick={() => onClickNext(choice)} disabled={answerIdx === null && !inputAnswer}>
                                        {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="result">
                                <h3>Result</h3>
                                <p>Total Questions: <span>{questions.length}</span></p>
                                <p>Total Score: <span>{result.score}</span></p>
                                <p>Correct Answers: <span>{result.correctAnswers}</span></p>
                                <p>Wrong Answers: <span>{result.wrongAnswers}</span></p>
                                <button onClick={onTryAgain}>Try again</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className='quiz-title'>
                <h1 className='text-[28px] font-semibold'>Bài kiểm tra trắc nghiệm</h1>
                <p className='text-13px mt-3'>Cập nhật 23/10/2023</p>
            </div>
            <div className='flex items-center lg:justify-center z-2 bg-[#f0f0f0] lg:h-[50px] bottom-0 shadow-[rgba(0,0,0,.1)] left-0 fixed right-0 h-[60px] justify-end'>
                <button className='flex rounded-md text-[#404040] text-14px font-semibold px-3 py-2 duration-300 ease-in-out items-center md:mr-4 md:p-2.5'>
                    <FaChevronLeft/>
                    <span className='rounded-md text-[#404040] font-semibold px-3 py-2'>BÀI TRƯỚC</span>
                </button>
                <button  className='flex rounded-md text-[#404040] text-14px font-semibold px-3 py-2 duration-300 ease-in-out items-center ml-3 md:mr-4 md:p-2.5'>
                    <span className='rounded-md text-[#404040] font-semibold px-3 py-2' >BÀI TIẾP THEO</span>
                    <FaChevronRight/>
                </button>
            </div>
        </section>
    </>
  )
}
