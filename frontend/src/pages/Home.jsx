import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import { useProductContext } from '../hooks/useProductContext'
import { useAuthContext } from '../hooks/useAuthContext'

function Home() {

  const {products, dispatch} = useProductContext()
  const { user } = useAuthContext()
  const currentUserId = user && user.user._id
  const currentUserName = user && user.user.name
  const userSouhaitKey = currentUserName + currentUserId

  useEffect(() => {
    const getAllproducts = async () => {
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
      getAllproducts()
    }
  }, [dispatch, user])


  const handleAddPanier = (x) => {
    if(x.quantite > 0){
      const storage = localStorage.getItem(userSouhaitKey && userSouhaitKey)
      const panierItem = {
        propritaireId: x.propritaireId,
        productId: x._id,
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

  return (
    <div className='container'>
      <div className='p-2 d-flex justify-content-around' style={{background:'white', width: '100%', flexWrap:'wrap'}}>
        <div className='m-3' style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
          <div className='bg-dark text-light' style={{borderRadius:'100%', height:'40px', width:'40px', display:'flex', justifyContent:'center', alignItems:'center', marginRight:'10px'}}><span className="material-symbols-outlined">local_shipping</span></div>
          <div><p style={{marginBottom:'5px'}} className='fs-4 fw-bold'> LIVRAISON</p></div>
        </div>
        <div className='m-3' style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
          <div className='bg-dark text-light' style={{borderRadius:'100%', height:'40px', width:'40px', display:'flex', justifyContent:'center', alignItems:'center', marginRight:'10px'}}><span className="material-symbols-outlined">local_mall</span></div>
          <div><p style={{marginBottom:'5px'}} className='fs-4 fw-bold'> SECURITE</p></div>
        </div>
        <div className='m-3' style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
          <div className='bg-dark text-light' style={{borderRadius:'100%', height:'40px', width:'40px', display:'flex', justifyContent:'center', alignItems:'center', marginRight:'10px'}}><span className="material-symbols-outlined">star</span></div>
          <div><p style={{marginBottom:'5px'}} className='fs-4 fw-bold'> SATISFACTION</p></div>
        </div>
      </div>

      <div className='d-flex justify-content-center align-items-center p-4' style={{flexWrap:'wrap'}}>
        <div className='categorie m-2 d-flex justify-content-center align-items-center' style={{width:'300px', height:'400px', background: 'url(https://meshago.com/296-large_default/sac-100-cuire-fabrication-nigerienne.jpg)', backgroundSize:'cover', backgroundPosition:'center', borderRadius:'10px'}}>
          <div style={{height:'100%', width:'300%', background:'rgba(0, 0, 0, 0.5)', borderRadius:'10px'}}>
            <p style={{fontSize:'2em', fontWeight:'900', textAlign:'center', marginTop:'50%', color:'white'}}>MAROQUINERIE</p>
          </div>
        </div>
        <div className='categorie m-2 d-flex justify-content-center align-items-center' style={{width:'300px', height:'400px', background: 'url(https://www.ethnikka.fr/13769-thickbox/bijoux-touareg-du-niger-croix-du-desert.jpg)', backgroundSize:'cover', backgroundPosition:'center', borderRadius:'10px'}}>
          <div style={{height:'100%', width:'300%', background:'rgba(0, 0, 0, 0.5)', borderRadius:'10px'}}>
            <p style={{fontSize:'2em', fontWeight:'900', textAlign:'center', marginTop:'50%', color:'white'}}>BIJOUTERI</p>
          </div>
        </div>
        <div className='categorie m-2 d-flex justify-content-center align-items-center' style={{width:'300px', height:'400px', background: 'url(https://www.art-masque-africain.com/images/2015/08/16945_orig.jpg)', backgroundSize:'cover', backgroundPosition:'center', borderRadius:'10px'}}>
          <div style={{height:'100%', width:'300%', background:'rgba(0, 0, 0, 0.5)', borderRadius:'10px'}}>
            <p style={{fontSize:'2em', fontWeight:'900', textAlign:'center', marginTop:'50%', color:'white'}}>BIJOUTERI</p>
          </div>
        </div>
      </div>

      <div className="envente mb-5">
        <div style={{display:'flex', justifyContent:'center',flexDirection: 'column'}}>
          <hr style={{width:'200px', border:'3px solid orange', margin:'auto'}} />
          <h1 className='text-center mt-3'>En stock</h1>
        </div>

        <div style={{display:'flex', flexWrap:'wrap', justifyContent:'center'}}>
          {
            products && products.map(i => {
              return (
                <div key={i._id + 'procduct'} className="card productCard" style={{width: "18rem", margin:'10px'}}>
                  <img height={200} src={i.image && i.image.url} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className='card-title'>{i.name}</h5>
                    <p className="card-text">{i.description}</p>
                    <p className="card-text">{`Quantité en stock : ${i.quantite}`}</p>
                    <h5 className='card-title text-success'>{`${i.prix} OXF`}</h5>
                    <div className='d-flex justify-content-around'>
                      <div>
                        <Link to={'/product/' + i._id} className='btn btn-dark my-2'>Voir plus</Link>
                      </div>
                      <div className='btnPanier'>
                        <button className='btn my-2' onClick={() => handleAddPanier(i)}><span className="material-symbols-outlined">shopping_cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>

      <div className='row text-light'>
        <div style={{background: '#2A2A3A'}} className=' col-md-12 col-lg-3 text-center p-3'>
          <span className="material-symbols-outlined fs-1">local_shipping</span>
          <p className='fs-1'>Livraison</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quae quibusdam ratione enim, veniam similique.?</p>
        </div>
        <div style={{background: '#9C6BC3'}} className=' col-md-12 col-lg-3 text-center p-3'>
          <span className="material-symbols-outlined fs-1">sell</span>
          <p className='fs-1'>Garantie</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quae quibusdam ratione enim, veniam similique.?</p>
        </div>
        <div style={{background: '#FA644B'}} className=' col-md-12 col-lg-3 text-center p-3'>
          <span className="material-symbols-outlined fs-1">shield_lock</span>
          <p className='fs-1'>Remboursable</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quae quibusdam ratione enim, veniam similique.?</p>
        </div>
        <div style={{background: '#0EACD5'}} className=' col-md-12 col-lg-3 text-center p-3'>
          <span className="material-symbols-outlined fs-1">credit_card</span>
          <p className='fs-1'>Produit offert</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quae quibusdam ratione enim, veniam similique.?</p>
        </div>
      </div>

      <div className='my-4'>
        <h3 className='text-center'>Notre blog</h3>
        <div style={{display:'flex', justifyContent:"center"}}><hr style={{width:'50px', border:'2px solid red', marginTop:'-5px'}} /></div>
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexWrap:'wrap'}}>
          <div className="card m-2" style={{width: "18rem"}}>
            <img style={{height:'250px'}} src='https://www.appui-pme.ne/wp-content/uploads/2018/11/SAFEM.jpg' className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Safem</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
          <div className="card m-2" style={{width: "18rem"}}>
            <img style={{height:'250px'}} src='data:image/jpeg;base64,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' className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Safem</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
          <div className="card m-2" style={{width: "18rem"}}>
            <img style={{height:'250px'}} src='https://www.avvenire.it/c/2021/PublishingImages/444ddcc97b07455aa53f910b339e7479/03.jpg?width=1024' className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Safem</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home