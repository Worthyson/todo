import styled from 'styled-components'
import CreateIcon from '@material-ui/icons/Create';
import { Button, Input } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {  useEffect, useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';

function Home() {

    const [input,setInput] = useState('')
    const [lists,setLists] = useState([])
    const[edit,setEdit] = useState(null)
    const[editText,setEditText] = useState('')

    useEffect(() => {
     const temp = localStorage.getItem('lists')
     const loadedTodos = JSON.parse(temp)
     if(loadedTodos) {
         setLists(loadedTodos)
     }
        
    }, [])

    useEffect(() => {
       const store = JSON.stringify(lists)
        localStorage.setItem('lists',store)
        }
    , [lists])
   
   
    const handleSubmit = (e) =>{
        e.preventDefault();

        const newList = {
            id:new Date().getTime(),
            text:input,
            completed:false,
    
        }
        setLists([...lists].concat(newList))
        setInput('')
    }
   
    const toggleComplete = (id) =>{
        setLists([...lists].map((todo)=>{
            if(todo.id === id) {
                todo.completed = !todo.completed
            }
            return todo
        }))
    }
    // const isEmpty = false;
    // const onFormSubmit = (e) =>{
    //          e.preventDefault();
    //         setLists([...lists,{id:uuidv4,input:input,completed:false}])
    //         setInput('')
            
    //     }
          //{id:uuidv4()},
         const handleDelete = (id) =>{
           setLists([...lists].filter((todo)=> todo.id !==id))
          
        }

        const saveList = (id) =>{
           const EditSubmit = [...lists].map((todo)=>{
                if(todo.id === id) {
                    todo.text = editText
                }
                return todo
            })
            setLists(EditSubmit)
            setEdit(null)
            setEditText('')
        }

        // const handleComplete = (todo) =>{
        //     setLists(
        //         lists.map((item)=>{
        //             if(item.id=== todo.id){
        //                 return {...item,completed:!item.completed}
        //             }
        //             return item;
        //         })
        //     )
        // }
    return (
       
        <Main>
            <FormContainer>

               <Form onSubmit={handleSubmit}>
                <Input type="text" placeholder='To Do List' value={input} onChange={(e)=>setInput(e.target.value)}/>
                 <Button type="submit" variant='contained' color='secondary' >Submit</Button>
                 </Form>
                    {lists.map((todo)=>(
                    <ListGenerate key={todo.id}>
                        {edit === todo.id ? (<Input type="text" onChange={(e)=>setEditText(e.target.value)} value={editText} />) : (todo.text)}
                        {/* {edit === todo.id ?(<CreateIcon onChange={(e)=>setEditText(e.target.value)} value={editText}/>):(todo.text)}                 */}
                        <Button variant='contained' color='primary'  onClick={()=>handleDelete(todo.id)}><DeleteIcon/></Button>

                       
                       <Checkbox onChange={()=>toggleComplete(todo.id)} checked={todo.completed}/>
                        {/* <input type="checkbox" onChange={()=>toggleComplete(todo.id)} checked={todo.completed} /> */}
                        {edit === todo.id ? (<Button type='submit' variant='contained' color='secondary' onClick={()=>saveList(todo.id)}>Submit Edit</Button>) : (<Button type='submit'  variant='contained' color='primary' onClick={()=>setEdit(todo.id)}><CreateIcon/></Button>) }
                        
                        
                       </ListGenerate>
                       ))}
               
                 </FormContainer>
                    </Main>
         
       
    )
}

export default Home

const Main = styled.div`
display:flex;
width:100%;
height:100%;
max-width:100vw;
max-height:100vh;


`;
const Form = styled.form`
display: flex;
flex-direction:column;
  justify-content: center;
  width: 80%;
  margin: 30px auto;
  padding-bottom: 10px;
  border-bottom: 5px solid #9ad3ff;
  border-radius: 5px;
 

 >input{
     width:100%;
     margin:auto;
  border: none;
  border-radius: 5px;
  padding: 10px;
   outline: none;
  font-size: 17px;
  font-family: serif;
 }

 button {
     width:20%;
     align-items:center;
     margin:auto;
 }
`

const ListGenerate = styled.div`
display:flex;
justify-content:center;
align-items:center;

`
const FormContainer = styled.div`
width:70%;
height:600px;
 display:flex;
 margin: 5% 25%;
 flex-direction:column;
 justify-content:center;
background: rgba( 255, 255, 255, 0.25 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
backdrop-filter: blur( 4px );
-webkit-backdrop-filter: blur( 4px );
border-radius: 10px;
border: 1px solid rgba( 255, 255, 255, 0.18 );
`