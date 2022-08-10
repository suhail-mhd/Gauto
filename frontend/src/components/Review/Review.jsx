import React,{useEffect, useState} from 'react'
import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import axios from 'axios'
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function ProductReview({id}) {
  const [review,setReview] = useState('')
  const [userName , setUserName] = useState()
  const[carId , setCarID] = useState()
  const data = localStorage.getItem('userInfo')
  const value = JSON.parse(data)
  const [render,setRender] = useState(false)
  const [deleteRender , setDeleteRender] = useState(false)
  const [comments,setComments]= useState([])
  const [deleteId , setDeleteId] = useState()

  // modal for deleting

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const deleteFuc = (id) => {
    // console.log(id);
    setDeleteId(id)
    setOpen(true);
  }

  // 



  // console.log(resCarId);
 
  const nameSetting = () => {
    {
      value &&     setUserName(value.name)

    }
    setCarID(id)
  }
  




  const handleReview = (e) => {
      e.preventDefault()

     try {
      axios.post('/api/user/postingComment',{
        userName,review,carId
      }).then((response)=>{
        console.log(response);
      })

      setRender(true)

     } catch (error) {
       console.log("Something happened" , error);
     }


  }


  const GetReviews = () => {
    
    try {
      axios.post('/api/user/gettingReviews',
        {carId}
      ).then((response)=>{
        setComments(response.data.carData)
      })
    } catch (error) {
        console.log(error);
    }
  }


  const handleDelete = (id)=>{

    try {
      axios.post(`/api/user/deleteComment/${deleteId}`).then((res)=>{
        console.log(res);
      })
      setOpen(false);
      setDeleteRender(true)
    } catch (error) {
        console.log(error);
      
    }

  }


  useEffect(()=>{
    nameSetting()
    GetReviews()
  
  },[render,deleteRender])
  
  useEffect(()=>{
    setRender(false)
    setDeleteRender(false)
  })
 
  return (
    <div>
<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" textAlign='center' component="h2">
            Are you sure want to Delete!
          </Typography>
      <Box sx={{justifyContent:'center',display:'flex'}} >
      <Button onClick={handleDelete} >Yes</Button>
      <Button onClick={()=>setOpen(false)} >No</Button>
      </Box>
        </Box>
      </Modal>
      
              {value ? 
        <Box marginTop={5} marginLeft={5} >
            <Typography variant='h6' component='h6' >Write a review about the product?</Typography>
            <form onSubmit={handleReview} >
              <div  style={{display:'flex'}} >
              <div style={{width:"90%"}} >
            <TextField id="standard-basic" label="Say Something Nice" variant="standard"  fullWidth  onChange={(e)=>setReview(e.target.value)} />
              </div>
              <div style={{marginTop:10}}>
              <Button variant='contained' type='Submit' >Submit</Button>
              </div>            
              </div>
            </form>
            <br/>
        </Box>
              :
              <Typography  variant='p' component='h6' sx={{color:'red',padding:1.5,marginTop:10,justifyContent:'center',display:'flex'}} >
              Please Login To Write Review!
            </Typography>
              }

       {
         value ?
         <Box marginTop={3} marginLeft={5} >
         <Typography variant='h6' component='h6' style={{fontWeight:"bold"}} >Reviews</Typography>
       </Box>
       :
       null
       }

    <Grid  container>      
      <Grid item xs={12} lg={12} sm={12} md={12} xl={12}  >
        {comments.map((data)=>{
          return(
       
             <Box margin={2}>
            {
              data.carId === carId  ?
              <Paper elevation={6} sx={{width:'100%',height:'auto'}} > 
              <Typography sx={{marginLeft:3 ,paddingTop:2}} variant='h6' component='h6' >{data.userName}</Typography>
              <Box>
                <Typography variant='body1' component='h6' sx={{margin:3}} >
                  {data.review}
                </Typography>
                {
                  userName === data.userName ?
                  <Button sx={{marginLeft:2}} color={'error'} onClick={()=>deleteFuc(`${data._id}`)} >Delete</Button>
                  :
                  null
                }
              </Box>
              <br/>
            </Paper>
            :
            null
            }
           </Box>
         
          )
        })}


        
          </Grid>
         

          
          </Grid>
          
        
    </div>
  )
}

export default ProductReview