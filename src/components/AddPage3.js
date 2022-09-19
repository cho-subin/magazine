import React from 'react';
import '../css/AddPage3.css';

function AddPage3({ previewImg, TextValue }) {
  return (
    <div className="addpage3">
      <div className='wrap3'>
        <div className='wrap_down3'>
          <div className='uplode_img3'>
            <img src={previewImg} alt='' />
          </div>
          <div className='uplode_text3'>
            <p>{TextValue}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPage3;
