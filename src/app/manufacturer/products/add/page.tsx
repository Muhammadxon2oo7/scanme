"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { CheckCircle, ChevronDown } from "lucide-react";
import { categories } from "@/lib/categories";
import { getPartners, createProduct } from "@/lib/api";
import Cookies from "js-cookie";


const categoryFieldMap: Record<string, Record<string, string>> = {
  // 1. Gadgets
  "1": {
    "1.1.1": "name",
    "1.1.2": "turi",
    "1.1.3": "ishlab_chiqarilgan_davlat",
    "1.1.4": "ishlab_chiqaruvchi_tashkilot",
    "1.1.5": "kafolat_muddati",
    "1.1.6": "ishlash_muddati",
    "1.2.1": "olchami",
    "1.2.2": "ogirligi",
    "1.2.3": "batareya_sigimi",
    "1.2.4": "quvvati",
    "1.2.5": "energiya_sarfi",
    "1.2.6": "ekran_olchami",
    "1.2.7": "protsessor_turi",
    "1.2.8": "operativ_xotira",
    "1.2.9": "doimiy_xotira",
    "1.2.10": "operatsion_tizim",
    "1.2.11": "kamera_korsatkichlari",
    "1.2.12": "yangi_texnologiyalar",
    "1.3.1": "materiallar",
    "1.3.2": "qadoqlash_materiali",
    "1.3.3": "qayta_ishlash_imkoniyati",
    "1.4.1": "sertifikatlari",
    "1.4.2": "maxsus_xavfsizlik_sertifikati",
    "1.4.3": "saqlash_yoriqnoma",
    "1.4.4": "tamirlash_imkoniyati",
  },

  // 2. Maishiy texnika
  "2": {
    "2.1.1": "name",
    "2.1.2": "modeli",
    "2.1.3": "olchami",
    "2.1.4": "ogirligi",
    "2.1.5": "ishlab_chiqarilgan_davlat",
    "2.1.6": "ishlab_chiqaruvchi_tashkilot",
    "2.1.7": "kafolat_muddati",
    "2.1.8": "ishlash_muddati",
    "2.2.1": "quvvati",
    "2.2.2": "elektr_taminoti",
    "2.2.3": "energiya_samaradorligi",
    "2.2.4": "energiya_sarfi",
    "2.2.5": "suv_sarfi",
    "2.2.6": "shovqin_darajasi",
    "2.2.7": "foydalanish_qulayligi",
    "2.2.8": "maxsus_xavfsizlik_funktsiyalari",
    "2.3.1": "material",
    "2.3.2": "qadoqlash_turi",
    "2.3.3": "qayta_ishlash_imkoniyati",
    "2.4.1": "zaxira_qismlar",
    "2.4.2": "tamirlash_yoriqnoma",
    "2.4.3": "saqlash_sharoiti",
    "2.4.4": "sertifikatlar",
  },

  // 3. Kiyim
  "3": {
    "3.1.1": "name",
    "3.1.2": "kiyim_turi",
    "3.1.3": "olchami",
    "3.1.4": "ogirligi",
    "3.1.5": "rangi",
    "3.1.6": "ishlab_chiqarilgan_davlat",
    "3.1.7": "ishlab_chiqaruvchi_tashkilot",
    "3.1.8": "ishlab_chiqarilgan_sana",
    "3.1.9": "dizayner_brand",
    "3.1.10": "moda_malumoti",
    "3.2.1": "asosiy_material",
    "3.2.2": "material_foizi",
    "3.2.3": "maxsus_ishlov",
    "3.2.4": "sertifikat",
    "3.2.5": "ekologik_belgi",
    "3.3.1": "yuvish_yoriqnoma",
    "3.3.2": "dazmollash_yoriqnoma",
    "3.3.3": "qadoqlash_materiali",
    "3.3.4": "saqlash_muddati",
    "3.3.5": "xizmat_muddati",
    "3.4.1": "qayta_ishlash_imkoniyati",
  },

  // 4. Transport
  "4": {
    "4.1.1": "name",
    "4.1.2": "modeli",
    "4.1.3": "dvigatel_turi",
    "4.1.4": "yoqilgisi",
    "4.1.5": "quvvati",
    "4.1.6": "ogirligi",
    "4.1.7": "yuk_kotarish_quvvati",
    "4.1.8": "yoqilg'i_sarfi",
    "4.1.9": "chiqarilgan_yili",
    "4.1.10": "ishlab_chiqaruvchi_tashkilot",
    "4.2.1": "texnik_holat",
    "4.2.2": "yurgan_masofa",
    "4.2.3": "rang",
    "4.2.4": "kuzov_turi",
    "4.3.1": "sertifikat",
    "4.3.2": "ekologik_standart",
  },

  // 5. Xizmatlar
  "5": {
    "5.1.1": "name",
    "5.1.2": "xizmat_turi",
    "5.1.3": "amal_qilish_hududi",
    "5.1.4": "muddat",
    "5.1.5": "narx_bahosi",
    "5.1.6": "masul_shaxs",
    "5.2.1": "sertifikat",
    "5.2.2": "tajriba_yillari",
    "5.2.3": "xavfsizlik_talablari",
  },

  // 6. Aksessuar
  "6": {
    "6.1.1": "name",
    "6.1.2": "modeli",
    "6.1.3": "olchami",
    "6.1.4": "ogirligi",
    "6.1.5": "rangi",
    "6.1.6": "brend_nomi",
    "6.1.7": "ishlab_chiqarilgan_davlat",
    "6.1.8": "ishlab_chiqaruvchi_tashkilot",
    "6.2.1": "asosiy_material",
    "6.2.2": "qoplama_materiali",
    "6.2.3": "sertifikat",
    "6.2.4": "qadoqlash_turi",
    "6.2.5": "saqlash_yoriqnoma",
    "6.3.1": "qayta_ishlash_imkoniyati",
  },

  // 7. Food
  "7": {
    "7.1.1": "name",
    "7.1.2": "turi",
    "7.1.3": "ishlab_chiqarilgan_davlat",
    "7.1.4": "ishlab_chiqaruvchi_tashkilot",
    "7.1.5": "ishlab_chiqarilgan_sana",
    "7.1.6": "yaroqlilik_muddati",
    "7.1.7": "ogirligi",
    "7.2.1": "tarkibi",
    "7.2.2": "energiya_qiymati",
    "7.2.3": "oqsil",
    "7.2.4": "yog",
    "7.2.5": "uglevod",
    "7.3.1": "saqlash_sharoiti",
    "7.3.2": "sertifikat",
    "7.3.3": "qadoqlash_turi",
    "7.3.4": "transportirovka_sharoiti",
  },

  // 8. Xomashyo
  "8": {
    "8.1.1": "name",
    "8.1.2": "turi",
    "8.1.3": "kelib_chiqish_manzili",
    "8.1.4": "ishlab_chiqarilgan_davlat",
    "8.1.5": "ishlab_chiqaruvchi_tashkilot",
    "8.2.1": "kimyoviy_tarkib",
    "8.2.2": "fizik_xususiyatlar",
    "8.2.3": "sifat_standarti",
    "8.3.1": "qadoqlash_turi",
    "8.3.2": "transport_talablari",
    "8.3.3": "saqlash_sharoiti",
  },

  // 9. Boshqa
  "9": {
    "9.1.1": "name",
    "9.1.2": "kategoriya_turi",
    "9.1.3": "tavsif",
    "9.1.4": "ishlab_chiqarilgan_davlat",
    "9.1.5": "ishlab_chiqaruvchi_tashkilot",
    "9.2.1": "sertifikat",
    "9.2.2": "maxsus_talablar",
    "9.3.1": "qadoqlash_turi",
    "9.3.2": "saqlash_yoriqnoma",
  },
};

