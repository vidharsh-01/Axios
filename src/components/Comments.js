import React, { useEffect, useState } from 'react'
import axios from "axios"
const API_URL="https://jsonplaceholder.typicode.com/comments";
function Comments() {
    const[comments,setComments]=useState([]);
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[editId,setEditId]=useState(null);
    useEffect(()=>{
        axios.get(API_URL)
        .then(res=>{
            setComments(res.data.slice(0,5));
        })
    },[]);

    const addComment=()=>{
        if(!name||!email){
            alert("fill !!");
            return ;
        }
    

    axios.comments(API_URL,
        {
            name,
            email,
            postId:1
        }
    )
    .then((res)=>{
        setComments([...comments,res.data]);
        setName("");
        setEmail("")
        alert("post added successfully!!!");
    })
};
// start edit
const startEdit=(comments)=>{
    setEditId(comments.id);
    setName(comments.name);
    setEmail(comments.email);

}
const deletePost=(comments)=>{
    setEditId(comments.id);
    setName(comments.name);
    setEmail(comments.email);

}
const updatePost=()=>{
        axios.put(`${API_URL}/${editId}`,{
            name,
            email,
            postId:1
        })
        .then(()=>{
            setComments(
                comments.map(p=>
                    p.id===editId?{...p,name,email}:p
                )
            )
        })
    }


  return (

    <div>
        <h3>Comments list</h3>
        <table className='table table-bordered'>
            <thead>
                <tr>
                    <td>ID</td>
                    <td>NAME</td>
                    <td>EMAIL</td>
                    <td>BODY</td>
                    <td>ACTION</td>

                </tr>
            </thead>
            <tbody>
                {comments.map(comment=>(
                    <tr key={comment.id}>
                        <td>{comment.id}</td>
                        <td>{comment.name}</td>
                        <td>{comment.email}</td>
                        <td>{comment.body}</td>
                        <td>
                            <button className='btn btn-primary'onClick={()=>startEdit(comments)}>Edit</button>
                            <button className='btn btn-danger'onClick={()=>deletePost(comments)}>delete</button>

                        </td>

                    </tr>


                ))}
            </tbody>
            <tfoot>
                <td></td>
                <td>
                <input className='form-control'placeholder='enter the name' value={name} onChange={(e)=>setName(e.target.value)}/>
                </td>
                <td>
                <input className='form-control'placeholder='enter the email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </td>
                <td></td>
                <td>
                    {editId?(
                        <>
                        <button className='btn btn-success'onClick={updatePost}>update</button>
                        <button className='btn btn-warning'onClick={cancleEdit}>delete</button>

                        </>
                    ):(
                <button className='btn btn-primary' onClick={addComment}>ADD</button>

                    )}

              
                </td>
                
            </tfoot>
            
        </table>
    </div>
  );
}

export default Comments