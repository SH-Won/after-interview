import React, { useEffect, useState } from 'react'
// import Table from '@material-ui/core/Table'
// import TableBody from '@material-ui/core/TableBody'
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
import {Table,TableBody,TableCell,TableHead,TableRow,TableContainer,Paper} from '@material-ui/core'




const App = () => {
  const [users,setUsers] = useState([]);

  const renderUserInfo = (user) => {
    const [number,ext] = user.phone.split(' x');

    return <TableRow key={user.id}>
    <TableCell>{user.id}</TableCell>
    <TableCell align="left">{user.username}</TableCell>
    <TableCell align="left">{number} {ext &&<span style={{fontSize:'10px'}}>ext : {ext}</span> }</TableCell>
    <TableCell align="left">{user.email}</TableCell>
    <TableCell align="left">{user.website}</TableCell>
    <TableCell align="left">{user.address.street}</TableCell>
    <TableCell align="left">{user.company.name}</TableCell>
    <TableCell align="left">{user.completed}</TableCell>
    </TableRow>
  }

  useEffect(() => {
    (async () => {
      try{
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        if(res.ok){
          const usersInfo = await res.json();
          const userTodos = await Promise.all(usersInfo.map(async (user) => {
            return fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/todos`).then(res => res.json()).then(data => ( {completed : data.filter(d => d.completed).length } ));
          }));

          const totalUsers = usersInfo.map((user,id) => {
            return {
              ...user,
              completed : userTodos[id].completed,
            }
          });
          setUsers(totalUsers);  
        }

      }catch(e){
          throw new Error('서버에서 데이터를 불러오지 못했습니다');
      }
    })();
  },[]);

  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell align="left">username</TableCell>
          <TableCell align="left">phone number</TableCell>
          <TableCell align="left">email</TableCell>
          <TableCell align="left">website</TableCell>
          <TableCell align="left">address</TableCell>
          <TableCell align="left">company</TableCell>
          <TableCell align="left">completed</TableCell>
          
        </TableRow>
      </TableHead>
      <TableBody>
          {users.map(user => renderUserInfo(user))}  
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default App