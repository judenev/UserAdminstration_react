import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import UserLogin from '../../components/userLogin/UserLogin'
import { selectUserAuth } from '../../redux/Features/reducers/userAuthSlice'

function Login() {
  const data = useSelector(selectUserAuth);
  if(data.token){
    return <Navigate to="/" />
  }
  return (
    <UserLogin/>
  )
}

export default Login