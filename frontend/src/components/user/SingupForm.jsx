import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSingup } from '../../hooks/useSingup'

function SingupForm() {

    const [name, setName] = useState('')
    const [tel, setTel] = useState('')
    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const [userStatut, setUserStatut] = useState(false)

    const { singup, isLoading, error } = useSingup()

    const handleSignupUser = async (e) => {
        e.preventDefault()

        let statut;

        if(!userStatut) {
            statut = 'Acheteur'
        } else {
            statut = 'Vendeur'
        }

        // const theUser = {
        //     name,
        //     tel,
        //     email,
        //     pwd,
        //     statut
        // }

        // console.log(theUser)

        await singup(name, tel, email, pwd, statut)

        // const response = await fetch('/user', {
        //     method: 'POST',
        //     body: JSON.stringify(theUser),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })
        // const json = await response.json()

        // if(!response.ok) {
        //     setError(json.error)
        // }

        // if(response.ok) {
        //     setName('')
        //     setTel('')
        //     setEmail('')
        //     setPwd('')
        //     setStatut(false)
        //     setError('')
        //     console.log('New user added : ', json)
        // }
    }

  return (
    <form onSubmit={handleSignupUser} style={{width:'450px', background:'white', padding: '30px', borderRadius:'10px'}}> 
        <h1>Inscription</h1>

        <div className='mb-3'>
            <label className='form-label'>Nom :</label>
            <input 
                className='form-control' 
                type="text" 
                onChange={e => setName(e.target.value)}
            />
        </div>
        <div className='mb-3'>
            <label className='form-label'>Numéro de téléphone :</label>
            <input 
                className='form-control' 
                type="number" 
                onChange={e => setTel(e.target.value)}
            />
        </div>
        <div className='mb-3'>
            <label className='form-label'>Email :</label>
            <input 
                className='form-control' 
                type="email" 
                onChange={e => setEmail(e.target.value)}
            />
        </div>
        <div className='mb-3'>
            <label className='form-label'>Not de passe :</label>
            <input 
                className='form-control' 
                type="password" 
                onChange={e => setPwd(e.target.value)}
            />
        </div>

        <div className="form-check form-switch mb-3">
            <input 
                value={userStatut}
                onClick={() => setUserStatut(!userStatut)}
                className="form-check-input" 
                type="checkbox" 
                role="switch" 
                id="flexSwitchCheckDefault" 
            />
            <label className="form-check-label">Vendeur</label>
        </div>

        <div className='mb-3'>
            <button className='btn btn-dark w-100' disabled={isLoading}>Valider inscription</button>
        </div>
        {
            error && <div className='error'>{error}</div>
        }
        <div>
            <p className='text-center'>Vous avez déjà un compte ? <Link to='/singin' style={{fontWeight:'bold', color:'black', textDecoration:'none'}}>Connectez vous.</Link></p>
        </div>
    </form>
  )
}

export default SingupForm