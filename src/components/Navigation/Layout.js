import React from 'react'
import Navigation from './Navigation';
import Footer from './Footer';

function Layout(props) {
    return (
        <>
            <Navigation />
            <main>{props.children}</main>
            <Footer/>
        </>
    )
}

export default Layout;
