import React, { useEffect, useState } from 'react'
import AddProduits from '../product/AddProduct'
import EditProduct from '../product/EditProduct'
import { useProductContext } from '../../hooks/useProductContext'
import { useAuthContext } from '../../hooks/useAuthContext'

function MesProduits({produits, actualUser}) {

    const {dispatch } = useProductContext()
    const { user } = useAuthContext()
    const [fakReload, setFakReload] = useState(0)

    useEffect(() => {
        
    }, [dispatch])

    const handleDeleteProduct = async (id) => {

        if(!user) {
            return
        }

        const res = await fetch('/product/' + id, {
            method:'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await res.json()

        if(res.ok) {
            dispatch(
                {type: 'DELETE', payload: json}
            )
        }
    }

    const handleFakeReload = () => {
        setFakReload(fakReload + 1)
    }

  return (
    <div>
        <h3 className='text-center'>Mes products</h3>
        <table className="table table-dark table-striped">
            <thead>
                <tr className='text-center'>
                <th scope="col">N°</th>
                <th scope="col">Produit</th>
                <th scope="col">Name</th>
                <th scope="col">Prix</th>
                <th scope="col">Quantité</th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {
                    produits && produits.map((i, index) => {
                        const productId = i._id;
                        return (
                            <tr key={i._id} className='text-center'>
                                <th scope="row"><p className="mb-0 mt-2">{index < 8 ? `#00${index+1}` : `#0${index+1}`}</p></th>
                                <td><img style={{borderRadius:'5px'}} width={50} height={50} src={i && i.image ? i.image.url : ''} alt={i && i.image && i.image.public_id} /></td>
                                <td><p className="mb-0 mt-2"></p>{i.name}</td>
                                <td><p className="mb-0 mt-2"></p>{i.prix}</td>
                                <td><p className="mb-0 mt-2"></p>{i.quantite}</td>
                                <td>
                                    <div className='d-flex justify-content-around mt-2'>
                                        <div>
                                            {/* <!-- Button trigger modal --> */}
                                            <button onClick={handleFakeReload} type="button" className="btn text-success p-0" data-bs-toggle="modal" data-bs-target={`#exampleModalEdit${productId}`}>
                                                <span className="material-symbols-outlined">edit</span>
                                            </button>

                                            {/* <!-- Modal --> */}
                                            <div className="modal fade" id={`exampleModalEdit${productId}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h1 className="modal-title fs-5 text-dark" id="exampleModalLabel">Editer</h1>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body text-dark">
                                                            <EditProduct actualUser={actualUser} data={i} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <button onClick={() => handleDeleteProduct(productId)} className='btn p-0 text-danger'>
                                                <span className="material-symbols-outlined">delete</span>
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                }
                <tr>
                    <th colSpan='7' className='text-center'>
                        {/* <!-- Button trigger modal --> */}
                        <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Ajouter un produit
                        </button>

                        {/* <!-- Modal --> */}
                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5 text-dark" id="exampleModalLabel">Ajouter un nouveau produit</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body text-dark">
                                        <AddProduits actualUser={actualUser} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </th>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default MesProduits