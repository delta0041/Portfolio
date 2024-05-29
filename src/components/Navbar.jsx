import React, { useState ,useEffect} from 'react';
import './Navbar.css'; // Assuming you have a separate CSS file for styling
import { Link } from 'react-router-dom';
import Home from './Home';
import Work from './Work';
import About from './About';
import Contact from './Contact';

const Navbar = () => {
    // const [isSearchActive, setIsSearchActive] = useState(false);
    const [isSidebarActive, setIsSidebarActive] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);

    useEffect(() => {
        const handleScroll = () => {
          const currentScrollPos = window.pageYOffset;
          const navbar = document.getElementById('navbar');
    
          if (prevScrollPos > currentScrollPos) {
            navbar.style.top = '2%';
          } else {
            navbar.style.top = '-70px';

          }
    
          setPrevScrollPos(currentScrollPos);
        };
    
        window.addEventListener('scroll', handleScroll);
    
        // Clean up the event listener on component unmount
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, [prevScrollPos]);

    
    // const toggleSearch = () => {
    //     setIsSearchActive(prevState => !prevState);
    // };

    const toggleSidebar = () => {
        setIsSidebarActive(prevState => !prevState);
    };

    const closeSidebar = () => {
        setIsSidebarActive(false);
    };

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        section.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="app">


            <div className="navbar-container">
                <nav className={isSidebarActive ? 'active' : ''}  id="navbar" style={{ position: 'fixed', width: '86%', transition: 'top 0.5s' }}>
                    <div className="nav-bar">
                        <i className='bx bx-menu sidebarOpen' onClick={toggleSidebar}></i>
                        <span className="logo navLogo"><a href="#Home">CodingLab</a></span>

                        <div className="menu">
                            <div className="logo-toggle">
                                <span className="logo"><a href="#Home">CodingLab</a></span>
                                <i className='bx bx-x siderbarClose' onClick={toggleSidebar}></i>
                            </div>

                            <ul className="nav-links">
                                <li><Link to="/" onClick={() => { scrollToSection('home'); closeSidebar(); }}>Home</Link></li>
                                <li><Link to="/work" onClick={() => { scrollToSection('work'); closeSidebar(); }}>Work</Link></li>
                                <li><Link to="/about" onClick={() => { scrollToSection('about'); closeSidebar(); }}>About</Link></li>
                                <li><Link to="/contact" onClick={() => { scrollToSection('contact'); closeSidebar(); }}>Contact</Link></li>
                            </ul>
                        </div>

                        {/* <div className="darkLight-searchBox">
                            <div className="searchBox">
                                <div className={`searchToggle ${isSearchActive ? "active" : ""}`} onClick={toggleSearch}>
                                    <i className='bx bx-x cancel'></i>
                                    <i className='bx bx-search search'></i>
                                </div>

                                <div className={`search-field ${isSearchActive ? "active" : ""}`}>
                                    <input type="text" placeholder="Search..." />
                                    <i className='bx bx-search'></i>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </nav>
            </div>
            

            <main className='main_content'>
                <section id="home" className={`section`}>
                    <Home />
                </section>
                <section id="work" className={`section`}>
                    <Work />
                </section>
                <section id="about" className={`section`}>
                    <About />
                </section>
                <section id="contact" className={`section`}>
                    <Contact />
                </section>
            </main>

        </div>
    );
};

export default Navbar;
