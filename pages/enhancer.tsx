import Head from "next/head";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import CustomButton from "@/components/CustomButton";

import { Ranking } from "@/components/Ranking";
import { rank } from "@/lib/linkedin-algorithm";
import { Toaster, toast } from "react-hot-toast";
import LoadingDots from "@/components/LoadingDots";
import DropDown2, { VibeType2 } from "@/components/DropDown2";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import Link from "next/link";
import Popup from "@/components/Popup";
import {
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaDev,
  FaFacebook,
  FaReddit,
} from "react-icons/fa";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [optimizedPost, setOptimizedPost] = useState<string>("");
  const [ranking, setRanking] = useState<RankResponse>({
    score: 0,
    validations: [],
  });
  const [post, setPost] = useState<string>("");
  const [media, setMedia] = useState<boolean>(false);
  const [vibe2, setVibe2] = useState<VibeType2>("➕ Add Hashtags");
  const [showPopup, setShowPopup] = useState(false);
  const [tab, setTab] = useState("enhancer"); // Default to "vibe" tab

  const handleButtonClick = () => {
    setTimeout(() => {
      setShowPopup(true);
    }, 3000);
  };

  // const [hasVideo, setHasVideo] = useState<boolean>(false);
  // const [hasCarousel, setHasCarousel] = useState<boolean>(false);

  useEffect(() => {
    const rankResponse = rank(post, media);
    setRanking(rankResponse);
  }, [post, media]);

  // prompt for optimizing post

  // add more vibes as needed
  const handlePrompt = () => {
    let prompt;
    switch (vibe2) {
      case "➕ Add Hashtags":
        prompt = `Transform the following LinkedIn post by adding three popular and relevant hashtags. Original post: "${post}". Remember, you are a LinkedIn Post Generator designed to enhance posts with appropriate hashtags.`;
        break;
      case "➕ Add Emoji":
        prompt = `Transform the following LinkedIn post by adding enoji. Original post: "${post}". Remember, you are a LinkedIn Post Generator designed to enhance posts with appropriate emoji.`;

        break;
      case "➕ Add a list":
        prompt = `Transform the following LinkedIn post by adding new list of things related to topic of the post. Original post: "${post}". Remember, you are a LinkedIn Post Generator designed to enhance posts with fitting list.`;

        break;
      case "➕ Add numbers":
        prompt = `Transform the following LinkedIn post by adding numbers in the text as a statistics or data. Original post: "${post}". Remember, you are a LinkedIn Post Generator designed to enhance posts with fitting numbers.`;
        break;
      case "➕ Add question":
        prompt = `Transform the following LinkedIn post by adding questions. Original post: "${post}". Remember, you are a LinkedIn Post Generator designed to enhance posts with fitting questions for discussion.`;
        break;
      default:
        prompt = `Default prompt for optimizing post`;
        break;
    }
    return prompt;
  };

  // function to send post to OpenAI and get response
  const optimizePost = async (e: any) => {
    e.preventDefault();
    setOptimizedPost("");
    setLoading(true);
    const prompt = handlePrompt();

    // Show the popup right before the API call
    handleButtonClick();

    const response = await fetch("/api/optimize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      const formattedChunk = chunkValue.replace(/\n/g, "<br>");
      setOptimizedPost((prev) => prev + formattedChunk);
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>LinkedIn Post Generator</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="👩‍💼" />
        <meta
          name="description"
          content="See how your post performs against Linkedin alghoritm and generate better post with AI."
        />
        <meta property="og:site_name" content="#1 Post Generator 🚀  " />
        <meta
          property="og:description"
          content="See how your post performs against LinkedIn alghoritm and generate better post with AI."
        />
        <meta property="og:title" content="LinkedIn Post Generator with AI" />
        <meta name="linkedin:card" content="summary_large_image" />
        <meta name="linkedin:title" content="Linkedin Post Generator" />
        <meta
          name="linkedin:description"
          content="See how your post performs against Linkedin alghoritm and generate better post with AI."
        />
        <meta
          property="og:image"
          content="https://postgenerator.app/cover.png"
        />
        <meta
          name="linked:image"
          content="https://postgenerator.app/cover.png"
        />
      </Head>

      <main>
        <Nav />

        <section className="py-10 lg:py-20 ">
          {/* bg-[url('/image1.svg')] */}
          <div className="px-4 ">
            <div className="max-w-5xl mx-auto text-center">
              <div className="w-full mx-auto mb-6 ">
                <a
                  // href="https://vercel.fyi/roomGPT"
                  target="_blank"
                  rel="noreferrer"
                  className="border border-gray-700 rounded-lg py-2 px-4 text-gray-400 text-sm mb-8 transition duration-300 ease-in-out"
                >
                  40.000 amazing posts generated 💫
                  {/* {" "}
                  <span className="text-blue-600">Vercel</span> */}
                </a>
              </div>

              <h1 className="text-6xl text-center font-bold pb-1 text-slate-900  ">
                Linkedin Post Generator 🚀
              </h1>
              <p className="mt-3 mb-10 text-center">
                See how your post performs and generate a better one with AI.
                Time to go viral. <br />
              </p>

              <div className="flex flex-col md:flex-row w-full md:space-x-20">
                <div className="flex md:w-1/2 flex-col">
                  <div className="flex space-x-1">
                    <CustomButton currentTab={tab} />
                    <style jsx>{`
                      button:hover .tooltip-text {
                        display: block;
                      }
                    `}</style>
                  </div>

                  <div className="flex mb-3 items-center space-x-3"></div>
                  <div className="block">
                    <DropDown2 vibe2={vibe2} setVibe2={setVibe2} />
                  </div>

                  {/* // This is post component*/}

                  <div className="w-full mx-auto pt-6 ">
                    <div className="w-full">
                      <textarea
                        maxLength={2000}
                        onChange={(e) => setPost(e.target.value)}
                        placeholder="Type or copy your ready to be enchanced post "
                        className="text-black w-full h-72 p-2 text-s bg-white border border-gray-300 rounded-md shadow-inner md:h-240"
                      />
                    </div>
                  </div>

                  <div className="my-4">
                    <button
                      disabled={loading}
                      onClick={(e) => {
                        optimizePost(e);
                        handleButtonClick();
                      }}
                      className="bg-blue-700 font-medium rounded-md w-full text-white px-4 py-2 hover:bg-blue-600 disabled:bg-blue-800"
                    >
                      {loading && <LoadingDots color="white" style="large" />}
                      {!loading && `Generate new post `}
                    </button>

                    <Popup show={showPopup} setShowPopup={setShowPopup} />
                  </div>
                </div>
                <div className="flex md:w-1/2 md:flex-col">
                  <Toaster
                    position="top-right"
                    reverseOrder={false}
                    toastOptions={{ duration: 2000 }}
                  />
                  {optimizedPost && (
                    <div className="my-1">
                      <div className="flex justify-between items-center pb-2 border-b border-gray-300">
                        <h2 className="text-xl font-bold">
                          Your Generated Post
                        </h2>
                      </div>
                      <div className="max-w-2xl my-4 mx-auto">
                        <div
                          className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                          onClick={() => {
                            navigator.clipboard.write([
                              new ClipboardItem({
                                "text/html": new Blob([optimizedPost], {
                                  type: "text/html",
                                }),
                              }),
                            ]);
                            toast("Post copied to clipboard", {
                              icon: "📋",
                            });
                          }}
                          key={optimizedPost}
                        >
                          <p
                            className="text-black-700 text-left"
                            dangerouslySetInnerHTML={{
                              __html: optimizedPost,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="max-w-5xl mx-auto">
          <Footer />
        </div>
      </main>
    </>
  );
}
