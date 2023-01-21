import { useAppSlector } from '../hooks/redux';

const FavouritesPage = () => {
  const { favourites } = useAppSlector((state) => state.github);
  if (favourites.length === 0) return <p className="text-center">No items.</p>;
  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-auto">
      <ul className="list-none">
        {favourites.map((f) => {
          return (
            <a href={f} target="_blank">
              <li
                className="shadow-sm py-4 px-8 my-5 hover:shadow-xl cursor-pointer"
                key={f}
              >
                {f}
              </li>
            </a>
          );
        })}
      </ul>
    </div>
  );
};

export default FavouritesPage;
