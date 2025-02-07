import { useEffect, useState } from "react";
import CommonForm from "../common/Form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { addNewAddress, fetchAllAddress } from "@/store/shop/addressSlice";
import AddressCard from "./AddressCard";

const initialAddressFormData = {
  address: '',
  city: '',
  phone: '',
  pincode: '',
  notes: ''
}

function Address(){

    const [formData, setFormData] = useState(initialAddressFormData)

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { addressList } = useSelector((state) => state.address);

    function handleManageAddress(e){
      e.preventDefault();
      dispatch(addNewAddress({
        ...formData,
        userId: user?.id
      })).then((data) => {
        console.log(data);
        if(data.payload?.success) {
          dispatch(fetchAllAddress(user?.id))
          setFormData(initialAddressFormData)
        }
      })
    }

    function isFormValid(){
      return Object.keys(formData).map((key) => formData[key] !== '').every((item) => item)
    }

    useEffect(() => {
        dispatch(fetchAllAddress(user?.id))
    }, [dispatch])

    console.log(addressList, "addressList")

    return <Card>
        <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
         {
            addressList && addressList.length > 0 ?
            addressList.map((singleAddressItem) => <AddressCard addressInfo={singleAddressItem}  /> ) : null
         }
        </div>
        <CardHeader>
            <CardTitle>Add new Adderess</CardTitle>
            <CardContent className="space-y-3">
                <CommonForm 
                 formContrls={addressFormControls}
                 formData={formData}
                 setFormData={setFormData}
                 buttonText={'Add'}
                 onSubmit={handleManageAddress}
                 isBtnDisabled={!isFormValid()}
                />
            </CardContent>
        </CardHeader>
    </Card>
}

export default Address;