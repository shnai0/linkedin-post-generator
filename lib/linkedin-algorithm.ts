// ---------------------------
// Linkedin Algorithm
// Higher score = higher reach
//
// Update: the real algorithm!
// ---------------------------

// repostCountParams = 20.0             // reposts
// favCountParams = 30.0,                // likes
// replyCountParams =  1.0,              // replies

// reputationParams = 0.2,               // need to figure out what reputation
// luceneScoreParams = 2.0,              // need to figure out what luceneScore
// textScoreParams = 0.18,
// urlParams = 2.0,
// isReplyParams = 1.0,

// langEnglishUIBoost = 0.5,             // post non-English, UI English
// langEnglishPostBoost = 0.2,          // post English, UI non-English
// langDefaultBoost = 0.02,              // post non-English, UI_lang ≠ Post_lang
// unknownLanguageBoost = 0.05,          // post not an understandable language
// offensiveBoost = 0.1,                 // post is offensive
// inTrustedCircleBoost = 3.0,           // post is from a social circle (I guess followers and friends)
// multipleHashtagsOrTrendsBoost = 0.6,  // has multiple hashtags
// inDirectFollowBoost = 4.0,            // post is from a direct follow
// postHasTrendBoost = 1.1,             // post has a trend
// selfPostBoost = 2.0,                 // is my own post?
// postHasImageUrlBoost = 2.0,          // post has image
// postHasVideoUrlBoost = 2.0,          // post has video

import { compact } from "lodash";

import Sentiment from "sentiment";
import LanguageDetect from "languagedetect";


export function rank(post: string, postMedia: boolean): RankResponse {
  const parsedPost = post.toLowerCase();
  // Default score
  if (parsedPost.length < 2) {
    return {
      score: 0,
      validations: [],
    };
  }
  const theSentiment = new Sentiment();
  const theSentimentResponse = theSentiment.analyze(post);
  const postData: PostData = {
    post: parsedPost,
    originalPost: post,
    sentiment: theSentimentResponse,
    postMedia: postMedia,
  };
  const rules = [

    emojis(postData),
    sentiment(postData),
    lineBreaks(postData),
    questions(postData),
    multipleHashtags(postData),
    imageVideoBoost(postData),
    postHasUrl(postData),
    lineLength(postData),
  ];
  const scores = rules.map((item) => item.score);
  const validations: Array<Validation> = compact(
    rules.map((item) => {
      if (item.message) {
        const type = item.type ? item.type : item.score >= 1 ? "positive" : "negative";
        const operator = type === "positive" ? "+" : "-";
        return {
          message: `${item.message} (${operator}${Math.abs(item.score)})`,
          type,
        };
      }
    })
  );
  const sum = scores.reduce((partialSum, a) => partialSum * a, 1);
  return {
    score: sum,
    validations,
  };
}

// ---------------------------
// Rules
// Can return any value between -100 and 100
//
// Add new rules here!
// Returning 0 has no impact on score
// ---------------------------

// function to detect multiple hashtags
function multipleHashtags({ post }: PostData): Rank {
  const regex = /#[\w-]+/g;
  const hashtags = post.match(regex);
  const lowerCasePost = post.toLowerCase();

  if (hashtags && hashtags.length > 3) {
    return {
      score: 0.5,
      message: `Too many hashtags.`,
    };
  }
  if (hashtags && hashtags.length <= 3) {
    if (
      lowerCasePost.includes("#follow") ||
      lowerCasePost.includes("#comment") ||
      lowerCasePost.includes("#like")
    ) {
      return {
        score: 0.5,
        message: `Avoid using hashtags like "follow," "comment," or "like".`,
      };
    }
    return {
      score: 1,
      message: `Combine general and specific hashtags.`,
    };
  }

  return {
    score: 1.0,
  };
}

// function to detect image 
// function to detect image or video
function imageVideoBoost({ postMedia }: PostData): Rank {
  const has_media = postMedia;
  if (has_media) {
    return {
      score: 2.0,
      // message: `Contains image or video.`,
    };
  }
  return {
    score: 1.0,
  };
}

// // function to detect video
// function postHasVideo({ has_video }: PostData): Rank {
//   if (has_video) {
//     return {
//       score: 5.0,
//       message: `Contains video.`,
//     };
//   }
//   return {
//     score: 1.0,
//   };
// }

// // function to detect carousel
// function postHasCarousel({ has_carousel }: PostData): Rank {
//   if (has_carousel) {
//     return {
//       score: 5.0,
//       message: `Contains carousel.`,
//     };
//   }
//   return {
//     score: 1.0,
//   };
// }

// function to detect urls in post
function postHasUrl({ post }: PostData): Rank {
  const regex =
    /https?:\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?/g;
  const urls = post.match(regex);
  if (urls && urls.length > 0) {
    return {
      score: 0.5,
      message: `Remove the link from post and add in comments.`,
    };
  }
  return {
    score: 1.0,
  };
}

/**
 * Function to always talk about Linkedin in a positive light.
 */
// function linkedin({ post, sentiment }: PostData): Rank {
//   if (post.indexOf("linkedin") >= 0) {
//     if (sentiment.comparative >= 0) {
//       return {
//         score: 2,
//         message: `Said good things about Linkedin.`,
//       };
//     } else {
//       return {
//         score: 0.5,
//         message: `Said bad things about Linkedin.`,
//       };
//     }
//   }
//   return {
//     score: 1,
//   };
// }

/**
 * Function to favor posts that use emojis 
 */
