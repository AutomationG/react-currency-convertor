import React from 'react';

export default function CurrencyRow(props){
    return (
      <>
      <input type='number' value={props.amount} onChange={props.handleAmount}/>
      <select value={props.baseCurrency} onChange={props.onChange}>
      {props.options.map(op => (<option key={op} value={op}>{op}</option>))}
      </select>
      </>
    );
  }