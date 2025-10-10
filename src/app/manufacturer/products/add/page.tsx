"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Sidebar } from "@/src/components/manufacturer/Sidebar"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardHeader } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Menu, Building2, CheckCircle, Upload, ChevronDown } from "lucide-react"
import { ProfileImageUploader } from "@/src/components/manufacturer/dashboard/profile/ProfileImageUploader"

interface Question {
  id: string;
  label: string;
  type: string;
  placeholder:string;
}

interface Section {
  title: string;
  questions: Question[];
}

interface Category {
  name: string;
  sections: Record<string, Section>;
}


const categories: Record<string, Category> = {
  
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
          { id: "5.1.7", label: "Narx segmenti (premium, o‘rta, arzon)", type: "text", placeholder: "O‘rta" },
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
          { id: "5.2.8", label: "Rang / dizayn variantlari", type: "text", placeholder: "Kulrang" },
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
        title: "Standartlashtirish va sifat nazorati",
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
          { id: "6.1.6", label: "Brend nomi", type: "text", placeholder: "Rolex" },
          { id: "6.1.7", label: "Ishlab chiqaruvchi nomi", type: "text", placeholder: "Rolex SA" },
          { id: "6.1.8", label: "Ishlab chiqarilgan mamlakat", type: "text", placeholder: "Shveytsariya" },
          { id: "6.1.9", label: "Kafolat muddati", type: "text", placeholder: "2 yil" },
          { id: "6.1.10", label: "Xizmat muddati", type: "text", placeholder: "10 yil" },
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
          { id: "7.2.5", label: "Yon ta’sirlar ro‘yxati", type: "text", placeholder: "Ovqat hazm qilish buzilishi" },
          { id: "7.2.6", label: "Maxsus ogohlantirishlar (homilador ayollar, bolalar)", type: "text", placeholder: "Homiladorlar uchun maslahat talab qilinadi" },
          { id: "7.2.7", label: "Klinik sinov ma’lumotlari", type: "text", placeholder: "Sinovdan o‘tgan" },
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
          { id: "7.4.2", label: "Ta’mirlash imkoniyati (tibbiy qurilma bo‘lsa)", type: "text", placeholder: "Yo‘q" },
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
          { id: "8.1.8", label: "Saqlash muddati", type: "text", placeholder: "Cheklanmagan" },
          { id: "8.1.9", label: "Xizmat muddati", type: "text", placeholder: "5 yil" },
          { id: "8.1.10", label: "Narx segmenti", type: "text", placeholder: "O‘rta" },
        ],
      },
      "8.2": {
        title: "Material va sifat",
        questions: [
          { id: "8.2.1", label: "Materiali (plastik, metall, keramika, mato)", type: "text", placeholder: "Keramika" },
          { id: "8.2.2", label: "Ekologik ta’sir (zaharli moddalar mavjudligi)", type: "text", placeholder: "Zaharli moddalar yo‘q" },
        ],
      },
      "8.3": {
        title: "Saqlash va qayta ishlash",
        questions: [
          { id: "8.3.1", label: "Qadoqlash materiali", type: "text", placeholder: "Karton quti" },
          { id: "8.3.2", label: "Qayta ishlash imkoniyati", type: "text", placeholder: "Qayta ishlanadi" },
          { id: "8.3.3", label: "Saqlash sharoiti", type: "text", placeholder: "Quruq joyda" },
        ],
      },
      "8.4": {
        title: "Foydalanish va xavfsizlik",
        questions: [
          { id: "8.4.1", label: "Sertifikat (eko-sertifikat)", type: "text", placeholder: "Eko-sertifikat mavjud" },
          { id: "8.4.2", label: "Ta’mirlash imkoniyati (mebel uchun)", type: "text", placeholder: "Yo‘q" },
          { id: "8.4.3", label: "Foydalanish yo‘riqnomasi", type: "text", placeholder: "Idish yuvish mashinasida yuviladi" },
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
        title: "Material va funksiya",
        questions: [
          { id: "9.2.1", label: "Materiali (plastik, qog‘oz, metall)", type: "text", placeholder: "Plastik" },
          { id: "9.2.2", label: "Maxsus funksiya (masalan: o‘chiriladigan ruchka)", type: "text", placeholder: "Oddiy yozuv" },
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
          { id: "9.4.2", label: "Zaharli moddalar mavjudligi yoki yo‘qligi", type: "text", placeholder: "Zaharli moddalar yo‘q" },
          { id: "9.4.3", label: "Ekologik xavfsizlik belgilari", type: "text", placeholder: "Eko-sertifikat" },
        ],
      },
    },
  },
}
export default function AddProductPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [openSections, setOpenSections] = useState<Set<string>>(new Set())
  const [suppliers, setSuppliers] = useState<Record<string, string>>({}) 
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) setIsSidebarOpen(true)
      else setIsSidebarOpen(false)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleInputChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleImageChange = (_file: File | null, base64: string | null) => {
    if (base64) setFormData((prev) => ({ ...prev, image: base64 }))
  }

  const handleSubmit = () => {
    if (!selectedCategory) return;

    const categoryName = categories[selectedCategory].name;
    const productName = formData["1.1.1"] || "Noma'lum mahsulot"; // Birinchi savol - mahsulot nomi

    const newProduct = {
      id: Date.now().toString(),
      name: productName,
      category: categoryName,
      categoryKey: selectedCategory, // Kategoriya kalitini saqlash
      scans: 0,
      rating: 0,
      status: "in-progress" as const, // Yangi mahsulot "to'ldirilmoqda" statusida
      details: { ...formData },
      suppliers,
      image: formData.image || "/default-avatar.png",
    };

    // LocalStorage ga saqlash
    const existingProducts = JSON.parse(localStorage.getItem("manufacturerProducts") || "[]");
    existingProducts.push(newProduct);
    localStorage.setItem("manufacturerProducts", JSON.stringify(existingProducts));

    console.log("Yuborilgan ma'lumotlar:", formData)
    console.log("ta'minotchi lar:", suppliers)
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(sectionId)) newSet.delete(sectionId)
      else newSet.add(sectionId)
      return newSet
    })
  }

  const handleSupplierChange = (questionId: string, value: string) => {
    setSuppliers((prev) => ({ ...prev, [questionId]: value }))
  }

  const isSupplierSection = (sectionId: string) => {
    return !["1.1", "1.2","2.1","2.2","3.1","3.2","4.1","4.2","5.1","5.2","6.1","6.2","7.1","7.2","8.1","8.2","9.1","9.2"].includes(sectionId)
  }

  const isInputEnabled = (questionId: string) => {
    const supplier = suppliers[questionId];
    return !supplier || supplier === "Supplier1"; // Bo'sh yoki "O'zim" bo'lsa enabled
  }

  return (
    <div className=" bg-gradient-to-br  flex">
 
        <main className="w-full md:p-8">
          <div className="container mx-auto space-y-6  overflow-y-auto">
            <div>
              <h1 className="text-4xl font-semibold text-balance tracking-tight text-gray-800">
                Yangi Mahsulot Qo‘shish
              </h1>
              <p className="text-gray-600 mt-2 text-base">
                Yangi mahsulot ma'lumotlarini kiriting
              </p>
            </div>

            <Card className="p-6 bg-gradient-to-br from-white to-blue-50/80 backdrop-blur-md border border-blue-200/50 shadow-lg">
              {isSubmitted && (
                <div className="flex items-center gap-2 p-4 mb-6 bg-green-100/70 rounded-lg border border-green-200/50">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <p className="text-sm text-green-700">
                    Mahsulot qo‘shildi va QR kod avtomatik generatsiya qilindi!
                  </p>
                </div>
              )}
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-gray-700 font-medium">
                    Kategoriya
                  </Label>
                  <Select
                    onValueChange={(value) => {
                      setSelectedCategory(value)
                      setFormData({})
                      setOpenSections(new Set())
                      setSuppliers({})
                    }}
                    value={selectedCategory || ""}
                  >
                    <SelectTrigger className="border-blue-200 focus:ring-blue-400 transition-all duration-200 bg-white/80">
                      <SelectValue placeholder="Kategoriyani tanlang" />
                    </SelectTrigger>
                    <SelectContent className="bg-white shadow-md">
                      {Object.entries(categories).map(([key, category]) => (
                        <SelectItem key={key} value={key} className="hover:bg-blue-50">
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedCategory && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="image" className="text-gray-700 font-medium">
                        Mahsulot Rasmi
                      </Label>
                      <ProfileImageUploader
                        onImageChange={handleImageChange}
                        currentImage={formData.image || "/default-avatar.png"}
                        isEditing={true}
                      />
                    </div>
                    {Object.entries(categories[selectedCategory].sections).map(([sectionId, section]) => (
                      <Card
                        key={sectionId}
                        className="bg-gradient-to-br from-blue-50 to-white/90 border-blue-100 shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        <CardHeader
                          className="flex items-center justify-between p-4 cursor-pointer bg-blue-100/50 hover:bg-blue-200/50 rounded-t-lg"
                          onClick={() => toggleSection(sectionId)}
                        >
                          <h3 className="text-lg font-medium text-gray-800">{section.title}</h3>
                          <ChevronDown
                            className={`h-5 w-5 text-gray-600 transition-transform duration-200 ${
                              openSections.has(sectionId) ? "rotate-180" : ""
                            }`}
                          />
                        </CardHeader>
                        {openSections.has(sectionId) && (
                          <CardContent className="p-4 space-y-4 bg-white/80">
                            {section.questions.map((question) => (
                              <div key={question.id} className="space-y-2">
                                {isSupplierSection(sectionId) ? (
                                  <div className="flex gap-4 items-end">
                                    <div className="flex-1 space-y-2">
                                      <Label htmlFor={question.id} className="text-gray-700">
                                        {question.label}
                                      </Label>
                                      <div className="mt-1">
                                        <Input
                                          id={question.id}
                                          value={formData[question.id] || ""}
                                          onChange={(e) => handleInputChange(question.id, e.target.value)}
                                          placeholder={` ${question.placeholder}`}
                                          className="border-blue-200 focus:ring-blue-400 transition-all duration-200 p-2 text-base bg-white"
                                          disabled={!isInputEnabled(question.id)}
                                        />
                                      </div>
                                      {!isInputEnabled(question.id) && (
                                        <p className="text-xs text-gray-500 mt-1">Bu maydonni ta'minotchi  to'ldiradi</p>
                                      )}
                                    </div>
                                    <div className="w-48 space-y-2">
                                      <Label className="text-gray-700 font-medium text-xs">ta'minotchi </Label>
                                      <Select
                                        onValueChange={(value) => handleSupplierChange(question.id, value)}
                                        value={suppliers[question.id] || ""}
                                      >
                                        <SelectTrigger className="border-blue-200 focus:ring-blue-400 transition-all duration-200 bg-white/80 h-10">
                                          <SelectValue placeholder="Tanlang" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white shadow-md">
                                          <SelectItem value="Supplier1">O'zim</SelectItem>
                                          <SelectItem value="Supplier2">ta'minotchi  1</SelectItem>
                                          <SelectItem value="Supplier3">ta'minotchi  2</SelectItem>
                                          <SelectItem value="Supplier4">ta'minotchi  3</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <Label htmlFor={question.id} className="text-gray-700">
                                      {question.label}
                                    </Label>
                                    <div className="mt-1">
                                      <Input
                                        id={question.id}
                                        value={formData[question.id] || ""}
                                        onChange={(e) => handleInputChange(question.id, e.target.value)}
                                        placeholder={` ${question.placeholder}`}
                                        className="border-blue-200 focus:ring-blue-400 transition-all duration-200 p-2 text-base w-full bg-white"
                                      />
                                    </div>
                                  </>
                                )}
                              </div>
                            ))}
                          </CardContent>
                        )}
                      </Card>
                    ))}
                  </div>
                )}

                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 shadow-md hover:shadow-lg w-full md:w-auto"
                  onClick={handleSubmit}
                  disabled={!selectedCategory}
                >
                  Saqlash
                </Button>
              </div>
            </Card>
          </div>
        </main>
      
    </div>
  )
}