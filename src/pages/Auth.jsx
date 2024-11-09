import React, { useState } from 'react'
import axios from 'axios'
import {useCookies} from 'react-cookie'
import {useNavigate} from "react-router-dom"

const Auth = () => {
  return (
    <>
        <div className="flex flex-col gap-20 justify-center items-center mt-[5%]">
            <h1 className="text-6xl font-bold mb-10 text-center">Welcome! Please Log In or Register</h1>
            <div className="flex w-full justify-center items-center">
                <div className="w-1/2">
                    <Login />
                </div>
                <div className="w-1/2">
                    <Register />
                </div>
            </div>
        </div>
    </>
)
}

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [_, setCookies] = useCookies(["access_token"])

  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3001/auth/login',{
        username,
        password,
      });

      if(response.data.message == 'User does not exist!!'){
        alert("Username or Password Incorrect")
        setUsername('')
        setPassword('')
      }
      else{

        setCookies("access_token", response.data.token) 
        window.localStorage.setItem("userID", response.data.userID)
        console.log(response.data.message)
        navigate('/') 
      }


    } catch (error) {
      console.error(error)
    }
  }
  return <>
    <Form username={username} password={password} setPassword={setPassword} setUsername={setUsername} label="Login" onSubmit={onSubmit} />
  </>
}

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      axios.post('http://localhost:3001/auth/register', {
        username,
        password,
      });
      alert("Registration Completed")
      setUsername('')
      setPassword('')
    } catch (error) {
      console.error(error)
    }
  }
  return <Form username={username} setUsername={setUsername} password={password} setPassword={setPassword} label="Register" onSubmit={onSubmit} />
}

const Form = ({ username, setUsername, password, setPassword, label, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col justify-center items-center">
      <div className="text-5xl mb-10">
        {label}
      </div>
      <div className="flex bg-slate-200 w-3/4 rounded-md mx-10 my-3 pl-5 text-xl">
        <img src="../../svg/user.svg" alt="" />
        <input type="text" id='username' placeholder='Enter username' value={username} className="bg-slate-200 w-full p-4 outline-none" onChange={(e) => { setUsername(e.target.value) }} />
      </div>
      <div className="flex bg-slate-200 w-3/4 rounded-md mx-10 my-3 pl-5 text-xl">
        <img src="../../svg/password.svg" alt="" />
        <input type="password" id='password' placeholder="Password" className="bg-slate-200 w-full p-4 outline-none" value={password} onChange={(e) => { setPassword(e.target.value) }} />
      </div>
      <button type="submit" className="text-white bg-green-400 rounded-xl py-3 px-9 text-xl">{label}</button>
    </form>
  )
}



export default Auth