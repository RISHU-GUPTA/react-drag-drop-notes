import React, { createRef, useEffect, useRef } from 'react'
import Note from './Note'

export default function Notes({notes=[],setNotes=()=>{}}) {
    useEffect(() => {
     const savedNotes=JSON.parse(localStorage.getItem('notes'))||[];
     const updatedNotes=notes.map((note)=>{
        const savedNote=savedNotes.find(n=>n.id==note.id);
        if(savedNote){
                return {...note,position:savedNote.position}
        }else{
            const position=determineNewPosition();
            return {...note,position}
        }
          
     })
     setNotes(updatedNotes);
     localStorage.setItem('notes',JSON.stringify(updatedNotes));
      return () => {
        
      }
    }, [notes.length])
    const notesRef=useRef([]);
    const determineNewPosition=()=>{
            const maxX=window.innerWidth-250;
            const maxY=window.innerHeight-250;
            return {
                x:Math.floor(Math.random()*maxX),
                y:Math.floor(Math.random()* maxY),
            }
    }
    const handleDragStart=(note,e)=>{
        console.log("mouse donw start")
        const {id}=note;
            const noteref=notesRef.current[id].current;
            const rect=noteref.getBoundingClientRect();
            const offsetX=e.clientX-rect.left;
            const offsetY=e.clientY-rect.top;

            const handleMousemove=(e)=>{
                const newX=e.clientX-offsetX;
                const newY=e.clientY-offsetY;
                noteref.style.top=`${newY}px`;
                noteref.style.left=`${newX}px`;

            }
            const handleMouseUp=()=>{
                document.removeEventListener('mousemove',handleMousemove);
                document.removeEventListener('mouseup',handleMouseUp);
                const finalRect=noteref.getBoundingClientRect();
                const newPosition={x:finalRect.left,y:finalRect.top};
                if(checkforOverlap(id)){
                        noteref.style.top=`${note.position.y}px`;
                        noteref.style.left=`${note.position.x}px`;

                }else{
                    handleNotePosition(note.id,newPosition);
                }

        }
            
            document.addEventListener('mousemove',handleMousemove);
            document.addEventListener('mouseup',handleMouseUp);
    }
    const checkforOverlap=(id)=>{
        const curreRef=notesRef.current[id].current;
        const currRect=curreRef.getBoundingClientRect();

        return notes.some((note)=>{
            if(note.id===id) return false;
            const otherRef=notesRef.current[note.id].current;
            const otherRect=otherRef.getBoundingClientRect();
            const overlap=!(currRect.right<otherRect.left||currRect.left>otherRect.right||currRect.bottom<otherRect.top||currRect.top>otherRect.bottom)
            return overlap;
        })

    }
    const handleNotePosition=(id,newPos)=>{
        const updatesNotes=notes.map((note)=>note.id===id? {...note,position:newPos}:note);
        setNotes(updatesNotes);
        localStorage.setItem('notes',JSON.stringify(updatesNotes));
    }
  return (
    <div>
        {notes.map((e)=>{
            console.log(e);
            return <Note key={e.id} ref={notesRef.current[e.id]?notesRef.current[e.id] :(notesRef.current[e.id]=createRef())} initPos={e.position} content={e.text} onMouseDown={(j)=>handleDragStart(e,j)}/>
        })}
    </div>
  )
}
