import React from 'react';
import { useEffect } from 'react';
import '../css/Login.css';
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

// document에 id를 알 경우 이렇게 getDoc사용해서 가져오면 됨.
// 그런데 지금은 id값을 랜덤으로 설정했기 때문에 where 함수를 이용해서 
// 이메일은 직접 정해준 고유 값이기 때문에 이 이메일이 지금 로그인 한 유저의 이메일과 비교해서
// 같은애를 찾아서 오게끔 설정
import { getDocs, where, query, collection } from 'firebase/firestore';
import { auth, db } from '../shared/firebase';
import { useNavigate } from 'react-router-dom';

// 1. input에 입력되는 로그인과 비밀번호 값을 ref으로 받아서 가져옴
// 2. 그 ref값을 로그인하기 버튼 온클릭에 넣어줌

function Login({ is_login, setIsLogin, setUserId }) {

    const nevigate = useNavigate();

    const id_ref = React.useRef(null);
    const pw_ref = React.useRef(null);

    // 유저 정보를 보기위해서 async await를 해준다(promiss 털어버리고 reserve된걸 받기위해서)
    const loginFB = async () => {
        // console.log(id_ref.current.value, pw_ref.current.value)
        try{
            const user = await signInWithEmailAndPassword(
                auth,
                id_ref.current.value,
                pw_ref.current.value
            );// user에 로그인 한 사용자 전부 받아오기
            console.log(user)
    
            // firestore에 있는 독스를 가져옴
            const user_docs = await getDocs( // getDoc()안에 query를 가져오는데 어느 데이터베이스에서 어떤 조건을 가지고 어떤 조건을 가져와라! 하는것
                // query 안에는 어떤 db, 어떤 컬렉션, 어떤 조건을 가져와야됨
                query(collection(db, "users"), where("user_id", "==", user.user.email)) //where 안에는 user가 갖고 있는 이메일하고 같으면 좋겠다는 조건
            );
            console.log(user_docs)
    
            user_docs.forEach((u) => {
                console.log(u.data());
            });
            setUserId(user.user.email)
            nevigate("/")
            window.alert("로그인 성공!")
        }
        catch(e){
            console.log(e)
            window.alert("로그인 정보를 확인해주세요")
        }
        
    }
    

    return (
        <div className="login">
            <div className='wrap'>
                <div className='title'>
                    <h1>로그인</h1>
                </div>
                <hr />
                <div className='login_id'>
                    <p>ID</p>
                    <input type="text" placeholder='아이디를 입력해주세요' ref={id_ref} />
                </div>
                <div className='login_pw'>
                    <p>PW</p>
                    <input type="password" placeholder='비밀번호를 입력해주세요' ref={pw_ref} />
                </div>
                <div className='login_btn'>
                    <button onClick={loginFB}>로그인 하기</button>
                </div>
            </div>
        </div>
    );
}

export default Login;
