import React, { useId } from "react";

interface InputProps {
    type: string;
    props?: string;
    label?: string;
    placeholder: string;
}

// const Input = React.forwardRef(function Input( { type = "text", ...props}: InputProps ) => {

//     const id = useId();

//     console.log(id);

//   return (
//     <input type={type} className={`${props} p-2 outline-none border-none text-black rounded`} />
//   ))
// }

const Input = React.forwardRef(function Input({
    type = "string",
    label,
    placeholder,
    ...props
}: InputProps){
    
    const id = useId();
    
    return (
      <div>
        {label && (
          <label className="inline-block pl-1 mb-1" htmlFor={id}>
            {label}
          </label>
        )}
        <input
          type={type}
          className={`${props} p-2 outline-none border-none text-black rounded`}
        />
      </div>
    );
});

export default Input