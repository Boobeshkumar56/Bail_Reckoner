
import React from 'react'
import judge from "./judi.png" 
import prisoner from './undertrail.png'
import lawyer from "./lawyer.png"
import './CardComponent.css'
import { useNavigate } from 'react-router-dom'
  
export default function CardComponent(){
  const navigate=useNavigate();
  const handleclick=(path)=>{
    navigate(path);
  }

  return (<div id="card-wrapper">
  <div id="container1" onClick={()=>handleclick('/Undertrail-prisoner')} style={{ cursor: 'pointer' }}>
    <center><img src={prisoner} alt=""  style={{width:"250px", height:"250px"}}/></center>
    <div id="innerdiv">
    <p>Continue as a Undertrial prisoner to Register/bailing process</p>
    </div>
    
   </div>
    <div id="container2" onClick={()=>handleclick('/Lawyers')} style={{ cursor: 'pointer' }}>
    <center><img src={lawyer} alt=""  style={{width:"350px", height:"250px"}}/></center>
    <div id="innerdiv">
    <p>Continue as a Lawyer for a prisoner to check Bail Eleigibility and  track process</p>
    </div>
    
   </div>
   <div id="container3" onClick={()=>handleclick('/Judies')} style={{ cursor: 'pointer' }}>
    <center><img src={judge} alt="" style={{width:"350px", height:"250px"}}/></center>
    <div id="innerdiv">
    <p>Continue as a Judge to know about the Bail requests and prisoners info</p>
    </div>
    
   </div>
  
   
   </div>
   
  )
}
