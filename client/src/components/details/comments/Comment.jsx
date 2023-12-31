import React,{useContext} from 'react';
import {Box, Typography,styled} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { DataContext } from '../../../context/DataProvider';
import { API } from '../../../service/api';

const Component=styled(Box)`
    margin-top:30px;
    background:#F5F5F5;
    padding:10px;
`;
const Container=styled(Box)`
    display:flex;
    margin-bottom:5px;
`;
const Name=styled(Typography)`
    font-weight:600;
    font-size:18px;
    margin-right:18px
`;
const StyledDate=styled(Typography)`
    color:#878787;
    font-size:14px;
`;
const DeleteIcon=styled(Delete)`
    margin-left:auto;
`;

const Comment = ({comment,setToggle}) => {

    const {account} =useContext(DataContext);

    const removeComment=async()=>{
        try {
            let response=await API.deleteComment(comment._id);
            if (response.isSuccess) {
                setToggle(prevState=>!prevState);  {/*if prevstate=true ,it becomes false*/}
            }
        } catch (err) {
            console.log(err);
        }
    }
  return (
    <Component>
         <Container>  {/*name and image */}
            <Name>{comment.name}</Name>
            <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
            {account.username===comment.name && <DeleteIcon onClick={()=>removeComment()}/>}
        </Container>
        <Box>   {/*comment*/}
            <Typography>{comment.comments}</Typography>
        </Box>
    </Component>
  )
}

export default Comment