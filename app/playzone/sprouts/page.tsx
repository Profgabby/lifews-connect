'use client'
'use client'
import { useState, useCallback } from 'react'

// ─── TYPES ────────────────────────────────────────────────────
type Diff = 'easy' | 'medium' | 'hard'
type Cat = 'food'|'energy'|'water'|'nature'|'climate'|'science'|'animals'|'soil'|'french'|'weather'

interface SceneItem { emoji: string; label: string }
interface Question {
  t: 'text'|'match'|'drag'|'calc'|'story'
  q: string
  opts?: string[]
  ans?: number
  fact: string
  pairs?: [string,string][]
  items?: string[]
  correct?: number[]
  steps?: string[]
  char?: string
  story?: string
}

// ─── QUESTION BANK (10 topics × 3 difficulties) ───────────────
const QB: Record<Cat, Record<Diff, Question[]>> = {
  food: {
    easy: [
      { t:'text', q:'Where does bread come from originally?', opts:['The sea 🌊','Wheat grown by farmers 🌾','Rock quarries','Pine trees'], ans:1, fact:'Wheat grows in fields → harvested → milled into flour → baked. That\'s your bread!' },
      { t:'text', q:'What makes something a FRUIT scientifically?', opts:['It must be sweet','It holds seeds and grows from a flower 🌸','It grows underground','It must be colourful'], ans:1, fact:'Tomatoes, avocados and cucumbers are fruits too — they contain seeds from a flower!' },
      { t:'text', q:'Which food group helps your muscles grow strong?', opts:['Carbohydrates 🍞','Fats 🧈','Proteins 🫘','Sugar 🍬'], ans:2, fact:'Beans, eggs, meat and fish are protein-rich — they build and repair your muscles!' },
      { t:'text', q:'Why should we eat vegetables of many different colours?', opts:['To look pretty 🎨','Each colour has different vitamins & minerals','All vegetables are the same','Just for variety'], ans:1, fact:'Orange = vit A, green = iron, red = vit C. Eat the rainbow for full nutrition!' },
      { t:'text', q:'What does "seasonal food" mean?', opts:['Very old food','Grown & eaten at its natural time of year 📅','Always expensive food','Only from supermarkets'], ans:1, fact:'Seasonal food is fresher, tastier and better for the planet — shorter journeys!' },
    ],
    medium: [
      { t:'match', q:'Match each FOOD to its correct nutrient group!',
        pairs:[['Rice 🍚','Carbohydrate'],['Eggs 🥚','Protein'],['Carrot 🥕','Vitamin A'],['Milk 🥛','Calcium']],
        fact:'Carbs = energy, protein = muscles, vitamins = immunity, calcium = strong bones!' },
      { t:'calc', q:'A school wastes 50g of food per student per day. 200 students. How much wasted per week (5 days)?',
        steps:['200 students × 50g = **10,000g** per day','10,000g × 5 days = **50,000g = 50kg** per week'],
        opts:['10kg per week','50kg per week ✅','5kg per week','500g per week'], ans:1,
        fact:'200 × 50 × 5 = 50,000g = 50kg wasted EVERY week. Small amounts really add up!' },
      { t:'drag', q:'Put the FOOD SUPPLY CHAIN in order from start to finish:',
        items:['🌳 Farm','🚛 Transport','🏭 Processing','🏪 Market','🍱 Your plate'],
        correct:[0,1,2,3,4],
        fact:'Farm → Transport → Process → Market → Your plate. Every meal travels a journey!' },
    ],
    hard: [
      { t:'story', char:'👨‍🍳', story:'Chef Bisi wants to cook lunch for 4 children. Proteins build muscles, carbohydrates give energy, vitamins protect from illness, and calcium builds bones. She has rice, beans, carrots, spinach and milk.',
        q:'Design the ONE meal containing ALL 4 nutrient groups! 🍽️',
        opts:['Rice + Beans + Carrots + Spinach + Milk ✅ (all 4!)','Rice + Beans only (missing vitamins & calcium)','Carrots + Spinach only (no energy or protein)','Just rice and milk'],
        ans:0, fact:'Rice (carbs) + Beans (protein) + Carrots (vit A) + Spinach (iron) + Milk (calcium) = perfectly balanced!' },
      { t:'story', char:'🌾', story:'Farmer Hassan has 3 baskets of tomatoes, 12 tomatoes each. He sells 2/3 of all tomatoes at ₦50 each. His costs for the day were ₦400.',
        q:'How much PROFIT does Farmer Hassan make? (Profit = earnings − costs) 💰',
        opts:['₦800 profit ✅','₦1,200 profit (forgot costs)','₦600 profit','₦400 profit'],
        ans:0, fact:'3×12=36 tomatoes. 2/3×36=24 sold. 24×₦50=₦1,200 earned. ₦1,200−₦400=₦800 profit!' },
    ],
  },
  energy: {
    easy: [
      { t:'text', q:'What do we call energy made directly from sunlight?', opts:['Nuclear energy','Wind energy','Solar energy ☀️','Tidal energy'], ans:2, fact:'Solar panels convert sunlight directly into electricity — clean, free and unlimited!' },
      { t:'text', q:'Which of these is a RENEWABLE energy source?', opts:['Coal ⬛','Oil 🛢️','Wind 💨','Natural gas'], ans:2, fact:'Wind never runs out — that\'s renewable. Coal and oil take millions of years to form!' },
      { t:'text', q:'Why should we save electricity at home?', opts:['Makes lights brighter','Reduces pollution and saves money 💚','Makes appliances faster','Electricity is free anyway'], ans:1, fact:'Most electricity still comes from fossil fuels — saving energy = less pollution + money saved!' },
      { t:'text', q:'What does a wind turbine do?', opts:['Cools rooms like a fan','Turns wind movement into electricity 💨⚡','Measures wind speed','Pumps water only'], ans:1, fact:'Wind spins blades → spins a generator inside → produces clean electricity!' },
      { t:'text', q:'What is a fossil fuel?', opts:['A type of dinosaur bone','Coal, oil and gas formed from ancient organisms over millions of years ⬛','A renewable energy source','A type of solar panel'], ans:1, fact:'Fossil fuels formed over 300 million years — once burned, they\'re gone forever and release CO₂!' },
    ],
    medium: [
      { t:'match', q:'Match each energy SOURCE to its correct TYPE!',
        pairs:[['Sunlight ☀️','Solar energy'],['Moving water 🌊','Hydropower'],['Wind 💨','Wind energy'],['Burning coal ⬛','Fossil fuel']],
        fact:'Solar, wind and hydro are renewable. Coal is a fossil fuel — finite and polluting!' },
      { t:'calc', q:'A village needs 500 units of electricity/day. Each solar panel = 200 units, each wind turbine = 150 units. Find the best combination!',
        steps:['Need: **500 units/day**','2 solar panels: 2×200 = **400 units**','+ 1 wind turbine: **+150 units** = **550 units** ✅'],
        opts:['1 solar only = 200 (not enough)','1 solar + 1 wind = 350 (not enough)','2 solar + 1 wind = 550 ✅','3 wind only = 450 (not enough)'],
        ans:2, fact:'2×200 + 150 = 550 units. Exceeds 500 — the village has 50 spare units every day!' },
      { t:'drag', q:'Sort the steps of how a SOLAR PANEL produces electricity:',
        items:['☀️ Sunlight hits panel','⚛️ Electrons are freed','⚡ Current flows','🔌 Wire carries power','💡 Light turns on'],
        correct:[0,1,2,3,4],
        fact:'Photons knock electrons loose → flow as current → travel through wires → power appliances!' },
    ],
    hard: [
      { t:'story', char:'⚡', story:'Scientist Zara measured city temperatures for 5 years: 28°C, 29°C, 29°C, 30°C, 31°C. She believes fossil fuel burning is causing warming and wants to calculate the average to confirm.',
        q:'Calculate the AVERAGE temperature AND confirm if the trend is rising! 🌡️',
        opts:['Average = 30°C, no clear trend','Average = 29.4°C, trend is RISING 📈 ✅','Average = 28°C, trend is falling','Not enough data to conclude'],
        ans:1, fact:'(28+29+29+30+31)÷5 = 147÷5 = 29.4°C average. Each year goes up — clear warming trend!' },
      { t:'story', char:'🔋', story:'A solar farm has 10 panels. Each produces 200 units/day. The farm operates 25 days a month. Electricity sells at ₦2 per unit. Running costs are ₦5,000 per month.',
        q:'What is the farm\'s monthly PROFIT? Think step by step! 💡',
        opts:['₦50,000 profit','₦95,000 profit ✅ (₦100,000 − ₦5,000 costs)','₦45,000 profit','₦5,000 profit'],
        ans:1, fact:'10 panels × 200 × 25 days = 50,000 units. 50,000 × ₦2 = ₦100,000. Minus ₦5,000 = ₦95,000 profit!' },
    ],
  },
  water: {
    easy: [
      { t:'text', q:'What percentage of Earth\'s water is fresh water?', opts:['About 97%','About 50%','About 3% 💧','About 25%'], ans:2, fact:'97% is saltwater. Only 3% is fresh — and most is frozen in glaciers!' },
      { t:'text', q:'What is evaporation?', opts:['Water turning to ice','Liquid water turning into water vapour 💨','Rain falling from clouds','Water soaking into soil'], ans:1, fact:'The Sun heats water → molecules escape into air as invisible water vapour!' },
      { t:'text', q:'How can we conserve water at home?', opts:['Run the tap while brushing teeth','Take extra long baths','Fix leaky taps and take shorter showers 🚿','Wash the car every day'], ans:2, fact:'A dripping tap wastes up to 20 litres a day! Small habits make a huge difference!' },
      { t:'text', q:'What do plants use water for?', opts:['Making leaves green','Moving nutrients from roots to leaves and making food 🌱','Protecting from insects','Only making flowers bloom'], ans:1, fact:'Water carries dissolved nutrients up from roots through the stem to every cell!' },
      { t:'text', q:'What is the water cycle?', opts:['A water pump machine','Continuous movement of water through evaporation, clouds and rain 🌧️','A type of waterfall','A water storage tank'], ans:1, fact:'Water evaporates → forms clouds → falls as rain → flows to rivers/oceans → evaporates again!' },
    ],
    medium: [
      { t:'match', q:'Match each WATER CYCLE stage to its description!',
        pairs:[['Evaporation 💨','Water turns to vapour'],['Condensation ☁️','Vapour forms clouds'],['Precipitation 🌧️','Water falls as rain/snow'],['Collection 🌊','Water gathers in rivers/seas']],
        fact:'Evaporation → Condensation → Precipitation → Collection → Evaporation again. Never stops!' },
      { t:'calc', q:'A village of 300 people each needs 50 litres/day. Their reservoir holds 60,000 litres. How many days will the water last?',
        steps:['Daily use: 300 × 50L = **15,000 litres** per day','Days: 60,000 ÷ 15,000 = **4 days**'],
        opts:['2 days','4 days ✅','10 days','20 days'],
        ans:1, fact:'300×50=15,000L/day. 60,000÷15,000=4 days. Find more water within 4 days!' },
      { t:'drag', q:'Order the WATER CYCLE stages correctly:',
        items:['☀️ Sun heats water','💨 Evaporation rises','☁️ Cloud forms','🌧️ Rain falls','🌊 Collected in rivers'],
        correct:[0,1,2,3,4],
        fact:'Sun heats → evaporation → condensation → precipitation → collection → repeats!' },
    ],
    hard: [
      { t:'story', char:'💧', story:'Engineer Amara is building a water system for a school of 400 students. Each student needs 5 litres for drinking and 10 litres for washing per day. The water tank refills once every 3 days.',
        q:'What is the MINIMUM tank size Amara must build? Think it through! 🏗️',
        opts:['6,000 litre tank','18,000 litre tank ✅','5,000 litre tank','60,000 litre tank'],
        ans:1, fact:'Each student: 5+10=15L/day. 400×15=6,000L/day. Tank for 3 days: 6,000×3=18,000 litres!' },
    ],
  },
  nature: {
    easy: [
      { t:'text', q:'What is photosynthesis?', opts:['How plants drink water','How plants make food using sunlight, CO₂ and water 🌞','How leaves change colour','How roots grow deep'], ans:1, fact:'Leaves are tiny solar-powered food factories: Sun + CO₂ + water → food + oxygen!' },
      { t:'text', q:'Which part of a plant absorbs water from the soil?', opts:['Leaves 🍃','Flowers 🌸','Roots 🪱','Seeds'], ans:2, fact:'Roots act like drinking straws with millions of tiny root hairs that suck up water!' },
      { t:'text', q:'Why do leaves change colour in autumn?', opts:['They get sick','The green chlorophyll breaks down as the tree saves energy for winter 🍂','Rain washes colour away','The Sun changes'], ans:1, fact:'Chlorophyll (green) breaks down in autumn, revealing hidden yellow and red pigments!' },
      { t:'text', q:'What is pollination?', opts:['When plants get watered','When pollen moves between flowers, allowing fruit to form 🐝','When leaves fall off','When seeds are planted'], ans:1, fact:'Bees carry pollen on their fuzzy bodies. Without pollination, most fruits wouldn\'t exist!' },
      { t:'text', q:'What does a seed need to start growing?', opts:['Ice and darkness','Water and warmth 🌱','Salt and wind','Fire and smoke'], ans:1, fact:'Water wakes up the seed (germination) and warmth signals the right season to grow!' },
    ],
    medium: [
      { t:'match', q:'Match each plant PART to its correct JOB!',
        pairs:[['Roots 🌿','Absorb water & anchor plant'],['Leaves 🍃','Make food via photosynthesis'],['Stem 🌱','Transport water & support'],['Flower 🌸','Attract pollinators for reproduction']],
        fact:'Each part has a vital role — remove any one and the whole plant struggles!' },
      { t:'drag', q:'Arrange the LIFE CYCLE of a plant in the correct order:',
        items:['🫘 Seed','🌱 Germination','🌿 Growing plant','🌸 Flowering','🍎 Fruit with seeds'],
        correct:[0,1,2,3,4],
        fact:'Seed → germinates → grows → flowers → makes fruit → fruit holds new seeds → repeats!' },
      { t:'calc', q:'A garden has 3 rows of tomatoes, 8 plants each. Each needs 2L water/day. A storm knocked out 1/4 of plants. How much water is needed now?',
        steps:['Total plants: 3×8 = **24 plants**','Lost: 24÷4 = **6 plants**. Remaining: **18 plants**','Daily water: 18×2 = **36 litres**'],
        opts:['24 litres','36 litres ✅ (18 plants × 2L)','48 litres','18 litres'],
        ans:1, fact:'24 total − 6 lost = 18 plants. 18 × 2L = 36 litres needed daily after the storm!' },
    ],
    hard: [
      { t:'story', char:'🌺', story:'A garden has 3 plant types needing different sunlight: Roses need 6 hrs/day, Sunflowers need 8 hrs, Beans need 4 hrs. This garden spot receives EXACTLY 7 hours of sun per day.',
        q:'Which plants will be UNHAPPY and not grow well? Think carefully! 🌞',
        opts:['Roses only (need 6h, have 7h ✅)','Sunflowers only — need 8h but only get 7h ❌ ✅','Beans only (need 4h, have 7h ✅)','All plants will be unhappy'],
        ans:1, fact:'Roses 6h ✅. Beans 4h ✅. Only Sunflowers need 8h but get 7h — they won\'t thrive!' },
      { t:'story', char:'🌳', story:'Farmer Nkechi has a 2-hectare farm. Her topsoil is only 10cm deep when it should be 30cm. She plants cover crops that STOP erosion AND add 2cm of new soil every 3 years.',
        q:'After 9 YEARS with cover crops, how deep will the topsoil be? 🌱',
        opts:['10cm (no change)','16cm ✅ (added 6cm over 9 years)','30cm (reached target!)','8cm (still eroding)'],
        ans:1, fact:'No loss + 2cm every 3 years. 9 years = 3 periods × 2cm = 6cm added. 10+6=16cm!' },
    ],
  },
  climate: {
    easy: [
      { t:'text', q:'What is global warming?', opts:['The Sun getting hotter','Earth\'s average temperature gradually rising due to greenhouse gases 🌡️','Oceans getting saltier','Winters getting longer'], ans:1, fact:'Greenhouse gases trap heat in the atmosphere — like a thickening blanket around Earth!' },
      { t:'text', q:'How do trees help fight climate change?', opts:['They cool ground with shade only','They absorb CO₂ and store carbon 🌳','They make wind stronger','They produce rain directly'], ans:1, fact:'One mature tree absorbs ~22kg of CO₂ per year. A million trees = 22,000 tonnes absorbed!' },
      { t:'text', q:'Which human activity releases the MOST greenhouse gases?', opts:['Reading books 📚','Burning fossil fuels for energy & transport 🚗','Planting trees','Swimming'], ans:1, fact:'Cars, power stations and factories burning coal/oil/gas release billions of tonnes of CO₂ yearly!' },
      { t:'text', q:'What is a carbon footprint?', opts:['A fossil type','Total greenhouse gases produced by a person or activity 👣','A footprint left in coal','A type of energy'], ans:1, fact:'Every product, meal and journey has a carbon footprint. Knowing yours helps reduce it!' },
      { t:'text', q:'What can young people do to help the climate?', opts:['Nothing — adults\' problem only','Reduce waste, plant trees, save energy, eat more plants 🌿','Only scientists can fix it','Move to another planet'], ans:1, fact:'Every action matters! Young people today will shape the climate policies of tomorrow!' },
    ],
    medium: [
      { t:'match', q:'Match each CLIMATE ACTION to its correct benefit!',
        pairs:[['Plant trees 🌳','Absorb CO₂'],['Use solar panels ☀️','Replace fossil fuels'],['Eat less meat 🥗','Reduce methane emissions'],['Cycle or walk 🚲','Cut transport emissions']],
        fact:'Every action tackles a different source of emissions — combining them multiplies the impact!' },
      { t:'calc', q:'A school planted 100 trees. Each absorbs 22kg of CO₂/year. How much CO₂ is absorbed over 10 years?',
        steps:['Per year: 100 × 22kg = **2,200 kg**','Over 10 years: 2,200 × 10 = **22,000 kg = 22 tonnes**'],
        opts:['2,200 kg (1 year only)','22,000 kg (22 tonnes) ✅','220 kg','2,200,000 kg'],
        ans:1, fact:'100 × 22 × 10 = 22,000kg = 22 tonnes of CO₂ captured! School tree-planting matters!' },
      { t:'drag', q:'Order these CLIMATE ACTIONS from BIGGEST to smallest impact (CO₂ reduction):',
        items:['✈️ Avoid flying','💡 Switch to solar','🚗 Drive less','🥩 Eat less meat','🌱 Plant trees'],
        correct:[0,1,2,3,4],
        fact:'Avoiding flights & switching to clean energy have the biggest impact. Every action counts!' },
    ],
    hard: [
      { t:'story', char:'🧑‍🔬', story:'Climate scientist Kwame studied his city. Year 1: 28°C. Year 2: 29°C. Year 3: 29°C. Year 4: 30°C. Year 5: 31°C. He wants the average AND total rise over 5 years.',
        q:'What is the average temperature AND how many degrees did it rise Year 1 to Year 5? 🌡️',
        opts:['Average 30°C, rose 2°C','Average 29.4°C, rose 3°C ✅','Average 29°C, rose 1°C','Average 30°C, rose 3°C'],
        ans:1, fact:'Average: (28+29+29+30+31)÷5=29.4°C. Rise: 31−28=3°C in 5 years. Very alarming rate!' },
    ],
  },
  science: {
    easy: [
      { t:'text', q:'What does a microscope do?', opts:['Measures temperature','Magnifies tiny objects so we can see them 🔬','Predicts weather','Measures rainfall'], ans:1, fact:'Microscopes can magnify things 1,000× — revealing bacteria, cells and soil organisms!' },
      { t:'text', q:'What is precision farming?', opts:['Growing only one crop','Using exact amounts of water/fertilizer only where each plant needs it 🎯','Farming by hand only','Only farming in cities'], ans:1, fact:'GPS, sensors and drones help farmers give each plant exactly what it needs — zero waste!' },
      { t:'text', q:'What does a drone do on a modern farm?', opts:['Entertain tourists','Maps fields, spots sick plants and sprays accurately 🛸','Harvests crops manually','Waters by hand'], ans:1, fact:'Farm drones cover a 10-hectare field in under 20 minutes — spotting problems humans might miss!' },
      { t:'text', q:'What is a soil sensor?', opts:['A type of worm','Device measuring soil moisture, temperature and nutrients 📡','A garden spade','A type of fertilizer'], ans:1, fact:'Smart sensors send real-time data to farmers\' phones — water only when and where needed!' },
      { t:'text', q:'What does GPS stand for?', opts:['Giant Plant System','Global Positioning System 🛰️','Grand Plant Survey','Green Plant Science'], ans:1, fact:'GPS uses satellites to tell farmers their exact location on Earth — to the centimetre!' },
    ],
    medium: [
      { t:'match', q:'Match each FARM TECH TOOL to what it does!',
        pairs:[['Drone 🛸','Maps fields & spots problems'],['Soil sensor 📡','Measures moisture & nutrients'],['GPS 🛰️','Tracks exact location'],['Weather station 🌡️','Records rain, wind & temperature']],
        fact:'Modern farming uses all 4 tools together — tech + nature = smarter, sustainable agriculture!' },
      { t:'calc', q:'AgriBot plants 60 seeds per hour. A field needs 720 seeds. AgriBot starts 8:00 AM with a 30-min break. What time does it finish?',
        steps:['Work time: 720 ÷ 60 = **12 hours** planting','8:00 AM + 12h work + **30min break** = **8:30 PM** finish'],
        opts:['8:00 PM (forgot the break)','8:30 PM ✅ (includes break)','9:00 PM','7:30 PM'],
        ans:1, fact:'720÷60=12 hours work. 8:00AM + 12hrs = 8:00PM + 30min break = 8:30PM. Always include breaks!' },
      { t:'drag', q:'Order the steps of a PRECISION IRRIGATION (smart watering) system:',
        items:['📡 Sensor reads soil','📱 Data sent to phone','🤔 Farmer decides to water','💧 Pump activates','🌱 Plants watered exactly'],
        correct:[0,1,2,3,4],
        fact:'Collect data → analyse → decide → act → result. This loop makes precision farming so efficient!' },
    ],
    hard: [
      { t:'story', char:'🤖', story:'Smart Farm Monitor shows: Crop A yields 15kg and earns ₦200/kg. Crop B yields 20kg and earns ₦150/kg. Total production costs are ₦2,500. The farmer needs at least ₦5,000 profit.',
        q:'Calculate TOTAL PROFIT and decide if the farm meets its goal! 💹',
        opts:['₦3,500 profit — below ₦5,000 goal ❌ ✅','₦6,000 profit — above goal ✅','₦7,000 profit — above goal','₦2,500 profit — below goal'],
        ans:0, fact:'A: 15×₦200=₦3,000. B: 20×₦150=₦3,000. Total=₦6,000. Profit=₦6,000−₦2,500=₦3,500. Below ₦5,000!' },
    ],
  },
  animals: {
    easy: [
      { t:'text', q:'Which animal is most important for pollinating food crops?', opts:['Lion 🦁','Bee 🐝','Shark 🦈','Eagle 🦅'], ans:1, fact:'Bees pollinate over 70% of the world\'s food crops. No bees = no fruits or many vegetables!' },
      { t:'text', q:'What do earthworms do for the soil?', opts:['Eat all plant roots','Dig tunnels for air/water and add nutrients through waste 🪱','Make soil hard','Dry out the soil'], ans:1, fact:'One hectare of healthy soil can contain 3 million earthworms — nature\'s own soil engineers!' },
      { t:'text', q:'What is a food chain?', opts:['A type of restaurant','Sequence showing who eats who in nature 🌿→🐛→🐦','A grocery chain','How food is transported'], ans:1, fact:'Energy flows: plants → herbivores → carnivores. Remove one link and the chain collapses!' },
      { t:'text', q:'What does a caterpillar turn into?', opts:['A moth only','A bee','A butterfly or moth 🦋','A beetle'], ans:2, fact:'Metamorphosis: egg → caterpillar → chrysalis → butterfly. One of nature\'s greatest transformations!' },
      { t:'text', q:'Why are birds important on a farm?', opts:['They look pretty only','They eat harmful insects and spread seeds 🐦','They scare away rain clouds','They produce fertilizer only'], ans:1, fact:'A single barn owl can eat 1,000 mice per year — protecting a farmer\'s grain store for free!' },
    ],
    medium: [
      { t:'match', q:'Match each ANIMAL to its role on a farm or in nature!',
        pairs:[['Bee 🐝','Pollinates crops'],['Earthworm 🪱','Aerates soil'],['Ladybird 🐞','Eats aphid pests'],['Frog 🐸','Eats mosquitoes & flies']],
        fact:'Every creature has a role — biodiversity keeps farms healthy without needing chemicals!' },
      { t:'calc', q:'A field has 500 aphid insects. A colony of 20 ladybirds moves in. Each ladybird eats 50 aphids per day. How quickly are the aphids cleared?',
        steps:['Daily consumption: 20 × 50 = **1,000 aphids** per day','But only **500 exist**! All eaten in: **less than 1 day!**'],
        opts:['5 days to clear aphids','2 days to clear aphids','Less than 1 day ✅ (can eat more than exist!)','10 days to clear aphids'],
        ans:2, fact:'20 ladybirds × 50 each = 1,000 capacity/day. Only 500 aphids exist — cleared in half a day!' },
      { t:'drag', q:'Put this simple FOOD CHAIN in order (from energy source to top predator):',
        items:['☀️ Sun','🌿 Grass','🐛 Caterpillar','🐦 Bird','🦅 Eagle'],
        correct:[0,1,2,3,4],
        fact:'Sun provides energy → grass captures it → caterpillar eats grass → bird eats caterpillar → eagle hunts birds!' },
    ],
    hard: [
      { t:'story', char:'🦋', story:'A nature reserve has 5 bee colonies. Each colony has 40,000 bees. Scientists say at least 180,000 bees are needed to fully pollinate all plants. Each colony grows by 20% each season.',
        q:'After ONE season of growth, will there be ENOUGH bees? Calculate precisely! 🐝',
        opts:['200,000 bees — yes, enough! ✅','160,000 bees — not enough ❌','180,000 bees — exactly enough','240,000 bees — yes, enough ✅'],
        ans:3, fact:'5 × 40,000 = 200,000 bees. Each grows 20%: 200,000 × 1.2 = 240,000 bees. Well above 180,000!' },
    ],
  },
  soil: {
    easy: [
      { t:'text', q:'What is soil made of?', opts:['Only dirt and rocks','Rock particles, dead organisms, water, air and living creatures 🌍','Only sand','Only clay'], ans:1, fact:'Healthy soil is a living ecosystem! One teaspoon contains more organisms than people on Earth!' },
      { t:'text', q:'What is composting?', opts:['A type of cooking','Turning food scraps and plant waste into rich plant food 🌱','Storing food underground','A water treatment'], ans:1, fact:'Composting turns kitchen waste into "black gold" — nutrient-rich material that makes plants thrive!' },
      { t:'text', q:'What is soil erosion?', opts:['When soil gets wet','When topsoil is carried away by wind or water, leaving land bare 💨','When soil gets darker','When worms dig holes'], ans:1, fact:'Eroded soil takes 500 years to replace naturally. Trees and cover crops prevent erosion!' },
      { t:'text', q:'Which soil colour usually means the most fertile soil?', opts:['Bright yellow','Pale grey','Dark brown or black 🟤','Bright red'], ans:2, fact:'Dark soil is rich in organic matter (humus) from decomposed plants — perfect for growing food!' },
      { t:'text', q:'Why are earthworms important for soil health?', opts:['They eat all plant roots','They dig tunnels, add nutrients and help water soak in 🪱','They dry out the soil','They have no effect'], ans:1, fact:'Darwin called earthworms "nature\'s ploughs." Their burrows allow roots to breathe and water to drain!' },
    ],
    medium: [
      { t:'match', q:'Match each SOIL TYPE to what grows best in it!',
        pairs:[['Sandy soil 🏖️','Cacti & root vegetables'],['Clay soil 🏺','Rice & wheat'],['Loam soil 🌱','Most vegetables & fruits'],['Peaty soil 🌿','Blueberries & heather']],
        fact:'Loam (mix of sand, clay, silt and humus) is the "Goldilocks" soil — just right for most plants!' },
      { t:'calc', q:'A compost bin processes 2kg of waste/week. A family produces 5kg of kitchen waste/week. After 4 weeks, how much unprocessed waste is waiting?',
        steps:['Weekly surplus: 5 − 2 = **3kg unprocessed** per week','After 4 weeks: 3 × 4 = **12kg waiting**'],
        opts:['4kg waiting','8kg waiting','12kg waiting ✅','20kg waiting'],
        ans:2, fact:'5kg produced − 2kg processed = 3kg surplus/week. 3 × 4 = 12kg builds up. Need a bigger bin!' },
      { t:'drag', q:'Order the COMPOSTING PROCESS from start to finish:',
        items:['🍌 Add kitchen scraps','💧 Add moisture','🌡️ Heat builds up','🪱 Worms & bacteria work','🌱 Rich compost ready'],
        correct:[0,1,2,3,4],
        fact:'Add materials → moisture activates microbes → heat kills pathogens → organisms break it down → ready in 6–8 weeks!' },
    ],
    hard: [
      { t:'story', char:'🌍', story:'Farmer Nkechi has a 2-hectare farm. Topsoil is only 10cm deep when it should be 30cm. Without cover crops she loses 5cm every 3 years. With cover crops: ZERO erosion AND gains 2cm every 3 years.',
        q:'After 9 YEARS with cover crops, how deep will Nkechi\'s topsoil be? 🌱',
        opts:['10cm (no change)','16cm ✅ (10cm + 6cm gained)','30cm (reached target!)','8cm (still eroding)'],
        ans:1, fact:'No loss + 2cm every 3 years. 9 years = 3 periods × 2cm = 6cm added. 10+6=16cm!' },
    ],
  },
  french: {
    easy: [
      { t:'text', q:'Comment dit-on "tree" en français?', opts:['Un arbre 🌳','Une fleur 🌸','Un nuage ☁️','Une rivière 🌊'], ans:0, fact:'Un arbre est une grande plante avec un tronc solide. Les arbres produisent de l\'oxygène!' },
      { t:'text', q:'Qu\'est-ce qu\'une graine?', opts:['Une grande plante 🌳','La petite chose qu\'on plante pour faire pousser une nouvelle plante 🫘','Un insecte 🐛','De l\'eau 💧'], ans:1, fact:'La graine contient tout pour créer une nouvelle plante — c\'est le début de la vie végétale!' },
      { t:'text', q:'Comment dit-on "sun" en français?', opts:['La lune 🌙','La pluie 🌧️','Le soleil ☀️','Le vent 💨'], ans:2, fact:'Le soleil est notre étoile — il nous donne la lumière et la chaleur nécessaires à toute vie!' },
      { t:'text', q:'Quel insecte fabrique du miel?', opts:['Le papillon 🦋','La fourmi 🐜','L\'abeille 🐝','Le ver 🪱'], ans:2, fact:'L\'abeille visite les fleurs, récolte le nectar et le transforme en miel délicieux dans sa ruche!' },
      { t:'text', q:'Comment dit-on "garden" en français?', opts:['La forêt 🌲','Le jardin 🌿','La mer 🌊','Le désert 🏜️'], ans:1, fact:'Le jardin est un espace cultivé où l\'on fait pousser des fleurs, des légumes et des herbes!' },
    ],
    medium: [
      { t:'match', q:'Associe chaque mot français à sa traduction anglaise correcte!',
        pairs:[['La racine 🌿','Root'],['La feuille 🍃','Leaf'],['La fleur 🌸','Flower'],['La graine 🫘','Seed']],
        fact:'Les parties d\'une plante: racine (root), tige (stem), feuille (leaf), fleur (flower), graine (seed)!' },
      { t:'calc', q:'Amina a 3 pots de fleurs. Chaque pot contient 4 fleurs. La pluie arrose ses fleurs 3 jours sur 7. Combien de fleurs a-t-elle en tout? (Attention — la pluie est une distraction!)',
        steps:['Nombre de fleurs: 3 pots × 4 fleurs = **12 fleurs**','La pluie n\'est pas nécessaire pour ce calcul!'],
        opts:['7 fleurs','9 fleurs','12 fleurs ✅','15 fleurs'],
        ans:2, fact:'3 × 4 = 12 fleurs! Attention aux informations inutiles dans un problème — piège classique!' },
      { t:'drag', q:'Mets le cycle de vie d\'une plante dans le bon ordre en français:',
        items:['🫘 La graine','🌱 La germination','🌿 La plante','🌸 La floraison','🍎 Le fruit'],
        correct:[0,1,2,3,4],
        fact:'Graine → germe → pousse → fleurit → fait un fruit contenant de nouvelles graines. Le cycle continue!' },
    ],
    hard: [
      { t:'story', char:'👩‍🌾', story:'Fatou visite une ferme avec sa classe. La fermière dit: «J\'ai 4 rangées de maïs avec 9 plants chacune. Une tempête a abîmé exactement 1/3 de tous mes plants. Chaque plant restant produira 3 épis de maïs.»',
        q:'Combien d\'épis de maïs peut-on compter après la tempête? Réfléchis bien! 🌽',
        opts:['72 épis ✅','108 épis (tous les plants)','36 épis (seulement les perdus)','54 épis'],
        ans:0, fact:'4 × 9 = 36 plants. 1/3 abîmés = 12. Restants = 24. 24 × 3 épis = 72 épis de maïs!' },
      { t:'story', char:'🌿', story:'Le professeur pose une devinette: «Je produis de l\'oxygène. J\'absorbe le CO₂. Je fais la photosynthèse. Les animaux mangent mes fruits. Mes racines boivent l\'eau. Sans moi, les humains ne peuvent pas respirer. Qui suis-je?»',
        q:'Résous la devinette et explique comment tu as trouvé la réponse! 🌳',
        opts:['Un animal 🦁 (il respire de l\'oxygène)','Une pierre 🪨 (elle est dans la nature)','Un arbre 🌳 — toutes les caractéristiques correspondent! ✅','Un nuage ☁️ (il produit la pluie)'],
        ans:2, fact:'Produit O₂ ✅, absorbe CO₂ ✅, photosynthèse ✅, fruits comestibles ✅, racines ✅ — c\'est un arbre!' },
    ],
  },
  weather: {
    easy: [
      { t:'text', q:'What causes wind?', opts:['Trees waving their branches','Differences in air temperature causing air to move 💨','Rain falling heavily','Clouds moving across the sky'], ans:1, fact:'Hot air rises, cool air rushes in to replace it — that movement is the wind we feel!' },
      { t:'text', q:'What is the difference between weather and climate?', opts:['They mean the same thing','Weather = today; climate = long-term average pattern 📅','Climate = current temperature','Weather is outdoor; climate is indoor'], ans:1, fact:'Weather = today\'s rain. Climate = "this region gets rain every October." Climate is the big picture!' },
      { t:'text', q:'What is humidity?', opts:['Temperature of the air','Amount of water vapour in the air 💦','How hard wind blows','Amount of sunshine'], ans:1, fact:'High humidity means air is full of water vapour — that\'s why hot humid days feel so sticky!' },
      { t:'text', q:'Which season comes after summer in the Northern Hemisphere?', opts:['Spring 🌸','Winter ❄️','Autumn 🍂','Another summer'], ans:2, fact:'Summer → Autumn → Winter → Spring → Summer again. Each season lasts about 3 months!' },
      { t:'text', q:'What is a thunderstorm?', opts:['Heavy snow with wind','Storm with lightning, thunder, heavy rain and strong winds ⛈️','A very sunny hot day','Fog that covers the ground'], ans:1, fact:'Lightning is a giant electric spark. Thunder is the sound of that spark heating air so fast it expands!' },
    ],
    medium: [
      { t:'match', q:'Match each WEATHER TYPE to its correct description!',
        pairs:[['Blizzard ❄️','Heavy snow + strong winds'],['Drought 🏜️','Long period with no rain'],['Tornado 🌪️','Violent rotating wind column'],['Flood 🌊','Too much water on usually dry land']],
        fact:'Each extreme weather event has different causes and needs different preparation to stay safe!' },
      { t:'calc', q:'A weather station recorded daily rainfall: Mon 12mm, Tue 0mm, Wed 8mm, Thu 15mm, Fri 5mm. What is the average daily rainfall?',
        steps:['Total rainfall: 12+0+8+15+5 = **40mm**','Average per day: 40 ÷ 5 = **8mm per day**'],
        opts:['5mm per day','8mm per day ✅','10mm per day','40mm per day'],
        ans:1, fact:'(12+0+8+15+5)÷5 = 40÷5 = 8mm average. Meteorologists use averages to understand weather patterns!' },
      { t:'drag', q:'Order the FOUR SEASONS correctly starting from Spring:',
        items:['🌸 Spring','☀️ Summer','🍂 Autumn','❄️ Winter'],
        correct:[0,1,2,3],
        fact:'Spring (growth) → Summer (heat) → Autumn (harvest) → Winter (rest) → Spring again. Life\'s cycle!' },
    ],
    hard: [
      { t:'story', char:'🌤️', story:'Young meteorologist Kwame studied climate change in his town. Over 10 years, the average summer temperature rose from 27°C to 32°C. He predicts that if this trend continues for another 10 years, summers will exceed 37°C.',
        q:'Is Kwame\'s prediction mathematically correct? What is the rise per year? 📊',
        opts:['Yes — rises 0.5°C/year, so +5°C in 10 more years = 37°C ✅','No — it will only reach 34°C','Yes — rises 1°C/year, reaching 42°C','Not enough data to calculate'],
        ans:0, fact:'32−27=5°C rise over 10 years = 0.5°C/year. Another 10 years: 32+(0.5×10)=37°C. Kwame is right!' },
    ],
  },
}

