import React from "react";

const avatars = [
  {
    imageUrl: "https://avatars.githubusercontent.com/u/16860528",
    profileUrl: "https://github.com/dillionverma",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/20110627",
    profileUrl: "https://github.com/tomonarifeehan",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/106103625",
    profileUrl: "https://github.com/BankkRoll",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/59228569",
    profileUrl: "https://github.com/safethecode",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/59442788",
    profileUrl: "https://github.com/sanjay-mali",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/89768406",
    profileUrl: "https://github.com/itsarghyadas",
  },
];

const reviews = [
  {
    name: "priya",
    
    body: "I've never seen anything like this before. It's amazing. I love it.",
    avatars: avatars.slice(0, 3),
    count: 12
  },
  {
    name: "ramkumar",
    
    body: "super quality and packing.",
    avatars: avatars.slice(1, 4),
    count: 45
  },
  {
    name: "vetri",
    
    body: ". I love it.",
    avatars: avatars.slice(2, 5),
    count: 28
  },
  {
    name: "kamal",
    
    body: "I'm at a loss for words. This is amazing. I love it.",
    avatars: avatars.slice(3, 6),
    count: 99
  },
  {
    name: "ranjit",
    
    body: "feels the tradition.",
    avatars: [avatars[5], avatars[0], avatars[1]],
    count: 15
  },
  {
    name: "rajesh",
    
    body: "the product were got on time.",
    avatars: [avatars[4], avatars[2], avatars[0]],
    count: 67
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const AvatarCircles = ({ numPeople, avatarUrls }) => {
  return (
    <div className="flex -space-x-3 overflow-hidden">
      {avatarUrls.map((avatar, i) => (
        <img
          key={avatar.imageUrl}
          className="inline-block h-8 w-8 rounded-full border-2 border-white object-cover"
          src={avatar.imageUrl}
          alt={`Avatar ${i}`}
        />
      ))}
      {numPeople > 0 && (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6b1f0e] text-[10px] font-black text-white border-2 border-white">
          +{numPeople}
        </div>
      )}
    </div>
  );
};

const ReviewCard = ({ name, username, body, avatars, count }) => {
  return (
    <figure
      className="relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 border-gray-950/[.1] bg-white/[0.4] backdrop-blur-sm hover:bg-white/[0.6] transition-all duration-300"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <AvatarCircles numPeople={count} avatarUrls={avatars} />
          <div className="flex flex-col items-end">
            <figcaption className="text-sm font-black text-[#6b1f0e]">
              {name}
            </figcaption>
            <p className="text-[10px] font-bold text-[#6b1f0e]/40">{username}</p>
          </div>
        </div>
        <blockquote className="text-xs text-[#6b1f0e]/80 leading-relaxed font-medium">
          "{body}"
        </blockquote>
      </div>
    </figure>
  );
};

const CustomerFeedback = () => {
  return (
    <section className="py-20 bg-[#fdfbf7] overflow-hidden border-t border-black/5">
      <div className="max-w-7xl mx-auto px-4 mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-serif text-[#4a332a] mb-4"> What our Customer Say's </h2>
        <div className="w-24 h-1 bg-[#4a332a]/10 mx-auto rounded-full mb-6"></div>
        <p className="text-[#6b4f44]/60 font-medium uppercase tracking-[0.2em] text-xs">Stories of Delight</p>
      </div>

      <div className="max-w-6xl mx-auto px-10">
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-8">
          {/* First Row */}
          <div className="flex overflow-hidden group mb-4">
            <div className="flex animate-[marquee_30s_linear_infinite] gap-4 py-4 group-hover:[animation-play-state:paused]">
              {firstRow.map((review, idx) => (
                <ReviewCard key={`row1-${review.name}-${idx}`} {...review} />
              ))}
              {/* Duplicate for seamless loop */}
              {firstRow.map((review, idx) => (
                <ReviewCard key={`row1-${review.name}-${idx}-dup`} {...review} />
              ))}
            </div>
          </div>

          {/* Second Row (Reverse) */}
          <div className="flex overflow-hidden group">
            <div className="flex animate-[marquee_30s_linear_infinite] [animation-direction:reverse] gap-4 py-4 group-hover:[animation-play-state:paused]">
              {secondRow.map((review, idx) => (
                <ReviewCard key={`row2-${review.name}-${idx}`} {...review} />
              ))}
              {/* Duplicate for seamless loop */}
              {secondRow.map((review, idx) => (
                <ReviewCard key={`row2-${review.name}-${idx}-dup`} {...review} />
              ))}
            </div>
          </div>

          {/* Gradient Fades for a premium look, matching the section background */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#fdfbf7] via-[#fdfbf7]/40 to-transparent z-10"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-[#fdfbf7] via-[#fdfbf7]/40 to-transparent z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default CustomerFeedback;
