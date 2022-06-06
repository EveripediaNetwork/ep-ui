export const SAMPLE_BLOG_POSTS = [
  {
    title:
      'BrainDAO has Acquired Bored Ape #9665! The BrainDAO Ape will lead BrainDAO BrainDAO has Acquired Bored Ape #9665!',
    desccription:
      'Congratulations you now own a Bored Ape! Bored Ape #9665 is now owned by every IQ holder and his future will be decided by IQ holders through e #9665 is now owned by every IQ holder and his future will be decided by IQ holders through',
    image_url: '/blog-image-2.jpeg',
    date: 'April 15, 2022',
    slug: 'post-slug',
  },
  {
    title: 'IQ Monthly News - January 2022',
    desccription:
      'It’s time for the January edition of IQ Monthly News which covers IQ token news, growth, partnerships, and more. Everipedia and Zipcy raffled off 15 Zipcy’s SuperNormal NFTs to come and do something else',
    image_url: '/blog-image-3.png',
    date: 'April 15, 2022',
    slug: 'post-slug',
  },
  {
    title:
      'IQ Stakers have Won Over $120,000 Worth of Zipcy’s SuperNormal NFTs by Staking some other different things',
    desccription:
      "Everipedia and Zipcy’s SuperNomal raffled off 15 Zipcy’s SuperNormal NFTs worth over $120,000 to HiIQ stakers using Chainlink VRF on Polygon to celebrate Korean Seollal and nigerian stuff Ion kn'bout",
    image_url: '/blog-image-1.jpeg',
    date: 'April 15, 2022',
    slug: 'post-slug',
  },
]

export type BlogPost = typeof SAMPLE_BLOG_POSTS[number]

const ROWS = 2

const SHUFFLED_SAMPLE = SAMPLE_BLOG_POSTS.sort(() => 0.5 - Math.random())

export const BLOG_POSTS = Array(ROWS).fill(SHUFFLED_SAMPLE).flat()
