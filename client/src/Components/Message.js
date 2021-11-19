import React from 'react'


const getStyle = (props)=>{
    let baseClass = "alert alert-dismissible ";
    if(props.message.error)
       baseClass = baseClass + "alert-danger";
    else
    baseClass = baseClass + "alert-success";
    return baseClass + " text-center";

}

const Message = props=>{
    return(
        <div className={getStyle(props)} role="alert">
         
            {props.message.message}
        </div>

    )
}

export default Message;