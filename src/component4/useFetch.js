import React from 'react'
import { useState,useEffect } from 'react'

export default function useFetch(url){
    const[data,setData] = useState([]);
    const[isPending,setIsPending] = useState(true);
    const[error,setError] = useState([]);

    useEffect(()=>{
        const abortCont = new AbortController();
        setTimeout(()=>{
            fetch(url,{signal:abortCont.signal})
            .then(res => {
                if(!res.ok){
                    throw Error('could not fetch data for that resource');
                }
                return res.json();
            })
            .then(data=>{
                setIsPending(false);
                setData(data);
                setError(null);
            })
            .catch(err=>{
                if(err.name === 'AbortError'){
                    console.log('fetch aborted');
                }else{
                    setIsPending(false);
                    setError(err.message);
                }
            })
            },1000);
            return ()=> abortCont.abort();
        },[url])
        return {data,isPending,error};
    }