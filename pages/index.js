import { GlobalStyle } from '../components/styled-components';

import { SectionIntro, Section, small, medium, large } from '../components';
import styled from 'styled-components';

import dynamic from 'next/dynamic';

const DynamicComponentWithNoSSR = dynamic(
  () => import('../components/Mapbox').then(mod => mod.Mapbox),
  {
    ssr: false
  }
);

const MapLayout = styled.div`
  display: flex;
  margin-top: 10px;

  ${small`flex-direction: column;`}
  ${medium`flex-direction: row;`}
  ${large`flex-direction: row;`}
`;

function HomePage() {
  return (
    <div>
      <GlobalStyle />

      <SectionIntro image="/noluck-1.jpg" />

      <Section
        title="Routes"
        description="Um where do we go?"
        image="/noluck-2.jpg"
      >
        <MapLayout>
          <DynamicComponentWithNoSSR title="5k" dataUrl="/5k.json" />
          <DynamicComponentWithNoSSR title="10k" dataUrl="/5k.json" />
          <DynamicComponentWithNoSSR title="15k" dataUrl="/5k.json" />
        </MapLayout>
      </Section>
    </div>
  );
}

export default HomePage;
