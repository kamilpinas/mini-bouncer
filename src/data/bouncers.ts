import type { Bouncer } from "../types"

export const bouncers: Bouncer[] = [
  {
    id: "mini-ball-pit",
    name: "Mini with Ball Pit",
    slug: "mini-with-ball-pit",
    description:
      "The perfect toddler play space combining a jumping area with a built-in ball pit. Colors of balls are included and customized to fit your party's theme.",
    features: ["Ages 1-5", "Indoor/Outdoor", "8ft x 14.6ft", "Custom ball colors"],
    ageRange: "1-5",
    size: "8ft x 14.6ft",
    setting: "Indoor/Outdoor",
    img: "mini_with_balls.jpg",
    pricing: {
      fourHours: "$300",
      sixHours: "$350",
    },
  },
  {
    id: "mini-slide",
    name: "Mini with Slide",
    slug: "mini-with-slide",
    description:
      "Compact and exciting, this mini bouncer features an integrated slide designed specifically for little adventurers playing in smaller indoor or outdoor spaces.",
    features: ["Ages 1-5", "Indoor/Outdoor", "8ft x 11ft"],
    ageRange: "1-5",
    size: "8ft x 11ft",
    setting: "Indoor/Outdoor",
    img: "mini_with_slide.jpg",
    pricing: {
      fourHours: "$200",
      sixHours: "$250",
    },
  },
  {
    id: "big-slide",
    name: "Big with Slide",
    slug: "big-with-slide",
    description:
      "A grand party centerpiece featuring a large bounce area and attached slide, providing plenty of room for active big-kid fun and excitement.",
    features: ["Ages 3+", "Outdoor Preferred", "13ft x 16.5ft"],
    ageRange: "3+",
    size: "13ft x 16.5ft",
    setting: "Outdoor Preferred",
    img: "big_with_slide.jpg",
    pricing: {
      fourHours: "$400",
      sixHours: "$450",
    },
  },
  {
    id: "classic-white",
    name: "Classic White",
    slug: "classic-white",
    description:
      "Elegant and timeless, this spacious square bouncer serves as the perfect chic backdrop for your custom party decor, colorful balloons, and floral arrangements.",
    features: ["Ages 3+", "Outdoor Preferred", "13ft x 13ft"],
    ageRange: "3+",
    size: "13ft x 13ft",
    setting: "Outdoor Preferred",
    img: "classic_white.jpg",
    pricing: {
      fourHours: "$300",
      sixHours: "$350",
    },
  },
]
