import React, { useState } from 'react'
import { useProductContext } from '../../hooks/useProductContext'
import { useAuthContext } from '../../hooks/useAuthContext'

function AddProduct({data}) {

    const {dispatch} = useProductContext()
    const { user } = useAuthContext()

    const [productId] = useState(data._id)
    const [name, setName] = useState(data.name)
    const [description, setDescription] = useState(data.description)
    const [prix, setPrix] = useState(data.prix)
    const [quantite, setQuantite] = useState(data.quantite)

    const [error, setError] = useState('')

    const handleAddProduct = async (e) => {

        e.preventDefault()

        if(!user) {
            return
        }

        const product = {
            _id: productId,
            propritaireId: user.user._id,
            name,
            description,
            prix,
            quantite,
            image: data.image,
            ventes: 0
        }

        const response = await fetch('/product/' + data._id, {
            method: 'PATCH',
            body: JSON.stringify(product),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
            alert('Erreur : Produit non enregistré !')
        }
        if(response.ok) {
            dispatch(
                {type: 'UPDATE', payload: product}
            )
        }
    }

  return (
    <div>
        <h1>Modifier le produit</h1>
        <form onSubmit={handleAddProduct} className='text-start'>
            <div className='mb-3'>
                <label className='form-label'>Nom du produit :</label>
                <input 
                    className='form-control' 
                    type="text" 
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Description du produit :</label>
                <input 
                    className='form-control' 
                    type="text" 
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Prix du produit :</label>
                <input 
                    className='form-control' 
                    type="number" 
                    onChange={(e) => setPrix(e.target.value)}
                    value={prix}
                />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Quantité du produit :</label>
                <input 
                    className='form-control' 
                    type="number" 
                    onChange={(e) => setQuantite(e.target.value)}
                    value={quantite}
                />
            </div>
            <div className='mb-3'>
                <button type="submit" className="btn btn-dark mb-3 w-100" data-bs-dismiss="modal">Enregistrer</button>
            </div>
            {
                error && <div>{error}</div>
            }
        </form>
    </div>
  )
}

export default AddProduct