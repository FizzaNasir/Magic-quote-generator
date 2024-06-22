import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import AddQuoteComponent from './AddQuote';
import { ModalStyles } from '../../styles';

const ModalComponent = ({onHandleClose, open, content}) => { 

  return (  
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
    styles={{
      zIndex: 200
   }} 
  >
<Fade in={open}>
 <Box sx={ModalStyles}>
 {content? content : <AddQuoteComponent onHandleClose={onHandleClose}/> }
 </Box>

    </Fade>
  </Modal>
 
  )
}

export default ModalComponent