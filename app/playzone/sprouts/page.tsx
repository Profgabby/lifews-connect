'use client'
import { useState } from 'react'

type Grade = 'n1'|'n2'|'p1'|'p2'|'p3'|'p4'|'p5'|'p6'|'j1'|'j2'|'j3'|'s1'|'s2'|'s3'
type Cat = 'food'|'energy'|'water'|'nature'|'climate'|'science'|'animals'|'soil'|'french'|'weather'

interface Q { q:string; opts:string[]; ans:number; fact:string; img?:string }

const GRADES: {id:Grade;label:string;emoji:string;color:string;desc:string}[] = [
  {id:'n1',label:'Nursery 1',emoji:'🌱',color:'#ff9f43',desc:'Ages 3-4'},
  {id:'n2',label:'Nursery 2',emoji:'🌿',color:'#ffd32a',desc:'Ages 4-5'},
  {id:'p1',label:'Primary 1',emoji:'🌸',color:'#0be881',desc:'Ages 6-7'},
  {id:'p2',label:'Primary 2',emoji:'🌺',color:'#05c46b',desc:'Ages 7-8'},
  {id:'p3',label:'Primary 3',emoji:'🌻',color:'#00d8d6',desc:'Ages 8-9'},
  {id:'p4',label:'Primary 4',emoji:'🌼',color:'#0fbcf9',desc:'Ages 9-10'},
  {id:'p5',label:'Primary 5',emoji:'⭐',color:'#4bcffa',desc:'Ages 10-11'},
  {id:'p6',label:'Primary 6',emoji:'🏅',color:'#575fcf',desc:'Ages 11-12'},
  {id:'j1',label:'JSS 1',emoji:'🔬',color:'#ef5777',desc:'Ages 12-13'},
  {id:'j2',label:'JSS 2',emoji:'⚗️',color:'#f53b57',desc:'Ages 13-14'},
  {id:'j3',label:'JSS 3',emoji:'🧪',color:'#c44569',desc:'Ages 14-15'},
  {id:'s1',label:'SSS 1',emoji:'🎓',color:'#e84393',desc:'Ages 15-16'},
  {id:'s2',label:'SSS 2',emoji:'🏆',color:'#9c88ff',desc:'Ages 16-17'},
  {id:'s3',label:'SSS 3',emoji:'👑',color:'#ffd32a',desc:'Ages 17-18'},
]

const CATS: {id:Cat;icon:string;name:string;color:string;bg:string;scene:string}[] = [
  {id:'food',   icon:'🍎',name:'Food & Farming',   color:'#ff6b9d',bg:'#2d0a1a',scene:'🌾🍎🥕🐓🥬'},
  {id:'energy', icon:'⚡',name:'Energy & Power',   color:'#ffd32a',bg:'#1a1200',scene:'☀️💨🌊⚡🔋'},
  {id:'water',  icon:'💧',name:'Water & Oceans',   color:'#4bcffa',bg:'#001a2d',scene:'🌊💧🐠🌧️🏔️'},
  {id:'nature', icon:'🌱',name:'Plants & Nature',  color:'#0be881',bg:'#001a0d',scene:'🌳🌸🦋🐛🌿'},
  {id:'climate',icon:'🌍',name:'Climate & Earth',  color:'#a29bfe',bg:'#1a1040',scene:'🌍☀️❄️🌡️🌪️'},
  {id:'science',icon:'🔬',name:'Farm Science',     color:'#00cec9',bg:'#001a1a',scene:'🛸📡🌾🤖💻'},
  {id:'animals',icon:'🐾',name:'Animals & Insects',color:'#fd9644',bg:'#1a0a00',scene:'🐝🦋🐸🦁🐘'},
  {id:'soil',   icon:'🪱',name:'Soil & Compost',   color:'#e17055',bg:'#1a0800',scene:'🪱🌱🍂🏺🌍'},
  {id:'french', icon:'🇫🇷',name:'Français Nature', color:'#74b9ff',bg:'#001040',scene:'🌳🦋🌸💧☀️'},
  {id:'weather',icon:'⛅',name:'Weather & Seasons',color:'#55efc4',bg:'#001a14',scene:'☀️🌧️❄️🌪️🌈'},
]

