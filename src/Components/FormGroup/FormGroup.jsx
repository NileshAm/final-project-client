import React from "react";

export const FormGroup = ({ label, name, className , type, onChange}) => {
    if(!type){
        type="text"
    }
    return (
        <div className={"form-group "+className}>
            <label>{label}</label>
            <input
                type={type}
                className="form-control"
                placeholder={"Enter your " + label.toLowerCase()}
                id={name}
                name={name}
                onChange={onChange}/>
        </div>
    );
};
