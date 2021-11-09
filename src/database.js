import queen from '../src/assets/images/characters/queen.jpg';
import leftist from '../src/assets/images/characters/leftist.jpg';
import imaginary from '../src/assets/images/characters/imaginary.jpg';

import ticketPic from '../src/assets/images/items/item-ticket.png';
import netflixPic from '../src/assets/images/items/item-netflix.png';
import cameraPic from '../src/assets/images/items/item-camera.png';
import cdgPic from '../src/assets/images/items/item-cdg.png';
import coffeePic from '../src/assets/images/items/item-coffee.png';

import alfat from '../src/assets/images/wishes/alfat.jpg';
import alifirza from '../src/assets/images/wishes/alifirza.jpg';
import azka from '../src/assets/images/wishes/azka.jpg';
import jeje from '../src/assets/images/wishes/jeje.jpg';
import kevin from '../src/assets/images/wishes/kevin.jpg';
import mae from '../src/assets/images/wishes/mae.jpg';
import putrigaluh from '../src/assets/images/wishes/putrigaluh.jpg';
import resty from '../src/assets/images/wishes/resty.jpg';
import salza from '../src/assets/images/wishes/salza.jpg';

import bangkok from '../src/assets/images/cities/bangkok2.jpg';
import jakarta from '../src/assets/images/cities/jakarta2.jpg';
import belgrade from '../src/assets/images/cities/belgrade2.jpg';
import semarang from '../src/assets/images/cities/semarang2.jpg';
import bandung from '../src/assets/images/cities/bandung2.jpg';


