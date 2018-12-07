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
    <div style={{ width: '350px' }}>{story()}</div>
  </section>
);
