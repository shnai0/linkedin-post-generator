import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Post } from "@/components/Post";
import { Ranking } from "@/components/Ranking";
import { rank } from "@/lib/linkedin-algorithm";
import { Toaster, toast } from "react-hot-toast";
import LoadingDots from "@/components/LoadingDots";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [optimizedPost, setOptimizedPost] = useState<string>("");
  const [ranking, setRanking] = useState<RankResponse>({
    score: 0,
    validations: [],
  });
  const [post, setPost] = useState<string>("");
  const [media, setMedia] = useState<boolean>(false);
  // const [hasVideo, setHasVideo] = useState<boolean>(false);
  // const [hasCarousel, setHasCarousel] = useState<boolean>(false);

  useEffect(() => {
    const rankResponse = rank(post, media);
    setRanking(rankResponse);
  }, [post,media]);

  // prompt for optimizing post
  const prompt = `
  You are a LinkedinGPT, a large language model that generates viral posts for Linkedin. You are given a prompt of a post and must generate a post that is more likely to be liked and reposted than the original post.
  The Linkedin algorithm contains boosts and demotions based on what you are writing. Positive boosts are: 
  - if the post contains emoji, so in each post add emoji 
  - Start each sentecnce from new line and add space between lines
  - add 3 hashtags which 2 are generic and one very specific (at the end) Tags relate to post theme 
  - add a question at the end of the post to start a discussion. Before the hashtags
  -first two lines should be catchy 
  - add numbers in first 2 lines
  - there must be no more than 200 characters in the line.
  - Dont add links - links are not good. 
  - It is preferably to add the list inside the post and emoji in front of it
  - Add space between each line in generated result 
  
  Add idea about which image or visual can be added at the end of the post (this text is not counted as part of post)
    ${post}
    ---
    Generated post length must be more than 1000 characters
    ---
    Between each line must be a space
    ---
    Keep all mentions of people in there 
    --- 
    Start the firs line from smth like: I did smth, In year, I do, Tired of, Sometimes it is just, A path toward, Because this is not, 
    ---
    It should be  a story
  `;
  
  // function to send post to OpenAI and get response
  const optimizePost = async (e: any) => {
    e.preventDefault();
    setOptimizedPost("");
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
        <title>Real LinkedAlgorithm Rank Validator</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="See how your post performs against Linkedin alghoritm and generate better post with AI."
        />
        <meta
          property="og:site_name"
          content="real-twitter-algorithm.vercel.app"
        />
        <meta
          property="og:description"
          content="See how your post performs against Linkedin alghoritm and generate better post with AI."
        />
        <meta
          property="og:title"
          content="Real Linkedin Post Booster with ChatGPT"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Real Linkedin Algorithm Rank Validator"
        />
        <meta
          name="twitter:description"
          content="See how your post performs against the official open-source Twitter algorithm."
        />
        <meta
          property="og:image"
          content="https://real-twitter-algorithm.vercel.app/og-image.png"
        />
        <meta
          name="twitter:image"
          content="https://real-twitter-algorithm.vercel.app/og-image.png"
        />
      </Head>

      <main>
        <nav className="bg-blue-500 text-white">
          <div className="px-5">
            <div className="max-w-5xl mx-auto">
              <div className="flex justify-between items-center h-16">
                <div className="wordmark flex items-center text-base">
                  <Image
                    src="/logo.png"
                    width={24}
                    height={24}
                    alt="logo"
                    className="mr-1"
                  />
                  Developer
                </div>
                <div>
                  <ul className="flex">
                    <li className="ml-8">
                      <a
                        target="_blank"
                        href="https://github.com/mfts/twitter-algorithm-ai"
                        rel="noreferrer"
                        className="text-white flex max-w-fit items-center justify-center space-x-2"
                      >
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <section className="py-10 lg:py-20">
          <div className="px-4">
            <div className="max-w-5xl mx-auto">
              <div className="w-full mx-auto">
                <h1 className="text-6xl text-center font-bold pb-1 text-slate-900">
                  Linkedin Post Booster
                </h1>
                <p className="mt-3 mb-10 text-center">
                  See how your post performs and enchance it with ChatGPT. Time to go viral <br />
                  <a
                    target="_blank"
                    href="https://github.com/twitter/the-algorithm"
                    rel="noreferrer"
                    className="text-blue-500 hover:text-blue-600"
                  >
                   
                  </a>
            
                </p>
                <div className="flex flex-row w-full space-x-20">
                  <div className="flex w-1/2 flex-col">
                 
                  <h2 className="text-xl font-bold">
                     
                      Your Ranking 
                    </h2>
                    <div className="pt-1">
                      <Ranking ranking={ranking} />
                    </div>
                  
                  
                    <div className="w-full my-1 mx-auto">
                      <Post
                        post={post}
                        setPost={setPost}
                        media={media}
                        setMedia={setMedia}
                      />
                    </div>
                    <div className="my-4">
                      <button
                        onClick={(e) => optimizePost(e)}
                        className="bg-blue-500 font-medium rounded-md w-full text-white px-4 py-2 hover:bg-blue-600"
                      >
                        {loading && <LoadingDots color="white" style="large" />}
                        {!loading && `Generate your post`}
                      </button>
                    </div>
                    </div>
                    <div className="flex w-1/2 flex-col">
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
                                  "text/html": new Blob([optimizedPost], { type: "text/html" }),
                                }),
                              ]);
                              toast("Post copied to clipboard", {
                                icon: "📋",
                              });
                            }}
                            key={optimizedPost}
                          >
                            <p className="text-blue-500" dangerouslySetInnerHTML={{ __html: optimizedPost }} />
                          </div>
                        </div>
                      </div>
                    )}
              
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      
      </main>
    </>
  );
}
