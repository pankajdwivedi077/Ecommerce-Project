import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AdminOrdersListView from "./OrderDetails";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrderForAdmin, getOrderDetailsForAdmin, resetOrderDetail } from "@/store/admin/orderSlice";
import { Badge } from "../ui/badge";

function AdminOrders(){

    const [openDetailsDialog ,setOpenDetailsDialog] = useState(false)

    const { orderList , orderDetails } = useSelector((state) => state.adminOrder)
    const dispatch = useDispatch()

    function handleFetchOrderDetails(getId){
       dispatch(getOrderDetailsForAdmin(getId))
    }
    
    useEffect(() => {
      dispatch(getAllOrderForAdmin())
    }, [dispatch])

    useEffect(() => {
      if (orderDetails !== null) setOpenDetailsDialog(true)
    }, [orderDetails])

    console.log(orderDetails, "kist")

    return <Card >
    <CardHeader>
        <CardTitle>All Orders</CardTitle>
    </CardHeader>
         <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left">Order Id</TableHead>
                  <TableHead className="text-left">Order Date</TableHead>
                  <TableHead className="text-left">Order Status</TableHead>
                  <TableHead className="text-right">Order Price</TableHead>
                  <TableHead className="text-center">
                    <span className="sr-only">Details</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
              {orderList && orderList.length > 0
              ? orderList.map((orderItem) => (
                  <TableRow>
                    <TableCell className="text-left">
                      {orderItem?._id}
                    </TableCell>
                    <TableCell className="text-left">
                      {orderItem?.orderDate.split("T")[0]}
                    </TableCell>
                    <TableCell className="text-left">
                      <Badge
                        className={`py-1 px-3 ${
                          orderItem?.orderStatus === "confirmed"
                          ? "bg-green-500"
                          : orderItem?.orderStatus === "delivered"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                      >
                        {orderItem?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      ${orderItem?.totalAmount}
                    </TableCell>
                    <TableCell className="text-center">
                      <Dialog open={openDetailsDialog} 
                         onOpenChange={()=> {
                          setOpenDetailsDialog(false)
                          dispatch(resetOrderDetail())
                         }}
                         >
                        <Button
                          onClick={() =>
                            handleFetchOrderDetails(orderItem?._id)
                          }
                        >
                          View Details
                        </Button>
                        <AdminOrdersListView 
                          orderDetails={orderDetails}
                        />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
              </TableBody>
            </Table>
          </CardContent>
</Card>
}

export default AdminOrders;