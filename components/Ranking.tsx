import classNames from "classnames";
import { Dispatch, PropsWithChildren, SetStateAction } from "react";

type RankingProps = {
  ranking: RankResponse;
};

export const Ranking = ({ ranking }: RankingProps) => {
  const positive = ranking.validations.filter(
    (item) => item.type === "positive"
  );
  const negative = ranking.validations.filter(
    (item) => item.type === "negative"
  );
  const percentage = Math.abs(ranking.score / 2) + "%";
  const direction = ranking.score < 0 ? "negative" : "positive";
  return (
    <>
      <div>
        <div className="slider bg-gray-300 h-4 rounded-full relative overflow-hidden">
          <div
            className={classNames(
              "absolute top-0 transition-width duration-250 ease-linear h-20",
              `slider-${direction}`,
              {
                "bg-red-600": direction === "negative",
                "bg-green-600": direction === "positive",
              }
            )}
            style={{ width: percentage }}
          />
        </div>
        <p className="explanation text-gray-600 italic text-sm">
          Positive rankings result in greater reach and engagement.
        </p>
        <p className="my-2">
          Score: <strong>{ranking.score}</strong>
        </p>
        <ul className="mt-5 p-0">
          {positive.map((item, index) => (
            <li
              className="positive text-green-600 flex items-center space-x-2 list-style-none my-1"
              key={`positive-${index}`}
            >
              <span>👍</span>
              <span>{item.message}</span>
            </li>
          ))}
          {negative.map((item, index) => (
            <li
              className="negative text-red-600 flex items-center space-x-2 list-style-none my-1"
              key={`negative-${index}`}
            >
              <span>👎</span>
              <span>{item.message}</span>
            </li>
          ))}
        </ul>
      </div>
      <style jsx>{`
        .slider:after {
          content: " ";
          display: block;
          width: 2px;
          height: 20px;
          position: absolute;
          top: 0;
          left: calc(50% - 1px);
          background: #000;
        }
        .slider-negative {
          right: calc(50% - 1px);
        }
        .slider-positive {
          left: calc(50% - 1px);
        }
      `}</style>
    </>
  );
};
