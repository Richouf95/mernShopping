import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

function Product() {

  const productId = useLocation().pathname.replace('/product/', '')
  
  const [theProduct, setTheProduct] = useState(null)
  const [listeSouhait, setListeSouhait] = useState(null)
  const { user } = useAuthContext()
  const currentUserId = user && user.user._id
  const currentUserName = user && user.user.name
  const userSouhaitKey = currentUserName + currentUserId


  useEffect(() => {
    setListeSouhait(JSON.parse(localStorage.getItem(userSouhaitKey && userSouhaitKey)))
    const getTheProduct = async () => {
      const response = await fetch('/product/' + productId, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if(response.ok) {
        setTheProduct(json)
      }
    }

    if(user) {
      getTheProduct()
    }
    
  }, [productId, user, userSouhaitKey])

  const handleAddPanier = (x) => {
    if(x.quantite > 0){
      const storage = localStorage.getItem(userSouhaitKey && userSouhaitKey)
      const panierItem = {
        id: x._id,
        image: x.image,
        name: x.name,
        prix: x.prix,
        quantite: 1,
        sousTotal: x.prix * 1
      }
      if(!storage) {
        alert('Aticle ajouté au panier')
        return localStorage.setItem(userSouhaitKey && userSouhaitKey, JSON.stringify([panierItem]))
      } 
      if(storage) {
        const st = JSON.parse(storage)
        const checkPanierItem = st.filter(i => i.name === x.name)
        if(checkPanierItem.length === 0) {
          alert('Aticle ajouté au panier')
          localStorage.removeItem(userSouhaitKey && userSouhaitKey)
          localStorage.setItem(userSouhaitKey && userSouhaitKey, JSON.stringify([...st, panierItem]))
        } else {
          alert("L'article extiste déjà dans votre panier !")
        }
      }
    }
    else {
      alert('Désolé ce produit n\'est plus en stock ! ')
    }
  }

  const checkIfInPanier = listeSouhait && listeSouhait.filter(i => i.productId === productId)

  const btnInProductDetail = checkIfInPanier && checkIfInPanier[0] ? (<div className='d-flex flex-column'><p>Ce article est déjà dans votre panier</p><Link to='/panier' className='btn btn-dark'>Voir mon panier</Link></div>) : <button onClick={() => handleAddPanier(theProduct)} className='btn btn-dark'>Ajouter au panier</button>

  return (
    <div>
      <div>
        <div className='d-flex justify-content-center align-items-center'>
          <Link to='/'><span className="material-symbols-outlined mt-1 fw-bold">arrow_back</span></Link>
          <Link to='/' style={{textDecoration:'none', fontWeight:'bold'}}>Accueil</Link>
          <h4 className='text-center my-5' style={{marginLeft:'10px'}}>Article : {theProduct && theProduct._id}</h4>
        </div>
      </div>
        <div className='my-5'>
          <div className="row">
            <div className="col-12 col-lg-6 my-4">
              <img style={{width:'100%', maxHeight:'400px', borderRadius:'10px'}} src={theProduct && theProduct.image ? theProduct.image.url : ''} alt={theProduct && theProduct.image ? theProduct.image.public_id : ''} />
            </div>
            <div className="col-12 col-lg-6">
              <div className='d-flex justify-content-center align-items-center h-100 py-5' style={{background:'white', borderRadius:'10px'}}>
                <div>
                  <h3>Nom du produit : {theProduct && theProduct.name}</h3>
                  <h5>Description du produit : {theProduct && theProduct.description}</h5>
                  <h5>Stock disponible : {theProduct && theProduct.quantite}</h5>
                  <h5>Prix du produit : {theProduct && theProduct.prix} XOF</h5>
                  <div className='d-flex justify-content-center mt-5'>
                    {
                      btnInProductDetail && btnInProductDetail
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Product