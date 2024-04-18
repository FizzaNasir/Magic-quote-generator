import React from 'react'
import { Button, Form, Input, Select, Space} from 'antd';
import { nanoid } from '@reduxjs/toolkit'
import { AddQuote } from '../../Features/QuoteSlice';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { AddTag } from '../../Features/TagSlice';
import AvailableTags from '../../AvailableTags';
const { TextArea } = Input;

const MAX_COUNT = 3;
const nanoID = nanoid();
// const options = ['inspirational', 'motivating', 'captivating', 'sports', 'peace', 'Fictional'];
const options = AvailableTags;
const AddQuoteComponent = (onHandleClose) => {
   
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [Tag, setTag] = useState([])

  const handleChange = (value) => {
    setTag([...value]) 
  };

  useEffect(() => {
  console.log(Tag)
  
  }, [Tag])
  
  const onFinish = async (values) => {
    try {
      await form.validateFields(); // Trigger form validation
      const { Quote } = values; // Extract validated quote
     
      const NewQuote = {
        id: nanoID,
        quote: Quote,
        author: 'Fizza',
        dateCreated: new Date().toLocaleDateString('en-US'), 
        timeCreated: new Date().toLocaleTimeString('en-US'), 
      };

      const QuoteTags = {
        id: nanoid(),
        title: Tag,
        quoteId: nanoID
      };
      dispatch(AddQuote(NewQuote)); 
      dispatch(AddTag(QuoteTags));

      console.log(QuoteTags)
      form.resetFields(); 
      onHandleClose()
    } catch (errorInfo) {
    }
  };
  return (
    <div>
     
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
     }}
     initialValues={{
      remember: true,
     }}
 
      autoComplete="off"
      onFinish={onFinish}
  >
    <Form.Item
      label="Write a Quote"
      name="Quote"
      rules={[
       {
         required: true,
       },
     ]}
    >
    <TextArea rows={4} />
    </Form.Item>
  <Space
     style={{
       width: '100%',
      
     }}
     rules={[
      {
        required: true,
      },
    ]}
     direction="vertical"
   >
     <Select
       mode="multiple"
       maxCount={MAX_COUNT}
       allowClear
       style={{
         width: '100%',
         zIndex: 20000
       }}
       placeholder="Please select"
        onChange={handleChange}
       options={options}
     />
   </Space>

 <Form.Item
   wrapperCol={{
     offset: 8,
     span: 16,
   }}
   style={{
    display: 'flex',
    flexDirection: 'flex-start'
   }}
  >
   <Button 
    type="primary" 
    htmlType="submit"
    style={{
      marginTop: 20,
      paddingLeft: 25,
      paddingRight: 25,
    
     }}
    >
     Post
   </Button>
  </Form.Item>
 
  </Form></div>
  )
}

export default AddQuoteComponent