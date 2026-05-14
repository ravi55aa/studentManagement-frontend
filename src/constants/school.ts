const schoolStatusTypes = ['verify' , 'verified' , 'blocked'];

const school_filter_Types = schoolStatusTypes.map((status)=>{
    return {name:status.toUpperCase(),value:status}
})

export {school_filter_Types}; 