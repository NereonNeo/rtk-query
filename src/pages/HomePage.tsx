import { useEffect, useState } from 'react';
import RepoCard from '../components/RepoCard';
import { useDebounce } from '../hooks/debounce';
import {
  useLazyGetUserReposQuery,
  useSearchUsersQuery,
} from '../store/github/githubApi';

const HomePage = () => {
  const [search, setSearch] = useState('');
  const [drpodown, setDropDown] = useState(false);
  const debounced = useDebounce(search);
  const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true,
  });

  const [fetchRepos, { isLoading: areReposLoading, data: repos }] =
    useLazyGetUserReposQuery();

  const clickHandler = (username: string) => {
    fetchRepos(username);
    setDropDown(false);
  };

  useEffect(() => {
    setDropDown(debounced.length > 3 && data?.length! > 0);
  }, [debounced, data]);
  console.log(data);

  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-auto">
      {isError && (
        <p className="text-center text-red-600">Something went wrong...</p>
      )}

      <div className="relative w-[580px]">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border py-2 px-4 w-full h-[42px] mb-2"
          placeholder="Github search by username"
        />
        {drpodown && (
          <ul className=" list-none absolute top-[42px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-white">
            {isLoading && <p className="text-center">Loading</p>}
            {data?.map((user) => {
              return (
                <li
                  onClick={() => clickHandler(user.login)}
                  className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
                  key={user.id}
                >
                  {user.login}
                </li>
              );
            })}
          </ul>
        )}

        <div className="container">
          {areReposLoading && <p className="text-center">Loading repos</p>}
          {repos?.map((repo) => (
            <RepoCard repo={repo} key={repo.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
