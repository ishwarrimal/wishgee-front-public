import React, { useState, useContext, useEffect, Suspense } from "react";
import mixpanel from "mixpanel-browser";
import UserContext from "Context/userContext";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Chip from "@material-ui/core/Chip";
import RadioGroup from "@material-ui/core/RadioGroup";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import { postUserWish, getRecommendedResult, getProductType } from "APIHelper";
import "./style.scss";
import history from "Utils/history";
import routes from "Constants/routes";
import { SUPPORTED_ITEMS } from "Constants";
import Range from "rc-slider/es/Range";
import "rc-slider/assets/index.css";
import getPriceRange from "./priceRange";
import brandList from "./brandList";

const SigninComponent = React.lazy(() =>
  import("Components/Firebase/SigninComponent")
);
const DashProductCard = React.lazy(() =>
  import("Components/common/dashProductCard")
);

const placeHolder = {
  phone: "Looking for good selfie camera.",
  laptop: "Looking for a gaming laptop.",
  camera: "Looking for a cheap and best instant camera.",
  earphones: "Looking for over ear wireless headphones.",
  fridge: "Looking for a double door fridge.",
  television: "Looking for tv which is 40+ inch.",
  guitar: "Looking for an acoustic guitar for a beginner",
  speaker: "Looking for a wireless speaker with good bass.",
  cycle: "Looking for a cycle in which I can go for a daily morning ride",
  watch: "Looking for an Android watch having blood pressure monitor.",
  "washing-machine": "Looking for a top load washing machine.",
  printer: "Looking for a printer for my personal use.",
  monitor: "Looking for a 32 inch monitor to connect to my laptop.",
  tablet: "Looking for tablet with big screen.",
};

