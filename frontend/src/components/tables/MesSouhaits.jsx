import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import StripeCheckout from 'react-stripe-checkout'
import { useAuthContext } from '../../hooks/useAuthContext'

function MesSouhaits({produits}) {

  const {  user } = useAuthContext()
  // console.log(produits[0]._id)
  const currentUserId = user && user.user._id
  const currentUserName = user && user.user.name
  const userSouhaitKey = currentUserName + currentUserId

  const [listeSouhait, setListeSouhait] = useState(null)
  const [increm, setIncrem] = useState(0)
  const [totalPanier, setTotalPanier] = useState(null)
  

  useEffect(() => {
    setListeSouhait(JSON.parse(localStorage.getItem(userSouhaitKey && userSouhaitKey)) && JSON.parse(localStorage.getItem(userSouhaitKey && userSouhaitKey)))
    const cobail = JSON.parse(localStorage.getItem(userSouhaitKey && userSouhaitKey)) && JSON.parse(localStorage.getItem(userSouhaitKey && userSouhaitKey)).map(i => i.sousTotal)
    const initialValue = 0;
    const sum = cobail && cobail.reduce(
      (a,b) => a + b,
      initialValue
    )
    setTotalPanier(sum)
  }, [increm,userSouhaitKey])

  const handleIncrement = (i, index) => {
    const itemInDb = produits && produits.filter(x => x._id === i.productId)[0]

    // console.log(itemInDb)
    // console.log(i)
    
    if(!(itemInDb.quantite - 1 > i.quantite)) {
      return alert('Désolé vous avez atteint la limite du stock !')
    }
    setIncrem(increm + 1)
    const item = listeSouhait[index]
    const newItem = {
      productId: item.productId,
      propritaireId: item.propritaireId,
      image: item.image,
      name: item.name,
      prix: item.prix,
      quantite: item.quantite + 1,
      sousTotal: (item.quantite + 1) * item.prix
    }
    const copyListeSouhait = [...listeSouhait]
    copyListeSouhait[index] = newItem
    localStorage.removeItem(userSouhaitKey && userSouhaitKey)
    localStorage.setItem(userSouhaitKey && userSouhaitKey, JSON.stringify(copyListeSouhait))
  }

  const handleDecrement = (i, index) => {
    setIncrem(increm - 1)
    const item = listeSouhait[index]
    if(item.quantite > 1) {
      const newItem = {
        productId: item.productId,
        propritaireId: item.propritaireId,
        image: item.image,
        name: item.name,
        prix: item.prix,
        quantite: item.quantite - 1,
        sousTotal: (item.quantite - 1) * item.prix
      }
      const copyListeSouhait = [...listeSouhait]
      copyListeSouhait[index] = newItem
      localStorage.removeItem(userSouhaitKey && userSouhaitKey)
      localStorage.setItem(userSouhaitKey && userSouhaitKey, JSON.stringify(copyListeSouhait))
    }
  }

  const handleDeleteItem = (i, index) => {
    setIncrem(increm + 1)
    const copyListeSouhait = [...listeSouhait]
    copyListeSouhait.splice(index, 1)
    localStorage.removeItem(userSouhaitKey && userSouhaitKey)
    localStorage.setItem(userSouhaitKey && userSouhaitKey, JSON.stringify(copyListeSouhait))
  }

  // Facturation
  const handleToken = async (token) => {

    if(!user) {
      return
    }

    setIncrem(increm + 10)

    // const getTheUser = await fetch('/user/642a6e1b5a03da0410cd0fe4')
    // const theUser = await getTheUser.json()
    const user_id = user.user._id

    const currentUserPanier = JSON.parse(localStorage.getItem(userSouhaitKey && userSouhaitKey))
    console.log(currentUserPanier)

    const propsi = {
      token,
      command: listeSouhait,
      user_id,
      totalProposition: totalPanier
    }
  
    console.log(propsi)

    const createPropostion = await fetch('/proposition', {
        method: 'POST',
        body: JSON.stringify(propsi),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        }
    })
    const theProposition = await createPropostion.json()

    if(createPropostion.ok) {
      console.log("Commande effectuée avec succès ! ", theProposition)

      listeSouhait.map((i, index) => {

        const itemInDb = produits && produits.filter(x => x._id === i.productId)[0]
        
        const resteEnStock = itemInDb.quantite - i.quantite

        const updateProduct = async () => {
          const res = await fetch('/product/' + i.productId, {
            method: 'PATCH',
            body: JSON.stringify({
              quantite: resteEnStock
            }),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            }
          })
          const json = await res.json()

          if(res.ok) {
            console.log(json)
          }
        }

        return updateProduct()
      })

      localStorage.removeItem(userSouhaitKey && userSouhaitKey)
      setListeSouhait(null)
    }
  }

  return (
    <div>
        <h3 className='text-center'>Mes souhaits</h3>
        <table className="table table-dark table-striped">
            <thead>
                <tr className='text-center'>
                <th scope="col">#</th>
                <th scope="col">Produit</th>
                <th scope="col">Name</th>
                <th scope="col">Prix / XOF</th>
                <th scope="col">Quantité</th>
                <th scope="col">Sous-Total / XOF</th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {
                  listeSouhait && (listeSouhait.length > 0 || listeSouhait !== null) ? listeSouhait.map((i, index) => {
                    return (
                      <tr key={index + 'messouhaits'} className='text-center'>
                        <th scope="row"><p className='mb-0 mt-3'>{index + 1}</p></th>
                        <td><Link to={'/product/' + i.id}><img style={{borderRadius:'5px'}} width={50} height={50} src={i.image ? i.image.url : ''} alt={index} /></Link></td>
                        <td><p className='mb-0 mt-3'>{i.name}</p></td>
                        <td><p className='mb-0 mt-3'>{i.prix}</p></td>
                        <td>
                          <p className='mb-0 mt-2'>
                            <span onClick={() => handleDecrement(i, index)} className='px-2 py-1 m-1 btn text-light' style={{border:'1px solid white'}}>-</span>
                            <span className='px-2 py-1 m-1 btn text-light' style={{border:'1px solid white'}}>{i.quantite}</span>
                            <span onClick={() => handleIncrement(i, index)} className='px-2 py-1 m-1 btn text-light' style={{border:'1px solid white'}}>+</span>
                          </p>
                        </td>
                        <td><p className='mb-0 mt-3'>{i.prix * i.quantite}</p></td>
                        <td><p className='mb-0 mt-3'><button onClick={() => handleDeleteItem(i, index)} className='btn'><span className="material-symbols-outlined text-danger">delete</span></button></p></td>
                      </tr>
                    )
                  }) : 
                  (
                    <tr className='text-center'>
                      <th colSpan="7" scope="row"><p className='mb-3 mt-3'>Votre liste de souhait est vide !</p></th>
                    </tr>
                  )
                }
                {
                  (totalPanier && listeSouhait) ? (
                    <>
                      <tr className='text-center'>
                        <th colSpan="5" scope="row"><p className='mb-3 mt-3'>Total / OXF</p></th>
                        <td><p className='mb-0 mt-3 fw-bold'>{totalPanier}</p></td>
                        <td></td>
                      </tr>
                      <tr className='text-center'>
                        <th colSpan="7" scope="row">
                          <div className='d-flex justify-content-center align-items-center w-25 m-auto'>
                            <span className="material-symbols-outlined">local_mall</span>
                            <StripeCheckout
                                stripeKey='pk_test_51MmkguJj12xocKrG6OIyOUTCLHOQJmpeFyKRCZdxZAdGFKPSbmDPfZ7cofTi1O8ZYmerRmsxmzxTabj7VVmR7JUb00Qcd0Ibya'
                                token={handleToken}
                                amount={totalPanier * 100}
                                name={'Paiement'}
                                billingAddress
                                style={{background:'#FFCA2C'}}
                                shippingAddress
                            />
                          </div>
                        </th>
                      </tr>
                    </>
                  ) : ''
                }
            </tbody>
        </table>
    </div>
  )
}

export default MesSouhaits