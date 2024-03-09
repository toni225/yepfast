import * as userService from '../services/user.service'

import {useState} from "react";
import {useNavigate} from "react-router-dom";

const UpdatePass = () => {
    const [password,setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
      e.preventDefault()

        try{
          const res = userService.updatePass({password})
            navigate('/login')
            return res
        }catch (e) {
            console.log(e)
        }
    }


  return (
      <div>
          <form>
              <input placeholder={'new password'} onChange={e=>setPassword(e.target.value)}/>
              <button onClick={handleSubmit}>Reset password</button>
          </form>
      </div>
  )
}

export default UpdatePass