const initialState = {
  title: "phone",
  min_budget: 0,
  max_budget: 0,
  description: "",
  keywords: [],
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    background: "none",
    flexWrap: "wrap",
    listStyle: "none",
    border: "none",
    boxShadow: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function () {
  const classes = useStyles();
  const [productType, setProductType] = useState({});
  const [currentProduct, setCurrentProduct] = useState(null);
  const [keywordsExceeded, setKeywordsExceeded] = useState(false);
  const [brandsFlag, setBrandsFlag] = useState(false);
  const [brandsIncluded, setBrandsIncluded] = useState([]);
  const [reqObj, setReqObj] = useState(initialState);
  const [messageInfo, setMessageInfo] = useState(false);
  const [isDialogCancellable, setIsDialogCancellable] = useState(true);
  const [promptLogin, setPromptLogin] = useState(false);
  const [resultDetails, setResultDetails] = useState([]);
  const [sliderPosition, setSliderPosition] = useState([0, 0]);
  const [RangeDetails, setRangeDetails] = useState(getPriceRange("phone"));
  const [rangeUpdateKey, setRangeUpdateKey] = useState(Date.now());
  const [emailSent, setEmailSent] = useState(false);
  const [userDetail] = useContext(UserContext);
  const { title, min_budget, max_budget, description, keywords } = reqObj;

  React.useEffect(() => {
    window.scrollTo(0, 0);

    getProductType().then((pt) => {
      const ptList = {};
      pt.forEach((item) => {
        ptList[item.type?.toLowerCase()] = item.keywords
          .split(",")
          .map((item) => item.trim());
      });
      setProductType(ptList);
    });

    const url = new URL(window.location.href);
    const title = url.searchParams.get("product");
    const newObj = { ...reqObj };
    if (title && SUPPORTED_ITEMS.indexOf(title) > -1) {
      newObj.title = title;
    }
    const pRange = getPriceRange(title || "phone");
    setRangeDetails(pRange);
    newObj.min_budget = pRange.left;
    newObj.max_budget = pRange.right;
    setReqObj(newObj);

    console.log(brandList[title]);
  }, []);

  useEffect(() => {
    if (!productType[title]) {
      return;
    }
    const CP = productType[title];
    setCurrentProduct(CP);
    const curObj = { ...reqObj };
    curObj.keywords = [];
    setReqObj(curObj);
  }, [productType, title]);

  React.useEffect(() => {
    setSliderPosition([
      (RangeDetails.left / RangeDetails.step) * RangeDetails.multiplier,
      (RangeDetails.right / RangeDetails.step) * RangeDetails.multiplier,
    ]);
    setRangeUpdateKey(Date.now());
  }, [RangeDetails]);

  const updateReqObj = (key, val) => {
    const curObj = { ...reqObj };
    // curObj[e.currentTarget.id] = e.target.value;
    curObj[key] = val;
    if (key === "title") {
      const pRange = getPriceRange(val);
      setRangeDetails(pRange);
      curObj.min_budget = pRange.left;
      curObj.max_budget = pRange.right;
      setBrandsIncluded([]);
    }
    setReqObj(curObj);
  };

  const handleSliderChange = (min, max) => {
    if (min > max_budget) {
      return;
    }
    if (min !== min_budget) {
      setSliderPosition([
        (min / RangeDetails.step) * RangeDetails.multiplier,
        sliderPosition[1],
      ]);
      updateReqObj("min_budget", min);
    } else if (max !== max_budget) {
      setSliderPosition([
        sliderPosition[0],
        (max / RangeDetails.step) * RangeDetails.multiplier,
      ]);
      updateReqObj("max_budget", max);
    }
  };

  const doValidation = () => {
    //do some validation for the data
    return true;
  };

  const fetchResult = async () => {
    setResultDetails([]);
    setIsDialogCancellable(false);
    setMessageInfo("Getting the best result for your requirement...");
    try {
      const wishData = await getRecommendedResult({
        ...reqObj,
        brands_included: brandsIncluded,
      });
      if (wishData.errorMsg) {
        setMessageInfo("Something went wrong! Please try again.");
        return;
      }
      setMessageInfo(wishData.length > 0 ? "WishGee Result" : "No Result");
      if (wishData) {
        setResultDetails(wishData);
        mixpanel.track("NEW_WISH_SEARCH", {
          wishProductType: reqObj.title,
          wishBudget: reqObj.max_budget,
          keywords: reqObj.keywords,
        });
        import("Components/Firebase").then(({ analytics }) => {
          analytics.logEvent("NEW_WISH_SEARCH", {
            wishProductType: reqObj.title,
          });
        });
      } else {
        setMessageInfo("Something went wrong! Please try again.");
      }
    } catch (e) {
      setMessageInfo("Something went wrong! Please try again.");
    } finally {
      setIsDialogCancellable(true);
    }
  };

  const sendUserRequestFinal = async () => {
    setIsDialogCancellable(false);
    const data = { ...reqObj };
    data.keywords = reqObj.keywords.join(",");
    data.brands_included = brandsIncluded.join(",");
    const userWishReq = { ...data, type: reqObj.title };
    try {
      const status = await postUserWish(userWishReq);
      setResultDetails([]);
      if (status.errorMsg) {
        setMessageInfo("Something went wrong! Please try again.");
        return;
      }
      setReqObj({});
      if (status) {
        mixpanel.track("NEW_WISH_CREATED", {
          wishProductType: reqObj.title,
          wishBudget: reqObj.max_budget,
          keywords: reqObj.keywords,
        });
        import("Components/Firebase").then(({ analytics }) => {
          analytics.logEvent("NEW_WISH_CREATED", {
            wishProductType: reqObj.title,
          });
        });
        setMessageInfo(
          "Your wish was submitted successfully. Redirecting you to dashboard."
        );
        setTimeout(() => history.push(routes.DASHBOARD), 1000);
      } else {
        setMessageInfo("Oops. Something went wrong! Please try again.");
      }
    } catch (e) {
      setMessageInfo("Oops. Something went wrong! Please try again.");
    } finally {
      setIsDialogCancellable(true);
    }
  };

  const submitUserRequest = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setMessageInfo(null);
    setResultDetails([]);
    if (userDetail.displayName) {
      setMessageInfo("Please wait while we submit your wish.");
    } else {
      setPromptLogin(true);
      return;
    }
    sendUserRequestFinal();
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    const validData = doValidation();
    if (!validData) {
      //throw some error
      return;
    }
    fetchResult();
  };

  const sendVerificationMail = () => {
    import("Components/Firebase").then(({ auth }) => {
      auth.currentUser.sendEmailVerification();
    });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setEmailSent(false);
  };

  const handleClickChip = (e) => {
    const chip = e.target.innerText;
    const curObj = { ...reqObj };
    const chipIndex = keywords.indexOf(chip);
    if (chipIndex > -1) {
      curObj.keywords.splice(chipIndex, 1);
    } else {
      if (keywords.length === 3) {
        setKeywordsExceeded(true);
        setTimeout(() => {
          setKeywordsExceeded(false);
        }, 1000);
        return;
      }
      curObj.keywords.push(chip);
    }
    setReqObj(curObj);
  };

  const handleBrandsFlag = (e) => {
    setBrandsFlag(e.target.value === "no" ? false : true);
    if (e.target.value === "no") {
      setBrandsIncluded([]);
    }
  };

  const handleExcludeBrand = (e) => {
    const chip = e.target.innerText;
    const brands = [...brandsIncluded];
    const chipIndex = brandsIncluded.indexOf(chip);
    if (chipIndex > -1) {
      brands.splice(chipIndex, 1);
    } else {
      brands.push(chip);
    }
    setBrandsIncluded(brands);
  };

  return (
    <>
      <div className="relative w-full flex justify-start md:justify-center addWish-container">
        <div className="w-full md:w-3/4 flex overflow-hidden rounded-lg header-container-card md:p-12 p-4">
          <div
            className="md:mx-4 mx-auto sm:flex py-16"
            style={{ minHeight: "calc(100vh - 128px)" }}
          >
            <div className="flex flex-row">
              <div className="w-full text-base">
                <form onSubmit={handleSubmitClick} className="mt-4 w-full">
                  <p className="text-grey-darker font-bold text-left mb-4 mt-6">
                    Dear Genie,
                  </p>
                  <div className="wish-input-block mt-12">
                    <p className="text-left pb-1 text-red font-boldnormal text-lg">
                      I wish to buy a
                    </p>
                    <div className="product-container">
                      {SUPPORTED_ITEMS.map((item) => (
                        <div
                          className={`product-container-items ${
                            title === item && "selected-item"
                          }`}
                          key={item}
                          onClick={() => {
                            updateReqObj("title", item);
                          }}
                        >
                          <img
                            alt={item.title}
                            src={require(`Assets/products/${item.replace(
                              " ",
                              "-"
                            )}${reqObj.title !== item ? "_red" : ""}.svg`)}
                          />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* <select name="title" onChange={updateReqObj} value={title} id="title" className="w-full border-2 rounded-lg border- bg-grey-lighter border-grey border-solid text-grey-darker-inputText px-2 py-1 mb-5 capitalize">
                                        {SUPPORTED_ITEMS && SUPPORTED_ITEMS.map((item) => <option value={item} key={item}>{item}</option> )}
                                    </select> */}
                  <div className="wish-input-block mt-12 relative">
                    <p className="text-left  pb-1 text-red font-boldnormal text-lg">
                      My budget range is in between
                    </p>
                    <div className="flex flex-row items-center justify-between w-full sm:flex-col lg:flex-row">
                      {RangeDetails && (
                        <Range
                          key={rangeUpdateKey}
                          min={0}
                          max={RangeDetails.max}
                          step={RangeDetails.step}
                          defaultValue={[RangeDetails.left, RangeDetails.right]}
                          allowCross={false}
                          draggableTrack={true}
                          onChange={(e) => {
                            handleSliderChange(e[0], e[1]);
                          }}
                          // value={[20,20]}
                        />
                      )}
                    </div>
                    <div
                      className="absolute pt-4 w-20 text-center text-xs"
                      style={{ left: `calc(${sliderPosition[0] - 1}% - 34px)` }}
                    >
                      &#8377;
                      {new Intl.NumberFormat("en-IN", {
                        maximumSignificantDigits: 3,
                      }).format(min_budget)}
                    </div>
                    <div
                      className="absolute pt-4 w-20 text-center text-xs"
                      style={{
                        left: `calc(${sliderPosition[1] - 1}% - 34px)`,
                        top: "10px",
                      }}
                    >
                      &#8377;
                      {new Intl.NumberFormat("en-IN", {
                        maximumSignificantDigits: 3,
                      }).format(max_budget)}
                    </div>
                  </div>
                  {/* <div className="wish-input-block mt-20 relative">
                                        <p className="text-left  pb-1 text-red text-lg inline-block">And please exclude these brands</p>
                                        <Paper component="ul" className={classes.root}>
                                                {brandList[title].map((data) => {
                                                    return (
                                                    <li key={data}>
                                                        <Chip
                                                        label={data}
                                                        clickable
                                                        color={brandsIncluded?.includes(data) ? "secondary" : 'default'}
                                                        onClick={handleExcludeBrand}
                                                        className={classes.chip}
                                                        />
                                                    </li>
                                                    );
                                                })}
                                            </Paper>
                                    </div> */}
                  {/* <div className="flex flex-row items-center justify-between w-full sm:flex-col lg:flex-row">
                                        <div className="sm:w-full">
                                            <p className="text-left pb-1 text-red text-lg">My area Pin Code is</p>
                                            <div className="sm:w-full">
                                                <input 
                                                    type="text"
                                                    placeholder="737101"
                                                    value={pinCode}
                                                    id="pinCode"
                                                    // onKeyUp={(e) => { console.log(e); debugger}}
                                                    onChange={updateReqObj}
                                                    className="w-full border-2 rounded-lg border- bg-grey-lighter border-grey border-solid text-grey-darker-inputText px-2 py-1 mb-5"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div> */}
                  <div className="wish-input-block mt-20">
                    <p className="text-left pb-1 text-red font-boldnormal text-lg">
                      Some features on my mind are
                    </p>
                    {/* <textarea
                                            value={description}
                                            id="description"
                                            onChange={(e) => {updateReqObj('description', e.currentTarget.value)}}
                                            placeholder={placeHolder[title]}
                                            className="w-full rounded-lg bg-white text-grey-darker h-48 p-4 mb-5"

                                        /> */}
                    {currentProduct && (
                      <Paper component="ul" className={classes.root}>
                        {currentProduct.map((data) => {
                          return (
                            <li key={data}>
                              <Chip
                                label={data}
                                clickable
                                color={
                                  keywords?.includes(data)
                                    ? "secondary"
                                    : "default"
                                }
                                onClick={handleClickChip}
                                className={classes.chip}
                              />
                            </li>
                          );
                        })}
                      </Paper>
                    )}
                  </div>
                  <div className="wish-input-block mt-12 relative">
                    <p className="text-left  pb-1 text-red font-boldnormal text-lg inline-block">
                      And I have brand preferences
                    </p>
                    <RadioGroup
                      row
                      aria-label="preference"
                      name="preference"
                      defaultValue="no"
                      className="inline-block"
                      onChange={handleBrandsFlag}
                    >
                      <FormControlLabel
                        value="no"
                        control={<Radio color="primary" />}
                        label="No"
                      />
                      <FormControlLabel
                        value="yes"
                        control={<Radio color="primary" />}
                        label="Yes"
                      />
                    </RadioGroup>
                    {brandsFlag && (
                      <Paper component="ul" className={classes.root}>
                        {brandList[title]?.map((data) => {
                          return (
                            <li key={data}>
                              <Chip
                                label={data}
                                clickable
                                color={
                                  brandsIncluded?.includes(data)
                                    ? "secondary"
                                    : "default"
                                }
                                onClick={handleExcludeBrand}
                                className={classes.chip}
                              />
                            </li>
                          );
                        })}
                      </Paper>
                    )}
                  </div>
                  <div className="wish-input-block mt-12">
                    <p className="text-left pb-1 text-red font-boldnormal text-lg">
                      Additional requirements{" "}
                      <span className="text-xs">
                        (Not required for Quick Result)
                      </span>
                    </p>
                    <textarea
                      value={description}
                      id="description"
                      onChange={(e) => {
                        updateReqObj("description", e.currentTarget.value);
                      }}
                      placeholder={placeHolder[title]}
                      className="w-full rounded-lg bg-white text-grey-darker h-24 p-4 mb-5"
                    />
                  </div>
                  <div className="wish-input-block my-12 text-right">
                    <button type="submit" className="cta-red-button mr-4">
                      Quick Result
                    </button>
                    {/* <button type="submit" className="secondary-cta mr-4">
                                            Quick Result
                                        </button> */}
                    {/* <button onClick={submitUserRequest} className="cta-red-button">
                                            Make a Wish &#x2192;
                                        </button> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={promptLogin}
        onClose={() => setPromptLogin(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Login to Continue</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You need to be logged in to continue
          </DialogContentText>
          <Suspense fallback={<div>Please wait...</div>}>
            <SigninComponent
              onSuccess={sendUserRequestFinal}
              closeModal={() => {
                setPromptLogin(false);
                setMessageInfo(
                  "Processing your request. Please do not close this window."
                );
              }}
            />
          </Suspense>
          <div className="p-4 text-center">
            <p>-OR-</p>
            <button
              className="secondary-cta block"
              onClick={(e) => {
                setPromptLogin(false);
                handleSubmitClick(e);
              }}
            >
              View Quick Result
            </button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={Boolean(messageInfo)}
        onClose={() => {
          isDialogCancellable && (setMessageInfo(null) || setResultDetails([]));
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="p-6 shadow z-1">
          {messageInfo}
          {/* {messageInfo === 'WishGee Result'} */}
        </div>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-description"> */}
          {resultDetails.length > 0 ? (
            resultDetails.map((res) => (
              <div
                className="results-section"
                key={res?.product_link}
                style={{ minHeight: res?.result && "200px" }}
              >
                <>
                  {res?.keywords?.length > 0 &&
                    `Features match: ${res?.keywords?.length} / ${reqObj?.keywords?.length}`}
                  <Paper component="ul" className={classes.root}>
                    {reqObj.keywords?.map((data) => {
                      return (
                        <li key={data}>
                          <Chip
                            label={data}
                            color={
                              res?.keywords?.includes(data.toLowerCase())
                                ? "secondary"
                                : "default"
                            }
                            className={classes.chip}
                            disabled={
                              !res?.keywords?.includes(data.toLowerCase()) &&
                              true
                            }
                          />
                        </li>
                      );
                    })}
                  </Paper>
                  <Suspense fallback={<div>Please wait...</div>}>
                    <DashProductCard wishData={res} primaryCTA={false} />
                  </Suspense>
                </>
              </div>
            ))
          ) : (
            <div className="no-result-div">
              Seems like we do not have any existing result for this request.{" "}
              <p>Let our experts do the research for you.</p>
              <div className="wish-input-block my-2 text-right">
                <button
                  onClick={submitUserRequest}
                  disabled
                  type="submit"
                  className="cta-red-button"
                >
                  Make a wish
                </button>
              </div>
            </div>
          )}

          {/* </DialogContentText> */}
        </DialogContent>
        {/* <DialogActions> */}
        <div className="submit-request-div shadow-up">
          {resultDetails && resultDetails.length > 0 && (
            <>
              <div className="text-orange text-xs text-left ">
                *this result is based on previous similar requests. For more
                accurate result, request product experts for recommendation.
              </div>
              -OR-
              <div className="text-red" autoFocus>
                {!userDetail.email || userDetail.emailVerified ? (
                  <p
                    className="secondary-cta cursor-pointer"
                    disabled
                    onClick={submitUserRequest}
                  >
                    Request product experts for recommendation.
                  </p>
                ) : (
                  <p
                    className="text-underline cursor-pointer"
                    onClick={sendVerificationMail}
                  >
                    Verify your email for expert's recommendation.
                  </p>
                )}
              </div>
            </>
          )}
        </div>
        {/* </DialogActions> */}
      </Dialog>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={emailSent}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={"verification email sent to " + userDetail.email}
      />
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={keywordsExceeded}
        message={"Please select any 3 features."}
      />
    </>
  );
}