export const levelsDatabase = [
  {
    id: 0,
    rewardPerQuestion: 500,
    cityName: 'Semarang',
    imageUrl: semarang,
    description: "Ahh yes, the good ol' Semarang. The place where you were born, raised, and have become atteched to. Just like you, this city is hot as fuck! The blistering heat is the result of the good ol' capitalists that continues to extract... Aye holup this aint no leftist propagand LMAO. Besides the heat, the downside of this city is that they aint got no IMAX studio. How am I supposed to see that 70mm IMAX film bro?",
    requiredItemDesc: 'Welp, at least there\'s a fancy DP mall that got a fancy movie theater. buy some tix, lets check the mall out yeah?',
    quizzes: [
      {
        id: 0,
        authorName: "NADIA NURSAIDATINA AP ",
        authorCoolName: "anonymous",
        questionText: "Which beverage fits my personality best?",
        wish: "Happy birthday kak mutiiii! Wish u all the best. Tbh kakak role model fav aku di debatee. Semoga apa dimau tercapai ya kak!!",
        questionOptions: [
          "coffee" ,
          "tea" ,
          "juice" ,
          "milk",
        ],
        correctAnswerId: 3,
        imageUrl: null
      },
      {
        id: 1,
        authorName: "Brama Aditya",
        authorCoolName: "Phobos",
        wish: "Yay yay birthday me so happy you so birthday",
        questionText: "Who is the GOAT (Greatest Of All Time) today?",
        questionOptions: [
          "goat",
          "mutiara noverita",
          "chris hansen",
          "that flavortown guy"
        ],
        correctAnswerId: 1,
        imageUrl: null
      },
      {
        id: 2,
        authorName: "Jeje",
        authorCoolName: "woozi's rice 🍚",
        wish: "hbd our luvly kak mutiii :3  demii ga nyangka kakak baru 20 tahun dis year,,,  wuatb n Gbu olweisd kakk :D  gudlakk in ur future careeer (atau kl skrg udh berkarir gudlak kak wkwk) :3 stay safe and healthy as olweis yaa kak,, zuzur ak pengen ketemu kakak lagi :( in offline debating, cus we havent yet takin selca together :(((  hope we could realized it someday ehehehe. ps. pardon my poor editing skills yaa kak, i just wanna entertain u ;D",
        questionText: "what is my wildest dream? ",
        questionOptions: [
          "debuting under pledis/yg ent",
          "marry u if i was born as a male",
          "nghalu becoming one of seventeen's member wife",
          "becoming sugar baby"
        ],
        correctAnswerId: 1,
        imageUrl: jeje
      },
      {
        id: 3,
        authorName: "Angga Prayuda",
        authorCoolName: "si3p4yun5",
        wish: "I wish you a very happy birthday, si cantik nan pintar, tekun dan rajin belajar. semoga dilancarkan rezekinya dan diberikan kesehatan yang baik. you truly are an inspiration, with love, Angga <3",
        questionText: "aku asalnya darimana hayo",
        questionOptions: [
          "not available"
        ],
        correctAnswerId: 0,
        imageUrl: null
      },
      {
        id: 4,
        authorName: "J.A.R.V.I.S",
        authorCoolName: "Anti-noob bot",
        wish: 'hbd y, ni bonus question, mo salah/bener pokoke dapet duit biar level up oawkoakwkoaw, noob u',
        questionText: "Sokap nama rapper fave iqi?",
        questionOptions: [
          "Travis Scott",
            "Drake",
            "Kanye",
            "Iqi himself"
        ],
        correctAnswerId: 3,
        imageUrl: null
      }
    ]
  },
  {
    id: 1,
    rewardPerQuestion: 900,
    cityName: 'Bangkok',
    imageUrl: bangkok,
    description: "Skidi pap pap sawadikap, pap dulu atuh!!!! It means \"welcome to bangkok, we're so excited to see you!\". As you get better in your debating career, you finally get the chance to represent ur uni at World's Universities Trashtalking Championship. It's a tourney where a bunch of white bois beating up native ching-chong people through a not-so intellectual deathmatch. Welp, too bad u're not white, nor a boi, so good luck with that lmao. But this city looks dope if you wanna stroll around. Perhaps you can visit that legendary bridge where u can take photos then use it as all of your social media profile pictures 😏",
    requiredItemDesc: '... or maybe you could just prep your totebag, a nihilist novel, and hang out at a local coffee shop. The love of ur life might be there, sipping a hot chocolate... and ready to bangcock u feel? welp, let\'s find out!',
    quizzes: [
      {
        id: 0,
        authorName: "Kevin Rendra Pratama",
        authorCoolName: "1/2 of Muffin",
        wish: "Hewwo Mut! Happy Birthday yaaa! I really hope today would be very special and very happy for youuu. Thank you so much for being my partner, my friend, and a person that I could always rely on for so much inside & outside debate rounds. Thank you so much juga tahan having me as your partner for so long, and for so many different rounds yah! Semangat for everything you're doing, be it in your academics or even other (such as acoring IVED UWU <3). I honestly think you deserve everything that's coming to your way, you're an amazing debater, judge and friend. I've never been more proud in seeing you shine in everything you do, and I've never had more fun than being your teammate. Semangat selalu, Mut <3",
        questionText: "What is my most favourite non rom-com movie?",
        questionOptions: [
          "Arrival",
          "Star Wars: The Last Jedi",
          "Scott Pilgrim vs The World",
          "Baby Driver"
        ],
        correctAnswerId: 2,
        imageUrl: kevin
      },
      {
        id: 1,
        authorName: "Azka Reyhan P",
        authorCoolName: "Bantul",
        wish: "Happy Birthday Muti ! I wish you all the best for yourself, your carreer and your future. And also i hope you could finish your thesis asap with smooth process !",
        questionText: "What is my favorite pet ?!?",
        questionOptions: [
          "Cat",
          "Rabbit",
          "Fish",
          "Geckos"
        ],
        correctAnswerId: 1,
        imageUrl: azka
      },
      {
        id: 2,
        authorName: "Resty Sutrainy Ayu",
        authorCoolName: "Pici",
        wish: "Hoping that you will be bestowed with happiness all the time🤍! Amazing sister that endeavors everything in an amazing way! Ayo kita dingin2an tangan tapi sambil jalan2! Happy birthday uri baby🤍🤍",
        questionText: "What do I like?",
        questionOptions: [
          "Money",
          "Love"
        ],
        correctAnswerId: 0,
        imageUrl: resty
      },
      {
        id: 3,
        authorName: "Maerel Dhalia Arumnisa",
        authorCoolName: "Diajeng Rahayu Pakubuwono XIII",
        wish: "Happiness is a choice, so choose to be happy even over the smallest things. For every nct content on youtube, for every funny videos on tiktok. I love you so much dearest, happy bornday🍉 jangan lupa makan dan minum air, sounds cliche but your physical well being is important. Dont forget to use sunscreen as well. Semoga selalu dikuatkan dalam setiap langkah menggapai cita cita. Diberi kesehatan dan kesejahteraan,have a blissfull year sayang.",
        questionText: "On my wedding day, what I once requested you to do?",
        questionOptions: [
          "Buy me Michael kors as wedding gift",
          "Dont eat too much",
          "Lets wear a matching headpiece",
          "Sing for me",
        ],
        correctAnswerId: 3,
        imageUrl: mae
      },
      {
        id: 4,
        authorName: "J.A.R.V.I.S",
        authorCoolName: "Anti-noob bot",
        wish: 'hbd y, ni bonus question, mo salah/bener pokoke dapet duit biar level up oawkoakwkoaw, noob u',
        questionText: "Siapa yg paling cakep?",
        questionOptions: [
          "Salma Ache",
          "Mutiara Noverita",
          "Doja Cat",
          "SZA"
        ],
        correctAnswerId: 1,
        imageUrl: null
      }
    ]
  },
  {
    id: 2,
    rewardPerQuestion: 1500,
    cityName: 'Belgrade',
    imageUrl: belgrade,
    description: "If only the last 3 letters of this city was 'ium', I'd definitely give it a visit. Too bad it's Belgrade, not Belgium. Welp, ionno nut'n bout this semi third-world europian city. I mean let's be real, when World's is held in Europe, none of us would expect it to be held in nowhereland such as Belgrade right? But hey, even tho it ain't paris, thank god yain't livin in a parallel universe where there's a global pandemic and yall must compete online (that wudve been sux). ",
    requiredItemDesc: 'There\'s a tourism complex located down town, it looks surprisingly familiar to \'Kota Lama\' in Semarang, you beta check that out before it goes belgraded... (giddit? degrade-belgrade lmao) . Oh yeah, be sure to keep them flashlight on while u use ur camera, cz u dont want the pictures to be broken amirite? 😏',
    quizzes: [
      {
        id: 0,
        authorName: "Haekal Muhammad",
        authorCoolName: "Bekasi",
        wish: "Happy Birthday Muti, may life be nicer and kinder to you. Stay safe and healthy",
        questionText: "What is my favorite food in Tembalang? ",
        questionOptions: [
          "burjo londo",
          "burjo totem",
          "portobello",
          "nasi padang citra bundo",
        ],
        correctAnswerId: 2,
        imageUrl: null
      },
      {
        id: 1,
        authorName: "Adfikri Kevin Marvel",
        authorCoolName: "Adf",
        wish: "Happy birthday, Muti. One of the best of your generation. Happy to see your growth, and well-deserved plaudits coming your way. Many happy returns!",
        questionText: "What's my favourite football team",
        questionOptions: [
          "Arsenal",
          "Liverpool",
          "EDS UI",
          "Tim Pemenangan Nasional"
        ],
        correctAnswerId: 1,
        imageUrl: null
      },
      {
        id: 2,
        authorName: "Salza Nurizki",
        authorCoolName: "Jodoh Sehun",
        wish: "Happy birthday mutiii, panjang umur sehat selalu, bahagia selalu!! Semoga lancar skripsian nya ya mut!! Yuk wisuda bareng yukk, aamiin",
        questionText: "Siapa jodoh sehun??",
        questionOptions: [
          "BTS",
          "Johnny",
          "Seulgi",
          "Suga"
        ],
        correctAnswerId: 3,
        imageUrl: salza
      },
      {
        id: 3,
        authorName: "Alifirza Dafrin Achmad Ichwani",
        authorCoolName: "Rocks D Xebec",
        wish: "Happy birthday mutt, wish you all the best, semangat buat kita (Azka juga) skripsiannya wkwk",
        questionText: "Which football club do i support?",
        questionOptions: [
          "PSIS Semarang",
          "Manchester United",
          "FC Bayern München",
          "Chelsea FC"
        ],
        correctAnswerId: 2,
        imageUrl: alifirza
      },
      {
        id: 4,
        authorName: "J.A.R.V.I.S",
        authorCoolName: "Anti-noob bot",
        wish: 'hbd y, ni bonus question, mo salah/bener pokoke dapet duit biar level up oawkoakwkoaw, noob u',
        questionText: "Rasa Indomie Favorit Iqi?",
        questionOptions: [
          "Original",
          "Rendang",
          "Kari Ayam",
          "Sei Sapi"
        ],
        correctAnswerId: 0,
        imageUrl: null
      }
    ]
  },
  {
    id: 3,
    rewardPerQuestion: 2500,
    cityName: 'Bandung',
    imageUrl: bandung,
    description: "Legend says that this is the Paris of Java Island. Tbh, it kinda lives up to that name. It has a beautiful down-town scenery in Braga with a europian-esque vibe. Offers hundreds, if not, thousands of culinary goods. Because the paris is also well-known for its lovey dovey vibe, this city provides the same thing, you can definitely have one in a local shady villa around the hills. The only puncak that you'll see in this city is puncak kenikmatan. 100% guaranteed!",
    requiredItemDesc: 'Beware of sexual predators! One of them goes by the initial of V.M. (stands for virtual machine yall, chill tf down, go look dasshit up issa computer science term u tech illiterate muggles 😠). Buy one of em Cibaduyut shoez ma fwen, cz we be on a hike!\n',
    quizzes: [
      {
        id: 0,
        authorName: "Maudy Widya Putri",
        authorCoolName: "your admirer since Day1",
        wish: "hai kak, i just want to tell you that you are really amazing! i cant take my eyes from you since the first day I joined UDF! i adore you really much hehe, happiest birthday kak muti!!! all the best for you❤️",
        questionText: "do you think I am an otaku?",
        questionOptions: [
          "yes" ,
          "kinda" ,
          "no" ,
          "definitely"
        ],
        correctAnswerId: 3,
        imageUrl: null
      },
      {
        id: 1,
        authorName: "Maharani Putri Galuh Kaluhuran (gea)",
        authorCoolName: "Stitch",
        wish: "Happy birthday mutiii❤️ Semoga sukses selalu, lancar kuliahnya, langgeng sama iqi, AAMIIN🤲 ",
        questionText: "Bila gajah jadi ayam, lalu singa jadi ayam, dan kambing jadi ayam, maka ayam jadi apa?",
        questionOptions: [
          "Jadi singa",
          "Jadi banyak",
          "Jadi ayam",
          "Jadi siluman"
        ],
        correctAnswerId: 1,
        imageUrl: putrigaluh
      },
      {
        id: 2,
        authorName: "Ex anak asuh nya kak Bella ",
        authorCoolName: "Karpet masjid",
        wish: "Pinter? Iya, humble? Iya, baik hati? Banget sih. Muti tuh definisi paket lengkap deh, yang gue salut dari dia tuh, dia bener2 baik...baik banget orangnya, dia ngucapin birthday personal ke gue, itu pun apresiasi tertinggi gue buat muti, bener2 definisi ndak mau menyakiti atau menyinggung perasaan orang lain, ya itu Muti. Do'a gue buat muti, pokoknya yang terbaik buat Muti, dilancarkan segala urusan oleh Tuhan, di permudah menggapai cita2 nya dan yang terakhir bahagia selalu ya Muti. ",
        questionText: "Tips dan tricks kenapa bisa jadi orang se rajin itu? ",
        questionOptions: [
          "BELAJAR LAH WOEY "
        ],
        correctAnswerId: 0,
        imageUrl: null
      },
      {
        id: 3,
        authorName: "Yusuf Alfat Fauzani",
        authorCoolName: "The Son of Ravenclaw",
        wish: "Happy Birthday Muttiii 💚💜💚💜 Semoga segala cita-cita dan keinginanmu tercapai, Semoga kamu dan keluarga diberikan panjang umur dan kesehatan berlimpah. Semoga dilancarkan segala urusan perkualihan dan perdebatannya yaa. Semoga kita bisa turun lagi dongg wkwk sekalii aja mut, pengen revenge atma open, tp yang quarternya kita gak di dzolimi. Cowok mu keren juga mut, making all of this, semoga langgeng teruss yaa mutt. All in all, I wish you the most of happiness and contentment life can offer ❤",
        questionText: "Who is my favorite boyband?",
        questionOptions: [
          "Westlife",
          "BTS",
          "Backstreet Boys",
          "Bigbang"
        ],
        correctAnswerId: 0,
        imageUrl: alfat
      },
      {
        id: 4,
        authorName: "J.A.R.V.I.S",
        authorCoolName: "Anti-noob bot",
        wish: 'hbd y, ni bonus question, mo salah/bener pokoke dapet duit biar level up oawkoakwkoaw, noob u',
        questionText: "Kenapa parasite menang oscar?",
        questionOptions: [
          "oscar perlu asian reprsentation",
          "directornya nyogok oscar board",
          "hoki",
          "semua benar"
        ],
        correctAnswerId: 3,
        imageUrl: null
      }
    ]
  },
  {
    id: 4,
    rewardPerQuestion: 2500,
    cityName: 'Jakarta',
    imageUrl: jakarta,
    description: "Rampant capitalism, nation's worst air pollution, tons of business districts, beautiful housing with filthy slums around it, fancy cars, gorgeous night lights. If uncle monopoly was a real person, he'd defo buy a home in Jkt. This city is as lively as it is horrifying inside, you can see them rich wannabes be flexing balenciaga sweatshirts but be eating sate pinggir jalan, just to compensate their credit bills.",
    requiredItemDesc: 'But hey, turns out the love of your life has fallen in love with the big durian, almost as much as he\'s in love with you. Having those two combined (because he loves efficiency), he decided to ask you to move in with him to jkt. Get em netflix account aight, skip them lousy ads from pirated websites, yaint broke no more. It\'s time to netflix and chill baby!!!!',
    quizzes: [
      {
        id: 0,
        authorName: "Maudy Widya Putri",
        authorCoolName: "your admirer since Day1",
        wish: "hai kak, i just want to tell you that you are really amazing! i cant take my eyes from you since the first day I joined UDF! i adore you really much hehe, happiest birthday kak muti!!! all the best for you❤️",
        questionText: "do you think I am an otaku?",
        questionOptions: [
          "sans" ,
          "selow" ,
          "buang dalem" ,
          "yauda"
        ],
        correctAnswerId: 3,
        imageUrl: null
      }]
  }
];

