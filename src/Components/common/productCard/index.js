
import React from 'react';
import mixpanel from 'mixpanel-browser';
import Snackbar from '@material-ui/core/Snackbar';
import './style.scss';

const ProductCard = (wishDetails) => {
    const [linkCopied, setLinkCopied] = React.useState(false)
    const { title, max_budget, keywords, result, customStyle, custom_title, custom_cta } = wishDetails || {};
    const { product_name, product_price, product_link, closing_remark, product_brand, product_thumbnail}  = result || {}
    React.useEffect(() => {
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
      },[])

    const productViewAnalytics = () => {
      mixpanel.track('PRODUCT_VIEWED', {
        wishProductType: title,
        wishBudget: max_budget
      })
      import('Components/Firebase').then(({analytics}) => {
        analytics.logEvent('PRODUCT_VIEWED', {wishProductType: title});
    })
    }

    const copyLink = () => {
      navigator.clipboard.writeText(product_link);
      setLinkCopied(true);
      setTimeout(() => {
        setLinkCopied(false)
      }, 3000)
    }

    if(!result){
    return '';
    }

    return (
        <div className="products-container-detail" style={customStyle}>
          {
            custom_title ? <div className="requirement-details">{custom_title}</div> :
            title && <div className="requirement-details">{title} at &#8377;{ Number(max_budget) === 0 ? new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(product_price) : new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(max_budget) } { keywords?.length > 0 && `with these features: ${keywords}`  }</div>
          }
            <div className="products-details-img" style={{'marginTop': title && '36px'}}>
                <img data-src={product_thumbnail} loading="lazy" alt={product_name}/>
            </div>
            <h4>{product_name}<br/><p className="italic font-normal">{product_brand}</p></h4>
            <div className="buy-now-sec">
                <div className="flex w-full justify-between">
                  <span className="product-price"><span className="text-sm font-light">&#8377;&nbsp;</span>{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 7 }).format(product_price)}</span>
                  <svg onClick={copyLink} className="cursor-pointer"  viewBox="0 0 44 44" version="1.1" xmlns="http://www.w3.org/2000/svg" style={{width: "20px"}}>
                      <title>Share</title>
                      <defs></defs>
                      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                          <g id="Social-Icons---Isolated" transform="translate(-54.000000, -393.000000)" fill="#4A4A4A">
                              <path d="M61.855,422.51 C63.681,422.51 65.363,421.885 66.697,420.838 L81.603,428.197 C81.603,428.227 81.601,428.254 81.601,428.283 C81.601,432.621 85.119,436.139 89.457,436.139 C93.794,436.139 97.312,432.621 97.312,428.283 C97.312,423.946 93.794,420.428 89.457,420.428 C87.148,420.428 85.074,421.422 83.638,423.006 L69.582,416.067 C69.664,415.61 69.71,415.139 69.71,414.656 C69.71,414.559 69.707,414.463 69.703,414.367 L84.244,406.731 C85.632,407.961 87.457,408.711 89.457,408.711 C93.796,408.711 97.312,405.194 97.312,400.856 C97.312,396.516 93.794,393 89.457,393 C85.119,393 81.601,396.516 81.601,400.856 C81.601,401.18 81.625,401.498 81.662,401.811 L67.533,409.231 C66.103,407.735 64.089,406.801 61.855,406.801 C57.517,406.801 54,410.319 54,414.656 C54,418.994 57.517,422.51 61.855,422.51" id="Share"></path>
                          </g>
                      </g>
                  </svg>
                </div>
                <button className="w-full main-cta" style={{borderRadius:"0", marginTop:"4px"}} onClick={productViewAnalytics}><a href={product_link} target="_blank" rel="noopener noreferrer">{custom_cta || 'View Product'}</a></button>
            </div>
            <span />
            <div className="closing-remark">
              <ul>
                  {closing_remark?.split('|').map(des => <li key={des}>{des}</li>)}
              </ul>
            </div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={linkCopied}
                message={"Link Copied"}
            />
        </div>
    )
}

export default ProductCard;