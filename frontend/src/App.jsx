import { Route, Routes } from 'react-router-dom'
import './App.css'
// import AuthLayout from './components/auth/layout'
import AuthLayout from './components/auth/Layout'
import AuthLogin from './pages/auth/Login'
import AuthRegister from './pages/auth/Register'
import AdminLayout from './components/admin-view/Layout'
import AdminDashBoard from './pages/admin-view/DashBoard'
import AdminFeatures from './pages/admin-view/Features'
import AdminProducts from './pages/admin-view/Products'
import AdminOrders from './pages/admin-view/Orders'
import ShoppingLayout from './components/shopping-view/Layout'
import NotFound from './pages/not-found/Index'
import ShoppingHome from './pages/shopping-view/Home'
import ShoppingListing from './pages/shopping-view/Listing'
import ShoppingCheckout from './pages/shopping-view/Checkout'
import ShoppingAccount from './pages/shopping-view/Account'
import CheckAuth from './components/common/CheckAuth'
import UnAuthPage from './pages/unauth-page/UnAuthPage'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuth } from './store/authSlice'
import { Skeleton } from "@/components/ui/skeleton"
import PaypalReturnPage from './pages/shopping-view/PaypalReturn'
import PaymentSuccessPage from './pages/shopping-view/PaymentSuccess'
import SearchProducts from './pages/shopping-view/Search'

 
function App() {

  const { isAuthenticated, user, isLoading } = useSelector(state => state.auth);
  const dispacth = useDispatch();

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem('token'))
    dispacth(checkAuth(token))
  }, [dispacth])

  if (isLoading) return <Skeleton className="w-[600px] h-[600px]" />


  return (
    <>
     <div className='flex flex-col overflow-hidden bg-white'>
      {/* Commom Components */}
      {/* <h1>Header component</h1> */}
      <Routes>
        <Route path='/' element={
          // <CheckAuth isAuthenticated={isAuthenticated} user={user} >
          // </CheckAuth>
          <ShoppingListing />
        } />
        <Route path='/auth' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user} >
            <AuthLayout />
          </CheckAuth>
        } >
         <Route path='login' element={<AuthLogin />} />
         <Route path='register' element={<AuthRegister />} />
        </Route>

        <Route path='/admin' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }>
           <Route path='dashboard' element={<AdminDashBoard />} />
           <Route path='features' element={<AdminFeatures />} />
           <Route path='products' element={<AdminProducts />} />
           <Route path='orders' element={<AdminOrders />} />
        </Route>

        <Route path='/shop' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user} >
            <ShoppingLayout />
          </CheckAuth>
        }>
            <Route path='home' element={<ShoppingHome />} />
            <Route path='listing' element={<ShoppingListing />} />
            <Route path='checkout' element={<ShoppingCheckout />} />
            <Route path='account' element={<ShoppingAccount />} />
            <Route path='paypal-return' element={<PaypalReturnPage />} />
            <Route path='payment-success' element={<PaymentSuccessPage />} />
            <Route path='search' element={<SearchProducts />} />
        </Route>

        <Route path='*' element={<NotFound />} />

        <Route path='/unauthPage' element={<UnAuthPage />}/>

      </Routes>
     </div>
    </>
  )
}

export default App
