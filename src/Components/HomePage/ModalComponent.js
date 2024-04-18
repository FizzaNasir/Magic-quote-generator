import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import AddQuoteComponent from './AddQuote';
import AddComment from '../Comments/AddComment';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  pb: 15,
  pt: 10
  
};


const ModalComponent = ({onHandleClose, open, content}) => { 

  return (  
    <>
    <Modal
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    open={open}
    onClose={onHandleClose}
    closeAfterTransition
    slots={{ backdrop: Backdrop }}
    slotProps={{
      backdrop: {
        timeout: 500,
      },
     
    }}
    style={{
      zIndex: 200
   }} 
  >
<Fade in={open}>
 <Box sx={style}>
 {content? content : <AddQuoteComponent onHandleClose={onHandleClose}/> }
  
 </Box>
    </Fade>
  </Modal>

</>
 
  )
}

export default ModalComponent