import React from 'react';
import '../css/SignUp.css';
import { auth, db } from "../shared/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

function SignUp() {

  //ref로 input 값들을 받아오기
  const id_ref = React.useRef(null);
  const name_ref = React.useRef(null);
  const pw_ref = React.useRef(null);
  // const file_link_ref = React.useRef(null);

  const signupFB = async () => {
    // 값이 전부 멀쩡해! -> 벨리데이션
    // 만약에 id_ref의 커런트 값이 빈값이면 실패를 리턴해서 함수가 실행되지않게 해서 오류 막기
    // if(id_ref.current.value === ""){
    //   return false;
    // }

    const user = await createUserWithEmailAndPassword(
      auth,
      id_ref.current.value, // "perl@dev12.com",
      pw_ref.current.value  // "devdev123"
    );
    console.log(user);

    // addDoc(콜렉션 어디 콜렉션에 저장할거야!, 넣을 데이터!)
    // 위에서 넘어온 UserCredentialImpl는 user이라는 변수안에 들어가는 값이기 때문에
    // user_id에 user의 email값을 넣어주기 위해서는
    // user.user.email로 user의 email db가 있는 경로를 넣어준다.
    const user_doc = await addDoc(collection(db, "users"), {
      user_id: user.user?.email, // .user? : 옵셔널체이닝(뒤에 값 없을때 오류 안나고 undefined로 들어가게 해줌)
      name: name_ref.current?.value,
      // image_url: file_link_ref?.current.url
    });

    console.log(user_doc.id)
  }

  return (
    <div className="SignUp">
      <div className='wrap'>
        <div className='title'>
          <h1>회원가입</h1>
        </div>
        <hr />
        <div className='signup_id'>
          <p>아이디(이메일)</p>
          <input type="text" placeholder=' 아이디를 입력해주세요' ref={id_ref} />
        </div>
        <div className='signup_name'>
          <p>닉네임</p>
          <input type="text" placeholder=' 닉네임을 입력해주세요' ref={name_ref} />
        </div>
        <div className='signup_pw'>
          <p>비밀번호</p>
          <input type="password" placeholder=' 비밀번호를 입력해주세요' ref={pw_ref} />
        </div>
        <div className='signup_btn'>
          <button onClick={signupFB}>회원가입 하기</button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
