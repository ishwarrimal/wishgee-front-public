import React from "react";
import './style.scss';
// import footerFrame from "Assets/images/footer-frame.svg";

function Footer() {
  return (
    <div className="absolute w-full bottom-0 table-row">
      <div className="bg-grey-darker flex-col products-container about-section">
        <div className="first-div">
          WISHGEE
          <p>
          A product recommendation service.
          Best phone under 10000, best phone under 20000, best gaming laptop in India, 
          best gaming phone in India, best camera phone in India, best washing machine under 30000, best laptop for coding, 
          best laptop for graphic designers, best camera for vlogging, action camera under 10000, cycle under 10000, best cycle for off roading, 
          smart tv under 20000, smart watch with fitness tracker, smart watch under 20000, best bluetooth speaker in 5000, 
          ANC earphones under 10000, Gaming headphones, best earphones under 1000, energy efficient washing machine under 15000,
          guitar for beginners, guitar under 15000, guitar under 10000, phone with best camera.
          </p>
        </div>
        <div className="flex second-div justify-between text-white mt-4">
            <div className="text-left">
              WISHGEE
              <ul>
              <li className="cursor-pointer"><a href="/#about-wishgee">About</a></li>
              <li className="cursor-pointer"><a href="https://blog.wishgee.com/" target="_blank" rel="noopener noreferrer">Blogs</a></li>
              <li className="cursor-pointer"><a href="mailto:contact@wishgee.com">Contact</a></li>
              <li className="cursor-pointer"><a href="/#faq-wishgee">FAQ</a></li>
              </ul>
            </div>
            <div className="">
              POLICY
              <ul>
                <li><a href="/terms">Terms & Conditions</a></li>
              </ul>
            </div>
            <div className="">
              GET IN TOUCH
              <ul>
                <li><a href="https://www.instagram.com/wish_gee/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                <li><a href="https://www.facebook.com/wishgeenie" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                <li><a href="https://twitter.com/wish_gee" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                <li><a href="https://www.linkedin.com/company/43270280/" target="_blank" rel="noopener noreferrer">Linkedin</a></li>
              </ul>
            </div>
        </div>
      </div>
      <div className="py-4" style={{backgroundColor: '#FFC107'}}>
          <h4 className="text-center">Copyright © 2021 WishGee Pvt. Ltd.</h4>
      </div>
    </div>
  );
}

export default Footer;
