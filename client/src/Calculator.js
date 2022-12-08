import React, {useEffect,useState} from "react";

function Calculator(){
  const [calc,setCalc] = useState("");
  const [result, setResult] = useState("");

  const opsWithoutDot = /[\/\*+-]+/;
  const ops = ['/','*','+','-',"."]

  const updateCalc = value =>{
    if(
      ops.includes(value) && calc === '' ||
      ops.includes(value) && ops.includes(calc.slice(-1)) || 
      isStringContaiDot(calc) && value == "."
    ){
      return;
    }

    setCalc(calc + value);

    if(!ops.includes(value)){
      setResult(eval(calc + value).toString())
    }
  }

  const createDigits = () =>{
    let N = 10; 
    const digits = [];
  
    for(let i = 1; i < N; i++){
      digits.push(
        
        <button onClick={() => updateCalc(i.toString())}key = {i}>
            {i}
        </button>
      )
    }
  
    return digits;
  }
  
  function addToHistory(calculation){
    console.log(calculation)
    fetch('http://localhost:3001/addToHistory',{
      method : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials : 'true',
      credentials : 'include',
      body:JSON.stringify({
        calc: calculation,
      }),
    })
    .then(response => response.json())
    .then(data => console.log(data));
  }

  const calculate = () => {
    addToHistory(calc.toString())
    setCalc(eval(calc).toString());
  }

  const deleteLast = () => {
    if(calc == ''){
      return;
    }

    const value = calc.slice(0,-1);

    setCalc(value);
  }

  const deleteAll = () =>{
    if(calc == ''){
      return;
    }

    setCalc("")
  }
  const isWordContainDot = (value) => {
    let count = value.split(".").length - 1;
    return count;
  }
  const isStringContaiDot = (str) =>{
    let reversed = str.split("").reverse().join("").split(opsWithoutDot);
    let count = isWordContainDot(reversed[0])
    if(count >= 1){
      return true
    }
    return false;
  };
  return (
    <div className ="Calculator">
      <div className = "calculator">
        <div className = "display">
          {}
          {calc || "0"}
        </div>
    
        <div className = "operators">
          <button onClick={() => updateCalc('/')}>/</button>
          <button onClick={() => updateCalc('*')}>*</button>
          <button onClick={() => updateCalc('+')}>+</button>
          <button onClick={() => updateCalc('-')}>-</button>
    
          <button onClick={() => deleteLast()}>DEL</button>
          <button onClick={() => deleteAll()}>CLR</button>
        </div>
    
        <div className="digits">
          { createDigits() }
          <button onClick={() => updateCalc('0')}>0</button>
          <button onClick={() => updateCalc('.')}>.</button>
          <button onClick={calculate}>=</button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;