import { useState, useEffect } from "react";

function useCurrencyInfo(currency){
    const [data,setData] = useState({});
    useEffect(()=>{
        const fetchData = async() =>{
        let data = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json`)
        let dataJson = await data.json();
        setData(dataJson['eur']);}
        fetchData();
    },[currency])
    return data;
}
export default useCurrencyInfo;