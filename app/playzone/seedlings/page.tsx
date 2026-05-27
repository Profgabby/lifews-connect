"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// ─── DIFFICULTY POINTS ────────────────────────────────────────────
const DIFF_PTS = { Easy: 5, Medium: 10, Hard: 15 };

// ─── CATEGORIES ───────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: "garden-explorers", emoji: "🌱", name: "Garden Explorers",
    color: "#2D6A2D", bg: "#f0f7ec", border: "#b8dba8",
    desc: "Discover seeds, plants, and the magic of growing things.",
    games: [
      { id: "seed-to-plant",       name: "Seed to Plant Story Line", emoji: "🌿", difficulty: "Easy"   as const, desc: "Put the plant growth stages in the right order.", locked: false },
      { id: "meet-the-seed",       name: "Meet the Seed",            emoji: "🌰", difficulty: "Easy"   as const, desc: "Learn to identify seeds and how they grow.",       locked: false },
      { id: "water-the-garden",    name: "Water the Garden",         emoji: "💧", difficulty: "Medium" as const, desc: "Tap to water the right plants before they dry out!", locked: false },
      { id: "colour-the-garden",   name: "Colour the Garden",        emoji: "🎨", difficulty: "Medium" as const, desc: "Colour plants, flowers, and vegetables correctly.", locked: false },
      { id: "who-lives-in-garden", name: "Who Lives in the Garden?", emoji: "🐛", difficulty: "Hard"   as const, desc: "Match garden animals to where they live.",           locked: false },
    ],
  },
  {
    id: "nature-friends", emoji: "🦋", name: "Nature Friends",
    color: "#185FA5", bg: "#e6f1fb", border: "#b5d4f4",
    desc: "Explore the natural world — big, small, sunny, and rainy.",
    games: [
      { id: "big-or-small",   name: "Big or Small?",     emoji: "🌳", difficulty: "Easy"   as const, desc: "Sort trees, seeds, and leaves by size.",           locked: false },
      { id: "sunny-or-rainy", name: "Sunny or Rainy?",   emoji: "☀️", difficulty: "Easy"   as const, desc: "Sort weather pictures into sunny and rainy groups.", locked: false },
      { id: "find-the-leaf",  name: "Find the Leaf",     emoji: "🍃", difficulty: "Medium" as const, desc: "Match leaf shapes to the right trees.",             locked: false },
      { id: "count-flowers",  name: "Count the Flowers", emoji: "🌸", difficulty: "Medium" as const, desc: "Count flowers from 1 to 10.",                       locked: false },
      { id: "nature-sounds",  name: "Nature Sounds",     emoji: "🎵", difficulty: "Hard"   as const, desc: "Match nature sounds — birds, rain, wind.",          locked: false },
    ],
  },
  {
    id: "food-and-eating", emoji: "🍎", name: "Food & Eating",
    color: "#854F0B", bg: "#faeeda", border: "#fac775",
    desc: "Learn where food comes from and what makes us healthy.",
    games: [
      { id: "name-that-fruit",    name: "Name That Fruit",            emoji: "🍌", difficulty: "Easy"   as const, desc: "Identify fruits from pictures.",                  locked: false },
      { id: "pick-the-vegetable", name: "Pick the Vegetable",         emoji: "🥕", difficulty: "Easy"   as const, desc: "Drag vegetables into the basket.",                locked: false },
      { id: "where-food-comes",   name: "Where Does Food Come From?", emoji: "🚜", difficulty: "Medium" as const, desc: "Match food to where it grows.",                   locked: false },
      { id: "yummy-or-yucky",     name: "Yummy or Yucky?",            emoji: "😋", difficulty: "Medium" as const, desc: "Sort healthy foods from unhealthy ones.",         locked: false },
      { id: "grow-your-plate",    name: "Grow Your Plate",            emoji: "🥗", difficulty: "Hard"   as const, desc: "Arrange a balanced meal on your plate.",          locked: false },
    ],
  },
  {
    id: "earth-and-water", emoji: "💧", name: "Earth & Water",
    color: "#534AB7", bg: "#eeedfe", border: "#cecbf6",
    desc: "Save water, clean up, and use sun power.",
    games: [
      { id: "save-the-drop",     name: "Save the Drop",             emoji: "💧", difficulty: "Easy"   as const, desc: "Collect raindrops — don't waste them!",        locked: false },
      { id: "clean-or-dirty",    name: "Clean or Dirty?",           emoji: "🗑️", difficulty: "Easy"   as const, desc: "Sort rubbish and clean items into the right bins.", locked: false },
      { id: "where-water-comes", name: "Where Does Water Come From?",emoji: "🌊", difficulty: "Medium" as const, desc: "Trace the simple water cycle.",                 locked: false },
      { id: "help-the-fish",     name: "Help the Fish",             emoji: "🐟", difficulty: "Medium" as const, desc: "Remove litter from the river.",                 locked: false },
      { id: "sun-power",         name: "Sun Power",                 emoji: "☀️", difficulty: "Hard"   as const, desc: "Match solar-powered items to the sun.",         locked: false },
    ],
  },
  {
    id: "french-garden", emoji: "🇫🇷", name: "French Garden",
    color: "#8B1A1A", bg: "#fdf0f0", border: "#f5b8b8",
    desc: "Learn garden, nature, and food words in French!",
    games: [
      { id: "les-legumes",     name: "Les Légumes",            emoji: "🥦", difficulty: "Easy"   as const, desc: "Name vegetables in French.",          locked: false },
      { id: "couleurs-jardin", name: "Les Couleurs du Jardin", emoji: "🌈", difficulty: "Easy"   as const, desc: "Label garden colours in French.",      locked: false },
      { id: "soleil-pluie",    name: "Le Soleil et la Pluie",  emoji: "🌦️", difficulty: "Medium" as const, desc: "Say sun or rain in French.",          locked: false },
      { id: "compte-graines",  name: "Compte les Graines",     emoji: "🔢", difficulty: "Medium" as const, desc: "Count seeds in French.",              locked: false },
      { id: "mon-jardin",      name: "Mon Jardin",             emoji: "🏡", difficulty: "Hard"   as const, desc: "Build your garden and label in French.", locked: false },
    ],
  },
];

// ─── GAME QUESTIONS: 30 per game ─────────────────────────────────
// Each game has 3 stages:
//   Stage 1 (Q1–10):  Text questions
//   Stage 2 (Q11–20): Puzzle / fill-in / ordering
//   Stage 3 (Q21–30): Picture prompts / problem-solving