// ─── CATEGORY CONFIG ─────────────────────────────────────────────
const CATS: { id: Cat; icon: string; name: string; sub: string; color: string; bg: string; border: string }[] = [
  { id:'food',    icon:'🍎', name:'Food & Nutrition',   sub:'Farm to plate',    color:'#f47aaa', bg:'#2a0f1a', border:'#f47aaa' },
  { id:'energy',  icon:'⚡', name:'Energy & Power',     sub:'Sun, wind & more', color:'#f4b234', bg:'#2a1800', border:'#f4b234' },
  { id:'water',   icon:'💧', name:'Water Cycle',        sub:'Oceans & rivers',  color:'#5ab8f0', bg:'#002840', border:'#5ab8f0' },
  { id:'nature',  icon:'🌱', name:'Garden & Plants',    sub:'Seeds & growth',   color:'#7ddb7d', bg:'#0a2a0a', border:'#7ddb7d' },
  { id:'climate', icon:'🌍', name:'Climate & Earth',    sub:'Our planet',       color:'#9a9aff', bg:'#1a1a2a', border:'#9a9aff' },
  { id:'science', icon:'🔬', name:'Farm Science',       sub:'Tech & tools',     color:'#5ae8f0', bg:'#00222a', border:'#5ae8f0' },
  { id:'animals', icon:'🐛', name:'Animals & Insects',  sub:'Farm creatures',   color:'#f48a3a', bg:'#2a1200', border:'#f48a3a' },
  { id:'soil',    icon:'🪱', name:'Soil & Compost',     sub:"Earth's recipe",   color:'#c89a4a', bg:'#1e1200', border:'#c89a4a' },
  { id:'french',  icon:'🇫🇷', name:'Français · Nature', sub:'Le jardin',        color:'#7ab8ff', bg:'#00043a', border:'#7ab8ff' },
  { id:'weather', icon:'⛅', name:'Weather & Seasons',  sub:'Rain & sunshine',  color:'#5acef0', bg:'#001a2a', border:'#5acef0' },
]

