import React from 'react';
import { WishStatus } from 'Constants/wishStatus';
import mixpanel from 'mixpanel-browser';
import Switch from '@material-ui/core/Switch';
import './style.scss';
import Other from 'Assets/products/others.svg';
import Snackbar from '@material-ui/core/Snackbar';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Caution from './caution.png';

let hidePopup = Boolean(sessionStorage.getItem("hidePopup"));


export default function({wishData, sendVerificationMail = () =>{}, emailVerified = true, setCloseItemId = null}) {
    const [promptUser, setPromptUser] = React.useState(false);
    const [linkCopied, setLinkCopied] = React.useState(false)
    const { status, result, title, created, max_budget, agent } = wishData
    const date = new Date(created);
    const {product_name, product_price, product_brand, product_link, product_thumbnail, closing_remark } = result || {}
    const {name : agentName} = agent || {};
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

    const getStatus = () => {
        let retVal = '';
        if(status === WishStatus.resolved && !result) {
            return <li className='font-bold text-grey'>
            Your request is invalid.
            </li>
        }
        switch(status){
            case WishStatus.waitingForApproval:
                retVal = (
                    <>
                            <li className='text-grey line-through'>
                                We are searching for a Genie for your request.
                            </li>
                            <li className='text-grey line-through'>
                                Genie {agentName} is looking into your request.
                            </li>
                            <li className='font-bold text-grey'>
                            Got your product, now searching for the best deals.
                            </li>
                    </>
                )
                break
                            
            case WishStatus.reviewed:
                retVal = (
                    <>
                        <li className='text-grey line-through'>
                        We are searching for a Genie for your request.
                        </li>
                        <li className='text-grey font-bold'>
                            Genie {agentName} is looking into your request.
                        </li>
                    </>
                )

                break
            case WishStatus.open:
                retVal = <li className='font-bold text-grey'>
                                We are searching for a Genie for your request. Please keep an eye on your mail for further communicaiton.
                            </li>
                break
            default: break;
        }
        return retVal;
    }

    const handleProductLinkClicked = () => {
        setPromptUser(false)
        sessionStorage.setItem("hidePopup",true);
        hidePopup = true;
        mixpanel.track('RECOMMENDATION_VIEWED', {
            wishProductType: title,
            wishBudget: max_budget
        })
        import('Components/Firebase').then(({analytics}) => {
            analytics.logEvent('RECOMMENDATION_VIEWED', {wishProductType: title});
            window.open(product_link, '_blank')
        })
    }

    const handleSetPromptUser = () => {
        if(hidePopup){
            handleProductLinkClicked();
          return;
        }
        setPromptUser(true);
    }

    const copyLink = () => {
        navigator.clipboard.writeText(product_link);
        setLinkCopied(true);
        setTimeout(() => {
          setLinkCopied(false)
        }, 3000)
      }

    return (
        <div className="product-dash-main-block flex flex-col mb-4" key={wishData.id}>
            {!emailVerified && 
                <div className="glass-overlay">
                    <div className="verification-box">
                        <div className="flex justify-center items-center">
                            <img src={Caution} alt="caution" />
                        </div>
                        <div className="pl-6">
                            Email verification pending<br/>
                            <span className="cursor-pointer" onClick={sendVerificationMail}>Send Verification Link</span>
                        </div>
                    </div>
                </div>
            }
            <div className="wish-title flex justify-between pb-2">
                <div className="w-9/12">
                    <p className="text-sm md:text-base">You wished for a <i>{title}</i> { Number(max_budget) > 0 && <>under <span className="text-red font-semibold">&#8377;{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(max_budget)}</span></> }</p>
                    <p className="text-xs md:text-sm text-grey font-normal">on {date.getDate()} {date.toLocaleString('default', {month: 'long'})}, {date.getFullYear()}</p>
                </div>
                {
                    setCloseItemId && wishData.status === WishStatus.resolved && 
                    <div className="flex flex-col">
                    <p className="text-sm">Close Wish</p>
                    <Switch
                        checked={false}
                        onChange={() => {setCloseItemId(wishData.id)}}
                        name="checkedA"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                    </div>
                }
            </div>
            {status === WishStatus.open || status === WishStatus.reviewed || status === WishStatus.waitingForApproval || (status === WishStatus.resolved && !result) ? 
                (  
                    <div className="flex md:pt-4 flex-col items-center text-xs md:text-sm md:text-base">
                        <div className="review-wish-img rounded-full p-4 my-1 md:my-4">
                            <img data-src={require(`Assets/products/${title === "other" ? 'others' : title.replace(' ','-')}.svg`)} onError={()=>'other'} alt="wishgee product type"/>
                        </div>
                        <ul className="flex flex-col-reverse w-full md:w-auto list-disc list-inside">
                                {  getStatus() }
                        </ul>
                        {/* <p className="text-grey">
                            The product of your dreams will appear under fulfilled wish section.
                        </p> */}
                        {/* <p className="mt-1 md:mt-4 md:w-auto w-full">
                            You will the result withn 24 hours.
                        </p> */}
                    </div>
                )
                : 
                (status === WishStatus.resolved || status === WishStatus.closed) &&
                (
                    <div className="flex md:pt-4 pt-2 flex-col md:items-start">
                        <p className="text-grey text-xs md:text-base">{status === WishStatus.resolved ||  status === WishStatus.closed ? "The best match for your requirement is..." : "Your result will look like this...we are doing final check."}</p>
                        <div className="flex flex-col md:flex-row mt-1 md:mt-4 w-full">
                            <div className="w-full md:w-1/5 p-2 flex justify-center">
                                <div className="w-48">
                                    <img className="w-full h-full object-contain" data-src={product_thumbnail} alt={product_name} />
                                </div>
                            </div>
                            <div className="md:pl-4 w-full px-1 py-4 flex flex-col justify-between text-left">
                                <p className="font-semibold text-sm md:text-lg">{product_name}</p>
                                <p><i>{product_brand}</i></p>
                                <div className="flex justify-start sm:justify-center flex-col md:flex-row mt-1">
                                    <div className="price-block md:pb-0 pb-2 flex items-center text-red font-bold w-full md:w-1/4">
                                    &#8377; {new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 2 }).format(product_price)}
                                    </div>
                                    <div className="flex justify-between w-full md:w-3/4">
                                        <div className="md:pl-4">
                                            <button className='cta-red-button font-bold' onClick={handleSetPromptUser}>{status === WishStatus.waitingForApproval ? "Please Wait" : "View Product"}</button>
                                        </div>
                                        <button onClick={copyLink} className="secondary-cta flex" style={{display:'flex'}}>
                                            Share
                                            <svg className="cursor-pointer"  viewBox="0 0 44 44" version="1.1" xmlns="http://www.w3.org/2000/svg" style={{width: "20px", paddingTop:"4px", marginLeft:"10px"}}>
                                                <title>Share</title>
                                                <defs></defs>
                                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                    <g id="Social-Icons---Isolated" transform="translate(-54.000000, -393.000000)" fill="#ed2723">
                                                        <path d="M61.855,422.51 C63.681,422.51 65.363,421.885 66.697,420.838 L81.603,428.197 C81.603,428.227 81.601,428.254 81.601,428.283 C81.601,432.621 85.119,436.139 89.457,436.139 C93.794,436.139 97.312,432.621 97.312,428.283 C97.312,423.946 93.794,420.428 89.457,420.428 C87.148,420.428 85.074,421.422 83.638,423.006 L69.582,416.067 C69.664,415.61 69.71,415.139 69.71,414.656 C69.71,414.559 69.707,414.463 69.703,414.367 L84.244,406.731 C85.632,407.961 87.457,408.711 89.457,408.711 C93.796,408.711 97.312,405.194 97.312,400.856 C97.312,396.516 93.794,393 89.457,393 C85.119,393 81.601,396.516 81.601,400.856 C81.601,401.18 81.625,401.498 81.662,401.811 L67.533,409.231 C66.103,407.735 64.089,406.801 61.855,406.801 C57.517,406.801 54,410.319 54,414.656 C54,418.994 57.517,422.51 61.855,422.51" id="Share"></path>
                                                    </g>
                                                </g>
                                            </svg>
                                        </button>
                                    </div>
                            </div>
                            </div>
                        </div>
                        {closing_remark && 
                            <div className="flex flex-col md:flex-row justify-between w-full p-4 rounded-lg genie-choose ">
                                <div className="flex flex-col text-left text-xs md:text-base">
                                    <p className="why-genie-text">Why the Genie chose this?</p>
                                    <p className="why-genie-desc">{closing_remark}</p>
                                </div>
                                {agentName && <p className="text-grey mt-2 md:mt-0 text-xs md:text-base">Genie behind this research: <span className="font-bold">{agentName}</span></p>}
                            </div>
                        }
                        <Dialog
                            open={promptUser && !hidePopup}
                            aria-labelledby="alert-dialog-title"
                            onClose={() => {hidePopup = true; setPromptUser(false)}}
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"A note from our Genie."}</DialogTitle>
                            <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Hi there, we put a lot of effort searching the best result for you. It will help us continue serving you smoothly if you purchase the items using our link.
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                            <Button className="cta-red-button font-bold" onClick={handleProductLinkClicked} color="primary" autoFocus>
                                continue
                            </Button>
                            </DialogActions>
                        </Dialog>   
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
            {/* For status = reviewed */}
        </div>
    )
}