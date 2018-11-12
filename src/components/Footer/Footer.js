import React from 'react';
//import { Link } from "react-router-dom";
const Footer = () =>{
  return(
  <footer className="footer fixed-bottom">
    <div className="container">
      <p className="text-center text-muted pt-2">
		<strong>Teche</strong> made with <i className="fa fa-heart" aria-hidden="true"></i> by <i className="fa fa-github-alt" aria-hidden="true"></i> <a href="https://github.com/sushingg">SuShinGG</a>. 
          The source code is licensed <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
      </p>
    </div>
  </footer>
  )
}
export default Footer;
