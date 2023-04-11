import React, { useEffect, useState } from 'react'
import Facture from './Facture'
import { useAuthContext } from '../../hooks/useAuthContext'

function MonPanier() {

  const [factures, setFactures] = useState(null)
  const { user } = useAuthContext()

  useEffect(() => {
    const getFactures = async () => {
      const res = await fetch('/proposition', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await res.json()

      if (res.ok) {
        setFactures(json)
      }
    }

    if(user) {
      getFactures()
    }
    
  }, [user])

  const userId = user && user.user._id

  const facturesFiltre = (factures && userId) && factures.filter(i => i.user_id === userId)

  // console.log(facturesFiltre && facturesFiltre)
  

  return (
    <div>
        <h3 className='text-center'>Mes factures</h3>
        <table className="table table-dark table-striped">
            <thead>
                <tr className='text-center'>
                <th scope="col">N°</th>
                <th scope="col">Date</th>
                <th scope="col">Montant / XOF</th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
              {
                facturesFiltre && facturesFiltre.length > 0 ? (
                  facturesFiltre.map((i, index) => {
                  const date = new Date(i.createdAt)
                  return (
                    <tr key={i._id} className='text-center'>
                      <th scope="row"><p className='mb-0 mt-2'>{`#00${index + 1}`}</p></th>
                      <td><p className='mb-0 mt-2'>{date.toDateString()}</p></td>
                      <td><p className='mb-0 mt-2'>{i.totalProposition}</p></td>
                      <td><Facture factureData={i}/></td>
                    </tr>
                  )
                })
                ) : (
                  <tr className='text-center'>
                    <th colSpan="7" scope="row"><p className='mb-3 mt-3'>Vous n'avez aucune facture</p></th>
                  </tr>
                )
              }
            </tbody>
        </table>
    </div>
  )
}

export default MonPanier