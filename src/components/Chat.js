import React from "react";
class Chat extends React.Component{

    constructor()
    {
        super();
        this.state={msg:"",val:0};
    }
    sendMsg()
    {
        console.log(document.getElementById("i1").value);
        this.setState({msg:document.getElementById("i1").value})
    }
    render()
    {
        return(
                <div className="c1">
                    <div>
                        <input type="text" id="i1"></input>
                        <button id="btn1" onClick={()=>this.sendMsg()}>Enter</button>
                    
                    </div>
                    <div>
                        
                    <label id ="t1">Text:{this.state.msg}</label>

                    </div>
                </div>

        )
    }

}
export default  Chat;