const DIFF_PTS: Record<Diff,number> = { easy:5, medium:10, hard:15 }

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length-1; i > 0; i--) {
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]] = [a[j],a[i]]
  }
  return a
}

// ─── MATCH GAME SUB-COMPONENT ─────────────────────────────────
function MatchGame({ q, onCorrect, onWrong }: { q:Question, onCorrect:()=>void, onWrong:()=>void }) {
  const [matched, setMatched] = useState<string[]>([])
  const [selLeft, setSelLeft] = useState<string|null>(null)
  const [wrongPair, setWrongPair] = useState<string[]>([])
  const [done, setDone] = useState(false)

  const shuffledPairs = useState(() => shuffle(q.pairs!))[0]
  const rights = useState(() => shuffle(q.pairs!.map(p=>p[1])))[0]

  const pickLeft = (val: string) => {
    if (done || matched.includes(val)) return
    setSelLeft(v => v===val ? null : val)
  }

  const pickRight = (val: string) => {
    if (!selLeft || done) return
    const correct = q.pairs!.find(p=>p[0]===selLeft)
    if (correct && correct[1]===val) {
      const newMatched = [...matched, selLeft]
      setMatched(newMatched)
      setSelLeft(null)
      if (newMatched.length === q.pairs!.length) {
        setDone(true)
        onCorrect()
      }
    } else {
      setWrongPair([selLeft, val])
      setTimeout(() => { setWrongPair([]); setSelLeft(null) }, 700)
      onWrong()
    }
  }

  const leftKey = (v:string) => matched.includes(v) ? 'matched' : selLeft===v ? 'selL' : wrongPair[0]===v ? 'wrong' : 'idle'
  const rightKey = (v:string) => {
    const left = q.pairs!.find(p=>p[1]===v)?.[0]||''
    return matched.includes(left) ? 'matched' : wrongPair[1]===v ? 'wrong' : 'idle'
  }

  const itemStyle = (state: string): React.CSSProperties => {
    const base: React.CSSProperties = { padding:'10px 12px', borderRadius:12, textAlign:'center', cursor:'pointer', transition:'all .2s', fontSize:'0.88rem', fontWeight:700, marginBottom:6 }
    if (state==='matched') return {...base, background:'#0a2a0a', border:'2px solid #2d8a2d', color:'#7ddb7d', cursor:'default'}
    if (state==='selL') return {...base, background:'#1a0d2e', border:'2px solid #c87af0', color:'#c87af0'}
    if (state==='wrong') return {...base, background:'#2a0a0a', border:'2px solid #f47272', color:'#f47272', animation:'shk .4s ease'}
    return {...base, background:'#0a1e2e', border:'2px solid #1e3a5a', color:'#c8dff0'}
  }

  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:16 }}>
      <div>
        <div style={{ fontSize:'0.7rem', color:'#8db4cc', fontWeight:800, letterSpacing:'0.5px', textTransform:'uppercase', marginBottom:8, textAlign:'center' }}>Match from here 👇</div>
        {shuffledPairs.map(([l]) => (
          <div key={l} style={itemStyle(leftKey(l))} onClick={() => pickLeft(l)}>{l}</div>
        ))}
      </div>
      <div>
        <div style={{ fontSize:'0.7rem', color:'#8db4cc', fontWeight:800, letterSpacing:'0.5px', textTransform:'uppercase', marginBottom:8, textAlign:'center' }}>To the correct answer</div>
        {rights.map(r => (
          <div key={r} style={itemStyle(rightKey(r))} onClick={() => pickRight(r)}>{r}</div>
        ))}
      </div>
    </div>
  )
}

