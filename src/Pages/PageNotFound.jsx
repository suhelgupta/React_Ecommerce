import React from 'react'
import styled from 'styled-components';

const PageNotFound = () => {
  return (
    <EmptyDiv>
        <h1>
            Sorry Page Not Found
        </h1>
    </EmptyDiv>
  )
}
const EmptyDiv = styled.div`
  display: grid;
  place-items: center;
  height: 50vh;

  h1 {
    font-size: 4.2rem;
    text-transform: capitalize;
    font-weight: 300;
  }
`;
export default PageNotFound