const feeType = {
  COURSE: 'COURSE',
  ANNUAL: 'ANNUAL',
  EXAM: 'EXAM',
  CENTER: 'CENTER',
  OTHER: 'OTHER',
};

const feeTypes=Object.freeze(feeType);

const filter_Fee_Types = Object.entries(feeTypes)
                            .map(([name,value])=>{ 
                              return { name, value}
                            });

export {feeTypes,filter_Fee_Types}; 