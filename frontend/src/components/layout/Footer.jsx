import React from 'react'

function Footer() {
  return (
    <footer>
        <div style={{borderTop:'1px solid grey', padding:'50px'}}>
          <div className='container'>
            <div className="row d-flex justify-content-center">
                <div className="col-sm-12 col-md-12 col-lg-12 w-auto m-3">
                  <h3>Aide & Information ?</h3>
                  <div>
                    <div>
                      <p>DES QUESTION ? APPELEZ NOUS 24/24</p>
                      <p>+227 58 45 41 25</p>
                    </div>
                    <div>
                      <p>Niamey - Niger</p>
                      <p>Quartier : Plateau</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-12 w-auto m-3">
                  <h3>Nous acceptons les paiements</h3>
                  <img width={350} src="https://www.maderacounty.com/home/showpublishedimage/5337/637575642645970000" alt="" />
                </div>
                <div className="col-sm-12 col-md-12 col-lg-12 w-auto m-3">
                  <h3>INFO & CONTACT</h3>
                  <div className='d-flex'>
                    <div style={{border:'1px solid orange', display:'flex', justifyContent:'center', alignItems:'center', padding:'5px', height:'40px', width:'40px', margin:'5px', borderRadius:'5px'}}>
                      <span className="material-symbols-outlined">pin_drop</span>
                    </div>
                    <div>
                      <p style={{margin:'0'}}>Adresse : </p>
                      <p style={{margin:'0'}}>Plateau, Chateau 1</p>
                    </div>
                  </div>
                  <div className='d-flex'>
                    <div style={{border:'1px solid orange', display:'flex', justifyContent:'center', alignItems:'center', padding:'5px', height:'40px', width:'40px', margin:'5px', borderRadius:'5px'}}>
                      <span className="material-symbols-outlined">call</span>
                    </div>
                    <div>
                      <p style={{margin:'0'}}>Téléphone : </p>
                      <p style={{margin:'0'}}>+227 58 45 41 25</p>
                    </div>
                  </div>
                  <div className='d-flex'>
                    <div style={{border:'1px solid orange', display:'flex', justifyContent:'center', alignItems:'center', padding:'5px', height:'40px', width:'40px', margin:'5px', borderRadius:'5px'}}>
                      <span className="material-symbols-outlined">mail</span>
                    </div>
                    <div>
                      <p style={{margin:'0'}}>Email : </p>
                      <p style={{margin:'0'}}>ecommerce@gmail.com</p>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
    </footer>
  )
}

export default Footer