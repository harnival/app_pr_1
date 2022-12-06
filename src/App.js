
import {useEffect, useState} from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  useEffect(()=> {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then(response => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);});
  } ,[]);
  
  const coinInfo = coins.map(function(value) {
    return { name: value.name, symbol: value.symbol, price: value.quotes.USD.price};
  });
  
// --------------------------
  function Inverter(props) {
    const [amount, setAmount] = useState(0);
    const onChange = (event) => setAmount(event.target.value);
    return (
    <div>
      <label>USD</label>
      <input onChange={onChange} type="number" placeholder="Write USD." value={amount}/>
      <label>{props.name}</label>
      <input placeholder="Write Coins" type="number" value={amount / props.price} disabled/>
    </div>
    );
  }
  // ---------------------------
  const [selectValue, setSelectValue] = useState("");
  const [priceValue, setPriceValue] = useState(1);
  const onSelect = (event) => {
    setSelectValue(coinInfo[event.target.value].symbol);
    setPriceValue(coinInfo[event.target.value].price);
  };
  return (
    <div>
      <h1>Coin</h1>
      {loading? <strong>Loading....</strong> : 
      (<div>
        <select value={selectValue} onChange={onSelect}>
          <option>Select your coin.</option>
          {coinInfo.map((coin, idx) =>
            <option key={idx} value={idx}> {coin.name}({coin.symbol}) : {coin.price} </option>
          )}
        </select>
        <hr />
        <Inverter name={selectValue} price={priceValue}/>
      </div>)
      }
    </div>
  )
}

export default App;
