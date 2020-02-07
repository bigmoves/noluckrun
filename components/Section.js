import React from 'react';
import {
  SectionBlock,
  SectionContents,
  SectionTop,
  SectionHeader,
  SectionTitle,
  SectionDescription
} from './styled-components';
import SectionIcon from './SectionIcon';

export const Section = ({ title, description, image, children }) => {
  return (
    <SectionBlock image={image}>
      <SectionContents>
        <SectionIcon iconName="map" />
        <SectionTop>
          <SectionHeader>
            <SectionTitle>{title}</SectionTitle>
            <SectionDescription>{description}</SectionDescription>
          </SectionHeader>
        </SectionTop>
        {children}
      </SectionContents>
    </SectionBlock>
  );
};
