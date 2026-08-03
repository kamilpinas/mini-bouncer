import type { SoftPlay } from "../types"

export const softPlayOptions: SoftPlay[] = [
  {
    id: "prestige-beige",
    name: "The Prestige Beige Setup",
    slug: "prestige-beige-setup",
    price: "$650",
    description:
      "The ultimate beige experience, featuring a mini trampoline and bridge for the most active little ones.",
    includes: [
      "6ft ball pit",
      "White balls + custom color included",
      "Bridge",
      "Hoppers",
      "Soft car",
      "Soft rocker",
      "Mini trampoline",
      "Tunnel",
      "Foam mats",
      "White safety fence",
    ],
    spaceRequired: "20' x 10'",
    img: "soft-6.jpg",
  },
  {
    id: "luxe-white",
    name: "The Luxe White Setup",
    slug: "luxe-white-setup",
    price: "$550",
    description:
      "A larger soft play setup designed for even more fun while keeping the same clean and elegant look.",
    includes: [
      "8ft ball pit",
      "White balls with custom color accents included",
      "Soft rocker",
      "Soft car",
      "Soft play blocks",
      "Tunnel",
      "Slide",
      "Premium foam flooring",
      "White safety fence",
    ],
    spaceRequired: "16.5' x 13.5'",
    img: "soft-3.jpeg",
  },
  {
    id: "luxe-beige",
    name: "The Luxe Beige Setup",
    slug: "luxe-beige-setup",
    price: "$550",
    description:
      "Our luxurious beige setup offers an expansive play area with premium items like the play bridge.",
    includes: [
      "6ft ball pit",
      "White balls + custom color included",
      "Bridge",
      "Hoppers",
      "Soft car",
      "Soft rocker",
      "Tunnel",
      "Foam mats",
      "White safety fence",
    ],
    spaceRequired: "20' x 10'",
    img: "soft-5.jpg",
  },
  {
    id: "signature-white",
    name: "The Signature White Setup",
    slug: "signature-white-setup",
    price: "$475",
    description:
      "A modern and timeless soft play setup designed to fit beautifully into any celebration.",
    includes: [
      "6ft round ball pit",
      "White balls with custom color accents",
      "2 hoppers",
      "Soft rocker",
      "Soft car",
      "Soft play blocks",
      "Tunnel",
      "Slide",
      "Foam mats",
      "White safety fence",
    ],
    spaceRequired: "16.5' x 10'",
    img: "soft-1.jpeg",
  },
  {
    id: "signature-beige",
    name: "The Signature Beige Setup",
    slug: "signature-beige-setup",
    price: "$435",
    description:
      "A warm and sophisticated beige-themed soft play setup that brings a touch of neutral elegance to your event.",
    includes: [
      "5ft ball pit with steps",
      "White balls + custom color included",
      "Tunnel",
      "Soft car",
      "Soft rocker",
      "Balance ball",
      "Hoppers",
      "Soft play blocks",
      "Foam mats",
      "White safety fence",
    ],
    spaceRequired: "13.5' x 10'",
    img: "soft-4.jpg",
  },
  {
    id: "essential-beige",
    name: "The Essential Beige Setup",
    slug: "essential-beige-setup",
    price: "$400",
    description:
      "A charming and cozy beige soft play setup with a signature bunny tunnel and classic play elements, perfect for an intimate celebration.",
    includes: [
      "Round ball pit",
      "White balls with custom color accents",
      "Bunny tunnel",
      "Soft rocker",
      "Soft play blocks",
      "Steps",
      "Foam mats",
      "White safety fence",
    ],
    spaceRequired: "13.5' x 10'",
    img: "soft-7.jpg",
  },
  {
    id: "mini-play",
    name: "The Mini Play Setup",
    slug: "mini-play-setup",
    price: "$350",
    description:
      "A simple and fun setup that's perfect on its own or as an add-on to any celebration.",
    includes: [
      "8ft ball pit",
      "White balls with custom color accents available",
      "Slide",
      "Foam mat",
    ],
    spaceRequired: "10' x 10'",
    img: "soft-2.jpeg",
  },
]

export const softPlayAddons = [
  { name: "Trampoline", price: "$100", img: "addon-1.jpg" },
  { name: "Slide", price: "$25", img: "addon-2.jpg" },
]

export const softPlayBundle = {
  title: "BUNDLE & SAVE",
  description:
    "Book any soft play setup with a bounce house and receive $75 OFF.",
}
