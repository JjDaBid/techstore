import AdminNav from "../components/admin/AdminNav"

export const metadata = {
    title: 'Administración de la tienda virtual',
    description: 'Tablero de control de la tienda virtual'
}

const AdminLayout = ({children} : {children: React.ReactNode}) => {
  return (
    <div>
        <AdminNav/>
        {children}
    </div>
  )
}
export default AdminLayout
