import React, { useEffect, useRef, useState } from 'react';
import './Home.css';
import {Link} from 'react-router-dom';
const Home = () => {
const [users,setUsers] = useState([])

    const nameRef = useRef()
    const emailRef = useRef()
    const imgRef = useRef()
    const userHandaler =(e)=>{
      e.preventDefault();
      const name = nameRef.current.value;
      const email = emailRef.current.value;
      const image = imgRef.current.value;

      //data object akara set korta hoi
      const newUser = {name: name, email: email, image: image}
      
      //post-method
      fetch('https://crud-server-react.onrender.com/users',{
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then(res => res.json())
      .then(data => {
        if(data.acknowledged)
        {
          alert("Students added Success Fully");
          nameRef.current.value="";
          emailRef.current.value="";
          imgRef.current.value="";
        }
      }); 
      //{} beshi value takla faka  object dewa hoi;
    };

    //get-2 ui ta dekanor jonno;
    useEffect(()=>{
      fetch('https://crud-server-react.onrender.com/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data)
        if(data.acknowledged)
        {
          alert("Students added Success Fully");
          nameRef.current.value="";
          emailRef.current.value="";
          imgRef.current.value="";

        }
      });
    },[users]);


    //delete-3
    const deleteHandaler = (id)=>{
      const proceed = window.confirm("Do you really want to Delete ?")
      if(proceed){
        fetch(`https://crud-server-react.onrender.com/users/${id}`, {
          method: 'DELETE',
          body: JSON.stringify(),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            }})
            .then(res => res.json())
            .then(data => console.log(data))
      }
      
    }
    return (
        <div className="home">
      <div className="crud">
        <div className="new-user-sec">
          <h1>Add new user</h1>
          <form>
            <input ref={nameRef}  type="text" placeholder="Name" />
            <input ref={emailRef}  type="text" placeholder="Email" />
            <input ref={imgRef} type='text' placeholder='image link'></input>
            <input onClick={userHandaler} type="submit" value="Add user" />
          </form>
        </div>
        <div style={{ width: "90%", margin: "auto" }}>
          <h1>Our Employees</h1>
          <hr />
          <table>
            <thead>
              <tr>
                <th>Profile</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <h2 style={{ color: "yellow" }}>Loading...</h2>
              ) : (
                users.map(user => (
                  <tr key={user._id}>
                    <td>
                      <img src={user.image} alt="" />
                    </td>
                    <td>
                      <p>{user.name}</p>
                    </td>
                    <td>
                      <p>{user.email}</p>
                    </td>
                    <td>
                      <div className="details">
                        <Link to={`/users/view/${user._id}`}>
                          <p className="edit">View</p>
                        </Link>

                        <Link to={`/users/update/${user._id}`}>
                          <p className="update">Update</p>
                        </Link>

                        <p
                          onClick={()=> deleteHandaler(user._id)}
                          className="delete"
                        >
                          Delete
                        </p>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    );
};

export default Home;