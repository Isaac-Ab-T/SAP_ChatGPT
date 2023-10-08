import React, { Component } from "react";
// const Greet=(props)=>{
//     return(
//         <div>
//             <h2>
//                 Hello {props.name}
//             </h2>
            
//         {props.children}
//         </div>

//     )
// }
class Greet extends Component
{
    constructor()
    {
        super();
        this.state={msg:"Visitor", val:0,cnt:0};

    }
    changeMsg()
    {
        if (this.state.val==1)
        {
            
        this.setState({
            msg:"Visitor",
            val:0
        })
        }
        else
        {
            this.setState(
                {
                    msg:"Subscriber!",
                    val:1
                }
            )
        }
    }
    incCount()
    {
        
        this.setState(prev=>({cnt:prev.cnt+1}),()=>{console.log(this.state.cnt)});
    }
    incFive()
    {
        this.incCount();
        this.incCount();
        this.incCount();
        this.incCount();
        this.incCount();
           
    }
    decCount()
    {
        
        this.setState({cnt:this.state.cnt-1},()=>{console.log(this.state.cnt)});
            }
    render()
    {
        return(
            <div>
                <h2>Welcome {this.state.msg}</h2>
                <button onClick={()=>this.changeMsg()}> Change </button>
                <div>
                    <h2>
                        {this.state.cnt}
                    </h2>
                    <button onClick={()=>this.incCount()}> Increase</button>
                    {/* <button onClick={()=>this.incFive()}> Increase 5</button> */}
                    
                    <button onClick={()=>this.decCount()}> Decrease</button>
                    
                </div>
                
            </div>
         )
        
    }

}
export default Greet