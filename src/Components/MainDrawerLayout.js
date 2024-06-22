import React, { useState , useEffect, useRef} from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import DrawerComponent from './Home/DrawerComponent';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import { useSelector } from 'react-redux';
import QuoteCard from './Quote/QuoteCard';

const drawerWidth = 240;

function MainDrawerLayout ()  {
  const [open, setOpen] = React.useState(false);
  const [filteredByTags, setfilteredByTags] = useState('');
  const [renderfilterQuotesbyTag, setrenderfilterQuotesbyTag] = useState([])

  const handleOpen = () => setOpen(true);
  const handleClose= () => setOpen(false);

  const Quotes = useSelector((state) => state.Quotes.quotesArray)
  const TagsPerQuote = useSelector((state)=> state.Tags.TagsArray) 

  const getFilterQuotes = () => {
    if (filteredByTags.trim() === "") {

      const RenderedQuotes = Quotes.map(quoteElement => {
        const filteredTags = TagsPerQuote.filter(el => el.quoteId === quoteElement.id);

        return (
          <QuoteCard
            key={quoteElement.id}
            id={quoteElement.id}
            quote={quoteElement.quote}
            author={quoteElement.author}
            dateCreated={quoteElement.dateCreated}
            timeCreated={quoteElement.timeCreated}
            tags={filteredTags}
          />
        );
      });
      setrenderfilterQuotesbyTag(RenderedQuotes);
    } else {
      const filteredQuotes = Quotes.filter((quote) => {
        
        const tags = TagsPerQuote.some(
          (tag) =>
            tag.quoteId === quote.id && tag.title.toLowerCase() === filteredByTags.toLowerCase()
        );
        return tags;
      });
     
      const RenderedQuotes = filteredQuotes.map(quote => {
        return(
        <QuoteCard
          key={quote.id}
          id={quote.id}
          quote={quote.quote}
          author={quote.author}
          dateCreated={quote.dateCreated}
          timeCreated={quote.timeCreated}
          tags={TagsPerQuote.filter(tag => tag.quoteId === quote.id)}
        />
      )});
  
      setrenderfilterQuotesbyTag(RenderedQuotes);
    }
  };

useEffect(() => {
    getFilterQuotes(); 
  }, [filteredByTags]);
  
return (
<>
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
       
          <DrawerComponent onHandleOpen = {handleOpen} onHandleClose={handleClose} open={open} filteredByTags={setfilteredByTags}/>
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Box sx={{ display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center',
          alignItems: 'center', }}
        >            
           {/* {renderfilterQuotesbyTag}              */}
       {    console.log("renderfilterQuotesbyTag", renderfilterQuotesbyTag)}
           Hello
        </Box>
      </Box>
    </Box>
    </>
  );
}


export default MainDrawerLayout