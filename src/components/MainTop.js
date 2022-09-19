import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/MainTop.css';
import LoginBtn from './LoginBtn';
import SignUpBtn from './SignUpBtn ';

// font-awesome 사용방법
// 장점 : 폰트 속성 적용하듯 css로 손쉽게 색, 크기를 변경할 수 있으며 절대로 깨지지 않는다.
// https://jae04099.tistory.com/entry/React-%EB%A6%AC%EC%95%A1%ED%8A%B8%EC%97%90-font-awesome-%EC%95%84%EC%9D%B4%EC%BD%98-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import LogOutBtn from './LogOutBtn';

import {signOut} from "firebase/auth";
import {auth} from "../shared/firebase";

function MainTop({is_login, setIsLogin}) {

    const nevigate = useNavigate();

    console.log(is_login)

    return (
        <div className="main_top">
            <div className='home' onClick={() => { nevigate("/") }}>
                <FontAwesomeIcon icon={faHouse} className="house" />
            </div>
            <div className='btns'>
                {is_login ?( // cookie로 하려면 get으로 document.cookie로 토큰을 가져와서 여기서 빼내는거 고민
                    <div className='btn3' onClick={() => {signOut(auth);}}> {/* 로그아웃되게 설정 */}
                        <LogOutBtn />
                    </div>
                ) : (
                    <>
                        <div className='btn1' onClick={() => { nevigate("/login") }}>
                            <LoginBtn />
                        </div>
                        <div className='btn2' onClick={() => { nevigate("/signup") }}>
                            <SignUpBtn />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default MainTop;
