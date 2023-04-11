import React, {Fragment, useEffect, useState} from 'react'
import { Link, useLocation } from 'react-router-dom'
import DismissibleExample from './PreviewPanier'
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext'

function NavBar() {
    const url = useLocation().pathname

    const { logout } = useLogout()
    const { user } = useAuthContext()
    const currentUserId = user && user.user._id
    const currentUserName = user && user.user.name
    const userSouhaitKey = currentUserName + currentUserId

    const [listeSouhait, setListeSouhait] = useState(null)
    const [totalPanier, setTotalPanier] = useState(null)

    useEffect(() => {
        setListeSouhait(JSON.parse(localStorage.getItem(userSouhaitKey && userSouhaitKey)))
        const cobail = JSON.parse(localStorage.getItem(userSouhaitKey && userSouhaitKey)) && JSON.parse(localStorage.getItem(userSouhaitKey && userSouhaitKey)).map(i => i.sousTotal)
        const initialValue = 0;
        const sum = cobail && cobail.reduce(
          (a,b) => a + b,
          initialValue
        )
        setTotalPanier(sum)
      }, [userSouhaitKey])

      const handleLogout = () => {
        logout()
      }


  return (
    <>
    <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container">
            <Link className="navbar-brand" to="/"><img width={150} src={'https://www.seekpng.com/png/full/428-4289671_logo-e-commerce-good-e-commerce-logo.png'} alt="ShopLogo" /></Link>
            
            {
                user && (
                    <>
                    <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" style={{marginLeft: '40%'}} id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active text-light" aria-current="page" to="/">Accueil</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active text-light" aria-current="page" to="/panier">Panier</Link>
                            </li>
                            <li className="nav-item">
                                <DismissibleExample listeSouhait={listeSouhait} totalPanier={totalPanier} />
                            </li>
                            <span className='separeteUser' style={{borderLeft:'1px solid white'}}></span>
                            <li className="nav-item d-flex justify-content-start align-items-center mb-1 btn p-0" onClick={handleLogout}>
                                <p className="nav-link active text-light m-0">{user.user.name}</p> <span className="material-symbols-outlined text-light">logout</span>
                            </li>
                            <li className="nav-item">
                                
                            </li>
                        </ul>
                    </div>
                    </>
                )
            }
            {/* {
                !user && (
                    <div className='d-flex'>
                        <ul className="navbar-nav mb-2 mb-lg-0">

                            <li className="nav-item">
                                <Link className="nav-link active text-light" aria-current="page" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active text-light" aria-current="page" to="/singup">Singup</Link>
                            </li>
                        </ul>
                    </div>
                )
            } */}
        </div>
    </nav>
    {
        url === "/" && <div className='bg-success' style={{backgroundImage:`url(https://img.rezdy.com/PRODUCT_IMAGE/13699/slider%20pic%20and%20cure%20salee%20title%20pic.jpg)`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'bottom', height:"400px"}}>
            <div style={{background:'rgba(0, 0, 0, 0.326)', height:'100%'}} className='d-flex justify-content-center align-items-center'>
                <div className='container text-light'>
                    <p className='fw-bold' style={{marginBottom:'-10px'}}>OBTENEZ JUSQU'A 30% DE REDUCTION !</p>
                    <h1 style={{fontSize:'70px', fontWeight:'bolder'}}>100 % NIGERIENS</h1>
                    <p style={{marginTop:'-10px'}}>Articles limités disponible à ce prix</p>
                    <button className='btn btn-warning' style={{borderRadius:'20px'}}>ACHETER MAINTENANT</button>
                </div>
            </div>
        </div>
    }
    </>
  )
}

export default NavBar