type Question = { q: string; options: string[]; correct: string; stage: 1|2|3; image?: string; hint: string; };

const GAME_QUESTIONS: Record<string, Question[]> = {

  "seed-to-plant": [
    // Stage 1: Text
    { stage:1, q:"What do we plant in the ground to grow a plant?",         options:["A rock","A seed","A stick"],                    correct:"A seed",              image:"🌰", hint:"Seeds are tiny but full of life!" },
    { stage:1, q:"What does a seed need to start growing?",                 options:["Ice cream","Water and sunlight","Television"],  correct:"Water and sunlight",  image:"☀️💧", hint:"Plants love sun and water!" },
    { stage:1, q:"What is the tiny first shoot called when a seed grows?",  options:["A flower","A sprout","A fruit"],                correct:"A sprout",            image:"🌱", hint:"It pokes out of the soil first." },
    { stage:1, q:"Where does a seed grow?",                                 options:["In water only","In soil","In the sky"],         correct:"In soil",             image:"🪱", hint:"Soil has nutrients that feed the seed." },
    { stage:1, q:"Which part of the plant holds it in the ground?",         options:["Leaf","Root","Flower"],                         correct:"Root",                image:"🌿", hint:"Roots go underground." },
    { stage:1, q:"What do leaves do for a plant?",                          options:["Make fruit only","Help make food using sunlight","Store water only"], correct:"Help make food using sunlight", image:"🍃", hint:"Leaves use sunlight to make food!" },
    { stage:1, q:"What colour are most healthy plant leaves?",              options:["Brown","Blue","Green"],                         correct:"Green",               image:"🌿", hint:"Chlorophyll makes leaves green!" },
    { stage:1, q:"What happens when a plant does not get water?",           options:["It grows faster","It wilts and dies","It turns blue"], correct:"It wilts and dies", image:"🥀", hint:"Water is like food for plants." },
    { stage:1, q:"Which part of the plant grows above the ground?",         options:["Root","Stem","Neither"],                        correct:"Stem",                image:"🌱", hint:"The stem holds the plant up tall." },
    { stage:1, q:"What do we call the colourful part that attracts bees?",  options:["Root","Flower","Seed"],                         correct:"Flower",              image:"🌸", hint:"Bees love visiting flowers!" },
    // Stage 2: Puzzle/Ordering
    { stage:2, q:"Put in order: 🌳 → 🌱 → 🌰. Is this correct?",           options:["Yes, correct!","No, wrong order"],              correct:"No, wrong order",     image:"🌰🌱🌳", hint:"Think: what comes first — seed, sprout, or tree?" },
    { stage:2, q:"What is MISSING? Seed → ___ → Big plant",                options:["Flower","Sprout","Fruit"],                      correct:"Sprout",              image:"🌰 ❓ 🌳", hint:"Something small and green comes in the middle." },
    { stage:2, q:"Which comes FIRST in plant growth?",                      options:["Fruit","Flower","Seed"],                        correct:"Seed",                image:"🌰🌸🍎", hint:"Every plant starts as a tiny seed!" },
    { stage:2, q:"How many things does a plant need to grow? (Sun, Water, Soil)", options:["1","2","3"],                             correct:"3",                   image:"☀️💧🪱", hint:"Sun + Water + Soil = Happy plant!" },
    { stage:2, q:"A plant has: Root, Stem, Leaf, Flower. Which is underground?", options:["Stem","Leaf","Root"],                    correct:"Root",                image:"🌿", hint:"Roots go DOWN into the soil." },
    { stage:2, q:"Fill in: A seed grows into a ___",                        options:["Rock","Plant","Cloud"],                        correct:"Plant",               image:"🌰➡️❓", hint:"Seeds always grow into plants!" },
    { stage:2, q:"Which plant part comes AFTER the flower?",                options:["Root","Fruit","Stem"],                         correct:"Fruit",               image:"🌸➡️❓", hint:"After the flower… something yummy grows!" },
    { stage:2, q:"A sunflower seed becomes a ___",                          options:["Rose","Sunflower","Cactus"],                   correct:"Sunflower",           image:"🌻", hint:"The same type of plant always grows from its seed!" },
    { stage:2, q:"Arrange: What comes LAST? Seed, Sprout, Plant, Fruit",    options:["Sprout","Plant","Fruit"],                      correct:"Fruit",               image:"🍎", hint:"Fruits and seeds come at the very end." },
    { stage:2, q:"True or False: A plant CAN grow without soil",            options:["True","False","Sometimes"],                    correct:"True",                image:"💧🌱", hint:"Some plants grow in water! Called hydroponics." },
    // Stage 3: Picture/Problem-solving
    { stage:3, q:"🌰 + ☀️ + 💧 = ?",                                        options:["🪨","🌱","🌊"],                                 correct:"🌱",                  image:"🌰☀️💧", hint:"Seed + Sun + Water = Sprout!" },
    { stage:3, q:"🌱 is drooping 😢. What does it need?",                   options:["More sun only","💧 Water","🪨 A rock"],         correct:"💧 Water",            image:"🥀", hint:"A drooping plant is thirsty!" },
    { stage:3, q:"Which pot will grow a healthy plant? A=Dark cupboard, B=Sunny window", options:["Pot A","Pot B","Both same"], correct:"Pot B",              image:"☀️🪟", hint:"Plants LOVE sunlight!" },
    { stage:3, q:"A seed is in DRY soil for 2 weeks. What happens?",        options:["It grows big","Nothing grows","It flies away"],  correct:"Nothing grows",      image:"🌰🏜️", hint:"No water = no growth." },
    { stage:3, q:"🌸 appears on the plant. What comes NEXT?",               options:["🌰 Seed","🍎 Fruit","🌊 Flood"],               correct:"🍎 Fruit",            image:"🌸", hint:"Flowers turn into fruits!" },
    { stage:3, q:"Fix the problem: Plant has yellow leaves. It needs ___",  options:["More darkness","More sunlight + food","More rocks"], correct:"More sunlight + food", image:"🟡🍃", hint:"Yellow leaves = not enough sunlight or nutrients." },
    { stage:3, q:"You find a seed on the ground. What do you do FIRST?",    options:["Eat it","Plant it in soil","Throw it away"],   correct:"Plant it in soil",    image:"🌰", hint:"Give it a home in the soil!" },
    { stage:3, q:"Garden A has 10 plants. Garden B has 5. Which has more?", options:["Garden A","Garden B","Same"],                  correct:"Garden A",            image:"🌿🌿", hint:"10 is more than 5." },
    { stage:3, q:"A plant grew 3 leaves in week 1 and 5 in week 2. Total leaves?", options:["6","8","10"],                          correct:"8",                   image:"🍃", hint:"3 + 5 = 8 leaves total!" },
    { stage:3, q:"🌱 needs water every 2 days. Today is Monday. Next water?", options:["Tuesday","Wednesday","Thursday"],            correct:"Wednesday",           image:"📅", hint:"Monday + 2 days = Wednesday!" },
  ],

  "save-the-drop": [
    // Stage 1: Text
    { stage:1, q:"Why is water important for plants?",                      options:["Decoration","It helps them grow","It makes them smell"], correct:"It helps them grow", image:"💧🌱", hint:"Water carries food into the plant!" },
    { stage:1, q:"What do we call water that falls from the sky?",          options:["Juice","Rain","Tears"],                        correct:"Rain",                image:"🌧️", hint:"Pitter-patter — it falls from clouds!" },
    { stage:1, q:"Which body of water is largest?",                         options:["A puddle","A lake","An ocean"],                correct:"An ocean",            image:"🌊", hint:"Oceans cover most of the Earth!" },
    { stage:1, q:"What covers most of planet Earth?",                       options:["Sand","Water","Ice cream"],                   correct:"Water",               image:"🌍", hint:"Earth is called the Blue Planet!" },
    { stage:1, q:"What do animals need water for?",                         options:["To sleep","To survive","To play games"],       correct:"To survive",          image:"🐘💧", hint:"All living things need water to live." },
    { stage:1, q:"What happens to water when it gets very hot?",            options:["It freezes","It evaporates","It disappears forever"], correct:"It evaporates", image:"♨️", hint:"Hot water turns into steam and goes into the air!" },
    { stage:1, q:"What happens to water when it gets very cold?",           options:["It boils","It freezes","It turns green"],     correct:"It freezes",          image:"🧊", hint:"Water turns to ice in the cold!" },
    { stage:1, q:"Which of these saves water?",                             options:["Long shower","Dripping tap","Short shower"],  correct:"Short shower",        image:"🚿", hint:"Short showers use much less water!" },
    { stage:1, q:"Where do rivers end up?",                                 options:["In space","In the ocean","In the garden"],    correct:"In the ocean",        image:"🏞️", hint:"Rivers flow downhill to the sea!" },
    { stage:1, q:"What do clouds hold?",                                    options:["Candy floss","Water droplets","Wind"],        correct:"Water droplets",       image:"☁️", hint:"Clouds are made of tiny water drops!" },
    // Stage 2: Puzzle
    { stage:2, q:"Fill in: Water ☁️ → Rain 🌧️ → River 🏞️ → ___",         options:["🌳 Tree","🌊 Ocean","🏔️ Mountain"],           correct:"🌊 Ocean",            image:"🌧️➡️🌊", hint:"Rivers flow into the ocean!" },
    { stage:2, q:"Which uses MORE water? A=Brush teeth with tap ON. B=Brush with tap OFF", options:["A uses more","B uses more","Same amount"], correct:"A uses more", image:"🪥", hint:"Running taps waste lots of water!" },
    { stage:2, q:"True or False: Wasting water is OK because there is always more", options:["True","False","Not sure"],           correct:"False",               image:"⚠️", hint:"Clean water is precious and can run out!" },
    { stage:2, q:"You see a dripping tap. You should ___",                  options:["Ignore it","Fix it or tell an adult","Dance around it"], correct:"Fix it or tell an adult", image:"🚿💧", hint:"Every drop counts!" },
    { stage:2, q:"Which crops need the MOST water to grow?",                options:["Cactus","Rice","Desert plants"],             correct:"Rice",                image:"🌾", hint:"Rice paddies are flooded with water!" },
    { stage:2, q:"Fill in: Rain → Ground → Underground water called ___",   options:["Groundwater","Sky water","Cloud water"],    correct:"Groundwater",         image:"🌧️➡️🪨", hint:"Water stored underground is groundwater." },
    { stage:2, q:"Order: Cloud → Rain → River → ___. What comes next?",    options:["Cloud again","Ocean","Mountain"],            correct:"Ocean",               image:"☁️🌧️🏞️", hint:"The water cycle continues!" },
    { stage:2, q:"A garden has 10 plants. Each needs 1 cup of water. How many cups total?", options:["5","10","15"],              correct:"10",                  image:"🌱×10", hint:"10 plants × 1 cup each = 10 cups!" },
    { stage:2, q:"Which holds more water? A bowl OR A cup?",                options:["A bowl","A cup","Same"],                    correct:"A bowl",              image:"🥣", hint:"A bowl is wider and deeper!" },
    { stage:2, q:"Best time to water garden plants?",                       options:["Hot midday","Morning or evening","Midnight"], correct:"Morning or evening", image:"🌅", hint:"Less water evaporates in cool hours!" },
    // Stage 3: Problem solving
    { stage:3, q:"💧 + ☀️ = ? (Water in sunlight becomes)",                options:["Ice","Steam/vapour","Mud"],                  correct:"Steam/vapour",        image:"♨️", hint:"Heat makes water evaporate!" },
    { stage:3, q:"Plant A got water. Plant B got none. After 1 week: which is bigger?", options:["A","B","Same"],               correct:"A",                   image:"🌱💧vs🌱", hint:"Water = growth!" },
    { stage:3, q:"You have 5 cups of water for 5 plants. How many cups per plant?", options:["2","1","3"],                       correct:"1",                   image:"5÷5=?", hint:"5 divided by 5 = 1 each!" },
    { stage:3, q:"A family wastes 10L of water every day. In 1 week they waste ___", options:["50L","70L","100L"],               correct:"70L",                 image:"📅×7", hint:"10L × 7 days = 70 litres!" },
    { stage:3, q:"Which is the BEST way to collect rainwater?",             options:["A paper bag","A bucket outside","Your hands"], correct:"A bucket outside", image:"🪣", hint:"Buckets collect lots of rain!" },
    { stage:3, q:"Fix it: The tap is dripping 5 drops per second. In 1 minute (60 sec)?", options:["100 drops","300 drops","600 drops"], correct:"300 drops",  image:"🚿", hint:"5 × 60 = 300 drops!" },
    { stage:3, q:"Which country has the most fresh water problems? (Hint: very dry)", options:["Amazon rainforest","Sahara desert","Scotland"], correct:"Sahara desert", image:"🏜️", hint:"Deserts have very little rain." },
    { stage:3, q:"🌧️ fell for 3 days. On day 4, the sun came out. The puddles ___", options:["Got bigger","Evaporated","Froze"], correct:"Evaporated",          image:"☀️💧", hint:"Sun heat evaporates water!" },
    { stage:3, q:"A river starts at a mountain. Does it flow UP or DOWN?",  options:["Up","Down","Sideways"],                     correct:"Down",                image:"⛰️➡️🌊", hint:"Water always flows downhill!" },
    { stage:3, q:"You collect 20L of rainwater. You use 8L. How much is LEFT?", options:["10L","12L","14L"],                     correct:"12L",                 image:"20-8=?", hint:"20 - 8 = 12 litres!" },
  ],

  "les-legumes": [
    // Stage 1: Text (French vocabulary)
    { stage:1, q:"How do you say 'carrot' in French?",          options:["Le chou","La carotte","Le maïs"],         correct:"La carotte",      image:"🥕", hint:"Ca-ROTTE — almost like English!" },
    { stage:1, q:"How do you say 'tomato' in French?",          options:["La tomate","La pomme","Le haricot"],      correct:"La tomate",       image:"🍅", hint:"La TO-mate — sounds similar!" },
    { stage:1, q:"'Le chou' means ___",                         options:["Tomato","Cabbage","Corn"],                correct:"Cabbage",         image:"🥬", hint:"Chou = Cabbage in French!" },
    { stage:1, q:"How do you say 'potato' in French?",          options:["La tomate","La pomme de terre","Le chou"], correct:"La pomme de terre", image:"🥔", hint:"Pomme de terre = apple of the earth!" },
    { stage:1, q:"'Le haricot vert' means ___",                 options:["Green pea","Green bean","Green apple"],   correct:"Green bean",      image:"🫛", hint:"Haricot = bean, vert = green!" },
    { stage:1, q:"How do you say 'onion' in French?",           options:["L'oignon","Le radis","Le maïs"],          correct:"L'oignon",        image:"🧅", hint:"L'OI-gnon — say it with a French accent!" },
    { stage:1, q:"'Le maïs' means ___",                         options:["Rice","Corn","Wheat"],                    correct:"Corn",            image:"🌽", hint:"Maïs = Corn on the cob!" },
    { stage:1, q:"How do you say 'garden' in French?",          options:["La forêt","Le jardin","La mer"],          correct:"Le jardin",       image:"🌷", hint:"Le JAR-din — a beautiful garden!" },
    { stage:1, q:"'L'eau' means ___",                           options:["Fire","Earth","Water"],                   correct:"Water",           image:"💧", hint:"L'EAU — we need it for our garden!" },
    { stage:1, q:"How do you say 'sun' in French?",             options:["La lune","Le soleil","Le vent"],          correct:"Le soleil",       image:"☀️", hint:"Le SO-leil shines bright!" },
    // Stage 2: Puzzle (French sentences + matching)
    { stage:2, q:"Match: 'La carotte' is what colour? In French: orange = ___", options:["Vert","Orange","Rouge"], correct:"Orange",          image:"🥕🟠", hint:"Orange in French is still… orange!" },
    { stage:2, q:"Fill in: 'Je mange ___ tomate' (I eat a tomato)",    options:["un","une","des"],                 correct:"une",             image:"🍅", hint:"Une = a (feminine). Tomate is feminine!" },
    { stage:2, q:"What number is 'trois' in French?",                  options:["2","3","4"],                      correct:"3",               image:"3️⃣", hint:"Un=1, Deux=2, Trois=3!" },
    { stage:2, q:"'Le jardin est vert' means ___",                     options:["The garden is big","The garden is green","The garden is small"], correct:"The garden is green", image:"🌿", hint:"Vert = green!" },
    { stage:2, q:"How do you ask 'What is this?' in French?",          options:["Bonjour!","Qu'est-ce que c'est?","Merci!"], correct:"Qu'est-ce que c'est?", image:"❓", hint:"Kess-kuh-say = What is this?" },
    { stage:2, q:"Match vegetable to French name: 🥦 = ?",            options:["Le brocoli","La carotte","Le chou"], correct:"Le brocoli",   image:"🥦", hint:"Brocoli — same in French and English!" },
    { stage:2, q:"'Cinq légumes' means ___",                           options:["5 animals","5 vegetables","5 flowers"], correct:"5 vegetables", image:"5️⃣🥕", hint:"Cinq=5, légumes=vegetables!" },
    { stage:2, q:"Translate: 'J'aime le jardin' (I ___ the garden)",  options:["hate","love","fear"],              correct:"love",            image:"❤️🌷", hint:"J'aime = I love!" },
    { stage:2, q:"Which is feminine in French? La or Le?",             options:["La","Le","Both"],                  correct:"La",              image:"⚤", hint:"La = feminine, Le = masculine in French!" },
    { stage:2, q:"'L'eau pour les plantes' means ___",                 options:["Sun for plants","Water for plants","Soil for plants"], correct:"Water for plants", image:"💧🌱", hint:"L'eau=water, plantes=plants!" },
    // Stage 3: Picture/Problem-solving
    { stage:3, q:"🥕🍅🥦 — Say all three in French! Which did we NOT learn?", options:["La carotte","Le brocoli","La citrouille"], correct:"La citrouille", image:"🎃", hint:"Citrouille = pumpkin! A new word!" },
    { stage:3, q:"Your French friend says 'J'ai faim!' What do they need?", options:["Water","Food","Sleep"],      correct:"Food",            image:"😋", hint:"J'ai faim = I am hungry!" },
    { stage:3, q:"You have 🥕🥕🥕 (trois carottes). In French: ___",  options:["Deux carottes","Trois carottes","Cinq carottes"], correct:"Trois carottes", image:"🥕🥕🥕", hint:"3 carottes = trois carottes!" },
    { stage:3, q:"Translate this sentence: 'Le soleil aide les plantes à pousser'", options:["The rain helps plants grow","The sun helps plants grow","The wind helps plants grow"], correct:"The sun helps plants grow", image:"☀️🌱", hint:"Soleil=sun, aide=helps, pousser=grow!" },
    { stage:3, q:"In the French garden: name the vegetable 🌽",         options:["Le haricot","Le maïs","Le radis"], correct:"Le maïs",        image:"🌽", hint:"Maïs = corn!" },
    { stage:3, q:"Your garden has 4 carottes and 3 tomates. How many vegetables total?", options:["5","7","9"],  correct:"7",               image:"🥕🥕🥕🥕🍅🍅🍅", hint:"4 + 3 = 7 légumes!" },
    { stage:3, q:"'Arrose le jardin!' means ___",                       options:["Plant the garden!","Water the garden!","Eat the garden!"], correct:"Water the garden!", image:"🌧️🌷", hint:"Arroser = to water!" },
    { stage:3, q:"Which phrase means 'Good morning' in French?",        options:["Bonsoir","Bonjour","Bonne nuit"], correct:"Bonjour",         image:"🌅", hint:"Bonjour is said in the morning!" },
    { stage:3, q:"'Plante une graine' means ___",                       options:["Eat a seed","Plant a seed","Water a seed"], correct:"Plant a seed", image:"🌰", hint:"Plante=plant (verb), graine=seed!" },
    { stage:3, q:"Final challenge: Translate — 'J'aime mon jardin vert et mes légumes frais!'", options:["I love my green garden and my fresh vegetables!","I hate my garden","I eat my green vegetables"], correct:"I love my green garden and my fresh vegetables!", image:"🌷🥕🍅", hint:"Vert=green, frais=fresh, légumes=vegetables!" },
  ],
};

