
import { createRoot } from 'react-dom/client'
import logo from "./LOGO.png"
import App from './App'


createRoot(document.getElementById('root')).render(
   <>
   <header>
   <img src={logo} alt="Indias logo" style={{width:"250px",height:"125px",position:'absolute',top:"10px",left:"50px" }} />
   <h1 style={{position:'absolute',top:"-70px",right:"100px" ,fontFamily:"Protest Guerrilla",fontSize:"30px"}} >BAIL RECKONER</h1>
   </header>
  
   <App/>
   
   </>
)
