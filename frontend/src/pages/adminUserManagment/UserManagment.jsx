import React, { forwardRef, useEffect, useState } from 'react'
import SideBar from '../../components/sideBar/sideBar'
import axios from 'axios'
import { Box } from '@mui/system';
import MaterialTable from '@material-table/core';
import LockIcon from '@mui/icons-material/Lock';
import AddBox from '@mui/icons-material/AddBox';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import Check from '@mui/icons-material/Check';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import Clear from '@mui/icons-material/Clear';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import Edit from '@mui/icons-material/Edit';
import FilterList from '@mui/icons-material/FilterList';
import FirstPage from '@mui/icons-material/FirstPage';
import LastPage from '@mui/icons-material/LastPage';
import Remove from '@mui/icons-material/Remove';
import SaveAlt from '@mui/icons-material/SaveAlt';
import Search from '@mui/icons-material/Search';
import ViewColumn from '@mui/icons-material/ViewColumn';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Typography from "@mui/material/Typography";

function UserManagement() {
  // const [tableData , setTableData] = useState([])
  const [isBlock , setIsBlock ] = useState()
  const [id , setId] = useState()
  const [render , Setrender] = useState(0);


  console.log(isBlock);
  console.log(id);


  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };


  const columns =[
    {
      title:"Name" , field:'name'
    },
    {
      title:'Email' , field:'email'
    },
    {
      title:'Age',field:'age'
    },
    {
      title:"Address",field:'address'
    },
    {
      title:'District',field:'district'
    },
    {
      title:'Gender',field:'gender'
    },
    {
      title:'Phone',field:'phone'
    },
    {
      title:'Block/UnBlock',field:'isBlock'
    }

  ]




  // Block user
  const Block = async(id) => {
    // console.log(id);

    const data = await axios.patch(`/api/admin/usermanagementUpdate/${id}`)

    setIsBlock(data.data.IsBlock)
    setId(data.data.id)

    Setrender(render+1)

    // console.log(data.data);
    

  }


  // Unblock user
  const Unblock = async(id) => {
    console.log(id);

    const data = await axios.patch(`/api/admin/usermanagementUpdateUnblock/${id}`)

    setId(data.data.id)
    setIsBlock(data.data.IsBlock)
    Setrender(render+1)
  }


  const [data,setData] = React.useState([])
  


  // console.log(data);

  const row = async()=>{

      try {
        await axios.get('/api/admin/userManagement').then((res)=>{
          // console.log(res.data);
          setData(res.data)
        })
      } catch (error) {
          console.log("something Happend",error);
      }
   
}

  useEffect(()=>{
    row()
  },[render])

  
    
  return (
    <div>
      <SideBar/>
      <Box sx={{paddingLeft:30 }}>
      <Typography variant='h4' component='h6' marginLeft={10} fontWeight={'bold'} fontFamily="egoe UI" marginBottom={10} >User Management</Typography>
      <div style={{ height: '100vh', width: '100%' }}>
      <MaterialTable
      title=""
      columns={columns} 
      data={data}
      icons={tableIcons}
      actions={
        [
          {
            icon:LockOpenIcon,
            tooltip:'UnBlock User',
            onClick: (event, rowData) => {
                Unblock(`${rowData._id}`)
            }
          },
          {
            icon:LockIcon,
            tooltip:'Block User',
            onClick: (event, rowData) => {
                Block(`${rowData._id}`)
            }
          }
        ]
      }
      />
    </div>
    </Box>
    </div>
    
  )
}

export default UserManagement