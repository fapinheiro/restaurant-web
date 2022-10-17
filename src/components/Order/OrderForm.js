import React, { useEffect, useState} from "react";
import { ButtonGroup, Button as MuiButton, Grid, InputAdornment, makeStyles } from "@material-ui/core";
import Form from '../../layouts/Form'
import { Input, Select, Button } from '../../controls';
import ReplayIcon from '@material-ui/icons/Replay';
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import ReorderIcon from "@material-ui/icons/Reorder";
import { createAPIEndpoint, ENDPOINTS } from '../../api';
import { roundTo2DecimalPoint } from '../../utils';
import OrderList from "./OrderList";
import Popup from "../../layouts/Popup";
import Notification from '../../layouts/Notification'

const pMethods = [
    { id: 'none', title: 'Select' },
    { id: 'Cash', title: 'Cash' },
    { id: 'Card', title: 'Card' },
];

const useStyles = makeStyles(theme => ({
    adornmentText: {
        '& .MuiTypography-root': {
            color: '#f3b33d',
            fontWeight: 'bolder',
            fontSize: '1.5em'
        }
    },
    submitButtonGroup: {
        backgroundColor: '#f3b33d',
        color: '#000',
        margin: theme.spacing(1),
        '& .MuiButton-label': {
            textTransform: 'none'
        },
        '&:hover': {
            backgroundColor: '#f3b33d',
        }
    }
}));

export default function OrderForm(props) {

    const { values, setValues, errors, setErrors, handleInputChange, resetFormControls } = props;

    const classes = useStyles();

    const [customerList, setCustomerList] = useState([]);
    const [orderListVisibility, setOrderListVisibility] = useState(false);
    const [orderId, setOrderId] = useState(0);
    const [notify, setNotify] = useState({isOpen: false});

    // Effect is useful for managing lifecycle
    // Alternative to class method DidMount()
    // useEffect explanation
    // const {x, setX} = useState();
    // useEffect( ()=> {},x); // Every time variable x is set, the useEffect function calls a callback funciont
    
    useEffect(
        () => {
            createAPIEndpoint(ENDPOINTS.CUSTOMER)
                .fetchAll()
                .then(res => {
                    let customerList = res.data.map(item => ({
                        id: item.customerId,
                        title: item.customerName
                    }));
                    customerList = [{id: 0, title: 'Select'}].concat(customerList);
                    setCustomerList(customerList);
                })
                .catch(err => console.log(err));
        },
        []
    );

    useEffect(
        () => {
            let gTotal = values.orderDetails.reduce((tempTotal, item) => {
                return tempTotal + (item.quantity * item.foodItemPrice);
            }, 0);
            setValues({
                ...values, 
                gTotal: roundTo2DecimalPoint(gTotal)
            });
        },
        [JSON.stringify(values.orderDetails)]
    );

    const validateForm = () => {
        let temp = {};
        temp.customerId = values.customerId !== 0 ? "" : "This field is required";
        temp.pMethod = values.pMethod !== 'none' ? "" : "This field is required";
        temp.orderDetails = values.orderDetails.length !== 0 ? "": "This field is required";
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x === "");
    }

    const submitOrder = e => {
        e.preventDefault();
        if (validateForm()) {
            if (values.orderMasterId === 0) {
                createAPIEndpoint(ENDPOINTS.ORDER).create(values)
                .then(res => {
                    resetFormControls();
                    setNotify({isOpen: true, message: 'New order is created.'})
                })
                .catch(err => {
                    console.log(err);
                })
            } 
            else {
                createAPIEndpoint(ENDPOINTS.ORDER).update(values.orderMasterId, values)
                .then(res => {
                    setOrderId(0);
                    setNotify({isOpen: true, message: 'The order was updated.'})
                })
                .catch(err => {
                    console.log(err);
                })
            }
        }
    }

    const openListOfOrders = () => {
        setOrderListVisibility(true)
    }

    useEffect(
        () => {
            if (orderId === 0) {
                resetFormControls();
            } else {
                createAPIEndpoint(ENDPOINTS.ORDER)
                .fetchById(orderId)
                .then(res => {
                    setValues(res.data);
                    setErrors({});
                })
                .catch(err => {
                    console.log(err);
                })
            }
        },
        [orderId]
    );

    const resetForm = () => {
        resetFormControls();
        setOrderId(0);
    }

    return (
        <>
            <Form onSubmit={submitOrder}>
                <Grid container>
                    <Grid item xs={6}>
                        <Input label='Order Number' name='orderNumber'
                            value={values.orderNumber} 
                            InputProps = {
                                {
                                    startAdornment: <InputAdornment position="start"
                                        className={classes.adornmentText}>#
                                    </InputAdornment>
                                }
                            }
                            disabled />
                        <Select
                            label='Customer'
                            name='customerId'
                            value={values.customerId}
                            onChange={handleInputChange}
                            options={customerList} 
                            error={errors.customerId}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Select
                            label='Payment Method'
                            name='pMethod'
                            onChange={handleInputChange}
                            value={values.pMethod}
                            options={pMethods} 
                            error={errors.pMethod}/>
                        <Input label='Grand Total' name='gTotal' 
                            value={values.gTotal} 
                            InputProps = {
                                {
                                    startAdornment: <InputAdornment position="start" 
                                        className={classes.adornmentText}>$
                                    </InputAdornment>
                                }
                            }
                            disabled />
                        <ButtonGroup className={classes.submitButtonGroup}>
                            <MuiButton size="large" type="submit" endIcon={<RestaurantMenuIcon/>}>Submit</MuiButton>
                            <MuiButton size="small" 
                                startIcon={<ReplayIcon/>}
                                onClick={resetForm}/>
                        </ButtonGroup>
                        <Button
                            size='large'
                            startIcon={<ReorderIcon/>}
                            onClick={openListOfOrders}>
                            Orders
                        </Button>
                    </Grid>
                </Grid>
            </Form>
            <Popup title='List of Orders' openPopup={orderListVisibility} setOpenPopup={setOrderListVisibility}>
                <OrderList orderId={orderId} setOrderId={setOrderId} setOrderListVisibility={setOrderListVisibility} resetFormControls={resetFormControls} setNotify={setNotify}/>
            </Popup>
            <Notification notify={notify} setNotify={setNotify}/>
        </>
    )
}