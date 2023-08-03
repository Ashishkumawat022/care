import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form"

function Input_Renderer({ label, labelClassName, register, type, className, name, pattern, error, defaultValue }) {
    console.log(error,"errortype");
    return (
        <>
            <label className={labelClassName}> {label} </label>
            <input
                autoComplete="new-password"
                type={type}
                {...register(name, { pattern: pattern 
            })}
                className={className}
                // onChange={onChange}
            // value={value}
            defaultValue ={defaultValue}
            />
             {error?.type == "pattern" && (<p>Alphabetical characters only</p>)}
           
        </>
    )
}

export default React.memo(Input_Renderer);