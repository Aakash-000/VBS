import react from "react";
import axios from "axios";
import {useState,useEffect } from "react";
import { useParams } from "react-router-dom";

export function AxiosMain(){
    const {id} = useParams();
    const [getPost,setgetPost] = useState([]);
    const[addPost,setaddPost] = useState([]);
    const[deletePost,setdeletePost] =useState([]);
    const[adeletePost,setadeletePost] =useState([]);
    useEffect(()=>{
    async function getData(){
    let response = await axios.get('http://localhost:3500/get');
    setgetPost(response.data);
    }
    getData();       
    },[])
    async function addData(){
        let response = await axios.post('http://localhost:3500/post',{title:'New Data',completed:true});
        setaddPost(response);
    }  
    async function deleteData(){
        let response = await axios.delete('http://localhost:3500/delete/60');
        setdeletePost(response.data);
    }
    useEffect(()=>{
        async function getDeleteData(){
        let response = await axios.get('http://localhost:3500/delete');
        setadeletePost(response.data);  
        }
        getDeleteData();      
    },[])
    console.log(addPost); 
    console.log(adeletePost);
    return(
    <div className='axios-data'>
        <div>
        <button onClick={addData}>Post</button>
        </div>
        <div>
            <button onClick={deleteData}>Delete</button>
        </div>
        <div>
        {getPost.map((value)=>(
        <div key={value.id}>{`{Id:${value.id} Title:${value.title}}`}</div>
        ))}
        </div>
        <div>
            {adeletePost.map((value)=>(
                <div key={value.id}>
                {`{Id:${value.id} Title:${value.title}}`}
                </div>
            ))}
        </div>
    </div>
    )
}