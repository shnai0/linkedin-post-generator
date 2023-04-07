import { Dispatch, SetStateAction } from "react";

interface TweetProps {
  tweet: string;
  setTweet: Dispatch<SetStateAction<string>>;
}

export const Tweet = ({ tweet, setTweet }: TweetProps) => {
  return (
    <>
      <div className="w-full">
        <textarea
          maxLength={280}
          onChange={(e) => setTweet(e.target.value)}
          placeholder="Type your tweet here"
          className="dark:text-black w-full h-56 p-2 text-lg dark:bg-white border border-gray-300 text-white bg-slate-600 rounded-md shadow-inner md:h-240"
        />
      </div>
    </>
  );
};