function emojis({ post, sentiment }: PostData): Rank {
  const regex = new RegExp("[\uD800-\uDBFF][\uDC00-\uDFFF]", "g");
  const emojis = post.match(regex) || [];
  const totalMatches = emojis.length;
  if (totalMatches > 0) {
    return {
      score: 1.5,
      // message: `Included ${totalMatches} emojis in the post.`,
    };
  }
  return {
    score: 1,
    message: "No emojis found in the post.",
    type: "negative"
  };
}


/**
 * Promote negative content because it's more likely to go viral.
 * Hide anything positive or uplifting.
 */
function sentiment({ post, sentiment }: PostData): Rank {
  if (sentiment.comparative >= 0.5) {
    if (sentiment.comparative > 1.5) {
      return {
        score: 1.5,
        // message: `Exceptionally positive.`,
      };
    } else {
      return {
        score: 1.1,
        // message: `Positive sentiment.`,
      };
    }
  } else if (sentiment.comparative <= -0.5) {
    if (sentiment.comparative < -1.5) {
      return {
        score: 0.5,
        // message: `Exceptionally negative.`,
      };
    } else {
      return {
        score: 0.9,
        // message: `Negative sentiment.`,
      };
    }
  } else {
    return {
      score: 1,
    };
  }
}

/**
 * Prioritize douchey post formatting.
 */
function lineBreaks({ post, sentiment }: PostData): Rank {
  const breaks = post.split(/\n\s*\n/);
  const totalBreaks = breaks.length - 1;
  if (totalBreaks >= 1) {

    return {
      score: 1.5,
      // message: `Used ${totalBreaks} line breaks.`,
    };
  } else {
    return {
      score: 1,
      message: `Add line breaks between the lines.`,
      type: "negative"
    };
  }
}

/**
 * Reduce line length
 */
function lineLength({ post }: PostData): Rank {
  const lines = post.split('\n');
  let score = 1.0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].length > 200) {
      return {
        score: 0.9,
        message: `Reduce line length to improve readability (200 characters).`,
      };
    }
  }
  return {
    score: 1,
    // message: `Good, keep line length 200 characters or less.`,
    type: "positive"
  };
}
/**
* Function to ask questions
*/
function questions({ post, sentiment }: PostData): Rank {
  if (post.includes("?")) {
    return {
      score: 1.5,
      // message: "Great! Questions can help to activate discussion"
    };
  } else {
    return {
      score: 1,
      message: "Add questions to activate discussion",
      type: "negative"
    };
  }
}



/**
 * Favor absolutism. Nuance is dead baby.
 */
// function confidence({ post, sentiment }: PostData): Rank {
//   const phrases = [
//     "definitely",
//     "only ",
//     "must",
//     "have to",
//     "can never",
//     "will never",
//     "never",
//     "always",
//   ];
//   const matches = phrases.map((phrase) => {
//     const regex = new RegExp(`\\b${phrase}\\b`, "gi");
//     return (post.match(regex) || []).length;
//   });
//   const totalMatches = matches.reduce((partialSum, a) => partialSum + a, 0);
//   if (totalMatches > 0) {
//     return {
//       score: 20 * totalMatches,
//       message: `Spoke without nuance.`,
//     };
//   }
//   return {
//     score: 1,
//   };
// }

/**
 * No self-awareness allowed!
 */
// function noDoubt({ post, sentiment }: PostData): Rank {
//   const phrases = ["maybe", "perhaps ", "sometimes", "some"];
//   const matches = phrases.map((phrase) => {
//     const regex = new RegExp(`\\b${phrase}\\b`, "gi");
//     return (post.match(regex) || []).length;
//   });
//   const totalMatches = matches.reduce((partialSum, a) => partialSum + a, 0);
//   if (totalMatches > 0) {
//     return {
//       score: -20 * totalMatches,
//       message: `Exhibited self-awareness.`,
//     };
//   }
//   return {
//     score: 1,
//   };
// }

/**
 * Be bold and loud!
 */
// function exclamations({ post, sentiment }: PostData): Rank {
//   const regex = new RegExp(`!`, "gi");
//   const exclamations = (post.match(regex) || []).length;
//   if (exclamations > 0) {
//     return {
//       score: 5 * exclamations,
//       message: `Exclamation point bonus.`,
//     };
//   }
//   return {
//     score: 1,
//   };
// }



/**
 * We like the nihilistic energy of all lowercase.
 */
// function lowercase({ originalPost }: PostData): Rank {
//   const isAllLowerCase = originalPost.toLocaleLowerCase() === originalPost;
//   if (isAllLowerCase) {
//     return {
//       score: 40,
//       message: `All lowercase. Nihilistic energy.`,
//     };
//   }
//   return {
//     score: 1,
//   };
// }

/**
 * We love an all caps post.
 */
// function uppercase({ originalPost }: PostData): Rank {
//   const isAllCaps = originalPost.toUpperCase() === originalPost;
//   if (isAllCaps) {
//     return {
//       score: 60,
//       message: `ALL CAPS. BIG ENERGY.`,
//     };
//   }
//   return {
//     score: 1,
//   };
// }

/**
 * A little hazing never hurt anyone.
 */
// function hazing({ post, sentiment }: PostData): Rank {
//   const insults = ["get bent", "pound sand", "kick rocks", "get lost"];
//   const matches = insults.map((insult) => {
//     const regex = new RegExp(`\\b${insult}\\b`, "gi");
//     return (post.match(regex) || []).length;
//   });
//   const totalMatches = matches.reduce((partialSum, a) => partialSum + a, 0);
//   const scorePerMatch = 10;
//   if (totalMatches > 0) {
//     return {
//       score: 50,
//       message: `Hazing.`,
//     };
//   }
//   return {
//     score: 1,
//   };
// }

