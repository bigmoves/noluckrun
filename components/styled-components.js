import styled, { createGlobalStyle, css } from 'styled-components';

import { black, orangered, white } from '../data/colors.yaml';
import fonts from '../data/fontsizes.yaml';

const spacing = {
  quarter: '10px',
  half: '20px',
  single: '40px',
  double: '80px'
};

export const small = (...args) => css`
  @media screen and (max-width: 600px) {
    ${css(...args)}
  }
`;
export const medium = (...args) => css`
  @media screen and (min-width: 601px) and (max-width: 1200px) {
    ${css(...args)}
  }
`;
export const large = (...args) => css`
  @media screen and (min-width: 1201px) {
    ${css(...args)}
  }
`;

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Space+Mono:400,700');
  *, *:before, *:after {
    box-sizing: border-box;
  }
  body{
    font-family: "Space Mono", monospace, sans-serif;
    font-variant-ligatures: no-common-ligatures;
    padding: 0;
    margin: 0;
    color: ${black};
  }
  h1, h2, h3, h4, h5, h6{
    margin: 0 0 ${spacing.single} 0;
    line-height: 1.3;
  }
  p{
    margin: 0;
    line-height: 1.6;
  }
  a{
    color: ${orangered};
    text-decoration: none;
    font-weight: bold;
    &:hover{
      color: ${orangered};
      text-decoration: underline;
    }
  }
`;

export const SiteTitle = styled.h1`
  ${small`
    font-size: ${fonts.large};
  `}
  ${medium`
    font-size: ${fonts.large};
  `}
  ${large`
    font-size: ${fonts.extralarge};
  `}
  line-height: 1;
  margin-bottom: ${spacing.quarter};
  color: ${white};
`;

export const SectionBlock = styled.section`
  ${small`
    padding: 10px 10px 10px 10px;
    min-height: 100vh;
  `}
  ${medium`
    padding: 20px 80px 20px 80px;
    min-height: 100vh;
  `}
  ${large`
    padding: 40px 120px 40px 120px;
    min-height: 100vh;
  `}
  flex: 1;
  display: flex;
  align-items: center;
  position: relative;
  &:last-of-type{
    .section-icon{
      &:after{
        display: none;
      }
    }
  }
  background: url('${props => props.image}') no-repeat center center scroll; 
  background-size: cover;
`;

export const SectionContents = styled.div`
  position: relative;
  z-index: 10;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 8px 8px rgba(0,0,0,0.15);
  border-left: 40px solid ${black};
  ${small`
    padding: ${spacing.half} ${spacing.half};
  `}
  ${medium`
    padding: ${spacing.single} ${spacing.double};
  `}
  ${large`
    padding: ${spacing.single} ${spacing.double};
  `}
  &.section-intro-contents{
    border: none;
    ${small`
      padding: ${spacing.double} ${spacing.half} ${spacing.half} ${spacing.half};
    `}
    ${medium`
      padding: ${spacing.double} ${spacing.single} ${spacing.single} ${spacing.single};
    `}
    ${large`
      padding: ${spacing.double} ${spacing.double};
    `}
  }
`;

export const SectionTop = styled.div`
  ${medium`
    display: flex;
  `}
  ${large`
    display: flex;
  `}
  justify-content: space-between;
  align-items: flex-start;
`;

export const SectionHeader = styled.div``;

export const SectionTitle = styled.h2`
  ${small`
    font-size: ${fonts.large};
  `}
  ${medium`
    font-size: ${fonts.large};
  `}
  ${large`
    font-size: ${fonts.extralarge};
  `}
  line-height: 1;
  margin-bottom: ${spacing.quarter};
`;

export const SectionDescription = styled.div`
  ${small`
    font-size: ${fonts.small};
  `}
  ${medium`
    font-size: ${fonts.small};
  `}
  ${large`
    font-size: ${fonts.medium};
  `}
  p+p{
    margin-top: ${spacing.half};
  }
`;

export const IconBlock = styled.div`
  ${small`
    display: none;
  `}
  display: flex;
  position: absolute;
  left: -60px;
  top: 35px;
  justify-content: center;
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 110;
  border-radius: 100%;
  border: 4px solid ${black};
  width: 80px;
  height: 80px;
  font-size: ${fonts.large};
  color: ${black};
  background: ${orangered};
  border-color: ${orangered};
  span {
    display: block;
  }
  svg {
    display: block;
    height: 40px;
    width: 40px;
    path,
    polygon,
    polyline,
    rect,
    line {
      fill: ${white};
      stroke: ${white};
    }
  }
`;
