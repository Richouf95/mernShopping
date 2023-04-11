import { useState } from "react";
import { useAuthContext } from './useAuthContext'

export const useSingup = () => {

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const singup = async (name, tel, email, pwd, statut) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/user/singup', {
            method: 'POST',
            body: JSON.stringify({name, tel, email, pwd, statut}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = await response.json()

        if(!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok) {
            // save user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update the auth context
            dispatch(
                {type: 'LOGIN', payload: json}
            )

            setIsLoading(false)
        }
    }

    return { singup, isLoading, error }
 
}