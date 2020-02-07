import React from 'react';
import Countdown from 'react-countdown';
import { SectionBlock, SiteTitle } from './styled-components';

import styled from 'styled-components';

const CountdownWrapper = styled.div`
  font-size: 1.5rem;
  color: #fff;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SectionIntro = () => {
  return (
    <SectionBlock className="section-intro" image="/noluck-1.jpg">
      {/* <SectionContents className="section-intro-contents"> */}
      <TitleWrapper>
        <SiteTitle>2020 No Luck Run</SiteTitle>
        <CountdownWrapper>
          <Countdown date={new Date('03/17/2020')} />
        </CountdownWrapper>
      </TitleWrapper>
      {/* </SectionContents> */}
    </SectionBlock>
  );
};
