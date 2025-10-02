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

// Type definitions
interface Question {
  id: string;
  label: string;
  type: string;
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
          { id: "1.1.1", label: "Mahsulot nomi va modeli", type: "text" },
          { id: "1.1.2", label: "Mahsulot turi (telefon, noutbuk, planshet va h.k.)", type: "text" },
          { id: "1.1.3", label: "Ishlab chiqarilgan mamlakat", type: "text" },
          { id: "1.1.4", label: "Ishlab chiqaruvchi korxona nomi", type: "text" },
          { id: "1.1.5", label: "Kafolat muddati", type: "text" },
          { id: "1.1.6", label: "Xizmat muddati (yil)", type: "text" },
        ],
      },
      "1.2": {
        title: "Texnik xususiyatlar",
        questions: [
          { id: "1.2.1", label: "O‘lchamlari (uzunlik, kenglik, qalinlik)", type: "text" },
          { id: "1.2.2", label: "Og‘irligi", type: "text" },
          { id: "1.2.3", label: "Batareya sig‘imi (mA/h)", type: "text" },
          { id: "1.2.4", label: "Quvvati (Watt)", type: "text" },
          { id: "1.2.5", label: "Energiya sarfi (kWh/soat)", type: "text" },
          { id: "1.2.6", label: "Ekran o‘lchami va texnologiyasi", type: "text" },
          { id: "1.2.7", label: "Protsessor turi va chastotasi", type: "text" },
          { id: "1.2.8", label: "Operativ xotira (RAM) hajmi", type: "text" },
          { id: "1.2.9", label: "Doimiy xotira (ROM) hajmi", type: "text" },
          { id: "1.2.10", label: "Operatsion tizim", type: "text" },
          { id: "1.2.11", label: "Kamera ko‘rsatkichlari (MP)", type: "text" },
          { id: "1.2.12", label: "Yangi texnologiyalar (AI, IoT, 5G) qo‘llanganmi?", type: "text" },
        ],
      },
      "1.3": {
        title: "Material va ekologiya",
        questions: [
          { id: "1.3.1", label: "Materiallar (plastik, alyuminiy va h.k.)", type: "text" },
          { id: "1.3.2", label: "Qadoqlash materiali va qayta ishlash imkoniyati", type: "text" },
          { id: "1.3.3", label: "Qayta ishlash imkoniyatlari (batareya, plastmassa)", type: "text" },
        ],
      },
      "1.4": {
        title: "Standartlashtirish va sifat nazorati",
        questions: [
          { id: "1.4.1", label: "Sertifikatlari (ISO, CE, RoHS va b.)", type: "text" },
          { id: "1.4.2", label: "Maxsus xavfsizlik sertifikati mavjudmi?", type: "text" },
          { id: "1.4.3", label: "Saqlash va ishlatish bo‘yicha yo‘riqnomasi", type: "text" },
          { id: "1.4.4", label: "Ta’mirlash imkoniyati (zaxira qismlar mavjudligi)", type: "text" },
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
          { id: "2.1.1", label: "Mahsulot nomi (masalan: kir yuvish mashinasi)", type: "text" },
          { id: "2.1.2", label: "Modeli", type: "text" },
          { id: "2.1.3", label: "O‘lchami", type: "text" },
          { id: "2.1.4", label: "Og‘irligi", type: "text" },
          { id: "2.1.5", label: "Ishlab chiqaruvchi mamlakat", type: "text" },
          { id: "2.1.6", label: "Ishlab chiqaruvchi korxona nomi", type: "text" },
          { id: "2.1.7", label: "Kafolat muddati", type: "text" },
          { id: "2.1.8", label: "Xizmat muddati (yil)", type: "text" },
        ],
      },
      "2.2": {
        title: "Texnik xususiyatlar",
        questions: [
          { id: "2.2.1", label: "Quvvati (Watt)", type: "text" },
          { id: "2.2.2", label: "Elektr ta’minoti (220V/110V)", type: "text" },
          { id: "2.2.3", label: "Energiya samaradorligi (A++, A+ va h.k.)", type: "text" },
          { id: "2.2.4", label: "Energiya sarfi (yiliga kWh)", type: "text" },
          { id: "2.2.5", label: "Suv sarfi (yiliga litr)", type: "text" },
          { id: "2.2.6", label: "Shovqin darajasi (dB)", type: "text" },
          { id: "2.2.7", label: "Foydalanish qulayligi (avtomatik rejimlar)", type: "text" },
          { id: "2.2.8", label: "Maxsus xavfsizlik funksiyalari (bolalardan himoya va h.k.)", type: "text" },
        ],
      },
      "2.3": {
        title: "Material va ekologiya",
        questions: [
          { id: "2.3.1", label: "Materiali (po‘lat, plastmassa, shisha)", type: "text" },
          { id: "2.3.2", label: "Qadoqlash turi", type: "text" },
          { id: "2.3.3", label: "Qayta ishlash imkoniyati (metall/plastik ajratilishi)", type: "text" },
        ],
      },
      "2.4": {
        title: "Standartlashtirish va sifat nazorati",
        questions: [
          { id: "2.4.1", label: "Zaxira qismlar mavjudligi", type: "text" },
          { id: "2.4.2", label: "Ta’mirlash bo‘yicha yo‘riqnomasi", type: "text" },
          { id: "2.4.3", label: "Saqlash sharoiti", type: "text" },
          { id: "2.4.4", label: "Sertifikatlari (ISO, CE, Energy Star)", type: "text" },
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
          { id: "3.1.1", label: "Mahsulot nomi (masalan: erkaklar ko‘ylagi)", type: "text" },
          { id: "3.1.2", label: "Kiyim turi (ko‘ylak, shim, poyabzal va h.k.)", type: "text" },
          { id: "3.1.3", label: "O‘lchami (S, M, L, XL)", type: "text" },
          { id: "3.1.4", label: "Og‘irligi", type: "text" },
          { id: "3.1.5", label: "Rang", type: "text" },
          { id: "3.1.6", label: "Ishlab chiqarilgan joyi", type: "text" },
          { id: "3.1.7", label: "Ishlab chiqaruvchi nomi", type: "text" },
          { id: "3.1.8", label: "Ishlab chiqarilgan sana", type: "text" },
          { id: "3.1.9", label: "Dizayner yoki brend nomi", type: "text" },
          { id: "3.1.10", label: "Modaga oid qo‘shimcha ma’lumot (kolleksiya nomi)", type: "text" },
        ],
      },
      "3.2": {
        title: "Material va sifat",
        questions: [
          { id: "3.2.1", label: "Asosiy material (paxta, polyester, jun)", type: "text" },
          { id: "3.2.2", label: "Material foizi (masalan: 80% paxta, 20% polyester)", type: "text" },
          { id: "3.2.3", label: "Maxsus ishlov (antibakterial, suv o‘tkazmaydigan)", type: "text" },
          { id: "3.2.4", label: "Sertifikat (Oeko-Tex, organik)", type: "text" },
          { id: "3.2.5", label: "Maxsus ekologik belgi (eko-paxta va h.k.)", type: "text" },
        ],
      },
      "3.3": {
        title: "Foydalanish va saqlash",
        questions: [
          { id: "3.3.1", label: "Yuvish bo‘yicha yo‘riqnoma", type: "text" },
          { id: "3.3.2", label: "Daftarlash (dazmollash) bo‘yicha yo‘riqnoma", type: "text" },
          { id: "3.3.3", label: "Qadoqlash materiali", type: "text" },
          { id: "3.3.4", label: "Saqlash muddati", type: "text" },
          { id: "3.3.5", label: "Xizmat muddati (yil/oy)", type: "text" },
        ],
      },
      "3.4": {
        title: "Ekologiya va qayta ishlash",
        questions: [
          { id: "3.4.1", label: "Qayta ishlash imkoniyati (matoni qayta ishlash)", type: "text" },
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
          { id: "4.1.1", label: "Mahsulot nomi", type: "text" },
          { id: "4.1.2", label: "Mahsulot turi (ichimlik, quruq mahsulot, konservalar)", type: "text" },
          { id: "4.1.3", label: "Og‘irligi / hajmi", type: "text" },
          { id: "4.1.4", label: "Ishlab chiqarilgan sana", type: "text" },
          { id: "4.1.5", label: "Yaroqlilik muddati", type: "text" },
          { id: "4.1.6", label: "Saqlash muddati", type: "text" },
          { id: "4.1.7", label: "Narx segmenti", type: "text" },
          { id: "4.1.8", label: "Yetkazib beruvchi nomi", type: "text" },
          { id: "4.1.9", label: "Ishlab chiqaruvchi nomi", type: "text" },
          { id: "4.1.10", label: "Ishlab chiqarilgan mamlakat", type: "text" },
        ],
      },
      "4.2": {
        title: "Tarkib va oziqlanish qiymati",
        questions: [
          { id: "4.2.1", label: "Tarkibi (ingredientlar)", type: "text" },
          { id: "4.2.2", label: "Energiya qiymati (kcal, protein, yog‘, uglevod)", type: "text" },
          { id: "4.2.3", label: "Allergiya haqida ogohlantirish", type: "text" },
          { id: "4.2.4", label: "Maxsus tamg‘a (Gluten-free, Vegan)", type: "text" },
          { id: "4.2.5", label: "Ekologik iz (organik yoki yo‘q)", type: "text" },
        ],
      },
      "4.3": {
        title: "Saqlash va qadoqlash",
        questions: [
          { id: "4.3.1", label: "Saqlash sharoiti", type: "text" },
          { id: "4.3.2", label: "Qadoqlash materiali", type: "text" },
          { id: "4.3.3", label: "Qadoqlash qayta ishlanishi mumkinmi?", type: "text" },
        ],
      },
      "4.4": {
        title: "Standartlashtirish va sifat nazorati",
        questions: [
          { id: "4.4.1", label: "Sertifikatlar (Halal, HACCP, ISO 22000)", type: "text" },
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
          { id: "5.1.1", label: "Mahsulot nomi (g‘isht, sement, bo‘yoq, kabel)", type: "text" },
          { id: "5.1.2", label: "O‘lchami / hajmi", type: "text" },
          { id: "5.1.3", label: "Og‘irligi", type: "text" },
          { id: "5.1.4", label: "Ishlab chiqaruvchi nomi", type: "text" },
          { id: "5.1.5", label: "Ishlab chiqarilgan mamlakat", type: "text" },
          { id: "5.1.6", label: "Saqlash muddati", type: "text" },
          { id: "5.1.7", label: "Narx segmenti (premium, o‘rta, arzon)", type: "text" },
        ],
      },
      "5.2": {
        title: "Texnik xususiyatlar",
        questions: [
          { id: "5.2.1", label: "Tarkibiy materiallari", type: "text" },
          { id: "5.2.2", label: "Mustahkamlik ko‘rsatkichi", type: "text" },
          { id: "5.2.3", label: "Suvga chidamliligi", type: "text" },
          { id: "5.2.4", label: "Issiqlikka chidamliligi", type: "text" },
          { id: "5.2.5", label: "Yonuvchanlik darajasi", type: "text" },
          { id: "5.2.6", label: "Foydalanish sohasi (ichki, tashqi)", type: "text" },
          { id: "5.2.7", label: "Ta’mirlash uchun moslik", type: "text" },
          { id: "5.2.8", label: "Rang / dizayn variantlari", type: "text" },
        ],
      },
      "5.3": {
        title: "Saqlash va ekologiya",
        questions: [
          { id: "5.3.1", label: "Saqlash sharoiti", type: "text" },
          { id: "5.3.2", label: "Qadoqlash tur", type: "text" },
          { id: "5.3.3", label: "Qayta ishlash imkoniyati", type: "text" },
          { id: "5.3.4", label: "Ekologik xavfsizlik ko‘rsatkichi", type: "text" },
        ],
      },
      "5.4": {
        title: "Standartlashtirish va sifat nazorati",
        questions: [
          { id: "5.4.1", label: "Sertifikat (O‘zstandart, ISO, EN)", type: "text" },
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
          { id: "6.1.1", label: "Mahsulot nomi (soat, sumka, taqinchoq va b.)", type: "text" },
          { id: "6.1.2", label: "Modeli", type: "text" },
          { id: "6.1.3", label: "O‘lchami", type: "text" },
          { id: "6.1.4", label: "Og‘irligi", type: "text" },
          { id: "6.1.5", label: "Rang", type: "text" },
          { id: "6.1.6", label: "Brend nomi", type: "text" },
          { id: "6.1.7", label: "Ishlab chiqaruvchi nomi", type: "text" },
          { id: "6.1.8", label: "Ishlab chiqarilgan mamlakat", type: "text" },
          { id: "6.1.9", label: "Kafolat muddati", type: "text" },
          { id: "6.1.10", label: "Xizmat muddati", type: "text" },
        ],
      },
      "6.2": {
        title: "Material va dizayn",
        questions: [
          { id: "6.2.1", label: "Materiali (teri, metal, plastmassa, qimmatbaho tosh)", type: "text" },
          { id: "6.2.2", label: "Dizayn uslubi (klassik, sport, zamonaviy)", type: "text" },
          { id: "6.2.3", label: "Maxsus funksiya (soat uchun: suv o‘tkazmaslik, smart-funktsiya)", type: "text" },
        ],
      },
      "6.3": {
        title: "Saqlash va qayta ishlash",
        questions: [
          { id: "6.3.1", label: "Qadoqlash materiali", type: "text" },
          { id: "6.3.2", label: "Qayta ishlash imkoniyati", type: "text" },
          { id: "6.3.3", label: "Saqlash sharoiti", type: "text" },
        ],
      },
      "6.4": {
        title: "Standartlashtirish va sifat nazorati",
        questions: [
          { id: "6.4.1", label: "Sertifikat (agar taqinchoq bo‘lsa, oltin/proba)", type: "text" },
          { id: "6.4.2", label: "Ta’mirlash imkoniyati (zaxira qismlar mavjudligi)", type: "text" },
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
          { id: "7.1.1", label: "Mahsulot nomi (masalan: tibbiy asbob, vitamin)", type: "text" },
          { id: "7.1.2", label: "Mahsulot turi (dori, jihoz, qo‘shimcha)", type: "text" },
          { id: "7.1.3", label: "Og‘irligi / hajmi", type: "text" },
          { id: "7.1.4", label: "Ishlab chiqaruvchi nomi", type: "text" },
          { id: "7.1.5", label: "Ishlab chiqarilgan mamlakat", type: "text" },
          { id: "7.1.6", label: "Saqlash muddati", type: "text" },
          { id: "7.1.7", label: "Kafolat muddati (jihozlar uchun)", type: "text" },
        ],
      },
      "7.2": {
        title: "Tarkib va qo‘llash",
        questions: [
          { id: "7.2.1", label: "Tarkibi (ingredientlar, faol moddalar)", type: "text" },
          { id: "7.2.2", label: "Foydalanish ko‘rsatmalari", type: "text" },
          { id: "7.2.3", label: "Qarshi ko‘rsatmalar (kontraindikatsiya)", type: "text" },
          { id: "7.2.4", label: "Dozalash shakli (tabletka, kapsula, eritma)", type: "text" },
          { id: "7.2.5", label: "Yon ta’sirlar ro‘yxati", type: "text" },
          { id: "7.2.6", label: "Maxsus ogohlantirishlar (homilador ayollar, bolalar)", type: "text" },
          { id: "7.2.7", label: "Klinik sinov ma’lumotlari", type: "text" },
        ],
      },
      "7.3": {
        title: "Saqlash va qadoqlash",
        questions: [
          { id: "7.3.1", label: "Saqlash sharoiti", type: "text" },
          { id: "7.3.2", label: "Qadoqlash materiali", type: "text" },
          { id: "7.3.3", label: "Qayta ishlash imkoniyati", type: "text" },
        ],
      },
      "7.4": {
        title: "Standartlashtirish va sifat nazorati",
        questions: [
          { id: "7.4.1", label: "Sertifikat (ISO, GMP, FDA)", type: "text" },
          { id: "7.4.2", label: "Ta’mirlash imkoniyati (tibbiy qurilma bo‘lsa)", type: "text" },
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
          { id: "8.1.1", label: "Mahsulot nomi (idish-tovoq, tozalash vositasi, gilam)", type: "text" },
          { id: "8.1.2", label: "Mahsulot turi", type: "text" },
          { id: "8.1.3", label: "O‘lcham", type: "text" },
          { id: "8.1.4", label: "Og‘irligi", type: "text" },
          { id: "8.1.5", label: "Rang", type: "text" },
          { id: "8.1.6", label: "Ishlab chiqaruvchi nomi", type: "text" },
          { id: "8.1.7", label: "Ishlab chiqarilgan mamlakat", type: "text" },
          { id: "8.1.8", label: "Saqlash muddati", type: "text" },
          { id: "8.1.9", label: "Xizmat muddati", type: "text" },
          { id: "8.1.10", label: "Narx segmenti", type: "text" },
        ],
      },
      "8.2": {
        title: "Material va sifat",
        questions: [
          { id: "8.2.1", label: "Materiali (plastik, metall, keramika, mato)", type: "text" },
          { id: "8.2.2", label: "Ekologik ta’sir (zaharli moddalar mavjudligi)", type: "text" },
        ],
      },
      "8.3": {
        title: "Saqlash va qayta ishlash",
        questions: [
          { id: "8.3.1", label: "Qadoqlash materiali", type: "text" },
          { id: "8.3.2", label: "Qayta ishlash imkoniyati", type: "text" },
          { id: "8.3.3", label: "Saqlash sharoiti", type: "text" },
        ],
      },
      "8.4": {
        title: "Foydalanish va xavfsizlik",
        questions: [
          { id: "8.4.1", label: "Sertifikat (eko-sertifikat)", type: "text" },
          { id: "8.4.2", label: "Ta’mirlash imkoniyati (mebel uchun)", type: "text" },
          { id: "8.4.3", label: "Foydalanish yo‘riqnomasi", type: "text" },
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
          { id: "9.1.1", label: "Mahsulot nomi (ruchka, daftar, marker)", type: "text" },
          { id: "9.1.2", label: "Mahsulot turi", type: "text" },
          { id: "9.1.3", label: "O‘lchami / hajmi", type: "text" },
          { id: "9.1.4", label: "Og‘irligi", type: "text" },
          { id: "9.1.5", label: "Rangi", type: "text" },
          { id: "9.1.6", label: "Ishlab chiqaruvchi nomi", type: "text" },
          { id: "9.1.7", label: "Ishlab chiqarilgan mamlakat", type: "text" },
          { id: "9.1.8", label: "Foydalanish muddati", type: "text" },
          { id: "9.1.9", label: "Narx segmenti", type: "text" },
        ],
      },
      "9.2": {
        title: "Material va funksiya",
        questions: [
          { id: "9.2.1", label: "Materiali (plastik, qog‘oz, metall)", type: "text" },
          { id: "9.2.2", label: "Maxsus funksiya (masalan: o‘chiriladigan ruchka)", type: "text" },
        ],
      },
      "9.3": {
        title: "Saqlash va ekologiya",
        questions: [
          { id: "9.3.1", label: "Qadoqlash turi", type: "text" },
          { id: "9.3.2", label: "Qayta ishlash imkoniyati", type: "text" },
          { id: "9.3.3", label: "Saqlash sharoiti", type: "text" },
        ],
      },
      "9.4": {
        title: "Standartlashtirish va sifat nazorati",
        questions: [
          { id: "9.4.1", label: "Sertifikat (eko-qog‘oz, FSC)", type: "text" },
          { id: "9.4.2", label: "Zaharli moddalar mavjudligi yoki yo‘qligi", type: "text" },
          { id: "9.4.3", label: "Ekologik xavfsizlik belgilari", type: "text" },
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
  const [suppliers, setSuppliers] = useState<Record<string, string>>({}) // Bo‘limlar uchun taminotchi
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
    console.log("Yuborilgan ma'lumotlar:", formData)
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

  const handleSupplierChange = (sectionId: string, value: string) => {
    setSuppliers((prev) => ({ ...prev, [sectionId]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 flex">
      {isSidebarOpen && <Sidebar isMobile={isMobile} setIsSidebarOpen={setIsSidebarOpen} />}
      
      <div className="flex-1 flex flex-col">
        <header className="md:hidden bg-gradient-to-r from-blue-800 to-blue-600 backdrop-blur-md border-b border-blue-300/40 p-4 flex items-center justify-between">
          <Link href="/manufacturer/dashboard" className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-white transition-transform duration-200 hover:scale-110" />
            <span className="text-xl font-bold text-white">ScanMe</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(true)}
            className="hover:bg-white/20 text-white"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </header>

        <main className="flex-1 p-4 md:p-8">
          <div className="container mx-auto space-y-6 h-screen overflow-y-auto">
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
                          <div className="flex items-center gap-2">
                            <Label className="text-gray-700 font-medium">Taminotchi:</Label>
                            <Select
                              onValueChange={(value) => handleSupplierChange(sectionId, value)}
                              value={suppliers[sectionId] || ""}
                              
                            >
                              <SelectTrigger className="border-blue-200 focus:ring-blue-400 transition-all duration-200 bg-white/80 h-8">
                                <SelectValue placeholder="Tanlang" />
                              </SelectTrigger>
                              <SelectContent className="bg-white shadow-md">
                                <SelectItem value="Supplier1">O'zim</SelectItem>
                                <SelectItem value="Supplier2">Taminotchi 1</SelectItem>
                                <SelectItem value="Supplier3">Taminotchi 2</SelectItem>
                                <SelectItem value="Supplier4">Taminotchi 3</SelectItem>
                              </SelectContent>
                            </Select>
                            <ChevronDown
                              className={`h-5 w-5 text-gray-600 transition-transform duration-200 ${
                                openSections.has(sectionId) ? "rotate-180" : ""
                              }`}
                            />
                          </div>
                        </CardHeader>
                        {openSections.has(sectionId) && (
                          <CardContent className="p-4 space-y-4 bg-white/80">
                            {section.questions.map((question) => (
                              <div key={question.id} className="space-y-2">
                                <Label htmlFor={question.id} className="text-gray-700">
                                  {question.label}
                                </Label>
                                <div className="mt-1">
                                  <Input
                                    id={question.id}
                                    value={formData[question.id] || ""}
                                    onChange={(e) => handleInputChange(question.id, e.target.value)}
                                    placeholder={`Enter ${question.label}`}
                                    className="border-blue-200 focus:ring-blue-400 transition-all duration-200 p-2 text-base w-full bg-white"
                                  />
                                </div>
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
    </div>
  )
}

  // "1": {
  //   name: "Gadjetlar",
  //   sections: {
  //     "1.1": {
  //       title: "Umumiy ma’lumotlar",
  //       questions: [
  //         { id: "1.1.1", label: "Mahsulot nomi va modeli", type: "text" },
  //         { id: "1.1.2", label: "Mahsulot turi (telefon, noutbuk, planshet va h.k.)", type: "text" },
  //         { id: "1.1.3", label: "Ishlab chiqarilgan mamlakat", type: "text" },
  //         { id: "1.1.4", label: "Ishlab chiqaruvchi korxona nomi", type: "text" },
  //         { id: "1.1.5", label: "Kafolat muddati", type: "text" },
  //         { id: "1.1.6", label: "Xizmat muddati (yil)", type: "text" },
  //       ],
  //     },
  //     "1.2": {
  //       title: "Texnik xususiyatlar",
  //       questions: [
  //         { id: "1.2.1", label: "O‘lchamlari (uzunlik, kenglik, qalinlik)", type: "text" },
  //         { id: "1.2.2", label: "Og‘irligi", type: "text" },
  //         { id: "1.2.3", label: "Batareya sig‘imi (mA/h)", type: "text" },
  //         { id: "1.2.4", label: "Quvvati (Watt)", type: "text" },
  //         { id: "1.2.5", label: "Energiya sarfi (kWh/soat)", type: "text" },
  //         { id: "1.2.6", label: "Ekran o‘lchami va texnologiyasi", type: "text" },
  //         { id: "1.2.7", label: "Protsessor turi va chastotasi", type: "text" },
  //         { id: "1.2.8", label: "Operativ xotira (RAM) hajmi", type: "text" },
  //         { id: "1.2.9", label: "Doimiy xotira (ROM) hajmi", type: "text" },
  //         { id: "1.2.10", label: "Operatsion tizim", type: "text" },
  //         { id: "1.2.11", label: "Kamera ko‘rsatkichlari (MP)", type: "text" },
  //         { id: "1.2.12", label: "Yangi texnologiyalar (AI, IoT, 5G) qo‘llanganmi?", type: "text" },
  //       ],
  //     },
  //     "1.3": {
  //       title: "Material va ekologiya",
  //       questions: [
  //         { id: "1.3.1", label: "Materiallar (plastik, alyuminiy va h.k.)", type: "text" },
  //         { id: "1.3.2", label: "Qadoqlash materiali va qayta ishlash imkoniyati", type: "text" },
  //         { id: "1.3.3", label: "Qayta ishlash imkoniyatlari (batareya, plastmassa)", type: "text" },
  //       ],
  //     },
  //     "1.4": {
  //       title: "Standartlashtirish va sifat nazorati",
  //       questions: [
  //         { id: "1.4.1", label: "Sertifikatlari (ISO, CE, RoHS va b.)", type: "text" },
  //         { id: "1.4.2", label: "Maxsus xavfsizlik sertifikati mavjudmi?", type: "text" },
  //         { id: "1.4.3", label: "Saqlash va ishlatish bo‘yicha yo‘riqnomasi", type: "text" },
  //         { id: "1.4.4", label: "Ta’mirlash imkoniyati (zaxira qismlar mavjudligi)", type: "text" },
  //       ],
  //     },
  //   },
  // },
  // "2": {
  //   name: "Maishiy texnika",
  //   sections: {
  //     "2.1": {
  //       title: "Umumiy ma’lumotlar",
  //       questions: [
  //         { id: "2.1.1", label: "Mahsulot nomi (masalan: kir yuvish mashinasi)", type: "text" },
  //         { id: "2.1.2", label: "Modeli", type: "text" },
  //         { id: "2.1.3", label: "O‘lchami", type: "text" },
  //         { id: "2.1.4", label: "Og‘irligi", type: "text" },
  //         { id: "2.1.5", label: "Ishlab chiqaruvchi mamlakat", type: "text" },
  //         { id: "2.1.6", label: "Ishlab chiqaruvchi korxona nomi", type: "text" },
  //         { id: "2.1.7", label: "Kafolat muddati", type: "text" },
  //         { id: "2.1.8", label: "Xizmat muddati (yil)", type: "text" },
  //       ],
  //     },
  //     "2.2": {
  //       title: "Texnik xususiyatlar",
  //       questions: [
  //         { id: "2.2.1", label: "Quvvati (Watt)", type: "text" },
  //         { id: "2.2.2", label: "Elektr ta’minoti (220V/110V)", type: "text" },
  //         { id: "2.2.3", label: "Energiya samaradorligi (A++, A+ va h.k.)", type: "text" },
  //         { id: "2.2.4", label: "Energiya sarfi (yiliga kWh)", type: "text" },
  //         { id: "2.2.5", label: "Suv sarfi (yiliga litr)", type: "text" },
  //         { id: "2.2.6", label: "Shovqin darajasi (dB)", type: "text" },
  //         { id: "2.2.7", label: "Foydalanish qulayligi (avtomatik rejimlar)", type: "text" },
  //         { id: "2.2.8", label: "Maxsus xavfsizlik funksiyalari (bolalardan himoya va h.k.)", type: "text" },
  //       ],
  //     },
  //     "2.3": {
  //       title: "Material va ekologiya",
  //       questions: [
  //         { id: "2.3.1", label: "Materiali (po‘lat, plastmassa, shisha)", type: "text" },
  //         { id: "2.3.2", label: "Qadoqlash turi", type: "text" },
  //         { id: "2.3.3", label: "Qayta ishlash imkoniyati (metall/plastik ajratilishi)", type: "text" },
  //       ],
  //     },
  //     "2.4": {
  //       title: "Standartlashtirish va sifat nazorati",
  //       questions: [
  //         { id: "2.4.1", label: "Zaxira qismlar mavjudligi", type: "text" },
  //         { id: "2.4.2", label: "Ta’mirlash bo‘yicha yo‘riqnomasi", type: "text" },
  //         { id: "2.4.3", label: "Saqlash sharoiti", type: "text" },
  //         { id: "2.4.4", label: "Sertifikatlari (ISO, CE, Energy Star)", type: "text" },
  //       ],
  //     },
  //   },
  // },
  // "3": {
  //   name: "Kiyim-kechak",
  //   sections: {
  //     "3.1": {
  //       title: "Umumiy ma’lumotlar",
  //       questions: [
  //         { id: "3.1.1", label: "Mahsulot nomi (masalan: erkaklar ko‘ylagi)", type: "text" },
  //         { id: "3.1.2", label: "Kiyim turi (ko‘ylak, shim, poyabzal va h.k.)", type: "text" },
  //         { id: "3.1.3", label: "O‘lchami (S, M, L, XL)", type: "text" },
  //         { id: "3.1.4", label: "Og‘irligi", type: "text" },
  //         { id: "3.1.5", label: "Rang", type: "text" },
  //         { id: "3.1.6", label: "Ishlab chiqarilgan joyi", type: "text" },
  //         { id: "3.1.7", label: "Ishlab chiqaruvchi nomi", type: "text" },
  //         { id: "3.1.8", label: "Ishlab chiqarilgan sana", type: "text" },
  //         { id: "3.1.9", label: "Dizayner yoki brend nomi", type: "text" },
  //         { id: "3.1.10", label: "Modaga oid qo‘shimcha ma’lumot (kolleksiya nomi)", type: "text" },
  //       ],
  //     },
  //     "3.2": {
  //       title: "Material va sifat",
  //       questions: [
  //         { id: "3.2.1", label: "Asosiy material (paxta, polyester, jun)", type: "text" },
  //         { id: "3.2.2", label: "Material foizi (masalan: 80% paxta, 20% polyester)", type: "text" },
  //         { id: "3.2.3", label: "Maxsus ishlov (antibakterial, suv o‘tkazmaydigan)", type: "text" },
  //         { id: "3.2.4", label: "Sertifikat (Oeko-Tex, organik)", type: "text" },
  //         { id: "3.2.5", label: "Maxsus ekologik belgi (eko-paxta va h.k.)", type: "text" },
  //       ],
  //     },
  //     "3.3": {
  //       title: "Foydalanish va saqlash",
  //       questions: [
  //         { id: "3.3.1", label: "Yuvish bo‘yicha yo‘riqnoma", type: "text" },
  //         { id: "3.3.2", label: "Daftarlash (dazmollash) bo‘yicha yo‘riqnoma", type: "text" },
  //         { id: "3.3.3", label: "Qadoqlash materiali", type: "text" },
  //         { id: "3.3.4", label: "Saqlash muddati", type: "text" },
  //         { id: "3.3.5", label: "Xizmat muddati (yil/oy)", type: "text" },
  //       ],
  //     },
  //     "3.4": {
  //       title: "Ekologiya va qayta ishlash",
  //       questions: [
  //         { id: "3.4.1", label: "Qayta ishlash imkoniyati (matoni qayta ishlash)", type: "text" },
  //       ],
  //     },
  //   },
  // },
  // "4": {
  //   name: "Oziq-ovqat",
  //   sections: {
  //     "4.1": {
  //       title: "Umumiy ma’lumotlar",
  //       questions: [
  //         { id: "4.1.1", label: "Mahsulot nomi", type: "text" },
  //         { id: "4.1.2", label: "Mahsulot turi (ichimlik, quruq mahsulot, konservalar)", type: "text" },
  //         { id: "4.1.3", label: "Og‘irligi / hajmi", type: "text" },
  //         { id: "4.1.4", label: "Ishlab chiqarilgan sana", type: "text" },
  //         { id: "4.1.5", label: "Yaroqlilik muddati", type: "text" },
  //         { id: "4.1.6", label: "Saqlash muddati", type: "text" },
  //         { id: "4.1.7", label: "Narx segmenti", type: "text" },
  //         { id: "4.1.8", label: "Yetkazib beruvchi nomi", type: "text" },
  //         { id: "4.1.9", label: "Ishlab chiqaruvchi nomi", type: "text" },
  //         { id: "4.1.10", label: "Ishlab chiqarilgan mamlakat", type: "text" },
  //       ],
  //     },
  //     "4.2": {
  //       title: "Tarkib va oziqlanish qiymati",
  //       questions: [
  //         { id: "4.2.1", label: "Tarkibi (ingredientlar)", type: "text" },
  //         { id: "4.2.2", label: "Energiya qiymati (kcal, protein, yog‘, uglevod)", type: "text" },
  //         { id: "4.2.3", label: "Allergiya haqida ogohlantirish", type: "text" },
  //         { id: "4.2.4", label: "Maxsus tamg‘a (Gluten-free, Vegan)", type: "text" },
  //         { id: "4.2.5", label: "Ekologik iz (organik yoki yo‘q)", type: "text" },
  //       ],
  //     },
  //     "4.3": {
  //       title: "Saqlash va qadoqlash",
  //       questions: [
  //         { id: "4.3.1", label: "Saqlash sharoiti", type: "text" },
  //         { id: "4.3.2", label: "Qadoqlash materiali", type: "text" },
  //         { id: "4.3.3", label: "Qadoqlash qayta ishlanishi mumkinmi?", type: "text" },
  //       ],
  //     },
  //     "4.4": {
  //       title: "Standartlashtirish va sifat nazorati",
  //       questions: [
  //         { id: "4.4.1", label: "Sertifikatlar (Halal, HACCP, ISO 22000)", type: "text" },
  //       ],
  //     },
  //   },
  // },
  // "5": {
  //   name: "Qurilish va ta’mirlash",
  //   sections: {
  //     "5.1": {
  //       title: "Umumiy ma’lumotlar",
  //       questions: [
  //         { id: "5.1.1", label: "Mahsulot nomi (g‘isht, sement, bo‘yoq, kabel)", type: "text" },
  //         { id: "5.1.2", label: "O‘lchami / hajmi", type: "text" },
  //         { id: "5.1.3", label: "Og‘irligi", type: "text" },
  //         { id: "5.1.4", label: "Ishlab chiqaruvchi nomi", type: "text" },
  //         { id: "5.1.5", label: "Ishlab chiqarilgan mamlakat", type: "text" },
  //         { id: "5.1.6", label: "Saqlash muddati", type: "text" },
  //         { id: "5.1.7", label: "Narx segmenti (premium, o‘rta, arzon)", type: "text" },
  //       ],
  //     },
  //     "5.2": {
  //       title: "Texnik xususiyatlar",
  //       questions: [
  //         { id: "5.2.1", label: "Tarkibiy materiallari", type: "text" },
  //         { id: "5.2.2", label: "Mustahkamlik ko‘rsatkichi", type: "text" },
  //         { id: "5.2.3", label: "Suvga chidamliligi", type: "text" },
  //         { id: "5.2.4", label: "Issiqlikka chidamliligi", type: "text" },
  //         { id: "5.2.5", label: "Yonuvchanlik darajasi", type: "text" },
  //         { id: "5.2.6", label: "Foydalanish sohasi (ichki, tashqi)", type: "text" },
  //         { id: "5.2.7", label: "Ta’mirlash uchun moslik", type: "text" },
  //         { id: "5.2.8", label: "Rang / dizayn variantlari", type: "text" },
  //       ],
  //     },
  //     "5.3": {
  //       title: "Saqlash va ekologiya",
  //       questions: [
  //         { id: "5.3.1", label: "Saqlash sharoiti", type: "text" },
  //         { id: "5.3.2", label: "Qadoqlash tur", type: "text" },
  //         { id: "5.3.3", label: "Qayta ishlash imkoniyati", type: "text" },
  //         { id: "5.3.4", label: "Ekologik xavfsizlik ko‘rsatkichi", type: "text" },
  //       ],
  //     },
  //     "5.4": {
  //       title: "Standartlashtirish va sifat nazorati",
  //       questions: [
  //         { id: "5.4.1", label: "Sertifikat (O‘zstandart, ISO, EN)", type: "text" },
  //       ],
  //     },
  //   },
  // },
  // "6": {
  //   name: "Aksessuarlar",
  //   sections: {
  //     "6.1": {
  //       title: "Umumiy ma’lumotlar",
  //       questions: [
  //         { id: "6.1.1", label: "Mahsulot nomi (soat, sumka, taqinchoq va b.)", type: "text" },
  //         { id: "6.1.2", label: "Modeli", type: "text" },
  //         { id: "6.1.3", label: "O‘lchami", type: "text" },
  //         { id: "6.1.4", label: "Og‘irligi", type: "text" },
  //         { id: "6.1.5", label: "Rang", type: "text" },
  //         { id: "6.1.6", label: "Brend nomi", type: "text" },
  //         { id: "6.1.7", label: "Ishlab chiqaruvchi nomi", type: "text" },
  //         { id: "6.1.8", label: "Ishlab chiqarilgan mamlakat", type: "text" },
  //         { id: "6.1.9", label: "Kafolat muddati", type: "text" },
  //         { id: "6.1.10", label: "Xizmat muddati", type: "text" },
  //       ],
  //     },
  //     "6.2": {
  //       title: "Material va dizayn",
  //       questions: [
  //         { id: "6.2.1", label: "Materiali (teri, metal, plastmassa, qimmatbaho tosh)", type: "text" },
  //         { id: "6.2.2", label: "Dizayn uslubi (klassik, sport, zamonaviy)", type: "text" },
  //         { id: "6.2.3", label: "Maxsus funksiya (soat uchun: suv o‘tkazmaslik, smart-funktsiya)", type: "text" },
  //       ],
  //     },
  //     "6.3": {
  //       title: "Saqlash va qayta ishlash",
  //       questions: [
  //         { id: "6.3.1", label: "Qadoqlash materiali", type: "text" },
  //         { id: "6.3.2", label: "Qayta ishlash imkoniyati", type: "text" },
  //         { id: "6.3.3", label: "Saqlash sharoiti", type: "text" },
  //       ],
  //     },
  //     "6.4": {
  //       title: "Standartlashtirish va sifat nazorati",
  //       questions: [
  //         { id: "6.4.1", label: "Sertifikat (agar taqinchoq bo‘lsa, oltin/proba)", type: "text" },
  //         { id: "6.4.2", label: "Ta’mirlash imkoniyati (zaxira qismlar mavjudligi)", type: "text" },
  //       ],
  //     },
  //   },
  // },
  // "7": {
  //   name: "Salomatlik",
  //   sections: {
  //     "7.1": {
  //       title: "Umumiy ma’lumotlar",
  //       questions: [
  //         { id: "7.1.1", label: "Mahsulot nomi (masalan: tibbiy asbob, vitamin)", type: "text" },
  //         { id: "7.1.2", label: "Mahsulot turi (dori, jihoz, qo‘shimcha)", type: "text" },
  //         { id: "7.1.3", label: "Og‘irligi / hajmi", type: "text" },
  //         { id: "7.1.4", label: "Ishlab chiqaruvchi nomi", type: "text" },
  //         { id: "7.1.5", label: "Ishlab chiqarilgan mamlakat", type: "text" },
  //         { id: "7.1.6", label: "Saqlash muddati", type: "text" },
  //         { id: "7.1.7", label: "Kafolat muddati (jihozlar uchun)", type: "text" },
  //       ],
  //     },
  //     "7.2": {
  //       title: "Tarkib va qo‘llash",
  //       questions: [
  //         { id: "7.2.1", label: "Tarkibi (ingredientlar, faol moddalar)", type: "text" },
  //         { id: "7.2.2", label: "Foydalanish ko‘rsatmalari", type: "text" },
  //         { id: "7.2.3", label: "Qarshi ko‘rsatmalar (kontraindikatsiya)", type: "text" },
  //         { id: "7.2.4", label: "Dozalash shakli (tabletka, kapsula, eritma)", type: "text" },
  //         { id: "7.2.5", label: "Yon ta’sirlar ro‘yxati", type: "text" },
  //         { id: "7.2.6", label: "Maxsus ogohlantirishlar (homilador ayollar, bolalar)", type: "text" },
  //         { id: "7.2.7", label: "Klinik sinov ma’lumotlari", type: "text" },
  //       ],
  //     },
  //     "7.3": {
  //       title: "Saqlash va qadoqlash",
  //       questions: [
  //         { id: "7.3.1", label: "Saqlash sharoiti", type: "text" },
  //         { id: "7.3.2", label: "Qadoqlash materiali", type: "text" },
  //         { id: "7.3.3", label: "Qayta ishlash imkoniyati", type: "text" },
  //       ],
  //     },
  //     "7.4": {
  //       title: "Standartlashtirish va sifat nazorati",
  //       questions: [
  //         { id: "7.4.1", label: "Sertifikat (ISO, GMP, FDA)", type: "text" },
  //         { id: "7.4.2", label: "Ta’mirlash imkoniyati (tibbiy qurilma bo‘lsa)", type: "text" },
  //       ],
  //     },
  //   },
  // },
  // "8": {
  //   name: "Uy-ro‘zg‘or buyumlari",
  //   sections: {
  //     "8.1": {
  //       title: "Umumiy ma’lumotlar",
  //       questions: [
  //         { id: "8.1.1", label: "Mahsulot nomi (idish-tovoq, tozalash vositasi, gilam)", type: "text" },
  //         { id: "8.1.2", label: "Mahsulot turi", type: "text" },
  //         { id: "8.1.3", label: "O‘lcham", type: "text" },
  //         { id: "8.1.4", label: "Og‘irligi", type: "text" },
  //         { id: "8.1.5", label: "Rang", type: "text" },
  //         { id: "8.1.6", label: "Ishlab chiqaruvchi nomi", type: "text" },
  //         { id: "8.1.7", label: "Ishlab chiqarilgan mamlakat", type: "text" },
  //         { id: "8.1.8", label: "Saqlash muddati", type: "text" },
  //         { id: "8.1.9", label: "Xizmat muddati", type: "text" },
  //         { id: "8.1.10", label: "Narx segmenti", type: "text" },
  //       ],
  //     },
  //     "8.2": {
  //       title: "Material va sifat",
  //       questions: [
  //         { id: "8.2.1", label: "Materiali (plastik, metall, keramika, mato)", type: "text" },
  //         { id: "8.2.2", label: "Ekologik ta’sir (zaharli moddalar mavjudligi)", type: "text" },
  //       ],
  //     },
  //     "8.3": {
  //       title: "Saqlash va qayta ishlash",
  //       questions: [
  //         { id: "8.3.1", label: "Qadoqlash materiali", type: "text" },
  //         { id: "8.3.2", label: "Qayta ishlash imkoniyati", type: "text" },
  //         { id: "8.3.3", label: "Saqlash sharoiti", type: "text" },
  //       ],
  //     },
  //     "8.4": {
  //       title: "Foydalanish va xavfsizlik",
  //       questions: [
  //         { id: "8.4.1", label: "Sertifikat (eko-sertifikat)", type: "text" },
  //         { id: "8.4.2", label: "Ta’mirlash imkoniyati (mebel uchun)", type: "text" },
  //         { id: "8.4.3", label: "Foydalanish yo‘riqnomasi", type: "text" },
  //       ],
  //     },
  //   },
  // },
  // "9": {
  //   name: "Kanselyariya",
  //   sections: {
  //     "9.1": {
  //       title: "Umumiy ma’lumotlar",
  //       questions: [
  //         { id: "9.1.1", label: "Mahsulot nomi (ruchka, daftar, marker)", type: "text" },
  //         { id: "9.1.2", label: "Mahsulot turi", type: "text" },
  //         { id: "9.1.3", label: "O‘lchami / hajmi", type: "text" },
  //         { id: "9.1.4", label: "Og‘irligi", type: "text" },
  //         { id: "9.1.5", label: "Rangi", type: "text" },
  //         { id: "9.1.6", label: "Ishlab chiqaruvchi nomi", type: "text" },
  //         { id: "9.1.7", label: "Ishlab chiqarilgan mamlakat", type: "text" },
  //         { id: "9.1.8", label: "Foydalanish muddati", type: "text" },
  //         { id: "9.1.9", label: "Narx segmenti", type: "text" },
  //       ],
  //     },
  //     "9.2": {
  //       title: "Material va funksiya",
  //       questions: [
  //         { id: "9.2.1", label: "Materiali (plastik, qog‘oz, metall)", type: "text" },
  //         { id: "9.2.2", label: "Maxsus funksiya (masalan: o‘chiriladigan ruchka)", type: "text" },
  //       ],
  //     },
  //     "9.3": {
  //       title: "Saqlash va ekologiya",
  //       questions: [
  //         { id: "9.3.1", label: "Qadoqlash turi", type: "text" },
  //         { id: "9.3.2", label: "Qayta ishlash imkoniyati", type: "text" },
  //         { id: "9.3.3", label: "Saqlash sharoiti", type: "text" },
  //       ],
  //     },
  //     "9.4": {
  //       title: "Standartlashtirish va sifat nazorati",
  //       questions: [
  //         { id: "9.4.1", label: "Sertifikat (eko-qog‘oz, FSC)", type: "text" },
  //         { id: "9.4.2", label: "Zaharli moddalar mavjudligi yoki yo‘qligi", type: "text" },
  //         { id: "9.4.3", label: "Ekologik xavfsizlik belgilari", type: "text" },
  //       ],
  //     },
  //   },
  // },