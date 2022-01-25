import React from "react"

const Backdrop = props => {
    return (
    <div 
        className={classes.backdrop} 
        onClick={props.onConfirm} 
        />
        )
}

export default Backdrop