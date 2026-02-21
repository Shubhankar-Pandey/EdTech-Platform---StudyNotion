import { useEffect, useState } from "react";
import { CgAsterisk } from "react-icons/cg";



function RequirementField({name, label, register, errors, setValue, getValues}){

    const[requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);

    useEffect(() => {
        register(name, {
            required : true,
            validate : (value) => value.length > 0
        })
    }, [])

    useEffect(() => {
        setValue(name, requirementList);
    }, [requirementList])

    const handleAddRequirement = () => {
        if(requirement){
            setRequirementList([...requirementList, requirement]);
            setRequirement("");
        }
    }

    const handleRemoveRequirement = (index) => {
        const updatedRequirementList = [...requirementList];
        updatedRequirementList.splice(index, 1);
        setRequirementList(updatedRequirementList);
    }

    return (

        <div className="flex flex-col gap-1">
            <label htmlFor={name} className="flex">
                <p> {label} </p>
                <CgAsterisk className="text-pink-200 text-sm"/>
            </label>
            <input
                type="text"
                id={name}
                className="p-2 bg-richblack-700 text-richblack-5
                    rounded-md border-b-[1px] border-richblack-500 w-full"
                placeholder={label}
                value={requirement}
                onChange={(event) => {setRequirement(event.target.value)}}
            />
            <button className="text-yellow-50 w-min font-bold hover:underline"
            type="button"
            onClick={handleAddRequirement}>
                Add
            </button>
            <div className="flex flex-col gap-1 w-[35%]">
                {
                    requirementList.map((item, index) => (
                        <div key={index} className="flex gap-6 justify-between"> 
                            <p>{item}</p>
                            <button onClick={() => handleRemoveRequirement(index)}
                                type="button"
                                className="text-sm text-richblack-300 hover:underline">
                                clear
                            </button>
                        </div>
                    ))
                }
            </div>
            {
                errors[name] && (
                    <span>{label} is required </span>
                )
            }
            
        </div>

        

    )
}

export default RequirementField;   
