import React from 'react'


const getStyle = (props)=>{
    let baseClass = "alert alert-dismissible ";
    if(props.message.msgError)
        baseClass = baseClass + "alert-danger";
    else
        baseClass = baseClass + "alert-success";
    return baseClass + " text-center";
}

const Message = props=>{
    return(
        <div className={getStyle(props)} role="alert">
            <button type="button" className="close" data-dismiss="alert">&times;</button>
            {props.message.msgBody}
        </div>

    )
}

export default Message;