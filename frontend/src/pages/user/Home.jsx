import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NavBar from "../../components/userHeader/userHeader";
import UserProfileCard from "../../components/userProfileCard/UserProfileCard";
import { useGetUserDataQuery } from "../../redux/Features/api/apiSlice";
import { selectUserAuth } from "../../redux/Features/reducers/userAuthSlice";

function Home() {
  const myStyle = {
    backgroundImage: "url('https://images.alphacoders.com/597/597903.jpg')",
    backgroundColor: "#000",
    height: "100vh",
    fontSize: "50px",
    backgroundSize:"cover"
   
  };
  const user=useSelector(selectUserAuth)
  let userData={}
  if(user.token){
    const { data, isLoading, isFetching, isSuccess, isError, error, refetch } = useGetUserDataQuery()
    if(isSuccess){
       userData=data.userData
     }
    return (
      <>
        <NavBar picture={userData.picture}/>
        <UserProfileCard name={userData.name} email={userData.email} picture={userData.picture} id={userData._id}/>
        {/* <Box sx={myStyle} >
          </Box> */}
      </>
    );
  }else{
    return(
     <Navigate to='/login'/>
    )
  }
}

export default Home;