export const characterDatabase = [
  {
    id: 0,
    title: 'The Queen 👑',
    imageUrl: queen
  },
  {
    id: 1,
    title: 'The Imaginary Girlfriend 🌈',
    imageUrl: imaginary
  },
  {
    id: 2,
    title: 'The Depressed Leftist ⚒',
    imageUrl: leftist
  },
]

export const itemsDatabase = [
  {
    id: 0,
    name: 'Movie Tix',
    codeName: '🎟 Ticket',
    price: 1000,
    imageUrl: ticketPic
  },
  {
    id: 1,
    name: 'Sakitjiwa Coffee',
    codeName: '☕ Coffee',
    price: 2000,
    imageUrl: coffeePic
  },
  {
    id: 2,
    name: 'Cam Ribettt!',
    codeName: '📷 Camera',
    price: 3600,
    imageUrl: cameraPic
  },
  {
    id: 3,
    name: 'CibaduyutDesGarçons',
    codeName: '👟 Shoes',
    price: 6000,
    imageUrl: cdgPic
  },
  {
    id: 4,
    name: 'Netflix Anti-missqueen',
    codeName: '🎬 Netflix',
    price: 10000,
    imageUrl: netflixPic
  }
];

export const purchaseTextDatabase = [
    "Anjay mo nonton film horror niye, mank brani? 😏",
    "Cie gadapet diskon grab, keduluan pacar ya? 🙏",
    "TuHkaN fLasHliGhtNya rUsaKk!!!!11!!!1! 😫",
    "Cintailah ploduk2 Indonesia 🇮🇩",
    "No netflix chill only 👩‍❤️‍💋‍👨",
]