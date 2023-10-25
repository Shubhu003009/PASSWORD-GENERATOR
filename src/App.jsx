
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import copy from 'copy-to-clipboard';

import { numbers, upperCaseLetters, lowerCaseLetters, specialCharacters } from "./Password/PasswordChars";

function App() {
const [numCheck, setnumCheck] = useState(false)
const [upperCheck, setupperCheck] = useState(false)
const [lowerCheck, setlowerCheck] = useState(false)
const [symbolCheck, setsymbolCheck] = useState(false)

const [passwordLength, setpasswordLength] = useState('')
const [finalPass, setfinalPass] = useState('')

function generatePassword(){
  if(numCheck === false 
  && upperCheck === false
  && lowerCheck === false
  && symbolCheck === false){
    toast.error('Choose Atleast One Option!')
  }
  else{
    let passwordData = ''
    if(numCheck){
      passwordData += numbers
    }
    if(upperCheck){
      passwordData += upperCaseLetters
    }
    if(lowerCheck){
      passwordData += lowerCaseLetters
    }
    if(symbolCheck){
      passwordData += specialCharacters
    }
    let finalPassword =  createPassword(passwordData)
    setfinalPass(finalPassword)
  }
}

function createPassword(passwordData){
  let passwordDataLength = passwordData.length
  let finalPassword = ''
  for(let i=0 ; i<passwordLength ; i++){
    let randomNumber = Math.round( Math.random() * passwordDataLength )
    finalPassword += passwordData.charAt(randomNumber)
  }
  return finalPassword
}

function copyToClipBoard(){
  copy(finalPass);
  if(finalPass) toast.success('Copied')
}

  return (
    <>
      <ToastContainer position="top-center"/>

      <div className="max-w-[500px]  mt-28 mx-auto shadow-2xl p-[20px] rounded-md ">

        <h3 className="text-center font-semibold text-[25px]">Password Generator</h3>

        <div className="relative">
          <input type="text" value={finalPass} className="border rounded-md border-1 w-[100%] h-[50px] text-xl p-3" />
          <button onClick={copyToClipBoard} className="absolute rounded-md right-2 top-[5px] bg-black text-white cursor-pointer p-2">Copy</button>
        </div>

        <div className="text-left text-lg py-3">
          Password Length
          <input type="number" min={4} max={93} value={passwordLength} onChange={(e)=>setpasswordLength(e.target.value)} className="ml-4 rounded-md border border-1 w-[20%] p-1 h-[30px]" />
        </div> 

        <div className="text-left text-lg py-3">
          Add Uppercase Letters
          <input checked={upperCheck} onChange={(e)=> setupperCheck(e.target.checked)}  type="checkbox" className="ml-4 border border-1 w-[50px] h-[20px]" />
        </div> 

        <div className="text-left text-lg py-3">
          Add Lowercase Letters
          <input checked={lowerCheck} onChange={(e)=> setlowerCheck(e.target.checked)}  type="checkbox" className="ml-4 border border-1 w-[50px] h-[20px]" />
        </div> 

        <div className="text-left text-lg py-3">
          Include Numbers
          <input checked={numCheck} onChange={(e)=> setnumCheck(e.target.checked)} type="checkbox" className="ml-4 border border-1 w-[50px] h-[20px]" />
        </div> 

        <div className="text-left text-lg py-3">
          Include Symbols
          <input checked={symbolCheck} onChange={(e)=> setsymbolCheck(e.target.checked)}  type="checkbox" className="ml-4 border border-1 w-[50px] h-[20px]" />
        </div> 

        <button onClick={generatePassword} className=" w-[100%] rounded-md bg-black text-white cursor-pointer p-2">Generate Password</button>

      </div>
    </>
  )
}

export default App
