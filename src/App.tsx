import { Outlet, Link } from "react-router-dom";
// import Navbar from "./Navbar";
import Footer from "./Footer";
import './styles/Dropdown.css';
import './styles/global.css';

function App() {
  return (
    <div style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
        width: "100%",
        overflowX: "hidden",
        fontFamily: "Zalando Sans SemiExpanded"
      }}>
      <div className="topBar" style={{
        display: "flex",
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        height: "72px", /* explicit header height */
        background: "linear-gradient(90deg, #efe7e1 0%, #c0b1abff 50%, #9a7c74ff 100%)",
        zIndex: 1000,
        padding: "0", /* remove vertical padding so height is stable */
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
      <div style={{ marginLeft: "20px", fontWeight: "bold", fontSize: "1.2rem" }}>Logo place</div>
      <nav style={{ padding: "10px 20px", marginRight: "20px" }}>
       
        <Link to="/" style={{ marginRight: "15px" }}>Strona główna</Link>
        <div className="dropdown" style={{ marginRight: "15px" }}>
          <Link to="/portfolio" className="portfolio-link">Portfolio</Link>
          <div className="dropdown-content">
            <Link to="/portfolio/web-design" className="dropdown-link">Web Design</Link>
            <Link to="/portfolio/photography" className="dropdown-link">Photography</Link>
            <Link to="/portfolio/digital-art" className="dropdown-link">Digital Art</Link>
          </div>
        </div>
                <Link to="/about" style={{ marginRight: "15px" }}>O mnie</Link>
        <Link to="/contact" style={{ marginRight: "15px" }}>Kontakt</Link>
        <a 
          href="https://www.instagram.com/irene.portraits" 
          target="_blank" 
          rel="noopener noreferrer"
          className="instagram-link"
        >
          <img 
            src="/src/assets/instagram.svg" 
            alt="Instagram"
            style={{
              width: "24px",
              height: "24px",
              transition: "opacity 0.2s"
            }}
          />
        </a>
      </nav>
      
      </div>
      <main style={{ 
        padding: "0 0 0 20px", 
        marginTop: "72px", /* leave space for fixed topBar (must match header height) */
        height: "calc(100vh - 72px - 28px)", /* viewport minus header (72) and footer (28) heights */
        width: "100%",
        background: "linear-gradient(135deg, #a57b6a 0%, #6b3f36 35%, #3e2723 65%, #170705 100%)",
        boxSizing: "border-box",
        overflow: "hidden" /* prevent page vertical scroll; inner components should handle their own scrolling */
      }}>
         <Outlet />
       </main>
      <Footer />
    </div>
  );
}

export default App;
