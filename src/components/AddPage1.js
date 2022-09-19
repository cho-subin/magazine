import React from 'react';
import '../css/AddPage1.css';

function AddPage1({previewImg,TextValue}) {
  return (
    <div className="addpage1">
      <div className='wrap1'>
        <div className='wrap_down1'>
            <div className='uplode_img1'>
                <img src={previewImg} alt=''/>
            </div>
            <div className='uplode_text1'>
                <p>{TextValue}</p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default AddPage1;
