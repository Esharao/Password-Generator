import { useState, useCallback, useEffect,useRef } from 'react';


function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const passwordRef=useRef(null);

  const passwordGenerator = useCallback(() => {
  let pass = "";
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  if (numberAllowed) str += "0123456789";
  if (charAllowed) str += "!@#$%^&*(){}[]`~";

  for (let i = 1; i <= length; i++) {
    let charIndex = Math.floor(Math.random() * str.length);
    pass += str.charAt(charIndex);
  }

  setPassword(pass);
}, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    alert('Password copied to clipboard!');
  };

  return (
    <>
      <div className="groot">
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orande-500 bg-blue-700'>
        <h1 className="text-white text-xl font-bold mb-4 text-center">Password Generator</h1>
       
       <div className='flex shadow rounded-lg overflow-hidden md-4'>
        <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='password' readOnly   ref={passwordRef} />

        <button  onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
       </div>
       <div className='flex text-sm gap-x-2'>
        <div className="flex item-center gap-x-1">
          <input type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e) =>{setLength(e.target.value)}}
          />
          <label>Length:{length}</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input type="checkbox"
          Checked={numberAllowed}
          id="numberInput"
          onChange={()=>{
            setNumberAllowed((prev)=> !prev);//prev value se reverse value
          }} />
          <label htmlFor="numberInput">Numbers</label>
        </div>

         <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              checked={numberAllowed}
              id='numberInput'
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor='numberInput'>Character</label>
          </div>
          </div>

           <div className='mt-6 text-center'>
          <button
            onClick={passwordGenerator}
            className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg'
          >
            Generate Password
          </button>
        </div>
      </div>
      </div>
    </>
  )
}

export default App
