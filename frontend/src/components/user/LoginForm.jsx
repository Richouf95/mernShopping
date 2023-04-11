import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { useLogin } from '../../hooks/useLogin'

function LoginForm() {

    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const { login, isLoading, error } = useLogin()

    const handleLoginUser = async (e) => {
        e.preventDefault()

        await login(email,pwd)
    }

  return (
    <form onSubmit={handleLoginUser} style={{width:'450px', background:'white', padding: '30px', borderRadius:'10px'}}>
        <h1>Connexion</h1>

        <div className='mb-3'>
            <label className='form-label'>Email :</label>
            <input 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='form-control' 
                type="email" 
            />
        </div>
        <div className='mb-3'>
            <label className='form-label'>Not de passe :</label>
            <input 
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                className='form-control' 
                type="password" 
            />
        </div>
        <div className='mb-3'>
            <button className='btn btn-dark w-100' disabled={isLoading}>Connexion</button>
        </div>
        {
            error && <div className='error'>{error}</div>
        }
        <div>
            <p className='text-center'>Votre première fois ici ? <Link to='/singup' style={{fontWeight:'bold', color:'black', textDecoration:'none'}}>Inscrivez vous.</Link></p>
        </div>
    </form>
  )
}

export default LoginForm