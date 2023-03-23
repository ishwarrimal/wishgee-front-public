import React, { useState, useEffect} from 'react';
import { getProductList } from 'APIHelper';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ProductCard from 'Components/common/productCard';
import './style.scss';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const ProductList = () => {
    const classes = useStyles();
    const [product, setProduct] = useState(null)
    const [errorMsg, setErrorMsg] = useState();
    const [page, setPage] = useState(1)
    const [sortBy, setSortBy] = useState('date');
    const [itemList, setItemList] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        const urlParams = new URLSearchParams(window.location.search);
        const product = urlParams.get('product');
        setProduct(product);
    },[])

    useEffect(() => {
        if(!product){
            return
        }
        getProductList(product, page).then(list => {
            if(list.errorMsg){
                setErrorMsg(list.errorMsg);
                return;
            }
            setItemList(list);
        })
    },[page, product])

    useEffect(() => {
        const items = [...itemList];
        if(sortBy === 'price'){
            items.sort((it1, it2) => it1.product_price - it2.product_price);
        }else{
            items.sort((it1, it2) => it1.updated.localeCompare(it2.updated));
        }
        setItemList(items);
    },[sortBy])

    const handleSortChange = (event) => {
        console.log(event.target.value)
        setSortBy(event.target.value)
    }

    return (
        <div className="products-container mt-16">
            <div className="flex justify-between">
            <p>Genie's recommendations.</p>
            <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel>Sort</InputLabel>
                <Select
                value={sortBy}
                displayEmpty
                onChange={handleSortChange}
                label="Sort"
                inputProps={{ 'aria-label': 'Without label' }}
                >
                <MenuItem value="price">Price</MenuItem>
                <MenuItem value="date">Date</MenuItem>
                </Select>
            </FormControl>
            </div>
            <div className="flex flex-wrap product-list-container">
            {
                itemList?.map(item => (
                    <ProductCard result={item} key={item.id} customStyle={{marginTop: "20px"}}/>
                ))
            }
            </div>

            <Dialog
                    open={errorMsg}
                    aria-labelledby="alert-dialog-title"
                    onClose={() => {setErrorMsg(null)}}
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">WishGee</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {errorMsg}
                        </DialogContentText>
                    </DialogContent>
            </Dialog>
        </div>
    )
}
export default ProductList;