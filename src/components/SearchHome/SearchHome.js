import './SearchHome.scss';
import SearchInput from './SearchInput/SearchInput';

function searchHome() {
  return (
    <div className="searchHome">
      <div className="searchInput">
        <SearchInput />
      </div>
    </div>

  );
}
export default searchHome;
