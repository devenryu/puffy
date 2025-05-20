
export type TimelineItem = {
  year: string
  title: string
  description: string
  // Direct Instagram link for clickable images
  instagramLink: string
  // Image from public directory
  fallbackImage: string
}

export const timelineItems: TimelineItem[] = [
  {
    year: "The Beginning",
    title: "A Sweet Start",
    description:
      "What started as a fun way to share baking moments turned into a love letter to sugar, spice, and everything puffed just right.",
    instagramLink: "https://www.instagram.com/p/DGizdDJtzgR/?igsh=NW1oNDFuOTJ0YzZ2",
    fallbackImage: "/timeline1.jpg",
  },
  {
    year: "The Journey",
    title: "Baking with Heart",
    description:
      "At Puffistery, baking isn't just a hobby — it's pure joy. Every cupcake swirl, every caramel drizzle, every flaky crust is made with heart and a sprinkle of magic.",
    instagramLink: "https://www.instagram.com/p/DEA5M4dNGOA/?igsh=YWIwdDRvb21hb2o5",
    fallbackImage: "/timeline2.jpg",
  },
  {
    year: "The Mission",
    title: "Connecting Through Sweets",
    description:
      "We believe desserts should bring smiles, spark creativity, and connect people — one sweet bite at a time.",
    instagramLink: "https://www.instagram.com/p/DFYH1y0NC4i/?img_index=2&igsh=MXFsZDB2cTNpcjdvaw==",
    fallbackImage: "/timeline3.jpg",
  },
]

// Instructions:
// 1. The timeline now uses local images from the public directory (timeline1.jpg through timeline4.jpg)
// 2. Each image is clickable and links to the associated Instagram post
// 3. Feel free to update the year, title, and description for each timeline item
// 4. Add more timeline items if needed by following the same format
