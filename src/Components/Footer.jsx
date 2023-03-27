import styled from "styled-components";

const Footer = (props) => {
  return (
    <>
      <Wrapper>
        <footer className="text-center text-lg-start bg-light text-muted">
          <div
            className="text-center text-light p-4"
            style={{ "backgroundColor": "#212529" }}
          >
            © 2021 Copyright:&nbsp;
            <a className="text-light fw-bold" href="/home">
              ecommerce.com
            </a>
          </div>
        </footer>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  display: flex;
  // height: 4vh;
  background: #212529;
  padding: 0px 50px;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  top: 93vh;
`;
export default Footer;
