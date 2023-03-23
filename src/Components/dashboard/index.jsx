/* eslint-disable no-mixed-operators */
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import mixpanel from 'mixpanel-browser';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Snackbar from '@material-ui/core/Snackbar';
import { WishStatus } from 'Constants/wishStatus';
import { getAllUserWish, CloseUserWish } from 'APIHelper';
import UserContext from 'Context/userContext';
import routes from 'Constants/routes';
import './style.scss';
// import { products } from 'Data/productData' // Mock data

const DashProductCard = React.lazy(() => import('Components/common/dashProductCard'));
const SigninComponent = React.lazy(() => import("Components/Firebase/SigninComponent"))

const userState = {
    UNVERIFIED: 1,
    ERROR: 2,
    NO_WISH:3,
}

const NoWish = () => {
    return (
        <Dialog
            open={true}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">WishGee</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
            Oops... You don't have any wish. Make your first wish now.
            </DialogContentText>
            <Link to={routes.ADD_WISH}>
        <button className="mt-3 w-40 josefin-regular font-mono flex-shrink-0 bg-red text-base hover:bg-red-darkest text-white py-2 px-2 rounded-full">
            Make a wish
        </button>
        </Link>
            </DialogContent>
        </Dialog>
    )
}

const Loader = () => {
    return (
        <Dialog
            open={true}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">WishGee</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Fetching your data...
            </DialogContentText>
            <CircularProgress />
            </DialogContent>
        </Dialog>
    )
}

const PromptLogin = () => {
    return (
        <Dialog
            open={true}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Login to Continue</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                You seem to be logged out. Please login to continue.
            </DialogContentText>
            <SigninComponent/>
            </DialogContent>
        </Dialog>
    )
}

function Dashboard() {
    const [errorState, setErrorState] = useState(null)
    const [resultData, setResultData] = useState({});
    const [userDetail] = useContext(UserContext);
    const [closeItemId, setCloseItemId] = useState(-1)
    const [selectedTab, setSelectedTab] = useState(1)
    const [emailSent, setEmailSent] = useState(false);
    const getUserWish = () => {
        getAllUserWish().then(details => {
            const { successCode, errorCode, data} = details;
            if(errorCode || !successCode){
                setErrorState(userState.ERROR)
            }else{
                if(data.contents.length === 0){
                    setErrorState(userState.NO_WISH);
                }else{
                    setResultData(data)
                }
            }
        })
        const url = new URL(window.location.href);

        const fromEmail = url.searchParams.get('product')
        mixpanel.track('DASHBOARD_PAGE', {
            wishProductType: fromEmail
          })
        import('Components/Firebase').then(({analytics}) => {
            analytics.logEvent('DASHBOARD_PAGE');
        })
        if(fromEmail){
            setSelectedTab(2);
            mixpanel.track('FROM_EMAIL', {
                wishProductType: fromEmail
            })
            import('Components/Firebase').then(({analytics}) => {
                analytics.logEvent('FROM_EMAIL', {wishProductType: fromEmail});
            })
        }
    }
    useEffect(() => {
        // setResultData(products)
        window.scrollTo(0, 0);
        if(!userDetail.hasOwnProperty('Provider')){
            if(userDetail.displayName){
                setErrorState(false)
                getUserWish();
            }else{
                setErrorState(userState.UNVERIFIED);
            }
        }
    }, [userDetail])

    const handleConfimWishClose = async () => {
        await CloseUserWish(closeItemId).then(res =>{
            setCloseItemId(-1)
            getUserWish();
        })
    }

    const sendVerificationMail = () => {
        import('Components/Firebase').then(({auth}) => {
            auth.currentUser.sendEmailVerification();
        })
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setEmailSent(false)
    }

    
    const { totalPages, totalElements, contents = [] } = resultData;

    const getDashProductCard = (wishData) => {
        const {status, result} = wishData;
        console.log(status, result)
        if(!(selectedTab === 1 && (status === WishStatus.open || status === WishStatus.reviewed || status === WishStatus.waitingForApproval) ||
        selectedTab === 2 && (status === WishStatus.resolved && result) ||
        selectedTab === 3 && (status === WishStatus.closed || status === WishStatus.resolved && !result))){
            return '';
        }
        return <DashProductCard wishData={wishData} emailVerified={userDetail.emailVerified} sendVerificationMail={sendVerificationMail} setCloseItemId={setCloseItemId}/>
    }

    return (
        <>
            <div className="flex flex-col md:flex-row md:px-24 sm:px-12 xxl:px-48 px-4 py-2 min-h-4 dashboardContainer" >
                <div className="w-full md:w-1/5 mt-5 md:relative fixed bg-white flex flex-row md:flex-col md:pl-1 md:pr-4 pt-10 text-left left-panel">
                    <p className={`"w-full px-2 py-3 mb-2" ${selectedTab === 1 && 'selected'}`} onClick={() => setSelectedTab(1)}>Open Wish</p>
                    <p className={`"w-full px-2 py-3 mb-2" ${selectedTab === 2 && 'selected'}`} onClick={() => setSelectedTab(2)}>Granted Wish</p>
                    <p className={`"w-full px-2 py-3 mb-2" ${selectedTab === 3 && 'selected'}`} onClick={() => setSelectedTab(3)}>Closed Wish</p>
                </div>
                <div className="w-full">
                    <p className="pb-3 font-semibold text-sm md:text-lg text-center lg:text-left mt-5 lg:mb-10">All your {selectedTab === 1 ? 'Open' : selectedTab === 2 ? 'Granted ' : 'Closed' } wish</p>
                    {
                        errorState ? 
                            (errorState === userState.UNVERIFIED ? <PromptLogin />: 
                                errorState === userState.NO_WISH ?  <NoWish /> : "Something went wrong. Please try again."   
                            ) : 
                            
                            contents?.length > 0 ? contents.map((result, index) => getDashProductCard(result)) : 
                            <Loader />
                    }
                    <Dialog
                            open={closeItemId > -1}
                            aria-labelledby="alert-dialog-title"
                            onClose={() => {setCloseItemId(-1)}}
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"Confirm mark this item as purchased?"}</DialogTitle>
                            <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Have already purchased this product? Go ahead and mark this wish as purchased to make room for more wishes.
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                            <Button className="text-gray"  onClick={() => {setCloseItemId(-1)}}>
                                Go Back
                            </Button>
                            <Button className="cta-red-button font-bold" onClick={handleConfimWishClose} color="primary" autoFocus>
                                Mark Purchased
                            </Button>
                            </DialogActions>
                    </Dialog>
                </div>
            </div>
            <Snackbar
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
                open={emailSent}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={"verification email sent to "+userDetail.email}
            />
        </>
    )
}

function DashboardComponent() {
    return <Dashboard />
}

export default DashboardComponent;