/* eslint-disable @typescript-eslint/no-explicit-any */
import Container from '../../components/Container'
import HommeBanner from '../../components/nav/HommeBanner'
import ProductCard from '../../components/products/ProductCard'
import { products } from '../../utils/products' 


const Home = () => {
  return (
    <div className="p-8">
      <Container>
        <HommeBanner/>  
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
          {products.map((product: any, index: number) => (
            <ProductCard key={index} data={product} />
          ))}
        </div>
      </Container>
    </div>
  )
}
export default Home



