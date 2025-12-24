// This page is statically generated at build time (SSG)

async function getStaticData() {
   
    //using isr follows up with this, since used revalidate , 
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1',{
        next:{revalidate:60}
    });
    //this serves as the static site generation , so, in next build, it creates static json files. 
//       const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const post = await res.json();
    return post;
  }
  
  export default async function HomePage() {
    const post = await getStaticData();
  
    return (
      <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h1>Welcome to My Static Site (SSG Example)</h1>
        <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
  
        <footer style={{ marginTop: '3rem', color: '#666' }}>
  Built on:{' '}
  {new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false, // 24-hour format
  })}{' '}
  at build time
</footer>
      </main>
    );
  }