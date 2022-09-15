export default function Cajitachat(props){

    return(
        <div className="cajitachat">
            <div className="textoCajita">
                {props.data.msg}
            </div>
            <div className="avatar">
                <h1>{props.data.name.toUpperCase()[0]}</h1>
            </div>
            

        </div>
    )
}