// Generate placeholder questions for games without full data
function getPlaceholderQuestions(gameId: string, difficulty: "Easy"|"Medium"|"Hard"): Question[] {
  const topics: Record<string, string[]> = {
    "meet-the-seed":       ["Seeds","Plants","Growth","Nature","Garden"],
    "water-the-garden":    ["Watering","Plants","Soil","Sun","Garden care"],
    "colour-the-garden":   ["Colours","Plants","Flowers","Nature","Art"],
    "who-lives-in-garden": ["Animals","Insects","Garden","Nature","Habitat"],
    "big-or-small":        ["Size","Nature","Trees","Plants","Comparison"],
    "sunny-or-rainy":      ["Weather","Seasons","Nature","Clouds","Rain"],
    "find-the-leaf":       ["Leaves","Trees","Nature","Shapes","Plants"],
    "count-flowers":       ["Numbers","Flowers","Counting","Garden","Maths"],
    "nature-sounds":       ["Sounds","Animals","Nature","Birds","Wind"],
    "name-that-fruit":     ["Fruits","Food","Health","Garden","Nutrition"],
    "pick-the-vegetable":  ["Vegetables","Food","Garden","Health","Farming"],
    "where-food-comes":    ["Farm","Food","Garden","Nature","Nutrition"],
    "yummy-or-yucky":      ["Healthy food","Nutrition","Choices","Eating","Health"],
    "grow-your-plate":     ["Nutrition","Balance","Meals","Health","Food"],
    "clean-or-dirty":      ["Environment","Litter","Clean","Recycle","Earth"],
    "where-water-comes":   ["Water cycle","Rain","Rivers","Ocean","Nature"],
    "help-the-fish":       ["Water","Litter","Fish","Ocean","Environment"],
    "sun-power":           ["Solar","Energy","Sun","Power","Renewable"],
    "couleurs-jardin":     ["French colours","Garden","Flowers","Nature","Langue"],
    "soleil-pluie":        ["French weather","Sun","Rain","Nature","Langue"],
    "compte-graines":      ["French numbers","Seeds","Garden","Count","Langue"],
    "mon-jardin":          ["French garden","Vegetables","Build","Langue","Plants"],
  };
  const t = topics[gameId] || ["Nature","Garden","Plants","Earth","Water"];
  const q: Question[] = [];
  for (let i = 1; i <= 30; i++) {
    const stage = i <= 10 ? 1 : i <= 20 ? 2 : 3;
    const topic = t[(i-1) % t.length];
    q.push({
      stage: stage as 1|2|3,
      q: `${stage === 1 ? "Question" : stage === 2 ? "Puzzle" : "Challenge"} ${i}: About ${topic} — choose the best answer:`,
      options: ["Answer A", "Answer B", "Answer C"],
      correct: "Answer A",
      image: stage === 1 ? "📖" : stage === 2 ? "🧩" : "🖼️",
      hint: `Think about what you know about ${topic}!`,
    });
  }
  return q;
}

