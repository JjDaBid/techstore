import Container from "../components/Container"
import Heading from "../components/Heading"
import AdminListProducts from "../components/admin/AdminListProducts"
import AdminNav from "../components/admin/AdminNav"

const Admin = () => {
  return (
    <div>
      <AdminNav/>
        <div className="p-8">
          <Container>
          <Heading title="Resumen de Productos" center/>
          <div className="p-8">
            <AdminListProducts/>
          </div>
          </Container>
        </div>

    </div>
  )
}
export default Admin
