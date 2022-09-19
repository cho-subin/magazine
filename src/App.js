import React, { useEffect } from 'react';
import {Route, Routes, BrowserRouter} from 'react-router-dom';

import {auth,db} from "./shared/firebase";
import { onAuthStateChanged} from "firebase/auth";
import {collection, getDocs} from "firebase/firestore";

import MainTop from './components/MainTop.js';
import Main from './components/Main.js';
import Login from './components/Login.js';
import SignUp from './components/SignUp.js';
import AddPage1 from './components/AddPage1.js';
import AddPage2 from './components/AddPage2.js';
import AddPage3 from './components/AddPage3.js';
import Write from './components/Write.js';
import './App.css';


function App() {

  const [userId,setUserId] = React.useState(null);

  // 로그인 기본값은 로그인 안되있는 상태로 고정..  
  const [is_login, setIsLogin] = React.useState(false);

  const [boardArray, setBoardArray] = React.useState([]);

  console.log(boardArray);

  // 로그인 상태 확인
  console.log(auth.currentUser);

  // 로그인 상태 확인 후 로그인이 true인지 false인지 useEffect로 결정해줘야됨.(사이드 이펙트 관리)
  const loginCheck = async (user) => { // 유저를 가지고 와서 
      if (user) { // 만약에 유저가 있다면?
          setIsLogin(true); // useState의 setIsLogin값을 true로 바꿔준다.
          setUserId(user.email)
      }
      else { // 만약에 유저가 없다면?
          setIsLogin(false); // useState의 setIsLogin값을 false로 바꿔준다.
          setUserId(null)
      }
  };

  React.useEffect(() => { // useEffect는 main함수에서만 작동함
      onAuthStateChanged(auth, loginCheck);
  }, []);

  // React.useEffect(async()=>{
  //   const BoardsData = await getDocs(collection(db, "boards"));
  //       console.log(BoardsData)

  //       let BoardsList = []; // 1. dictionary_list라는 빈 배열을 만들어서
  //       BoardsData.forEach((doc) => { // 2. 배열형태로 데이터 나오게끔 설정
  //           // console.log(doc.data());
  //           BoardsList.push({ ...doc.data() }); // doc.data 안에 있는 모든것을 넣어준다.
  //       }); // getDocsfh 긁어온 파이어베이스 컬렉션값을 담은 dictionary_data로 forEach()를 이용해서 데이터 가져옴
  //       console.log(BoardsList)
  // },[])

  React.useEffect(() => {
    async function BoardsDatas() {
      const BoardData = await getDocs(collection(db, "boards"));
      // const response = await MyAPI.getData(someId);
      // // ...
      let BoardsList = [];
      BoardData.forEach((doc) => {
        BoardsList.push({ boardkey: doc.id, ...doc.data() });
      });
      setBoardArray(BoardsList);
      console.log(BoardsList)
    }
    BoardsDatas();
  }, []); // Or [] if effect doesn't need props or state

  
  
  return (
    <div className="App">
      <BrowserRouter>
        <MainTop is_login = {is_login} setIsLogin = {setIsLogin}/>
        <Routes>
          <Route exact path="/" element={<Main userId = {userId} boardArray = {boardArray} setBoardArray = {setBoardArray}/>}/>
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/login" element={<Login is_login = {is_login} setIsLogin = {setIsLogin} setUserId={setUserId} />}/>
          <Route exact path="/write" element={<Write userId = {userId} boardArray = {boardArray} setBoardArray = {setBoardArray}/>}/>
          <Route exact path="/addpage1" element={<AddPage1/>}/>
          <Route exact path="/addpage2" element={<AddPage2/>}/>
          <Route exact path="/addpage3" element={<AddPage3/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
