import Link from "next/link";

export default function Nav() {
  return (
    <nav className="bg-blue-900 text-white ">
      <div className="px-5">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center h-16 ">
            <div className="flex items-center text-base ">
              <a
                target="_blank"
                href="https://www.linkedin.com/in/iuliia-shnai/"
                rel="noreferrer"
                className="text-white flex max-w-fit items-center justify-center space-x-2 text-xl"
              >
                <p>👩‍💼</p>
              </a>
            </div>
            {/* <div>
                  <ul className="flex">
                    <li className="ml-8">
                      <a
                        target="_blank"
                        href="https://github.com/mfts/twitter-algorithm-ai"
                        rel="noreferrer"
                        className="text-white flex max-w-fit items-center justify-center space-x-2"
                      >
                        <Github />
                        <p>Star on GitHub</p>
                      </a>
                    </li>
                  </ul>
                </div> */}
          </div>
        </div>
      </div>
    </nav>
  );
}
