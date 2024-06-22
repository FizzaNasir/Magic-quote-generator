import React from 'react'
import { Button, Form, Input} from 'antd';
import { nanoid } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { Box } from '@mui/material';
import CommentCard from './CommentCard';
import { Add_Comment } from '../../Features/CommentSlice';

const { TextArea } = Input;

const LOGGED_IN_USERID= localStorage.getItem('loginUserId')

const AddComment = ({quoteId, onModalClose}) => {
   
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const AllComments = useSelector(state=> state.Comments.CommentsArray)
  const [filteredComments, setFilteredComments] = useState([])

  const onFinish = async (values) => {
  const {Comment} = values
  dispatch(Add_Comment({id: nanoid(), comment: Comment, userId: LOGGED_IN_USERID, quoteId: quoteId}))
  onModalClose();
  };

  function onCancelHandler(){
    onModalClose();
  }

  useEffect(() => {
    const Comments = AllComments.filter(el=> el.quoteId === quoteId)
    setFilteredComments(Comments)
  }, [AllComments])
  
  return (
    <div>
    {    
        filteredComments.map(comment => (
        <CommentCard userId={LOGGED_IN_USERID} comment={comment.comment}/>
        ))   
    }

    <Form
      form={form}
      layout="vertical"
      name="basic"
      labelCol={{
       span: 8,
     }}
     wrapperCol={{
     span: 16,
     }}
     
     style={{
     maxWidth: 600,
     height: 50,
     display: 'flex',
     flexDirection: 'column',
     marginTop: 100
     }}
     initialValues={{
      remember: true,
     }}
 
      autoComplete="off"
      onFinish={onFinish}
  >
    <Form.Item
      label="Write a Comment"
      name="Comment"
      rules={[
       {
         required: true,
       },
     ]}
    >
    <TextArea cols={80} />
    </Form.Item>
<Box sx={{ display: 'flex', flexDirection: 'row'}}>

 <Form.Item
   wrapperCol={{
     offset: 8,
     span: 16,
   }}
  >
      <Button 

    htmlType="submit"
    style={{
      border: 'none'
    
     }}
    >
     <SendIcon/>
   </Button>

  </Form.Item>
 
  <Form.Item
   wrapperCol={{
     offset: 8,
     span: 16,
   }}
  >
      <Button variant="contained" onClick={onCancelHandler}>Cancel</Button>
  </Form.Item>
</Box>

  </Form>
</div>
  )
}

export default AddComment