// ─── DRAG-SORT SUB-COMPONENT ─────────────────────────────────
function DragGame({ q, onResult }: { q: Question, onResult:(correct:boolean)=>void }) {
  const [chips] = useState(() => shuffle(q.items!.map((text,i)=>({text,origIdx:i}))))
  const [slots, setSlots] = useState<(number|null)[]>(new Array(q.items!.length).fill(null))
  const [selChip, setSelChip] = useState<number|null>(null)
  const [checked, setChecked] = useState(false)
  const [results, setResults] = useState<(boolean|null)[]>(new Array(q.items!.length).fill(null))

  const placed = slots.filter(Boolean).length + slots.filter(s=>s===0).length

  const pickChip = (i:number) => {
    if (checked) return
    setSelChip(v => v===i ? null : i)
  }

  const fillSlot = (si:number) => {
    if (selChip===null || checked) return
    const newSlots = [...slots]
    // if slot already filled, return chip
    if (newSlots[si] !== null) {
      const old = newSlots[si]!
      if (old !== selChip) setSelChip(null)
    }
    newSlots[si] = selChip
    setSlots(newSlots)
    setSelChip(null)
  }

  const check = () => {
    if (slots.includes(null)) return
    const res = slots.map((chipIdx, si) => {
      if (chipIdx===null) return null
      return chips[chipIdx].origIdx === q.correct![si]
    })
    setResults(res)
    setChecked(true)
    onResult(res.every(r=>r===true))
  }

  const usedChips = new Set(slots.filter(s=>s!==null) as number[])

  return (
    <div style={{ marginBottom:16 }}>
      <div style={{ fontSize:'0.75rem', color:'#8db4cc', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.4px', marginBottom:8 }}>
        Tap a card, then tap a slot to place it:
      </div>
      <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:10 }}>
        {slots.map((chipIdx, si) => {
          const res = results[si]
          let bg='#0d2233', border='2px dashed #1e4d6b', color='#4a7a99', label=String(si+1)
          if (chipIdx!==null) {
            label = chips[chipIdx].text
            bg = res===null ? '#1a2e42' : res ? '#0a2a0a' : '#2a0a0a'
            border = res===null ? '2px solid #2d5a7a' : res ? '2px solid #7ddb7d' : '2px solid #f47272'
            color = res===null ? '#c8dff0' : res ? '#7ddb7d' : '#f47272'
          }
          return (
            <div key={si} onClick={() => fillSlot(si)} style={{
              minWidth:110, padding:'10px 12px', borderRadius:10, textAlign:'center',
              background:bg, border, color, fontWeight:700, fontSize:'0.8rem', cursor:'pointer',
              transition:'all .2s',
            }}>{label}</div>
          )
        })}
      </div>
      <div style={{ display:'flex', flexWrap:'wrap', gap:8, padding:10, background:'#0a1e2e', border:'1.5px dashed #2d5a7a', borderRadius:12, marginBottom:10, minHeight:48 }}>
        {chips.map((c,i) => {
          const isUsed = usedChips.has(i)
          const isSel = selChip===i
          return (
            <div key={i} onClick={() => !isUsed && pickChip(i)} style={{
              padding:'9px 14px', background: isSel ? '#1a4a6a' : '#1a2e42',
              border:`1.5px solid ${isSel ? '#5ab8f0' : '#2d5a7a'}`,
              borderRadius:10, fontSize:'0.82rem', color: isUsed ? '#2a4a5a' : isSel ? '#5ab8f0' : '#c8dff0',
              fontWeight:700, cursor: isUsed ? 'default' : 'pointer', opacity: isUsed ? 0.4 : 1,
              transition:'all .2s',
            }}>{c.text}</div>
          )
        })}
      </div>
      {!checked && (
        <button onClick={check} disabled={slots.includes(null)} style={{
          padding:'9px 20px', background: slots.includes(null) ? '#0d2233' : '#0a2a3d',
          border:`1.5px solid ${slots.includes(null) ? '#1e3a5a' : '#2d5a7a'}`,
          borderRadius:10, color: slots.includes(null) ? '#4a7a99' : '#5ab8f0',
          fontSize:'0.85rem', fontWeight:700, cursor: slots.includes(null) ? 'not-allowed' : 'pointer',
          fontFamily:'inherit',
        }}>✅ Check My Order</button>
      )}
    </div>
  )
}