export default function AddProductPage() {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());
  const [suppliers, setSuppliers] = useState<Record<string, string>>({});
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [partners, setPartners] = useState<{ id: string; name: string }[]>([]);
  const [loadingPartners, setLoadingPartners] = useState(true);
  const [errorPartners, setErrorPartners] = useState<string | null>(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoadingPartners(true);
        const data = await getPartners();
        const myId = Cookies.get('myid');
        if (myId) {
          const filteredPartners = data.filter((item: any) => 
            (item.owner.id !== myId && item.partner.id !== myId) ||
            (item.owner.id === myId && item.partner.id !== myId) ||
            (item.partner.id === myId && item.owner.id !== myId)
          );
          const mappedPartners = filteredPartners.map((item: any) => ({
            id: item.partner.id !== myId ? item.partner.id : item.owner.id,
            name: item.owner.id === myId ? item.partner.name : item.owner.name
          }));
          setPartners(mappedPartners);
        }
      } catch (error: any) {
        setErrorPartners(error.message || 'Ta\'minotchilarni yuklashda xato');
        console.error(error);
      } finally {
        setLoadingPartners(false);
      }
    };
    fetchPartners();
  }, []);

  const handleInputChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && imageFiles.length < 4) {
      const newFiles = Array.from(files).slice(0, 4 - imageFiles.length);
      setImageFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSupplierChange = (questionId: string, value: string) => {
    setSuppliers((prev) => ({ ...prev, [questionId]: value }));
    if (value) {
      setFormData(prev => ({ ...prev, [questionId]: '' }));
    }
  };

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) => {
      const newSet = new Set(prev);
      newSet.has(sectionId) ? newSet.delete(sectionId) : newSet.add(sectionId);
      return newSet;
    });
  };

  const isSupplierSection = (sectionId: string) => {
    return !["1.1", "1.2", "2.1", "2.2", "3.1", "3.2", "4.1", "4.2", "5.1", "5.2", "6.1", "6.2", "7.1", "7.2", "8.1", "8.2", "9.1", "9.2"].includes(sectionId);
  };

  const handleSubmit = async () => {
    if (!selectedCategory) return;

    const payload: Record<string, any> = {
      name: formData[Object.values(categories[selectedCategory].sections).flatMap(sec => sec.questions)[0]?.id] || "Noma'lum mahsulot",
    };

    const fieldMap = categoryFieldMap[selectedCategory] || {};
    const allQuestions = Object.values(categories[selectedCategory].sections).flatMap(sec => sec.questions.map(q => q.id));

    allQuestions.forEach(qid => {
      const apiField = fieldMap[qid];
      if (!apiField) return;

      const sectionId = qid.split('.').slice(0, 2).join('.');
      const isSupplierSec = isSupplierSection(sectionId);

      if (isSupplierSec && suppliers[qid]) {
        payload[`${apiField}_org`] = suppliers[qid];
        payload[apiField] = null;
      } else if (!isSupplierSec || !suppliers[qid]) {
        payload[apiField] = formData[qid] || null;
        payload[`${apiField}_org`] = '';
      }
    });

    try {
      const formDataToSend = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formDataToSend.append(key, value);
        }
      });
      if (imageFiles.length > 0) {
        formDataToSend.append('image', imageFiles[0]);
      }

      await createProduct(selectedCategory, formDataToSend);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({});
        setSuppliers({});
        setImageFiles([]);
        setSelectedCategory(null);
        setOpenSections(new Set());
        if (fileInputRef.current) fileInputRef.current.value = "";
      }, 3000);
    } catch (error: any) {
      console.error('Yaratishda xato:', error);
      alert(`Xato: ${error.message || 'Mahsulot qo‘shilmadi'}`);
    }
  };

  return (
    <div className="bg-gradient-to-br flex min-h-screen overflow-y-scroll max-h-[90vh]">
      <main className="flex-1 md:p-8 p-4">
        <div className="container mx-auto space-y-6 max-w-4xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold text-balance tracking-tight text-gray-800">
                Yangi Mahsulot Qo‘shish
              </h1>
              <p className="text-gray-600 mt-2 text-sm md:text-base">
                Yangi mahsulot ma'lumotlarini kiriting
              </p>
            </div>
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
                    setSelectedCategory(value);
                    setFormData({});
                    setOpenSections(new Set());
                    setSuppliers({});
                    setImageFiles([]);
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
                    <Label htmlFor="images" className="text-gray-700 font-medium">
                      Mahsulot Rasmlari (maksimum 4 ta)
                    </Label>
                    <div className="flex flex-wrap gap-4">
                      <Input
                        id="images"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="border-blue-200 focus:ring-blue-400 transition-all duration-200 bg-white"
                        ref={fileInputRef}
                      />
                      {imageFiles.map((file, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Mahsulot rasmi ${index + 1}`}
                            className="w-24 h-24 object-cover rounded-md border border-blue-200"
                          />
                          <Button
                            variant="destructive"
                            size="sm"
                            className="absolute top-0 right-0 h-6 w-6 p-0 flex items-center justify-center"
                            onClick={() => handleRemoveImage(index)}
                          >
                            &times;
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  {loadingPartners && <p className="text-gray-500">Ta'minotchilar yuklanmoqda...</p>}
                  {errorPartners && <p className="text-red-500">{errorPartners}</p>}
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
                                    <Input
                                      id={question.id}
                                      value={formData[question.id] || ""}
                                      onChange={(e) => handleInputChange(question.id, e.target.value)}
                                      placeholder={question.placeholder}
                                      className="border-blue-200 focus:ring-blue-400 transition-all duration-200 p-2 text-base bg-white"
                                      disabled={!!suppliers[question.id]}
                                    />
                                    {suppliers[question.id] && (
                                      <p className="text-xs text-gray-500 mt-1">
                                        Bu maydon {partners.find(p => p.id === suppliers[question.id])?.name || suppliers[question.id]} tomonidan to'ldiriladi
                                      </p>
                                    )}
                                  </div>
                                  <div className="w-48 space-y-2">
                                    <Label className="text-gray-700 font-medium text-xs">Ta'minotchi</Label>
                                    <Select
                                      onValueChange={(value) => handleSupplierChange(question.id, value)}
                                      value={suppliers[question.id] || ""}
                                      disabled={loadingPartners}
                                    >
                                      <SelectTrigger className="border-blue-200 focus:ring-blue-400 transition-all duration-200 bg-white/80 h-10">
                                        <SelectValue placeholder="Tanlang" />
                                      </SelectTrigger>
                                      <SelectContent className="bg-white shadow-md">
                                        {partners.map((partner) => (
                                          <SelectItem key={partner.id} value={partner.id}>
                                            {partner.name}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <Label htmlFor={question.id} className="text-gray-700">
                                    {question.label}
                                  </Label>
                                  <Input
                                    id={question.id}
                                    value={formData[question.id] || ""}
                                    onChange={(e) => handleInputChange(question.id, e.target.value)}
                                    placeholder={question.placeholder}
                                    className="border-blue-200 focus:ring-blue-400 transition-all duration-200 p-2 text-base w-full bg-white"
                                  />
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
  );
}














// const categoryFieldMap: Record<string, Record<string, string>> = {
//   // 1. Gadgets
//   "1": {
//     "1.1.1": "name",
//     "1.1.2": "turi",
//     "1.1.3": "ishlab_chiqarilgan_davlat",
//     "1.1.4": "ishlab_chiqaruvchi_tashkilot",
//     "1.1.5": "kafolat_muddati",
//     "1.1.6": "ishlash_muddati",
//     "1.2.1": "olchami",
//     "1.2.2": "ogirligi",
//     "1.2.3": "batareya_sigimi",
//     "1.2.4": "quvvati",
//     "1.2.5": "energiya_sarfi",
//     "1.2.6": "ekran_olchami",
//     "1.2.7": "protsessor_turi",
//     "1.2.8": "operativ_xotira",
//     "1.2.9": "doimiy_xotira",
//     "1.2.10": "operatsion_tizim",
//     "1.2.11": "kamera_korsatkichlari",
//     "1.2.12": "yangi_texnologiyalar",
//     "1.3.1": "materiallar",
//     "1.3.2": "qadoqlash_materiali",
//     "1.3.3": "qayta_ishlash_imkoniyati",
//     "1.4.1": "sertifikatlari",
//     "1.4.2": "maxsus_xavfsizlik_sertifikati",
//     "1.4.3": "saqlash_yoriqnoma",
//     "1.4.4": "tamirlash_imkoniyati",
//   },

//   // 2. Maishiy texnika
//   "2": {
//     "2.1.1": "name",
//     "2.1.2": "modeli",
//     "2.1.3": "olchami",
//     "2.1.4": "ogirligi",
//     "2.1.5": "ishlab_chiqarilgan_davlat",
//     "2.1.6": "ishlab_chiqaruvchi_tashkilot",
//     "2.1.7": "kafolat_muddati",
//     "2.1.8": "ishlash_muddati",
//     "2.2.1": "quvvati",
//     "2.2.2": "elektr_taminoti",
//     "2.2.3": "energiya_samaradorligi",
//     "2.2.4": "energiya_sarfi",
//     "2.2.5": "suv_sarfi",
//     "2.2.6": "shovqin_darajasi",
//     "2.2.7": "foydalanish_qulayligi",
//     "2.2.8": "maxsus_xavfsizlik_funktsiyalari",
//     "2.3.1": "material",
//     "2.3.2": "qadoqlash_turi",
//     "2.3.3": "qayta_ishlash_imkoniyati",
//     "2.4.1": "zaxira_qismlar",
//     "2.4.2": "tamirlash_yoriqnoma",
//     "2.4.3": "saqlash_sharoiti",
//     "2.4.4": "sertifikatlar",
//   },

//   // 3. Kiyim
//   "3": {
//     "3.1.1": "name",
//     "3.1.2": "kiyim_turi",
//     "3.1.3": "olchami",
//     "3.1.4": "ogirligi",
//     "3.1.5": "rangi",
//     "3.1.6": "ishlab_chiqarilgan_davlat",
//     "3.1.7": "ishlab_chiqaruvchi_tashkilot",
//     "3.1.8": "ishlab_chiqarilgan_sana",
//     "3.1.9": "dizayner_brand",
//     "3.1.10": "moda_malumoti",
//     "3.2.1": "asosiy_material",
//     "3.2.2": "material_foizi",
//     "3.2.3": "maxsus_ishlov",
//     "3.2.4": "sertifikat",
//     "3.2.5": "ekologik_belgi",
//     "3.3.1": "yuvish_yoriqnoma",
//     "3.3.2": "dazmollash_yoriqnoma",
//     "3.3.3": "qadoqlash_materiali",
//     "3.3.4": "saqlash_muddati",
//     "3.3.5": "xizmat_muddati",
//     "3.4.1": "qayta_ishlash_imkoniyati",
//   },

//   // 4. Transport
//   "4": {
//     "4.1.1": "name",
//     "4.1.2": "modeli",
//     "4.1.3": "dvigatel_turi",
//     "4.1.4": "yoqilgisi",
//     "4.1.5": "quvvati",
//     "4.1.6": "ogirligi",
//     "4.1.7": "yuk_kotarish_quvvati",
//     "4.1.8": "yoqilg'i_sarfi",
//     "4.1.9": "chiqarilgan_yili",
//     "4.1.10": "ishlab_chiqaruvchi_tashkilot",
//     "4.2.1": "texnik_holat",
//     "4.2.2": "yurgan_masofa",
//     "4.2.3": "rang",
//     "4.2.4": "kuzov_turi",
//     "4.3.1": "sertifikat",
//     "4.3.2": "ekologik_standart",
//   },

//   // 5. Xizmatlar
//   "5": {
//     "5.1.1": "name",
//     "5.1.2": "xizmat_turi",
//     "5.1.3": "amal_qilish_hududi",
//     "5.1.4": "muddat",
//     "5.1.5": "narx_bahosi",
//     "5.1.6": "masul_shaxs",
//     "5.2.1": "sertifikat",
//     "5.2.2": "tajriba_yillari",
//     "5.2.3": "xavfsizlik_talablari",
//   },

//   // 6. Aksessuar
//   "6": {
//     "6.1.1": "name",
//     "6.1.2": "modeli",
//     "6.1.3": "olchami",
//     "6.1.4": "ogirligi",
//     "6.1.5": "rangi",
//     "6.1.6": "brend_nomi",
//     "6.1.7": "ishlab_chiqarilgan_davlat",
//     "6.1.8": "ishlab_chiqaruvchi_tashkilot",
//     "6.2.1": "asosiy_material",
//     "6.2.2": "qoplama_materiali",
//     "6.2.3": "sertifikat",
//     "6.2.4": "qadoqlash_turi",
//     "6.2.5": "saqlash_yoriqnoma",
//     "6.3.1": "qayta_ishlash_imkoniyati",
//   },

//   // 7. Food
//   "7": {
//     "7.1.1": "name",
//     "7.1.2": "turi",
//     "7.1.3": "ishlab_chiqarilgan_davlat",
//     "7.1.4": "ishlab_chiqaruvchi_tashkilot",
//     "7.1.5": "ishlab_chiqarilgan_sana",
//     "7.1.6": "yaroqlilik_muddati",
//     "7.1.7": "ogirligi",
//     "7.2.1": "tarkibi",
//     "7.2.2": "energiya_qiymati",
//     "7.2.3": "oqsil",
//     "7.2.4": "yog",
//     "7.2.5": "uglevod",
//     "7.3.1": "saqlash_sharoiti",
//     "7.3.2": "sertifikat",
//     "7.3.3": "qadoqlash_turi",
//     "7.3.4": "transportirovka_sharoiti",
//   },

//   // 8. Xomashyo
//   "8": {
//     "8.1.1": "name",
//     "8.1.2": "turi",
//     "8.1.3": "kelib_chiqish_manzili",
//     "8.1.4": "ishlab_chiqarilgan_davlat",
//     "8.1.5": "ishlab_chiqaruvchi_tashkilot",
//     "8.2.1": "kimyoviy_tarkib",
//     "8.2.2": "fizik_xususiyatlar",
//     "8.2.3": "sifat_standarti",
//     "8.3.1": "qadoqlash_turi",
//     "8.3.2": "transport_talablari",
//     "8.3.3": "saqlash_sharoiti",
//   },

//   // 9. Boshqa
//   "9": {
//     "9.1.1": "name",
//     "9.1.2": "kategoriya_turi",
//     "9.1.3": "tavsif",
//     "9.1.4": "ishlab_chiqarilgan_davlat",
//     "9.1.5": "ishlab_chiqaruvchi_tashkilot",
//     "9.2.1": "sertifikat",
//     "9.2.2": "maxsus_talablar",
//     "9.3.1": "qadoqlash_turi",
//     "9.3.2": "saqlash_yoriqnoma",
//   },
// };