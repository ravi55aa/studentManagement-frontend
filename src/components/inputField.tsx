
import { inputStyleRegisterSchoolAddress } 
    from '@/constants/createSchool';



const InputField = (props) => {
    const {uniqueKey,
            label,
                name,
                    placeholder,
                        type,
                            onChange,
                                value} = props;

    
    return (
        <div key={uniqueKey} className="flex flex-col items-start">
                <label className="block capitalize text-sm font-medium mb-1" htmlFor={name}>{label??name}</label>
                <input
                    {...props}
                    type={type}
                    name={name}
                    onChange={onChange}
                    className={inputStyleRegisterSchoolAddress}
                    placeholder={placeholder}
                    value={value}
                />
                <span id={name?.includes(".")?name.split(".").join(" ") :name} className="text-red-500 errorDisplay"></span>
        </div>
    )
}


export default InputField


