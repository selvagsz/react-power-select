import React from 'react';

export default story => (
  <section
    style={{
      display: 'flex',
      height: '80vh',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <div style={{ maxWidth: '350px' }}>{story()}</div>
  </section>
);
