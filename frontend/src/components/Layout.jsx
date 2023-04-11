import React, { Fragment } from 'react'
import NavBar from './layout/NavBar'
import Footer from './layout/Footer'

function Layout({children}) {
  return (
    <Fragment>
        <NavBar />
          {children}
        <Footer />
    </Fragment>
  )
}

export default Layout