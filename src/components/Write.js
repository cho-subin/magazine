import React, { useState } from 'react';
import '../css/Write.css';
import AddPage1 from './AddPage1';
import AddPage2 from './AddPage2';
import AddPage3 from './AddPage3';

// 이미지 파일 업로드
import { storage } from "../shared/firebase";
import { db } from '../shared/firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDocs, collection, addDoc, } from 'firebase/firestore';

function Write({ userId, setBoardArray, boardArray }) {

    const file_link_ref = React.useRef(null);

    const [previewImg, setPreviewImg] = useState('https://placehold.jp/200x200.png'); // 이미기 가져오는 상태값
    const [UploadImg, setUploadImg] = useState();

    const [TextValue, setTextValue] = useState('');
    const [layout, setLayout] = useState("right");

    // 파일 업로드
    const img_change = (e) => {
        console.log(e.target.files);

        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]); // 내가 올릴 img
        reader.onload = () => {
            setPreviewImg(reader.result);
        };

        setUploadImg(e.target.files[0])
    }

    const writeFB = async (e) => {
        // const uploded_file = 
        let now_date = Date.now()
        await uploadBytes(
            ref(storage, `images/${userId + now_date}`), // 어떤이름으로 저장?(내 storage의 images에 경로로 들어감(name을 가져올수있음))
            UploadImg // 위치 : 어떤걸 업로드?
        );
        console.log(UploadImg);

        // 파일 다운로드
        const file_url = await getDownloadURL(ref(storage, `images/${userId + now_date}`));
        console.log(file_url)
        file_link_ref.current = { url: file_url }; //ref는 어떤값을 보관하기 위한 용도로도 쓸 수 있다

        await addDoc(collection(db, "boards"), {
            image_url: file_link_ref.current?.url, //file_link_ref.current가 있으면 뒤에 url을 추가해서 넣어라
            userId,
            write_date: now_date,
            text: TextValue,
            layout_click: layout
        })

        const BoardsData = await getDocs(collection(db, "boards"));
        console.log(BoardsData)

        let BoardsList = []; // 1. dictionary_list라는 빈 배열을 만들어서
        BoardsData.forEach((doc) => { // 2. 배열형태로 데이터 나오게끔 설정
            // console.log(doc.data());
            BoardsList.push({ ...doc.data() }); // doc.data 안에 있는 모든것을 넣어준다.
        }); // getDocsfh 긁어온 파이어베이스 컬렉션값을 담은 dictionary_data로 forEach()를 이용해서 데이터 가져옴
        console.log(BoardsList)

        setBoardArray(BoardsList);
        navigator("/");
        window.location.reload();
    }

    return (
        <div className="write">
            <div className='title'>
                <h1>게시글 작성</h1>
            </div>
            <div className='select_img'>
                <input type="file" placeholder='사진을 선택해주세요' onChange={img_change}></input>
                <img src={previewImg} alt='이미지없음'></img>
            </div>
            <div className='sub_title'>
                <h3>레이아웃 고르기</h3>
            </div>
            <div className='addpage_1'>
                <input type="radio" name='radio' onClick={() => setLayout("right")} />
                <label>오른쪽에 이미지 왼쪽에 텍스트</label>
                <div>
                    <AddPage1 previewImg={previewImg} TextValue={TextValue} />
                </div>
            </div>
            <div className='addpage_2'>
                <input type="radio" name='radio' onClick={() => setLayout("left")}></input>
                <label>오른쪽에 텍스트 왼쪽에 이미지</label>
                <div>
                    <AddPage2 previewImg={previewImg} TextValue={TextValue} />
                </div>
            </div>
            <div className='addpage_3'>
                <input type="radio" name='radio' onClick={() => setLayout("bottom")}></input>
                <label>위쪽에 이미지 아래쪽에 텍스트</label>
                <div>
                    <AddPage3 previewImg={previewImg} TextValue={TextValue} />
                </div>
            </div>
            <div className='write_text'>
                <p>게시물 내용</p>
                <input type="text" onChange={(e) => { setTextValue(e.target.value) }}></input>
            </div>
            <div className='write_btn'>
                <button onClick={writeFB}>게시글 작성</button>
            </div>
        </div>
    );
}

export default Write;
