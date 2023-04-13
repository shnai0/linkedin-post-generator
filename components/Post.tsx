import { Dispatch, SetStateAction } from "react";

interface PostProps {
  post: string;
  setPost: Dispatch<SetStateAction<string>>;
  media: boolean;
  setMedia: Dispatch<SetStateAction<boolean>>;
}

export const Post = ({ post, setPost, media, setMedia }: PostProps) => {
  return (
    <>
      <div className="w-full">
        <textarea
          maxLength={2000}
          onChange={(e) => setPost(e.target.value)}
          placeholder="Type your post or idea here. Tick the box if you have visual to get the proper rank."
          className="text-black w-full h-56 p-2 text-s bg-white border border-gray-300 rounded-md shadow-inner md:h-240"
        />
      </div>
      <div className="flex items-center mt-1 text-xs text-gray-700">
        <input
          type="checkbox"
          id="media"
          name="media"
          className="form-checkbox h-4 w-4 text-blue-600"
          checked={media}
          onChange={(e) => setMedia(e.target.checked)}
        />
        <label htmlFor="media" className="ml-2">
          Image / Carousel/ Video
        </label>
      </div>
      <div className="flex mb-1 items-center space-x-3">
      </div>
    </>
  );
};



// import { Dispatch, SetStateAction, useState } from "react";

// interface PostProps {
//   post: string;
//   setPost: Dispatch<SetStateAction<string>>;
//   hasImage: boolean;
//   sethasImage: Dispatch<SetStateAction<boolean>>;
// }

// export const Post = ({ post, setPost }: PostProps) => {
//   const [hasImage, sethasImage] = useState(false);
//   // const [hasVideo, setHasVideo] = useState(false);
//   // const [hasCarousel, setHasCarousel] = useState(false);

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!hasVideo && !hasCarousel) {
//       setHasImage(e.target.checked);
//     }
//   };

//   // const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   if (!hasImage && !hasCarousel) {
//   //     setHasVideo(e.target.checked);
//   //   }
//   // };

//   // const handleCarouselChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   if (!hasImage && !hasVideo) {
//   //     setHasCarousel(e.target.checked);
//   //   }
//   // };

//   return (
//     <>
//       <div className="w-full">
//         <textarea
//           maxLength={1000}
//           onChange={(e) => setPost(e.target.value)}
//           placeholder="Type your post here"
//           className="text-black w-full h-56 p-2 text-lg bg-white border border-gray-300 rounded-md shadow-inner md:h-240"

//         />
//       </div>
//       <div className="flex items-center mt-3">
//         <input
//           type="checkbox"
//           id="hasImage"
//           name="hasImage"
//           className="form-checkbox h-4 w-4 text-blue-600"
//           checked={hasImage}
//           onChange={handleImageChange}
//         />
//         <label htmlFor="hasImage" className="ml-2">
//           Includes image 🏞️
//         </label>
//       </div>
//       {/* <div className="flex items-center mt-3">
//         <input
//           type="checkbox"
//           id="hasVideo"
//           name="hasVideo"
//           className="form-checkbox h-4 w-4 text-blue-600"
//           checked={hasVideo}
//           onChange={handleVideoChange}
//         />
//         <label htmlFor="hasVideo" className="ml-2">
//           Includes video 📹
//         </label>
//       </div>
//       <div className="flex items-center mt-3">
//         <input
//           type="checkbox"
//           id="hasCarousel"
//           name="hasCarousel"
//           className="form-checkbox h-4 w-4 text-blue-600"
//           checked={hasCarousel}
//           onChange={handleCarouselChange}
//         />
//         <label htmlFor="hasCarousel" className="ml-2">
//           Includes carousel 🎞️
//         </label>
//       </div> */}
//     </>
//   );
// };