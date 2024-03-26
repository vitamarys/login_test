import { Outlet, Navigate } from "react-router-dom" 
type TProps = {
    isAuthenticated?: boolean,
    redirectPath?: string
}

export const PrivateRoutes:React.FC<TProps> = ({isAuthenticated, redirectPath = '/'}) => {
    return isAuthenticated ? <Outlet/> : <Navigate to={redirectPath}/>
 };