import { Link } from 'react-router-dom';
import Container from "../Container";
import CartCount from './CartCount';
import Categories from './Categories';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';

const Navbar = () => {
  return (
    <div className="
      sticky
      top-0
      w-full
      bg-slate-200
      z-30
      shadow-sm
    ">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className='
            flex
            items-center
            justify-between
            gap-3
            md-gap-0
          '>
            <Link to="/" ><h2 >TechStore</h2></Link>
            <div className='hidden md:block'><SearchBar/></div>
            <div className='flex items-center gap-8 md:gap-12'>
              <CartCount/>
              <UserMenu/>
            </div>
          </div>
        </Container>
        <Categories/>
      </div>
    </div>
  );
};

export default Navbar;
