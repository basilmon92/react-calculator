import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

type Display = {
    current: string;
    total: string;
    isInitial: boolean;
    preOp?: string;
};

export interface ButtonProps {
    label: string;
    className?: string;
    onClick?: any;
}

export interface HelloProps {
    appName?: string;
    version?: number;
}

const appNameConst: string = "react-calculator";

function Hello({appName, version}: HelloProps) {
    return (
        appName != undefined ?
        <p>Hello from {appName}</p>
            : <p>Welcome to my app v{version}</p>
    )
}

function MyButton({label, className, onClick}: ButtonProps) {
  return (
      <button className={className} onClick={() => onClick(label)}>
        {label}
      </button>
  );
}

function App() {
    const [value, setValue] = useState<Display>({
        current: "0",
        total: "0",
        isInitial: true
    })

    function handleNumber(label: string) {
        let newValue:string = String(label);
        if (!value.isInitial) {
            newValue = value.current + label;
        }
        setValue({current: newValue, total: value.total, isInitial: false, preOp: value.preOp})
    }

    function handleOperator(label: string) {
        const total:number = doCalculation();
        setValue({current: total.toString(), total: total.toString(), isInitial: true, preOp: label})
    }

    function doCalculation() {
        let total = parseInt(value.total);
        switch(value.preOp) {
            case "+":
                total += Number(value.current);
                break;
            case "-":
                total -= Number(value.current);
                break;
            case "x":
                total *= Number(value.current);
                break;
            case "/":
                total /= Number(value.current);
                break;
            default:
                total = Number(value.current);
        }
        return total;
    }

    function handleEquals() {
        let total = doCalculation();
        setValue({current: total.toString(), total: total.toString(), isInitial: true, preOp: '='})
    }

    function handleClear() {
        setValue({
            current: "0",
            total: "0",
            isInitial: true,
            preOp: ''
        })
    }

    function renderDisplay() {
        return value.current;
    }

    return (
    <div className="App">
      <header className="App-header">
          <Hello appName={appNameConst}/>
          <Hello version={1.0}/>
        <div className='app-container'>
            <div className='calculator'>
                <div className='display'>{renderDisplay()}</div>
                <MyButton label='7' onClick={handleNumber}/>
                <MyButton label='8' onClick={handleNumber}/>
                <MyButton label='9' onClick={handleNumber}/>
                <MyButton label='/' className='operator' onClick={handleOperator}/>

                <MyButton label='4' onClick={handleNumber}/>
                <MyButton label='5' onClick={handleNumber}/>
                <MyButton label='6' onClick={handleNumber}/>
                <MyButton label='x' className='operator' onClick={handleOperator}/>

                <MyButton label='1' onClick={handleNumber}/>
                <MyButton label='2' onClick={handleNumber}/>
                <MyButton label='3' onClick={handleNumber}/>
                <MyButton label='-' className='operator' onClick={handleOperator}/>

                <MyButton label='C' onClick={handleClear}/>
                <MyButton label='0' onClick={handleNumber}/>
                <MyButton label='=' onClick={handleEquals}/>
                <MyButton label='+' className='operator' onClick={handleOperator}/>
                {/*<MyButton label='+' className='operator fullwidth'/>*/}
            </div>
        </div>
      </header>
    </div>
  );
}

export default App;
