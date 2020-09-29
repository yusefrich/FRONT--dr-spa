import styled from "styled-components";

export const BgLeft = styled.div`
  width: 33%;
  position: absolute;
  top: 0;
  height: 100vh;
  z-index: -1;
  background-image: url(${require("../img/fundo.jpg")});
`;

export default BgLeft;
