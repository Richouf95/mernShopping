import React from 'react'
import DetailFacture from './DetailFacture'

function Facture({factureData}) {
  return (
    <div>
        {/* <!-- Button trigger modal --> */}
        <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#exampleModal${factureData._id}`}>
            Details
        </button>

        {/* <!-- Modal --> */}
        <div className="modal fade" id={`exampleModal${factureData._id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5 text-dark" id="exampleModalLabel">Details de la facture</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body text-dark">
                    <DetailFacture factureData={factureData} />
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Facture