import React from 'react';
import '../css/AddPage2.css';

function AddPage2({ previewImg, TextValue }) {
  return (
    <div className="addpage2">
      <div className='wrap2'>
        <div className='wrap_down2'>
          <div className='uplode_text2'>
            <p>{TextValue}</p>
          </div>
          <div className='uplode_img2'>
            <img src={previewImg} alt='' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPage2;
