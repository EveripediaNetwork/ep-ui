import { Activity } from '@/types/ActivityDataType'

const randomWikiTitles: string[] = [
  "The Hitchhiker's Guide to the Galaxy",
  'Mexican Revolution',
  "Einstein's Theory of Relativity",
  'Romeo and Juliet',
  'Socrates',
  'The Great Gatsby',
  'The Lord of the Rings',
  'Vincent van Gogh',
  'The Da Vinci Code',
  'Leonardo da Vinci',
  'The Three Musketeers',
  'The Lord of the Rings',
  'Queen Elizabeth II',
  'The Three Musketeers',
  'King George VI of the United Kingdom',
]

export const ActivityData: Activity[] = [
  ...Array(50)
    .fill(0)
    .map(() => ({
      id: Math.random().toString(),
      wikiImg: `https://picsum.photos/seed/${Math.random() * 100000}/300/300`,
      title:
        randomWikiTitles[Math.floor(Math.random() * randomWikiTitles.length)],
      brief:
        'Ut pharetra ipsum eget elit finibus, in luctus nibh varius. In lacinia nisl ornare dui aliquet tempus nec et massa. Morbi dolor lorem, maximus quis erat quis, ultrices auctor eros.',
      editor: 'John Doe',
      wordsChanged: Math.floor(Math.random() * 1000) + 100,
      percentChanged: parseFloat(Math.random().toFixed(2)),
      isFirstEdit: Math.random() > 0.5,
      lastModTimeStamp: new Date(
        new Date().valueOf() -
          Math.floor(Math.random() * (12 * 3600 * 1000)) +
          1,
      ).toISOString(),
    })),
]
