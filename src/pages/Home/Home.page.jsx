import React, { useRef } from 'react';

import './Home.styles.css';

import Feed from '../../components/Feed';

function HomePage() {
  const sectionRef = useRef(null);

  return (
    <section className="homepage" ref={sectionRef}>
      <Feed />
    </section>
  );
}

export default HomePage;
