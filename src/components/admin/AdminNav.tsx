// AdminNav.tsx
import { Link, useLocation } from "react-router-dom";
import Container from "../Container";
import AdminNavItem from "./AdminNavItem";
import { MdDashboard, MdDns, MdFormatListBulleted, MdLibraryAdd } from "react-icons/md";


const AdminNav = () => {
    const { pathname } = useLocation();    

    return (
        <div className="w-full shadow-sm top-20 border-b-[1px] pt-4">
            <Container>
                <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">                    
                    <Link to="/admin">
                        <AdminNavItem label="Resumen" icon={MdDashboard} selected={pathname === '/admin'} />
                    </Link>
                    <Link to="/admin/add-products">
                        <AdminNavItem label="Agregar Producto" icon={MdLibraryAdd} selected={pathname.includes('/admin/add-products')} />
                    </Link>
                    <Link to="/admin/manage-products">
                        <AdminNavItem label="Administrar Producto" icon={MdDns} selected={pathname === '/admin/manage-products'} />
                    </Link>
                    <Link to="/admin/manage-orders">
                        <AdminNavItem label="Administrar Ordenes" icon={MdFormatListBulleted} selected={pathname === '/admin/manage-orders'} />
                    </Link>
                </div>                
            </Container>
            
        </div>
    );
};

export default AdminNav;
