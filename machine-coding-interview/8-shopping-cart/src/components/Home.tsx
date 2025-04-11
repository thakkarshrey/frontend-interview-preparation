import { CartState } from '../context/ContextProvider'
import SingleProduct from './SingleProduct'
import Filters from './Filters'
import './styles.css'

const Home = () => {

  const {state:{ products}, filterState:{byFastDelivery,byRating,bySearchQuery,byStock,sort}} = CartState()


  const filteredProductsFunction = () => {
    let filteredProducts = products;

    if(sort){
      filteredProducts = filteredProducts.sort((a:any,b:any)=> sort==="lowToHigh" ? a.price - b.price : b.price - a.price)
    }

    if(byFastDelivery){
      filteredProducts = filteredProducts.filter((product)=>product.fastDelivery)
    }

    if(!byStock){
      filteredProducts = filteredProducts.filter((product)=>product.inStock)
    }

    if(bySearchQuery){
      filteredProducts = filteredProducts.filter((product)=>product.name.includes(bySearchQuery))
    }

    if(byRating){
      filteredProducts = filteredProducts.filter((product)=>product.ratings >= byRating)
    }

    return filteredProducts
  }
  
  return (
    <div className="home">
    <Filters/>
    <div className='product-container'>
      {
        filteredProductsFunction()?.map((element)=>{
          console.log(element,'element')
          return (
            <>
            <SingleProduct element={element}/>
            </>
          )
        })
      }
    </div>
    </div>
  )
}

export default Home