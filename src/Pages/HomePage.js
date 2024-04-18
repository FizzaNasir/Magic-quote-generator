import React from 'react'
import QuoteCard from '../Components/Quote/QuoteCard'
import MainDrawerLayout from '../Components/MainDrawerLayout';
import Login from './Login';
import { Link, useNavigate } from 'react-router-dom';
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