// import ReactDOM from 'react-dom';
import React from 'react';
import '../expense.css';



const Counter = () => {

    const [count, setCount] = React.useState(256);
    //把計數器抽離出來
    const handleClick = (type) => {
        return () => {
            setCount(type === 'increment' ? count + 1 : count - 1);
        }
    }

    return (

        <div className="container" style={{ margin: '0 30px', }}>
            {console.log('render')}
            <div className="chevron chevron-up" onClick={handleClick('increment')}></div>
            <div className="number">256</div>
            <div className="chevron chevron-down" onClick={handleClick('decrement')}></div>
        </div>

    );

}

const counters = Array.from({length:8});


// ReactDOM.render(
//     <div style={{ display: 'flex', justifyContent: 'space-between' }} >
//         {
//             counters.map(()=>(<Counter/>))
//         }
//     </div>,
//     document.getElementById('root')
// );




