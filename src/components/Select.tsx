import { useId } from "react"
import React from 'react'

interface SelectProps {
    options: string[];
    label?: string;
    className?: string;
    props: string;
}

const Select = ( { options, label, className, ...props} : SelectProps) => {

    const id = useId();
    console.log(id);

  return (
    <div className="w-full">
        {
            label && <label className="mt-1 mb-1">{label}</label>
        }
        <select
        id={id}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${props}`}
        >
            {
                options?.map((option, index) => <option key={index+1}>{option}</option>)
            }
        </select>
    </div>
  )
}

export default React.forwardRef(Select)