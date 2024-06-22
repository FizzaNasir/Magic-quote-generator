import React from 'react'
import MainDrawerLayout from '../Components/MainDrawerLayout';
import {useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const HomePage = () => {

  const navigate = useNavigate();
  const getUser = localStorage.getItem('loginUserId')
 
  useEffect(() => {
    getUser==null &&  navigate('/Login')
  
  }, [getUser])
  
  return (
   <>
    {getUser != null && <MainDrawerLayout /> }
   </>
   )
}

export default HomePage