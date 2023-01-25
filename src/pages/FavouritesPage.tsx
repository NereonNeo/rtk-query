import UserCard from '../components/UserCard';
import { useAppSlector } from '../hooks/redux';

const FavouritesPage = () => {
  const { favourites } = useAppSlector((state) => state.github);
  if (favourites.length === 0) return <p className="text-center">No items.</p>;
  return (
    <div className=" pt-10 mx-auto h-screen w-auto">
      <ul className="list-none flex justify-start flex-wrap ">
        {favourites.map((f) => {
          return <UserCard username={f.login} url={f.url} />;
        })}
      </ul>
    </div>
  );
};

export default FavouritesPage;
