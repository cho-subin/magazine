import React from 'react';
import '../css/Main.css';
import AddBtn from './AddBtn';
import { useNavigate } from 'react-router-dom';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../shared/firebase';

function Main({ setBoardArray, boardArray, userId }) {
    const navegate = useNavigate();
    console.log(boardArray);

    function ConversionTime(timestamp) {
        var date = new Date(timestamp);
        var year = date.getFullYear().toString(); //년도 뒤에 두자리
        var month = ("0" + (date.getMonth() + 1)).slice(-2); //월 2자리 (01, 02 ... 12)
        var day = ("0" + date.getDate()).slice(-2); //일 2자리 (01, 02 ... 31)
        var hour = ("0" + date.getHours()).slice(-2); //시 2자리 (00, 01 ... 23)
        var minute = ("0" + date.getMinutes()).slice(-2); //분 2자리 (00, 01 ... 59)
        var second = ("0" + date.getSeconds()).slice(-2); //초 2자리 (00, 01 ... 59)
        return year + "년 " + month + "월 " + day + "일 " + hour + ":" + minute + ":" + second
    }

    function delcards(boardkey) {
        return async () => {
            console.log(boardkey)
            const docRef = await doc(db, "boards", boardkey);
            await deleteDoc(docRef);
            // dispatch({ type: "WORD/DEL_WORD", payload: { id } });
            alert("삭제되었습니다!")
            window.location.reload(); // 강제새로고침
        };
    }


    return (
        <div className="main">
            {boardArray.map((card) => {
                if (card.layout_click === "right") {
                    return (
                        <div className="addpage1">
                            <div className='wrap1'>
                                <div className='wrap_up1'>
                                    <div className='user_id'>{card.userId}</div>
                                    <div className='user_img1'></div>
                                    <div className='date1'>{ConversionTime(card.write_date)}</div>
                                    <div><button onClick={delcards(card.boardkey)}>삭제</button></div>
                                </div>
                                <div className='wrap_down1'>
                                    <div className='uplode_img1'>
                                        <img src={card.image_url} alt='' />
                                    </div>
                                    <div className='uplode_text1'>
                                        <p>{card.text}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                else if (card.layout_click === "left") {
                    return (
                        <div className="addpage2">
                            <div className='wrap2'>
                                <div className='wrap_up2'>
                                    <div className='user_id'>{card.userId}</div>
                                    <div className='user_img2'></div>
                                    <div className='date1'>{ConversionTime(card.write_date)}</div>
                                    <div><button onClick={delcards(card.boardkey)}>삭제</button></div>
                                </div>
                                <div className='wrap_down2'>
                                    <div className='uplode_text2'>
                                        <p>{card.text}</p>
                                    </div>
                                    <div className='uplode_img2'>
                                        <img src={card.image_url} alt='' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                else if (card.layout_click === "bottom") {
                    return (
                        <div className="addpage3">
                            <div className='wrap3'>
                                <div className='wrap_up3'>
                                    <div className='user_img3'>{card.userId}</div>
                                    <div className='date3'>{ConversionTime(card.write_date)}</div>
                                    <div><button onClick={delcards(card.boardkey)}>삭제</button></div>
                                </div>
                                <div className='wrap_down3'>
                                    <div className='uplode_img3'>
                                        <img src={card.image_url} alt='' />
                                    </div>
                                    <div className='uplode_text3'>
                                        <p>{card.text}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                return;
            })}
            <div className='div_2' onClick={() => { navegate("/write"); }}>
                <AddBtn />
            </div>
        </div>
    );
}

export default Main;
