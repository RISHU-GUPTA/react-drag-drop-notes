import React, { forwardRef } from 'react'

 const Note= forwardRef(({content,initPos,...props},ref) =>{
  return (
    <div ref={ref} style={
        {
            position:'absolute',
            top:`${initPos?.y}px`,
            left:`${initPos?.x}px`,
            userSelect:'none',
            border:'1px solid black',
            padding:'10px',
            width:'200px',
            cursor:'move',
            backgroundColor:'lightyellow'
        }
    } {...props}> 📌 {content}</div>
  )
})
export default Note;