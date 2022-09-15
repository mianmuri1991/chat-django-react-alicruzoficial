import {useState,useEffect ,useRef} from "react"
import './App.css';
import Cajitaazul from "./cajitaazul";
import Cajitachat from "./cajitachat";

const chatSocket = new WebSocket('ws://localhost:8000/ws/chat/kakao/');

function App() {
  const [puerta,setpuerta] = useState(true)
  const [nombre,setnombre] = useState('')
  const [msj,setmsj] = useState('')
  const [converzacion,setconverzacion] = useState([])
 
  
  function captura_nombre(e){
    setnombre(e.value)
  }
  function actualizarMsj(e){
    setmsj(e.value)
  }
  
  function enviar(e){
    chatSocket.send(JSON.stringify({
      type:'message',
      message:msj,
      name:nombre
    }))
    setmsj('')
    e.preventDefault()
  }

  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    
    chatSocket.onopen = () => {
      console.log('WebSocket conectado');
    };
    chatSocket.onclose = function (evt) {
      console.log('WebSocket desconectado');
    };
    
  },[]);  

  chatSocket.onmessage = (message)=>{
    const dataFromserver = JSON.parse(message.data)
    if (dataFromserver){
      
      setconverzacion([...converzacion , 
        {
          msg:dataFromserver.message,
          name:dataFromserver.name
        }
      ])
    }
  }
  
  if(puerta){
    return(
      <div>
        <h1>Esta es la sala Kakao</h1>
        <label>Nombre</label>
        <input onChange={(e)=>captura_nombre(e.target)} type="text" />
        <button  onClick={()=>{setpuerta(false)}}> entrar</button>
      </div>
    )
   
  }else{
    return(
      <div>
        <div className="pantalla">

          <div id="elCuerpo" >
            {converzacion.map(m=>
            <>
              {m.name==nombre? <Cajitachat data={m}></Cajitachat>:<Cajitaazul data={m} ></Cajitaazul>}
            </>)}
          </div>

          <div className="enviar">
            <input className="chat" type="text" value={msj} onChange={(e)=>actualizarMsj(e.target)}/>
            <button className="botonEnviar" onClick={(e)=>{enviar(e)}} > enviar</button>
          </div>
          

        </div>
      </div>

    )
    
  }
}

export default App;
