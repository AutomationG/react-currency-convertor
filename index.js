import React, {useEffect,useState} from 'react';
import { render } from 'react-dom';
import './style.css';
import CurrencyRow from './CurrencyRow';
import axios from 'axios';

function App(){
  const CURRENCY_URL = 'https://api.exchangeratesapi.io/latest';
   const [currencyOption,setCurrencyOption] = useState([]);
   const [fromCurrency,setFromCurrency] = useState('');
   const [toCurrency,setToCurrency] = useState('');
   const [amount,setAmount] = useState(1);
   const [fromInput,setfromInput] = useState(true);
   const [convCurrency,setConvCurrency] = useState()

   let fromAmount,toAmount;
   if(fromInput){
     fromAmount = amount;
     toAmount = amount * convCurrency
   }else{
     toAmount = amount;
     fromAmount = amount / convCurrency
   }
   
   useEffect(() => {
     axios.get(CURRENCY_URL).then((response)=>{
     const firstCurrency = Object.keys(response.data.rates)[0]
     setCurrencyOption(Object.keys(response.data.rates))
     setFromCurrency(response.data.base)
     setToCurrency(firstCurrency)
     setConvCurrency(response.data.rates[firstCurrency])
     })},[])

    const handleFromAmount = (event) => {
    setAmount(event.target.value)
    setfromInput(true)
    }

    const handleToAmount = (event) => {
    setAmount(event.target.value)
    setfromInput(true)
    }

    return (
      <>
      <h1>Convertor</h1>
      <CurrencyRow options={currencyOption} amount={amount} baseCurrency={fromCurrency} 
       handleAmount = {handleFromAmount}
      onChange={ event => setFromCurrency(event.target.value)}/>
      <div className='equals'>=</div>
      <CurrencyRow options={currencyOption} amount={convCurrency} baseCurrency={toCurrency} 
      handleAmount = {handleToAmount}
       onChange={ event => setToCurrency(event.target.value)}/>
      </>
    );
  }

render(<App />, document.getElementById('root'));
