import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

function ShoppingOrderDetailsView(){
   return (
    <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto" >
    <div className="grid gap-6">
        <div className="grid gap-2">
            <div className="flex mt-6 items-center justify-between">
                <p className="font-medium">Order Id</p>
                <Label>123456</Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
                <p className="font-medium">Order Date</p>
                <Label>20/2/2222</Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
                <p className="font-medium">Order price</p>
                <Label>$500</Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
                <p className="font-medium">Order Status</p>
                <Label>In process</Label>
            </div>
        </div>
        <Separator/>
        <div className="grid gap-4">
            <div className="grid gap-2">
                <div className="font-medium">Order details</div>
                <ul className="grid gap-3 ">
                    <li className="flex items-center justify-between">
                        <span>product One</span>
                        <span>$100</span>
                    </li>
                </ul>
            </div>
        </div>
        <div className="grid gap-4">
            <div className="grid gap-2">
                <div className="font-medium">Shipping Info</div>
                <div className="grid gap-0.5 text-muted-foreground">
                    <span>Joe doe</span>
                    <span>Address</span>
                    <span>City</span>
                    <span>Pincode</span>
                    <span>Phone</span>
                    <span>Notes</span>
                </div>
            </div>
        </div>
       
    </div>
</DialogContent>
   )
}

export default ShoppingOrderDetailsView;