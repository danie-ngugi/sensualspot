import Link from 'next/link'
import router, { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import { HomeIcon, ChatIcon, CategoryIcon, SearchIcon, HeartOutline } from './icons'

const BottomNav = () => {
    const [activeLink, setActiveLink] = useState('home')
    const router = useRouter()
    //  const routeName = router.pathname;
    const bottomRoutes = ['/', '/contact-us', '/favorites', '/categories', '/search']

    useEffect(() => {
        setActiveLink('/' + router.pathname.split('/')[1])
      }, [router.pathname])

    useEffect(()=> {
        router.prefetch('/contact-us')
        router.prefetch('/favorites')
        router.prefetch('/categories')
        router.prefetch('/search')
        router.prefetch('/')
    }, [])
    
    

    const handleNav = (e, v) => {
        e.preventDefault()
        setActiveLink(v)
        router.push(v)
        
    }
    const iconStyles = { display: 'inline', fontWeight: '500' }
    
    return (
        <div className="lg:hidden fixed bottom-0 w-full flex justify-center flex-row items-center bottom-nav">
            <div className="relative navigation">
            <ul className={`flex flex-row  items-center ${bottomRoutes.indexOf(activeLink) !== -1 ? '' : 'inactive'}`}>

                <li onClick={(e)=>handleNav(e, '/')} className={`list ${activeLink === '/' ? 'active': ''}`}>
                    <a className href="#">
                        <span className="icon"> <HomeIcon /> </span>
                        <span className="text">Home</span>
                    </a>
                </li>
                <li onClick={(e)=>handleNav(e, '/categories')} className={`list ${activeLink === '/categories' ? 'active': ''}`}>
               
                    <a href="#">
                        <span className="icon">  <CategoryIcon style={iconStyles} /> </span>
                        <span className="text">Menu</span>
                    </a>
                  
                </li>
                <li onClick={(e)=>handleNav(e, '/search')} className={`list ${activeLink === '/search' ? 'active': ''}`}>
                        <a>
                            <span className="icon">  <SearchIcon style={iconStyles} /> </span>
                            <span className="text">Search</span>
                        </a>
                </li>
                <li onClick={(e)=>handleNav(e, '/contact-us' )} className={`list ${activeLink === '/contact-us' ? 'active': ''}`}>
                
                    <a>
                        <span className="icon"> <ChatIcon /></span>
                        <span className="text">Contacts</span>
                    </a>
                   
                </li>
                <div className="indicator"></div>
            </ul>
            </div>
            <style jsx>{`
                .bottom-nav {
                    background: rgba(255, 255, 255, 0.5);
                    height: 55px;
                    backdrop-filter: blur(4px);
                    -webkit-user-select: none; 
                    -moz-user-select: none;    
                    -ms-user-select: none;    
                    user-select: none;
                    outline: none;
                    box-shadow: none;
                }
           
                li {
                    width: 70px;
                    height: 70px;
                    z-index: 1;
                    list-style: none;
                    
                }

                ul li a {
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    width: 100%;
                    text-align: center;
                    font-weight: 500;
                }
                ul li {
                    cursor: pointer;
                }

                ul li a .icon {
                    position: relative;
                    display: block;
                    line-height: 75px;
                    transition: 0.5s;
                    color: var(--clr);
                }

                ul li.active a .icon {
                    transform: translate(-5px, -35px);
                    color: #fff;
                }

                ul li a .text {
                    position: absolute;
                    color: var(--clr);
                    letter-spacing: 0.05em;
                    transition: 0.5s;
                    opacity: 0;
                    transform: translateY(20px);
                    font-weight: 500;
                    font-size: 14px;
                }

                ul li.active a .text {
                    opacity: 1;
                    transform: translateY(10px);
                }

                .indicator {
                    position: absolute;
                    width: 60px;
                    height: 60px;
                    background: var(--primary-color);
                    border: 8px solid #e3e3e3;
                    transition: 0.5s;
                    border-radius: 50%;
                    top: -40%;
                    opacity: 1;
                    
                }
                .inactive .indicator {
                    opacity: 0;
                }

                .indicator::before{
                    content: '';
                    position: absolute;
                    top: 62%;
                    left: -20px;
                    width: 20px;
                    height: 20px;
                    background: transparent;
                    border-top-right-radius: 20px;
                    box-shadow: 0px -10px 0 0 #e3e3e3;
                    clip-path: inset(0px 0px);
                    opacity: 0.4;

                }

                .indicator::after{
                    content: '';
                    position: absolute;
                    top: 62%;
                    right: -20px;
                    width: 20px;
                    height: 20px;
                    background: transparent;
                    border-top-left-radius: 20px;
                    box-shadow: 0px -10px 0 0 #e3e3e3;
                    clip-path: inset(0px 0px);
                    opacity: 0.4;

                }

                ul li:nth-child(1).active ~ .indicator {
                    transform:  translateX(calc(60px * 0))
                }
                ul li:nth-child(2).active ~ .indicator {
                    transform:  translateX(calc(70px * 1))
                }
                ul li:nth-child(3).active ~ .indicator {
                    transform:  translateX(calc(70px * 2))
                }
                ul li:nth-child(4).active ~ .indicator {
                    transform:  translateX(calc(70px * 3))
                }

                
            `}</style>
        </div>
    )
}
export default BottomNav