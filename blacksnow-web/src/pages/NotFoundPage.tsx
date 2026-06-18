const NotFoundPage = () => {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: '#f6f4ef',
        color: '#0a0a0a',
        padding: '24px'
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: 560 }}>
        <h1>Page not found</h1>
        <p>
          The page you are looking for does not exist. Return to the landing page using the URL <code>/</code>.
        </p>
      </div>
    </main>
  );
};

export default NotFoundPage;
