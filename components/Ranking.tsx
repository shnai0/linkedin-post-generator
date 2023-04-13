import classNames from "classnames";
import { Dispatch, PropsWithChildren, SetStateAction } from "react";
import { Button } from "@/components/Button";

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
  const percentage = Math.abs(ranking.score * 20) + "%";
  const boost = ranking.score < 1 ? "negative" : "positive";
  const sliderColor = boost === "negative" ? "bg-red-600" : "bg-green-600";
  return (
    <>
      <div>
        <div className="slider bg-gray-300 h-4 rounded-full relative overflow-hidden">
          <div
            className={classNames(
              "absolute top-0 transition-width duration-250 ease-linear h-20",
              sliderColor
            )}
            style={{ width: percentage }}
          />
        </div>
        {/* <p className="explanation text-gray-600 italic text-sm mt-2">
          Positive rankings result in greater reach 
        </p> */}

        <ul className="mt-5 p-0">
          {positive.map((item, index) => (
            <li
              className="positive text-green-600 flex items-center space-x-2 list-style-none my-5 text-sm"
              key={`positive-${index}`}
            >
              <span>👍</span>
              <span>{item.message.replace(/\(\s*[+-]?\d+\s*\)/, '')}</span>
            </li>
          ))}
          {negative.map((item, index) => (
            <li
              className="negative text-red-600 flex items-center space-x-2 list-style-none my-1 text-sm"
              key={`negative-${index}`}
            >
              <span>👎</span>
              <span>{item.message.replace(/\(\s*[+-]?\d+\s*\)/, '')}</span>
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
          left: calc(25% - 1px);
          background: #000;
        }
      `}</style>
    </>
  );
};
