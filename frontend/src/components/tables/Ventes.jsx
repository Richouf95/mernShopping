import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'

function Ventes() {

    const [vente, setVente] = useState([])
    const { user } = useAuthContext()

    useEffect(() => {
      const userId = user && user.user._id
        const getAllFActures = async () => {
            const res = await fetch('/proposition', {
              headers: {
                'Authorization': `Bearer ${user.token}`
              }
            })
            const json = await res.json()

            if (res.ok) {
                let t = [];

                for(let i = 0; i < json.length; i++) {
                    t = [...t, ...json[i].command]
                }

                const tfiltrer = t.filter(i => i.propritaireId === userId)

                const tt = tfiltrer.reduce((group, product) => {
                  const { name } = product;
                  group[name] = group[name] ?? [];
                  group[name].push(product);
                  return group;
                }, {})

                let tab2 = []

                // function grouping
                const grouping = () => {
                  for (const [key, value] of Object.entries(tt)) {
                    const imageUrl = value[0].image.url
                    const imageAlt = value[0].image.public_id
                    const productPrix = value[0].prix

                    // console.log(value[0])
          
                    const initialValue = 0;

                    // Quantité vendu
                    let lesQuantite = []
                    const q = value.map(i => {
                      return [...lesQuantite, i.quantite]
                    })
                    const sumQuantite = q.reduce(
                      (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue),
                      initialValue
                    );

                    // Total ventes du produits
                    let lesPrix = []
                    const montant = value.map(i => {
                      return [...lesPrix, i.sousTotal]
                    })
                    const sumPrix = montant.reduce(
                      (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue),
                      initialValue
                    );

                    const tab = [key, imageUrl, productPrix, sumQuantite, sumPrix, imageAlt]
                    tab2.push(tab)

                  }
                }
                grouping()
                setVente(tab2)
            }
        }

        if(user) {
          getAllFActures()
        }

    }, [user])

    const ventesParOrdre = vente && vente.sort(function(a,b) {
      return b[3] - a[3]
    })
    
  return (
    <div>
        <h3 className='text-center'>Mes ventes</h3>

        <table className="table table-dark table-striped">
            <thead>
                <tr className='text-center'>
                <th scope="col">Produits</th>
                <th scope="col">Prix</th>
                <th scope="col">Quantites vendus</th>
                <th scope="col">Ventes / XOF</th>
                </tr>
            </thead>
            <tbody id='tbody'>
                {
                    (ventesParOrdre && ventesParOrdre.length > 0) ? (
                      ventesParOrdre.map((i, index) => {
                        return (
                          <tr key={`ventePersonnel${index}`} className='text-center'>
                              <th scope="row"><p className='mb-0 mt-2'><img style={{width:'50px', height:'50px', borderRadius:'10px'}} src={i ? i[1] : ''} alt={i ? i[5] : ''} /></p></th>
                              <td><p className='mb-0 mt-3'>{i && i[2]}</p></td>
                              <td><p className='mb-0 mt-3'>{i && i[3]}</p></td>
                              <td><p className='mb-0 mt-3'>{i && i[4]}</p></td>
                          </tr>
                        )
                      })
                    ) : (
                        <tr className='text-center'>
                            <th colSpan="7" scope="row"><p className='mb-3 mt-3'>Vous n'avez aucune vente !</p></th>
                        </tr>
                    )
                }
            </tbody>
        </table>
        
    </div>
  )
}

export default Ventes