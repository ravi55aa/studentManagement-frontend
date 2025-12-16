
import { inputStyleRegisterSchoolAddress } 
    from '@/constants/createSchool';



const InputField = (props) => {
    const {uniqueKey,name,placeholder,type,onChange} = props;
    
    
    return (
        <div key={uniqueKey} className="flex flex-col items-start">
                <input
                type={type}
                name={name}
                onChange={onChange}
                placeholder={placeholder}
                className={inputStyleRegisterSchoolAddress}
                />
                <span id={name} className="text-red-500 errorDisplay"></span>
        </div>
    )

}

export default InputField


