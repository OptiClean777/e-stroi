import styled from "@emotion/styled";
import Container from "./Container";
import { NavLink } from "react-router-dom";

const Wrapper = styled.div`
  height: 60px;
  background: #c8c8c8;
`;
const StyledContainer = styled(Container)`
  display: flex;
  height: 100%;
  align-items: center;
  font-size: 36px;
  color: #272323;
`;

export const Header = () => {
  return (
    <Wrapper>
      <StyledContainer>
        <NavLink to="/home">e-stroi.kz</NavLink>
        <div style={{margin:'20px'}}>
        <NavLink to ='/catalog'>Каталог</NavLink>
        </div>
      </StyledContainer>
    </Wrapper>
  );
};
