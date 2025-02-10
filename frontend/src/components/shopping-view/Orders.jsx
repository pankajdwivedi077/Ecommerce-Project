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
import ShoppingOrderDetailsView from "./OrderDetails";
import { useDispatch, useSelector } from "react-redux";
import { getAllorderByUserId, getOrderDetails, resetOrderDetails } from "@/store/shop/orderSlice";
import { Badge } from "../ui/badge";

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetails(getId));
  }

  useEffect(() => {
    dispatch(getAllorderByUserId(user?.id));
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (orderDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [orderDetails]);

  console.log(orderDetails, "det");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
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
                            : "bg-red-500"
                        } `}
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
                          dispatch(resetOrderDetails())
                         }}
                         >
                        <Button
                          onClick={() =>
                            handleFetchOrderDetails(orderItem?._id)
                          }
                        >
                          View Details
                        </Button>
                        <ShoppingOrderDetailsView 
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
  );
}

export default ShoppingOrders;
