import * as userService from '../services/user.service'

import {useState} from "react";

const ResetPass = () => {
    const [email,setEmail] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        try{
            const res = userService.resetPass({email})
            return res
        }catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input placeholder={'email'} onChange={e=>setEmail(e.target.value)}/>
                <button type={'submit'}>Next</button>
            </form>
        </div>
    )
}

export default ResetPass
