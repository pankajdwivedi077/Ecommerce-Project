import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }){

  const location = useLocation();

  if(location.pathname === '/'){
    if(!isAuthenticated){
      return <Navigate to="/shop/home" />
    }else{
      if(user?.role === 'admin'){
        return <Navigate to="/admin/dashboard" />
    }else{
        return <Navigate to="/shop/home" />
    }
    }
  }

  if (!isAuthenticated && !(location.pathname.includes("/login") || 
                location.pathname.includes("/register")) ) {
    return <Navigate to="/auth/login" />
  } 

  if (isAuthenticated && (location.pathname.includes("/login") || location.pathname.includes("/register"))){
    if(user?.role === 'admin'){
        return <Navigate to="/admin/dashboard" />
    }else{
        return <Navigate to="/shop/home" />
    }
  }

  if(isAuthenticated && user?.role !== 'admin' && location.pathname.includes("/admin")){
    return <Navigate to="/unauthPage" />
  }

  if(isAuthenticated && user?.role === 'admin' && location.pathname.includes("/shop") ){
    return <Navigate to="/admin/dashboard" />
  }

  return (
    <>
     {children}
    </>
  )
}

export default CheckAuth;