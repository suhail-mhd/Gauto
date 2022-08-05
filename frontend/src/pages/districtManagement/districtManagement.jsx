import { Box, Button, Container, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SideBar from '../../components/sideBar/sideBar'
import TextField from '@mui/material/TextField';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Grid from "@mui/material/Grid";
import axios from 'axios';
import Modal from '@mui/material/Modal';
import TableBody from '@mui/material/TableBody';


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
  


function DistrictManagement() {
    const [district , setDistrict] = useState('')
    const [districtData , setDistrictData] = useState([])
    const [deleterender , setDeleteRender] = useState(0)
    const [postrender  , setPostRender] = useState(0)
    const [deleteId , setDeleteId] = useState()
    const [open, setOpen] = React.useState(false);
    const [distMessage , setDistrictMessage] = useState('')


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    

    const districtHandler = () => {
        
        try {
            axios.post('http://localhost:5000/api/admin/addDistrict',{district}).then((res)=>{
              console.log(res.data.message);
              setDistrictMessage(res.data.message)
            })
            setPostRender(postrender+1)
            
        } catch (error) {
            console.log("error happend while uploading district data to database" , error);
        }

    }

    const getDistrictHandler = () => {
        try {
            axios.get('http://localhost:5000/api/admin/getdistrictData').then((res)=>{
                // console.log(res);
                setDistrictData(res.data.getdata)

            })
        } catch (error) {
            
        }
    }

    const dltFun = (id) => {
        setDeleteId(id)
        handleOpen()

    }

    const districtDelete = async() => {

        try {
           await axios.post('http://localhost:5000/api/admin/deleteDistrict',{deleteId})
           setOpen(false)


           setDeleteRender(deleterender+1)
        } catch (error) {
            
        }
        setOpen(false)
    }

    

    useEffect(()=>{
       console.log("hai");
     getDistrictHandler()
    },[postrender,deleterender])

  return (
    <div>
        <SideBar/>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Typography id="modal-modal-title" textAlign='center' variant="h6" component="h2">
           Are You Sure Want to Delete
          </Typography>
            <div style={{display:'flex',justifyContent:'space-evenly',marginTop:20}} >
              <div>
                <Button variant='contained' onClick={districtDelete}  >Yes</Button>
              </div>
              <div>
                <Button  variant='contained' onClick={handleClose}>NO</Button>
              </div>
              </div>
        </Box>
      </Modal>
        <Box sx={{paddingLeft:30 }}>
            <Typography variant='h4' component='h6' marginLeft={10} fontWeight={'bold'} fontFamily="egoe UI"  >District Management</Typography>
            {distMessage ? <Typography variant='p' component='h6' textAlign='center' color='error' >{distMessage}</Typography> : null }
            <Box   component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off" 
      >
         
      
                <div style={{marginLeft:570}} >
            <TextField id="outlined-basic" label="Distrcit" variant="outlined" sx={{width:350}} onChange={(e)=>setDistrict(e.target.value)}  />
            <br/>
            <Button onClick={districtHandler} variant='contained' sx={{width:200 ,marginTop:2,marginLeft:19}} >Add District</Button>
            </div>  
           
            </Box>

                <Grid container>
                    {/* {
                        districtData.map((data)=>{
                            return(
                                <Grid item xs={4} sm={4} md={4} lg={4} xl={4} >
                                <Box style={{marginLeft:50,marginTop:50}} >
                            <div style={{display:'flex',width:350,height:60}} >
                                <div style={{marginTop:10,marginLeft:4}} >
                                <Typography variant='h6' ></Typography>
                                </div>  
                               <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                               <div style={{marginTop:10,marginLeft:20}}>

                               <Button variant='contained' color='error' onClick={()=>dltFun(`${data._id}`)} ><DeleteOutlineIcon/></Button>
                               </div>
                               </Grid>
                            </div>
                        </Box>
                             
                                
                            </Grid>
                            )
                        })
                    } */}

<Box sx={{width:600,marginLeft:10}} marginTop={3} marginBottom={3}>

<TableContainer component={Paper}>
<Table sx={{ maxWidth: 600 }} aria-label="simple table">
<TableHead>
<TableRow>
<TableCell align="center">District</TableCell>
<TableCell align="center">Action</TableCell>
</TableRow>
</TableHead>
<TableBody>
{
    districtData.map((data,index)=>{
        return(

<TableRow
  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
  key={index}
>
                    
 {/* <TableCell component="th" scope="row"  >
    {Obj.couponname}
  </TableCell> */}
  <TableCell align="center">{data.district}</TableCell>
  <TableCell align="center">  <Button color='error' onClick={()=>dltFun(`${data._id}`)} ><DeleteOutlineIcon/></Button></TableCell>
                    
</TableRow>
            )
        })
    }
 
</TableBody>
</Table>
</TableContainer>

</Box>
                    
          </Grid>
        </Box>
    </div>
  )
}

export default DistrictManagement
