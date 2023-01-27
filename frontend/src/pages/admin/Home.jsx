import { Box, display } from '@mui/system'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import AdminTable from '../../components/adminTable/AdminTable'
import { deleteAdminToken, selectAdminAuth } from '../../redux/Features/reducers/adminAuthSlice'
import { Button } from '@mui/material'


function Home() {
  const data = useSelector(selectAdminAuth)
  const myStyle = {
    backgroundImage: "url('https://stimg.cardekho.com/images/carexteriorimages/630x420/Ford/Mustang-2024/7939/1663750110692/front-left-side-47.jpg')",
    backgroundColor: "#000",
    height: "100vh",
    fontSize: "50px",
    backgroundSize:"cover",
  };
  if(data.token){
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const handleLogOut=()=>{
      dispatch(deleteAdminToken())
      navigate('/admin/login')
    }
    return (
      <>
      <div style={{display:"flex",justifyContent:"end", backgroundColor:"#281237", opacity:"0.6"}}>
      <Button variant="outlined" style={{margin:"10px"}} onClick={handleLogOut}>Logout</Button>
      </div>
      <Box sx={myStyle}>
        <div style={{width:"70%", margin:"auto" ,paddingTop:"4rem"}} >
          {/* <h4>USER MANAGEMENT</h4> */}
          
        <AdminTable/>
        </div>
      </Box>
      </>
    )
  }else{
    return(
      <Navigate to='/admin/login' />
    )
  }
}

export default Home