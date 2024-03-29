import React from 'react'
import { Outlet } from 'react-router-dom'
import SearchPanel from '../SearchPanel/SearchPanel'
import Footer from '../Footer/Footer'

const HeaderFooter = () => {
  return (
    <>
    <SearchPanel/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default HeaderFooter