const QB: Record<Cat, Record<Grade, Q[]>> = {
  food: {
      n1: [
        {q:"What colour is a ripe banana?", opts:["Red 🔴", "Yellow 🟡", "Blue 🔵", "Green 🟢"], ans:1, fact:"Ripe bananas are bright yellow! When green they are not ready to eat!", img:"🍌🟡✨"},
        {q:"Which food comes from a cow?", opts:["Eggs 🥚", "Honey 🍯", "Milk 🥛", "Bread 🍞"], ans:2, fact:"Cows give us milk! We can drink it or make cheese and butter!", img:"🐄🥛💛"},
        {q:"Which one is a fruit?", opts:["Carrot 🥕", "Potato 🥔", "Apple 🍎", "Bread 🍞"], ans:2, fact:"An apple is a fruit! It is sweet and grows on a tree!", img:"🍎🌳🌸"},
        {q:"What do plants need to grow?", opts:["Chocolate", "Water and sunlight 💧☀️", "Only darkness", "Stones"], ans:1, fact:"Plants need water and sunlight to grow big and strong!", img:"🌱💧☀️"},
        {q:"Which food gives us energy?", opts:["Stones", "Rice 🍚", "Sand", "Mud"], ans:1, fact:"Rice gives us energy! It is a carbohydrate that fuels our body!", img:"🍚⚡🏃"},
        {q:"Where do strawberries grow?", opts:["In the sky", "Underground", "On plants near the ground 🍓", "In water"], ans:2, fact:"Strawberries grow on small plants very close to the ground!", img:"🍓🌱🌿"},
        {q:"What colour is a ripe tomato?", opts:["Blue", "Purple", "Red 🍅", "Black"], ans:2, fact:"Ripe tomatoes are bright red! They are actually a fruit not a vegetable!", img:"🍅🔴☀️"},
        {q:"Which animal gives us eggs?", opts:["Cow 🐄", "Hen 🐔", "Cat 🐱", "Dog 🐶"], ans:1, fact:"Hens lay eggs every day! Eggs are full of protein!", img:"🐔🥚🌅"},
        {q:"Which food is a vegetable?", opts:["Mango 🥭", "Banana 🍌", "Spinach 🥬", "Grape 🍇"], ans:2, fact:"Spinach is a dark green vegetable full of iron and vitamins!", img:"🥬💪🌱"},
        {q:"What is honey made by?", opts:["Ants 🐜", "Bees 🐝", "Butterflies 🦋", "Spiders 🕷️"], ans:1, fact:"Bees collect nectar from flowers and turn it into sweet honey!", img:"🐝🍯🌸"},
      ],
      n2: [
        {q:"Which food helps our eyes?", opts:["Sweets 🍬", "Carrot 🥕", "Biscuits", "Chips"], ans:1, fact:"Carrots contain Vitamin A which keeps our eyes healthy and sharp!", img:"🥕👁️✨"},
        {q:"Where does orange juice come from?", opts:["A factory", "Oranges 🍊", "Milk", "Underground"], ans:1, fact:"Orange juice is squeezed from fresh oranges full of Vitamin C!", img:"🍊💛🥤"},
        {q:"Which food makes our bones strong?", opts:["Sweets", "Crisps", "Milk 🥛", "Fizzy drinks"], ans:2, fact:"Milk has calcium which makes our bones and teeth very strong!", img:"🥛🦴💪"},
        {q:"What meal do we eat first in the morning?", opts:["Dinner", "Lunch", "Supper", "Breakfast 🌅"], ans:3, fact:"Breakfast is our first meal of the day and gives us energy to learn!", img:"🌅🍳☕"},
        {q:"Where does bread come from?", opts:["Trees", "The sea", "A bakery using wheat 🌾", "Underground"], ans:2, fact:"Bread is made from wheat flour that is baked in a hot oven!", img:"🌾🍞🔥"},
        {q:"Which is healthier to eat?", opts:["Sweets 🍬", "Chocolate bar", "Fresh apple 🍎", "Crisps"], ans:2, fact:"Fresh fruit like apples give us vitamins and natural energy!", img:"🍎✅💪"},
        {q:"What colour is broccoli?", opts:["Red", "Yellow", "Purple", "Green 🥦"], ans:3, fact:"Broccoli is dark green and packed with vitamins and fibre!", img:"🥦💚🌿"},
        {q:"What do we use to eat food properly?", opts:["Hands only", "Fork and spoon 🍴", "Scissors", "Ruler"], ans:1, fact:"We use a fork and spoon to eat our food neatly and safely!", img:"🍴🍽️😋"},
        {q:"Which food comes from under the ground?", opts:["Mango", "Orange", "Potato 🥔", "Banana"], ans:2, fact:"Potatoes are root vegetables that grow underground!", img:"🥔🌱🪱"},
        {q:"What colour are peas?", opts:["Red", "Orange", "Green 🫛", "Yellow"], ans:2, fact:"Peas are small round green vegetables full of protein and goodness!", img:"🫛💚🌿"},
      ],
      p1: [
        {q:"Which part of a plant do we eat in carrots?", opts:["The flower", "The leaf", "The root 🥕", "The fruit"], ans:2, fact:"Carrots are roots! They grow underground and store nutrients!", img:"🥕🌱🪱"},
        {q:"What gives bread its energy?", opts:["Protein", "Carbohydrates 🌾", "Fat", "Vitamins"], ans:1, fact:"Bread contains carbohydrates which give our body energy to work and play!", img:"🍞⚡🌾"},
        {q:"Which food helps us fight illness?", opts:["Sweets", "Fruits with Vitamin C 🍊", "Chips", "Fizzy drinks"], ans:1, fact:"Vitamin C in oranges and lemons helps our immune system fight germs!", img:"🍊🛡️💪"},
        {q:"Which food is rich in protein?", opts:["White bread", "Boiled eggs 🥚", "Plain pasta", "Sweets"], ans:1, fact:"Eggs are packed with protein which builds and repairs our muscles!", img:"🥚💪🐔"},
        {q:"Where does cooking oil come from?", opts:["Stones", "Plants like palm or sunflower 🌻", "Clouds", "Sand"], ans:1, fact:"Cooking oil is pressed from plants like palm, sunflower and groundnut!", img:"🌻🫙🌿"},
        {q:"What does a farmer do?", opts:["Fixes cars", "Grows food for everyone 🌾", "Builds houses", "Drives lorries"], ans:1, fact:"Farmers grow the food that feeds our whole community and country!", img:"🌾👨‍🌾🚜"},
        {q:"Which vitamin comes from sunlight?", opts:["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D ☀️"], ans:3, fact:"Our skin makes Vitamin D in sunlight — good for strong bones!", img:"☀️🦴💛"},
        {q:"What is a food market?", opts:["A place to sleep", "Where fresh food is bought and sold 🛒", "A school", "A hospital"], ans:1, fact:"Food markets sell fresh vegetables, fruits, meat and grains from farms!", img:"🛒🥕🍅🌽"},
        {q:"Which food makes our blood healthy?", opts:["Sweets", "Spinach with iron 🥬", "Biscuits", "Fizzy drinks"], ans:1, fact:"Spinach has iron which helps our blood carry oxygen around the body!", img:"🥬❤️💪"},
        {q:"What do we call people who grow our food?", opts:["Doctors", "Teachers", "Farmers 👨‍🌾", "Engineers"], ans:2, fact:"Farmers are the people who grow all the food we eat every day!", img:"👨‍🌾🌾✅"},
      ],
      p2: [
        {q:"What is photosynthesis?", opts:["Animals breathing", "Plants making food from sunlight 🌞", "Cooking food", "Food rotting"], ans:1, fact:"Plants use sunlight plus water plus CO₂ to make sugar — the start of all food!", img:"🌞🌿💚"},
        {q:"Which food contains the most iron?", opts:["White bread", "Spinach 🥬", "Butter", "Orange juice"], ans:1, fact:"Spinach is full of iron which helps make red blood cells carry oxygen!", img:"🥬❤️💪"},
        {q:"What happens when food rots?", opts:["It gets tastier", "Bacteria make it unsafe 🦠", "It becomes medicine", "Nothing"], ans:1, fact:"Bacteria and fungi decompose food making it unsafe to eat!", img:"🦠❌🧊"},
        {q:"What is the food chain?", opts:["A way to buy food", "Who eats who in nature 🌿→🐛→🐦", "A type of shop", "How food is cooked"], ans:1, fact:"Energy passes through food chains: plants to herbivores to carnivores!", img:"🌿🐛🐦⚡"},
        {q:"What is food security?", opts:["Locked fridges", "Everyone having enough healthy food 🍽️", "Expensive food", "Frozen food"], ans:1, fact:"Food security means every person has access to enough safe nutritious food!", img:"🍽️🌍✅"},
        {q:"Why eat different coloured vegetables?", opts:["They taste nicer", "Each colour has different vitamins 🌈", "They are cheaper", "They look pretty"], ans:1, fact:"Different coloured vegetables have different vitamins — eat the rainbow every day!", img:"🌈🥕🥦🍅"},
        {q:"What is a legume?", opts:["A type of fruit", "Beans and peas that fix nitrogen 🫘", "A root vegetable", "A grain"], ans:1, fact:"Legumes like beans and groundnuts add natural nitrogen back into soil!", img:"🫘🌱🪱"},
        {q:"Where does palm oil come from?", opts:["Rocks", "Palm trees 🌴", "The sea", "Underground"], ans:1, fact:"Palm oil is pressed from the fruit of oil palm trees — very common in Nigeria!", img:"🌴🫙🌿"},
        {q:"What makes food go bad quickly?", opts:["Too much water", "Bacteria and heat 🌡️", "Sunlight only", "Fresh air"], ans:1, fact:"Heat speeds up bacterial growth — refrigeration slows food spoilage!", img:"🌡️🦠❌"},
        {q:"Which food gives us carbohydrates for energy?", opts:["Eggs", "Fish", "Yam and rice 🍚", "Meat"], ans:2, fact:"Yam, rice, cassava and plantain are carbohydrate staples that fuel our body!", img:"🍚⚡🌾"},
      ],
      p3: [
        {q:"What is composting?", opts:["Burning rubbish", "Turning food scraps into plant food 🌱", "Freezing food", "Cooking leftovers"], ans:1, fact:"Composting recycles organic waste into rich natural soil fertiliser!", img:"🌱🍂🪱"},
        {q:"What is irrigation?", opts:["Watering crops artificially 💧", "Cutting down trees", "Burning crop waste", "Removing weeds"], ans:0, fact:"Irrigation brings water to crops in dry areas using pipes, channels or sprinklers!", img:"💧🌾🚰"},
        {q:"What is organic food?", opts:["Always expensive food", "Food grown without artificial chemicals 🌿", "Only vegetables", "Only fruits"], ans:1, fact:"Organic farming avoids artificial pesticides and fertilisers — better for nature!", img:"🌿✅🐝"},
        {q:"What does crop rotation do?", opts:["Damages soil", "Keeps soil healthy by changing crops each season 🔄", "Wastes water", "Costs more"], ans:1, fact:"Rotating crops like beans with maize adds nutrients back into the soil naturally!", img:"🔄🫘🌾"},
        {q:"Which cooking method keeps the most vitamins?", opts:["Boiling for a long time", "Deep frying", "Steaming 🥦", "None of them"], ans:2, fact:"Steaming preserves vitamins much better than boiling where nutrients escape into water!", img:"🥦💨✅"},
        {q:"What is food preservation?", opts:["Making food taste better", "Methods to make food last longer safely 🧊", "Growing more food", "Selling food faster"], ans:1, fact:"Preservation methods like drying, smoking, salting and freezing prevent food going bad!", img:"🧊🧂🔥✅"},
        {q:"What mineral makes plants green?", opts:["Iron", "Calcium", "Chlorophyll and magnesium 🟢", "Salt"], ans:2, fact:"Chlorophyll makes plants green and uses magnesium — it powers photosynthesis!", img:"🟢🌿☀️"},
        {q:"What is food waste?", opts:["Cooking too much", "Throwing away edible food wasting resources 🗑️", "Spoiled food only", "Leftovers always"], ans:1, fact:"Food waste uses land, water and energy for nothing — reducing waste helps the planet!", img:"🗑️💧🌍❌"},
        {q:"Why are pollinators important for food?", opts:["They eat pests", "They help plants reproduce making fruits and seeds 🐝", "They make soil", "They bring rain"], ans:1, fact:"Bees and other pollinators transfer pollen between flowers enabling fruit to form!", img:"🐝🌸🍎✅"},
        {q:"What is a food web?", opts:["How to buy food", "All feeding connections in an ecosystem 🕸️", "How food is cooked", "Where food is sold"], ans:1, fact:"A food web shows how all organisms in an ecosystem are connected through eating!", img:"🕸️🌿🐛🦅"},
      ],
      p4: [
        {q:"What is the nitrogen cycle?", opts:["Only about weather", "How nitrogen moves between air, soil and living things 🔄", "A type of farming", "A food chain"], ans:1, fact:"Plants absorb nitrogen from soil, animals eat plants, decomposers return it to soil!", img:"🔄🌿🪱💨"},
        {q:"What causes food poisoning?", opts:["Eating too fast", "Harmful bacteria in contaminated food 🦠", "Eating vegetables", "Drinking water"], ans:1, fact:"Bacteria like Salmonella in unsafe food cause vomiting and diarrhoea — very dangerous!", img:"🦠🤒❌"},
        {q:"What role do pollinators play in food?", opts:["No role", "They help plants reproduce to make fruits and seeds 🐝", "They eat crops", "They make soil"], ans:1, fact:"Bees and butterflies transfer pollen between flowers enabling fruit and seed formation!", img:"🐝🌸🍎✅"},
        {q:"What is agroforestry?", opts:["Cutting forests", "Growing crops and trees together on the same land 🌳🌾", "Forest conservation", "Tree farming alone"], ans:1, fact:"Agroforestry combines trees with crops — improving soil, biodiversity and income!", img:"🌳🌾💚✅"},
        {q:"What is food processing?", opts:["Growing food", "Transforming raw food into products we can buy 🏭", "Cooking at home", "Eating quickly"], ans:1, fact:"Food processing includes cleaning, cooking, preserving and packaging food for sale!", img:"🏭🥫🧃✅"},
        {q:"What is food sovereignty?", opts:["Selling food abroad", "People's right to control their own food systems 🌾", "Only local food", "Avoiding imports"], ans:1, fact:"Food sovereignty means communities decide how their food is grown and shared!", img:"🌾🤝🌍"},
        {q:"What is aquaculture?", opts:["Water sports", "Farming fish and seafood in controlled water environments 🐟", "Watering crops", "Studying the ocean"], ans:1, fact:"Aquaculture grows fish, prawns and other seafood sustainably for food production!", img:"🐟💧🌊🌿"},
        {q:"What is zero hunger?", opts:["Not eating", "UN goal to ensure everyone has enough nutritious food 🌍", "A diet plan", "Fasting"], ans:1, fact:"UN Sustainable Development Goal 2 aims to end hunger for all people by 2030!", img:"🌍🍽️✅🕊️"},
        {q:"What is the difference between hunger and malnutrition?", opts:["They are the same", "Hunger is no food; malnutrition is wrong nutrients 🍽️", "Only children get it", "Only about quantity"], ans:1, fact:"Hunger means not enough food. Malnutrition means not enough of the right nutrients!", img:"🍽️📊🌍"},
        {q:"What is food biotechnology?", opts:["Old farming", "Using science and technology to improve food production 🧬", "Organic farming", "Traditional cooking"], ans:1, fact:"Biotechnology improves crops through genetic tools making them more nutritious or resistant!", img:"🧬🌾💻✅"},
      ],
      p5: [
        {q:"What are food miles?", opts:["How far we walk to buy food", "Distance food travels from farm to consumer 🚛", "Nutritional value", "Food portions"], ans:1, fact:"High food miles mean more fuel used and higher carbon emissions from transport!", img:"🚛🌍💨📏"},
        {q:"What is vertical farming?", opts:["Farming on steep hills", "Growing food in stacked indoor layers under lights 🏢", "Building tall silos", "Climbing plants"], ans:1, fact:"Vertical farms grow food in city buildings using LED lights — uses 95% less water!", img:"🏢💡🌿✅"},
        {q:"What are macronutrients?", opts:["Small vitamins", "Carbohydrates, protein and fat needed in large amounts 📊", "Minerals only", "All vitamins"], ans:1, fact:"Macronutrients are carbs for energy, protein for muscles and fat for cell function!", img:"📊🍎🥩🌿"},
        {q:"What is food insecurity?", opts:["Locked food storage", "Unreliable access to enough safe nutritious food 😟", "Expensive supermarkets", "Food labels"], ans:1, fact:"Food insecurity means people do not know if they will have enough food tomorrow!", img:"😟🍽️❓🌍"},
        {q:"What is biofortification?", opts:["Artificial vitamin pills", "Breeding crops to be naturally more nutritious 🌾", "Chemical enrichment", "Food colouring"], ans:1, fact:"Biofortified crops like orange sweet potato have extra Vitamin A bred in naturally!", img:"🌾🥕💛✅"},
        {q:"What is the Green Revolution?", opts:["Painting farms green", "Major increase in crop production through new technology 🌾", "Going organic", "Climate farming"], ans:1, fact:"The Green Revolution introduced high-yield seeds, fertilisers and irrigation globally!", img:"🌾📈🔬🌍"},
        {q:"What is food fortification?", opts:["Making food spicy", "Adding vitamins and minerals to food to prevent deficiency 💊", "Food colouring", "Making food bigger"], ans:1, fact:"Fortified foods like iodised salt and vitamin A rice prevent nutritional deficiencies!", img:"💊🧂🌾✅"},
        {q:"What causes soil degradation?", opts:["Too much rain", "Overfarming, chemicals and erosion removing nutrients 🏜️", "Growing vegetables", "Normal farming"], ans:1, fact:"Poor farming practices deplete nutrients, erode topsoil and reduce farm productivity!", img:"🏜️❌🌾😟"},
        {q:"What is the water footprint of food?", opts:["How wet food is", "Total water used to produce food from farm to fork 💧", "Irrigation only", "Rain on farms"], ans:1, fact:"A beef burger uses about 2,400 litres of water — much more than vegetables!", img:"💧🐄🍔📊"},
        {q:"What is food literacy?", opts:["Reading food fiction", "Understanding how to choose and prepare nutritious food 📚", "Cooking lessons only", "Food history"], ans:1, fact:"Food literacy means understanding nutrition labels, cooking skills and healthy choices!", img:"📚🍽️🧠✅"},
      ],
      p6: [
        {q:"What is a calorie?", opts:["A type of vitamin", "A unit measuring food energy 🔥", "A type of mineral", "A food type"], ans:1, fact:"Calories measure the energy in food — our bodies need them to function every day!", img:"🔥⚡🍽️📏"},
        {q:"What is sustainable agriculture?", opts:["Growing one crop", "Farming meeting today's needs without harming future generations 🌿", "Using more chemicals", "City farming"], ans:1, fact:"Sustainable agriculture balances productivity with environmental protection long-term!", img:"🌿♻️🌾✅"},
        {q:"What are phytonutrients?", opts:["Animal proteins", "Plant compounds that protect our health 🌿", "Artificial additives", "Food preservatives"], ans:1, fact:"Phytonutrients in colourful plants protect against disease — eat diverse plant foods!", img:"🌿🍇🍅💚"},
        {q:"What is GM food?", opts:["Gently made food", "Genetically Modified food where DNA is changed for specific traits 🧬", "Good and moist food", "Green market food"], ans:1, fact:"GM crops can be engineered for drought resistance, pest resistance or higher nutrition!", img:"🧬🌽🔬📊"},
        {q:"What is a food desert?", opts:["Dry climate farming", "Area where people lack access to affordable healthy food 🏙️", "Empty supermarket", "Desert farming"], ans:1, fact:"Food deserts are often in low-income areas where fresh produce is unavailable nearby!", img:"🏙️❌🍎😟"},
        {q:"What is food system resilience?", opts:["Tough packaging", "Ability of food systems to recover from shocks and stress 🔄", "Strong farmers only", "Imported food"], ans:1, fact:"Resilient food systems use diverse crops, local food and sustainable practices!", img:"🔄🌾🤝✅"},
        {q:"What is food literacy's importance?", opts:["Just for nutrition", "Empowers people to make healthy food choices and reduce waste 📚", "Only for chefs", "For food businesses only"], ans:1, fact:"Food literate people make better nutritional choices benefiting their health and the planet!", img:"📚🍽️🧠✅"},
        {q:"What connects food and climate change?", opts:["Nothing", "Climate change threatens crops reducing food security 🌡️🌾", "Only natural disasters", "Ocean food only"], ans:1, fact:"Rising temperatures, droughts and floods destroy harvests threatening global food supply!", img:"🌡️🌾😟❌"},
        {q:"What is food chain vulnerability?", opts:["Weak packaging", "How easily food supply can be disrupted by climate or conflict 🌍", "Soft food textures", "Poor cooking"], ans:1, fact:"Food chains break when farms fail, transport stops or conflicts disrupt supply!", img:"🌍⚠️🌾😟"},
        {q:"What is the right to food?", opts:["Preference only", "A fundamental human right ensuring everyone can access adequate food ⚖️", "Charity food only", "Optional right"], ans:1, fact:"The UN recognises adequate food as a fundamental human right under international law!", img:"⚖️🌍🍽️✅"},
      ],
      j1: [
        {q:"What is nitrogen fixation?", opts:["Plants absorbing sunlight", "Bacteria converting atmospheric nitrogen into soil nutrients 🫘", "Water cycle", "Photosynthesis"], ans:1, fact:"Rhizobium bacteria in legume roots fix N₂ gas into compounds usable by plants!", img:"🫘🪱🔬💚"},
        {q:"What is the carbon footprint of food?", opts:["Amount of food grown", "Total CO₂ produced in food production and transport 💨", "Food packaging weight", "Calories in food"], ans:1, fact:"Meat especially beef has very high carbon footprint — plant foods are much lower!", img:"💨🐄🌿📊"},
        {q:"What is precision agriculture?", opts:["Exact farming times", "Using data and technology to optimise farm inputs and yields 📡", "Farming one crop", "Very neat fields"], ans:1, fact:"GPS, sensors, drones and AI help farmers apply exactly the right inputs where needed!", img:"📡🛸🌾💻"},
        {q:"What is eutrophication from farming?", opts:["More food in water", "Fertiliser runoff causing algae overgrowth that kills aquatic life 🌿", "Water treatment", "Fish farming"], ans:1, fact:"Excess nitrates from farms enter rivers causing algae blooms that deplete oxygen!", img:"🌿💧❌🐠"},
        {q:"What is food traceability?", opts:["Food being tasty", "Tracking food from farm through production to consumer 📱", "Recipe following", "Food history"], ans:1, fact:"Traceability systems let consumers track exactly where their food came from!", img:"📱🌾🚛🏪"},
        {q:"What causes famine?", opts:["People choosing not to eat", "Combination of drought, conflict, poverty and poor governance 😟", "Only bad weather", "Individual laziness"], ans:1, fact:"Famines result from multiple failures — crop failure, conflict and poverty together!", img:"😟🌧️⚔️❌"},
        {q:"What is integrated pest management?", opts:["Using maximum pesticides", "Diverse strategies to control pests with minimal chemicals 🐛", "Ignoring pests", "Only organic methods"], ans:1, fact:"IPM combines biological controls, resistant varieties and minimal targeted pesticides!", img:"🐛🔬🌿✅"},
        {q:"What is seed sovereignty?", opts:["Owning land", "Farmers' rights to save, use and share traditional seeds 🌾", "Buying all seeds", "Selling crops abroad"], ans:1, fact:"Seed sovereignty protects farmers from dependence on expensive commercial seed companies!", img:"🌾🤲✅🌍"},
        {q:"What is agroecology?", opts:["A science degree", "Applying ecological principles to sustainable food systems 🌿", "Chemical farming", "Urban gardening"], ans:1, fact:"Agroecology uses biodiversity, natural processes and local knowledge for sustainable food!", img:"🌿🔬🌾♻️"},
        {q:"What is climate-smart agriculture?", opts:["Hot weather farming", "Farming that adapts to climate change while reducing emissions 🌡️", "Air-conditioned farms", "Only drought crops"], ans:1, fact:"Climate-smart agriculture builds resilience, reduces emissions and maintains food security!", img:"🌡️🌾✅♻️"},
      ],
      j2: [
        {q:"What is food waste's environmental impact?", opts:["No impact", "Produces greenhouse gases equivalent to 8% of global emissions 💨", "Only uses landfill space", "Creates compost"], ans:1, fact:"Rotting food produces methane — a powerful greenhouse gas — in landfills worldwide!", img:"💨🗑️🌍😟"},
        {q:"What is hydroponics?", opts:["Water sports farming", "Growing plants in nutrient-rich water without soil 💧", "Underwater food", "Rain-fed farming"], ans:1, fact:"Hydroponics uses 90% less water than soil farming and can grow food anywhere!", img:"💧🌿🏙️✅"},
        {q:"What is food justice?", opts:["Cheap food for all", "Fair access to healthy food regardless of income or location ⚖️", "Free meals everywhere", "Justice system food"], ans:1, fact:"Food justice addresses why poor communities have less access to nutritious food!", img:"⚖️🍎🌍✅"},
        {q:"What are mycotoxins?", opts:["Good bacteria", "Toxic compounds from moulds on poorly stored grain ⚠️", "Food flavourings", "Soil bacteria"], ans:1, fact:"Mycotoxins from fungi on stored grains cause illness — proper storage prevents them!", img:"⚠️🌾🍄❌"},
        {q:"What is regenerative agriculture?", opts:["Restoring degraded land", "Farming that actively improves soil, water and biodiversity 🌱", "Only organic farming", "Traditional methods only"], ans:1, fact:"Regenerative agriculture rebuilds soil health, sequesters carbon and restores ecosystems!", img:"🌱🪱🌾✅"},
        {q:"What is the role of women in food systems?", opts:["Minor role", "Women produce 60-80% of food in developing countries 👩‍🌾", "Equal role everywhere", "Only cooking at home"], ans:1, fact:"Women are central to food production but often lack land rights and resources!", img:"👩‍🌾🌾🌍💪"},
        {q:"What is biodiversity loss's effect on food?", opts:["More food variety", "Fewer crop varieties making food systems fragile and vulnerable ⚠️", "Better quality food", "No effect on food"], ans:1, fact:"Losing crop diversity means one disease could wipe out a staple food worldwide!", img:"⚠️🌾❌🌍"},
        {q:"What is the role of international trade in food?", opts:["Reduces food security", "Allows countries to import food they cannot produce domestically 🚢", "Creates dependence only", "No significant role"], ans:1, fact:"Trade enables food access but can create dangerous dependency on global supply chains!", img:"🚢🌾🌍⚖️"},
        {q:"What is food systems transformation?", opts:["New cooking styles", "Fundamentally changing how food is produced distributed and consumed 🌍", "New packaging", "Better refrigeration"], ans:1, fact:"Transforming food systems means addressing environment, health, equity and economy together!", img:"🌍🔄🌾✅"},
        {q:"What is land tenure and food security?", opts:["Land ownership only", "Secure land rights allow farmers to invest in long-term production 🏡", "Renting farms", "Land measurement"], ans:1, fact:"When farmers have secure land rights they invest in better farming practices!", img:"🏡🌾✅📜"},
      ],
      j3: [
        {q:"What is a dietary transition?", opts:["Changing diet temporarily", "Shift from traditional to processed foods as economies develop 🍔", "Seasonal eating", "Crop rotation"], ans:1, fact:"As countries develop, diets often shift to more meat, sugar and processed foods!", img:"🍔📈🌍😟"},
        {q:"What is nutritional epidemiology?", opts:["Food history", "Study of how diet relates to disease patterns in populations 📊", "Epidemic diseases only", "Nutrition for athletes"], ans:1, fact:"Nutritional epidemiology links dietary patterns to health outcomes across populations!", img:"📊🔬🍎💚"},
        {q:"What is the triple burden of malnutrition?", opts:["Three vitamins", "Undernutrition, overnutrition and micronutrient deficiency coexisting 📊", "Three meal times", "Hunger only"], ans:1, fact:"The triple burden means populations face hunger, obesity and vitamin deficiency simultaneously!", img:"📊🌍😟"},
        {q:"What is supply chain resilience for food?", opts:["Strong packaging", "Food systems' ability to maintain supply despite shocks 🔄", "Fast delivery only", "Local markets only"], ans:1, fact:"COVID-19 exposed food supply chain fragility — resilience requires diversification!", img:"🔄🌍⚠️✅"},
        {q:"What is agroforestry's climate benefit?", opts:["More shade only", "Trees store carbon, regulate water and protect soil simultaneously 🌳", "Reducing farmland", "Cooling only"], ans:1, fact:"Agroforestry systems sequester significant carbon while maintaining food production!", img:"🌳💚🌾♻️"},
        {q:"What is food systems governance?", opts:["Farm management only", "Rules and policies shaping how food systems operate 📋", "International aid", "UN food programs"], ans:1, fact:"Good food governance coordinates policies across agriculture, trade, health and environment!", img:"📋🌍🤝✅"},
        {q:"What is traditional knowledge's role in food?", opts:["Outdated information", "Centuries of wisdom about crops, ecosystems and nutrition 🌿", "Only for history", "Superstition only"], ans:1, fact:"Traditional ecological knowledge guides sustainable farming and conserves biodiversity!", img:"🌿👴🌾✅"},
        {q:"What is the food-energy-water nexus?", opts:["Three separate issues", "Interconnected relationship between food, energy and water 🔄", "Three SDGs", "Climate impacts only"], ans:1, fact:"Food production needs water and energy; energy needs water; all are deeply interconnected!", img:"🔄💧⚡🌾"},
        {q:"What is food systems research?", opts:["Cooking experiments", "Scientific study of all aspects of food from farm to fork 🔬", "Agricultural research only", "Marketing research"], ans:1, fact:"Food systems research spans agronomy, nutrition, economics, ecology and social science!", img:"🔬🌾📊🌍"},
        {q:"What is the political economy of food?", opts:["Food politics only", "How power, economics and politics shape food systems and who benefits ⚖️", "Economic food theory", "Market analysis"], ans:1, fact:"Power asymmetries between corporations, governments and farmers shape food outcomes!", img:"⚖️🌍💰🌾"},
      ],
      s1: [
        {q:"What is dietary greenhouse gas emissions?", opts:["Plant breathing", "CO₂ and methane produced across the food system 💨", "Kitchen cooking emissions", "Farm machinery only"], ans:1, fact:"Food systems cause 26% of global greenhouse gas emissions — diet choices matter!", img:"💨🌾🐄📊"},
        {q:"What is the Malthusian theory about food?", opts:["About disease only", "Population grows faster than food supply creating famine risk 📊", "Economic theory", "Climate theory"], ans:1, fact:"Malthus predicted population would outstrip food supply — technology has delayed this!", img:"📊🌍🌾⚠️"},
        {q:"What is land use change for food?", opts:["Farm ownership", "Converting forests to farmland releasing carbon and losing biodiversity 🌳❌", "Land reform", "Urban growth"], ans:1, fact:"Agriculture drives 80% of global deforestation — the biggest driver of habitat loss!", img:"🌳❌🌾💨"},
        {q:"What is food price volatility?", opts:["Price labels changing", "Rapid unpredictable changes in food prices harming poor consumers 📈", "Annual price changes", "Market competition"], ans:1, fact:"Oil price spikes, droughts and speculation cause food price crises harming billions!", img:"📈🌾😟🌍"},
        {q:"What is agricultural subsidies' role?", opts:["Paying farmers anything", "Government payments supporting farming but distorting global trade 💰", "Free food programs", "Charity"], ans:1, fact:"Rich countries' farm subsidies can undercut farmers in developing countries unfairly!", img:"💰🌾🌍⚖️"},
        {q:"What is nutritional transition theory?", opts:["Diet changes in athletes", "How diets shift as countries industrialise toward processed foods 📊", "Seasonal diet changes", "Cultural changes"], ans:1, fact:"As incomes rise diets shift to more meat, fat and sugar — increasing chronic disease!", img:"📊🍔🌍😟"},
        {q:"What is blue food?", opts:["Blue-coloured food only", "Seafood and freshwater species with lower environmental impact 🐟", "Blueberries only", "Ocean farming"], ans:1, fact:"Blue foods from oceans and freshwater have diverse nutrition and varied environmental impact!", img:"🐟🌊💙🌍"},
        {q:"What is agricultural productivity gap?", opts:["Farm size difference", "Difference between actual and achievable smallholder yields 📊", "Profit difference", "Knowledge gap"], ans:1, fact:"Many smallholder farmers achieve only 20-50% of potential yields due to resource limits!", img:"📊🌾🌍⬆️"},
        {q:"What is food system equity?", opts:["Equal food portions", "Fair distribution of benefits across the food system ⚖️", "Same food for all", "Equal farm sizes"], ans:1, fact:"Equity in food systems means addressing race, gender, income and geography in food access!", img:"⚖️🌍🍽️✅"},
        {q:"What is food inflation?", opts:["More food available", "Rising food prices reducing purchasing power of consumers 📈", "Better food quality", "New food products"], ans:1, fact:"Food inflation disproportionately affects poor families who spend most income on food!", img:"📈🍽️😟💰"},
      ],
      s2: [
        {q:"What is the food-energy-water nexus challenge?", opts:["Three simple issues", "Interconnected systems where producing food needs energy and water 🔄", "Three SDGs", "Climate impacts"], ans:1, fact:"Food production needs water and energy; energy production needs water; all are linked!", img:"🔄💧⚡🌾"},
        {q:"What is food system transformation challenge?", opts:["Changing recipes", "Producing healthy food for all within planetary boundaries 🌍", "Farm modernisation", "New food technology"], ans:1, fact:"We need to feed 10 billion people by 2050 while staying within Earth's environmental limits!", img:"🌍📊🌾⚖️"},
        {q:"What is food system innovation?", opts:["New recipes only", "New technologies and institutions improving how food systems work 💡", "Farm equipment", "Packaging only"], ans:1, fact:"Innovation in food spans cellular agriculture, digital farming and food waste reduction!", img:"💡🧬🌾🔬"},
        {q:"What are evidence-based dietary guidelines?", opts:["Personal preferences", "Evidence-based recommendations for healthy eating patterns 📋", "Strict diet rules", "Government food orders"], ans:1, fact:"Dietary guidelines translate nutrition science into practical food choice recommendations!", img:"📋🍎🔬✅"},
        {q:"What is food systems modelling?", opts:["Food computer games", "Using mathematical models to analyse food system outcomes 💻", "Farm planning software", "Nutritional calculation"], ans:1, fact:"Computational models help policymakers understand complex food system interventions!", img:"💻📊🌾🔬"},
        {q:"What is ecosystem services valuation for food?", opts:["Farm profit only", "Assigning economic value to nature's contributions to food production 🌿💰", "Land pricing", "Food market value"], ans:1, fact:"Pollination, water filtration and soil formation have economic value often ignored in farming!", img:"🌿💰🐝✅"},
        {q:"What is the role of cities in food systems?", opts:["Only consumption", "Cities are increasingly important food producers and policy innovators 🏙️", "No role in production", "Only markets"], ans:1, fact:"Urban agriculture, food policy councils and city-region food systems shape future food!", img:"🏙️🌿🌾✅"},
        {q:"What is food systems complexity?", opts:["Complicated cooking", "Interconnected adaptive food systems requiring systems thinking 🔄", "Farm complexity", "Supply chain length"], ans:1, fact:"Food systems are complex adaptive systems — interventions can have unintended consequences!", img:"🔄🌾🔬🌍"},
        {q:"What is the social cost of carbon in food?", opts:["Carbon in soil", "Economic damage from CO₂ emissions affecting food system costs 💰", "Farm profit", "Food price inflation"], ans:1, fact:"Carbon pricing accounts for climate damages affecting food production costs globally!", img:"💰💨🌾📊"},
        {q:"What is global food governance gap?", opts:["Missing food labels", "Lack of institutions to coordinate global food system challenges 🌍", "Food regulation failure", "Trade law gap"], ans:1, fact:"No single global body coordinates food, climate, trade and nutrition policy together!", img:"🌍📋⚠️🤝"},
      ],
      s3: [
        {q:"What is planetary health diet?", opts:["Eating all planets' food", "Diet healthy for humans and sustainable for the planet 🌍🥗", "Astronaut food", "Space exploration diet"], ans:1, fact:"The EAT-Lancet Commission defined a diet good for both human and planetary health!", img:"🌍🥗💚🔬"},
        {q:"What is food system decarbonisation?", opts:["Carbon in food", "Reducing greenhouse gas emissions across the entire food system 💨", "Food packaging change", "Electric cooking"], ans:1, fact:"Decarbonising food requires changing diets, farming practices and reducing food waste!", img:"💨🌾🔄✅"},
        {q:"What is agroecological transition?", opts:["Slow farming", "Shift from industrial to ecologically sustainable agriculture 🌿", "Growing different crops", "Technology adoption"], ans:1, fact:"Agroecological transition requires policy support, knowledge systems and market changes!", img:"🌿🔄🌾✅"},
        {q:"What is food sovereignty versus food security?", opts:["Same concept", "Security is enough food; sovereignty is right to control your food system 🌾", "International law", "Trade policy only"], ans:1, fact:"Food sovereignty goes beyond security to include rights, power and self-determination!", img:"🌾⚖️🌍🤲"},
        {q:"What is cellular agriculture?", opts:["Farming in cells", "Growing meat and animal products from cells in labs 🧬", "Cell phone farming", "Microscopic crops"], ans:1, fact:"Lab-grown meat could radically reduce land, water and emissions from animal agriculture!", img:"🧬🥩💡🌍"},
        {q:"What is food as medicine?", opts:["Prescribing food pills", "Using diet and nutrition as tools for disease prevention 🥗", "Hospital food", "Traditional healing only"], ans:1, fact:"Evidence-based dietary interventions can prevent and treat many chronic diseases!", img:"🥗💊🔬✅"},
        {q:"What is the future of food?", opts:["Same as today", "Diverse innovations in production, consumption and systems design 🔬", "Only technology", "Only traditional farming"], ans:1, fact:"Future food integrates precision agriculture, alternative proteins, reduced waste and equity!", img:"🔬🌾🌍✅"},
        {q:"What is nutritional epidemiology's policy role?", opts:["Cooking advice", "Providing evidence for food policies addressing population health 📊", "Epidemic diseases", "Athlete nutrition"], ans:1, fact:"Nutritional epidemiology evidence shapes food labels, dietary guidelines and public health policy!", img:"📊🔬🍎💚"},
        {q:"What is agroforestry's role in carbon sequestration?", opts:["Trees are pretty", "Trees in farm systems absorb and store significant atmospheric carbon 🌳", "Cooling effect", "Making more shade"], ans:1, fact:"Agroforestry can sequester 0.3-9.5 tonnes of carbon per hectare per year — vital for climate!", img:"🌳💚♻️📊"},
        {q:"What is food systems resilience in a climate crisis?", opts:["Strong packaging", "Food systems' capacity to withstand and adapt to climate shocks 🔄", "Only local farms", "Stockpiling food"], ans:1, fact:"Resilient food systems diversify crops, use regenerative practices and strengthen local supply!", img:"🔄🌾🌡️✅"},
      ],
  },
  energy: {
      n1: [
        {q:"Where does electricity come from to light our homes?", opts:["The ground", "The sun and power stations ⚡", "The rain", "The wind only"], ans:1, fact:"Electricity comes from power stations and increasingly from solar panels!", img:"⚡🏠💡"},
        {q:"What does the sun give us?", opts:["Ice cream", "Light and heat ☀️", "Rain", "Darkness"], ans:1, fact:"The sun gives us light to see and heat to keep warm every day!", img:"☀️🌟💛"},
        {q:"How do we save electricity at home?", opts:["Leave all lights on", "Turn off lights when leaving a room 💡", "Use more machines", "Open the fridge often"], ans:1, fact:"Switching off lights saves electricity and helps the environment!", img:"💡✅🌿"},
        {q:"What is a battery?", opts:["A type of food", "Something that stores energy 🔋", "A type of toy", "A type of plant"], ans:1, fact:"Batteries store energy so we can use it later — like in our toys and phones!", img:"🔋⚡✨"},
        {q:"What is wind energy?", opts:["Energy from eating", "Energy made from the wind blowing 💨", "Energy from rain", "Energy from fire"], ans:1, fact:"Wind turbines use the wind to make clean electricity — no pollution!", img:"💨⚡🌿"},
      ],
      n2: [
        {q:"Where does electricity come from to light our homes?", opts:["The ground", "The sun and power stations ⚡", "The rain", "The wind only"], ans:1, fact:"Electricity comes from power stations and increasingly from solar panels!", img:"⚡🏠💡"},
        {q:"What does the sun give us?", opts:["Ice cream", "Light and heat ☀️", "Rain", "Darkness"], ans:1, fact:"The sun gives us light to see and heat to keep warm every day!", img:"☀️🌟💛"},
        {q:"How do we save electricity at home?", opts:["Leave all lights on", "Turn off lights when leaving a room 💡", "Use more machines", "Open the fridge often"], ans:1, fact:"Switching off lights saves electricity and helps the environment!", img:"💡✅🌿"},
        {q:"What is a battery?", opts:["A type of food", "Something that stores energy 🔋", "A type of toy", "A type of plant"], ans:1, fact:"Batteries store energy so we can use it later — like in our toys and phones!", img:"🔋⚡✨"},
        {q:"What is wind energy?", opts:["Energy from eating", "Energy made from the wind blowing 💨", "Energy from rain", "Energy from fire"], ans:1, fact:"Wind turbines use the wind to make clean electricity — no pollution!", img:"💨⚡🌿"},
      ],
      p1: [
        {q:"Where does electricity come from to light our homes?", opts:["The ground", "The sun and power stations ⚡", "The rain", "The wind only"], ans:1, fact:"Electricity comes from power stations and increasingly from solar panels!", img:"⚡🏠💡"},
        {q:"What does the sun give us?", opts:["Ice cream", "Light and heat ☀️", "Rain", "Darkness"], ans:1, fact:"The sun gives us light to see and heat to keep warm every day!", img:"☀️🌟💛"},
        {q:"How do we save electricity at home?", opts:["Leave all lights on", "Turn off lights when leaving a room 💡", "Use more machines", "Open the fridge often"], ans:1, fact:"Switching off lights saves electricity and helps the environment!", img:"💡✅🌿"},
        {q:"What is a battery?", opts:["A type of food", "Something that stores energy 🔋", "A type of toy", "A type of plant"], ans:1, fact:"Batteries store energy so we can use it later — like in our toys and phones!", img:"🔋⚡✨"},
        {q:"What is wind energy?", opts:["Energy from eating", "Energy made from the wind blowing 💨", "Energy from rain", "Energy from fire"], ans:1, fact:"Wind turbines use the wind to make clean electricity — no pollution!", img:"💨⚡🌿"},
      ],
      p2: [
        {q:"Where does electricity come from to light our homes?", opts:["The ground", "The sun and power stations ⚡", "The rain", "The wind only"], ans:1, fact:"Electricity comes from power stations and increasingly from solar panels!", img:"⚡🏠💡"},
        {q:"What does the sun give us?", opts:["Ice cream", "Light and heat ☀️", "Rain", "Darkness"], ans:1, fact:"The sun gives us light to see and heat to keep warm every day!", img:"☀️🌟💛"},
        {q:"How do we save electricity at home?", opts:["Leave all lights on", "Turn off lights when leaving a room 💡", "Use more machines", "Open the fridge often"], ans:1, fact:"Switching off lights saves electricity and helps the environment!", img:"💡✅🌿"},
        {q:"What is a battery?", opts:["A type of food", "Something that stores energy 🔋", "A type of toy", "A type of plant"], ans:1, fact:"Batteries store energy so we can use it later — like in our toys and phones!", img:"🔋⚡✨"},
        {q:"What is wind energy?", opts:["Energy from eating", "Energy made from the wind blowing 💨", "Energy from rain", "Energy from fire"], ans:1, fact:"Wind turbines use the wind to make clean electricity — no pollution!", img:"💨⚡🌿"},
      ],
      p3: [
        {q:"Where does electricity come from to light our homes?", opts:["The ground", "The sun and power stations ⚡", "The rain", "The wind only"], ans:1, fact:"Electricity comes from power stations and increasingly from solar panels!", img:"⚡🏠💡"},
        {q:"What does the sun give us?", opts:["Ice cream", "Light and heat ☀️", "Rain", "Darkness"], ans:1, fact:"The sun gives us light to see and heat to keep warm every day!", img:"☀️🌟💛"},
        {q:"How do we save electricity at home?", opts:["Leave all lights on", "Turn off lights when leaving a room 💡", "Use more machines", "Open the fridge often"], ans:1, fact:"Switching off lights saves electricity and helps the environment!", img:"💡✅🌿"},
        {q:"What is a battery?", opts:["A type of food", "Something that stores energy 🔋", "A type of toy", "A type of plant"], ans:1, fact:"Batteries store energy so we can use it later — like in our toys and phones!", img:"🔋⚡✨"},
        {q:"What is wind energy?", opts:["Energy from eating", "Energy made from the wind blowing 💨", "Energy from rain", "Energy from fire"], ans:1, fact:"Wind turbines use the wind to make clean electricity — no pollution!", img:"💨⚡🌿"},
      ],
      p4: [
        {q:"Where does electricity come from to light our homes?", opts:["The ground", "The sun and power stations ⚡", "The rain", "The wind only"], ans:1, fact:"Electricity comes from power stations and increasingly from solar panels!", img:"⚡🏠💡"},
        {q:"What does the sun give us?", opts:["Ice cream", "Light and heat ☀️", "Rain", "Darkness"], ans:1, fact:"The sun gives us light to see and heat to keep warm every day!", img:"☀️🌟💛"},
        {q:"How do we save electricity at home?", opts:["Leave all lights on", "Turn off lights when leaving a room 💡", "Use more machines", "Open the fridge often"], ans:1, fact:"Switching off lights saves electricity and helps the environment!", img:"💡✅🌿"},
        {q:"What is a battery?", opts:["A type of food", "Something that stores energy 🔋", "A type of toy", "A type of plant"], ans:1, fact:"Batteries store energy so we can use it later — like in our toys and phones!", img:"🔋⚡✨"},
        {q:"What is wind energy?", opts:["Energy from eating", "Energy made from the wind blowing 💨", "Energy from rain", "Energy from fire"], ans:1, fact:"Wind turbines use the wind to make clean electricity — no pollution!", img:"💨⚡🌿"},
      ],
      p5: [
        {q:"Where does electricity come from to light our homes?", opts:["The ground", "The sun and power stations ⚡", "The rain", "The wind only"], ans:1, fact:"Electricity comes from power stations and increasingly from solar panels!", img:"⚡🏠💡"},
        {q:"What does the sun give us?", opts:["Ice cream", "Light and heat ☀️", "Rain", "Darkness"], ans:1, fact:"The sun gives us light to see and heat to keep warm every day!", img:"☀️🌟💛"},
        {q:"How do we save electricity at home?", opts:["Leave all lights on", "Turn off lights when leaving a room 💡", "Use more machines", "Open the fridge often"], ans:1, fact:"Switching off lights saves electricity and helps the environment!", img:"💡✅🌿"},
        {q:"What is a battery?", opts:["A type of food", "Something that stores energy 🔋", "A type of toy", "A type of plant"], ans:1, fact:"Batteries store energy so we can use it later — like in our toys and phones!", img:"🔋⚡✨"},
        {q:"What is wind energy?", opts:["Energy from eating", "Energy made from the wind blowing 💨", "Energy from rain", "Energy from fire"], ans:1, fact:"Wind turbines use the wind to make clean electricity — no pollution!", img:"💨⚡🌿"},
      ],
      p6: [
        {q:"Where does electricity come from to light our homes?", opts:["The ground", "The sun and power stations ⚡", "The rain", "The wind only"], ans:1, fact:"Electricity comes from power stations and increasingly from solar panels!", img:"⚡🏠💡"},
        {q:"What does the sun give us?", opts:["Ice cream", "Light and heat ☀️", "Rain", "Darkness"], ans:1, fact:"The sun gives us light to see and heat to keep warm every day!", img:"☀️🌟💛"},
        {q:"How do we save electricity at home?", opts:["Leave all lights on", "Turn off lights when leaving a room 💡", "Use more machines", "Open the fridge often"], ans:1, fact:"Switching off lights saves electricity and helps the environment!", img:"💡✅🌿"},
        {q:"What is a battery?", opts:["A type of food", "Something that stores energy 🔋", "A type of toy", "A type of plant"], ans:1, fact:"Batteries store energy so we can use it later — like in our toys and phones!", img:"🔋⚡✨"},
        {q:"What is wind energy?", opts:["Energy from eating", "Energy made from the wind blowing 💨", "Energy from rain", "Energy from fire"], ans:1, fact:"Wind turbines use the wind to make clean electricity — no pollution!", img:"💨⚡🌿"},
      ],
      j1: [
        {q:"Where does electricity come from to light our homes?", opts:["The ground", "The sun and power stations ⚡", "The rain", "The wind only"], ans:1, fact:"Electricity comes from power stations and increasingly from solar panels!", img:"⚡🏠💡"},
        {q:"What does the sun give us?", opts:["Ice cream", "Light and heat ☀️", "Rain", "Darkness"], ans:1, fact:"The sun gives us light to see and heat to keep warm every day!", img:"☀️🌟💛"},
        {q:"How do we save electricity at home?", opts:["Leave all lights on", "Turn off lights when leaving a room 💡", "Use more machines", "Open the fridge often"], ans:1, fact:"Switching off lights saves electricity and helps the environment!", img:"💡✅🌿"},
        {q:"What is a battery?", opts:["A type of food", "Something that stores energy 🔋", "A type of toy", "A type of plant"], ans:1, fact:"Batteries store energy so we can use it later — like in our toys and phones!", img:"🔋⚡✨"},
        {q:"What is wind energy?", opts:["Energy from eating", "Energy made from the wind blowing 💨", "Energy from rain", "Energy from fire"], ans:1, fact:"Wind turbines use the wind to make clean electricity — no pollution!", img:"💨⚡🌿"},
      ],
      j2: [
        {q:"Where does electricity come from to light our homes?", opts:["The ground", "The sun and power stations ⚡", "The rain", "The wind only"], ans:1, fact:"Electricity comes from power stations and increasingly from solar panels!", img:"⚡🏠💡"},
        {q:"What does the sun give us?", opts:["Ice cream", "Light and heat ☀️", "Rain", "Darkness"], ans:1, fact:"The sun gives us light to see and heat to keep warm every day!", img:"☀️🌟💛"},
        {q:"How do we save electricity at home?", opts:["Leave all lights on", "Turn off lights when leaving a room 💡", "Use more machines", "Open the fridge often"], ans:1, fact:"Switching off lights saves electricity and helps the environment!", img:"💡✅🌿"},
        {q:"What is a battery?", opts:["A type of food", "Something that stores energy 🔋", "A type of toy", "A type of plant"], ans:1, fact:"Batteries store energy so we can use it later — like in our toys and phones!", img:"🔋⚡✨"},
        {q:"What is wind energy?", opts:["Energy from eating", "Energy made from the wind blowing 💨", "Energy from rain", "Energy from fire"], ans:1, fact:"Wind turbines use the wind to make clean electricity — no pollution!", img:"💨⚡🌿"},
      ],
      j3: [
        {q:"Where does electricity come from to light our homes?", opts:["The ground", "The sun and power stations ⚡", "The rain", "The wind only"], ans:1, fact:"Electricity comes from power stations and increasingly from solar panels!", img:"⚡🏠💡"},
        {q:"What does the sun give us?", opts:["Ice cream", "Light and heat ☀️", "Rain", "Darkness"], ans:1, fact:"The sun gives us light to see and heat to keep warm every day!", img:"☀️🌟💛"},
        {q:"How do we save electricity at home?", opts:["Leave all lights on", "Turn off lights when leaving a room 💡", "Use more machines", "Open the fridge often"], ans:1, fact:"Switching off lights saves electricity and helps the environment!", img:"💡✅🌿"},
        {q:"What is a battery?", opts:["A type of food", "Something that stores energy 🔋", "A type of toy", "A type of plant"], ans:1, fact:"Batteries store energy so we can use it later — like in our toys and phones!", img:"🔋⚡✨"},
        {q:"What is wind energy?", opts:["Energy from eating", "Energy made from the wind blowing 💨", "Energy from rain", "Energy from fire"], ans:1, fact:"Wind turbines use the wind to make clean electricity — no pollution!", img:"💨⚡🌿"},
      ],
      s1: [
        {q:"Where does electricity come from to light our homes?", opts:["The ground", "The sun and power stations ⚡", "The rain", "The wind only"], ans:1, fact:"Electricity comes from power stations and increasingly from solar panels!", img:"⚡🏠💡"},
        {q:"What does the sun give us?", opts:["Ice cream", "Light and heat ☀️", "Rain", "Darkness"], ans:1, fact:"The sun gives us light to see and heat to keep warm every day!", img:"☀️🌟💛"},
        {q:"How do we save electricity at home?", opts:["Leave all lights on", "Turn off lights when leaving a room 💡", "Use more machines", "Open the fridge often"], ans:1, fact:"Switching off lights saves electricity and helps the environment!", img:"💡✅🌿"},
        {q:"What is a battery?", opts:["A type of food", "Something that stores energy 🔋", "A type of toy", "A type of plant"], ans:1, fact:"Batteries store energy so we can use it later — like in our toys and phones!", img:"🔋⚡✨"},
        {q:"What is wind energy?", opts:["Energy from eating", "Energy made from the wind blowing 💨", "Energy from rain", "Energy from fire"], ans:1, fact:"Wind turbines use the wind to make clean electricity — no pollution!", img:"💨⚡🌿"},
      ],
      s2: [
        {q:"Where does electricity come from to light our homes?", opts:["The ground", "The sun and power stations ⚡", "The rain", "The wind only"], ans:1, fact:"Electricity comes from power stations and increasingly from solar panels!", img:"⚡🏠💡"},
        {q:"What does the sun give us?", opts:["Ice cream", "Light and heat ☀️", "Rain", "Darkness"], ans:1, fact:"The sun gives us light to see and heat to keep warm every day!", img:"☀️🌟💛"},
        {q:"How do we save electricity at home?", opts:["Leave all lights on", "Turn off lights when leaving a room 💡", "Use more machines", "Open the fridge often"], ans:1, fact:"Switching off lights saves electricity and helps the environment!", img:"💡✅🌿"},
        {q:"What is a battery?", opts:["A type of food", "Something that stores energy 🔋", "A type of toy", "A type of plant"], ans:1, fact:"Batteries store energy so we can use it later — like in our toys and phones!", img:"🔋⚡✨"},
        {q:"What is wind energy?", opts:["Energy from eating", "Energy made from the wind blowing 💨", "Energy from rain", "Energy from fire"], ans:1, fact:"Wind turbines use the wind to make clean electricity — no pollution!", img:"💨⚡🌿"},
      ],
      s3: [
        {q:"Where does electricity come from to light our homes?", opts:["The ground", "The sun and power stations ⚡", "The rain", "The wind only"], ans:1, fact:"Electricity comes from power stations and increasingly from solar panels!", img:"⚡🏠💡"},
        {q:"What does the sun give us?", opts:["Ice cream", "Light and heat ☀️", "Rain", "Darkness"], ans:1, fact:"The sun gives us light to see and heat to keep warm every day!", img:"☀️🌟💛"},
        {q:"How do we save electricity at home?", opts:["Leave all lights on", "Turn off lights when leaving a room 💡", "Use more machines", "Open the fridge often"], ans:1, fact:"Switching off lights saves electricity and helps the environment!", img:"💡✅🌿"},
        {q:"What is a battery?", opts:["A type of food", "Something that stores energy 🔋", "A type of toy", "A type of plant"], ans:1, fact:"Batteries store energy so we can use it later — like in our toys and phones!", img:"🔋⚡✨"},
        {q:"What is wind energy?", opts:["Energy from eating", "Energy made from the wind blowing 💨", "Energy from rain", "Energy from fire"], ans:1, fact:"Wind turbines use the wind to make clean electricity — no pollution!", img:"💨⚡🌿"},
      ],
  },
  water: {
      n1: [
        {q:"What do we use water for?", opts:["Only swimming", "Drinking, cooking and cleaning 💧", "Only making ice", "Only washing cars"], ans:1, fact:"Water is essential for drinking, cooking, washing and growing our food!", img:"💧🍳🚿"},
        {q:"Where does rain come from?", opts:["From shops", "From clouds in the sky 🌧️", "From the ground", "From factories"], ans:1, fact:"Clouds collect water vapour that falls as rain — part of the water cycle!", img:"🌧️☁️🌊"},
        {q:"What colour is clean water?", opts:["Yellow", "Brown", "Red", "Clear and colourless 💧"], ans:3, fact:"Clean safe drinking water is clear with no colour, smell or taste!", img:"💧✅💎"},
        {q:"Why do plants need water?", opts:["To make noise", "To grow and make food 🌱", "To become an animal", "To fly"], ans:1, fact:"Water carries nutrients to all parts of the plant so it can grow!", img:"🌱💧☀️"},
        {q:"What is a river?", opts:["A type of road", "A large body of fresh water flowing to the sea 🌊", "A type of lake", "An underground cave"], ans:1, fact:"Rivers flow from mountains and hills carrying fresh water to the sea!", img:"🌊🏔️🐠"},
      ],
      n2: [
        {q:"What do we use water for?", opts:["Only swimming", "Drinking, cooking and cleaning 💧", "Only making ice", "Only washing cars"], ans:1, fact:"Water is essential for drinking, cooking, washing and growing our food!", img:"💧🍳🚿"},
        {q:"Where does rain come from?", opts:["From shops", "From clouds in the sky 🌧️", "From the ground", "From factories"], ans:1, fact:"Clouds collect water vapour that falls as rain — part of the water cycle!", img:"🌧️☁️🌊"},
        {q:"What colour is clean water?", opts:["Yellow", "Brown", "Red", "Clear and colourless 💧"], ans:3, fact:"Clean safe drinking water is clear with no colour, smell or taste!", img:"💧✅💎"},
        {q:"Why do plants need water?", opts:["To make noise", "To grow and make food 🌱", "To become an animal", "To fly"], ans:1, fact:"Water carries nutrients to all parts of the plant so it can grow!", img:"🌱💧☀️"},
        {q:"What is a river?", opts:["A type of road", "A large body of fresh water flowing to the sea 🌊", "A type of lake", "An underground cave"], ans:1, fact:"Rivers flow from mountains and hills carrying fresh water to the sea!", img:"🌊🏔️🐠"},
      ],
      p1: [
        {q:"What do we use water for?", opts:["Only swimming", "Drinking, cooking and cleaning 💧", "Only making ice", "Only washing cars"], ans:1, fact:"Water is essential for drinking, cooking, washing and growing our food!", img:"💧🍳🚿"},
        {q:"Where does rain come from?", opts:["From shops", "From clouds in the sky 🌧️", "From the ground", "From factories"], ans:1, fact:"Clouds collect water vapour that falls as rain — part of the water cycle!", img:"🌧️☁️🌊"},
        {q:"What colour is clean water?", opts:["Yellow", "Brown", "Red", "Clear and colourless 💧"], ans:3, fact:"Clean safe drinking water is clear with no colour, smell or taste!", img:"💧✅💎"},
        {q:"Why do plants need water?", opts:["To make noise", "To grow and make food 🌱", "To become an animal", "To fly"], ans:1, fact:"Water carries nutrients to all parts of the plant so it can grow!", img:"🌱💧☀️"},
        {q:"What is a river?", opts:["A type of road", "A large body of fresh water flowing to the sea 🌊", "A type of lake", "An underground cave"], ans:1, fact:"Rivers flow from mountains and hills carrying fresh water to the sea!", img:"🌊🏔️🐠"},
      ],
      p2: [
        {q:"What do we use water for?", opts:["Only swimming", "Drinking, cooking and cleaning 💧", "Only making ice", "Only washing cars"], ans:1, fact:"Water is essential for drinking, cooking, washing and growing our food!", img:"💧🍳🚿"},
        {q:"Where does rain come from?", opts:["From shops", "From clouds in the sky 🌧️", "From the ground", "From factories"], ans:1, fact:"Clouds collect water vapour that falls as rain — part of the water cycle!", img:"🌧️☁️🌊"},
        {q:"What colour is clean water?", opts:["Yellow", "Brown", "Red", "Clear and colourless 💧"], ans:3, fact:"Clean safe drinking water is clear with no colour, smell or taste!", img:"💧✅💎"},
        {q:"Why do plants need water?", opts:["To make noise", "To grow and make food 🌱", "To become an animal", "To fly"], ans:1, fact:"Water carries nutrients to all parts of the plant so it can grow!", img:"🌱💧☀️"},
        {q:"What is a river?", opts:["A type of road", "A large body of fresh water flowing to the sea 🌊", "A type of lake", "An underground cave"], ans:1, fact:"Rivers flow from mountains and hills carrying fresh water to the sea!", img:"🌊🏔️🐠"},
      ],
      p3: [
        {q:"What do we use water for?", opts:["Only swimming", "Drinking, cooking and cleaning 💧", "Only making ice", "Only washing cars"], ans:1, fact:"Water is essential for drinking, cooking, washing and growing our food!", img:"💧🍳🚿"},
        {q:"Where does rain come from?", opts:["From shops", "From clouds in the sky 🌧️", "From the ground", "From factories"], ans:1, fact:"Clouds collect water vapour that falls as rain — part of the water cycle!", img:"🌧️☁️🌊"},
        {q:"What colour is clean water?", opts:["Yellow", "Brown", "Red", "Clear and colourless 💧"], ans:3, fact:"Clean safe drinking water is clear with no colour, smell or taste!", img:"💧✅💎"},
        {q:"Why do plants need water?", opts:["To make noise", "To grow and make food 🌱", "To become an animal", "To fly"], ans:1, fact:"Water carries nutrients to all parts of the plant so it can grow!", img:"🌱💧☀️"},
        {q:"What is a river?", opts:["A type of road", "A large body of fresh water flowing to the sea 🌊", "A type of lake", "An underground cave"], ans:1, fact:"Rivers flow from mountains and hills carrying fresh water to the sea!", img:"🌊🏔️🐠"},
      ],
      p4: [
        {q:"What do we use water for?", opts:["Only swimming", "Drinking, cooking and cleaning 💧", "Only making ice", "Only washing cars"], ans:1, fact:"Water is essential for drinking, cooking, washing and growing our food!", img:"💧🍳🚿"},
        {q:"Where does rain come from?", opts:["From shops", "From clouds in the sky 🌧️", "From the ground", "From factories"], ans:1, fact:"Clouds collect water vapour that falls as rain — part of the water cycle!", img:"🌧️☁️🌊"},
        {q:"What colour is clean water?", opts:["Yellow", "Brown", "Red", "Clear and colourless 💧"], ans:3, fact:"Clean safe drinking water is clear with no colour, smell or taste!", img:"💧✅💎"},
        {q:"Why do plants need water?", opts:["To make noise", "To grow and make food 🌱", "To become an animal", "To fly"], ans:1, fact:"Water carries nutrients to all parts of the plant so it can grow!", img:"🌱💧☀️"},
        {q:"What is a river?", opts:["A type of road", "A large body of fresh water flowing to the sea 🌊", "A type of lake", "An underground cave"], ans:1, fact:"Rivers flow from mountains and hills carrying fresh water to the sea!", img:"🌊🏔️🐠"},
      ],
      p5: [
        {q:"What do we use water for?", opts:["Only swimming", "Drinking, cooking and cleaning 💧", "Only making ice", "Only washing cars"], ans:1, fact:"Water is essential for drinking, cooking, washing and growing our food!", img:"💧🍳🚿"},
        {q:"Where does rain come from?", opts:["From shops", "From clouds in the sky 🌧️", "From the ground", "From factories"], ans:1, fact:"Clouds collect water vapour that falls as rain — part of the water cycle!", img:"🌧️☁️🌊"},
        {q:"What colour is clean water?", opts:["Yellow", "Brown", "Red", "Clear and colourless 💧"], ans:3, fact:"Clean safe drinking water is clear with no colour, smell or taste!", img:"💧✅💎"},
        {q:"Why do plants need water?", opts:["To make noise", "To grow and make food 🌱", "To become an animal", "To fly"], ans:1, fact:"Water carries nutrients to all parts of the plant so it can grow!", img:"🌱💧☀️"},
        {q:"What is a river?", opts:["A type of road", "A large body of fresh water flowing to the sea 🌊", "A type of lake", "An underground cave"], ans:1, fact:"Rivers flow from mountains and hills carrying fresh water to the sea!", img:"🌊🏔️🐠"},
      ],
      p6: [
        {q:"What do we use water for?", opts:["Only swimming", "Drinking, cooking and cleaning 💧", "Only making ice", "Only washing cars"], ans:1, fact:"Water is essential for drinking, cooking, washing and growing our food!", img:"💧🍳🚿"},
        {q:"Where does rain come from?", opts:["From shops", "From clouds in the sky 🌧️", "From the ground", "From factories"], ans:1, fact:"Clouds collect water vapour that falls as rain — part of the water cycle!", img:"🌧️☁️🌊"},
        {q:"What colour is clean water?", opts:["Yellow", "Brown", "Red", "Clear and colourless 💧"], ans:3, fact:"Clean safe drinking water is clear with no colour, smell or taste!", img:"💧✅💎"},
        {q:"Why do plants need water?", opts:["To make noise", "To grow and make food 🌱", "To become an animal", "To fly"], ans:1, fact:"Water carries nutrients to all parts of the plant so it can grow!", img:"🌱💧☀️"},
        {q:"What is a river?", opts:["A type of road", "A large body of fresh water flowing to the sea 🌊", "A type of lake", "An underground cave"], ans:1, fact:"Rivers flow from mountains and hills carrying fresh water to the sea!", img:"🌊🏔️🐠"},
      ],
      j1: [
        {q:"What do we use water for?", opts:["Only swimming", "Drinking, cooking and cleaning 💧", "Only making ice", "Only washing cars"], ans:1, fact:"Water is essential for drinking, cooking, washing and growing our food!", img:"💧🍳🚿"},
        {q:"Where does rain come from?", opts:["From shops", "From clouds in the sky 🌧️", "From the ground", "From factories"], ans:1, fact:"Clouds collect water vapour that falls as rain — part of the water cycle!", img:"🌧️☁️🌊"},
        {q:"What colour is clean water?", opts:["Yellow", "Brown", "Red", "Clear and colourless 💧"], ans:3, fact:"Clean safe drinking water is clear with no colour, smell or taste!", img:"💧✅💎"},
        {q:"Why do plants need water?", opts:["To make noise", "To grow and make food 🌱", "To become an animal", "To fly"], ans:1, fact:"Water carries nutrients to all parts of the plant so it can grow!", img:"🌱💧☀️"},
        {q:"What is a river?", opts:["A type of road", "A large body of fresh water flowing to the sea 🌊", "A type of lake", "An underground cave"], ans:1, fact:"Rivers flow from mountains and hills carrying fresh water to the sea!", img:"🌊🏔️🐠"},
      ],
      j2: [
        {q:"What do we use water for?", opts:["Only swimming", "Drinking, cooking and cleaning 💧", "Only making ice", "Only washing cars"], ans:1, fact:"Water is essential for drinking, cooking, washing and growing our food!", img:"💧🍳🚿"},
        {q:"Where does rain come from?", opts:["From shops", "From clouds in the sky 🌧️", "From the ground", "From factories"], ans:1, fact:"Clouds collect water vapour that falls as rain — part of the water cycle!", img:"🌧️☁️🌊"},
        {q:"What colour is clean water?", opts:["Yellow", "Brown", "Red", "Clear and colourless 💧"], ans:3, fact:"Clean safe drinking water is clear with no colour, smell or taste!", img:"💧✅💎"},
        {q:"Why do plants need water?", opts:["To make noise", "To grow and make food 🌱", "To become an animal", "To fly"], ans:1, fact:"Water carries nutrients to all parts of the plant so it can grow!", img:"🌱💧☀️"},
        {q:"What is a river?", opts:["A type of road", "A large body of fresh water flowing to the sea 🌊", "A type of lake", "An underground cave"], ans:1, fact:"Rivers flow from mountains and hills carrying fresh water to the sea!", img:"🌊🏔️🐠"},
      ],
      j3: [
        {q:"What do we use water for?", opts:["Only swimming", "Drinking, cooking and cleaning 💧", "Only making ice", "Only washing cars"], ans:1, fact:"Water is essential for drinking, cooking, washing and growing our food!", img:"💧🍳🚿"},
        {q:"Where does rain come from?", opts:["From shops", "From clouds in the sky 🌧️", "From the ground", "From factories"], ans:1, fact:"Clouds collect water vapour that falls as rain — part of the water cycle!", img:"🌧️☁️🌊"},
        {q:"What colour is clean water?", opts:["Yellow", "Brown", "Red", "Clear and colourless 💧"], ans:3, fact:"Clean safe drinking water is clear with no colour, smell or taste!", img:"💧✅💎"},
        {q:"Why do plants need water?", opts:["To make noise", "To grow and make food 🌱", "To become an animal", "To fly"], ans:1, fact:"Water carries nutrients to all parts of the plant so it can grow!", img:"🌱💧☀️"},
        {q:"What is a river?", opts:["A type of road", "A large body of fresh water flowing to the sea 🌊", "A type of lake", "An underground cave"], ans:1, fact:"Rivers flow from mountains and hills carrying fresh water to the sea!", img:"🌊🏔️🐠"},
      ],
      s1: [
        {q:"What do we use water for?", opts:["Only swimming", "Drinking, cooking and cleaning 💧", "Only making ice", "Only washing cars"], ans:1, fact:"Water is essential for drinking, cooking, washing and growing our food!", img:"💧🍳🚿"},
        {q:"Where does rain come from?", opts:["From shops", "From clouds in the sky 🌧️", "From the ground", "From factories"], ans:1, fact:"Clouds collect water vapour that falls as rain — part of the water cycle!", img:"🌧️☁️🌊"},
        {q:"What colour is clean water?", opts:["Yellow", "Brown", "Red", "Clear and colourless 💧"], ans:3, fact:"Clean safe drinking water is clear with no colour, smell or taste!", img:"💧✅💎"},
        {q:"Why do plants need water?", opts:["To make noise", "To grow and make food 🌱", "To become an animal", "To fly"], ans:1, fact:"Water carries nutrients to all parts of the plant so it can grow!", img:"🌱💧☀️"},
        {q:"What is a river?", opts:["A type of road", "A large body of fresh water flowing to the sea 🌊", "A type of lake", "An underground cave"], ans:1, fact:"Rivers flow from mountains and hills carrying fresh water to the sea!", img:"🌊🏔️🐠"},
      ],
      s2: [
        {q:"What do we use water for?", opts:["Only swimming", "Drinking, cooking and cleaning 💧", "Only making ice", "Only washing cars"], ans:1, fact:"Water is essential for drinking, cooking, washing and growing our food!", img:"💧🍳🚿"},
        {q:"Where does rain come from?", opts:["From shops", "From clouds in the sky 🌧️", "From the ground", "From factories"], ans:1, fact:"Clouds collect water vapour that falls as rain — part of the water cycle!", img:"🌧️☁️🌊"},
        {q:"What colour is clean water?", opts:["Yellow", "Brown", "Red", "Clear and colourless 💧"], ans:3, fact:"Clean safe drinking water is clear with no colour, smell or taste!", img:"💧✅💎"},
        {q:"Why do plants need water?", opts:["To make noise", "To grow and make food 🌱", "To become an animal", "To fly"], ans:1, fact:"Water carries nutrients to all parts of the plant so it can grow!", img:"🌱💧☀️"},
        {q:"What is a river?", opts:["A type of road", "A large body of fresh water flowing to the sea 🌊", "A type of lake", "An underground cave"], ans:1, fact:"Rivers flow from mountains and hills carrying fresh water to the sea!", img:"🌊🏔️🐠"},
      ],
      s3: [
        {q:"What do we use water for?", opts:["Only swimming", "Drinking, cooking and cleaning 💧", "Only making ice", "Only washing cars"], ans:1, fact:"Water is essential for drinking, cooking, washing and growing our food!", img:"💧🍳🚿"},
        {q:"Where does rain come from?", opts:["From shops", "From clouds in the sky 🌧️", "From the ground", "From factories"], ans:1, fact:"Clouds collect water vapour that falls as rain — part of the water cycle!", img:"🌧️☁️🌊"},
        {q:"What colour is clean water?", opts:["Yellow", "Brown", "Red", "Clear and colourless 💧"], ans:3, fact:"Clean safe drinking water is clear with no colour, smell or taste!", img:"💧✅💎"},
        {q:"Why do plants need water?", opts:["To make noise", "To grow and make food 🌱", "To become an animal", "To fly"], ans:1, fact:"Water carries nutrients to all parts of the plant so it can grow!", img:"🌱💧☀️"},
        {q:"What is a river?", opts:["A type of road", "A large body of fresh water flowing to the sea 🌊", "A type of lake", "An underground cave"], ans:1, fact:"Rivers flow from mountains and hills carrying fresh water to the sea!", img:"🌊🏔️🐠"},
      ],
  },
  nature: {
      n1: [
        {q:"What do trees give us to breathe?", opts:["Carbon dioxide", "Oxygen 🌳", "Smoke", "Steam"], ans:1, fact:"Trees breathe in CO₂ and breathe out the oxygen we need to live!", img:"🌳💨🟢"},
        {q:"What is a leaf?", opts:["Part of a fish", "The flat green part of a plant 🍃", "A type of rock", "A type of cloud"], ans:1, fact:"Leaves are the food factories of plants — they capture sunlight for photosynthesis!", img:"🍃🌿☀️"},
        {q:"Where do butterflies come from?", opts:["From eggs", "From caterpillars that transform 🦋", "From flowers", "From trees directly"], ans:1, fact:"Caterpillars spin a chrysalis and transform into beautiful butterflies!", img:"🦋🐛🌸"},
        {q:"What is a seed?", opts:["A type of rock", "A tiny thing that grows into a plant 🫘", "A type of water", "A part of a fish"], ans:1, fact:"Every plant starts as a tiny seed — just add water, soil and sunlight!", img:"🫘🌱🌿"},
        {q:"What do birds eat in the garden?", opts:["Rocks", "Insects, seeds and worms 🐦", "Plastic", "Soil only"], ans:1, fact:"Birds help our gardens by eating pest insects and spreading seeds!", img:"🐦🐛🌾"},
      ],
      n2: [
        {q:"What do trees give us to breathe?", opts:["Carbon dioxide", "Oxygen 🌳", "Smoke", "Steam"], ans:1, fact:"Trees breathe in CO₂ and breathe out the oxygen we need to live!", img:"🌳💨🟢"},
        {q:"What is a leaf?", opts:["Part of a fish", "The flat green part of a plant 🍃", "A type of rock", "A type of cloud"], ans:1, fact:"Leaves are the food factories of plants — they capture sunlight for photosynthesis!", img:"🍃🌿☀️"},
        {q:"Where do butterflies come from?", opts:["From eggs", "From caterpillars that transform 🦋", "From flowers", "From trees directly"], ans:1, fact:"Caterpillars spin a chrysalis and transform into beautiful butterflies!", img:"🦋🐛🌸"},
        {q:"What is a seed?", opts:["A type of rock", "A tiny thing that grows into a plant 🫘", "A type of water", "A part of a fish"], ans:1, fact:"Every plant starts as a tiny seed — just add water, soil and sunlight!", img:"🫘🌱🌿"},
        {q:"What do birds eat in the garden?", opts:["Rocks", "Insects, seeds and worms 🐦", "Plastic", "Soil only"], ans:1, fact:"Birds help our gardens by eating pest insects and spreading seeds!", img:"🐦🐛🌾"},
      ],
      p1: [
        {q:"What do trees give us to breathe?", opts:["Carbon dioxide", "Oxygen 🌳", "Smoke", "Steam"], ans:1, fact:"Trees breathe in CO₂ and breathe out the oxygen we need to live!", img:"🌳💨🟢"},
        {q:"What is a leaf?", opts:["Part of a fish", "The flat green part of a plant 🍃", "A type of rock", "A type of cloud"], ans:1, fact:"Leaves are the food factories of plants — they capture sunlight for photosynthesis!", img:"🍃🌿☀️"},
        {q:"Where do butterflies come from?", opts:["From eggs", "From caterpillars that transform 🦋", "From flowers", "From trees directly"], ans:1, fact:"Caterpillars spin a chrysalis and transform into beautiful butterflies!", img:"🦋🐛🌸"},
        {q:"What is a seed?", opts:["A type of rock", "A tiny thing that grows into a plant 🫘", "A type of water", "A part of a fish"], ans:1, fact:"Every plant starts as a tiny seed — just add water, soil and sunlight!", img:"🫘🌱🌿"},
        {q:"What do birds eat in the garden?", opts:["Rocks", "Insects, seeds and worms 🐦", "Plastic", "Soil only"], ans:1, fact:"Birds help our gardens by eating pest insects and spreading seeds!", img:"🐦🐛🌾"},
      ],
      p2: [
        {q:"What do trees give us to breathe?", opts:["Carbon dioxide", "Oxygen 🌳", "Smoke", "Steam"], ans:1, fact:"Trees breathe in CO₂ and breathe out the oxygen we need to live!", img:"🌳💨🟢"},
        {q:"What is a leaf?", opts:["Part of a fish", "The flat green part of a plant 🍃", "A type of rock", "A type of cloud"], ans:1, fact:"Leaves are the food factories of plants — they capture sunlight for photosynthesis!", img:"🍃🌿☀️"},
        {q:"Where do butterflies come from?", opts:["From eggs", "From caterpillars that transform 🦋", "From flowers", "From trees directly"], ans:1, fact:"Caterpillars spin a chrysalis and transform into beautiful butterflies!", img:"🦋🐛🌸"},
        {q:"What is a seed?", opts:["A type of rock", "A tiny thing that grows into a plant 🫘", "A type of water", "A part of a fish"], ans:1, fact:"Every plant starts as a tiny seed — just add water, soil and sunlight!", img:"🫘🌱🌿"},
        {q:"What do birds eat in the garden?", opts:["Rocks", "Insects, seeds and worms 🐦", "Plastic", "Soil only"], ans:1, fact:"Birds help our gardens by eating pest insects and spreading seeds!", img:"🐦🐛🌾"},
      ],
      p3: [
        {q:"What do trees give us to breathe?", opts:["Carbon dioxide", "Oxygen 🌳", "Smoke", "Steam"], ans:1, fact:"Trees breathe in CO₂ and breathe out the oxygen we need to live!", img:"🌳💨🟢"},
        {q:"What is a leaf?", opts:["Part of a fish", "The flat green part of a plant 🍃", "A type of rock", "A type of cloud"], ans:1, fact:"Leaves are the food factories of plants — they capture sunlight for photosynthesis!", img:"🍃🌿☀️"},
        {q:"Where do butterflies come from?", opts:["From eggs", "From caterpillars that transform 🦋", "From flowers", "From trees directly"], ans:1, fact:"Caterpillars spin a chrysalis and transform into beautiful butterflies!", img:"🦋🐛🌸"},
        {q:"What is a seed?", opts:["A type of rock", "A tiny thing that grows into a plant 🫘", "A type of water", "A part of a fish"], ans:1, fact:"Every plant starts as a tiny seed — just add water, soil and sunlight!", img:"🫘🌱🌿"},
        {q:"What do birds eat in the garden?", opts:["Rocks", "Insects, seeds and worms 🐦", "Plastic", "Soil only"], ans:1, fact:"Birds help our gardens by eating pest insects and spreading seeds!", img:"🐦🐛🌾"},
      ],
      p4: [
        {q:"What do trees give us to breathe?", opts:["Carbon dioxide", "Oxygen 🌳", "Smoke", "Steam"], ans:1, fact:"Trees breathe in CO₂ and breathe out the oxygen we need to live!", img:"🌳💨🟢"},
        {q:"What is a leaf?", opts:["Part of a fish", "The flat green part of a plant 🍃", "A type of rock", "A type of cloud"], ans:1, fact:"Leaves are the food factories of plants — they capture sunlight for photosynthesis!", img:"🍃🌿☀️"},
        {q:"Where do butterflies come from?", opts:["From eggs", "From caterpillars that transform 🦋", "From flowers", "From trees directly"], ans:1, fact:"Caterpillars spin a chrysalis and transform into beautiful butterflies!", img:"🦋🐛🌸"},
        {q:"What is a seed?", opts:["A type of rock", "A tiny thing that grows into a plant 🫘", "A type of water", "A part of a fish"], ans:1, fact:"Every plant starts as a tiny seed — just add water, soil and sunlight!", img:"🫘🌱🌿"},
        {q:"What do birds eat in the garden?", opts:["Rocks", "Insects, seeds and worms 🐦", "Plastic", "Soil only"], ans:1, fact:"Birds help our gardens by eating pest insects and spreading seeds!", img:"🐦🐛🌾"},
      ],
      p5: [
        {q:"What do trees give us to breathe?", opts:["Carbon dioxide", "Oxygen 🌳", "Smoke", "Steam"], ans:1, fact:"Trees breathe in CO₂ and breathe out the oxygen we need to live!", img:"🌳💨🟢"},
        {q:"What is a leaf?", opts:["Part of a fish", "The flat green part of a plant 🍃", "A type of rock", "A type of cloud"], ans:1, fact:"Leaves are the food factories of plants — they capture sunlight for photosynthesis!", img:"🍃🌿☀️"},
        {q:"Where do butterflies come from?", opts:["From eggs", "From caterpillars that transform 🦋", "From flowers", "From trees directly"], ans:1, fact:"Caterpillars spin a chrysalis and transform into beautiful butterflies!", img:"🦋🐛🌸"},
        {q:"What is a seed?", opts:["A type of rock", "A tiny thing that grows into a plant 🫘", "A type of water", "A part of a fish"], ans:1, fact:"Every plant starts as a tiny seed — just add water, soil and sunlight!", img:"🫘🌱🌿"},
        {q:"What do birds eat in the garden?", opts:["Rocks", "Insects, seeds and worms 🐦", "Plastic", "Soil only"], ans:1, fact:"Birds help our gardens by eating pest insects and spreading seeds!", img:"🐦🐛🌾"},
      ],
      p6: [
        {q:"What do trees give us to breathe?", opts:["Carbon dioxide", "Oxygen 🌳", "Smoke", "Steam"], ans:1, fact:"Trees breathe in CO₂ and breathe out the oxygen we need to live!", img:"🌳💨🟢"},
        {q:"What is a leaf?", opts:["Part of a fish", "The flat green part of a plant 🍃", "A type of rock", "A type of cloud"], ans:1, fact:"Leaves are the food factories of plants — they capture sunlight for photosynthesis!", img:"🍃🌿☀️"},
        {q:"Where do butterflies come from?", opts:["From eggs", "From caterpillars that transform 🦋", "From flowers", "From trees directly"], ans:1, fact:"Caterpillars spin a chrysalis and transform into beautiful butterflies!", img:"🦋🐛🌸"},
        {q:"What is a seed?", opts:["A type of rock", "A tiny thing that grows into a plant 🫘", "A type of water", "A part of a fish"], ans:1, fact:"Every plant starts as a tiny seed — just add water, soil and sunlight!", img:"🫘🌱🌿"},
        {q:"What do birds eat in the garden?", opts:["Rocks", "Insects, seeds and worms 🐦", "Plastic", "Soil only"], ans:1, fact:"Birds help our gardens by eating pest insects and spreading seeds!", img:"🐦🐛🌾"},
      ],
      j1: [
        {q:"What do trees give us to breathe?", opts:["Carbon dioxide", "Oxygen 🌳", "Smoke", "Steam"], ans:1, fact:"Trees breathe in CO₂ and breathe out the oxygen we need to live!", img:"🌳💨🟢"},
        {q:"What is a leaf?", opts:["Part of a fish", "The flat green part of a plant 🍃", "A type of rock", "A type of cloud"], ans:1, fact:"Leaves are the food factories of plants — they capture sunlight for photosynthesis!", img:"🍃🌿☀️"},
        {q:"Where do butterflies come from?", opts:["From eggs", "From caterpillars that transform 🦋", "From flowers", "From trees directly"], ans:1, fact:"Caterpillars spin a chrysalis and transform into beautiful butterflies!", img:"🦋🐛🌸"},
        {q:"What is a seed?", opts:["A type of rock", "A tiny thing that grows into a plant 🫘", "A type of water", "A part of a fish"], ans:1, fact:"Every plant starts as a tiny seed — just add water, soil and sunlight!", img:"🫘🌱🌿"},
        {q:"What do birds eat in the garden?", opts:["Rocks", "Insects, seeds and worms 🐦", "Plastic", "Soil only"], ans:1, fact:"Birds help our gardens by eating pest insects and spreading seeds!", img:"🐦🐛🌾"},
      ],
      j2: [
        {q:"What do trees give us to breathe?", opts:["Carbon dioxide", "Oxygen 🌳", "Smoke", "Steam"], ans:1, fact:"Trees breathe in CO₂ and breathe out the oxygen we need to live!", img:"🌳💨🟢"},
        {q:"What is a leaf?", opts:["Part of a fish", "The flat green part of a plant 🍃", "A type of rock", "A type of cloud"], ans:1, fact:"Leaves are the food factories of plants — they capture sunlight for photosynthesis!", img:"🍃🌿☀️"},
        {q:"Where do butterflies come from?", opts:["From eggs", "From caterpillars that transform 🦋", "From flowers", "From trees directly"], ans:1, fact:"Caterpillars spin a chrysalis and transform into beautiful butterflies!", img:"🦋🐛🌸"},
        {q:"What is a seed?", opts:["A type of rock", "A tiny thing that grows into a plant 🫘", "A type of water", "A part of a fish"], ans:1, fact:"Every plant starts as a tiny seed — just add water, soil and sunlight!", img:"🫘🌱🌿"},
        {q:"What do birds eat in the garden?", opts:["Rocks", "Insects, seeds and worms 🐦", "Plastic", "Soil only"], ans:1, fact:"Birds help our gardens by eating pest insects and spreading seeds!", img:"🐦🐛🌾"},
      ],
      j3: [
        {q:"What do trees give us to breathe?", opts:["Carbon dioxide", "Oxygen 🌳", "Smoke", "Steam"], ans:1, fact:"Trees breathe in CO₂ and breathe out the oxygen we need to live!", img:"🌳💨🟢"},
        {q:"What is a leaf?", opts:["Part of a fish", "The flat green part of a plant 🍃", "A type of rock", "A type of cloud"], ans:1, fact:"Leaves are the food factories of plants — they capture sunlight for photosynthesis!", img:"🍃🌿☀️"},
        {q:"Where do butterflies come from?", opts:["From eggs", "From caterpillars that transform 🦋", "From flowers", "From trees directly"], ans:1, fact:"Caterpillars spin a chrysalis and transform into beautiful butterflies!", img:"🦋🐛🌸"},
        {q:"What is a seed?", opts:["A type of rock", "A tiny thing that grows into a plant 🫘", "A type of water", "A part of a fish"], ans:1, fact:"Every plant starts as a tiny seed — just add water, soil and sunlight!", img:"🫘🌱🌿"},
        {q:"What do birds eat in the garden?", opts:["Rocks", "Insects, seeds and worms 🐦", "Plastic", "Soil only"], ans:1, fact:"Birds help our gardens by eating pest insects and spreading seeds!", img:"🐦🐛🌾"},
      ],
      s1: [
        {q:"What do trees give us to breathe?", opts:["Carbon dioxide", "Oxygen 🌳", "Smoke", "Steam"], ans:1, fact:"Trees breathe in CO₂ and breathe out the oxygen we need to live!", img:"🌳💨🟢"},
        {q:"What is a leaf?", opts:["Part of a fish", "The flat green part of a plant 🍃", "A type of rock", "A type of cloud"], ans:1, fact:"Leaves are the food factories of plants — they capture sunlight for photosynthesis!", img:"🍃🌿☀️"},
        {q:"Where do butterflies come from?", opts:["From eggs", "From caterpillars that transform 🦋", "From flowers", "From trees directly"], ans:1, fact:"Caterpillars spin a chrysalis and transform into beautiful butterflies!", img:"🦋🐛🌸"},
        {q:"What is a seed?", opts:["A type of rock", "A tiny thing that grows into a plant 🫘", "A type of water", "A part of a fish"], ans:1, fact:"Every plant starts as a tiny seed — just add water, soil and sunlight!", img:"🫘🌱🌿"},
        {q:"What do birds eat in the garden?", opts:["Rocks", "Insects, seeds and worms 🐦", "Plastic", "Soil only"], ans:1, fact:"Birds help our gardens by eating pest insects and spreading seeds!", img:"🐦🐛🌾"},
      ],
      s2: [
        {q:"What do trees give us to breathe?", opts:["Carbon dioxide", "Oxygen 🌳", "Smoke", "Steam"], ans:1, fact:"Trees breathe in CO₂ and breathe out the oxygen we need to live!", img:"🌳💨🟢"},
        {q:"What is a leaf?", opts:["Part of a fish", "The flat green part of a plant 🍃", "A type of rock", "A type of cloud"], ans:1, fact:"Leaves are the food factories of plants — they capture sunlight for photosynthesis!", img:"🍃🌿☀️"},
        {q:"Where do butterflies come from?", opts:["From eggs", "From caterpillars that transform 🦋", "From flowers", "From trees directly"], ans:1, fact:"Caterpillars spin a chrysalis and transform into beautiful butterflies!", img:"🦋🐛🌸"},
        {q:"What is a seed?", opts:["A type of rock", "A tiny thing that grows into a plant 🫘", "A type of water", "A part of a fish"], ans:1, fact:"Every plant starts as a tiny seed — just add water, soil and sunlight!", img:"🫘🌱🌿"},
        {q:"What do birds eat in the garden?", opts:["Rocks", "Insects, seeds and worms 🐦", "Plastic", "Soil only"], ans:1, fact:"Birds help our gardens by eating pest insects and spreading seeds!", img:"🐦🐛🌾"},
      ],
      s3: [
        {q:"What do trees give us to breathe?", opts:["Carbon dioxide", "Oxygen 🌳", "Smoke", "Steam"], ans:1, fact:"Trees breathe in CO₂ and breathe out the oxygen we need to live!", img:"🌳💨🟢"},
        {q:"What is a leaf?", opts:["Part of a fish", "The flat green part of a plant 🍃", "A type of rock", "A type of cloud"], ans:1, fact:"Leaves are the food factories of plants — they capture sunlight for photosynthesis!", img:"🍃🌿☀️"},
        {q:"Where do butterflies come from?", opts:["From eggs", "From caterpillars that transform 🦋", "From flowers", "From trees directly"], ans:1, fact:"Caterpillars spin a chrysalis and transform into beautiful butterflies!", img:"🦋🐛🌸"},
        {q:"What is a seed?", opts:["A type of rock", "A tiny thing that grows into a plant 🫘", "A type of water", "A part of a fish"], ans:1, fact:"Every plant starts as a tiny seed — just add water, soil and sunlight!", img:"🫘🌱🌿"},
        {q:"What do birds eat in the garden?", opts:["Rocks", "Insects, seeds and worms 🐦", "Plastic", "Soil only"], ans:1, fact:"Birds help our gardens by eating pest insects and spreading seeds!", img:"🐦🐛🌾"},
      ],
  },
  climate: {
      n1: [
        {q:"What is the weather?", opts:["What we eat", "What is happening in the sky — sunny, rainy or windy 🌤️", "What we wear", "What we learn"], ans:1, fact:"Weather is what happens outside — sunshine, rain, wind or clouds every day!", img:"🌤️☀️🌧️"},
        {q:"Why is it important to keep Earth clean?", opts:["It looks nice", "Plants, animals and people need a clean environment to stay healthy 🌍", "Only for tourists", "Only for animals"], ans:1, fact:"A clean Earth supports all life — animals, plants and humans all depend on it!", img:"🌍🌿✅"},
        {q:"What colour is the sky on a sunny day?", opts:["Green", "Yellow", "Blue ☀️", "Orange"], ans:2, fact:"The sky appears blue because of how sunlight scatters through the atmosphere!", img:"☀️💙🌤️"},
        {q:"What is a forest?", opts:["A big building", "A large area with many trees 🌲", "A type of ocean", "A type of city"], ans:1, fact:"Forests are home to millions of species and help clean our air and water!", img:"🌲🌳🌿"},
        {q:"Why should we plant trees?", opts:["They are pretty", "Trees clean the air and provide homes for animals 🌳", "To block the view", "To make shade only"], ans:1, fact:"Trees absorb CO₂, release oxygen, provide habitat and reduce flooding!", img:"🌳💚🌍"},
      ],
      n2: [
        {q:"What is the weather?", opts:["What we eat", "What is happening in the sky — sunny, rainy or windy 🌤️", "What we wear", "What we learn"], ans:1, fact:"Weather is what happens outside — sunshine, rain, wind or clouds every day!", img:"🌤️☀️🌧️"},
        {q:"Why is it important to keep Earth clean?", opts:["It looks nice", "Plants, animals and people need a clean environment to stay healthy 🌍", "Only for tourists", "Only for animals"], ans:1, fact:"A clean Earth supports all life — animals, plants and humans all depend on it!", img:"🌍🌿✅"},
        {q:"What colour is the sky on a sunny day?", opts:["Green", "Yellow", "Blue ☀️", "Orange"], ans:2, fact:"The sky appears blue because of how sunlight scatters through the atmosphere!", img:"☀️💙🌤️"},
        {q:"What is a forest?", opts:["A big building", "A large area with many trees 🌲", "A type of ocean", "A type of city"], ans:1, fact:"Forests are home to millions of species and help clean our air and water!", img:"🌲🌳🌿"},
        {q:"Why should we plant trees?", opts:["They are pretty", "Trees clean the air and provide homes for animals 🌳", "To block the view", "To make shade only"], ans:1, fact:"Trees absorb CO₂, release oxygen, provide habitat and reduce flooding!", img:"🌳💚🌍"},
      ],
      p1: [
        {q:"What is the weather?", opts:["What we eat", "What is happening in the sky — sunny, rainy or windy 🌤️", "What we wear", "What we learn"], ans:1, fact:"Weather is what happens outside — sunshine, rain, wind or clouds every day!", img:"🌤️☀️🌧️"},
        {q:"Why is it important to keep Earth clean?", opts:["It looks nice", "Plants, animals and people need a clean environment to stay healthy 🌍", "Only for tourists", "Only for animals"], ans:1, fact:"A clean Earth supports all life — animals, plants and humans all depend on it!", img:"🌍🌿✅"},
        {q:"What colour is the sky on a sunny day?", opts:["Green", "Yellow", "Blue ☀️", "Orange"], ans:2, fact:"The sky appears blue because of how sunlight scatters through the atmosphere!", img:"☀️💙🌤️"},
        {q:"What is a forest?", opts:["A big building", "A large area with many trees 🌲", "A type of ocean", "A type of city"], ans:1, fact:"Forests are home to millions of species and help clean our air and water!", img:"🌲🌳🌿"},
        {q:"Why should we plant trees?", opts:["They are pretty", "Trees clean the air and provide homes for animals 🌳", "To block the view", "To make shade only"], ans:1, fact:"Trees absorb CO₂, release oxygen, provide habitat and reduce flooding!", img:"🌳💚🌍"},
      ],
      p2: [
        {q:"What is the weather?", opts:["What we eat", "What is happening in the sky — sunny, rainy or windy 🌤️", "What we wear", "What we learn"], ans:1, fact:"Weather is what happens outside — sunshine, rain, wind or clouds every day!", img:"🌤️☀️🌧️"},
        {q:"Why is it important to keep Earth clean?", opts:["It looks nice", "Plants, animals and people need a clean environment to stay healthy 🌍", "Only for tourists", "Only for animals"], ans:1, fact:"A clean Earth supports all life — animals, plants and humans all depend on it!", img:"🌍🌿✅"},
        {q:"What colour is the sky on a sunny day?", opts:["Green", "Yellow", "Blue ☀️", "Orange"], ans:2, fact:"The sky appears blue because of how sunlight scatters through the atmosphere!", img:"☀️💙🌤️"},
        {q:"What is a forest?", opts:["A big building", "A large area with many trees 🌲", "A type of ocean", "A type of city"], ans:1, fact:"Forests are home to millions of species and help clean our air and water!", img:"🌲🌳🌿"},
        {q:"Why should we plant trees?", opts:["They are pretty", "Trees clean the air and provide homes for animals 🌳", "To block the view", "To make shade only"], ans:1, fact:"Trees absorb CO₂, release oxygen, provide habitat and reduce flooding!", img:"🌳💚🌍"},
      ],
      p3: [
        {q:"What is the weather?", opts:["What we eat", "What is happening in the sky — sunny, rainy or windy 🌤️", "What we wear", "What we learn"], ans:1, fact:"Weather is what happens outside — sunshine, rain, wind or clouds every day!", img:"🌤️☀️🌧️"},
        {q:"Why is it important to keep Earth clean?", opts:["It looks nice", "Plants, animals and people need a clean environment to stay healthy 🌍", "Only for tourists", "Only for animals"], ans:1, fact:"A clean Earth supports all life — animals, plants and humans all depend on it!", img:"🌍🌿✅"},
        {q:"What colour is the sky on a sunny day?", opts:["Green", "Yellow", "Blue ☀️", "Orange"], ans:2, fact:"The sky appears blue because of how sunlight scatters through the atmosphere!", img:"☀️💙🌤️"},
        {q:"What is a forest?", opts:["A big building", "A large area with many trees 🌲", "A type of ocean", "A type of city"], ans:1, fact:"Forests are home to millions of species and help clean our air and water!", img:"🌲🌳🌿"},
        {q:"Why should we plant trees?", opts:["They are pretty", "Trees clean the air and provide homes for animals 🌳", "To block the view", "To make shade only"], ans:1, fact:"Trees absorb CO₂, release oxygen, provide habitat and reduce flooding!", img:"🌳💚🌍"},
      ],
      p4: [
        {q:"What is the weather?", opts:["What we eat", "What is happening in the sky — sunny, rainy or windy 🌤️", "What we wear", "What we learn"], ans:1, fact:"Weather is what happens outside — sunshine, rain, wind or clouds every day!", img:"🌤️☀️🌧️"},
        {q:"Why is it important to keep Earth clean?", opts:["It looks nice", "Plants, animals and people need a clean environment to stay healthy 🌍", "Only for tourists", "Only for animals"], ans:1, fact:"A clean Earth supports all life — animals, plants and humans all depend on it!", img:"🌍🌿✅"},
        {q:"What colour is the sky on a sunny day?", opts:["Green", "Yellow", "Blue ☀️", "Orange"], ans:2, fact:"The sky appears blue because of how sunlight scatters through the atmosphere!", img:"☀️💙🌤️"},
        {q:"What is a forest?", opts:["A big building", "A large area with many trees 🌲", "A type of ocean", "A type of city"], ans:1, fact:"Forests are home to millions of species and help clean our air and water!", img:"🌲🌳🌿"},
        {q:"Why should we plant trees?", opts:["They are pretty", "Trees clean the air and provide homes for animals 🌳", "To block the view", "To make shade only"], ans:1, fact:"Trees absorb CO₂, release oxygen, provide habitat and reduce flooding!", img:"🌳💚🌍"},
      ],
      p5: [
        {q:"What is the weather?", opts:["What we eat", "What is happening in the sky — sunny, rainy or windy 🌤️", "What we wear", "What we learn"], ans:1, fact:"Weather is what happens outside — sunshine, rain, wind or clouds every day!", img:"🌤️☀️🌧️"},
        {q:"Why is it important to keep Earth clean?", opts:["It looks nice", "Plants, animals and people need a clean environment to stay healthy 🌍", "Only for tourists", "Only for animals"], ans:1, fact:"A clean Earth supports all life — animals, plants and humans all depend on it!", img:"🌍🌿✅"},
        {q:"What colour is the sky on a sunny day?", opts:["Green", "Yellow", "Blue ☀️", "Orange"], ans:2, fact:"The sky appears blue because of how sunlight scatters through the atmosphere!", img:"☀️💙🌤️"},
        {q:"What is a forest?", opts:["A big building", "A large area with many trees 🌲", "A type of ocean", "A type of city"], ans:1, fact:"Forests are home to millions of species and help clean our air and water!", img:"🌲🌳🌿"},
        {q:"Why should we plant trees?", opts:["They are pretty", "Trees clean the air and provide homes for animals 🌳", "To block the view", "To make shade only"], ans:1, fact:"Trees absorb CO₂, release oxygen, provide habitat and reduce flooding!", img:"🌳💚🌍"},
      ],
      p6: [
        {q:"What is the weather?", opts:["What we eat", "What is happening in the sky — sunny, rainy or windy 🌤️", "What we wear", "What we learn"], ans:1, fact:"Weather is what happens outside — sunshine, rain, wind or clouds every day!", img:"🌤️☀️🌧️"},
        {q:"Why is it important to keep Earth clean?", opts:["It looks nice", "Plants, animals and people need a clean environment to stay healthy 🌍", "Only for tourists", "Only for animals"], ans:1, fact:"A clean Earth supports all life — animals, plants and humans all depend on it!", img:"🌍🌿✅"},
        {q:"What colour is the sky on a sunny day?", opts:["Green", "Yellow", "Blue ☀️", "Orange"], ans:2, fact:"The sky appears blue because of how sunlight scatters through the atmosphere!", img:"☀️💙🌤️"},
        {q:"What is a forest?", opts:["A big building", "A large area with many trees 🌲", "A type of ocean", "A type of city"], ans:1, fact:"Forests are home to millions of species and help clean our air and water!", img:"🌲🌳🌿"},
        {q:"Why should we plant trees?", opts:["They are pretty", "Trees clean the air and provide homes for animals 🌳", "To block the view", "To make shade only"], ans:1, fact:"Trees absorb CO₂, release oxygen, provide habitat and reduce flooding!", img:"🌳💚🌍"},
      ],
      j1: [
        {q:"What is the weather?", opts:["What we eat", "What is happening in the sky — sunny, rainy or windy 🌤️", "What we wear", "What we learn"], ans:1, fact:"Weather is what happens outside — sunshine, rain, wind or clouds every day!", img:"🌤️☀️🌧️"},
        {q:"Why is it important to keep Earth clean?", opts:["It looks nice", "Plants, animals and people need a clean environment to stay healthy 🌍", "Only for tourists", "Only for animals"], ans:1, fact:"A clean Earth supports all life — animals, plants and humans all depend on it!", img:"🌍🌿✅"},
        {q:"What colour is the sky on a sunny day?", opts:["Green", "Yellow", "Blue ☀️", "Orange"], ans:2, fact:"The sky appears blue because of how sunlight scatters through the atmosphere!", img:"☀️💙🌤️"},
        {q:"What is a forest?", opts:["A big building", "A large area with many trees 🌲", "A type of ocean", "A type of city"], ans:1, fact:"Forests are home to millions of species and help clean our air and water!", img:"🌲🌳🌿"},
        {q:"Why should we plant trees?", opts:["They are pretty", "Trees clean the air and provide homes for animals 🌳", "To block the view", "To make shade only"], ans:1, fact:"Trees absorb CO₂, release oxygen, provide habitat and reduce flooding!", img:"🌳💚🌍"},
      ],
      j2: [
        {q:"What is the weather?", opts:["What we eat", "What is happening in the sky — sunny, rainy or windy 🌤️", "What we wear", "What we learn"], ans:1, fact:"Weather is what happens outside — sunshine, rain, wind or clouds every day!", img:"🌤️☀️🌧️"},
        {q:"Why is it important to keep Earth clean?", opts:["It looks nice", "Plants, animals and people need a clean environment to stay healthy 🌍", "Only for tourists", "Only for animals"], ans:1, fact:"A clean Earth supports all life — animals, plants and humans all depend on it!", img:"🌍🌿✅"},
        {q:"What colour is the sky on a sunny day?", opts:["Green", "Yellow", "Blue ☀️", "Orange"], ans:2, fact:"The sky appears blue because of how sunlight scatters through the atmosphere!", img:"☀️💙🌤️"},
        {q:"What is a forest?", opts:["A big building", "A large area with many trees 🌲", "A type of ocean", "A type of city"], ans:1, fact:"Forests are home to millions of species and help clean our air and water!", img:"🌲🌳🌿"},
        {q:"Why should we plant trees?", opts:["They are pretty", "Trees clean the air and provide homes for animals 🌳", "To block the view", "To make shade only"], ans:1, fact:"Trees absorb CO₂, release oxygen, provide habitat and reduce flooding!", img:"🌳💚🌍"},
      ],
      j3: [
        {q:"What is the weather?", opts:["What we eat", "What is happening in the sky — sunny, rainy or windy 🌤️", "What we wear", "What we learn"], ans:1, fact:"Weather is what happens outside — sunshine, rain, wind or clouds every day!", img:"🌤️☀️🌧️"},
        {q:"Why is it important to keep Earth clean?", opts:["It looks nice", "Plants, animals and people need a clean environment to stay healthy 🌍", "Only for tourists", "Only for animals"], ans:1, fact:"A clean Earth supports all life — animals, plants and humans all depend on it!", img:"🌍🌿✅"},
        {q:"What colour is the sky on a sunny day?", opts:["Green", "Yellow", "Blue ☀️", "Orange"], ans:2, fact:"The sky appears blue because of how sunlight scatters through the atmosphere!", img:"☀️💙🌤️"},
        {q:"What is a forest?", opts:["A big building", "A large area with many trees 🌲", "A type of ocean", "A type of city"], ans:1, fact:"Forests are home to millions of species and help clean our air and water!", img:"🌲🌳🌿"},
        {q:"Why should we plant trees?", opts:["They are pretty", "Trees clean the air and provide homes for animals 🌳", "To block the view", "To make shade only"], ans:1, fact:"Trees absorb CO₂, release oxygen, provide habitat and reduce flooding!", img:"🌳💚🌍"},
      ],
      s1: [
        {q:"What is the weather?", opts:["What we eat", "What is happening in the sky — sunny, rainy or windy 🌤️", "What we wear", "What we learn"], ans:1, fact:"Weather is what happens outside — sunshine, rain, wind or clouds every day!", img:"🌤️☀️🌧️"},
        {q:"Why is it important to keep Earth clean?", opts:["It looks nice", "Plants, animals and people need a clean environment to stay healthy 🌍", "Only for tourists", "Only for animals"], ans:1, fact:"A clean Earth supports all life — animals, plants and humans all depend on it!", img:"🌍🌿✅"},
        {q:"What colour is the sky on a sunny day?", opts:["Green", "Yellow", "Blue ☀️", "Orange"], ans:2, fact:"The sky appears blue because of how sunlight scatters through the atmosphere!", img:"☀️💙🌤️"},
        {q:"What is a forest?", opts:["A big building", "A large area with many trees 🌲", "A type of ocean", "A type of city"], ans:1, fact:"Forests are home to millions of species and help clean our air and water!", img:"🌲🌳🌿"},
        {q:"Why should we plant trees?", opts:["They are pretty", "Trees clean the air and provide homes for animals 🌳", "To block the view", "To make shade only"], ans:1, fact:"Trees absorb CO₂, release oxygen, provide habitat and reduce flooding!", img:"🌳💚🌍"},
      ],
      s2: [
        {q:"What is the weather?", opts:["What we eat", "What is happening in the sky — sunny, rainy or windy 🌤️", "What we wear", "What we learn"], ans:1, fact:"Weather is what happens outside — sunshine, rain, wind or clouds every day!", img:"🌤️☀️🌧️"},
        {q:"Why is it important to keep Earth clean?", opts:["It looks nice", "Plants, animals and people need a clean environment to stay healthy 🌍", "Only for tourists", "Only for animals"], ans:1, fact:"A clean Earth supports all life — animals, plants and humans all depend on it!", img:"🌍🌿✅"},
        {q:"What colour is the sky on a sunny day?", opts:["Green", "Yellow", "Blue ☀️", "Orange"], ans:2, fact:"The sky appears blue because of how sunlight scatters through the atmosphere!", img:"☀️💙🌤️"},
        {q:"What is a forest?", opts:["A big building", "A large area with many trees 🌲", "A type of ocean", "A type of city"], ans:1, fact:"Forests are home to millions of species and help clean our air and water!", img:"🌲🌳🌿"},
        {q:"Why should we plant trees?", opts:["They are pretty", "Trees clean the air and provide homes for animals 🌳", "To block the view", "To make shade only"], ans:1, fact:"Trees absorb CO₂, release oxygen, provide habitat and reduce flooding!", img:"🌳💚🌍"},
      ],
      s3: [
        {q:"What is the weather?", opts:["What we eat", "What is happening in the sky — sunny, rainy or windy 🌤️", "What we wear", "What we learn"], ans:1, fact:"Weather is what happens outside — sunshine, rain, wind or clouds every day!", img:"🌤️☀️🌧️"},
        {q:"Why is it important to keep Earth clean?", opts:["It looks nice", "Plants, animals and people need a clean environment to stay healthy 🌍", "Only for tourists", "Only for animals"], ans:1, fact:"A clean Earth supports all life — animals, plants and humans all depend on it!", img:"🌍🌿✅"},
        {q:"What colour is the sky on a sunny day?", opts:["Green", "Yellow", "Blue ☀️", "Orange"], ans:2, fact:"The sky appears blue because of how sunlight scatters through the atmosphere!", img:"☀️💙🌤️"},
        {q:"What is a forest?", opts:["A big building", "A large area with many trees 🌲", "A type of ocean", "A type of city"], ans:1, fact:"Forests are home to millions of species and help clean our air and water!", img:"🌲🌳🌿"},
        {q:"Why should we plant trees?", opts:["They are pretty", "Trees clean the air and provide homes for animals 🌳", "To block the view", "To make shade only"], ans:1, fact:"Trees absorb CO₂, release oxygen, provide habitat and reduce flooding!", img:"🌳💚🌍"},
      ],
  },
  science: {
      n1: [
        {q:"What is a microscope used for?", opts:["Eating food", "Looking at very tiny things 🔬", "Building houses", "Measuring temperature"], ans:1, fact:"Microscopes magnify tiny objects like bacteria and cells so we can study them!", img:"🔬✨🧫"},
        {q:"What is a farmer's most important tool?", opts:["A computer", "Knowledge and good farming tools 🚜", "A television", "A car"], ans:1, fact:"Farmers use knowledge, seeds, soil, water and tools to grow our food!", img:"🚜🌾👨‍🌾"},
        {q:"What does a GPS do on a farm?", opts:["Cooks food", "Tells the farmer exactly where they are on the field 🛰️", "Waters plants", "Predicts weather only"], ans:1, fact:"GPS satellites help farmers know exactly where to plant, water and harvest!", img:"🛰️📍🌾"},
        {q:"What is a drone used for on farms?", opts:["It is a toy only", "It flies over fields to check crop health 🛸", "It waters crops by hand", "It harvests crops manually"], ans:1, fact:"Farm drones photograph and survey crops — spotting problems early!", img:"🛸📷🌾"},
        {q:"What is a soil sensor?", opts:["A type of worm", "A device that measures moisture and nutrients in soil 📡", "A garden tool", "A type of seed"], ans:1, fact:"Soil sensors send real-time data to farmers — helping them water only when needed!", img:"📡🌱💧"},
      ],
      n2: [
        {q:"What is a microscope used for?", opts:["Eating food", "Looking at very tiny things 🔬", "Building houses", "Measuring temperature"], ans:1, fact:"Microscopes magnify tiny objects like bacteria and cells so we can study them!", img:"🔬✨🧫"},
        {q:"What is a farmer's most important tool?", opts:["A computer", "Knowledge and good farming tools 🚜", "A television", "A car"], ans:1, fact:"Farmers use knowledge, seeds, soil, water and tools to grow our food!", img:"🚜🌾👨‍🌾"},
        {q:"What does a GPS do on a farm?", opts:["Cooks food", "Tells the farmer exactly where they are on the field 🛰️", "Waters plants", "Predicts weather only"], ans:1, fact:"GPS satellites help farmers know exactly where to plant, water and harvest!", img:"🛰️📍🌾"},
        {q:"What is a drone used for on farms?", opts:["It is a toy only", "It flies over fields to check crop health 🛸", "It waters crops by hand", "It harvests crops manually"], ans:1, fact:"Farm drones photograph and survey crops — spotting problems early!", img:"🛸📷🌾"},
        {q:"What is a soil sensor?", opts:["A type of worm", "A device that measures moisture and nutrients in soil 📡", "A garden tool", "A type of seed"], ans:1, fact:"Soil sensors send real-time data to farmers — helping them water only when needed!", img:"📡🌱💧"},
      ],
      p1: [
        {q:"What is a microscope used for?", opts:["Eating food", "Looking at very tiny things 🔬", "Building houses", "Measuring temperature"], ans:1, fact:"Microscopes magnify tiny objects like bacteria and cells so we can study them!", img:"🔬✨🧫"},
        {q:"What is a farmer's most important tool?", opts:["A computer", "Knowledge and good farming tools 🚜", "A television", "A car"], ans:1, fact:"Farmers use knowledge, seeds, soil, water and tools to grow our food!", img:"🚜🌾👨‍🌾"},
        {q:"What does a GPS do on a farm?", opts:["Cooks food", "Tells the farmer exactly where they are on the field 🛰️", "Waters plants", "Predicts weather only"], ans:1, fact:"GPS satellites help farmers know exactly where to plant, water and harvest!", img:"🛰️📍🌾"},
        {q:"What is a drone used for on farms?", opts:["It is a toy only", "It flies over fields to check crop health 🛸", "It waters crops by hand", "It harvests crops manually"], ans:1, fact:"Farm drones photograph and survey crops — spotting problems early!", img:"🛸📷🌾"},
        {q:"What is a soil sensor?", opts:["A type of worm", "A device that measures moisture and nutrients in soil 📡", "A garden tool", "A type of seed"], ans:1, fact:"Soil sensors send real-time data to farmers — helping them water only when needed!", img:"📡🌱💧"},
      ],
      p2: [
        {q:"What is a microscope used for?", opts:["Eating food", "Looking at very tiny things 🔬", "Building houses", "Measuring temperature"], ans:1, fact:"Microscopes magnify tiny objects like bacteria and cells so we can study them!", img:"🔬✨🧫"},
        {q:"What is a farmer's most important tool?", opts:["A computer", "Knowledge and good farming tools 🚜", "A television", "A car"], ans:1, fact:"Farmers use knowledge, seeds, soil, water and tools to grow our food!", img:"🚜🌾👨‍🌾"},
        {q:"What does a GPS do on a farm?", opts:["Cooks food", "Tells the farmer exactly where they are on the field 🛰️", "Waters plants", "Predicts weather only"], ans:1, fact:"GPS satellites help farmers know exactly where to plant, water and harvest!", img:"🛰️📍🌾"},
        {q:"What is a drone used for on farms?", opts:["It is a toy only", "It flies over fields to check crop health 🛸", "It waters crops by hand", "It harvests crops manually"], ans:1, fact:"Farm drones photograph and survey crops — spotting problems early!", img:"🛸📷🌾"},
        {q:"What is a soil sensor?", opts:["A type of worm", "A device that measures moisture and nutrients in soil 📡", "A garden tool", "A type of seed"], ans:1, fact:"Soil sensors send real-time data to farmers — helping them water only when needed!", img:"📡🌱💧"},
      ],
      p3: [
        {q:"What is a microscope used for?", opts:["Eating food", "Looking at very tiny things 🔬", "Building houses", "Measuring temperature"], ans:1, fact:"Microscopes magnify tiny objects like bacteria and cells so we can study them!", img:"🔬✨🧫"},
        {q:"What is a farmer's most important tool?", opts:["A computer", "Knowledge and good farming tools 🚜", "A television", "A car"], ans:1, fact:"Farmers use knowledge, seeds, soil, water and tools to grow our food!", img:"🚜🌾👨‍🌾"},
        {q:"What does a GPS do on a farm?", opts:["Cooks food", "Tells the farmer exactly where they are on the field 🛰️", "Waters plants", "Predicts weather only"], ans:1, fact:"GPS satellites help farmers know exactly where to plant, water and harvest!", img:"🛰️📍🌾"},
        {q:"What is a drone used for on farms?", opts:["It is a toy only", "It flies over fields to check crop health 🛸", "It waters crops by hand", "It harvests crops manually"], ans:1, fact:"Farm drones photograph and survey crops — spotting problems early!", img:"🛸📷🌾"},
        {q:"What is a soil sensor?", opts:["A type of worm", "A device that measures moisture and nutrients in soil 📡", "A garden tool", "A type of seed"], ans:1, fact:"Soil sensors send real-time data to farmers — helping them water only when needed!", img:"📡🌱💧"},
      ],
      p4: [
        {q:"What is a microscope used for?", opts:["Eating food", "Looking at very tiny things 🔬", "Building houses", "Measuring temperature"], ans:1, fact:"Microscopes magnify tiny objects like bacteria and cells so we can study them!", img:"🔬✨🧫"},
        {q:"What is a farmer's most important tool?", opts:["A computer", "Knowledge and good farming tools 🚜", "A television", "A car"], ans:1, fact:"Farmers use knowledge, seeds, soil, water and tools to grow our food!", img:"🚜🌾👨‍🌾"},
        {q:"What does a GPS do on a farm?", opts:["Cooks food", "Tells the farmer exactly where they are on the field 🛰️", "Waters plants", "Predicts weather only"], ans:1, fact:"GPS satellites help farmers know exactly where to plant, water and harvest!", img:"🛰️📍🌾"},
        {q:"What is a drone used for on farms?", opts:["It is a toy only", "It flies over fields to check crop health 🛸", "It waters crops by hand", "It harvests crops manually"], ans:1, fact:"Farm drones photograph and survey crops — spotting problems early!", img:"🛸📷🌾"},
        {q:"What is a soil sensor?", opts:["A type of worm", "A device that measures moisture and nutrients in soil 📡", "A garden tool", "A type of seed"], ans:1, fact:"Soil sensors send real-time data to farmers — helping them water only when needed!", img:"📡🌱💧"},
      ],
      p5: [
        {q:"What is a microscope used for?", opts:["Eating food", "Looking at very tiny things 🔬", "Building houses", "Measuring temperature"], ans:1, fact:"Microscopes magnify tiny objects like bacteria and cells so we can study them!", img:"🔬✨🧫"},
        {q:"What is a farmer's most important tool?", opts:["A computer", "Knowledge and good farming tools 🚜", "A television", "A car"], ans:1, fact:"Farmers use knowledge, seeds, soil, water and tools to grow our food!", img:"🚜🌾👨‍🌾"},
        {q:"What does a GPS do on a farm?", opts:["Cooks food", "Tells the farmer exactly where they are on the field 🛰️", "Waters plants", "Predicts weather only"], ans:1, fact:"GPS satellites help farmers know exactly where to plant, water and harvest!", img:"🛰️📍🌾"},
        {q:"What is a drone used for on farms?", opts:["It is a toy only", "It flies over fields to check crop health 🛸", "It waters crops by hand", "It harvests crops manually"], ans:1, fact:"Farm drones photograph and survey crops — spotting problems early!", img:"🛸📷🌾"},
        {q:"What is a soil sensor?", opts:["A type of worm", "A device that measures moisture and nutrients in soil 📡", "A garden tool", "A type of seed"], ans:1, fact:"Soil sensors send real-time data to farmers — helping them water only when needed!", img:"📡🌱💧"},
      ],
      p6: [
        {q:"What is a microscope used for?", opts:["Eating food", "Looking at very tiny things 🔬", "Building houses", "Measuring temperature"], ans:1, fact:"Microscopes magnify tiny objects like bacteria and cells so we can study them!", img:"🔬✨🧫"},
        {q:"What is a farmer's most important tool?", opts:["A computer", "Knowledge and good farming tools 🚜", "A television", "A car"], ans:1, fact:"Farmers use knowledge, seeds, soil, water and tools to grow our food!", img:"🚜🌾👨‍🌾"},
        {q:"What does a GPS do on a farm?", opts:["Cooks food", "Tells the farmer exactly where they are on the field 🛰️", "Waters plants", "Predicts weather only"], ans:1, fact:"GPS satellites help farmers know exactly where to plant, water and harvest!", img:"🛰️📍🌾"},
        {q:"What is a drone used for on farms?", opts:["It is a toy only", "It flies over fields to check crop health 🛸", "It waters crops by hand", "It harvests crops manually"], ans:1, fact:"Farm drones photograph and survey crops — spotting problems early!", img:"🛸📷🌾"},
        {q:"What is a soil sensor?", opts:["A type of worm", "A device that measures moisture and nutrients in soil 📡", "A garden tool", "A type of seed"], ans:1, fact:"Soil sensors send real-time data to farmers — helping them water only when needed!", img:"📡🌱💧"},
      ],
      j1: [
        {q:"What is a microscope used for?", opts:["Eating food", "Looking at very tiny things 🔬", "Building houses", "Measuring temperature"], ans:1, fact:"Microscopes magnify tiny objects like bacteria and cells so we can study them!", img:"🔬✨🧫"},
        {q:"What is a farmer's most important tool?", opts:["A computer", "Knowledge and good farming tools 🚜", "A television", "A car"], ans:1, fact:"Farmers use knowledge, seeds, soil, water and tools to grow our food!", img:"🚜🌾👨‍🌾"},
        {q:"What does a GPS do on a farm?", opts:["Cooks food", "Tells the farmer exactly where they are on the field 🛰️", "Waters plants", "Predicts weather only"], ans:1, fact:"GPS satellites help farmers know exactly where to plant, water and harvest!", img:"🛰️📍🌾"},
        {q:"What is a drone used for on farms?", opts:["It is a toy only", "It flies over fields to check crop health 🛸", "It waters crops by hand", "It harvests crops manually"], ans:1, fact:"Farm drones photograph and survey crops — spotting problems early!", img:"🛸📷🌾"},
        {q:"What is a soil sensor?", opts:["A type of worm", "A device that measures moisture and nutrients in soil 📡", "A garden tool", "A type of seed"], ans:1, fact:"Soil sensors send real-time data to farmers — helping them water only when needed!", img:"📡🌱💧"},
      ],
      j2: [
        {q:"What is a microscope used for?", opts:["Eating food", "Looking at very tiny things 🔬", "Building houses", "Measuring temperature"], ans:1, fact:"Microscopes magnify tiny objects like bacteria and cells so we can study them!", img:"🔬✨🧫"},
        {q:"What is a farmer's most important tool?", opts:["A computer", "Knowledge and good farming tools 🚜", "A television", "A car"], ans:1, fact:"Farmers use knowledge, seeds, soil, water and tools to grow our food!", img:"🚜🌾👨‍🌾"},
        {q:"What does a GPS do on a farm?", opts:["Cooks food", "Tells the farmer exactly where they are on the field 🛰️", "Waters plants", "Predicts weather only"], ans:1, fact:"GPS satellites help farmers know exactly where to plant, water and harvest!", img:"🛰️📍🌾"},
        {q:"What is a drone used for on farms?", opts:["It is a toy only", "It flies over fields to check crop health 🛸", "It waters crops by hand", "It harvests crops manually"], ans:1, fact:"Farm drones photograph and survey crops — spotting problems early!", img:"🛸📷🌾"},
        {q:"What is a soil sensor?", opts:["A type of worm", "A device that measures moisture and nutrients in soil 📡", "A garden tool", "A type of seed"], ans:1, fact:"Soil sensors send real-time data to farmers — helping them water only when needed!", img:"📡🌱💧"},
      ],
      j3: [
        {q:"What is a microscope used for?", opts:["Eating food", "Looking at very tiny things 🔬", "Building houses", "Measuring temperature"], ans:1, fact:"Microscopes magnify tiny objects like bacteria and cells so we can study them!", img:"🔬✨🧫"},
        {q:"What is a farmer's most important tool?", opts:["A computer", "Knowledge and good farming tools 🚜", "A television", "A car"], ans:1, fact:"Farmers use knowledge, seeds, soil, water and tools to grow our food!", img:"🚜🌾👨‍🌾"},
        {q:"What does a GPS do on a farm?", opts:["Cooks food", "Tells the farmer exactly where they are on the field 🛰️", "Waters plants", "Predicts weather only"], ans:1, fact:"GPS satellites help farmers know exactly where to plant, water and harvest!", img:"🛰️📍🌾"},
        {q:"What is a drone used for on farms?", opts:["It is a toy only", "It flies over fields to check crop health 🛸", "It waters crops by hand", "It harvests crops manually"], ans:1, fact:"Farm drones photograph and survey crops — spotting problems early!", img:"🛸📷🌾"},
        {q:"What is a soil sensor?", opts:["A type of worm", "A device that measures moisture and nutrients in soil 📡", "A garden tool", "A type of seed"], ans:1, fact:"Soil sensors send real-time data to farmers — helping them water only when needed!", img:"📡🌱💧"},
      ],
      s1: [
        {q:"What is a microscope used for?", opts:["Eating food", "Looking at very tiny things 🔬", "Building houses", "Measuring temperature"], ans:1, fact:"Microscopes magnify tiny objects like bacteria and cells so we can study them!", img:"🔬✨🧫"},
        {q:"What is a farmer's most important tool?", opts:["A computer", "Knowledge and good farming tools 🚜", "A television", "A car"], ans:1, fact:"Farmers use knowledge, seeds, soil, water and tools to grow our food!", img:"🚜🌾👨‍🌾"},
        {q:"What does a GPS do on a farm?", opts:["Cooks food", "Tells the farmer exactly where they are on the field 🛰️", "Waters plants", "Predicts weather only"], ans:1, fact:"GPS satellites help farmers know exactly where to plant, water and harvest!", img:"🛰️📍🌾"},
        {q:"What is a drone used for on farms?", opts:["It is a toy only", "It flies over fields to check crop health 🛸", "It waters crops by hand", "It harvests crops manually"], ans:1, fact:"Farm drones photograph and survey crops — spotting problems early!", img:"🛸📷🌾"},
        {q:"What is a soil sensor?", opts:["A type of worm", "A device that measures moisture and nutrients in soil 📡", "A garden tool", "A type of seed"], ans:1, fact:"Soil sensors send real-time data to farmers — helping them water only when needed!", img:"📡🌱💧"},
      ],
      s2: [
        {q:"What is a microscope used for?", opts:["Eating food", "Looking at very tiny things 🔬", "Building houses", "Measuring temperature"], ans:1, fact:"Microscopes magnify tiny objects like bacteria and cells so we can study them!", img:"🔬✨🧫"},
        {q:"What is a farmer's most important tool?", opts:["A computer", "Knowledge and good farming tools 🚜", "A television", "A car"], ans:1, fact:"Farmers use knowledge, seeds, soil, water and tools to grow our food!", img:"🚜🌾👨‍🌾"},
        {q:"What does a GPS do on a farm?", opts:["Cooks food", "Tells the farmer exactly where they are on the field 🛰️", "Waters plants", "Predicts weather only"], ans:1, fact:"GPS satellites help farmers know exactly where to plant, water and harvest!", img:"🛰️📍🌾"},
        {q:"What is a drone used for on farms?", opts:["It is a toy only", "It flies over fields to check crop health 🛸", "It waters crops by hand", "It harvests crops manually"], ans:1, fact:"Farm drones photograph and survey crops — spotting problems early!", img:"🛸📷🌾"},
        {q:"What is a soil sensor?", opts:["A type of worm", "A device that measures moisture and nutrients in soil 📡", "A garden tool", "A type of seed"], ans:1, fact:"Soil sensors send real-time data to farmers — helping them water only when needed!", img:"📡🌱💧"},
      ],
      s3: [
        {q:"What is a microscope used for?", opts:["Eating food", "Looking at very tiny things 🔬", "Building houses", "Measuring temperature"], ans:1, fact:"Microscopes magnify tiny objects like bacteria and cells so we can study them!", img:"🔬✨🧫"},
        {q:"What is a farmer's most important tool?", opts:["A computer", "Knowledge and good farming tools 🚜", "A television", "A car"], ans:1, fact:"Farmers use knowledge, seeds, soil, water and tools to grow our food!", img:"🚜🌾👨‍🌾"},
        {q:"What does a GPS do on a farm?", opts:["Cooks food", "Tells the farmer exactly where they are on the field 🛰️", "Waters plants", "Predicts weather only"], ans:1, fact:"GPS satellites help farmers know exactly where to plant, water and harvest!", img:"🛰️📍🌾"},
        {q:"What is a drone used for on farms?", opts:["It is a toy only", "It flies over fields to check crop health 🛸", "It waters crops by hand", "It harvests crops manually"], ans:1, fact:"Farm drones photograph and survey crops — spotting problems early!", img:"🛸📷🌾"},
        {q:"What is a soil sensor?", opts:["A type of worm", "A device that measures moisture and nutrients in soil 📡", "A garden tool", "A type of seed"], ans:1, fact:"Soil sensors send real-time data to farmers — helping them water only when needed!", img:"📡🌱💧"},
      ],
  },
  animals: {
      n1: [
        {q:"Which animal helps farmers by eating pests?", opts:["Lion 🦁", "Ladybird 🐞", "Elephant 🐘", "Shark 🦈"], ans:1, fact:"Ladybirds eat aphids — tiny pests that damage crops — protecting the farm!", img:"🐞🌿✅"},
        {q:"What does a bee do for flowers?", opts:["It eats flowers", "It carries pollen between flowers helping them make fruit 🐝", "It digs in soil", "It eats other insects"], ans:1, fact:"Bees are the most important pollinators — without them we would have less food!", img:"🐝🌸🍎"},
        {q:"What do earthworms do for soil?", opts:["They eat plants", "They dig tunnels helping water and air enter the soil 🪱", "They make soil hard", "They eat other worms"], ans:1, fact:"Earthworms are nature's ploughs — their tunnels let roots grow and water drain!", img:"🪱🌱💚"},
        {q:"Which animal makes honey?", opts:["Ant 🐜", "Bee 🐝", "Butterfly 🦋", "Spider 🕷️"], ans:1, fact:"Bees collect nectar from flowers and transform it into delicious nutritious honey!", img:"🐝🍯🌸"},
        {q:"What is an animal's habitat?", opts:["Its food only", "The natural place where it lives and finds food and shelter 🌳", "Its family only", "Its colour"], ans:1, fact:"Every animal has a natural habitat it is perfectly adapted to live in!", img:"🌳🦁🌿"},
      ],
      n2: [
        {q:"Which animal helps farmers by eating pests?", opts:["Lion 🦁", "Ladybird 🐞", "Elephant 🐘", "Shark 🦈"], ans:1, fact:"Ladybirds eat aphids — tiny pests that damage crops — protecting the farm!", img:"🐞🌿✅"},
        {q:"What does a bee do for flowers?", opts:["It eats flowers", "It carries pollen between flowers helping them make fruit 🐝", "It digs in soil", "It eats other insects"], ans:1, fact:"Bees are the most important pollinators — without them we would have less food!", img:"🐝🌸🍎"},
        {q:"What do earthworms do for soil?", opts:["They eat plants", "They dig tunnels helping water and air enter the soil 🪱", "They make soil hard", "They eat other worms"], ans:1, fact:"Earthworms are nature's ploughs — their tunnels let roots grow and water drain!", img:"🪱🌱💚"},
        {q:"Which animal makes honey?", opts:["Ant 🐜", "Bee 🐝", "Butterfly 🦋", "Spider 🕷️"], ans:1, fact:"Bees collect nectar from flowers and transform it into delicious nutritious honey!", img:"🐝🍯🌸"},
        {q:"What is an animal's habitat?", opts:["Its food only", "The natural place where it lives and finds food and shelter 🌳", "Its family only", "Its colour"], ans:1, fact:"Every animal has a natural habitat it is perfectly adapted to live in!", img:"🌳🦁🌿"},
      ],
      p1: [
        {q:"Which animal helps farmers by eating pests?", opts:["Lion 🦁", "Ladybird 🐞", "Elephant 🐘", "Shark 🦈"], ans:1, fact:"Ladybirds eat aphids — tiny pests that damage crops — protecting the farm!", img:"🐞🌿✅"},
        {q:"What does a bee do for flowers?", opts:["It eats flowers", "It carries pollen between flowers helping them make fruit 🐝", "It digs in soil", "It eats other insects"], ans:1, fact:"Bees are the most important pollinators — without them we would have less food!", img:"🐝🌸🍎"},
        {q:"What do earthworms do for soil?", opts:["They eat plants", "They dig tunnels helping water and air enter the soil 🪱", "They make soil hard", "They eat other worms"], ans:1, fact:"Earthworms are nature's ploughs — their tunnels let roots grow and water drain!", img:"🪱🌱💚"},
        {q:"Which animal makes honey?", opts:["Ant 🐜", "Bee 🐝", "Butterfly 🦋", "Spider 🕷️"], ans:1, fact:"Bees collect nectar from flowers and transform it into delicious nutritious honey!", img:"🐝🍯🌸"},
        {q:"What is an animal's habitat?", opts:["Its food only", "The natural place where it lives and finds food and shelter 🌳", "Its family only", "Its colour"], ans:1, fact:"Every animal has a natural habitat it is perfectly adapted to live in!", img:"🌳🦁🌿"},
      ],
      p2: [
        {q:"Which animal helps farmers by eating pests?", opts:["Lion 🦁", "Ladybird 🐞", "Elephant 🐘", "Shark 🦈"], ans:1, fact:"Ladybirds eat aphids — tiny pests that damage crops — protecting the farm!", img:"🐞🌿✅"},
        {q:"What does a bee do for flowers?", opts:["It eats flowers", "It carries pollen between flowers helping them make fruit 🐝", "It digs in soil", "It eats other insects"], ans:1, fact:"Bees are the most important pollinators — without them we would have less food!", img:"🐝🌸🍎"},
        {q:"What do earthworms do for soil?", opts:["They eat plants", "They dig tunnels helping water and air enter the soil 🪱", "They make soil hard", "They eat other worms"], ans:1, fact:"Earthworms are nature's ploughs — their tunnels let roots grow and water drain!", img:"🪱🌱💚"},
        {q:"Which animal makes honey?", opts:["Ant 🐜", "Bee 🐝", "Butterfly 🦋", "Spider 🕷️"], ans:1, fact:"Bees collect nectar from flowers and transform it into delicious nutritious honey!", img:"🐝🍯🌸"},
        {q:"What is an animal's habitat?", opts:["Its food only", "The natural place where it lives and finds food and shelter 🌳", "Its family only", "Its colour"], ans:1, fact:"Every animal has a natural habitat it is perfectly adapted to live in!", img:"🌳🦁🌿"},
      ],
      p3: [
        {q:"Which animal helps farmers by eating pests?", opts:["Lion 🦁", "Ladybird 🐞", "Elephant 🐘", "Shark 🦈"], ans:1, fact:"Ladybirds eat aphids — tiny pests that damage crops — protecting the farm!", img:"🐞🌿✅"},
        {q:"What does a bee do for flowers?", opts:["It eats flowers", "It carries pollen between flowers helping them make fruit 🐝", "It digs in soil", "It eats other insects"], ans:1, fact:"Bees are the most important pollinators — without them we would have less food!", img:"🐝🌸🍎"},
        {q:"What do earthworms do for soil?", opts:["They eat plants", "They dig tunnels helping water and air enter the soil 🪱", "They make soil hard", "They eat other worms"], ans:1, fact:"Earthworms are nature's ploughs — their tunnels let roots grow and water drain!", img:"🪱🌱💚"},
        {q:"Which animal makes honey?", opts:["Ant 🐜", "Bee 🐝", "Butterfly 🦋", "Spider 🕷️"], ans:1, fact:"Bees collect nectar from flowers and transform it into delicious nutritious honey!", img:"🐝🍯🌸"},
        {q:"What is an animal's habitat?", opts:["Its food only", "The natural place where it lives and finds food and shelter 🌳", "Its family only", "Its colour"], ans:1, fact:"Every animal has a natural habitat it is perfectly adapted to live in!", img:"🌳🦁🌿"},
      ],
      p4: [
        {q:"Which animal helps farmers by eating pests?", opts:["Lion 🦁", "Ladybird 🐞", "Elephant 🐘", "Shark 🦈"], ans:1, fact:"Ladybirds eat aphids — tiny pests that damage crops — protecting the farm!", img:"🐞🌿✅"},
        {q:"What does a bee do for flowers?", opts:["It eats flowers", "It carries pollen between flowers helping them make fruit 🐝", "It digs in soil", "It eats other insects"], ans:1, fact:"Bees are the most important pollinators — without them we would have less food!", img:"🐝🌸🍎"},
        {q:"What do earthworms do for soil?", opts:["They eat plants", "They dig tunnels helping water and air enter the soil 🪱", "They make soil hard", "They eat other worms"], ans:1, fact:"Earthworms are nature's ploughs — their tunnels let roots grow and water drain!", img:"🪱🌱💚"},
        {q:"Which animal makes honey?", opts:["Ant 🐜", "Bee 🐝", "Butterfly 🦋", "Spider 🕷️"], ans:1, fact:"Bees collect nectar from flowers and transform it into delicious nutritious honey!", img:"🐝🍯🌸"},
        {q:"What is an animal's habitat?", opts:["Its food only", "The natural place where it lives and finds food and shelter 🌳", "Its family only", "Its colour"], ans:1, fact:"Every animal has a natural habitat it is perfectly adapted to live in!", img:"🌳🦁🌿"},
      ],
      p5: [
        {q:"Which animal helps farmers by eating pests?", opts:["Lion 🦁", "Ladybird 🐞", "Elephant 🐘", "Shark 🦈"], ans:1, fact:"Ladybirds eat aphids — tiny pests that damage crops — protecting the farm!", img:"🐞🌿✅"},
        {q:"What does a bee do for flowers?", opts:["It eats flowers", "It carries pollen between flowers helping them make fruit 🐝", "It digs in soil", "It eats other insects"], ans:1, fact:"Bees are the most important pollinators — without them we would have less food!", img:"🐝🌸🍎"},
        {q:"What do earthworms do for soil?", opts:["They eat plants", "They dig tunnels helping water and air enter the soil 🪱", "They make soil hard", "They eat other worms"], ans:1, fact:"Earthworms are nature's ploughs — their tunnels let roots grow and water drain!", img:"🪱🌱💚"},
        {q:"Which animal makes honey?", opts:["Ant 🐜", "Bee 🐝", "Butterfly 🦋", "Spider 🕷️"], ans:1, fact:"Bees collect nectar from flowers and transform it into delicious nutritious honey!", img:"🐝🍯🌸"},
        {q:"What is an animal's habitat?", opts:["Its food only", "The natural place where it lives and finds food and shelter 🌳", "Its family only", "Its colour"], ans:1, fact:"Every animal has a natural habitat it is perfectly adapted to live in!", img:"🌳🦁🌿"},
      ],
      p6: [
        {q:"Which animal helps farmers by eating pests?", opts:["Lion 🦁", "Ladybird 🐞", "Elephant 🐘", "Shark 🦈"], ans:1, fact:"Ladybirds eat aphids — tiny pests that damage crops — protecting the farm!", img:"🐞🌿✅"},
        {q:"What does a bee do for flowers?", opts:["It eats flowers", "It carries pollen between flowers helping them make fruit 🐝", "It digs in soil", "It eats other insects"], ans:1, fact:"Bees are the most important pollinators — without them we would have less food!", img:"🐝🌸🍎"},
        {q:"What do earthworms do for soil?", opts:["They eat plants", "They dig tunnels helping water and air enter the soil 🪱", "They make soil hard", "They eat other worms"], ans:1, fact:"Earthworms are nature's ploughs — their tunnels let roots grow and water drain!", img:"🪱🌱💚"},
        {q:"Which animal makes honey?", opts:["Ant 🐜", "Bee 🐝", "Butterfly 🦋", "Spider 🕷️"], ans:1, fact:"Bees collect nectar from flowers and transform it into delicious nutritious honey!", img:"🐝🍯🌸"},
        {q:"What is an animal's habitat?", opts:["Its food only", "The natural place where it lives and finds food and shelter 🌳", "Its family only", "Its colour"], ans:1, fact:"Every animal has a natural habitat it is perfectly adapted to live in!", img:"🌳🦁🌿"},
      ],
      j1: [
        {q:"Which animal helps farmers by eating pests?", opts:["Lion 🦁", "Ladybird 🐞", "Elephant 🐘", "Shark 🦈"], ans:1, fact:"Ladybirds eat aphids — tiny pests that damage crops — protecting the farm!", img:"🐞🌿✅"},
        {q:"What does a bee do for flowers?", opts:["It eats flowers", "It carries pollen between flowers helping them make fruit 🐝", "It digs in soil", "It eats other insects"], ans:1, fact:"Bees are the most important pollinators — without them we would have less food!", img:"🐝🌸🍎"},
        {q:"What do earthworms do for soil?", opts:["They eat plants", "They dig tunnels helping water and air enter the soil 🪱", "They make soil hard", "They eat other worms"], ans:1, fact:"Earthworms are nature's ploughs — their tunnels let roots grow and water drain!", img:"🪱🌱💚"},
        {q:"Which animal makes honey?", opts:["Ant 🐜", "Bee 🐝", "Butterfly 🦋", "Spider 🕷️"], ans:1, fact:"Bees collect nectar from flowers and transform it into delicious nutritious honey!", img:"🐝🍯🌸"},
        {q:"What is an animal's habitat?", opts:["Its food only", "The natural place where it lives and finds food and shelter 🌳", "Its family only", "Its colour"], ans:1, fact:"Every animal has a natural habitat it is perfectly adapted to live in!", img:"🌳🦁🌿"},
      ],
      j2: [
        {q:"Which animal helps farmers by eating pests?", opts:["Lion 🦁", "Ladybird 🐞", "Elephant 🐘", "Shark 🦈"], ans:1, fact:"Ladybirds eat aphids — tiny pests that damage crops — protecting the farm!", img:"🐞🌿✅"},
        {q:"What does a bee do for flowers?", opts:["It eats flowers", "It carries pollen between flowers helping them make fruit 🐝", "It digs in soil", "It eats other insects"], ans:1, fact:"Bees are the most important pollinators — without them we would have less food!", img:"🐝🌸🍎"},
        {q:"What do earthworms do for soil?", opts:["They eat plants", "They dig tunnels helping water and air enter the soil 🪱", "They make soil hard", "They eat other worms"], ans:1, fact:"Earthworms are nature's ploughs — their tunnels let roots grow and water drain!", img:"🪱🌱💚"},
        {q:"Which animal makes honey?", opts:["Ant 🐜", "Bee 🐝", "Butterfly 🦋", "Spider 🕷️"], ans:1, fact:"Bees collect nectar from flowers and transform it into delicious nutritious honey!", img:"🐝🍯🌸"},
        {q:"What is an animal's habitat?", opts:["Its food only", "The natural place where it lives and finds food and shelter 🌳", "Its family only", "Its colour"], ans:1, fact:"Every animal has a natural habitat it is perfectly adapted to live in!", img:"🌳🦁🌿"},
      ],
      j3: [
        {q:"Which animal helps farmers by eating pests?", opts:["Lion 🦁", "Ladybird 🐞", "Elephant 🐘", "Shark 🦈"], ans:1, fact:"Ladybirds eat aphids — tiny pests that damage crops — protecting the farm!", img:"🐞🌿✅"},
        {q:"What does a bee do for flowers?", opts:["It eats flowers", "It carries pollen between flowers helping them make fruit 🐝", "It digs in soil", "It eats other insects"], ans:1, fact:"Bees are the most important pollinators — without them we would have less food!", img:"🐝🌸🍎"},
        {q:"What do earthworms do for soil?", opts:["They eat plants", "They dig tunnels helping water and air enter the soil 🪱", "They make soil hard", "They eat other worms"], ans:1, fact:"Earthworms are nature's ploughs — their tunnels let roots grow and water drain!", img:"🪱🌱💚"},
        {q:"Which animal makes honey?", opts:["Ant 🐜", "Bee 🐝", "Butterfly 🦋", "Spider 🕷️"], ans:1, fact:"Bees collect nectar from flowers and transform it into delicious nutritious honey!", img:"🐝🍯🌸"},
        {q:"What is an animal's habitat?", opts:["Its food only", "The natural place where it lives and finds food and shelter 🌳", "Its family only", "Its colour"], ans:1, fact:"Every animal has a natural habitat it is perfectly adapted to live in!", img:"🌳🦁🌿"},
      ],
      s1: [
        {q:"Which animal helps farmers by eating pests?", opts:["Lion 🦁", "Ladybird 🐞", "Elephant 🐘", "Shark 🦈"], ans:1, fact:"Ladybirds eat aphids — tiny pests that damage crops — protecting the farm!", img:"🐞🌿✅"},
        {q:"What does a bee do for flowers?", opts:["It eats flowers", "It carries pollen between flowers helping them make fruit 🐝", "It digs in soil", "It eats other insects"], ans:1, fact:"Bees are the most important pollinators — without them we would have less food!", img:"🐝🌸🍎"},
        {q:"What do earthworms do for soil?", opts:["They eat plants", "They dig tunnels helping water and air enter the soil 🪱", "They make soil hard", "They eat other worms"], ans:1, fact:"Earthworms are nature's ploughs — their tunnels let roots grow and water drain!", img:"🪱🌱💚"},
        {q:"Which animal makes honey?", opts:["Ant 🐜", "Bee 🐝", "Butterfly 🦋", "Spider 🕷️"], ans:1, fact:"Bees collect nectar from flowers and transform it into delicious nutritious honey!", img:"🐝🍯🌸"},
        {q:"What is an animal's habitat?", opts:["Its food only", "The natural place where it lives and finds food and shelter 🌳", "Its family only", "Its colour"], ans:1, fact:"Every animal has a natural habitat it is perfectly adapted to live in!", img:"🌳🦁🌿"},
      ],
      s2: [
        {q:"Which animal helps farmers by eating pests?", opts:["Lion 🦁", "Ladybird 🐞", "Elephant 🐘", "Shark 🦈"], ans:1, fact:"Ladybirds eat aphids — tiny pests that damage crops — protecting the farm!", img:"🐞🌿✅"},
        {q:"What does a bee do for flowers?", opts:["It eats flowers", "It carries pollen between flowers helping them make fruit 🐝", "It digs in soil", "It eats other insects"], ans:1, fact:"Bees are the most important pollinators — without them we would have less food!", img:"🐝🌸🍎"},
        {q:"What do earthworms do for soil?", opts:["They eat plants", "They dig tunnels helping water and air enter the soil 🪱", "They make soil hard", "They eat other worms"], ans:1, fact:"Earthworms are nature's ploughs — their tunnels let roots grow and water drain!", img:"🪱🌱💚"},
        {q:"Which animal makes honey?", opts:["Ant 🐜", "Bee 🐝", "Butterfly 🦋", "Spider 🕷️"], ans:1, fact:"Bees collect nectar from flowers and transform it into delicious nutritious honey!", img:"🐝🍯🌸"},
        {q:"What is an animal's habitat?", opts:["Its food only", "The natural place where it lives and finds food and shelter 🌳", "Its family only", "Its colour"], ans:1, fact:"Every animal has a natural habitat it is perfectly adapted to live in!", img:"🌳🦁🌿"},
      ],
      s3: [
        {q:"Which animal helps farmers by eating pests?", opts:["Lion 🦁", "Ladybird 🐞", "Elephant 🐘", "Shark 🦈"], ans:1, fact:"Ladybirds eat aphids — tiny pests that damage crops — protecting the farm!", img:"🐞🌿✅"},
        {q:"What does a bee do for flowers?", opts:["It eats flowers", "It carries pollen between flowers helping them make fruit 🐝", "It digs in soil", "It eats other insects"], ans:1, fact:"Bees are the most important pollinators — without them we would have less food!", img:"🐝🌸🍎"},
        {q:"What do earthworms do for soil?", opts:["They eat plants", "They dig tunnels helping water and air enter the soil 🪱", "They make soil hard", "They eat other worms"], ans:1, fact:"Earthworms are nature's ploughs — their tunnels let roots grow and water drain!", img:"🪱🌱💚"},
        {q:"Which animal makes honey?", opts:["Ant 🐜", "Bee 🐝", "Butterfly 🦋", "Spider 🕷️"], ans:1, fact:"Bees collect nectar from flowers and transform it into delicious nutritious honey!", img:"🐝🍯🌸"},
        {q:"What is an animal's habitat?", opts:["Its food only", "The natural place where it lives and finds food and shelter 🌳", "Its family only", "Its colour"], ans:1, fact:"Every animal has a natural habitat it is perfectly adapted to live in!", img:"🌳🦁🌿"},
      ],
  },
  soil: {
      n1: [
        {q:"What colour is healthy fertile soil?", opts:["Bright yellow", "Very pale grey", "Dark brown or black 🟤", "Bright white"], ans:2, fact:"Dark soil is full of organic matter and nutrients — perfect for growing food!", img:"🟤🌱✅"},
        {q:"What lives in healthy soil?", opts:["Nothing at all", "Worms, bacteria and many tiny creatures 🪱", "Only rocks", "Only sand"], ans:1, fact:"Healthy soil is teeming with life — billions of microbes and earthworms!", img:"🪱🌱🔬"},
        {q:"What is compost made from?", opts:["Plastic and metal", "Food scraps and plant material that has decomposed 🌿", "Sand and rocks", "Chemical powder"], ans:1, fact:"Compost is made from organic waste — it enriches soil and helps plants grow!", img:"🌿🍂🪱"},
        {q:"Why is soil important?", opts:["It looks nice", "Plants grow in soil which gives us all our food 🌱", "Only for making bricks", "Only for roads"], ans:1, fact:"Soil is the foundation of all food production — without soil we cannot eat!", img:"🌱🌾🌍"},
        {q:"What damages soil?", opts:["Rain", "Cutting all trees and over-farming 🏜️", "Growing vegetables", "Compost"], ans:1, fact:"Deforestation and overfarming destroy soil — it takes 500 years to form 1cm of topsoil!", img:"🏜️❌🌾😟"},
      ],
      n2: [
        {q:"What colour is healthy fertile soil?", opts:["Bright yellow", "Very pale grey", "Dark brown or black 🟤", "Bright white"], ans:2, fact:"Dark soil is full of organic matter and nutrients — perfect for growing food!", img:"🟤🌱✅"},
        {q:"What lives in healthy soil?", opts:["Nothing at all", "Worms, bacteria and many tiny creatures 🪱", "Only rocks", "Only sand"], ans:1, fact:"Healthy soil is teeming with life — billions of microbes and earthworms!", img:"🪱🌱🔬"},
        {q:"What is compost made from?", opts:["Plastic and metal", "Food scraps and plant material that has decomposed 🌿", "Sand and rocks", "Chemical powder"], ans:1, fact:"Compost is made from organic waste — it enriches soil and helps plants grow!", img:"🌿🍂🪱"},
        {q:"Why is soil important?", opts:["It looks nice", "Plants grow in soil which gives us all our food 🌱", "Only for making bricks", "Only for roads"], ans:1, fact:"Soil is the foundation of all food production — without soil we cannot eat!", img:"🌱🌾🌍"},
        {q:"What damages soil?", opts:["Rain", "Cutting all trees and over-farming 🏜️", "Growing vegetables", "Compost"], ans:1, fact:"Deforestation and overfarming destroy soil — it takes 500 years to form 1cm of topsoil!", img:"🏜️❌🌾😟"},
      ],
      p1: [
        {q:"What colour is healthy fertile soil?", opts:["Bright yellow", "Very pale grey", "Dark brown or black 🟤", "Bright white"], ans:2, fact:"Dark soil is full of organic matter and nutrients — perfect for growing food!", img:"🟤🌱✅"},
        {q:"What lives in healthy soil?", opts:["Nothing at all", "Worms, bacteria and many tiny creatures 🪱", "Only rocks", "Only sand"], ans:1, fact:"Healthy soil is teeming with life — billions of microbes and earthworms!", img:"🪱🌱🔬"},
        {q:"What is compost made from?", opts:["Plastic and metal", "Food scraps and plant material that has decomposed 🌿", "Sand and rocks", "Chemical powder"], ans:1, fact:"Compost is made from organic waste — it enriches soil and helps plants grow!", img:"🌿🍂🪱"},
        {q:"Why is soil important?", opts:["It looks nice", "Plants grow in soil which gives us all our food 🌱", "Only for making bricks", "Only for roads"], ans:1, fact:"Soil is the foundation of all food production — without soil we cannot eat!", img:"🌱🌾🌍"},
        {q:"What damages soil?", opts:["Rain", "Cutting all trees and over-farming 🏜️", "Growing vegetables", "Compost"], ans:1, fact:"Deforestation and overfarming destroy soil — it takes 500 years to form 1cm of topsoil!", img:"🏜️❌🌾😟"},
      ],
      p2: [
        {q:"What colour is healthy fertile soil?", opts:["Bright yellow", "Very pale grey", "Dark brown or black 🟤", "Bright white"], ans:2, fact:"Dark soil is full of organic matter and nutrients — perfect for growing food!", img:"🟤🌱✅"},
        {q:"What lives in healthy soil?", opts:["Nothing at all", "Worms, bacteria and many tiny creatures 🪱", "Only rocks", "Only sand"], ans:1, fact:"Healthy soil is teeming with life — billions of microbes and earthworms!", img:"🪱🌱🔬"},
        {q:"What is compost made from?", opts:["Plastic and metal", "Food scraps and plant material that has decomposed 🌿", "Sand and rocks", "Chemical powder"], ans:1, fact:"Compost is made from organic waste — it enriches soil and helps plants grow!", img:"🌿🍂🪱"},
        {q:"Why is soil important?", opts:["It looks nice", "Plants grow in soil which gives us all our food 🌱", "Only for making bricks", "Only for roads"], ans:1, fact:"Soil is the foundation of all food production — without soil we cannot eat!", img:"🌱🌾🌍"},
        {q:"What damages soil?", opts:["Rain", "Cutting all trees and over-farming 🏜️", "Growing vegetables", "Compost"], ans:1, fact:"Deforestation and overfarming destroy soil — it takes 500 years to form 1cm of topsoil!", img:"🏜️❌🌾😟"},
      ],
      p3: [
        {q:"What colour is healthy fertile soil?", opts:["Bright yellow", "Very pale grey", "Dark brown or black 🟤", "Bright white"], ans:2, fact:"Dark soil is full of organic matter and nutrients — perfect for growing food!", img:"🟤🌱✅"},
        {q:"What lives in healthy soil?", opts:["Nothing at all", "Worms, bacteria and many tiny creatures 🪱", "Only rocks", "Only sand"], ans:1, fact:"Healthy soil is teeming with life — billions of microbes and earthworms!", img:"🪱🌱🔬"},
        {q:"What is compost made from?", opts:["Plastic and metal", "Food scraps and plant material that has decomposed 🌿", "Sand and rocks", "Chemical powder"], ans:1, fact:"Compost is made from organic waste — it enriches soil and helps plants grow!", img:"🌿🍂🪱"},
        {q:"Why is soil important?", opts:["It looks nice", "Plants grow in soil which gives us all our food 🌱", "Only for making bricks", "Only for roads"], ans:1, fact:"Soil is the foundation of all food production — without soil we cannot eat!", img:"🌱🌾🌍"},
        {q:"What damages soil?", opts:["Rain", "Cutting all trees and over-farming 🏜️", "Growing vegetables", "Compost"], ans:1, fact:"Deforestation and overfarming destroy soil — it takes 500 years to form 1cm of topsoil!", img:"🏜️❌🌾😟"},
      ],
      p4: [
        {q:"What colour is healthy fertile soil?", opts:["Bright yellow", "Very pale grey", "Dark brown or black 🟤", "Bright white"], ans:2, fact:"Dark soil is full of organic matter and nutrients — perfect for growing food!", img:"🟤🌱✅"},
        {q:"What lives in healthy soil?", opts:["Nothing at all", "Worms, bacteria and many tiny creatures 🪱", "Only rocks", "Only sand"], ans:1, fact:"Healthy soil is teeming with life — billions of microbes and earthworms!", img:"🪱🌱🔬"},
        {q:"What is compost made from?", opts:["Plastic and metal", "Food scraps and plant material that has decomposed 🌿", "Sand and rocks", "Chemical powder"], ans:1, fact:"Compost is made from organic waste — it enriches soil and helps plants grow!", img:"🌿🍂🪱"},
        {q:"Why is soil important?", opts:["It looks nice", "Plants grow in soil which gives us all our food 🌱", "Only for making bricks", "Only for roads"], ans:1, fact:"Soil is the foundation of all food production — without soil we cannot eat!", img:"🌱🌾🌍"},
        {q:"What damages soil?", opts:["Rain", "Cutting all trees and over-farming 🏜️", "Growing vegetables", "Compost"], ans:1, fact:"Deforestation and overfarming destroy soil — it takes 500 years to form 1cm of topsoil!", img:"🏜️❌🌾😟"},
      ],
      p5: [
        {q:"What colour is healthy fertile soil?", opts:["Bright yellow", "Very pale grey", "Dark brown or black 🟤", "Bright white"], ans:2, fact:"Dark soil is full of organic matter and nutrients — perfect for growing food!", img:"🟤🌱✅"},
        {q:"What lives in healthy soil?", opts:["Nothing at all", "Worms, bacteria and many tiny creatures 🪱", "Only rocks", "Only sand"], ans:1, fact:"Healthy soil is teeming with life — billions of microbes and earthworms!", img:"🪱🌱🔬"},
        {q:"What is compost made from?", opts:["Plastic and metal", "Food scraps and plant material that has decomposed 🌿", "Sand and rocks", "Chemical powder"], ans:1, fact:"Compost is made from organic waste — it enriches soil and helps plants grow!", img:"🌿🍂🪱"},
        {q:"Why is soil important?", opts:["It looks nice", "Plants grow in soil which gives us all our food 🌱", "Only for making bricks", "Only for roads"], ans:1, fact:"Soil is the foundation of all food production — without soil we cannot eat!", img:"🌱🌾🌍"},
        {q:"What damages soil?", opts:["Rain", "Cutting all trees and over-farming 🏜️", "Growing vegetables", "Compost"], ans:1, fact:"Deforestation and overfarming destroy soil — it takes 500 years to form 1cm of topsoil!", img:"🏜️❌🌾😟"},
      ],
      p6: [
        {q:"What colour is healthy fertile soil?", opts:["Bright yellow", "Very pale grey", "Dark brown or black 🟤", "Bright white"], ans:2, fact:"Dark soil is full of organic matter and nutrients — perfect for growing food!", img:"🟤🌱✅"},
        {q:"What lives in healthy soil?", opts:["Nothing at all", "Worms, bacteria and many tiny creatures 🪱", "Only rocks", "Only sand"], ans:1, fact:"Healthy soil is teeming with life — billions of microbes and earthworms!", img:"🪱🌱🔬"},
        {q:"What is compost made from?", opts:["Plastic and metal", "Food scraps and plant material that has decomposed 🌿", "Sand and rocks", "Chemical powder"], ans:1, fact:"Compost is made from organic waste — it enriches soil and helps plants grow!", img:"🌿🍂🪱"},
        {q:"Why is soil important?", opts:["It looks nice", "Plants grow in soil which gives us all our food 🌱", "Only for making bricks", "Only for roads"], ans:1, fact:"Soil is the foundation of all food production — without soil we cannot eat!", img:"🌱🌾🌍"},
        {q:"What damages soil?", opts:["Rain", "Cutting all trees and over-farming 🏜️", "Growing vegetables", "Compost"], ans:1, fact:"Deforestation and overfarming destroy soil — it takes 500 years to form 1cm of topsoil!", img:"🏜️❌🌾😟"},
      ],
      j1: [
        {q:"What colour is healthy fertile soil?", opts:["Bright yellow", "Very pale grey", "Dark brown or black 🟤", "Bright white"], ans:2, fact:"Dark soil is full of organic matter and nutrients — perfect for growing food!", img:"🟤🌱✅"},
        {q:"What lives in healthy soil?", opts:["Nothing at all", "Worms, bacteria and many tiny creatures 🪱", "Only rocks", "Only sand"], ans:1, fact:"Healthy soil is teeming with life — billions of microbes and earthworms!", img:"🪱🌱🔬"},
        {q:"What is compost made from?", opts:["Plastic and metal", "Food scraps and plant material that has decomposed 🌿", "Sand and rocks", "Chemical powder"], ans:1, fact:"Compost is made from organic waste — it enriches soil and helps plants grow!", img:"🌿🍂🪱"},
        {q:"Why is soil important?", opts:["It looks nice", "Plants grow in soil which gives us all our food 🌱", "Only for making bricks", "Only for roads"], ans:1, fact:"Soil is the foundation of all food production — without soil we cannot eat!", img:"🌱🌾🌍"},
        {q:"What damages soil?", opts:["Rain", "Cutting all trees and over-farming 🏜️", "Growing vegetables", "Compost"], ans:1, fact:"Deforestation and overfarming destroy soil — it takes 500 years to form 1cm of topsoil!", img:"🏜️❌🌾😟"},
      ],
      j2: [
        {q:"What colour is healthy fertile soil?", opts:["Bright yellow", "Very pale grey", "Dark brown or black 🟤", "Bright white"], ans:2, fact:"Dark soil is full of organic matter and nutrients — perfect for growing food!", img:"🟤🌱✅"},
        {q:"What lives in healthy soil?", opts:["Nothing at all", "Worms, bacteria and many tiny creatures 🪱", "Only rocks", "Only sand"], ans:1, fact:"Healthy soil is teeming with life — billions of microbes and earthworms!", img:"🪱🌱🔬"},
        {q:"What is compost made from?", opts:["Plastic and metal", "Food scraps and plant material that has decomposed 🌿", "Sand and rocks", "Chemical powder"], ans:1, fact:"Compost is made from organic waste — it enriches soil and helps plants grow!", img:"🌿🍂🪱"},
        {q:"Why is soil important?", opts:["It looks nice", "Plants grow in soil which gives us all our food 🌱", "Only for making bricks", "Only for roads"], ans:1, fact:"Soil is the foundation of all food production — without soil we cannot eat!", img:"🌱🌾🌍"},
        {q:"What damages soil?", opts:["Rain", "Cutting all trees and over-farming 🏜️", "Growing vegetables", "Compost"], ans:1, fact:"Deforestation and overfarming destroy soil — it takes 500 years to form 1cm of topsoil!", img:"🏜️❌🌾😟"},
      ],
      j3: [
        {q:"What colour is healthy fertile soil?", opts:["Bright yellow", "Very pale grey", "Dark brown or black 🟤", "Bright white"], ans:2, fact:"Dark soil is full of organic matter and nutrients — perfect for growing food!", img:"🟤🌱✅"},
        {q:"What lives in healthy soil?", opts:["Nothing at all", "Worms, bacteria and many tiny creatures 🪱", "Only rocks", "Only sand"], ans:1, fact:"Healthy soil is teeming with life — billions of microbes and earthworms!", img:"🪱🌱🔬"},
        {q:"What is compost made from?", opts:["Plastic and metal", "Food scraps and plant material that has decomposed 🌿", "Sand and rocks", "Chemical powder"], ans:1, fact:"Compost is made from organic waste — it enriches soil and helps plants grow!", img:"🌿🍂🪱"},
        {q:"Why is soil important?", opts:["It looks nice", "Plants grow in soil which gives us all our food 🌱", "Only for making bricks", "Only for roads"], ans:1, fact:"Soil is the foundation of all food production — without soil we cannot eat!", img:"🌱🌾🌍"},
        {q:"What damages soil?", opts:["Rain", "Cutting all trees and over-farming 🏜️", "Growing vegetables", "Compost"], ans:1, fact:"Deforestation and overfarming destroy soil — it takes 500 years to form 1cm of topsoil!", img:"🏜️❌🌾😟"},
      ],
      s1: [
        {q:"What colour is healthy fertile soil?", opts:["Bright yellow", "Very pale grey", "Dark brown or black 🟤", "Bright white"], ans:2, fact:"Dark soil is full of organic matter and nutrients — perfect for growing food!", img:"🟤🌱✅"},
        {q:"What lives in healthy soil?", opts:["Nothing at all", "Worms, bacteria and many tiny creatures 🪱", "Only rocks", "Only sand"], ans:1, fact:"Healthy soil is teeming with life — billions of microbes and earthworms!", img:"🪱🌱🔬"},
        {q:"What is compost made from?", opts:["Plastic and metal", "Food scraps and plant material that has decomposed 🌿", "Sand and rocks", "Chemical powder"], ans:1, fact:"Compost is made from organic waste — it enriches soil and helps plants grow!", img:"🌿🍂🪱"},
        {q:"Why is soil important?", opts:["It looks nice", "Plants grow in soil which gives us all our food 🌱", "Only for making bricks", "Only for roads"], ans:1, fact:"Soil is the foundation of all food production — without soil we cannot eat!", img:"🌱🌾🌍"},
        {q:"What damages soil?", opts:["Rain", "Cutting all trees and over-farming 🏜️", "Growing vegetables", "Compost"], ans:1, fact:"Deforestation and overfarming destroy soil — it takes 500 years to form 1cm of topsoil!", img:"🏜️❌🌾😟"},
      ],
      s2: [
        {q:"What colour is healthy fertile soil?", opts:["Bright yellow", "Very pale grey", "Dark brown or black 🟤", "Bright white"], ans:2, fact:"Dark soil is full of organic matter and nutrients — perfect for growing food!", img:"🟤🌱✅"},
        {q:"What lives in healthy soil?", opts:["Nothing at all", "Worms, bacteria and many tiny creatures 🪱", "Only rocks", "Only sand"], ans:1, fact:"Healthy soil is teeming with life — billions of microbes and earthworms!", img:"🪱🌱🔬"},
        {q:"What is compost made from?", opts:["Plastic and metal", "Food scraps and plant material that has decomposed 🌿", "Sand and rocks", "Chemical powder"], ans:1, fact:"Compost is made from organic waste — it enriches soil and helps plants grow!", img:"🌿🍂🪱"},
        {q:"Why is soil important?", opts:["It looks nice", "Plants grow in soil which gives us all our food 🌱", "Only for making bricks", "Only for roads"], ans:1, fact:"Soil is the foundation of all food production — without soil we cannot eat!", img:"🌱🌾🌍"},
        {q:"What damages soil?", opts:["Rain", "Cutting all trees and over-farming 🏜️", "Growing vegetables", "Compost"], ans:1, fact:"Deforestation and overfarming destroy soil — it takes 500 years to form 1cm of topsoil!", img:"🏜️❌🌾😟"},
      ],
      s3: [
        {q:"What colour is healthy fertile soil?", opts:["Bright yellow", "Very pale grey", "Dark brown or black 🟤", "Bright white"], ans:2, fact:"Dark soil is full of organic matter and nutrients — perfect for growing food!", img:"🟤🌱✅"},
        {q:"What lives in healthy soil?", opts:["Nothing at all", "Worms, bacteria and many tiny creatures 🪱", "Only rocks", "Only sand"], ans:1, fact:"Healthy soil is teeming with life — billions of microbes and earthworms!", img:"🪱🌱🔬"},
        {q:"What is compost made from?", opts:["Plastic and metal", "Food scraps and plant material that has decomposed 🌿", "Sand and rocks", "Chemical powder"], ans:1, fact:"Compost is made from organic waste — it enriches soil and helps plants grow!", img:"🌿🍂🪱"},
        {q:"Why is soil important?", opts:["It looks nice", "Plants grow in soil which gives us all our food 🌱", "Only for making bricks", "Only for roads"], ans:1, fact:"Soil is the foundation of all food production — without soil we cannot eat!", img:"🌱🌾🌍"},
        {q:"What damages soil?", opts:["Rain", "Cutting all trees and over-farming 🏜️", "Growing vegetables", "Compost"], ans:1, fact:"Deforestation and overfarming destroy soil — it takes 500 years to form 1cm of topsoil!", img:"🏜️❌🌾😟"},
      ],
  },
  french: {
      n1: [
        {q:"Comment dit-on 'apple' en français?", opts:["Banane 🍌", "Pomme 🍎", "Orange 🍊", "Mangue 🥭"], ans:1, fact:"Une pomme is an apple in French — la pomme est rouge et delicieuse!", img:"🍎🇫🇷✨"},
        {q:"Comment dit-on 'water' en français?", opts:["Le feu", "L'air", "L'eau 💧", "La terre"], ans:2, fact:"L'eau is water in French — nous avons besoin d'eau pour vivre!", img:"💧🇫🇷🌊"},
        {q:"Comment dit-on 'tree' en français?", opts:["Une fleur 🌸", "Un arbre 🌳", "Une feuille 🍃", "Une graine 🫘"], ans:1, fact:"Un arbre is a tree in French — les arbres produisent de l'oxygène!", img:"🌳🇫🇷💚"},
        {q:"Comment dit-on 'sun' en français?", opts:["La lune 🌙", "La pluie 🌧️", "Le soleil ☀️", "Le vent 💨"], ans:2, fact:"Le soleil is the sun in French — le soleil nous donne de la chaleur!", img:"☀️🇫🇷💛"},
        {q:"Comment dit-on 'flower' en français?", opts:["La feuille 🍃", "La fleur 🌸", "La graine 🫘", "La racine 🌿"], ans:1, fact:"Une fleur is a flower in French — les fleurs sont belles et colorées!", img:"🌸🇫🇷🌺"},
      ],
      n2: [
        {q:"Comment dit-on 'apple' en français?", opts:["Banane 🍌", "Pomme 🍎", "Orange 🍊", "Mangue 🥭"], ans:1, fact:"Une pomme is an apple in French — la pomme est rouge et delicieuse!", img:"🍎🇫🇷✨"},
        {q:"Comment dit-on 'water' en français?", opts:["Le feu", "L'air", "L'eau 💧", "La terre"], ans:2, fact:"L'eau is water in French — nous avons besoin d'eau pour vivre!", img:"💧🇫🇷🌊"},
        {q:"Comment dit-on 'tree' en français?", opts:["Une fleur 🌸", "Un arbre 🌳", "Une feuille 🍃", "Une graine 🫘"], ans:1, fact:"Un arbre is a tree in French — les arbres produisent de l'oxygène!", img:"🌳🇫🇷💚"},
        {q:"Comment dit-on 'sun' en français?", opts:["La lune 🌙", "La pluie 🌧️", "Le soleil ☀️", "Le vent 💨"], ans:2, fact:"Le soleil is the sun in French — le soleil nous donne de la chaleur!", img:"☀️🇫🇷💛"},
        {q:"Comment dit-on 'flower' en français?", opts:["La feuille 🍃", "La fleur 🌸", "La graine 🫘", "La racine 🌿"], ans:1, fact:"Une fleur is a flower in French — les fleurs sont belles et colorées!", img:"🌸🇫🇷🌺"},
      ],
      p1: [
        {q:"Comment dit-on 'apple' en français?", opts:["Banane 🍌", "Pomme 🍎", "Orange 🍊", "Mangue 🥭"], ans:1, fact:"Une pomme is an apple in French — la pomme est rouge et delicieuse!", img:"🍎🇫🇷✨"},
        {q:"Comment dit-on 'water' en français?", opts:["Le feu", "L'air", "L'eau 💧", "La terre"], ans:2, fact:"L'eau is water in French — nous avons besoin d'eau pour vivre!", img:"💧🇫🇷🌊"},
        {q:"Comment dit-on 'tree' en français?", opts:["Une fleur 🌸", "Un arbre 🌳", "Une feuille 🍃", "Une graine 🫘"], ans:1, fact:"Un arbre is a tree in French — les arbres produisent de l'oxygène!", img:"🌳🇫🇷💚"},
        {q:"Comment dit-on 'sun' en français?", opts:["La lune 🌙", "La pluie 🌧️", "Le soleil ☀️", "Le vent 💨"], ans:2, fact:"Le soleil is the sun in French — le soleil nous donne de la chaleur!", img:"☀️🇫🇷💛"},
        {q:"Comment dit-on 'flower' en français?", opts:["La feuille 🍃", "La fleur 🌸", "La graine 🫘", "La racine 🌿"], ans:1, fact:"Une fleur is a flower in French — les fleurs sont belles et colorées!", img:"🌸🇫🇷🌺"},
      ],
      p2: [
        {q:"Comment dit-on 'apple' en français?", opts:["Banane 🍌", "Pomme 🍎", "Orange 🍊", "Mangue 🥭"], ans:1, fact:"Une pomme is an apple in French — la pomme est rouge et delicieuse!", img:"🍎🇫🇷✨"},
        {q:"Comment dit-on 'water' en français?", opts:["Le feu", "L'air", "L'eau 💧", "La terre"], ans:2, fact:"L'eau is water in French — nous avons besoin d'eau pour vivre!", img:"💧🇫🇷🌊"},
        {q:"Comment dit-on 'tree' en français?", opts:["Une fleur 🌸", "Un arbre 🌳", "Une feuille 🍃", "Une graine 🫘"], ans:1, fact:"Un arbre is a tree in French — les arbres produisent de l'oxygène!", img:"🌳🇫🇷💚"},
        {q:"Comment dit-on 'sun' en français?", opts:["La lune 🌙", "La pluie 🌧️", "Le soleil ☀️", "Le vent 💨"], ans:2, fact:"Le soleil is the sun in French — le soleil nous donne de la chaleur!", img:"☀️🇫🇷💛"},
        {q:"Comment dit-on 'flower' en français?", opts:["La feuille 🍃", "La fleur 🌸", "La graine 🫘", "La racine 🌿"], ans:1, fact:"Une fleur is a flower in French — les fleurs sont belles et colorées!", img:"🌸🇫🇷🌺"},
      ],
      p3: [
        {q:"Comment dit-on 'apple' en français?", opts:["Banane 🍌", "Pomme 🍎", "Orange 🍊", "Mangue 🥭"], ans:1, fact:"Une pomme is an apple in French — la pomme est rouge et delicieuse!", img:"🍎🇫🇷✨"},
        {q:"Comment dit-on 'water' en français?", opts:["Le feu", "L'air", "L'eau 💧", "La terre"], ans:2, fact:"L'eau is water in French — nous avons besoin d'eau pour vivre!", img:"💧🇫🇷🌊"},
        {q:"Comment dit-on 'tree' en français?", opts:["Une fleur 🌸", "Un arbre 🌳", "Une feuille 🍃", "Une graine 🫘"], ans:1, fact:"Un arbre is a tree in French — les arbres produisent de l'oxygène!", img:"🌳🇫🇷💚"},
        {q:"Comment dit-on 'sun' en français?", opts:["La lune 🌙", "La pluie 🌧️", "Le soleil ☀️", "Le vent 💨"], ans:2, fact:"Le soleil is the sun in French — le soleil nous donne de la chaleur!", img:"☀️🇫🇷💛"},
        {q:"Comment dit-on 'flower' en français?", opts:["La feuille 🍃", "La fleur 🌸", "La graine 🫘", "La racine 🌿"], ans:1, fact:"Une fleur is a flower in French — les fleurs sont belles et colorées!", img:"🌸🇫🇷🌺"},
      ],
      p4: [
        {q:"Comment dit-on 'apple' en français?", opts:["Banane 🍌", "Pomme 🍎", "Orange 🍊", "Mangue 🥭"], ans:1, fact:"Une pomme is an apple in French — la pomme est rouge et delicieuse!", img:"🍎🇫🇷✨"},
        {q:"Comment dit-on 'water' en français?", opts:["Le feu", "L'air", "L'eau 💧", "La terre"], ans:2, fact:"L'eau is water in French — nous avons besoin d'eau pour vivre!", img:"💧🇫🇷🌊"},
        {q:"Comment dit-on 'tree' en français?", opts:["Une fleur 🌸", "Un arbre 🌳", "Une feuille 🍃", "Une graine 🫘"], ans:1, fact:"Un arbre is a tree in French — les arbres produisent de l'oxygène!", img:"🌳🇫🇷💚"},
        {q:"Comment dit-on 'sun' en français?", opts:["La lune 🌙", "La pluie 🌧️", "Le soleil ☀️", "Le vent 💨"], ans:2, fact:"Le soleil is the sun in French — le soleil nous donne de la chaleur!", img:"☀️🇫🇷💛"},
        {q:"Comment dit-on 'flower' en français?", opts:["La feuille 🍃", "La fleur 🌸", "La graine 🫘", "La racine 🌿"], ans:1, fact:"Une fleur is a flower in French — les fleurs sont belles et colorées!", img:"🌸🇫🇷🌺"},
      ],
      p5: [
        {q:"Comment dit-on 'apple' en français?", opts:["Banane 🍌", "Pomme 🍎", "Orange 🍊", "Mangue 🥭"], ans:1, fact:"Une pomme is an apple in French — la pomme est rouge et delicieuse!", img:"🍎🇫🇷✨"},
        {q:"Comment dit-on 'water' en français?", opts:["Le feu", "L'air", "L'eau 💧", "La terre"], ans:2, fact:"L'eau is water in French — nous avons besoin d'eau pour vivre!", img:"💧🇫🇷🌊"},
        {q:"Comment dit-on 'tree' en français?", opts:["Une fleur 🌸", "Un arbre 🌳", "Une feuille 🍃", "Une graine 🫘"], ans:1, fact:"Un arbre is a tree in French — les arbres produisent de l'oxygène!", img:"🌳🇫🇷💚"},
        {q:"Comment dit-on 'sun' en français?", opts:["La lune 🌙", "La pluie 🌧️", "Le soleil ☀️", "Le vent 💨"], ans:2, fact:"Le soleil is the sun in French — le soleil nous donne de la chaleur!", img:"☀️🇫🇷💛"},
        {q:"Comment dit-on 'flower' en français?", opts:["La feuille 🍃", "La fleur 🌸", "La graine 🫘", "La racine 🌿"], ans:1, fact:"Une fleur is a flower in French — les fleurs sont belles et colorées!", img:"🌸🇫🇷🌺"},
      ],
      p6: [
        {q:"Comment dit-on 'apple' en français?", opts:["Banane 🍌", "Pomme 🍎", "Orange 🍊", "Mangue 🥭"], ans:1, fact:"Une pomme is an apple in French — la pomme est rouge et delicieuse!", img:"🍎🇫🇷✨"},
        {q:"Comment dit-on 'water' en français?", opts:["Le feu", "L'air", "L'eau 💧", "La terre"], ans:2, fact:"L'eau is water in French — nous avons besoin d'eau pour vivre!", img:"💧🇫🇷🌊"},
        {q:"Comment dit-on 'tree' en français?", opts:["Une fleur 🌸", "Un arbre 🌳", "Une feuille 🍃", "Une graine 🫘"], ans:1, fact:"Un arbre is a tree in French — les arbres produisent de l'oxygène!", img:"🌳🇫🇷💚"},
        {q:"Comment dit-on 'sun' en français?", opts:["La lune 🌙", "La pluie 🌧️", "Le soleil ☀️", "Le vent 💨"], ans:2, fact:"Le soleil is the sun in French — le soleil nous donne de la chaleur!", img:"☀️🇫🇷💛"},
        {q:"Comment dit-on 'flower' en français?", opts:["La feuille 🍃", "La fleur 🌸", "La graine 🫘", "La racine 🌿"], ans:1, fact:"Une fleur is a flower in French — les fleurs sont belles et colorées!", img:"🌸🇫🇷🌺"},
      ],
      j1: [
        {q:"Comment dit-on 'apple' en français?", opts:["Banane 🍌", "Pomme 🍎", "Orange 🍊", "Mangue 🥭"], ans:1, fact:"Une pomme is an apple in French — la pomme est rouge et delicieuse!", img:"🍎🇫🇷✨"},
        {q:"Comment dit-on 'water' en français?", opts:["Le feu", "L'air", "L'eau 💧", "La terre"], ans:2, fact:"L'eau is water in French — nous avons besoin d'eau pour vivre!", img:"💧🇫🇷🌊"},
        {q:"Comment dit-on 'tree' en français?", opts:["Une fleur 🌸", "Un arbre 🌳", "Une feuille 🍃", "Une graine 🫘"], ans:1, fact:"Un arbre is a tree in French — les arbres produisent de l'oxygène!", img:"🌳🇫🇷💚"},
        {q:"Comment dit-on 'sun' en français?", opts:["La lune 🌙", "La pluie 🌧️", "Le soleil ☀️", "Le vent 💨"], ans:2, fact:"Le soleil is the sun in French — le soleil nous donne de la chaleur!", img:"☀️🇫🇷💛"},
        {q:"Comment dit-on 'flower' en français?", opts:["La feuille 🍃", "La fleur 🌸", "La graine 🫘", "La racine 🌿"], ans:1, fact:"Une fleur is a flower in French — les fleurs sont belles et colorées!", img:"🌸🇫🇷🌺"},
      ],
      j2: [
        {q:"Comment dit-on 'apple' en français?", opts:["Banane 🍌", "Pomme 🍎", "Orange 🍊", "Mangue 🥭"], ans:1, fact:"Une pomme is an apple in French — la pomme est rouge et delicieuse!", img:"🍎🇫🇷✨"},
        {q:"Comment dit-on 'water' en français?", opts:["Le feu", "L'air", "L'eau 💧", "La terre"], ans:2, fact:"L'eau is water in French — nous avons besoin d'eau pour vivre!", img:"💧🇫🇷🌊"},
        {q:"Comment dit-on 'tree' en français?", opts:["Une fleur 🌸", "Un arbre 🌳", "Une feuille 🍃", "Une graine 🫘"], ans:1, fact:"Un arbre is a tree in French — les arbres produisent de l'oxygène!", img:"🌳🇫🇷💚"},
        {q:"Comment dit-on 'sun' en français?", opts:["La lune 🌙", "La pluie 🌧️", "Le soleil ☀️", "Le vent 💨"], ans:2, fact:"Le soleil is the sun in French — le soleil nous donne de la chaleur!", img:"☀️🇫🇷💛"},
        {q:"Comment dit-on 'flower' en français?", opts:["La feuille 🍃", "La fleur 🌸", "La graine 🫘", "La racine 🌿"], ans:1, fact:"Une fleur is a flower in French — les fleurs sont belles et colorées!", img:"🌸🇫🇷🌺"},
      ],
      j3: [
        {q:"Comment dit-on 'apple' en français?", opts:["Banane 🍌", "Pomme 🍎", "Orange 🍊", "Mangue 🥭"], ans:1, fact:"Une pomme is an apple in French — la pomme est rouge et delicieuse!", img:"🍎🇫🇷✨"},
        {q:"Comment dit-on 'water' en français?", opts:["Le feu", "L'air", "L'eau 💧", "La terre"], ans:2, fact:"L'eau is water in French — nous avons besoin d'eau pour vivre!", img:"💧🇫🇷🌊"},
        {q:"Comment dit-on 'tree' en français?", opts:["Une fleur 🌸", "Un arbre 🌳", "Une feuille 🍃", "Une graine 🫘"], ans:1, fact:"Un arbre is a tree in French — les arbres produisent de l'oxygène!", img:"🌳🇫🇷💚"},
        {q:"Comment dit-on 'sun' en français?", opts:["La lune 🌙", "La pluie 🌧️", "Le soleil ☀️", "Le vent 💨"], ans:2, fact:"Le soleil is the sun in French — le soleil nous donne de la chaleur!", img:"☀️🇫🇷💛"},
        {q:"Comment dit-on 'flower' en français?", opts:["La feuille 🍃", "La fleur 🌸", "La graine 🫘", "La racine 🌿"], ans:1, fact:"Une fleur is a flower in French — les fleurs sont belles et colorées!", img:"🌸🇫🇷🌺"},
      ],
      s1: [
        {q:"Comment dit-on 'apple' en français?", opts:["Banane 🍌", "Pomme 🍎", "Orange 🍊", "Mangue 🥭"], ans:1, fact:"Une pomme is an apple in French — la pomme est rouge et delicieuse!", img:"🍎🇫🇷✨"},
        {q:"Comment dit-on 'water' en français?", opts:["Le feu", "L'air", "L'eau 💧", "La terre"], ans:2, fact:"L'eau is water in French — nous avons besoin d'eau pour vivre!", img:"💧🇫🇷🌊"},
        {q:"Comment dit-on 'tree' en français?", opts:["Une fleur 🌸", "Un arbre 🌳", "Une feuille 🍃", "Une graine 🫘"], ans:1, fact:"Un arbre is a tree in French — les arbres produisent de l'oxygène!", img:"🌳🇫🇷💚"},
        {q:"Comment dit-on 'sun' en français?", opts:["La lune 🌙", "La pluie 🌧️", "Le soleil ☀️", "Le vent 💨"], ans:2, fact:"Le soleil is the sun in French — le soleil nous donne de la chaleur!", img:"☀️🇫🇷💛"},
        {q:"Comment dit-on 'flower' en français?", opts:["La feuille 🍃", "La fleur 🌸", "La graine 🫘", "La racine 🌿"], ans:1, fact:"Une fleur is a flower in French — les fleurs sont belles et colorées!", img:"🌸🇫🇷🌺"},
      ],
      s2: [
        {q:"Comment dit-on 'apple' en français?", opts:["Banane 🍌", "Pomme 🍎", "Orange 🍊", "Mangue 🥭"], ans:1, fact:"Une pomme is an apple in French — la pomme est rouge et delicieuse!", img:"🍎🇫🇷✨"},
        {q:"Comment dit-on 'water' en français?", opts:["Le feu", "L'air", "L'eau 💧", "La terre"], ans:2, fact:"L'eau is water in French — nous avons besoin d'eau pour vivre!", img:"💧🇫🇷🌊"},
        {q:"Comment dit-on 'tree' en français?", opts:["Une fleur 🌸", "Un arbre 🌳", "Une feuille 🍃", "Une graine 🫘"], ans:1, fact:"Un arbre is a tree in French — les arbres produisent de l'oxygène!", img:"🌳🇫🇷💚"},
        {q:"Comment dit-on 'sun' en français?", opts:["La lune 🌙", "La pluie 🌧️", "Le soleil ☀️", "Le vent 💨"], ans:2, fact:"Le soleil is the sun in French — le soleil nous donne de la chaleur!", img:"☀️🇫🇷💛"},
        {q:"Comment dit-on 'flower' en français?", opts:["La feuille 🍃", "La fleur 🌸", "La graine 🫘", "La racine 🌿"], ans:1, fact:"Une fleur is a flower in French — les fleurs sont belles et colorées!", img:"🌸🇫🇷🌺"},
      ],
      s3: [
        {q:"Comment dit-on 'apple' en français?", opts:["Banane 🍌", "Pomme 🍎", "Orange 🍊", "Mangue 🥭"], ans:1, fact:"Une pomme is an apple in French — la pomme est rouge et delicieuse!", img:"🍎🇫🇷✨"},
        {q:"Comment dit-on 'water' en français?", opts:["Le feu", "L'air", "L'eau 💧", "La terre"], ans:2, fact:"L'eau is water in French — nous avons besoin d'eau pour vivre!", img:"💧🇫🇷🌊"},
        {q:"Comment dit-on 'tree' en français?", opts:["Une fleur 🌸", "Un arbre 🌳", "Une feuille 🍃", "Une graine 🫘"], ans:1, fact:"Un arbre is a tree in French — les arbres produisent de l'oxygène!", img:"🌳🇫🇷💚"},
        {q:"Comment dit-on 'sun' en français?", opts:["La lune 🌙", "La pluie 🌧️", "Le soleil ☀️", "Le vent 💨"], ans:2, fact:"Le soleil is the sun in French — le soleil nous donne de la chaleur!", img:"☀️🇫🇷💛"},
        {q:"Comment dit-on 'flower' en français?", opts:["La feuille 🍃", "La fleur 🌸", "La graine 🫘", "La racine 🌿"], ans:1, fact:"Une fleur is a flower in French — les fleurs sont belles et colorées!", img:"🌸🇫🇷🌺"},
      ],
  },
  weather: {
      n1: [
        {q:"What do we call water falling from the sky?", opts:["Snow only", "Rain 🌧️", "Hail only", "Fog only"], ans:1, fact:"Rain is water droplets that fall from clouds when they get too heavy!", img:"🌧️☁️💧"},
        {q:"What season comes after winter?", opts:["Autumn 🍂", "Summer ☀️", "Spring 🌸", "Rainy season"], ans:2, fact:"Spring comes after winter — flowers bloom and baby animals are born!", img:"🌸🌱🌤️"},
        {q:"What does a rainbow look like?", opts:["Black and white", "Many colours in an arc shape 🌈", "Only red", "Only blue"], ans:1, fact:"Rainbows form when sunlight shines through water droplets — 7 colours!", img:"🌈☀️🌧️"},
        {q:"What is wind?", opts:["Falling rain", "Moving air 💨", "Hot sunshine", "Cold ice"], ans:1, fact:"Wind is air moving from high pressure to low pressure areas — it can be gentle or strong!", img:"💨🌿🍃"},
        {q:"Why is the sun important for weather?", opts:["It is not important", "It heats the Earth creating all weather patterns ☀️", "Only for seeing", "Only for plants"], ans:1, fact:"The sun's heat drives all weather — it evaporates water and creates wind!", img:"☀️🌡️🌍"},
      ],
      n2: [
        {q:"What do we call water falling from the sky?", opts:["Snow only", "Rain 🌧️", "Hail only", "Fog only"], ans:1, fact:"Rain is water droplets that fall from clouds when they get too heavy!", img:"🌧️☁️💧"},
        {q:"What season comes after winter?", opts:["Autumn 🍂", "Summer ☀️", "Spring 🌸", "Rainy season"], ans:2, fact:"Spring comes after winter — flowers bloom and baby animals are born!", img:"🌸🌱🌤️"},
        {q:"What does a rainbow look like?", opts:["Black and white", "Many colours in an arc shape 🌈", "Only red", "Only blue"], ans:1, fact:"Rainbows form when sunlight shines through water droplets — 7 colours!", img:"🌈☀️🌧️"},
        {q:"What is wind?", opts:["Falling rain", "Moving air 💨", "Hot sunshine", "Cold ice"], ans:1, fact:"Wind is air moving from high pressure to low pressure areas — it can be gentle or strong!", img:"💨🌿🍃"},
        {q:"Why is the sun important for weather?", opts:["It is not important", "It heats the Earth creating all weather patterns ☀️", "Only for seeing", "Only for plants"], ans:1, fact:"The sun's heat drives all weather — it evaporates water and creates wind!", img:"☀️🌡️🌍"},
      ],
      p1: [
        {q:"What do we call water falling from the sky?", opts:["Snow only", "Rain 🌧️", "Hail only", "Fog only"], ans:1, fact:"Rain is water droplets that fall from clouds when they get too heavy!", img:"🌧️☁️💧"},
        {q:"What season comes after winter?", opts:["Autumn 🍂", "Summer ☀️", "Spring 🌸", "Rainy season"], ans:2, fact:"Spring comes after winter — flowers bloom and baby animals are born!", img:"🌸🌱🌤️"},
        {q:"What does a rainbow look like?", opts:["Black and white", "Many colours in an arc shape 🌈", "Only red", "Only blue"], ans:1, fact:"Rainbows form when sunlight shines through water droplets — 7 colours!", img:"🌈☀️🌧️"},
        {q:"What is wind?", opts:["Falling rain", "Moving air 💨", "Hot sunshine", "Cold ice"], ans:1, fact:"Wind is air moving from high pressure to low pressure areas — it can be gentle or strong!", img:"💨🌿🍃"},
        {q:"Why is the sun important for weather?", opts:["It is not important", "It heats the Earth creating all weather patterns ☀️", "Only for seeing", "Only for plants"], ans:1, fact:"The sun's heat drives all weather — it evaporates water and creates wind!", img:"☀️🌡️🌍"},
      ],
      p2: [
        {q:"What do we call water falling from the sky?", opts:["Snow only", "Rain 🌧️", "Hail only", "Fog only"], ans:1, fact:"Rain is water droplets that fall from clouds when they get too heavy!", img:"🌧️☁️💧"},
        {q:"What season comes after winter?", opts:["Autumn 🍂", "Summer ☀️", "Spring 🌸", "Rainy season"], ans:2, fact:"Spring comes after winter — flowers bloom and baby animals are born!", img:"🌸🌱🌤️"},
        {q:"What does a rainbow look like?", opts:["Black and white", "Many colours in an arc shape 🌈", "Only red", "Only blue"], ans:1, fact:"Rainbows form when sunlight shines through water droplets — 7 colours!", img:"🌈☀️🌧️"},
        {q:"What is wind?", opts:["Falling rain", "Moving air 💨", "Hot sunshine", "Cold ice"], ans:1, fact:"Wind is air moving from high pressure to low pressure areas — it can be gentle or strong!", img:"💨🌿🍃"},
        {q:"Why is the sun important for weather?", opts:["It is not important", "It heats the Earth creating all weather patterns ☀️", "Only for seeing", "Only for plants"], ans:1, fact:"The sun's heat drives all weather — it evaporates water and creates wind!", img:"☀️🌡️🌍"},
      ],
      p3: [
        {q:"What do we call water falling from the sky?", opts:["Snow only", "Rain 🌧️", "Hail only", "Fog only"], ans:1, fact:"Rain is water droplets that fall from clouds when they get too heavy!", img:"🌧️☁️💧"},
        {q:"What season comes after winter?", opts:["Autumn 🍂", "Summer ☀️", "Spring 🌸", "Rainy season"], ans:2, fact:"Spring comes after winter — flowers bloom and baby animals are born!", img:"🌸🌱🌤️"},
        {q:"What does a rainbow look like?", opts:["Black and white", "Many colours in an arc shape 🌈", "Only red", "Only blue"], ans:1, fact:"Rainbows form when sunlight shines through water droplets — 7 colours!", img:"🌈☀️🌧️"},
        {q:"What is wind?", opts:["Falling rain", "Moving air 💨", "Hot sunshine", "Cold ice"], ans:1, fact:"Wind is air moving from high pressure to low pressure areas — it can be gentle or strong!", img:"💨🌿🍃"},
        {q:"Why is the sun important for weather?", opts:["It is not important", "It heats the Earth creating all weather patterns ☀️", "Only for seeing", "Only for plants"], ans:1, fact:"The sun's heat drives all weather — it evaporates water and creates wind!", img:"☀️🌡️🌍"},
      ],
      p4: [
        {q:"What do we call water falling from the sky?", opts:["Snow only", "Rain 🌧️", "Hail only", "Fog only"], ans:1, fact:"Rain is water droplets that fall from clouds when they get too heavy!", img:"🌧️☁️💧"},
        {q:"What season comes after winter?", opts:["Autumn 🍂", "Summer ☀️", "Spring 🌸", "Rainy season"], ans:2, fact:"Spring comes after winter — flowers bloom and baby animals are born!", img:"🌸🌱🌤️"},
        {q:"What does a rainbow look like?", opts:["Black and white", "Many colours in an arc shape 🌈", "Only red", "Only blue"], ans:1, fact:"Rainbows form when sunlight shines through water droplets — 7 colours!", img:"🌈☀️🌧️"},
        {q:"What is wind?", opts:["Falling rain", "Moving air 💨", "Hot sunshine", "Cold ice"], ans:1, fact:"Wind is air moving from high pressure to low pressure areas — it can be gentle or strong!", img:"💨🌿🍃"},
        {q:"Why is the sun important for weather?", opts:["It is not important", "It heats the Earth creating all weather patterns ☀️", "Only for seeing", "Only for plants"], ans:1, fact:"The sun's heat drives all weather — it evaporates water and creates wind!", img:"☀️🌡️🌍"},
      ],
      p5: [
        {q:"What do we call water falling from the sky?", opts:["Snow only", "Rain 🌧️", "Hail only", "Fog only"], ans:1, fact:"Rain is water droplets that fall from clouds when they get too heavy!", img:"🌧️☁️💧"},
        {q:"What season comes after winter?", opts:["Autumn 🍂", "Summer ☀️", "Spring 🌸", "Rainy season"], ans:2, fact:"Spring comes after winter — flowers bloom and baby animals are born!", img:"🌸🌱🌤️"},
        {q:"What does a rainbow look like?", opts:["Black and white", "Many colours in an arc shape 🌈", "Only red", "Only blue"], ans:1, fact:"Rainbows form when sunlight shines through water droplets — 7 colours!", img:"🌈☀️🌧️"},
        {q:"What is wind?", opts:["Falling rain", "Moving air 💨", "Hot sunshine", "Cold ice"], ans:1, fact:"Wind is air moving from high pressure to low pressure areas — it can be gentle or strong!", img:"💨🌿🍃"},
        {q:"Why is the sun important for weather?", opts:["It is not important", "It heats the Earth creating all weather patterns ☀️", "Only for seeing", "Only for plants"], ans:1, fact:"The sun's heat drives all weather — it evaporates water and creates wind!", img:"☀️🌡️🌍"},
      ],
      p6: [
        {q:"What do we call water falling from the sky?", opts:["Snow only", "Rain 🌧️", "Hail only", "Fog only"], ans:1, fact:"Rain is water droplets that fall from clouds when they get too heavy!", img:"🌧️☁️💧"},
        {q:"What season comes after winter?", opts:["Autumn 🍂", "Summer ☀️", "Spring 🌸", "Rainy season"], ans:2, fact:"Spring comes after winter — flowers bloom and baby animals are born!", img:"🌸🌱🌤️"},
        {q:"What does a rainbow look like?", opts:["Black and white", "Many colours in an arc shape 🌈", "Only red", "Only blue"], ans:1, fact:"Rainbows form when sunlight shines through water droplets — 7 colours!", img:"🌈☀️🌧️"},
        {q:"What is wind?", opts:["Falling rain", "Moving air 💨", "Hot sunshine", "Cold ice"], ans:1, fact:"Wind is air moving from high pressure to low pressure areas — it can be gentle or strong!", img:"💨🌿🍃"},
        {q:"Why is the sun important for weather?", opts:["It is not important", "It heats the Earth creating all weather patterns ☀️", "Only for seeing", "Only for plants"], ans:1, fact:"The sun's heat drives all weather — it evaporates water and creates wind!", img:"☀️🌡️🌍"},
      ],
      j1: [
        {q:"What do we call water falling from the sky?", opts:["Snow only", "Rain 🌧️", "Hail only", "Fog only"], ans:1, fact:"Rain is water droplets that fall from clouds when they get too heavy!", img:"🌧️☁️💧"},
        {q:"What season comes after winter?", opts:["Autumn 🍂", "Summer ☀️", "Spring 🌸", "Rainy season"], ans:2, fact:"Spring comes after winter — flowers bloom and baby animals are born!", img:"🌸🌱🌤️"},
        {q:"What does a rainbow look like?", opts:["Black and white", "Many colours in an arc shape 🌈", "Only red", "Only blue"], ans:1, fact:"Rainbows form when sunlight shines through water droplets — 7 colours!", img:"🌈☀️🌧️"},
        {q:"What is wind?", opts:["Falling rain", "Moving air 💨", "Hot sunshine", "Cold ice"], ans:1, fact:"Wind is air moving from high pressure to low pressure areas — it can be gentle or strong!", img:"💨🌿🍃"},
        {q:"Why is the sun important for weather?", opts:["It is not important", "It heats the Earth creating all weather patterns ☀️", "Only for seeing", "Only for plants"], ans:1, fact:"The sun's heat drives all weather — it evaporates water and creates wind!", img:"☀️🌡️🌍"},
      ],
      j2: [
        {q:"What do we call water falling from the sky?", opts:["Snow only", "Rain 🌧️", "Hail only", "Fog only"], ans:1, fact:"Rain is water droplets that fall from clouds when they get too heavy!", img:"🌧️☁️💧"},
        {q:"What season comes after winter?", opts:["Autumn 🍂", "Summer ☀️", "Spring 🌸", "Rainy season"], ans:2, fact:"Spring comes after winter — flowers bloom and baby animals are born!", img:"🌸🌱🌤️"},
        {q:"What does a rainbow look like?", opts:["Black and white", "Many colours in an arc shape 🌈", "Only red", "Only blue"], ans:1, fact:"Rainbows form when sunlight shines through water droplets — 7 colours!", img:"🌈☀️🌧️"},
        {q:"What is wind?", opts:["Falling rain", "Moving air 💨", "Hot sunshine", "Cold ice"], ans:1, fact:"Wind is air moving from high pressure to low pressure areas — it can be gentle or strong!", img:"💨🌿🍃"},
        {q:"Why is the sun important for weather?", opts:["It is not important", "It heats the Earth creating all weather patterns ☀️", "Only for seeing", "Only for plants"], ans:1, fact:"The sun's heat drives all weather — it evaporates water and creates wind!", img:"☀️🌡️🌍"},
      ],
      j3: [
        {q:"What do we call water falling from the sky?", opts:["Snow only", "Rain 🌧️", "Hail only", "Fog only"], ans:1, fact:"Rain is water droplets that fall from clouds when they get too heavy!", img:"🌧️☁️💧"},
        {q:"What season comes after winter?", opts:["Autumn 🍂", "Summer ☀️", "Spring 🌸", "Rainy season"], ans:2, fact:"Spring comes after winter — flowers bloom and baby animals are born!", img:"🌸🌱🌤️"},
        {q:"What does a rainbow look like?", opts:["Black and white", "Many colours in an arc shape 🌈", "Only red", "Only blue"], ans:1, fact:"Rainbows form when sunlight shines through water droplets — 7 colours!", img:"🌈☀️🌧️"},
        {q:"What is wind?", opts:["Falling rain", "Moving air 💨", "Hot sunshine", "Cold ice"], ans:1, fact:"Wind is air moving from high pressure to low pressure areas — it can be gentle or strong!", img:"💨🌿🍃"},
        {q:"Why is the sun important for weather?", opts:["It is not important", "It heats the Earth creating all weather patterns ☀️", "Only for seeing", "Only for plants"], ans:1, fact:"The sun's heat drives all weather — it evaporates water and creates wind!", img:"☀️🌡️🌍"},
      ],
      s1: [
        {q:"What do we call water falling from the sky?", opts:["Snow only", "Rain 🌧️", "Hail only", "Fog only"], ans:1, fact:"Rain is water droplets that fall from clouds when they get too heavy!", img:"🌧️☁️💧"},
        {q:"What season comes after winter?", opts:["Autumn 🍂", "Summer ☀️", "Spring 🌸", "Rainy season"], ans:2, fact:"Spring comes after winter — flowers bloom and baby animals are born!", img:"🌸🌱🌤️"},
        {q:"What does a rainbow look like?", opts:["Black and white", "Many colours in an arc shape 🌈", "Only red", "Only blue"], ans:1, fact:"Rainbows form when sunlight shines through water droplets — 7 colours!", img:"🌈☀️🌧️"},
        {q:"What is wind?", opts:["Falling rain", "Moving air 💨", "Hot sunshine", "Cold ice"], ans:1, fact:"Wind is air moving from high pressure to low pressure areas — it can be gentle or strong!", img:"💨🌿🍃"},
        {q:"Why is the sun important for weather?", opts:["It is not important", "It heats the Earth creating all weather patterns ☀️", "Only for seeing", "Only for plants"], ans:1, fact:"The sun's heat drives all weather — it evaporates water and creates wind!", img:"☀️🌡️🌍"},
      ],
      s2: [
        {q:"What do we call water falling from the sky?", opts:["Snow only", "Rain 🌧️", "Hail only", "Fog only"], ans:1, fact:"Rain is water droplets that fall from clouds when they get too heavy!", img:"🌧️☁️💧"},
        {q:"What season comes after winter?", opts:["Autumn 🍂", "Summer ☀️", "Spring 🌸", "Rainy season"], ans:2, fact:"Spring comes after winter — flowers bloom and baby animals are born!", img:"🌸🌱🌤️"},
        {q:"What does a rainbow look like?", opts:["Black and white", "Many colours in an arc shape 🌈", "Only red", "Only blue"], ans:1, fact:"Rainbows form when sunlight shines through water droplets — 7 colours!", img:"🌈☀️🌧️"},
        {q:"What is wind?", opts:["Falling rain", "Moving air 💨", "Hot sunshine", "Cold ice"], ans:1, fact:"Wind is air moving from high pressure to low pressure areas — it can be gentle or strong!", img:"💨🌿🍃"},
        {q:"Why is the sun important for weather?", opts:["It is not important", "It heats the Earth creating all weather patterns ☀️", "Only for seeing", "Only for plants"], ans:1, fact:"The sun's heat drives all weather — it evaporates water and creates wind!", img:"☀️🌡️🌍"},
      ],
      s3: [
        {q:"What do we call water falling from the sky?", opts:["Snow only", "Rain 🌧️", "Hail only", "Fog only"], ans:1, fact:"Rain is water droplets that fall from clouds when they get too heavy!", img:"🌧️☁️💧"},
        {q:"What season comes after winter?", opts:["Autumn 🍂", "Summer ☀️", "Spring 🌸", "Rainy season"], ans:2, fact:"Spring comes after winter — flowers bloom and baby animals are born!", img:"🌸🌱🌤️"},
        {q:"What does a rainbow look like?", opts:["Black and white", "Many colours in an arc shape 🌈", "Only red", "Only blue"], ans:1, fact:"Rainbows form when sunlight shines through water droplets — 7 colours!", img:"🌈☀️🌧️"},
        {q:"What is wind?", opts:["Falling rain", "Moving air 💨", "Hot sunshine", "Cold ice"], ans:1, fact:"Wind is air moving from high pressure to low pressure areas — it can be gentle or strong!", img:"💨🌿🍃"},
        {q:"Why is the sun important for weather?", opts:["It is not important", "It heats the Earth creating all weather patterns ☀️", "Only for seeing", "Only for plants"], ans:1, fact:"The sun's heat drives all weather — it evaporates water and creates wind!", img:"☀️🌡️🌍"},
      ],
  },
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length-1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function SproutsPlayzone() {
  const [screen, setScreen] = useState<'name'|'grade'|'cat'|'game'|'result'>('name')
  const [playerName, setPlayerName] = useState('')
  const [nameInput, setNameInput] = useState('')
  const [grade, setGrade] = useState<Grade|null>(null)
  const [cat, setCat] = useState<Cat|null>(null)
  const [questions, setQuestions] = useState<Q[]>([])
  const [idx, setIdx] = useState(0)
  const [pts, setPts] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [lives, setLives] = useState(3)
  const [sel, setSel] = useState<number|null>(null)
  const [answered, setAnswered] = useState(false)
  const [burst, setBurst] = useState('')

  const q = questions[idx]
  const gradeInfo = GRADES.find(g => g.id === grade)
  const catInfo = CATS.find(c => c.id === cat)
  const total = questions.length
  const pct = total > 0 ? (idx / total) * 100 : 0
  const resultPct = total > 0 ? Math.round((correct / total) * 100) : 0

  function startGame() {
    if (!grade || !cat) return
    const pool = QB[cat][grade]
    if (!pool || pool.length === 0) { alert('Questions coming soon for this grade and topic!'); return }
    setQuestions(shuffle(pool))
    setIdx(0); setPts(0); setCorrect(0); setLives(3)
    setSel(null); setAnswered(false); setBurst('')
    setScreen('game')
  }

  function pick(i: number) {
    if (answered) return
    setSel(i)
    setAnswered(true)
    if (i === q.ans) {
      setPts(p => p + 10)
      setCorrect(c => c + 1)
      setBurst(`🌟 Brilliant, ${playerName}!`)
      setTimeout(() => setBurst(''), 2000)
    } else {
      const nl = lives - 1
      setLives(nl)
      if (nl <= 0) setTimeout(() => setScreen('result'), 1500)
    }
  }

  function next() {
    const nx = idx + 1
    if (nx >= total) { setScreen('result'); return }
    setIdx(nx); setSel(null); setAnswered(false)
  }

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;700;800;900&display=swap');
    * { box-sizing:border-box; margin:0; padding:0 }
    body { background:#0a0a1a }
    @keyframes qIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
    @keyframes pop { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }
    @keyframes burst { 0%{opacity:0;transform:translate(-50%,-50%) scale(.3)} 20%{opacity:1;transform:translate(-50%,-50%) scale(1.1)} 80%{opacity:1;transform:translate(-50%,-50%) scale(1)} 100%{opacity:0;transform:translate(-50%,-50%) scale(.8)} }
    @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)} }
    .grade-card:hover { transform:translateY(-6px) scale(1.05)!important; cursor:pointer }
    .cat-card:hover { transform:translateY(-8px) scale(1.04)!important; cursor:pointer }
    .opt-btn:hover:not(:disabled) { transform:scale(1.03)!important; filter:brightness(1.15)!important }
    .go-btn:hover:not(:disabled) { transform:translateY(-4px)!important; box-shadow:0 20px 40px rgba(11,232,129,.5)!important }
    .name-inp:focus { border-color:#0be881!important; box-shadow:0 0 0 3px rgba(11,232,129,.2)!important }
  `

  return (
    <div style={{minHeight:'100vh',background:'linear-gradient(135deg,#0a0a1a 0%,#0d1b2a 50%,#0a1a0d 100%)',fontFamily:"'Nunito',sans-serif"}}>
      <style>{css}</style>

      {/* BURST */}
      {burst && (
        <div style={{position:'fixed',top:'50%',left:'50%',zIndex:9999,pointerEvents:'none',
          fontFamily:"'Fredoka One',cursive",fontSize:'2rem',color:'#ffd32a',
          background:'linear-gradient(135deg,#1a3a0a,#2d6b2d)',border:'3px solid #0be881',
          padding:'16px 36px',borderRadius:24,textAlign:'center',
          animation:'burst 2s ease forwards',whiteSpace:'nowrap'}}>
          {burst}
        </div>
      )}

      {/* TOPBAR */}
      <div style={{background:'linear-gradient(90deg,#0a2a14,#0d3d1a,#0a2a14)',padding:'10px 20px',
        display:'flex',alignItems:'center',justifyContent:'space-between',
        borderBottom:'2px solid #0be881',position:'sticky',top:0,zIndex:50}}>
        <div style={{fontFamily:"'Fredoka One',cursive",fontSize:'1.35rem',color:'#fff',letterSpacing:1}}>
          🌿 LIFEWS<span style={{color:'#0be881'}}>Connect</span> · PlayZone
        </div>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          {playerName && <div style={{color:'#0be881',fontWeight:800,fontSize:'0.85rem'}}>👤 {playerName}</div>}
          {screen === 'game' && (
            <>
              <div style={{display:'flex',gap:2}}>
                {[0,1,2].map(i => <span key={i} style={{fontSize:'1.1rem',opacity:i<lives?1:.2}}>❤️</span>)}
              </div>
              <div style={{background:'rgba(255,255,255,.15)',border:'2px solid rgba(255,255,255,.3)',borderRadius:20,padding:'4px 12px',color:'#fff',fontWeight:900,fontSize:'0.9rem'}}>⭐ {pts}</div>
            </>
          )}
        </div>
      </div>

      <div style={{maxWidth:960,margin:'0 auto',padding:'20px 14px'}}>

        {/* ===== NAME SCREEN ===== */}
        {screen === 'name' && (
          <div style={{display:'flex',justifyContent:'center',alignItems:'center',minHeight:'80vh'}}>
            <div style={{background:'linear-gradient(135deg,#0d1e3a,#0a2a1a)',border:'2.5px solid #0be881',borderRadius:28,padding:'44px 36px',maxWidth:520,width:'100%',textAlign:'center',animation:'qIn .5s ease'}}>
              <div style={{fontSize:'5rem',marginBottom:16,filter:'drop-shadow(0 4px 16px rgba(11,232,129,.4))'}}>🌿</div>
              <h1 style={{fontFamily:"'Fredoka One',cursive",fontSize:'2.4rem',color:'#fff',marginBottom:8,lineHeight:1.1}}>
                Welcome to <span style={{color:'#0be881'}}>Sprouts</span> PlayZone!
              </h1>
              <p style={{color:'#7db8cc',fontWeight:700,fontSize:'1rem',marginBottom:32,lineHeight:1.6}}>
                🌍 Food · Energy · Water · Nature & more<br/>
                Play, learn and earn points! 🏆
              </p>
              <div style={{marginBottom:20,textAlign:'left'}}>
                <label style={{display:'block',fontSize:'0.82rem',color:'#7db8cc',fontWeight:800,marginBottom:8,textTransform:'uppercase',letterSpacing:'0.6px'}}>
                  What is your name? 👤
                </label>
                <input
                  className="name-inp"
                  type="text"
                  placeholder="Type your name here..."
                  value={nameInput}
                  onChange={e => setNameInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && nameInput.trim() && (setPlayerName(nameInput.trim()), setScreen('grade'))}
                  maxLength={20}
                  autoFocus
                  style={{background:'#0a1e2e',border:'2.5px solid #1e3a5a',borderRadius:14,padding:'14px 18px',color:'#e8f4ff',fontSize:'1.1rem',fontWeight:800,fontFamily:'inherit',width:'100%',outline:'none',transition:'border .2s'}}
                />
              </div>
              <button
                className="go-btn"
                onClick={() => { if (nameInput.trim()) { setPlayerName(nameInput.trim()); setScreen('grade') } }}
                disabled={!nameInput.trim()}
                style={{width:'100%',padding:18,border:'none',borderRadius:18,
                  background:nameInput.trim()?'linear-gradient(135deg,#0be881,#05c46b)':'#1a2a1a',
                  color:nameInput.trim()?'#000':'#3a5a3a',fontFamily:"'Fredoka One',cursive",
                  fontSize:'1.4rem',cursor:nameInput.trim()?'pointer':'not-allowed',
                  transition:'all .28s',boxShadow:nameInput.trim()?'0 8px 28px rgba(11,232,129,.4)':'none'}}>
                🚀 Let's Play!
              </button>
              <div style={{display:'flex',gap:12,justifyContent:'center',marginTop:20,flexWrap:'wrap'}}>
                {[['🎯','10 Topics'],['📚','Grade-based'],['🏆','10 pts each']].map(([e,t]) => (
                  <div key={t} style={{background:'rgba(11,232,129,.08)',border:'1px solid rgba(11,232,129,.2)',borderRadius:12,padding:'7px 14px',color:'#7db8cc',fontSize:'0.78rem',fontWeight:800}}>{e} {t}</div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== GRADE SCREEN ===== */}
        {screen === 'grade' && (
          <div style={{animation:'qIn .4s ease'}}>
            <div style={{background:'linear-gradient(135deg,#0d1e3a,#0a2a14)',borderRadius:22,padding:'24px 28px',marginBottom:28,border:'2px solid #0be881'}}>
              <h1 style={{fontFamily:"'Fredoka One',cursive",fontSize:'2rem',color:'#fff',marginBottom:6}}>
                👋 Hey <span style={{color:'#0be881'}}>{playerName}</span>! Pick your grade!
              </h1>
              <p style={{color:'#7db8cc',fontWeight:700}}>Questions are perfectly matched to your level 🎯</p>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:24}}>
              {GRADES.map(g => (
                <div key={g.id} className="grade-card"
                  onClick={() => { setGrade(g.id); setScreen('cat') }}
                  style={{background:`linear-gradient(135deg,${g.color}22,${g.color}11)`,
                    border:`2.5px solid ${g.color}`,borderRadius:18,padding:'18px 10px',
                    textAlign:'center',transition:'all .28s',cursor:'pointer'}}>
                  <div style={{fontSize:'2.2rem',marginBottom:6}}>{g.emoji}</div>
                  <div style={{fontFamily:"'Fredoka One',cursive",fontSize:'1rem',color:g.color,marginBottom:3}}>{g.label}</div>
                  <div style={{fontSize:'0.68rem',color:g.color+'99',fontWeight:700}}>{g.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== CATEGORY SCREEN ===== */}
        {screen === 'cat' && gradeInfo && (
          <div style={{animation:'qIn .4s ease'}}>
            <div style={{background:`linear-gradient(135deg,${gradeInfo.color}22,#0a1a0d)`,borderRadius:22,padding:'22px 28px',marginBottom:24,border:`2px solid ${gradeInfo.color}`,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <div>
                <h1 style={{fontFamily:"'Fredoka One',cursive",fontSize:'1.8rem',color:'#fff',marginBottom:6}}>
                  {gradeInfo.emoji} {gradeInfo.label} — Choose your topic!
                </h1>
                <p style={{color:gradeInfo.color,fontWeight:700,fontSize:'0.9rem'}}>{gradeInfo.desc} · 10 pts per correct answer</p>
              </div>
              <button onClick={() => setScreen('grade')}
                style={{background:'rgba(255,255,255,.1)',border:'1.5px solid rgba(255,255,255,.2)',borderRadius:12,padding:'8px 16px',color:'#fff',cursor:'pointer',fontWeight:700,fontFamily:'inherit',fontSize:'0.85rem'}}>
                ← Back
              </button>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:14}}>
              {CATS.map(c => (
                <div key={c.id} className="cat-card"
                  onClick={() => { setCat(c.id); startGame() }}
                  style={{background:c.bg,border:`2.5px solid ${c.color}`,borderRadius:20,
                    padding:'20px 10px',textAlign:'center',cursor:'pointer',transition:'all .28s',
                    boxShadow:`0 4px 20px ${c.color}22`}}>
                  {/* Emoji Scene */}
                  <div style={{fontSize:'1.1rem',letterSpacing:2,marginBottom:8,lineHeight:1.4,
                    background:`${c.color}15`,borderRadius:12,padding:'8px 4px'}}>
                    {c.scene}
                  </div>
                  <div style={{fontSize:'2rem',marginBottom:6}}>{c.icon}</div>
                  <div style={{fontFamily:"'Fredoka One',cursive",fontSize:'0.88rem',color:c.color,lineHeight:1.2}}>{c.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== GAME SCREEN ===== */}
        {screen === 'game' && q && gradeInfo && catInfo && (
          <div style={{animation:'qIn .35s ease'}}>
            {/* Progress */}
            <div style={{background:'#0d1e2e',borderRadius:14,padding:'12px 18px',marginBottom:14,border:'1.5px solid #1e3a5a'}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:8,color:'#7db8cc',fontWeight:800,fontSize:'0.82rem'}}>
                <span>Q {idx+1} of {total}</span>
                <span>{catInfo.icon} {catInfo.name} · {gradeInfo.label}</span>
              </div>
              <div style={{background:'#1a2e42',borderRadius:10,height:10,overflow:'hidden'}}>
                <div style={{width:`${pct}%`,height:'100%',background:`linear-gradient(90deg,${catInfo.color},${gradeInfo.color})`,borderRadius:10,transition:'width .5s ease'}}/>
              </div>
            </div>

            {/* Question Card */}
            <div style={{background:'#0d1e2e',borderRadius:24,padding:'28px 24px',border:`2px solid ${catInfo.color}44`,marginBottom:14,animation:'qIn .35s ease'}}>
              {/* Image scene */}
              {q.img && (
                <div style={{background:`${catInfo.color}15`,border:`1.5px solid ${catInfo.color}33`,borderRadius:16,padding:'14px',marginBottom:18,textAlign:'center'}}>
                  <div style={{fontSize:'2.4rem',letterSpacing:8,marginBottom:4}}>{q.img}</div>
                  <div style={{fontSize:'0.7rem',color:catInfo.color+'99',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.5px'}}>Look carefully 👀</div>
                </div>
              )}
              <div style={{fontFamily:"'Fredoka One',cursive",fontSize:'1.4rem',color:'#fff',lineHeight:1.4,marginBottom:24}}>{q.q}</div>
              {/* Options */}
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                {q.opts.map((opt, i) => {
                  const isC = i === q.ans, isSel = i === sel
                  let bg = '#0a1e2e', border = `2px solid #1e3a5a`, color = '#c8dff0', anim = ''
                  if (answered) {
                    if (isC) { bg='#0a3a0a'; border=`2px solid #0be881`; color='#0be881'; anim='pop .4s ease' }
                    else if (isSel) { bg='#3a0a0a'; border=`2px solid #ff6b6b`; color='#ff6b6b'; anim='shake .4s ease' }
                    else { bg='#080e18'; border='2px solid #1a2e42'; color='#4a7a99' }
                  }
                  return (
                    <button key={i} className={!answered?'opt-btn':''} onClick={() => pick(i)} disabled={answered}
                      style={{background:bg,border,borderRadius:16,padding:'16px 12px',textAlign:'center',
                        fontSize:'0.95rem',fontWeight:800,color,cursor:answered?'default':'pointer',
                        lineHeight:1.4,transition:'all .2s',fontFamily:'inherit',animation:anim}}>
                      {opt}
                    </button>
                  )
                })}
              </div>
              {/* Feedback */}
              {answered && (
                <div style={{marginTop:20,padding:'16px',background:sel===q.ans?'#0a2a0a':'#2a0a0a',
                  borderRadius:14,border:`1.5px solid ${sel===q.ans?'#0be881':'#ff6b6b'}`,
                  animation:'qIn .3s ease',textAlign:'center'}}>
                  <div style={{fontSize:'2rem',marginBottom:6}}>{sel===q.ans?'🎉':'💡'}</div>
                  <div style={{fontFamily:"'Fredoka One',cursive",fontSize:'1.1rem',color:sel===q.ans?'#0be881':'#ff9f43',marginBottom:6}}>
                    {sel===q.ans?`+10 points! Well done!`:'Not quite — here is the fact:'}
                  </div>
                  <div style={{color:'#8db4cc',fontWeight:700,fontSize:'0.88rem',lineHeight:1.5}}>💡 {q.fact}</div>
                </div>
              )}
            </div>

            {/* Next Button */}
            {answered && lives > 0 && (
              <button onClick={next}
                style={{width:'100%',padding:16,border:'none',borderRadius:16,
                  background:`linear-gradient(135deg,${catInfo.color},${gradeInfo.color})`,
                  color:'#000',fontFamily:"'Fredoka One',cursive",fontSize:'1.3rem',
                  cursor:'pointer',boxShadow:`0 6px 24px ${catInfo.color}44`,transition:'transform .2s',
                  animation:'qIn .3s ease'}}>
                {idx+1 >= total ? '🏆 See My Results!' : 'Next Question ➡️'}
              </button>
            )}
          </div>
        )}

        {/* ===== RESULT SCREEN ===== */}
        {screen === 'result' && gradeInfo && catInfo && (
          <div style={{animation:'qIn .45s ease',display:'flex',justifyContent:'center'}}>
            <div style={{background:'#0d1e2e',border:`2px solid ${catInfo.color}`,borderRadius:28,padding:'40px 28px',maxWidth:520,width:'100%',textAlign:'center'}}>
              <div style={{fontSize:'5rem',marginBottom:16}}>{resultPct>=80?'🏆':resultPct>=60?'⭐':'🌱'}</div>
              <div style={{fontFamily:"'Fredoka One',cursive",fontSize:'2rem',color:'#fff',marginBottom:8}}>
                {resultPct>=80?`Brilliant, ${playerName}! 🏆`:resultPct>=60?`Great job, ${playerName}! ⭐`:`Keep growing, ${playerName}! 🌱`}
              </div>
              <div style={{background:`linear-gradient(135deg,${catInfo.color},${gradeInfo.color})`,display:'inline-block',padding:'10px 30px',borderRadius:30,color:'#000',fontFamily:"'Fredoka One',cursive",fontSize:'1.5rem',margin:'14px 0'}}>
                ⭐ {pts} points
              </div>
              <div style={{color:'#8db4cc',fontWeight:700,marginBottom:6}}>{correct} of {total} correct ({resultPct}%)</div>
              <div style={{color:catInfo.color,fontWeight:800,marginBottom:28,fontSize:'0.9rem'}}>{catInfo.icon} {catInfo.name} · {gradeInfo.label}</div>
              <div style={{display:'grid',gap:10}}>
                <button onClick={() => { setCat(null); setGrade(null); startGame() }}
                  style={{padding:14,border:'none',borderRadius:14,background:`linear-gradient(135deg,${catInfo.color},${gradeInfo.color})`,color:'#000',fontFamily:"'Fredoka One',cursive",fontSize:'1.1rem',cursor:'pointer'}}>
                  🔄 Play Again
                </button>
                <button onClick={() => { setCat(null); setScreen('cat') }}
                  style={{padding:14,border:'none',borderRadius:14,background:'linear-gradient(135deg,#1a5c1a,#2d8a2d)',color:'#fff',fontFamily:"'Fredoka One',cursive",fontSize:'1.1rem',cursor:'pointer'}}>
                  🎯 New Topic
                </button>
                <button onClick={() => { setGrade(null); setCat(null); setScreen('grade') }}
                  style={{padding:14,border:'none',borderRadius:14,background:'linear-gradient(135deg,#1a2e4a,#2d4a6b)',color:'#fff',fontFamily:"'Fredoka One',cursive",fontSize:'1.1rem',cursor:'pointer'}}>
                  📚 Change Grade
                </button>
                <button onClick={() => { setPlayerName(''); setNameInput(''); setGrade(null); setCat(null); setScreen('name') }}
                  style={{padding:14,border:'none',borderRadius:14,background:'#1a1a2a',color:'#8db4cc',fontFamily:"'Fredoka One',cursive",fontSize:'1rem',cursor:'pointer',outline:'1px solid #2a3a4a'}}>
                  👤 New Player
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
