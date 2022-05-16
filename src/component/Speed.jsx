import '../App.css';
import React, { useState } from 'react';
import UnitControl from './UnitControl';
import CardFooter from './CardFooter';
import UnitConverter from './UnitConverter';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';


library.add(fab, fas, far);


let  Speed = ()=> {
  //事件觸發區
  const [inputValue, setInputValue] = useState(0);

  const handelInputChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  }

  //畫面區
  return (
    <div className="container">
      <div className="card-header">Network Speed Converter</div>
      <div className="card-body">
        <UnitControl />
        <UnitConverter inputValue={inputValue} handelInputChange={handelInputChange}/>
      </div>
      <CardFooter inputValue={inputValue} />
    </div>

  );
}

export default Speed;