import React, { useEffect, useState } from 'react'
import axios from "axios";



// MOCK API URL
const API_URL="https://jsonplaceholder.typicode.com/posts";
function Posts() {
    // create a state to store the data from URL
    const[posts,setPosts]=useState([]);

    // create state to store value from the input fields
    const[title,setTitle]=useState("");
    const[body,setBody]=useState("");

    // create state to store the edit values
    const[editId,setEditId]=useState(null)


    // useEffect runs when the component is  loaded
    useEffect(()=>{
        axios.get(API_URL)
        .then(res=>{
            setPosts(res.data.slice(0,5));
        })},[]);
        
    // Function to POST - add new post
    const addPost=()=>{
        if(!title||!body){
            alert("Field should not be empty!!");
            return;
        }
        // send that data to URL
        axios.post(API_URL,
        {
            title,
            body,
            postId:1
        })
        .then(res=>{
            //add new posts to existing posts
            setPosts([...posts,res.data]);

            // clear the form input fields
            setTitle("");
            setBody("");

            alert("post added successfully!!!");

        })
    }
// start edit function
    const startEdit=(post)=>{
        // to store the selected Id
        setEditId(post.id);
        setTitle(post.title);
        setBody(post.body);

    }
    const deletePost=(post)=>{
        // to store the selected Id
        setEditId(post.id);
        setTitle(post.title);
        setBody(post.body);

    }

    // update post-put operation

    const updatePost=()=>{
        axios.put(`${API_URL}/${editId}`,{
            title,
            body,
            userId:1
        })
        .then(()=>{
            setPosts(
                posts.map(p=>
                    p.id===editId?{...p,title,body}:p
                )
            )
        })
    }
      return (
    <div>
        <h3>Post List</h3>
        <table className='table table-bordered'>
            <thead>
                <tr>
                <td>ID</td>
                <td>TITLE</td>
                <td>BODY</td>
                <td>ACTION</td>
</tr>
            </thead>
            <tbody>
                {posts.map(post =>(
                    <tr key={post.id}>
                        <td>{post.id}</td>
                        <td>{post.title}</td>
                        <td>{post.body}</td>
                        <td>
                            <button className='btn btn-warning' onClick={()=>startEdit(post)}>edit</button>
                            <button className='btn btn-success' onClick={()=>deletePost(post)}>delete</button>

                        </td>

                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td></td> {/* ID column (empty) */}
                    <td>
                        <input className='form-control'placeholder="enter title "
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                        />
                    </td>
                    <td>
                        <input className='form-control'placeholder="enter body"
                        value={body}
                        onChange={(e)=>setBody(e.target.value)}
                        
                        />
                    </td>
                    <td>
                    {editId?(
                        <>
                        <button className='btn btn-success'onClick={updatePost}>Update</button>
                        <button className='btn btn-warning'onClick={cancelEdit}>Cancel</button>
                        </>
                    ):(

                 
                    
                        <button className='btn btn-primary'onClick={addPost}>Add</button>
                    )}

                    </td> 
                </tr>
            </tfoot>
        </table>
    </div>
  );
}

export default Posts