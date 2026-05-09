import MovieRow from '../components/MovieRow';

function TvShows() {
  return (
    <div className="min-h-screen pt-20 md:pt-8 pb-10 px-4 md:px-12">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">📺 TV Shows</h1>
      
      <div className="space-y-10">
        <MovieRow title="🏆 Classic TV Shows" fetchUrl="Friends" />
        <MovieRow title="😂 Comedy TV" fetchUrl="The Office" />
        <MovieRow title="🔪 Crime & Thriller TV" fetchUrl="Breaking Bad" />
        <MovieRow title="🧛 Supernatural TV" fetchUrl="Stranger Things" />
        <MovieRow title="🎭 Drama Series" fetchUrl="Succession" />
      </div>
    </div>
  );
}

export default TvShows;