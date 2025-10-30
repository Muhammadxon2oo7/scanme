interface Question {
  id: string;
  label: string;
  type: string;
  placeholder: string;
}

interface Section {
  title: string;
  questions: Question[];
}

interface Category {
  name: string;
  sections: Record<string, Section>;
}

export const categories: Record<string, Category> = {
  "1": {
    name: "Gadjetlar",
    sections: {
      "1.1": {
        title: "Umumiy ma’lumotlar",
        questions: [
          { id: "1.1.1", label: "Mahsulot nomi va modeli", type: "text", placeholder: "iPhone 13 Pro" },
          { id: "1.1.2", label: "Mahsulot turi (telefon, noutbuk, planshet va h.k.)", type: "text", placeholder: "Smartfon" },
          { id: "1.1.3", label: "Ishlab chiqarilgan mamlakat", type: "text", placeholder: "Xitoy" },
          { id: "1.1.4", label: "Ishlab chiqaruvchi korxona nomi", type: "text", placeholder: "Apple Inc." },
          { id: "1.1.5", label: "Kafolat muddati", type: "text", placeholder: "1 yil" },
          { id: "1.1.6", label: "Xizmat muddati (yil)", type: "text", placeholder: "3 yil" },
        ],
      },
      "1.2": {
        title: "Texnik xususiyatlar",
        questions: [
          { id: "1.2.1", label: "O‘lchamlari (uzunlik, kenglik, qalinlik)", type: "text", placeholder: "146.7 x 71.5 x 7.65 mm" },
          { id: "1.2.2", label: "Og‘irligi", type: "text", placeholder: "204 g" },
          { id: "1.2.3", label: "Batareya sig‘imi (mA/h)", type: "text", placeholder: "3095 mAh" },
          { id: "1.2.4", label: "Quvvati (Watt)", type: "text", placeholder: "20 W" },
          { id: "1.2.5", label: "Energiya sarfi (kWh/soat)", type: "text", placeholder: "0.02 kWh" },
          { id: "1.2.6", label: "Ekran o‘lchami va texnologiyasi", type: "text", placeholder: "6.1 dyuym, OLED" },
          { id: "1.2.7", label: "Protsessor turi va chastotasi", type: "text", placeholder: "A15 Bionic, 3.2 GHz" },
          { id: "1.2.8", label: "Operativ xotira (RAM) hajmi", type: "text", placeholder: "6 GB" },
          { id: "1.2.9", label: "Doimiy xotira (ROM) hajmi", type: "text", placeholder: "128 GB" },
          { id: "1.2.10", label: "Operatsion tizim", type: "text", placeholder: "iOS 15" },
          { id: "1.2.11", label: "Kamera ko‘rsatkichlari (MP)", type: "text", placeholder: "12 MP + 12 MP" },
          { id: "1.2.12", label: "Yangi texnologiyalar (AI, IoT, 5G) qo‘llanganmi?", type: "text", placeholder: "Ha, 5G, AI" },
        ],
      },
      "1.3": {
        title: "Material va ekologiya",
        questions: [
          { id: "1.3.1", label: "Materiallar (plastik, alyuminiy va h.k.)", type: "text", placeholder: "Alyuminiy, shisha" },
          { id: "1.3.2", label: "Qadoqlash materiali va qayta ishlash imkoniyati", type: "text", placeholder: "Qayta ishlangan karton" },
          { id: "1.3.3", label: "Qayta ishlash imkoniyatlari (batareya, plastmassa)", type: "text", placeholder: "Batareya qayta ishlanadi" },
        ],
      },
      "1.4": {
        title: "Standartlashtirish va sifat nazorati",
        questions: [
          { id: "1.4.1", label: "Sertifikatlari (ISO, CE, RoHS va b.)", type: "text", placeholder: "CE, RoHS" },
          { id: "1.4.2", label: "Maxsus xavfsizlik sertifikati mavjudmi?", type: "text", placeholder: "Ha, FCC" },
          { id: "1.4.3", label: "Saqlash va ishlatish bo‘yicha yo‘riqnomasi", type: "text", placeholder: "Qo‘llanmada keltirilgan" },
          { id: "1.4.4", label: "Ta’mirlash imkoniyati (zaxira qismlar mavjudligi)", type: "text", placeholder: "Zaxira qismlar mavjud" },
        ],
      },
    },
  },
"2": {
    name: "Maishiy texnika",
    sections: {
      "2.1": {
        title: "Umumiy ma’lumotlar",
        questions: [
          { id: "2.1.1", label: "Mahsulot nomi (masalan: kir yuvish mashinasi)", type: "text", placeholder: "LG Kir yuvish mashinasi" },
          { id: "2.1.2", label: "Modeli", type: "text", placeholder: "F4V5VYP0W" },
          { id: "2.1.3", label: "O‘lchami", type: "text", placeholder: "60 x 56 x 85 cm" },
          { id: "2.1.4", label: "Og‘irligi", type: "text", placeholder: "70 kg" },
          { id: "2.1.5", label: "Ishlab chiqaruvchi mamlakat", type: "text", placeholder: "Janubiy Koreya" },
          { id: "2.1.6", label: "Ishlab chiqaruvchi korxona nomi", type: "text", placeholder: "LG Electronics" },
          { id: "2.1.7", label: "Kafolat muddati", type: "text", placeholder: "2 yil" },
          { id: "2.1.8", label: "Xizmat muddati (yil)", type: "text", placeholder: "10 yil" },
        ],
      },
      "2.2": {
        title: "Texnik xususiyatlar",
        questions: [
          { id: "2.2.1", label: "Quvvati (Watt)", type: "text", placeholder: "2100 W" },
          { id: "2.2.2", label: "Elektr ta’minoti (220V/110V)", type: "text", placeholder: "220 V" },
          { id: "2.2.3", label: "Energiya samaradorligi (A++, A+ va h.k.)", type: "text", placeholder: "A+++" },
          { id: "2.2.4", label: "Energiya sarfi (yiliga kWh)", type: "text", placeholder: "150 kWh" },
          { id: "2.2.5", label: "Suv sarfi (yiliga litr)", type: "text", placeholder: "9000 litr" },
          { id: "2.2.6", label: "Shovqin darajasi (dB)", type: "text", placeholder: "53 dB" },
          { id: "2.2.7", label: "Foydalanish qulayligi (avtomatik rejimlar)", type: "text", placeholder: "14 ta avto-rejim" },
          { id: "2.2.8", label: "Maxsus xavfsizlik funksiyalari (bolalardan himoya va h.k.)", type: "text", placeholder: "Bolalardan himoya" },
        ],
      },
      "2.3": {
        title: "Material va ekologiya",
        questions: [
          { id: "2.3.1", label: "Materiali (po‘lat, plastmassa, shisha)", type: "text", placeholder: "Zanglamaydigan po‘lat" },
          { id: "2.3.2", label: "Qadoqlash turi", type: "text", placeholder: "Karton va plastmassa" },
          { id: "2.3.3", label: "Qayta ishlash imkoniyati (metall/plastik ajratilishi)", type: "text", placeholder: "Metall qayta ishlanadi" },
        ],
      },
      "2.4": {
        title: "Standartlashtirish va sifat nazorati",
        questions: [
          { id: "2.4.1", label: "Zaxira qismlar mavjudligi", type: "text", placeholder: "Mavjud" },
          { id: "2.4.2", label: "Ta’mirlash bo‘yicha yo‘riqnomasi", type: "text", placeholder: "Qo‘llanmada keltirilgan" },
          { id: "2.4.3", label: "Saqlash sharoiti", type: "text", placeholder: "Quruq joyda" },
          { id: "2.4.4", label: "Sertifikatlari (ISO, CE, Energy Star)", type: "text", placeholder: "CE, Energy Star" },
        ],
      },
    },
  },
  "3": {
    name: "Kiyim-kechak",
    sections: {
      "3.1": {
        title: "Umumiy ma’lumotlar",
        questions: [
          { id: "3.1.1", label: "Mahsulot nomi (masalan: erkaklar ko‘ylagi)", type: "text", placeholder: "Erkaklar ko‘ylagi" },
          { id: "3.1.2", label: "Kiyim turi (ko‘ylak, shim, poyabzal va h.k.)", type: "text", placeholder: "Ko‘ylak" },
          { id: "3.1.3", label: "O‘lchami (S, M, L, XL)", type: "text", placeholder: "M" },
          { id: "3.1.4", label: "Og‘irligi", type: "text", placeholder: "300 g" },
          { id: "3.1.5", label: "Rang", type: "text", placeholder: "Ko‘k" },
          { id: "3.1.6", label: "Ishlab chiqarilgan joyi", type: "text", placeholder: "Turkiya" },
          { id: "3.1.7", label: "Ishlab chiqaruvchi nomi", type: "text", placeholder: "Zara" },
          { id: "3.1.8", label: "Ishlab chiqarilgan sana", type: "text", placeholder: "2023-05" },
          { id: "3.1.9", label: "Dizayner yoki brend nomi", type: "text", placeholder: "Zara" },
          { id: "3.1.10", label: "Modaga oid qo‘shimcha ma’lumot (kolleksiya nomi)", type: "text", placeholder: "Yozgi kolleksiya 2023" },
        ],
      },
      "3.2": {
        title: "Material va sifat",
        questions: [
          { id: "3.2.1", label: "Asosiy material (paxta, polyester, jun)", type: "text", placeholder: "100% paxta" },
          { id: "3.2.2", label: "Material foizi (masalan: 80% paxta, 20% polyester)", type: "text", placeholder: "80% paxta, 20% polyester" },
          { id: "3.2.3", label: "Maxsus ishlov (antibakterial, suv o‘tkazmaydigan)", type: "text", placeholder: "Antibakterial" },
          { id: "3.2.4", label: "Sertifikat (Oeko-Tex, organik)", type: "text", placeholder: "Oeko-Tex" },
          { id: "3.2.5", label: "Maxsus ekologik belgi (eko-paxta va h.k.)", type: "text", placeholder: "Eko-paxta" },
        ],
      },
      "3.3": {
        title: "Foydalanish va saqlash",
        questions: [
          { id: "3.3.1", label: "Yuvish bo‘yicha yo‘riqnoma", type: "text", placeholder: "30°C da mashinada yuvish" },
          { id: "3.3.2", label: "Daftarlash (dazmollash) bo‘yicha yo‘riqnoma", type: "text", placeholder: "O‘rtacha haroratda dazmollash" },
          { id: "3.3.3", label: "Qadoqlash materiali", type: "text", placeholder: "Qog‘oz sumka" },
          { id: "3.3.4", label: "Saqlash muddati", type: "text", placeholder: "Cheklanmagan" },
          { id: "3.3.5", label: "Xizmat muddati (yil/oy)", type: "text", placeholder: "2 yil" },
        ],
      },
      "3.4": {
        title: "Ekologiya va qayta ishlash",
        questions: [
          { id: "3.4.1", label: "Qayta ishlash imkoniyati (matoni qayta ishlash)", type: "text", placeholder: "Mato qayta ishlanadi" },
        ],
      },
    },
  },
  "4": {
    name: "Oziq-ovqat",
    sections: {
      "4.1": {
        title: "Umumiy ma’lumotlar",
        questions: [
          { id: "4.1.1", label: "Mahsulot nomi", type: "text", placeholder: "Sut" },
          { id: "4.1.2", label: "Mahsulot turi (ichimlik, quruq mahsulot, konservalar)", type: "text", placeholder: "Ichimlik" },
          { id: "4.1.3", label: "Og‘irligi / hajmi", type: "text", placeholder: "1 litr" },
          { id: "4.1.4", label: "Ishlab chiqarilgan sana", type: "text", placeholder: "2023-10-01" },
          { id: "4.1.5", label: "Yaroqlilik muddati", type: "text", placeholder: "30 kun" },
          { id: "4.1.6", label: "Saqlash muddati", type: "text", placeholder: "30 kun, +4°C" },
          { id: "4.1.7", label: "Narx segmenti", type: "text", placeholder: "O‘rta" },
          { id: "4.1.8", label: "Yetkazib beruvchi nomi", type: "text", placeholder: "Nestlé" },
          { id: "4.1.9", label: "Ishlab chiqaruvchi nomi", type: "text", placeholder: "Nestlé" },
          { id: "4.1.10", label: "Ishlab chiqarilgan mamlakat", type: "text", placeholder: "Shveytsariya" },
        ],
      },
      "4.2": {
        title: "Tarkib va oziqlanish qiymati",
        questions: [
          { id: "4.2.1", label: "Tarkibi (ingredientlar)", type: "text", placeholder: "Sut, D vitamini" },
          { id: "4.2.2", label: "Energiya qiymati (kcal, protein, yog‘, uglevod)", type: "text", placeholder: "60 kcal, 3g protein, 2g yog‘" },
          { id: "4.2.3", label: "Allergiya haqida ogohlantirish", type: "text", placeholder: "Sut allergiyasi" },
          { id: "4.2.4", label: "Maxsus tamg‘a (Gluten-free, Vegan)", type: "text", placeholder: "Gluten-free" },
          { id: "4.2.5", label: "Ekologik iz (organik yoki yo‘q)", type: "text", placeholder: "Organik" },
        ],
      },
      "4.3": {
        title: "Saqlash va qadoqlash",
        questions: [
          { id: "4.3.1", label: "Saqlash sharoiti", type: "text", placeholder: "+2°C dan +6°C gacha" },
          { id: "4.3.2", label: "Qadoqlash materiali", type: "text", placeholder: "Karton quti" },
          { id: "4.3.3", label: "Qadoqlash qayta ishlanishi mumkinmi?", type: "text", placeholder: "Ha, qayta ishlanadi" },
        ],
      },
      "4.4": {
        title: "Standartlashtirish va sifat nazorati",
        questions: [
          { id: "4.4.1", label: "Sertifikatlar (Halal, HACCP, ISO 22000)", type: "text", placeholder: "Halal, ISO 22000" },
        ],
      },
    },
  },
  "5": {
    name: "Qurilish va ta’mirlash",
    sections: {
      "5.1": {
        title: "Umumiy ma’lumotlar",
        questions: [
          { id: "5.1.1", label: "Mahsulot nomi (g‘isht, sement, bo‘yoq, kabel)", type: "text", placeholder: "Sement" },
          { id: "5.1.2", label: "O‘lchami / hajmi", type: "text", placeholder: "50 kg" },
          { id: "5.1.3", label: "Og‘irligi", type: "text", placeholder: "50 kg" },
          { id: "5.1.4", label: "Ishlab chiqaruvchi nomi", type: "text", placeholder: "Lafarge" },
          { id: "5.1.5", label: "Ishlab chiqarilgan mamlakat", type: "text", placeholder: "Fransiya" },
          { id: "5.1.6", label: "Saqlash muddati", type: "text", placeholder: "6 oy" },
        ],
      },
      "5.2": {
        title: "Texnik xususiyatlar",
        questions: [
          { id: "5.2.1", label: "Tarkibiy materiallari", type: "text", placeholder: "Klinker, gips" },
          { id: "5.2.2", label: "Mustahkamlik ko‘rsatkichi", type: "text", placeholder: "M500" },
          { id: "5.2.3", label: "Suvga chidamliligi", type: "text", placeholder: "Yuqori" },
          { id: "5.2.4", label: "Issiqlikka chidamliligi", type: "text", placeholder: "O‘rtacha" },
          { id: "5.2.5", label: "Yonuvchanlik darajasi", type: "text", placeholder: "Yonmaydi" },
          { id: "5.2.6", label: "Foydalanish sohasi (ichki, tashqi)", type: "text", placeholder: "Ichki va tashqi" },
          { id: "5.2.7", label: "Ta’mirlash uchun moslik", type: "text", placeholder: "Mos" },
          
        ],
      },
      "5.3": {
        title: "Saqlash va ekologiya",
        questions: [
          { id: "5.3.1", label: "Saqlash sharoiti", type: "text", placeholder: "Quruq joyda" },
          { id: "5.3.2", label: "Qadoqlash turi", type: "text", placeholder: "Qog‘oz qop" },
          { id: "5.3.3", label: "Qayta ishlash imkoniyati", type: "text", placeholder: "Qisman qayta ishlanadi" },
          { id: "5.3.4", label: "Ekologik xavfsizlik ko‘rsatkichi", type: "text", placeholder: "Ekologik toza" },
        ],
      },
      "5.4": {
        title: "Sifat nazorati",
        questions: [
          { id: "5.4.1", label: "Sertifikat (O‘zstandart, ISO, EN)", type: "text", placeholder: "ISO 9001" },
        ],
      },
    },
  },
  "6": {
    name: "Aksessuarlar",
    sections: {
      "6.1": {
        title: "Umumiy ma’lumotlar",
        questions: [
          { id: "6.1.1", label: "Mahsulot nomi (soat, sumka, taqinchoq va b.)", type: "text", placeholder: "Soat" },
          { id: "6.1.2", label: "Modeli", type: "text", placeholder: "Classic Watch" },
          { id: "6.1.3", label: "O‘lchami", type: "text", placeholder: "40 mm" },
          { id: "6.1.4", label: "Og‘irligi", type: "text", placeholder: "50 g" },
          { id: "6.1.5", label: "Rang", type: "text", placeholder: "Kumush" },
          { id: "6.1.6", label: "Ishlab chiqaruvchi nomi", type: "text", placeholder: "Rolex SA" },
          { id: "6.1.7", label: "Ishlab chiqarilgan mamlakat", type: "text", placeholder: "Shveytsariya" },
          { id: "6.1.8", label: "Xizmat muddati", type: "text", placeholder: "10 yil" },
        ],
      },
      "6.2": {
        title: "Material va dizayn",
        questions: [
          { id: "6.2.1", label: "Materiali (teri, metal, plastmassa, qimmatbaho tosh)", type: "text", placeholder: "Zanglamaydigan po‘lat" },
          { id: "6.2.2", label: "Dizayn uslubi (klassik, sport, zamonaviy)", type: "text", placeholder: "Klassik" },
          { id: "6.2.3", label: "Maxsus funksiya (soat uchun: suv o‘tkazmaslik, smart-funktsiya)", type: "text", placeholder: "Suv o‘tkazmaydi, 50 m" },
        ],
      },
      "6.3": {
        title: "Saqlash va qayta ishlash",
        questions: [
          { id: "6.3.1", label: "Qadoqlash materiali", type: "text", placeholder: "Qattiq karton quti" },
          { id: "6.3.2", label: "Qayta ishlash imkoniyati", type: "text", placeholder: "Qisman qayta ishlanadi" },
          { id: "6.3.3", label: "Saqlash sharoiti", type: "text", placeholder: "Quruq joyda" },
        ],
      },
      "6.4": {
        title: "Standartlashtirish va sifat nazorati",
        questions: [
          { id: "6.4.1", label: "Sertifikat (agar taqinchoq bo‘lsa, oltin/proba)", type: "text", placeholder: "COSC sertifikati" },
          { id: "6.4.2", label: "Ta’mirlash imkoniyati (zaxira qismlar mavjudligi)", type: "text", placeholder: "Zaxira qismlar mavjud" },
        ],
      },
    },
  },
  "7": {
    name: "Salomatlik",
    sections: {
      "7.1": {
        title: "Umumiy ma’lumotlar",
        questions: [
          { id: "7.1.1", label: "Mahsulot nomi (masalan: tibbiy asbob, vitamin)", type: "text", placeholder: "Vitamin C" },
          { id: "7.1.2", label: "Mahsulot turi (dori, jihoz, qo‘shimcha)", type: "text", placeholder: "Oziq-ovqat qo‘shimchasi" },
          { id: "7.1.3", label: "Og‘irligi / hajmi", type: "text", placeholder: "100 g" },
          { id: "7.1.4", label: "Ishlab chiqaruvchi nomi", type: "text", placeholder: "Now Foods" },
          { id: "7.1.5", label: "Ishlab chiqarilgan mamlakat", type: "text", placeholder: "AQSh" },
          { id: "7.1.6", label: "Saqlash muddati", type: "text", placeholder: "2 yil" },
          { id: "7.1.7", label: "Kafolat muddati (jihozlar uchun)", type: "text", placeholder: "Yo‘q" },
        ],
      },
      "7.2": {
        title: "Tarkib va qo‘llash",
        questions: [
          { id: "7.2.1", label: "Tarkibi (ingredientlar, faol moddalar)", type: "text", placeholder: "Askorbin kislotasi" },
          { id: "7.2.2", label: "Foydalanish ko‘rsatmalari", type: "text", placeholder: "Kuniga 1 tabletka" },
          { id: "7.2.3", label: "Qarshi ko‘rsatmalar (kontraindikatsiya)", type: "text", placeholder: "Allergiya bo‘lsa qabul qilinmaydi" },
          { id: "7.2.4", label: "Dozalash shakli (tabletka, kapsula, eritma)", type: "text", placeholder: "Tabletka" },
          { id: "7.2.5", label: "Qanday hollarda foydalaniladi", type: "text", placeholder: "Ovqat hazm qilish buzilishi" },
        ],
      },
      "7.3": {
        title: "Saqlash va qadoqlash",
        questions: [
          { id: "7.3.1", label: "Saqlash sharoiti", type: "text", placeholder: "Quruq, salqin joyda" },
          { id: "7.3.2", label: "Qadoqlash materiali", type: "text", placeholder: "Plastik idish" },
          { id: "7.3.3", label: "Qayta ishlash imkoniyati", type: "text", placeholder: "Plastik qayta ishlanadi" },
        ],
      },
      "7.4": {
        title: "Standartlashtirish va sifat nazorati",
        questions: [
          { id: "7.4.1", label: "Sertifikat (ISO, GMP, FDA)", type: "text", placeholder: "GMP, FDA" },
        ],
      },
    },
  },
  "8": {
    name: "Uy-ro‘zg‘or buyumlari",
    sections: {
      "8.1": {
        title: "Umumiy ma’lumotlar",
        questions: [
          { id: "8.1.1", label: "Mahsulot nomi (idish-tovoq, tozalash vositasi, gilam)", type: "text", placeholder: "Tovoq" },
          { id: "8.1.2", label: "Mahsulot turi", type: "text", placeholder: "Idish-tovoq" },
          { id: "8.1.3", label: "O‘lcham", type: "text", placeholder: "25 cm diametr" },
          { id: "8.1.4", label: "Og‘irligi", type: "text", placeholder: "500 g" },
          { id: "8.1.5", label: "Rang", type: "text", placeholder: "O‘q" },
          { id: "8.1.6", label: "Ishlab chiqaruvchi nomi", type: "text", placeholder: "IKEA" },
          { id: "8.1.7", label: "Ishlab chiqarilgan mamlakat", type: "text", placeholder: "Shvetsiya" },
          { id: "8.1.8", label: "Xizmat muddati", type: "text", placeholder: "5 yil" },
        ],
      },
      "8.2": {
        title: "Material va sifat",
        questions: [
          { id: "8.2.1", label: "Materiali (plastik, metall, keramika, mato)", type: "text", placeholder: "Keramika" },
          { id: "8.2.2", label: "Mustahkamlik darajasi ", type: "text", placeholder: "mustahkam" },
        ],
      },
      "8.3": {
        title: "Saqlash va qayta ishlash",
        questions: [
          { id: "8.3.1", label: "Qadoqlash materiali", type: "text", placeholder: "Karton quti" },
          { id: "8.3.2", label: "Qayta ishlash imkoniyati", type: "text", placeholder: "Qayta ishlanadi" },
          { id: "8.3.3", label: "Saqlash yo‘riqnomasi", type: "text", placeholder: "Quruq joyda" },
        ],
      },
      "8.4": {
        title: "Foydalanish va xavfsizlik",
        questions: [
          { id: "8.4.1", label: "Sertifikat (eko-sertifikat)", type: "text", placeholder: "Eko-sertifikat mavjud" },
          { id: "8.4.2", label: "Ta’mirlash imkoniyati (mebel uchun)", type: "text", placeholder: "Yo‘q" },
        ],
      },
    },
  },
  "9": {
    name: "Kanselyariya",
    sections: {
      "9.1": {
        title: "Umumiy ma’lumotlar",
        questions: [
          { id: "9.1.1", label: "Mahsulot nomi (ruchka, daftar, marker)", type: "text", placeholder: "Ruchka" },
          { id: "9.1.2", label: "Mahsulot turi", type: "text", placeholder: "Sharchikli ruchka" },
          { id: "9.1.3", label: "O‘lchami / hajmi", type: "text", placeholder: "14 cm" },
          { id: "9.1.4", label: "Og‘irligi", type: "text", placeholder: "10 g" },
          { id: "9.1.5", label: "Rangi", type: "text", placeholder: "Qora" },
          { id: "9.1.6", label: "Ishlab chiqaruvchi nomi", type: "text", placeholder: "BIC" },
          { id: "9.1.7", label: "Ishlab chiqarilgan mamlakat", type: "text", placeholder: "Fransiya" },
          { id: "9.1.8", label: "Foydalanish muddati", type: "text", placeholder: "1 yil" },
          { id: "9.1.9", label: "Narx segmenti", type: "text", placeholder: "Arzon" },
        ],
      },
      "9.2": {
        title: "Material va sifat",
        questions: [
          { id: "9.2.1", label: "Materiali (plastik, qog‘oz, metall)", type: "text", placeholder: "Plastik" },
          { id: "9.2.2", label: "Sifat_darajasi", type: "text", placeholder: "o'rta" },
        ],
      },
      "9.3": {
        title: "Saqlash va ekologiya",
        questions: [
          { id: "9.3.1", label: "Qadoqlash turi", type: "text", placeholder: "Plastik qadoq" },
          { id: "9.3.2", label: "Qayta ishlash imkoniyati", type: "text", placeholder: "Qayta ishlanadi" },
          { id: "9.3.3", label: "Saqlash sharoiti", type: "text", placeholder: "Quruq joyda" },
        ],
      },
      "9.4": {
        title: "Standartlashtirish va sifat nazorati",
        questions: [
          { id: "9.4.1", label: "Sertifikat (eko-qog‘oz, FSC)", type: "text", placeholder: "FSC" },
          { id: "9.4.3", label: "Ekologik xavfsizlik belgilari", type: "text", placeholder: "Eko-sertifikat" },
        ],
      },
    },
  },
};