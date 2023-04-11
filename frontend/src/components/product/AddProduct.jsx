import React, { useState } from 'react'
import { useProductContext } from '../../hooks/useProductContext'
import { useAuthContext } from '../../hooks/useAuthContext'

function AddProduct() {

    const {dispatch} = useProductContext()
    const { user } = useAuthContext()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [prix, setPrix] = useState('')
    const [quantite, setQuantite] = useState('')
    const [image, setImage] = useState('')

    const [error, setError] = useState('')

    // handle an convert image
    const handleImage = (e) => {
        const file = e.target.files[0]
        setFileToBase(file)
    }

    const setFileToBase = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setImage(reader.result)
        }
    }

    const handleAddProduct = async (e) => {

        e.preventDefault()

        if(!user) {
            setError('You must be Logged in')
            return
        }

        const product = {
            propritaireId: user.user._id,
            name,
            description,
            prix,
            quantite,
            image,
            ventes: 0
        }

        const response = await fetch('/product', {
            method: 'POST',
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
            setName('')
            setDescription('')
            setPrix('')
            setQuantite('')
            setImage('')
            setError('')
            console.log('New product added : ', json)
            alert('Produit ajouté !')
            dispatch(
                {type: 'CREATE_PRODUCT', payload: json}
            )
        }
    }

  return (
    <div>
        <h1>Add Product</h1>
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
                <label className='form-label'>Image du produit :</label>
                <input 
                    className='form-control' 
                    type="file" 
                    onChange={handleImage}
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