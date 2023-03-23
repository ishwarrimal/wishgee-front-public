import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

import './style.scss';
import Arrow from "../../Assets/Arrow.svg"
import Frame1 from "../../Assets/Frame.svg"
import Frame2 from "../../Assets/Frame(1).svg"
import Frame3 from "../../Assets/Frame(2).svg"
import Frame4 from "../../Assets/Frame(3).svg"
import ProductCard from 'Components/common/productCard';
import { SUPPORTED_ITEMS } from 'Constants';
import routes from 'Constants/routes';
import { getWishTrendData, getLatestRecommendation } from 'APIHelper';
import staticWish from "./staticWish";
//Mock data
// import { products } from 'Data/productData';
// const { contents: mockResp} = products;
let wishTrendTimer;

const FAQ = React.lazy(() => import("../FAQ"));
const Testimonials = React.lazy(() => import('../testimonials'));

const WebLanding = () => {
  const [wishTrend, setWishTrend] = React.useState(staticWish.trend);
  const [latestRecommendation, setLatestRecommendation] = React.useState([{"id":3,"created":"2021-07-23T08:42:50.780Z","updated":"2021-07-23T08:47:23.831Z","title":"phone","description":"amazing battery performance","keywords":null,"max_budget":50000,"min_budget":10000,"status":3,"recommendation_type":0,"agent_id":3,"customer_id":1,"result":{"id":8,"created":"2021-07-23T08:42:50.731Z","updated":"2021-07-23T08:42:50.731Z","product_name":"X60 Pro","product_type":"phone","product_brand":"Vivo","product_link":"https://amzn.to/3zG6dGP","product_price":49990,"product_thumbnail":"https://images-na.ssl-images-amazon.com/images/I/71OTh1f55sL._SL1200_.jpg","closing_remark":"Virtual Ram | 48MP Triple Camera | Gaming Processor | Snapdragon 870 Processor ","alternate_result":null,"keywords":"High Performance, Amazing Display, Long Lasting Battery, Graet Camera"}}]);
  const [wishTrendIndex, setWishTrendIndex] = useState(0);

    useEffect(() => {
      const len = wishTrend.length;
      setTimeout(() => {
        let curIndex = 0;
        let totalTimes = 0;
        wishTrendTimer = setInterval(() => {
          curIndex = curIndex < len-1 ? curIndex+1 : 0
          setWishTrendIndex(curIndex)
          totalTimes = totalTimes+1;
          if(totalTimes/len === 4 ){
            clearInterval(wishTrendTimer)
          }
        },3000)
      },3000)
      latestRecommendaitonFetchHandler();
      (function (ready) {
        if (document.readyState === "complete" || document.readyState === "interactive") {
          ready();
        } else {
          document.addEventListener("DOMContentLoaded", ready);
        }
      })(function lazyLoader() { /* the document is now ready. */
      
        var lazyEls = [].slice.call(document.querySelectorAll("[data-src]"));
      
        function load(el) {
          var src = el.getAttribute("data-src");
          var srcset = el.getAttribute("data-srcset");
          // [NOTE] Todd We shouldn't hit this if data-src was null, but monitoring
          //    says it happens sometimes, so ¯\_(ツ)_/¯
          if (src) { el.setAttribute("src", src); }
          if (srcset) { el.setAttribute("srcset", srcset); }
          el.removeAttribute("data-src");
          el.removeAttribute("data-srcset");
        }
      
        if ("IntersectionObserver" in window) {
          var lazyObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
              if (entry.isIntersecting) {
                var el = entry.target;
                load(el);
                // lazyObserver.unobserve(el);
              }
            });
          });
      
          lazyEls.forEach(function(el) {
            if (el.tagName === "SCRIPT") {
              load(el);
            }
            else {
              lazyObserver.observe(el);
            }
          });
        }
        else {
          lazyEls.forEach(load);
        }
      
      });
      return () => { clearInterval(wishTrendTimer)}
    },[])


    const history = useHistory();

    const trendDataFetchHandler = async () => {
      return getWishTrendData().then(async trendData => {
        setWishTrend(trendData);
        return trendData.length;
      })
    }

    const latestRecommendaitonFetchHandler = () => {
      getLatestRecommendation().then(async recommendation => {
        setLatestRecommendation(recommendation || []);
      })
    }

    const sliderClickHandler = (index) => {
      clearInterval(wishTrendTimer);
      setWishTrendIndex(index);
    }

    return (
        <div className="w-full mt-16">
            {/* First section */}
            <div className="products-container flex flex-col" style={{'backgroundColor':'#fdf8f0'}}>
              <a href="/#about-wishgee">
            <div className="flex p-4 why-wishgee-top mb-10 text-xs justify-between">
                  <p className="why-text font-semibold">Why WishGee?</p>
                  <div className="flex justify-start w-8/10 reasons">
                      <p>
                      <svg width="25" height="25" viewBox="0 0 95 95" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M39.5833 67.2917C54.8862 67.2917 67.2917 54.8862 67.2917 39.5833C67.2917 24.2804 54.8862 11.875 39.5833 11.875C24.2804 11.875 11.875 24.2804 11.875 39.5833C11.875 54.8862 24.2804 67.2917 39.5833 67.2917Z" stroke="#ED2737" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M83.125 83.125L59.375 59.375" stroke="#ED2737" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M32.6666 33.6667C32.6666 32.2081 33.3427 30.8091 34.546 29.7777C35.7494 28.7462 37.3815 28.1667 39.0833 28.1667H40.9166C42.6184 28.1667 44.2505 28.7462 45.4539 29.7777C46.6573 30.8091 47.3333 32.2081 47.3333 33.6667C47.4008 34.857 47.0797 36.0371 46.4184 37.029C45.7571 38.021 44.7913 38.7713 43.6666 39.1667C42.5419 39.6941 41.5762 40.6944 40.9149 42.017C40.2535 43.3397 39.9325 44.913 40 46.5001" stroke="#ED2737" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M40 53.8333V53.8516" stroke="#ED2737" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                        No confusion</p>
                      <p>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.5977 20.2959C16.4016 20.2959 20.2959 16.4016 20.2959 11.5977C20.2959 6.79375 16.4016 2.89941 11.5977 2.89941C6.79375 2.89941 2.89941 6.79375 2.89941 11.5977C2.89941 16.4016 6.79375 20.2959 11.5977 20.2959Z" stroke="#ED2737" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M11.5977 6.76526V11.5976L14.4971 14.497" stroke="#ED2737" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Save your time
                      </p>
                      <p>
                      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.58525 14.4971C8.58525 13.4295 7.71984 12.5641 6.6523 12.5641C5.58477 12.5641 4.71936 13.4295 4.71936 14.4971V16.43C4.71936 17.4975 5.58477 18.363 6.6523 18.363C7.71984 18.363 8.58525 17.4975 8.58525 16.43V14.4971Z" stroke="#ED2737" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M20.1829 14.4971C20.1829 13.4295 19.3175 12.5641 18.25 12.5641C17.1824 12.5641 16.317 13.4295 16.317 14.4971V16.43C16.317 17.4975 17.1824 18.363 18.25 18.363C19.3175 18.363 20.1829 17.4975 20.1829 16.43V14.4971Z" stroke="#ED2737" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M4.71936 14.4971V11.5977C4.71936 9.54706 5.53396 7.58045 6.98395 6.13046C8.43393 4.68047 10.4005 3.86588 12.4511 3.86588C14.5017 3.86588 16.4683 4.68047 17.9183 6.13046C19.3683 7.58045 20.1829 9.54706 20.1829 11.5977V14.4971" stroke="#ED2737" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M18.25 18.3629C18.25 19.1319 17.6391 19.8694 16.5516 20.4131C15.4641 20.9569 13.9891 21.2624 12.4512 21.2624" stroke="#ED2737" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                        Expert's recommendation</p>
                      <p>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.4359 11.1144V10.148C11.4359 9.76346 11.5886 9.39472 11.8605 9.12285C12.1324 8.85098 12.5011 8.69824 12.8856 8.69824C13.2701 8.69824 13.6388 8.85098 13.9107 9.12285C14.1826 9.39472 14.3353 9.76346 14.3353 10.148V11.5977" stroke="#ED2737" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M17.2347 11.5976V5.31555C17.2347 4.93107 17.3874 4.56233 17.6593 4.29045C17.9312 4.01858 18.2999 3.86584 18.6844 3.86584C19.0689 3.86584 19.4376 4.01858 19.7095 4.29045C19.9814 4.56233 20.1341 4.93107 20.1341 5.31555V15.4635C20.1341 17.0015 19.5231 18.4764 18.4357 19.5639C17.3482 20.6514 15.8732 21.2623 14.3353 21.2623H12.4023H12.6033C11.643 21.2625 10.6976 21.0242 9.85216 20.5687C9.00669 20.1132 8.28757 19.4549 7.75938 18.6529C7.69599 18.5564 7.63285 18.4597 7.56995 18.3629C7.26841 17.9 6.21013 16.055 4.39412 12.827C4.209 12.4979 4.15954 12.1096 4.25629 11.7447C4.35303 11.3797 4.58833 11.0669 4.91215 10.8728C5.25707 10.6658 5.66124 10.58 6.06048 10.6291C6.45971 10.6781 6.83112 10.8591 7.11571 11.1434L8.53642 12.5641" stroke="#ED2737" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14.3353 10.148C14.3353 9.76346 14.4881 9.39472 14.7599 9.12285C15.0318 8.85098 15.4005 8.69824 15.785 8.69824C16.1695 8.69824 16.5383 8.85098 16.8101 9.12285C17.082 9.39472 17.2347 9.76346 17.2347 10.148V11.5977" stroke="#ED2737" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8.5365 12.5641V4.34912C8.5365 3.96464 8.68924 3.5959 8.96111 3.32402C9.23298 3.05215 9.60172 2.89941 9.98621 2.89941C10.3707 2.89941 10.7394 3.05215 11.0113 3.32402C11.2832 3.5959 11.4359 3.96464 11.4359 4.34912V11.5977" stroke="#ED2737" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                        No ADS</p>
                  </div>
                  <div className="link-to-bottom">
                  <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="13.5" cy="13.5" r="13.5" fill="#E8DCCA"/>
                    <g clipPath="url(#clip0)">
                    <path d="M10.4191 19.2735L15.3861 14.3064L10.4191 9.33933L11.952 7.8064L18.452 14.3064L11.952 20.8064L10.4191 19.2735Z" fill="#ED2737"/>
                    </g>
                    <defs>
                    <clipPath id="clip0">
                    <rect width="13" height="13" fill="white" transform="matrix(4.37114e-08 1 1 -4.37114e-08 7.93555 7.8064)"/>
                    </clipPath>
                    </defs>
                  </svg>
                  </div>
                </div>
                </a>
              <div className="flex justify-between w-full first-section">
                <div className="section-1-banner">
                      <h3>Planning to purchase <br /> something?</h3>
                      <h4>Make a wish for...</h4>
                      <div className="top-banner-ctas">
                          {SUPPORTED_ITEMS.slice(0,typeof window !== "undefined" && window.innerWidth < 500 ? 3 : 8).map(item => (
                              <div className="top-banner-ctas-item" key={item+"+1"} onClick={() => {history.push(`${routes.MAKE_WISH}?product=${item}`)}}>
                                  <img alt={item} src={require(`Assets/products/${item.replace(' ','-')}_red.svg`)} />
                                  <span>{item}</span>
                              </div>

                          ))}
                          <div className="top-banner-ctas-item" onClick={() => {history.push(routes.MAKE_WISH)}}>
                                  <img alt="other" src={require(`Assets/products/others_red.svg`)} />
                                  <span>Others</span>
                          </div>
                      </div>
                </div>
                <div className="section-1-offer-block">
                    <div className="section-1-details">
                        <span className="wish-trend-title">{wishTrend[wishTrendIndex]?.title}</span>
                        <p className="wish-trend-subtitle">{wishTrend[wishTrendIndex]?.subtitle}</p>
                        <p className="wish-trend-description">{wishTrend[wishTrendIndex]?.description}</p>
                        <a href={wishTrend[wishTrendIndex]?.link} target="_blank" rel="noopener noreferrer">View Product &#x203A;&#x203A; </a>
                    </div>
                    <div className="section-1-mvp-holder relative ml-2">
                            <div className="mvp-img-holder">
                              {/* TODO: add link once viki gives the images */}
                              {wishTrend[wishTrendIndex]?.type && 
                                <img alt={wishTrend[wishTrendIndex]?.type} width="100%" height="100%" src={require(`Assets/trendImages/${wishTrend[wishTrendIndex]?.type}.webp`)} />

                              }
                            </div>
                    </div>
                    <div className="slideshow-pill-container">
                          {
                            wishTrend.length > 1 && Array.from(Array(wishTrend.length)).map((x,i) => <span key={'stupid_'+i} className="slideshow-pill" onClick={() => sliderClickHandler(i)} style={{'backgroundColor': wishTrendIndex === i ? '#ed2737' : 'white'}}></span>)
                          }
                    </div>
                </div>
              </div>
            </div>
            <div className="products-container homepage-section">
                <h2>Prime Day Deals</h2>
                <span className="title-underline"></span>
                <div className="products-container-item">
                    {staticWish?.bestDeal?.map(data => <ProductCard key={data.id+"_wish"} {...data} />)}
                </div>
            </div>
            {/* Second section */}
            <div className="products-container homepage-section">
                <h2>Genie's Best Recommendations</h2>
                <span className="title-underline"></span>
                <div className="products-container-item">
                    {staticWish?.bestRecc?.map(data => <ProductCard key={data.id+"_wish"} {...data} customStyle={{backgroundColor: "#fff"}}/>)}
                </div>
            </div>
            {/* third section */}
            <div className="products-container homepage-section">
                <h2>Genie's Latest recommendations</h2>
                <span className="title-underline"></span>
                <div className="products-container-item">
                {latestRecommendation.map(data => <ProductCard {...data} key={data.id+"_genie"} />)}
                </div>
            </div>
            {/* fourth section */}
            <div className="products-container homepage-section">
                <h2>Browse categories</h2>
                <span className="title-underline"></span>
                <div className="mobile-under">
                    {SUPPORTED_ITEMS.slice(0,11).map(item => (
                        <div key={item+"+2"} className="mobile-under-items cursor-pointer" onClick={() => {history.push(`${routes.PRODUCT_LIST}?product=${item}`)}}>
                            <h4>{item.toUpperCase()}</h4>
                            <span>recommendations</span>
                              <img src={Arrow} alt="arrow" />
                            <div className="mobile-under-container">
                                <img data-src={require(`Assets/sample/${item.replace(' ','-')}-sample.png`)} alt={item}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Fifth section */}
            <div className="products-container homepage-section" id="about-wishgee">
                <h2>Why Wishgee?</h2>
                <span className="title-underline"></span>
                <p className="mt-8">With too many options available on the market, deciding on a single product requires a lot of time and effort. At wishgee all you have to do is tell us your requirements and then sit back and relax while our experts do the research for you and get you the best recommendation which you can purchase anywhere online or offline from your nearest store. </p>
                <div className="why-wishgee">
                    <div>
                        <img src={Frame3} alt="1 wish 1 result"/>
                        <h4>No Confusion</h4>
                        <span>One Wish One Result.</span>
                    </div>
                    <div>
                        <img src={Frame1} alt="expert's advice"/>
                        <h4>Expert's advice</h4>
                        <span>Recommendations and best deals from product experts.</span>
                    </div>
                    <div>
                        <img src={Frame2} alt="save time"/>
                        <h4>Save your time</h4>
                        <span>No hastle of going through multiple websites for product research.</span>
                    </div>
                    <div>
                        <img src={Frame4} alt="no ads"/>
                        <h4>No ADS</h4>
                        <span>Your data is safe and never goes out of WishGee.</span>
                    </div>
                </div>
            </div>
            {/* sixth section testimonials */}
            <div className="products-container homepage-section" id="testimonials">
              <h2>What our users say about us</h2>
              <span className="title-underline"></span>
              <div className="mt-8">
                <Testimonials />
              </div>
            </div>
            {/* Seventh section FAQ */}
            <div className="products-container homepage-section" id="faq-wishgee">
                <h2>Frequently Asked Questions</h2>
                <span className="title-underline"></span>
                <div className="mt-8">
                  <FAQ/>
                </div>
            </div>
        </div>
    )
}

export default WebLanding;