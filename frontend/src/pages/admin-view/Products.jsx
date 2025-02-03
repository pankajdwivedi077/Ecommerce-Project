import ProductImageUpload from "@/components/admin-view/Image-upload";
import CommonForm from "@/components/common/Form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { addNewProduct, fetchAllProducts } from "@/store/admin/productSlice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
    image: null,
    title: '',
    description: '',
    category: '',
    brand: '',
    price: '',
    salePrice: '',
    totalStock: ''
}

function AdminProducts(){

    const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false)
    const [formData, setFormData] = useState(initialFormData)
    const [imageFile, setImageFile] = useState(null)
    const [uploadImageUrl, setUploadImageUrl] = useState('')
    const [imageLoadingState, setImageLoadingState] = useState(false);

    const { toast } = useToast();

    const dispatch = useDispatch()
    const { productList } = useSelector(state => state.adminProduct)

    function onSubmit(e){
      e.preventDefault();
      dispatch(addNewProduct({
        ...formData,
        image: uploadImageUrl
      })).then((data) => {
        console.log(data)
        if (data?.payload?.success){
          dispatch(fetchAllProducts())
          setOpenCreateProductsDialog(false)
          setImageFile(null);
          setFormData(initialFormData)
          toast({
            title: 'Product add successfully'
          })
        }
      })
    }

    useEffect(() => {
      dispatch(fetchAllProducts())
    }, [dispatch])

    console.log(productList, uploadImageUrl)

    return <Fragment>
        <div className="mb-5 w-full flex justify-end">
            <Button onClick={() => setOpenCreateProductsDialog(true)} >Add new Product</Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"> </div>
        <Sheet open={openCreateProductsDialog}  onOpenChange={() => {
            setOpenCreateProductsDialog(false)}
        }>
            <SheetContent side="right" className="overflow-auto" >
              <SheetHeader>
                <SheetTitle>Add new Product</SheetTitle>
              </SheetHeader>
              <ProductImageUpload 
               imageFile={imageFile}
               setImageFile={setImageFile}
               uploadImageUrl={uploadImageUrl}
               setUploadImageUrl={setUploadImageUrl}
               imageLoadingState={imageLoadingState}
               setImageLoadingState={setImageLoadingState}
              />
              <div className="py-6">
                <CommonForm 
                formData={formData}
                setFormData={setFormData}
                buttonText={'Add'}
                onSubmit={onSubmit}
                formContrls={addProductFormElements} />
              </div>
            </SheetContent>
        </Sheet>
    </Fragment>
}

export default AdminProducts;