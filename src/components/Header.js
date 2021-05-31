import { useState, useEffect } from "react";
import styled from 'styled-components';
// import useFetchQuote from "../Hooks/useFetchQuote"

function Header() {
        const [quote, setQuote] = useState("");
    // const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        const fetchQuote = async() =>{
            // setIsLoading(true);
            await fetch("https://type.fit/api/quotes")
            .then(res=> res.json())
            .then(data=>{
                setQuote(
                    data[Math.floor(Math.random()*data.length)]
                )
                // setIsLoading(false);
            })
        }
        fetchQuote();
    },[]);

    return (
        <HeaderCenter>
            <h2>{quote.text}</h2>
            <h2>{quote.author}</h2>
        </HeaderCenter>
    )
}

export default Header

const HeaderCenter = styled.div`
display:flex;
flex-direction:column;
>h2{
    align-items:center;
    margin:auto;
}
`