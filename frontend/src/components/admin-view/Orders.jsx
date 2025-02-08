import { useState } from "react";
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

function AdminOrders(){

    const [openDetailsDialog ,setOpenDetailsDialog] = useState(false)

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
                <TableRow>
                  <TableCell className="text-left">123456</TableCell>
                  <TableCell className="text-left">20-9-1999</TableCell>
                  <TableCell className="text-left">In Process</TableCell>
                  <TableCell className="text-right">$ Price</TableCell>
                  <TableCell className="text-center">
                    <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog} >
                    <Button onClick={() => setOpenDetailsDialog(true)} >View Details</Button>
                       <AdminOrdersListView />
                    </Dialog>
                  
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
</Card>
}

export default AdminOrders;