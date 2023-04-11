import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'

function DetailFacture({factureData}) {
    const factureItems = factureData.command
    const [acheteur, setAcheteur] = useState(null)
    const acheteurId = factureData.user_id
    const { user } = useAuthContext()

    useEffect(() => {
        const Acheteur = async () => {
            const res = await fetch('/user/' + acheteurId, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await res.json()

            if(!res.ok) {
                alert('ohhh')
            }

            if(res.ok) {
                setAcheteur(json)
            }
        }

        if(user) {
            Acheteur()
        }
    }, [user, acheteurId])

  return (
    <div>
        <div>
            <div className="row text-end">
                <p className='px-5'>Date : {factureData.createdAt}</p>
            </div>
            <div className="row col">
                <h3>Facture N° : {factureData._id}</h3>
                <hr />
            </div>
            <div className='row text-start'>
                <div className="col">
                    <h5>Vendeur</h5>
                    <p>E-commerce.com</p>
                    <p>Tel : 86574654</p>
                    <p>Email : ecommerce@gmail.com</p>
                </div>
                <div className="col">
                    <h5>Acheteur Info</h5>
                    <p>Nom : {acheteur && acheteur.name}</p>
                    <p>Tel : {acheteur && acheteur.tel}</p>
                    <p>Email : {acheteur && acheteur.email}</p>
                </div>
            </div>

                <hr />

            <div className="row">
                <h5>Elements de la facture</h5>
                <table className="table">
                    <thead>
                        <tr className='bg-dark text-light'>
                            <th scope="col">#</th>
                            <th scope="col">Produit</th>
                            <th scope="col">Nom</th>
                            <th scope="col">Prix</th>
                            <th scope="col">Quantite</th>
                            <th scope="col">Sous total / XOF</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            factureItems.map((i, index) => {
                                return (
                                    <tr key={`factureItemDetail${index}`}>
                                        <th scope="row"><p className='mb-0 mt-3'>{index}</p></th>
                                        <td><img style={{width:'50px', height:'50px', borderRadius:'5px'}} src={i.image ? i.image.url : ''} alt={i.image ? i.image.public_id : `image${index}`} /></td>
                                        <td><p className='mb-0 mt-3'>{i.name}</p></td>
                                        <td><p className='mb-0 mt-3'>{i.prix}</p></td>
                                        <td><p className='mb-0 mt-3'>{i.quantite}</p></td>
                                        <td><p className='mb-0 mt-3'>{i.sousTotal}</p></td>
                                    </tr>
                                )
                            })
                        }
                        <tr className='bg-dark text-light'>
                            <th colSpan='5'>Sauf erreur, Montant total de la facture : </th>
                            <td>{factureData.totalProposition}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="row">
                <h5>Paiement details</h5>
                <div className='row'>
                    <div className="col text-start px-5 py-3">
                        <h6>Moyen</h6>
                        <p>Type: carte</p>
                        <p>Marque : {factureData.token.card.brand}</p>
                        <p>Quatre dernier chiffre : {factureData.token.card.last4}</p>
                    </div>
                    <div className="col text-start px-5 py-3">
                        <h6>Titulaire</h6>
                        <p>Nom : {factureData.token.card.name}</p>
                        <p>Email : {factureData.token.email}</p>
                        <p>Adressz : {factureData.token.card.address_city}-{factureData.token.card.address_country}. B.P: {factureData.token.card.address_zip}</p>
                    </div>
                </div>
                
            </div>
        </div>
        
    </div>
  )
}

export default DetailFacture