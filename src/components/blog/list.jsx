import PostSummary from './summary';

export default function BlogList({ posts, page }) {
  if (posts.length > 0 && page.slug === 'index') {
    return (
      <section>
        <div className="grid lg:grid-cols-2 2xl:grid-cols-3 justify-center gap-12 mt-8 md:mt-16">
          {posts.map((post, i) => (
            <PostSummary post={post} key={i} />
          ))}
        </div>
        <a href="/news/">
          <button className="button-primary rounded-lg">All Posts</button>
        </a>
      </section>
    );
  } else if (posts.length > 0) {
    return (
      <section>
        <div className="grid lg:grid-cols-2 2xl:grid-cols-3 justify-center gap-12 mt-8 md:mt-16">
          {posts.map((post, i) => (
            <PostSummary post={post} key={i} />
          ))}
        </div>
      </section>
    );
  }
  return;
}
