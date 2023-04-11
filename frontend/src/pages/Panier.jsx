import React, { useEffect } from 'react'
import MesProduits from '../components/tables/MesProduits'
import MesSouhaits from '../components/tables/MesSouhaits'
import MonPanier from '../components/tables/MonPanier'
import Ventes from '../components/tables/Ventes'
import { useProductContext } from '../hooks/useProductContext'
import { useAuthContext } from '../hooks/useAuthContext'

function Profile() {

  const {products, dispatch} = useProductContext()
  const { user } = useAuthContext()


  useEffect(() => {
    const getAllProduits = async () => {
      const response = await fetch('/product', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if(response.ok) {
        dispatch(
          {type: 'SET_PRODUCTS', payload: json}
        )
      }
    }

    if(user) {
      getAllProduits()
    }
    
  }, [dispatch, user])

  console.log(user.user.statut)

  return (
    <div>
        <h1 className='text-center my-5'>Panier</h1>
        <hr />
        <div className="row">
          <div className="col-12">
            {user.user.statut === 'Vendeur' && <MesProduits produits={products} user={user} />}
            <MesSouhaits produits={products} user={user} />
            <MonPanier produits={products} user={user} />
            {user.user.statut === 'Vendeur' && <Ventes user={user} />}
          </div>
        </div>
    </div>
  )
}

export default Profile