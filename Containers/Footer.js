import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import '../Containers/Style.css';




class Footer extends Component{
    render(){
        return(
            <div className="container">
            <div className="row">
              <div className="col-xs-12 footer-style">
                <div id="left-footer-section footer-alignment">
                  <a href="g.com" className="footer-text">Privacy
                    Policy</a>
                  <a href="g.com" className="footer-text">Terms and Conditions</a>
                  <a href="g.com" className="footer-text">Jobs</a>
                  <a href="g.com" className="footer-text">Contact</a>
                </div>
                <div id="center-footer-section footer-alignment">
                  <a href="g.com" className="me-4">
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a href="g.com" className="me-4 ">
                    <i className="bi bi-twitter"></i>
                  </a>
                  <a href="g.com" className="me-4 ">
                    <i className="bi bi-google"></i>
                  </a>
                  <a href="g.com" className="me-4 ">
                    <i className="bi bi-instagram"></i>
                  </a>
                </div>
                <div id="right-footer-section footer-alignment">
                  <span className="footer-text">
                    <span> © Kalisu 2022 Company . All Rights Reserved.
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

        )
    }
}

export default Footer;