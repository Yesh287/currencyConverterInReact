import { useEffect, useState } from 'react'
import './App.css'
import InputBox from "./components/InputBox";
import useCurrencyInfo from './hooks/useCurrencyInfo'
function App() {
  const [amount,setAmount] = useState(Number(0));
  const [from,setFrom] = useState("inr");
  const [to,setTo] = useState("usd");
  const [convertedAmount,setConvertedAmount] = useState(Number(0));
  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);
  const swap = () => {
    setTo(from);
    setFrom(to);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  }
  useEffect(()=>{
    convert();
  },[amount,to,from,convertedAmount]);
  const convert = ()=>{
    if(amount != 0)setConvertedAmount(amount*(currencyInfo[to]/currencyInfo[from]));
    else setConvertedAmount(0);
  }
  return (
        <div
            className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
            style={{
                backgroundImage: `url('https://images.pexels.com/photos/3532555/pexels-photo-3532555.jpeg?_gl=1*t2x1pn*_ga*MTc3OTY1MDYyNS4xNzUwOTQwNjI4*_ga_8JE65Q40S6*czE3NTA5NDA2MjgkbzEkZzEkdDE3NTA5NDI2MTkkajYwJGwwJGgw')`,
            }}
        >
            <div className="w-full">
                <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            convert();
                        }}
                    >
                        <div className="w-full mb-1">
                            <InputBox
                                label="From"
                                amount={amount}
                                currencyOptions = {options}
                                onAmountChange={setAmount}
                                onCurrencyChange={setFrom}
                                selectCurrency={from}
                            />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                                onClick={swap}
                            >
                                swap
                            </button>
                        </div>
                        <div className="w-full mt-1 mb-4">
                            <InputBox
                                label="To"
                                amount={convertedAmount}
                                currencyOptions = {options}
                                onAmountChange={setConvertedAmount}
                                onCurrencyChange={setTo}
                                selectCurrency={to}
                                readOnly = {true}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App
