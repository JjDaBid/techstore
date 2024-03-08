import Container from "../../components/Container"
import FormWrap from "../../components/FormWrap"
import AdminNav from "../../components/admin/AdminNav"
import AddProductForm from "./AddProductForm"

const AddProducts = () => {
  
  return (
    <>
        <AdminNav/>        
        <div>
          <Container>
              <FormWrap>
                <AddProductForm/>
              </FormWrap>
          </Container>
        </div>
    </>
  )
}
export default AddProducts

