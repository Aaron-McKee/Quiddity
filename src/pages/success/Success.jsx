import React, { useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import newRequest from '../../utils/newRequest';

const Success = function() {

const { search } = useLocation();
const navigate = useNavigate();
const params = new URLSearchParams(search);
const payment_intent = params.get("payment_intent");

useEffect(() => {
    const makeRequest = async function() {
        try {
            await newRequest.put("/orders", {payment_intent});
            setTimeout (() => {
                navigate("/orders");
            },5000)
        }
        catch(err){
            console.log(err)
        }
    };
    makeRequest();
},[])

    return (

        <div>Payment successful. You are being redirected to the orders page.
            Please do no close the browser.
        </div>
    )
};

export default Success;