// ─── DIFFICULTY COLOURS ──────────────────────────────────────────
const DIFF_COLORS: Record<string, { bg: string; color: string; border: string }> = {
  Easy:   { bg: "#f0f7ec", color: "#2D6A2D", border: "#b8dba8" },
  Medium: { bg: "#faeeda", color: "#854F0B", border: "#fac775" },
  Hard:   { bg: "#eeedfe", color: "#534AB7", border: "#cecbf6" },
};

// ─── MILESTONE MESSAGES ──────────────────────────────────────────
function getMilestone(score: number, prevScore: number): string | null {
  if (prevScore < 50  && score >= 50)  return "🌱 50 points! You're a Seedling Champion!";
  if (prevScore < 100 && score >= 100) return "🌿 100 points! Keep going — you're amazing!";
  if (prevScore < 150 && score >= 150) return "🌳 150 points! Forest Champion badge earned!";
  if (prevScore < 200 && score >= 200) return "⭐ 200 points! You're a LIFEWS Star!";
  if (prevScore < 300 && score >= 300) return "🏆 300 points! Incredible — LIFEWS Legend level!";
  return null;
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────
export default function SeedlingsPlayZonePage() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const [activeGame, setActiveGame]         = useState<string | null>(null);
  const [gameDiff, setGameDiff]             = useState<"Easy"|"Medium"|"Hard">("Easy");
  const [qIndex, setQIndex]                 = useState(0);
  const [totalScore, setTotalScore]         = useState(0);
  const [gameScore, setGameScore]           = useState(0);
  const [lives, setLives]                   = useState(3);
  const [selected, setSelected]             = useState<string | null>(null);
  const [feedback, setFeedback]             = useState<"correct"|"wrong"|null>(null);
  const [gameOver, setGameOver]             = useState(false);
  const [gameComplete, setGameComplete]     = useState(false);
  const [milestone, setMilestone]           = useState<string | null>(null);
  const [stageMsg, setStageMsg]             = useState<string | null>(null);
  const [questions, setQuestions]           = useState<Question[]>([]);

  const currentCat = CATEGORIES.find(c => c.id === activeCategory)!;
  const currentQ   = questions[qIndex];
  const stageNum   = currentQ ? currentQ.stage : 1;
  const ptsPerQ    = DIFF_PTS[gameDiff];

  function startGame(gameId: string, difficulty: "Easy"|"Medium"|"Hard") {
    const qs = GAME_QUESTIONS[gameId] || getPlaceholderQuestions(gameId, difficulty);
    setQuestions(qs);
    setActiveGame(gameId);
    setGameDiff(difficulty);
    setQIndex(0);
    setGameScore(0);
    setLives(3);
    setSelected(null);
    setFeedback(null);
    setGameOver(false);
    setGameComplete(false);
    setMilestone(null);
    setStageMsg(null);
  }

  function handleAnswer(option: string) {
    if (selected || !currentQ) return;
    setSelected(option);
    if (option === currentQ.correct) {
      const prev = totalScore;
      const newTotal = totalScore + ptsPerQ;
      const newGame  = gameScore + ptsPerQ;
      setFeedback("correct");
      setTotalScore(newTotal);
      setGameScore(newGame);
      const m = getMilestone(newTotal, prev);
      if (m) setMilestone(m);
      setTimeout(() => {
        setFeedback(null); setSelected(null); setMilestone(null);
        const next = qIndex + 1;
        if (next >= questions.length) { setGameComplete(true); return; }
        // Stage celebration after Q10 and Q20
        if (next === 10) { setStageMsg("🎉 Stage 1 complete! Get ready for PUZZLES!"); setTimeout(() => setStageMsg(null), 2500); }
        if (next === 20) { setStageMsg("🧩 Stage 2 done! Now for PICTURE CHALLENGES!"); setTimeout(() => setStageMsg(null), 2500); }
        setQIndex(next);
      }, milestone ? 2000 : 1200);
    } else {
      setFeedback("wrong");
      const newLives = lives - 1;
      setLives(newLives);
      setTimeout(() => {
        setFeedback(null); setSelected(null);
        if (newLives <= 0) setGameOver(true);
      }, 1200);
    }
  }

  function exitGame() {
    setActiveGame(null);
  }

  const stageLabel = stageNum === 1 ? "📖 Text Questions" : stageNum === 2 ? "🧩 Puzzle Stage" : "🖼️ Picture Challenge";
  const stageColor = stageNum === 1 ? "#2D6A2D" : stageNum === 2 ? "#854F0B" : "#534AB7";

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: #F5F5E8; }
        .nav { background: #fff; border-bottom: 1px solid #e8e0cc; padding: 0 24px; height: 56px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; }
        .nav-logo { display: flex; align-items: center; gap: 8px; text-decoration: none; }
        .nav-mark { width: 30px; height: 30px; background: #2D6A2D; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; }
        .nav-name { font-family: 'DM Serif Display', serif; font-size: 15px; color: #163816; }
        .back-btn { font-size: 13px; color: #2D6A2D; text-decoration: none; font-weight: 500; }
        .hero { background: linear-gradient(135deg, #f0f7ec, #e8f5e0); padding: 48px 24px 36px; text-align: center; border-bottom: 1px solid #d0e8c0; }
        .hero-emoji { font-size: 64px; margin-bottom: 12px; display: block; }
        .hero-title { font-family: 'DM Serif Display', serif; font-size: 40px; color: #163816; margin-bottom: 8px; }
        .hero-sub { font-size: 15px; color: #555; font-weight: 300; margin-bottom: 20px; }
        .hero-badges { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
        .hero-badge { padding: 5px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
        .content { max-width: 1100px; margin: 0 auto; padding: 36px 24px; }
        .cat-tabs { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 28px; }
        .cat-tab { padding: 8px 16px; border-radius: 20px; font-size: 13px; font-weight: 500; cursor: pointer; border: 1.5px solid transparent; transition: all 0.2s; }
        .games-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
        .game-card { background: #fff; border: 1px solid #e8e0cc; border-radius: 18px; padding: 22px; transition: all 0.2s; }
        .game-card:hover { border-color: #2D6A2D; box-shadow: 0 6px 20px rgba(45,106,45,0.12); transform: translateY(-2px); }
        .game-emoji-big { font-size: 36px; margin-bottom: 12px; display: block; }
        .game-name { font-size: 15px; font-weight: 600; color: #163816; margin-bottom: 6px; }
        .game-desc { font-size: 13px; color: #666; line-height: 1.5; margin-bottom: 14px; }
        .diff-row { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 10px; }
        .diff-chip { font-size: 10px; font-weight: 600; padding: 3px 9px; border-radius: 6px; border: 1px solid; cursor: pointer; transition: all 0.15s; }
        .diff-chip:hover { opacity: 0.8; }
        .play-row { display: flex; align-items: center; justify-content: space-between; }
        .pts-badge { font-size: 12px; font-weight: 700; color: #2D6A2D; }

        /* GAME OVERLAY */
        .game-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 16px; }
        .game-modal { background: #fff; border-radius: 24px; width: 100%; max-width: 540px; overflow: hidden; box-shadow: 0 24px 64px rgba(0,0,0,0.25); max-height: 90vh; overflow-y: auto; }
        .game-header { background: #2D6A2D; padding: 16px 20px; display: flex; align-items: center; justify-content: space-between; }
        .game-header-title { font-family: 'DM Serif Display', serif; font-size: 17px; color: #fff; }
        .lives { display: flex; gap: 4px; }
        .life { font-size: 18px; }
        .progress-bar-wrap { background: rgba(255,255,255,0.2); border-radius: 4px; height: 4px; margin-top: 8px; }
        .progress-bar-fill { background: #7ec850; border-radius: 4px; height: 4px; transition: width 0.3s; }
        .stage-label { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; padding: 6px 20px; border-bottom: 1px solid #f0ece0; }
        .game-body { padding: 24px 22px 16px; }
        .q-num { font-size: 11px; color: #aaa; margin-bottom: 6px; }
        .q-text { font-family: 'DM Serif Display', serif; font-size: 20px; color: #163816; margin-bottom: 10px; line-height: 1.35; }
        .q-image { font-size: 48px; text-align: center; margin: 14px 0; background: #f5f5e8; border-radius: 12px; padding: 16px; }
        .q-hint { font-size: 12px; color: #888; background: #f5f5e8; border-radius: 8px; padding: 8px 12px; margin-bottom: 16px; }
        .options { display: flex; flex-direction: column; gap: 9px; }
        .opt-btn { padding: 12px 16px; border-radius: 12px; border: 2px solid #e8e0cc; background: #fff; font-family: 'DM Sans', sans-serif; font-size: 14px; color: #333; cursor: pointer; text-align: left; transition: all 0.15s; }
        .opt-btn:hover:not(:disabled) { border-color: #2D6A2D; background: #f0f7ec; }
        .opt-btn.correct { border-color: #2D6A2D; background: #f0f7ec; color: #2D6A2D; font-weight: 700; }
        .opt-btn.wrong { border-color: #ef4444; background: #fff0f0; color: #ef4444; }
        .feedback-bar { padding: 11px 20px; text-align: center; font-weight: 600; font-size: 14px; }
        .feedback-bar.correct { background: #f0f7ec; color: #2D6A2D; }
        .feedback-bar.wrong { background: #fff0f0; color: #ef4444; }
        .game-footer-bar { padding: 14px 20px; border-top: 1px solid #f0ece0; display: flex; align-items: center; justify-content: space-between; }
        .score-disp { font-size: 13px; font-weight: 700; color: #2D6A2D; }
        .exit-btn { background: none; border: none; color: #aaa; font-size: 12px; cursor: pointer; font-family: 'DM Sans', sans-serif; }
        .milestone-bar { background: linear-gradient(90deg,#2D6A2D,#185FA5); color: #fff; padding: 12px 20px; text-align: center; font-weight: 700; font-size: 14px; animation: pulse 0.5s ease; }
        .stage-toast { background: #163816; color: #7ec850; padding: 12px 20px; text-align: center; font-weight: 700; font-size: 14px; }
        @keyframes pulse { 0%{transform:scale(1)} 50%{transform:scale(1.02)} 100%{transform:scale(1)} }
        .end-body { padding: 36px 24px; text-align: center; }
        .end-emoji { font-size: 60px; margin-bottom: 14px; display: block; }
        .end-title { font-family: 'DM Serif Display', serif; font-size: 26px; color: #163816; margin-bottom: 8px; }
        .end-sub { font-size: 14px; color: #666; margin-bottom: 20px; }
        .end-pts { font-family: 'DM Serif Display', serif; font-size: 44px; color: #2D6A2D; }
        .end-pts-label { font-size: 12px; color: #aaa; margin-bottom: 24px; }
        .end-btns { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
        .btn-green { background: #2D6A2D; color: #fff; border: none; border-radius: 10px; padding: 12px 22px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; text-decoration: none; display: inline-block; }
        .btn-outline { background: transparent; color: #2D6A2D; border: 2px solid #2D6A2D; border-radius: 10px; padding: 12px 22px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; }
        .other-levels { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 32px; }
        .level-link { display: flex; align-items: center; gap: 8px; padding: 10px 18px; background: #fff; border: 1px solid #e8e0cc; border-radius: 12px; text-decoration: none; font-size: 13px; color: #555; font-weight: 500; }
        @media(max-width:640px){.games-grid{grid-template-columns:1fr;} .hero-title{font-size:28px;} .q-text{font-size:17px;}}
      `}</style>

      <div style={{ fontFamily:"'DM Sans',sans-serif", background:"#F5F5E8", minHeight:"100vh" }}>

        {/* Nav */}
        <nav className="nav">
          <Link href="/" className="nav-logo">
            <div className="nav-mark">🌱</div>
            <span className="nav-name">LIFEWS Connect</span>
          </Link>
          <Link href="/playzone" className="back-btn">← PlayZone</Link>
        </nav>

        {/* Hero */}
        <div className="hero">
          <span className="hero-emoji">🌱</span>
          <h1 className="hero-title">Seedlings PlayZone</h1>
          <p className="hero-sub">Ages 3–5 · Nursery · 30 questions per game · 3 stages · Earn LIFEWS Points!</p>
          <div className="hero-badges">
            {[
              { label:"Ages 3–5", bg:"#f0f7ec", color:"#2D6A2D" },
              { label:"5 Categories", bg:"#e6f1fb", color:"#185FA5" },
              { label:"25 Games", bg:"#faeeda", color:"#854F0B" },
              { label:"30 Questions each", bg:"#eeedfe", color:"#534AB7" },
              { label:"3 Lives per game", bg:"#fdf0f0", color:"#8B1A1A" },
            ].map(b=>(
              <span key={b.label} className="hero-badge" style={{background:b.bg,color:b.color}}>{b.label}</span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="content">

          {/* Total score bar */}
          <div style={{background:"#fff",border:"1px solid #e8e0cc",borderRadius:16,padding:"14px 20px",marginBottom:24,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:24}}>⭐</span>
              <div>
                <div style={{fontSize:11,color:"#aaa",textTransform:"uppercase" as const,letterSpacing:1}}>Session Score</div>
                <div style={{fontFamily:"'DM Serif Display',serif",fontSize:24,color:"#2D6A2D"}}>{totalScore} pts</div>
              </div>
            </div>
            <Link href="/auth" style={{fontSize:12,fontWeight:600,color:"#2D6A2D",textDecoration:"none",background:"#f0f7ec",border:"1px solid #b8dba8",borderRadius:8,padding:"7px 14px"}}>
              Register to save points →
            </Link>
          </div>

          {/* Category tabs */}
          <div className="cat-tabs">
            {CATEGORIES.map(c=>(
              <button key={c.id} onClick={()=>setActiveCategory(c.id)} className="cat-tab"
                style={{background:activeCategory===c.id?c.color:"#fff",color:activeCategory===c.id?"#fff":c.color,borderColor:c.color}}>
                {c.emoji} {c.name}
              </button>
            ))}
          </div>

          {/* Category info */}
          <div style={{background:"#fff",border:`1px solid ${currentCat.border}`,borderRadius:16,padding:"14px 20px",marginBottom:24,display:"flex",alignItems:"center",gap:12}}>
            <span style={{fontSize:28}}>{currentCat.emoji}</span>
            <div>
              <div style={{fontWeight:600,color:currentCat.color,marginBottom:2}}>{currentCat.name}</div>
              <div style={{fontSize:13,color:"#666"}}>{currentCat.desc}</div>
            </div>
          </div>

          {/* Games grid */}
          <div className="games-grid">
            {currentCat.games.map(game=>{
              return(
                <div key={game.id} className="game-card">
                  <span className="game-emoji-big">{game.emoji}</span>
                  <div className="game-name">{game.name}</div>
                  <p className="game-desc">{game.desc}</p>
                  <div className="diff-row">
                    {(["Easy","Medium","Hard"] as const).map(d=>{
                      const dc=DIFF_COLORS[d];
                      return(
                        <span key={d} className="diff-chip" style={{background:dc.bg,color:dc.color,borderColor:dc.border}}>
                          {d} (+{DIFF_PTS[d]}pts/q)
                        </span>
                      );
                    })}
                  </div>
                  <div className="diff-row" style={{marginTop:8}}>
                    {(["Easy","Medium","Hard"] as const).map(d=>(
                      <button key={d} onClick={()=>startGame(game.id,d)}
                        style={{padding:"7px 14px",borderRadius:8,border:"none",background:DIFF_COLORS[d].bg,color:DIFF_COLORS[d].color,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>
                        ▶ Play {d}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Points banner */}
          <div style={{marginTop:36,background:"#2D6A2D",borderRadius:20,padding:"24px 28px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap" as const,gap:16}}>
            <div>
              <div style={{fontSize:11,fontWeight:600,textTransform:"uppercase" as const,letterSpacing:1,color:"rgba(255,255,255,0.5)",marginBottom:6}}>LIFEWS Points</div>
              <div style={{fontFamily:"'DM Serif Display',serif",fontSize:20,color:"#fff",marginBottom:4}}>Complete all 25 games across 3 difficulty levels!</div>
              <div style={{fontSize:13,color:"rgba(255,255,255,0.65)"}}>Easy=5pts · Medium=10pts · Hard=15pts per correct answer · Max 450pts per game!</div>
            </div>
            <Link href="/auth" style={{background:"#7ec850",color:"#163816",border:"none",borderRadius:12,padding:"12px 20px",fontSize:13,fontWeight:700,textDecoration:"none",display:"inline-block"}}>
              Save Progress →
            </Link>
          </div>

          {/* Other levels */}
          <div style={{marginTop:32}}>
            <div style={{fontFamily:"'DM Serif Display',serif",fontSize:20,color:"#163816",marginBottom:14}}>Explore other PlayZone levels</div>
            <div className="other-levels">
              {[
                {id:"sprouts",emoji:"🌿",name:"Sprouts",age:"Ages 6–10"},
                {id:"growers",emoji:"🌳",name:"Growers",age:"Ages 11–13"},
                {id:"pioneers",emoji:"🚀",name:"Pioneers",age:"Ages 14–18"},
                {id:"champions",emoji:"🏆",name:"Champions",age:"18+"},
              ].map(l=>(
                <Link key={l.id} href={`/playzone/${l.id}` as any} className="level-link">
                  <span style={{fontSize:20}}>{l.emoji}</span>
                  <div>
                    <div style={{color:"#163816",fontWeight:600}}>{l.name}</div>
                    <div style={{fontSize:11,color:"#888"}}>{l.age}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── GAME MODAL ── */}
        {activeGame && (
          <div className="game-overlay">
            <div className="game-modal">
              {gameOver ? (
                <div className="end-body">
                  <span className="end-emoji">💔</span>
                  <div className="end-title">Game Over!</div>
                  <p className="end-sub">You ran out of lives. Don't give up — try again!</p>
                  <div className="end-pts">{gameScore}</div>
                  <div className="end-pts-label">points earned this game</div>
                  <div className="end-btns">
                    <button className="btn-green" onClick={()=>{ const g=activeGame; const d=gameDiff; exitGame(); setTimeout(()=>startGame(g,d),100); }}>🔄 Try Again</button>
                    <button className="btn-outline" onClick={exitGame}>← Choose Game</button>
                  </div>
                </div>
              ) : gameComplete ? (
                <div className="end-body">
                  <span className="end-emoji">🎉</span>
                  <div className="end-title">Brilliant! Game Complete!</div>
                  <p className="end-sub">You answered all 30 questions! Here are your points:</p>
                  <div className="end-pts">+{gameScore}</div>
                  <div className="end-pts-label">LIFEWS Points earned · Total session: {totalScore} pts</div>
                  <div className="end-btns">
                    <Link href="/auth" className="btn-green">🌱 Save My Points</Link>
                    <button className="btn-outline" onClick={exitGame}>Play Another</button>
                  </div>
                </div>
              ) : currentQ ? (
                <>
                  {/* Header */}
                  <div className="game-header">
                    <div>
                      <div className="game-header-title">{currentCat.games.find(g=>g.id===activeGame)?.name}</div>
                      <div style={{fontSize:11,color:"rgba(255,255,255,0.6)",marginTop:2}}>{gameDiff} · {ptsPerQ}pts per correct answer</div>
                    </div>
                    <div className="lives">
                      {[1,2,3].map(n=>(
                        <span key={n} className="life">{n<=lives?"❤️":"🖤"}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{padding:"6px 20px 0",background:"#2D6A2D"}}>
                    <div className="progress-bar-wrap">
                      <div className="progress-bar-fill" style={{width:`${((qIndex+1)/30)*100}%`}} />
                    </div>
                    <div style={{fontSize:10,color:"rgba(255,255,255,0.5)",textAlign:"right",padding:"4px 0",paddingBottom:6}}>{qIndex+1}/30</div>
                  </div>

                  {/* Stage label */}
                  <div className="stage-label" style={{color:stageColor,background:`${stageColor}10`}}>
                    {stageLabel} — Stage {stageNum} of 3
                  </div>

                  {/* Stage toast */}
                  {stageMsg && <div className="stage-toast">{stageMsg}</div>}

                  {/* Milestone */}
                  {milestone && <div className="milestone-bar">{milestone}</div>}

                  {/* Body */}
                  <div className="game-body">
                    <div className="q-num">Question {qIndex+1} of 30</div>
                    <div className="q-text">{currentQ.q}</div>
                    {currentQ.image && <div className="q-image">{currentQ.image}</div>}
                    <div className="q-hint">💡 {currentQ.hint}</div>
                    <div className="options">
                      {currentQ.options.map(opt=>(
                        <button key={opt} disabled={!!selected}
                          className={`opt-btn ${selected===opt?(feedback==="correct"?"correct":"wrong"):""}`}
                          onClick={()=>handleAnswer(opt)}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Feedback */}
                  {feedback && (
                    <div className={`feedback-bar ${feedback}`}>
                      {feedback==="correct"
                        ? `✅ Correct! +${ptsPerQ} points! 🌱`
                        : `❌ Not quite! ${lives-1} ${lives-1===1?"life":"lives"} remaining.`}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="game-footer-bar">
                    <div className="score-disp">⭐ {gameScore} pts this game</div>
                    <button className="exit-btn" onClick={exitGame}>✕ Exit</button>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        )}

      </div>
    </>
  );
}

