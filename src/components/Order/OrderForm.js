import React from "react";
import { ButtonGroup, Button as MuiButton, Grid, InputAdornment, makeStyles } from "@material-ui/core";
import Form from '../../layouts/Form'
import { Input, Select, Button } from '../../controls';
import ReplayIcon from '@material-ui/icons/Replay';
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import ReorderIcon from "@material-ui/icons/Reorder";

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

    const { values, errors, handleInputChange } = props;
    const classes = useStyles();

    return (
        <Form>
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
                        onChagen={handleInputChange}
                        options={[
                            { id: 0, title: 'Select' },
                            { id: 1, title: 'Customer 1' },
                            { id: 2, title: 'Customer 2' },
                        ]} />
                </Grid>
                <Grid item xs={6}>
                    <Select
                        label='Payment Method'
                        name='pMethod'
                        onChagen={handleInputChange}
                        value={values.pMethod}
                        options={pMethods} />
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
                        <MuiButton size="small" startIcon={<ReplayIcon/>}/>
                    </ButtonGroup>
                    <Button
                        size='large'
                        startIcon={<ReorderIcon/>}
                    >
                        Orders
                    </Button>
                </Grid>
            </Grid>
        </Form>
    )
}