export default function Cajitaazul(props){

    return(
        <div className="cajitachatAzul">
            <div className="avatarAzul">
                <h1>{props.data.name.toUpperCase()[0]}</h1>
            </div>
            <div className="textoCajitaAzul">
                {props.data.msg}
            </div>
        </div>
    )
}