
export type LoginType={
    error:string,
    emailValue:string,
    passwordValue:string,
    user:{role:string},
    onchange:(e: React.ChangeEvent<HTMLInputElement>) => void,
    onSubmit:(e: React.FormEvent) => Promise<boolean>
}

export type LoginPayloadType={
    email:string,
    password:string
}