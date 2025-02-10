import { useEffect, useState } from "react";
import CommonForm from "../common/Form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editAddress,
  fetchAllAddress,
} from "@/store/shop/addressSlice";
import AddressCard from "./AddressCard";
import { useToast } from "@/hooks/use-toast";


const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

function Address({ setCurrentSelectedAddress }) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.address);
 
  const { toast } = useToast()

  function handleManageAddress(e) {
    e.preventDefault();

    if(addressList.length >= 3 && currentEditedId === null ){
      setFormData(initialAddressFormData)
      toast({
        title: 'You can address maximum 6 address',
        variant: 'destructive'
      })
      return ;
    }
    
    currentEditedId !== null ? dispatch(editAddress({ userId: user?.id, addressId: currentEditedId, formData })).then((data) => {
      if(data.payload?.success){
        dispatch(fetchAllAddress(user?.id));
        setCurrentEditedId(null)
        setFormData(initialAddressFormData)
        toast({
          title: 'Address updated successfully'
        })
      }
    }) : 

    dispatch(
      addNewAddress({
        ...formData,
        userId: user?.id,
      })
    ).then((data) => {
      console.log(data);
      if (data.payload?.success) {
        dispatch(fetchAllAddress(user?.id));
        setFormData(initialAddressFormData);
        toast({
          title: 'Address added successfully'
        })
      }
    });

  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  function handleDeleteAddress(getCurrentAddress) {
    console.log(getCurrentAddress);
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress?._id })
    ).then((data) => {
      if (data.payload?.success) {
        dispatch(fetchAllAddress(user?.id));
        toast({
          title: 'Address deleted successfully'
        })
      }
    });
  }

  function handleEditAddress(getCurrentAddress){
    setCurrentEditedId(getCurrentAddress?._id)
    setFormData({
      ...formData,
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      phone: getCurrentAddress?.phone,
      pincode: getCurrentAddress?.pincode,
      notes: getCurrentAddress?.notes,
    })
  }

  useEffect(() => {
    dispatch(fetchAllAddress(user?.id));
  }, [dispatch]);

  console.log(addressList, "addressList");

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((singleAddressItem) => (
              <AddressCard
                handleDeleteAddress={handleDeleteAddress}
                addressInfo={singleAddressItem}
                handleEditAddress={handleEditAddress}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>{currentEditedId !== null ? 'Edit Address' : 'Add new Adderess'}</CardTitle>
        <CardContent className="space-y-3">
          <CommonForm
            formContrls={addressFormControls}
            formData={formData}
            setFormData={setFormData}
            buttonText={currentEditedId !== null ? 'Edit Address' : 'Add new Adderess'}
            onSubmit={handleManageAddress}
            isBtnDisabled={!isFormValid()}
          />
        </CardContent>
      </CardHeader>
    </Card>
  );
}

export default Address;
