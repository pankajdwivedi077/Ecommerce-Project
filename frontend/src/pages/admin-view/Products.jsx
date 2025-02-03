import ProductImageUpload from "@/components/admin-view/Image-upload";
import AdminProductTitle from "@/components/admin-view/Product-tile";
import CommonForm from "@/components/common/Form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { addNewProduct, deleteProduct, edditProduct, fetchAllProducts } from "@/store/admin/productSlice";
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
    const [currentEditedId, setCurrentEditedId] = useState(null)

    const { toast } = useToast();

    const dispatch = useDispatch()
    const { productList } = useSelector(state => state.adminProduct)

    function onSubmit(e){
      e.preventDefault();
      currentEditedId !== null
       ? 
        dispatch(edditProduct({
          id: currentEditedId ,
          formData
        })).then((data) => {
          console.log(data, "edit")
          console.log("Editing product with ID:", currentEditedId);
          if(data?.payload?.success) {
            dispatch(fetchAllProducts())
            setFormData(initialFormData)
            setOpenCreateProductsDialog(false)
            setCurrentEditedId(null)
          }
        })
      :
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

    function handleDelete(getCurrentProductId){
      console.log(getCurrentProductId)
      dispatch(deleteProduct(getCurrentProductId)).then((data) => {
        console.log("Delete API Response:", data);
        if(data?.payload?.success) {
          dispatch(fetchAllProducts())
        }
      })
    
     
    }

    function isFormValidate(){
      return Object.keys(formData).map(key => formData[key] !== '').every(item => item)
    }

    useEffect(() => {
      dispatch(fetchAllProducts())
    }, [dispatch])

    console.log(formData)

    return <Fragment>
        <div className="mb-5 w-full flex justify-end">
            <Button onClick={() => setOpenCreateProductsDialog(true)} >Add new Product</Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
             {
              productList && productList.length > 0 ?
              productList.map((productItem) => <AdminProductTitle setFormData={setFormData} setOpenCreateProductsDialog={setOpenCreateProductsDialog} setCurrentEditedId={setCurrentEditedId} product={productItem} handleDelete={handleDelete} /> ) : null
             }
           </div>
        <Sheet open={openCreateProductsDialog}  onOpenChange={() => {
            setOpenCreateProductsDialog(false)
            setCurrentEditedId(null)
            setFormData(initialFormData)
          }
        }>
            <SheetContent side="right" className="overflow-auto" >
              <SheetHeader>
                <SheetTitle>
                  {
                    currentEditedId !== null ? 'Edit Product' : 'Add new Product'
                  }
                </SheetTitle>
              </SheetHeader>
              <ProductImageUpload 
               imageFile={imageFile}
               setImageFile={setImageFile}
               uploadImageUrl={uploadImageUrl}
               setUploadImageUrl={setUploadImageUrl}
               imageLoadingState={imageLoadingState}
               setImageLoadingState={setImageLoadingState}
               isEditMode={currentEditedId !== null}
              />
              <div className="py-6">
                <CommonForm 
                formData={formData}
                setFormData={setFormData}
                buttonText={currentEditedId !== null ? 'Edit' : 'Add'}
                onSubmit={onSubmit}
                isBtnDisabled={!isFormValidate()}
                formContrls={addProductFormElements} />
              </div>
            </SheetContent>
        </Sheet>
    </Fragment>
}

export default AdminProducts;