// ─── MAIN PAGE ────────────────────────────────────────────────
export default function SproutsPlayzone() {
  const [screen, setScreen] = useState<'home'|'game'|'result'>('home')
  const [diff, setDiff] = useState<Diff>('easy')
  const [cat, setCat] = useState<Cat|null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [idx, setIdx] = useState(0)
  const [lives, setLives] = useState(3)
  const [pts, setPts] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [selOpt, setSelOpt] = useState<number|null>(null)
  const [showFb, setShowFb] = useState(false)
  const [fbCorrect, setFbCorrect] = useState(false)
  const [showMilestone, setShowMilestone] = useState(false)
  const [burst, setBurst] = useState<string|null>(null)
  const [matchWrong, setMatchWrong] = useState(false)

  const q = questions[idx]
  const total = questions.length
  const pct = total > 0 ? (idx/total)*100 : 0

  function startGame() {
    if (!cat) return
    const pool = QB[cat][diff]
    if (!pool?.length) { alert('Questions coming soon!'); return }
    setQuestions(shuffle(pool).slice(0, Math.min(pool.length, 6)))
    setIdx(0); setLives(3); setPts(0); setCorrect(0)
    setAnswered(false); setSelOpt(null); setShowFb(false)
    setShowMilestone(false); setBurst(null); setScreen('game')
  }

  function handleOpt(i: number) {
    if (answered || !q) return
    setAnswered(true); setSelOpt(i)
    const ok = i === q.ans!
    setFbCorrect(ok); setShowFb(true)
    if (ok) {
      setPts(p => p + DIFF_PTS[diff])
      setCorrect(c => c+1)
      setBurst(diff==='hard' ? '🏆 Brilliant!' : diff==='medium' ? '⭐ Great!' : '🌟 Correct!')
      setTimeout(() => setBurst(null), 2000)
    } else {
      setLives(l => l-1)
      if (lives-1 <= 0) setTimeout(() => setScreen('result'), 2000)
    }
  }

  function handleMatchCorrect() {
    setAnswered(true); setFbCorrect(true); setShowFb(true)
    setPts(p => p + DIFF_PTS[diff]); setCorrect(c => c+1)
    setBurst('🌟 All matched!'); setTimeout(() => setBurst(null), 2000)
  }

  function handleMatchWrong() {
    const newLives = lives - 1
    setLives(newLives)
    if (newLives <= 0) setTimeout(() => setScreen('result'), 2000)
  }

  function handleDragResult(ok: boolean) {
    setAnswered(true); setFbCorrect(ok); setShowFb(true)
    if (ok) {
      setPts(p => p + DIFF_PTS[diff]); setCorrect(c => c+1)
      setBurst('🌟 Perfect order!'); setTimeout(() => setBurst(null), 2000)
    } else {
      const newLives = lives - 1; setLives(newLives)
      if (newLives <= 0) setTimeout(() => setScreen('result'), 2000)
    }
  }

  function nextQ() {
    const next = idx + 1
    if (next >= total) { setScreen('result'); return }
    if (next === Math.floor(total/2) && next > 0) setShowMilestone(true)
    setIdx(next); setAnswered(false); setSelOpt(null); setShowFb(false)
  }

  const catInfo = CATS.find(c => c.id === cat)!

  // ---- STYLES ----
  const s = {
    page: { minHeight:'100vh', background:'#0d1b2a', fontFamily:"'Nunito','Segoe UI',sans-serif" } as React.CSSProperties,
    topbar: { background:'linear-gradient(90deg,#0a3d0a,#145214,#1a6b1a)', padding:'11px 20px', display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:'3px solid #2d8a2d', position:'sticky' as const, top:0, zIndex:50 } as React.CSSProperties,
    shell: { maxWidth:920, margin:'0 auto', padding:'20px 14px' } as React.CSSProperties,
  }

  const diffCfg = {
    easy:  { label:'🟢 Easy',   sub:'Read & Answer · 5 pts',             onBg:'#1a5a1a', border:'#7ddb7d', textCol:'#7ddb7d', offBg:'#0f2b0f', offBorder:'#2d6b2d', desc:'📖 Read a question, look at the options, and pick the correct answer. Perfect for warming up!' },
    medium:{ label:'🟡 Medium', sub:'Match, Sort & Calculate · 10 pts',   onBg:'#4a2e00', border:'#f4a234', textCol:'#f4a234', offBg:'#2a1800', offBorder:'#7a5200', desc:'🧩 Play match games, solve calculations with working shown, and drag-sort sequencing puzzles!' },
    hard:  { label:'🔴 Hard',   sub:'Story Challenges · 15 pts',          onBg:'#4a0f0f', border:'#f47272', textCol:'#f47272', offBg:'#2a0a0a', offBorder:'#8a1a1a', desc:'🎭 Read a story problem, think like a scientist or farmer, and apply real maths to solve it!' },
  }

  const resultPct = total > 0 ? Math.round((correct/total)*100) : 0

  return (
    <div style={s.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes qIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes popIn{0%,100%{transform:scale(1)}50%{transform:scale(1.07)}}
        @keyframes shk{0%,100%{transform:translateX(0)}25%{transform:translateX(-7px)}75%{transform:translateX(7px)}}
        @keyframes bst{0%{opacity:0;transform:translate(-50%,-50%) scale(.4)}20%{opacity:1;transform:translate(-50%,-50%) scale(1.1)}80%{opacity:1;transform:translate(-50%,-50%) scale(1)}100%{opacity:0;transform:translate(-50%,-50%) scale(.8)}}
        .cat-card-hover:hover{transform:translateY(-6px) scale(1.04)!important;cursor:pointer}
        .opt-btn:hover:not(:disabled){transform:scale(1.03)!important}
        .go-hover:hover:not(:disabled){transform:translateY(-4px)!important;box-shadow:0 16px 36px rgba(29,107,29,.6)!important}
        .next-hover:hover{transform:translateY(-3px)!important}
        .diff-hover:hover{transform:translateY(-2px);cursor:pointer}
      `}</style>

      {/* BURST */}
      {burst && (
        <div style={{ position:'fixed', top:'50%', left:'50%', zIndex:9999, pointerEvents:'none',
          fontFamily:"'Fredoka One',cursive", fontSize:'1.6rem', color:'#f4b234',
          background:'linear-gradient(135deg,#1a3a0a,#2d6b2d)', border:'3px solid #7ddb7d',
          padding:'16px 32px', borderRadius:20, textAlign:'center',
          animation:'bst 2s ease forwards', whiteSpace:'nowrap' }}>
          {burst}
        </div>
      )}

      {/* TOP BAR */}
      <div style={s.topbar}>
        <div style={{ fontFamily:"'Fredoka One',cursive", fontSize:'1.4rem', color:'#fff', letterSpacing:1 }}>
          🌿 LIFEWS<span style={{ color:'#7ddb7d' }}>Connect</span> · PlayZone
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ display:'flex', gap:3 }}>
            {[0,1,2].map(i => (
              <span key={i} style={{ fontSize:'1.25rem', opacity: i<lives?1:0.2, transition:'all .3s' }}>❤️</span>
            ))}
          </div>
          <div style={{ background:'rgba(255,255,255,.15)', border:'2px solid rgba(255,255,255,.3)', borderRadius:20, padding:'5px 14px', color:'#fff', fontWeight:900, fontSize:'0.95rem' }}>
            ⭐ {pts}
          </div>
        </div>
      </div>

      <div style={s.shell}>

        {/* ========== HOME ========== */}
        {screen === 'home' && (
          <div>
            {/* HERO */}
            <div style={{ background:'linear-gradient(135deg,#1a3a4a,#0d2233)', borderRadius:22, padding:'24px 28px', marginBottom:24, display:'flex', alignItems:'center', justifyContent:'space-between', border:'2px solid #1e4d6b' }}>
              <div>
                <h1 style={{ fontFamily:"'Fredoka One',cursive", fontSize:'2.2rem', color:'#fff', lineHeight:1.1, marginBottom:6 }}>
                  🌿 <span style={{ color:'#7ddb7d' }}>Sprouts</span> PlayZone
                </h1>
                <p style={{ color:'#8db4cc', fontWeight:600, fontSize:'0.95rem' }}>Ages 6–10 · Learn, play & earn real points!</p>
                <div style={{ display:'flex', gap:8, marginTop:12, flexWrap:'wrap' }}>
                  {[['10 Topics','#1a4a1a','#7ddb7d'],['3 Difficulty Levels','#0d2e4a','#7ab8e8'],['Earn Badges','#3a1e00','#f4a234']].map(([t,bg,c])=>(
                    <span key={t} style={{ padding:'5px 14px', borderRadius:20, fontSize:'0.75rem', fontWeight:800, letterSpacing:'0.4px', textTransform:'uppercase', background:bg, color:c, border:`1.5px solid ${c}` }}>{t}</span>
                  ))}
                </div>
              </div>
              <div style={{ fontSize:'5rem', filter:'drop-shadow(0 4px 12px rgba(0,0,0,.4))' }}>🌱</div>
            </div>

            {/* DIFFICULTY */}
            <div style={{ display:'flex', gap:10, marginBottom:16, flexWrap:'wrap' }}>
              {(['easy','medium','hard'] as Diff[]).map(d => {
                const dc = diffCfg[d], on = diff===d
                return (
                  <button key={d} className="diff-hover" onClick={() => setDiff(d)} style={{
                    flex:1, minWidth:140, padding:'12px 16px', borderRadius:14, border:`2.5px solid ${on?dc.border:dc.offBorder}`,
                    background: on ? dc.onBg : dc.offBg, color: dc.textCol, textAlign:'left', fontFamily:'inherit',
                    boxShadow: on ? `0 0 0 3px ${dc.border}33` : 'none', transform: on ? 'translateY(-2px)' : 'none', transition:'all .22s',
                  }}>
                    <div style={{ fontFamily:"'Fredoka One',cursive", fontSize:'1.05rem', marginBottom:2 }}>{dc.label}</div>
                    <div style={{ fontSize:'0.7rem', fontWeight:700, opacity:.75, textTransform:'uppercase', letterSpacing:'0.4px' }}>{dc.sub}</div>
                  </button>
                )
              })}
            </div>

            {/* DIFF DESC */}
            <div style={{ background: diff==='easy'?'#0f2b0f': diff==='medium'?'#2a1800':'#2a0a0a',
              borderRadius:12, padding:'10px 16px', marginBottom:22, fontSize:'0.88rem', fontWeight:700,
              color: diff==='easy'?'#7ddb7d': diff==='medium'?'#f4a234':'#f47272',
              borderLeft:`4px solid ${diff==='easy'?'#7ddb7d': diff==='medium'?'#f4a234':'#f47272'}` }}>
              {diffCfg[diff].desc}
            </div>

            <div style={{ fontFamily:"'Fredoka One',cursive", fontSize:'1.05rem', color:'#8db4cc', marginBottom:14, letterSpacing:'0.5px' }}>
              🎮 Choose Your Game Topic
            </div>

            {/* CATEGORY GRID */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:12, marginBottom:28 }}>
              {CATS.map(cc => (
                <div key={cc.id} className="cat-card-hover" onClick={() => setCat(cc.id)} style={{
                  background: cc.bg, borderRadius:18, padding:'16px 10px', textAlign:'center',
                  border:`2.5px solid ${cat===cc.id ? cc.color : cc.border+'55'}`,
                  boxShadow: cat===cc.id ? `0 0 0 3px ${cc.color}33` : 'none',
                  transform: cat===cc.id ? 'translateY(-4px)' : 'none', transition:'all .28s',
                }}>
                  <div style={{ fontSize:'2.4rem', marginBottom:8, display:'block', filter:'drop-shadow(0 3px 6px rgba(0,0,0,.3))' }}>{cc.icon}</div>
                  <div style={{ fontFamily:"'Fredoka One',cursive", fontSize:'0.88rem', color: cc.color, lineHeight:1.2 }}>{cc.name}</div>
                  <div style={{ fontSize:'0.66rem', color: cc.color+'99', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.3px', marginTop:4 }}>{cc.sub}</div>
                </div>
              ))}
            </div>

            <button className="go-hover" onClick={startGame} disabled={!cat} style={{
              width:'100%', padding:18, border:'none', borderRadius:18,
              background: cat ? 'linear-gradient(135deg,#1a6b1a,#3daa3d)' : '#1a2a1a',
              color: cat ? '#fff' : '#3a5a3a', fontFamily:"'Fredoka One',cursive", fontSize:'1.35rem',
              cursor: cat ? 'pointer' : 'not-allowed', transition:'all .28s',
              boxShadow: cat ? '0 8px 24px rgba(29,107,29,.5)' : 'none',
            }}>
              {cat ? `🚀 Start Playing — ${catInfo?.name}!` : 'Select a topic above ☝️'}
            </button>
          </div>
        )}

        {/* ========== GAME ========== */}
        {screen === 'game' && q && (
          <div>
            {/* MILESTONE */}
            {showMilestone && (
              <div style={{ background:'linear-gradient(135deg,#2a1800,#4a2d00)', border:'2px solid #f4a234', borderRadius:20, padding:24, textAlign:'center', marginBottom:18, animation:'qIn .4s ease' }}>
                <div style={{ fontFamily:"'Fredoka One',cursive", fontSize:'1.9rem', color:'#f4b234' }}>🌟 Halfway There!</div>
                <div style={{ color:'#c8a060', fontWeight:700, marginTop:6 }}>{correct} correct so far — you're growing fast, Sprout!</div>
                <button onClick={() => setShowMilestone(false)} style={{ background:'#f4a234', color:'#1a0e00', border:'none', borderRadius:12, padding:'11px 26px', fontFamily:"'Fredoka One',cursive", fontSize:'1.1rem', cursor:'pointer', marginTop:14 }}>Keep Going! 🚀</button>
              </div>
            )}

            {/* PROGRESS */}
            <div style={{ background:'#0d1e2e', borderRadius:14, padding:'14px 18px', marginBottom:16, border:'1.5px solid #1e3a5a' }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8, color:'#8db4cc', fontWeight:700, fontSize:'0.85rem' }}>
                <span>Q {idx+1} / {total}</span>
                <span>{catInfo?.icon} {catInfo?.name}</span>
              </div>
              <div style={{ background:'#1a2e42', borderRadius:10, height:12, overflow:'hidden' }}>
                <div style={{ width:`${pct}%`, height:'100%', background:'linear-gradient(90deg,#2d8a2d,#7ddb7d)', borderRadius:10, transition:'width .5s ease' }} />
              </div>
            </div>

            {/* Q CARD */}
            <div style={{ background:'#0d1e2e', borderRadius:22, padding:'24px 22px', border:'2px solid #1e3a5a', marginBottom:16, animation:'qIn .35s ease' }}>
              {/* BADGE */}
              {(() => {
                const badges: Record<string,[string,string]> = {
                  text:  ['📖 Text Question','#0d2e4a,#5ab8f0'],
                  match: ['🎯 Match Game','#2a1a3a,#c87af0'],
                  drag:  ['🔀 Sorting Puzzle','#2a1800,#f4a234'],
                  calc:  ['🔢 Calculate','#0a2a0a,#7ddb7d'],
                  story: ['🎭 Story Challenge','#2a0a0a,#f47272'],
                }
                const key = cat==='french' && q.t!=='text' ? 'drag' : q.t
                const [label, colors] = badges[key]||badges.text
                const [bg,col] = colors.split(',')
                return <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'4px 13px', borderRadius:20, fontSize:'0.72rem', fontWeight:800, letterSpacing:'0.5px', textTransform:'uppercase', marginBottom:14, background:bg, color:col }}>{label}</div>
              })()}

              {/* STORY BUBBLE */}
              {q.story && (
                <div style={{ background:'linear-gradient(135deg,#0d1e3a,#1a0d2e)', borderLeft:'4px solid #7c4dff', borderRadius:14, padding:'14px 16px', marginBottom:16, fontSize:'0.93rem', color:'#b8c8e8', fontWeight:600, lineHeight:1.65, overflow:'hidden' }}>
                  <span style={{ fontSize:'2.2rem', float:'left', marginRight:12, lineHeight:1.1 }}>{q.char}</span>
                  {q.story}
                  <div style={{ clear:'both' }} />
                </div>
              )}

              {/* CALC DISPLAY */}
              {q.t === 'calc' && q.steps && (
                <div style={{ background:'#081622', border:'1.5px solid #1e3a5a', borderRadius:12, padding:'14px 18px', marginBottom:16, fontSize:'0.9rem', color:'#8db4cc', fontWeight:600, lineHeight:1.9 }}>
                  {q.steps.map((step, i) => {
                    const parts = step.split('**')
                    return (
                      <div key={i} style={{ marginBottom: i<q.steps!.length-1 ? 4 : 0 }}>
                        → {parts.map((p, j) => j%2===1 ? <strong key={j} style={{ color:j===parts.length-2?'#7ddb7d':'#f4a234' }}>{p}</strong> : <span key={j}>{p}</span>)}
                      </div>
                    )
                  })}
                </div>
              )}

              {/* Q TEXT */}
              <div style={{ fontSize:'1.15rem', fontWeight:800, color:'#e8f4ff', lineHeight:1.5, marginBottom:18 }}>{q.q}</div>

              {/* MATCH GAME */}
              {q.t === 'match' && !answered && (
                <MatchGame q={q} onCorrect={handleMatchCorrect} onWrong={handleMatchWrong} />
              )}

              {/* DRAG SORT */}
              {q.t === 'drag' && !answered && (
                <DragGame q={q} onResult={handleDragResult} />
              )}

              {/* OPTIONS (text, calc, story) */}
              {(q.t === 'text' || q.t === 'calc' || q.t === 'story') && (
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                  {q.opts!.map((opt, i) => {
                    const isCorrect = i===q.ans
                    const isSel = i===selOpt
                    let bg='#0a1e2e', border='2.5px solid #1e3a5a', color='#c8dff0'
                    if (answered) {
                      if (isCorrect) { bg='#0a2a0a'; border='2.5px solid #7ddb7d'; color='#7ddb7d' }
                      else if (isSel) { bg='#2a0a0a'; border='2.5px solid #f47272'; color='#f47272' }
                      else { bg='#0a1422'; border='2.5px solid #1a2e42'; color='#4a7a99' }
                    }
                    return (
                      <button key={i} className={!answered?'opt-btn':''} onClick={() => handleOpt(i)} disabled={answered} style={{
                        background:bg, border, borderRadius:14, padding:'13px 10px', textAlign:'center',
                        fontSize:'0.9rem', fontWeight:700, color, cursor: answered?'default':'pointer',
                        lineHeight:1.4, transition:'all .2s', fontFamily:'inherit',
                        animation: answered && isCorrect ? 'popIn .45s ease' : answered && isSel && !isCorrect ? 'shk .4s ease' : 'none',
                      }}>{opt}</button>
                    )
                  })}
                </div>
              )}

              {/* FEEDBACK */}
              {showFb && (
                <div style={{ textAlign:'center', padding:'16px 10px', animation:'popIn .3s ease' }}>
                  <div style={{ fontSize:'2.8rem', marginBottom:6 }}>{fbCorrect?'🎉':'😅'}</div>
                  <div style={{ fontFamily:"'Fredoka One',cursive", fontSize:'1.3rem', color: fbCorrect?'#7ddb7d':'#f47272' }}>
                    {fbCorrect ? `Correct! +${DIFF_PTS[diff]} points!` : 'Not quite!'}
                  </div>
                  <div style={{ fontSize:'0.85rem', color:'#8db4cc', fontWeight:600, marginTop:8, lineHeight:1.5 }}>
                    💡 {q.fact}
                  </div>
                </div>
              )}
            </div>

            {/* NEXT BTN */}
            {(showFb && lives > 0) && (
              <button className="next-hover" onClick={nextQ} style={{
                width:'100%', padding:14, border:'none', borderRadius:14,
                background:'linear-gradient(135deg,#1a5c1a,#2d8a2d)', color:'#fff',
                fontFamily:"'Fredoka One',cursive", fontSize:'1.25rem', cursor:'pointer',
                boxShadow:'0 6px 20px rgba(27,94,32,.4)', transition:'transform .2s', animation:'qIn .3s ease',
              }}>
                {idx+1 >= total ? '🏆 See My Results!' : 'Next Question ➡️'}
              </button>
            )}
          </div>
        )}

        {/* ========== RESULT ========== */}
        {screen === 'result' && (
          <div style={{ animation:'qIn .45s ease' }}>
            <div style={{ background:'#0d1e2e', border:'2px solid #1e3a5a', borderRadius:24, padding:'32px 24px', textAlign:'center' }}>
              <div style={{ fontSize:'5rem', marginBottom:14 }}>
                {resultPct>=80?'🏆':resultPct>=60?'⭐':'🌱'}
              </div>
              <div style={{ fontFamily:"'Fredoka One',cursive", fontSize:'2rem', color:'#fff', marginBottom:6 }}>
                {resultPct>=80?'Amazing Sprout! 🏆':resultPct>=60?'Great Job! ⭐':'Keep Growing! 🌱'}
              </div>
              <div style={{ background:'linear-gradient(135deg,#1a5c1a,#2d8a2d)', display:'inline-block', padding:'10px 28px', borderRadius:30, color:'#fff', fontFamily:"'Fredoka One',cursive", fontSize:'1.5rem', margin:'14px 0' }}>
                ⭐ {pts} points
              </div>
              <div style={{ color:'#8db4cc', fontWeight:700, marginBottom:24 }}>
                {correct} out of {total} correct ({resultPct}%)
              </div>
              <button onClick={startGame} style={{ width:'100%', padding:13, border:'none', borderRadius:14, background:'linear-gradient(135deg,#4a2d8a,#7a5acc)', color:'#fff', fontFamily:"'Fredoka One',cursive", fontSize:'1.15rem', cursor:'pointer', marginBottom:10 }}>
                🔄 Play Again
              </button>
              <button onClick={() => { setScreen('home'); setCat(null); setLives(3); setPts(0) }} style={{ width:'100%', padding:13, border:'none', borderRadius:14, background:'linear-gradient(135deg,#1a5c1a,#2d8a2d)', color:'#fff', fontFamily:"'Fredoka One',cursive", fontSize:'1.15rem', cursor:'pointer' }}>
                🏠 Pick New Topic
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

import { useState } from 'react'
