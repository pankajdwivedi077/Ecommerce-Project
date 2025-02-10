import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/orderSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

function PaypalReturnPage(){

    const dispacth = useDispatch();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    // const paymentId = params.get('paymentId');
    const payerId = params.get('PayerID')

    useEffect(() => {
      if(payerId){
        const getCurrentOrderId = JSON.parse(sessionStorage.getItem('currentOrderId'));
        dispacth(capturePayment({ payerId, orderId: getCurrentOrderId })).then((data) => {
            if(data?.payload.success){
                sessionStorage.removeItem('currentOrderId')
                window.location.href = '/shop/payment-success'
            }
        })
      }
    }, [payerId, dispacth])

    return <Card>
        <CardHeader>
            <CardTitle>Processing Payment please wait</CardTitle>
        </CardHeader>
    </Card>
}

export default PaypalReturnPage;