import React, { useEffect, useState } from 'react';
import './Update.css'
import { Link, useParams } from 'react-router-dom';
const Update = () => {
    const id = useParams().id;
    const [users,setUsers] = useState({})
    useEffect(() => {
        const uri = `https://crud-server-react.onrender.com/users/${id}`
        fetch(uri)
            .then(res => res.json())
            .then((data) => setUsers(data));
    },[id])

    
  const  nameUpdate =(e)=>{
        const name = e.target.value;
        const updatedName = {name:name ,email:users.email}
        setUsers(updatedName)
    }
  const  emailUpdate =(e)=>{ 
        const email = e.target.value;
        const updatedEmail = {email:email ,name:users.name}
        setUsers(updatedEmail)
    }


    const updateHandaler =(e)=>{
        e.preventDefault();
     const   uri = `https://crud-server-react.onrender.com/users/${id}`
     fetch(uri,{
        method:"PUT",
        body: JSON.stringify(users),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
     })
     .then(res => res.json())
     .then(data => {
        if(data.acknowledged)
        {
            alert("Data Updated Successfully")
        }
     })
    }
    return (
        <div className='update' style={{ marginTop: "30px" }}>
            <Link to={"/"}>
                <button>Go To Home</button>
            </Link>
            <h1>Update Profle Infos</h1>
            <form>
                <input onChange={nameUpdate} type="text" value={users.name || " "}/>
                <input onChange={emailUpdate} type="email" value={users.email || " "}/>
                <input onClick={updateHandaler} type="submit" value="Update"/>
            </form>
        </div>
    );
};

export default Update;