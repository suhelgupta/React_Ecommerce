import ProductCard from "../Components/ProductCard"
import styled from "styled-components"
import {  useSelector } from "react-redux";


function Home() {
  const state = useSelector((state) => state.product);

  if(state.isLoading){
    return <div className="emptyDiv">
    <h3>.....Loading </h3>
  </div>
  }
 
  if(state.isError){
    return <div className="emptyDiv">
      <h3>Somthing Went Wrongs </h3>
    </div>
  }
 
  
  return (
    <>
      {/* <NavBar count={cartCount} /> */}
        <div>
      <Container>

      {state.products.map((val)=>
        <ProductCard 
          key={val.id}
          id={val.id}
          imgURL={val.imgURL}
          productName= {val.productName}
          productDescription= {val.productDescription}
          productPrice= {val.productPrice}
          >
        </ProductCard>
      )}
          
      </Container>
      </div>
      {/* <Footer></Footer> */}
    </>
  )
}

const Container = styled.div`
  padding: 31px 15%;
  margin: auto;
  display: flex;
  flex-wrap:wrap;
  justify-content: space-around;
`

export default Home
