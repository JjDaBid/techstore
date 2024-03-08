import { Link } from 'react-router-dom';
import Container from "../Container"
import FooterList from "./FooterList"
import { MdFacebook } from 'react-icons/md';
import { AiFillInstagram, AiFillTwitterCircle, AiFillYoutube } from 'react-icons/ai';

const Footer = () => {
  return (
    <footer className="bg-slate-700 text-slate-200 text-sm mt-16">

        <Container>
            <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
                <FooterList>
                    <h3 className="text-base font-bold mb-2">Categorías</h3>
                    <Link to="#">Smartphones</Link>
                    <Link to="#">Portátiles</Link>
                    <Link to="#">Smartwatches</Link>
                    <Link to="#">accesorios</Link>
                </FooterList>
                <FooterList>
                    <h3 className="text-base font-bold mb-2">Servicio al Cliente</h3>
                    <Link to="#">Contactanos</Link>
                    <Link to="#">Políticas de envío</Link>
                    <Link to="#">Cambios y devoluciones</Link>
                    <Link to="#">FAQs</Link>
                </FooterList>
                <div className='w-full md:w-1/3 mb-6 md:mb-0'>
                    <h3 className="text-base font-bold mb-2">Acerca de Nosotros</h3>
                    <p>En nuestra tienda electrónica, estamos dedicados a proporcionar los dispositivos y accesorios más recientes y avanzados a nuestros clientes. Con una amplia selección de teléfonos, televisores, laptops, relojes y accesorios.</p>
                    <p>&copy; {new Date().getFullYear()} TechStore. Todos los drechos reservados</p>
                </div>
                
                
                <FooterList>
                    <h3 className="text-base font-bold mb-2">Síguenos en nuestras redes</h3>
                        <div className='flex gap-2'>
                            <Link to="#"> <MdFacebook size={24}/> </Link>
                            <Link to="#"> <AiFillTwitterCircle size={24}/> </Link>
                            <Link to="#"> <AiFillYoutube size={24}/> </Link>
                            <Link to="#"> <AiFillInstagram size={24}/> </Link>
                        </div>
                    
                </FooterList>
            </div>
        </Container>    
    </footer>
  )
}
export default Footer
