import { NextResponse } from 'next/server';

const sentences = [
  'The sun was shining brightly as we walked along the sandy beach, enjoying the fresh ocean breeze together.',
  'She spent the entire afternoon reading an exciting novel while sipping a warm cup of herbal tea.',
  'The little boy ran joyfully through the green fields, chasing butterflies with his younger sister by his side.',
  'We decided to go hiking up the tallest mountain in the region to watch the sunrise from the top.',
  'He carefully painted a beautiful landscape of the countryside, using his favorite shades of blue and green.',
  'The cat curled up next to the fireplace, purring softly as it enjoyed the warmth of the burning logs.',
  'After a long day at work, she relaxed on the couch and listened to her favorite music on repeat.',
  'They gathered around the campfire, roasting marshmallows and sharing ghost stories under the starry sky.',
  "The chef prepared an exquisite meal using only the freshest ingredients from the local farmer's market.",
  'He practiced his piano skills every evening, hoping to perform a beautiful song at the school concert.',
  'The children played joyfully in the park, laughing and running as they took turns on the swings.',
  'She wrote a heartfelt letter to her best friend, expressing gratitude for years of unconditional support.',
  'The old library was filled with the scent of antique books, creating a nostalgic and peaceful atmosphere.',
  'We enjoyed a scenic road trip along the coastline, stopping at small villages to explore their charm.',
  'The dog wagged its tail excitedly when it saw its owner return home after a long business trip.',
  'He spent hours solving a complex puzzle, determined to complete it without any external help.',
  'The festival was filled with colorful decorations, live music, and delicious food from around the world.',
  'She planted a variety of flowers in her backyard, hoping to create a vibrant and peaceful garden.',
  'The airplane soared high above the clouds, giving passengers a breathtaking view of the vast sky.',
  'He carefully built a treehouse for his kids, ensuring they had a safe place to play and dream.',
  'The students worked together on a science project, excited to present their findings to the class.',
  'We watched the sunset over the horizon, feeling grateful for the beauty of nature surrounding us.',
  'The detective examined every clue carefully, determined to solve the mysterious case before nightfall.',
  'She spent the morning baking chocolate chip cookies, filling the house with a delightful aroma.',
  'The little girl made a wish upon a shooting star, hoping for her dreams to come true one day.',
  'The sun shines brightly in the morning.',
  'She loves reading books about adventure.',
  'A cat sleeps peacefully on the couch.',
  'The wind blows gently through the trees.',
  'He enjoys playing basketball with friends.',
  'They traveled to a beautiful island yesterday.',
  'The baby laughed at the funny clown.',
  'We watched a movie at the theater.',
  'She baked a delicious cake for dinner.',
  'He studies hard for his final exams.',
  'The flowers bloom beautifully in springtime.',
  'A dog barked loudly in the backyard.',
  'They danced happily at the wedding party.',
  'He writes stories about magical worlds.',
  'The waves crash softly on the shore.',
  'She painted a picture of the sunset.',
  'We walked along the quiet riverbank.',
  'He plays guitar in a rock band.',
  'The stars sparkle brightly in the sky.',
  'A butterfly landed on my shoulder.',
  'She dreams of traveling the whole world.',
  'He bought a new bicycle last week.',
  'The birds sing sweetly in the morning.',
  'They built a treehouse in the forest.',
  'She teaches music to young children.',
];

const sections = [
  'Introduction',
  'Key Feature',
  'Highlight',
  'Demonstration',
  'Captivating',
  'Educational',
  'Conclusion',
];

const MAX_SENTENCES = 20;
const length = [30, 60, 120, 180];

function getRandomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getVideoLength() {
  return length[getRandomBetween(0, length.length - 1)];
}

function minVideoInterval(videoLength: number) {
  const baseInterval = Math.floor(videoLength / 100);
  return getRandomBetween(baseInterval, baseInterval * 6);
}

function getSections(videoLength: number, startTime: number) {
  const percentage = Math.floor((startTime / videoLength) * 100);
  if (percentage < 15) {
    return sections[0];
  }
  if (percentage < 80) {
    return sections[getRandomBetween(1, 5)];
  }
  return sections[6];
}

// 使用 Fisher-Yates Shuffle 來打亂 sentences
function shuffleArray(array: string[]) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export async function GET() {
  let startTime = 0;
  const highlightVideoLength = getVideoLength();
  const minInterval = Math.floor(highlightVideoLength / 100);
  const shuffledSentences = shuffleArray(sentences);
  const highlightSentences = [];

  for (
    let i = 0;
    i < MAX_SENTENCES && startTime + minInterval * 2 < highlightVideoLength;
    i++
  ) {
    highlightSentences.push({
      id: i.toString(),
      startTime,
      length: getRandomBetween(2, 7),
      sentence: shuffledSentences[i % shuffledSentences.length], // 確保不超出範圍
      section: getSections(highlightVideoLength, startTime),
    });

    startTime +=
      1 + highlightSentences[i].length + minVideoInterval(highlightVideoLength);
  }
  return NextResponse.json({
    highlightVideoLength,
    highlightSentences,
  });
}
