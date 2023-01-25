import { useActions } from '../hooks/actions';
import { useGetUserInfoQuery } from '../store/github/githubApi';

type UserProps = {
  username: string;
  url: string;
};

const UserCard = ({ username, url }: UserProps) => {
  const { isLoading, isError, data } = useGetUserInfoQuery(username);
  const { removeFavourite } = useActions();

  const removeHandler = () => {
    removeFavourite({ login: username, url });
  };

  return (
    <>
      <li
        className=" relative shadow-sm py-2 px-4 m-2 hover:shadow-xl cursor-pointer rounded-md border-none border bg-hero-github bg-center text-white h-[400px] w-[300px] flex flex-col justify-between"
        key={url}
      >
        <button
          onClick={() => removeHandler()}
          className="bg-[#222121ec] absolute top-[-8px] right-[-8px] rounded-[50%] h-[30px] w-[30px] text-center font-bold"
        >
          ❌
        </button>
        <div className="">
          <img
            className="my-2 rounded-[50%] h-[50px] w-[50px]"
            src={data?.avatar_url}
            alt=""
          />
          <p className="text-left">
            <span className="font-medium">Bio: </span>
            {data?.bio}
          </p>
          <div className="followers_wrapper flex justify-items-start">
            <p className="text-left my-2">
              <span className="font-medium">Followers: </span> {data?.followers}
            </p>
            <p className="text-left my-2 mx-5">
              <span className="font-medium">Following: </span> {data?.following}
            </p>
          </div>
        </div>

        <button className="py-2 px-6 bg-white rounded-md text-black font-bold  ">
          <a href={url} target="_blank" className="relative">
            Show
          </a>
        </button>
      </li>
    </>
  );
};

export default UserCard;
