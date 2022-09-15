import {useState,useEffect} from "react"

const chatSocket = new WebSocket('ws://localhost:8000/ws/chat/kakao/');

function App() {
  const [puerta,setpuerta] = useState(true)
  const [nombre,setnombre] = useState('')
  const [msj,setmsj] = useState('')
  const [converzacion,setconverzacion] = useState('')
  function captura_nombre(e){
    setnombre(e.value)
  }
  function actualizarMsj(e){
    setmsj(e.value)
  }

  function enviar(e){
    chatSocket.send(JSON.stringify({
      type:'message',
      message:msj
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
      setconverzacion(dataFromserver.message + converzacion)
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
        <h1>Bienvenido {nombre}</h1>
        <div id="elCuerpo" style={{width:'300px',height:'400px'}}>
          {converzacion}
        </div>

        <input type="text" value={msj} onChange={(e)=>actualizarMsj(e.target)}/>
        <button onClick={(e)=>{enviar(e)}} > enviar</button>
      </div>

    )
    
  }
}

export default App;
