import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const townShipArr = [
  {
    eng: 'Tamwe',
    mm: 'တာမွေ',
  },
  {
    eng: 'South Okkalapa',
    mm: 'တောင်ဥက္ကလာပ',
  },
  {
    eng: 'Dagon Seikkan',
    mm: 'ဒဂုံမြို့သစ်-ဆိပ်ကမ်း',
  },
  {
    eng: 'South Dagon',
    mm: 'ဒဂုံမြို့သစ်-တောင်ပိုင်း',
  },
  {
    eng: 'North Dagon',
    mm: 'ဒဂုံမြို့သစ်-မြောက်ပိုင်း',
  },
  {
    eng: 'East Dagon',
    mm: 'ဒဂုံမြို့သစ်-အရှေ့ပိုင်း',
  },
  {
    eng: 'Dawbon',
    mm: 'ဒေါပုံ',
  },
  {
    eng: 'Pazundaung',
    mm: 'ပုဇွန်တောင်',
  },
  {
    eng: 'Botataung',
    mm: 'ဗိုလ်တထောင်',
  },
  {
    eng: 'Mingala Taungnyunt',
    mm: 'မင်္ဂလာတောင်ညွန့်',
  },
  {
    eng: 'North Okkalapa',
    mm: 'မြောက်ဥက္ကလာပ',
  },
  {
    eng: 'Yankin',
    mm: 'ရန်ကင်း',
  },
  {
    eng: 'Thingangyun',
    mm: 'သင်္ဃန်းကျွန်း',
  },
  {
    eng: 'Thaketa',
    mm: 'သာကေတ',
  },

  {
    eng: 'Taikkyi',
    mm: 'တိုက်ကြီး',
  },
  {
    eng: 'Htantabin',
    mm: 'ထန်းတပင်',
  },
  {
    eng: 'Mingaladon',
    mm: 'မင်္ဂလာဒုံ',
  },
  {
    eng: 'Hmawbi',
    mm: 'မှော်ဘီ',
  },
  {
    eng: 'Shwepyitha',
    mm: 'ရွှေပြည်သာ',
  },
  {
    eng: 'Hlegu',
    mm: 'လှည်းကူး',
  },
  {
    eng: 'Hlaingthaya',
    mm: 'လှိုင်သာယာ',
  },
  {
    eng: 'Insein',
    mm: 'အင်းစိန်',
  },

  {
    eng: 'Kyauktan',
    mm: 'ကျောက်တန်း',
  },
  {
    eng: 'Kungyangon',
    mm: 'ကွမ်းခြံကုန်း',
  },
  {
    eng: 'Cocokyun',
    mm: 'ကိုကိုးကျွန်း',
  },
  {
    eng: 'Kawhmu',
    mm: 'ကော့မှူး',
  },
  {
    eng: 'Kayan',
    mm: 'ခရမ်း',
  },
  {
    eng: 'SeikkyiKanaungto',
    mm: 'ဆိပ်ကြီးခနောင်တို',
  },
  {
    eng: 'Twante',
    mm: 'တွံတေး',
  },
  {
    eng: 'Dala',
    mm: 'ဒလ',
  },
  {
    eng: 'Thanlyin',
    mm: 'သန်လျင်',
  },
  {
    eng: 'Thongwa',
    mm: 'သုံးခွ',
  },

  {
    eng: 'Kamayut',
    mm: 'ကမာရွတ်',
  },
  {
    eng: 'Kyauktada',
    mm: 'ကျောက်တံတား',
  },
  {
    eng: 'Kyimyindaing',
    mm: 'ကြည့်မြင်တိုင်',
  },
  {
    eng: 'Sanchaung',
    mm: 'စမ်းချောင်း',
  },
  {
    eng: 'Dagon',
    mm: 'ဒဂုံ',
  },
  {
    eng: 'Pabedan',
    mm: 'ပန်းဘဲတန်း',
  },
  {
    eng: 'Bahan',
    mm: 'ဗဟန်း',
  },
  {
    eng: 'Mayangon',
    mm: 'မရမ်းကုန်း',
  },
  {
    eng: 'Lanmadaw',
    mm: 'လမ်းမတော်',
  },
  {
    eng: 'Latha',
    mm: 'လသာ',
  },
  {
    eng: 'Hlaing',
    mm: 'လှိုင်',
  },
  {
    eng: 'Ahlon',
    mm: 'အလုံ',
  },
];

const main = async () => {
  console.log('start seeding');

  console.log('seeding township');
  for (let i = 0; i < townShipArr.length; i++) {
    await prisma.townShip.createMany({
      data: {
        engName: townShipArr[i].eng,
        MMName: townShipArr[i].mm,
      },
      skipDuplicates: true,
    });
  }
  console.log('township seeded!');
  console.log('seeding finished');
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
