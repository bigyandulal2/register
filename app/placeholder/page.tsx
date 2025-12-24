// This page is statically generated at build time (SSG)

async function getStaticData() {
    // Simulate fetching data (e.g., from an API, CMS, or database)
    // This runs ONLY at build time
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const post = await res.json();
    return post;
  }
  
  export default async function HomePage() {
    const post = await getStaticData();
  
    return (
      <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h1>Welcome to My Static Site (SSG Example)</h1>
        <p>This entire page was pre-rendered at <strong>build time</strong>!</p>
  
        <h2>Post fetched at build time:</h2>
        <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
  
        <footer style={{ marginTop: '3rem', color: '#666' }}>
          Built on: {new Date().toLocaleDateString()} at build time
        </footer>
      </main>
    );
  }