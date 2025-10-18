// "use client";

// import { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation"; // Redirect uchun
// import { Button } from "@/src/components/ui/button";
// import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
// import { Input } from "@/src/components/ui/input";
// import { Label } from "@/src/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
// import { CheckCircle, ChevronDown } from "lucide-react";
// import { categories } from "@/lib/categories";
// import { getPartners, createProduct } from "@/lib/api";
// import Cookies from "js-cookie";
// const categoryFieldMap: Record<string, Record<string, string>> = {
//   // 1. Gadjetlar
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
// // ...
// };
// interface Partner {
//   id: string;
//   name: string;
// }

// export default function AddProductPage() {
//   const [formData, setFormData] = useState<Record<string, string>>({});
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [openSections, setOpenSections] = useState<Set<string>>(new Set());
//   const [suppliers, setSuppliers] = useState<Record<string, string>>({});
//   const [imageFiles, setImageFiles] = useState<File[]>([]);
//   const [imagePreviews, setImagePreviews] = useState<string[]>([]); // Cleanup uchun
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [partners, setPartners] = useState<Partner[]>([]);
//   const [loadingPartners, setLoadingPartners] = useState(true);
//   const [errorPartners, setErrorPartners] = useState<string | null>(null);
//   const [submitting, setSubmitting] = useState(false); // Submit loading
//   const router = useRouter();

//   useEffect(() => {
//     const fetchPartners = async () => {
//       try {
//         setLoadingPartners(true);
//         const data = await getPartners();
//         const myId = Cookies.get('myid');
//         if (!myId) return;
//         const partnerSet = new Set<string>(); // Unique uchun
//         const mappedPartners: Partner[] = [];
//         data.forEach((item: any) => {
//           let partnerId, partnerName;
//           if (item.owner.id === myId) {
//             partnerId = item.partner.id;
//             partnerName = item.partner.name;
//           } else if (item.partner.id === myId) {
//             partnerId = item.owner.id;
//             partnerName = item.owner.name;
//           }
//           if (partnerId && partnerId !== myId && !partnerSet.has(partnerId)) {
//             partnerSet.add(partnerId);
//             mappedPartners.push({ id: partnerId, name: partnerName });
//           }
//         });
//         setPartners(mappedPartners);
//       } catch (error: any) {
//         setErrorPartners(error.message || 'Ta\'minotchilarni yuklashda xato');
//         console.error(error);
//       } finally {
//         setLoadingPartners(false);
//       }
//     };
//     fetchPartners();
//   }, []);

//   useEffect(() => {
//     // Cleanup previews
//     return () => {
//       imagePreviews.forEach(URL.revokeObjectURL);
//     };
//   }, [imagePreviews]);

//   const handleInputChange = (id: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [id]: value }));
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files && imageFiles.length < 4) {
//       const newFiles = Array.from(files).slice(0, 4 - imageFiles.length);
//       const newPreviews = newFiles.map(URL.createObjectURL);
//       setImageFiles((prev) => [...prev, ...newFiles]);
//       setImagePreviews((prev) => [...prev, ...newPreviews]);
//     }
//   };

//   const handleRemoveImage = (index: number) => {
//     URL.revokeObjectURL(imagePreviews[index]);
//     setImageFiles((prev) => prev.filter((_, i) => i !== index));
//     setImagePreviews((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleSupplierChange = (questionId: string, value: string) => {
//     setSuppliers((prev) => ({ ...prev, [questionId]: value }));
//     if (value) {
//       setFormData(prev => ({ ...prev, [questionId]: '' })); // Tozalash
//     }
//   };

//   const toggleSection = (sectionId: string) => {
//     setOpenSections((prev) => {
//       const newSet = new Set(prev);
//       newSet.has(sectionId) ? newSet.delete(sectionId) : newSet.add(sectionId);
//       return newSet;
//     });
//   };

//   const isSupplierSection = (sectionId: string) => {
//     return !["1.1", "1.2", "2.1", "2.2", "3.1", "3.2", "4.1", "4.2", "5.1", "5.2", "6.1", "6.2", "7.1", "7.2", "8.1", "8.2", "9.1", "9.2"].includes(sectionId);
//   };

//   const handleSubmit = async () => {
//     if (!selectedCategory || submitting) return;
//     const categoryConfig = categories[selectedCategory];
//     if (!categoryConfig) return alert('Kategoriya topilmadi');

//     // Simple validation: name bo'sh emas
//     const nameQuestionId = Object.values(categoryConfig.sections).flatMap(sec => sec.questions)[0]?.id;
//     if (!formData[nameQuestionId]) return alert('Mahsulot nomi kiritilmadi');

//     setSubmitting(true);
//     const payload: Record<string, any> = {
//       name: formData[nameQuestionId] || "Noma'lum mahsulot",
//     };

//     const fieldMap = categoryFieldMap[selectedCategory] || {};
//     const allQuestions = Object.values(categoryConfig.sections).flatMap(sec => sec.questions.map(q => q.id));

//     allQuestions.forEach(qid => {
//       const apiField = fieldMap[qid];
//       if (!apiField) return;

//       const sectionId = qid.split('.').slice(0, 2).join('.');
//       const isSupplierSec = isSupplierSection(sectionId);

//       if (isSupplierSec) {
//         if (suppliers[qid]) {
//           payload[`${apiField}_org`] = suppliers[qid];
//         } else if (formData[qid]) {
//           payload[apiField] = formData[qid];
//         }
//       } else {
//         payload[apiField] = formData[qid] || '';
//       }
//     });

//     try {
//       const formDataToSend = new FormData();
//       Object.entries(payload).forEach(([key, value]) => {
//         if (value !== null && value !== undefined && value !== '') {
//           formDataToSend.append(key, value);
//         }
//       });
//       if (imageFiles.length > 0) {
//         imageFiles.forEach((file) => {
//           formDataToSend.append('images', file);
//         });
//       }

//       await createProduct(selectedCategory, formDataToSend);
//       setIsSubmitted(true);
//       setTimeout(() => {
//         router.push('/manufacturer/products'); // Redirect
//       }, 3000);
//     } catch (error: any) {
//       console.error('Yaratishda xato:', error);
//       alert(`Xato: ${error.message || 'Mahsulot qo‘shilmadi'}`);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="bg-gradient-to-br flex min-h-screen overflow-y-scroll max-h-[90vh]">
//       <main className="flex-1 md:p-8 p-4">
//         <div className="container mx-auto space-y-6 max-w-4xl">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl md:text-4xl font-semibold text-balance tracking-tight text-gray-800">
//                 Yangi Mahsulot Qo‘shish
//               </h1>
//               <p className="text-gray-600 mt-2 text-sm md:text-base">
//                 Yangi mahsulot ma'lumotlarini kiriting
//               </p>
//             </div>
//           </div>

//           <Card className="p-6 bg-gradient-to-br from-white to-blue-50/80 backdrop-blur-md border border-blue-200/50 shadow-lg">
//             {isSubmitted && (
//               <div className="flex items-center gap-2 p-4 mb-6 bg-green-100/70 rounded-lg border border-green-200/50">
//                 <CheckCircle className="h-5 w-5 text-green-600" />
//                 <p className="text-sm text-green-700">
//                   Mahsulot qo‘shildi va QR kod avtomatik generatsiya qilindi!
//                 </p>
//               </div>
//             )}
//             <div className="space-y-6">
//               <div className="space-y-2">
//                 <Label htmlFor="category" className="text-gray-700 font-medium">
//                   Kategoriya
//                 </Label>
//                 <Select
//                   onValueChange={(value) => {
//                     setSelectedCategory(value);
//                     setFormData({});
//                     setOpenSections(new Set());
//                     setSuppliers({});
//                     setImageFiles([]);
//                     setImagePreviews([]);
//                   }}
//                   value={selectedCategory || ""}
//                 >
//                   <SelectTrigger className="border-blue-200 focus:ring-blue-400 transition-all duration-200 bg-white/80">
//                     <SelectValue placeholder="Kategoriyani tanlang" />
//                   </SelectTrigger>
//                   <SelectContent className="bg-white shadow-md">
//                     {Object.entries(categories).map(([key, category]) => (
//                       <SelectItem key={key} value={key} className="hover:bg-blue-50">
//                         {category.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               {selectedCategory && (
//                 <div className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="images" className="text-gray-700 font-medium">
//                       Mahsulot Rasmlari (maksimum 4 ta)
//                     </Label>
//                     <div className="flex flex-wrap gap-4">
//                       <Input
//                         id="images"
//                         type="file"
//                         accept="image/*"
//                         multiple
//                         onChange={handleImageChange}
//                         className="border-blue-200 focus:ring-blue-400 transition-all duration-200 bg-white"
//                         ref={fileInputRef}
//                       />
//                       {imagePreviews.map((preview, index) => (
//                         <div key={index} className="relative">
//                           <img
//                             src={preview}
//                             alt={`Mahsulot rasmi ${index + 1}`}
//                             className="w-24 h-24 object-cover rounded-md border border-blue-200"
//                           />
//                           <Button
//                             variant="destructive"
//                             size="sm"
//                             className="absolute top-0 right-0 h-6 w-6 p-0 flex items-center justify-center"
//                             onClick={() => handleRemoveImage(index)}
//                           >
//                             &times;
//                           </Button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                   {loadingPartners && <p className="text-gray-500">Ta'minotchilar yuklanmoqda...</p>}
//                   {errorPartners && <p className="text-red-500">{errorPartners}</p>}
//                   {Object.entries(categories[selectedCategory].sections).map(([sectionId, section]) => (
//                     <Card
//                       key={sectionId}
//                       className="bg-gradient-to-br from-blue-50 to-white/90 border-blue-100 shadow-sm hover:shadow-md transition-all duration-300"
//                     >
//                       <CardHeader
//                         className="flex items-center justify-between p-4 cursor-pointer bg-blue-100/50 hover:bg-blue-200/50 rounded-t-lg"
//                         onClick={() => toggleSection(sectionId)}
//                       >
//                         <h3 className="text-lg font-medium text-gray-800">{section.title}</h3>
//                         <ChevronDown
//                           className={`h-5 w-5 text-gray-600 transition-transform duration-200 ${
//                             openSections.has(sectionId) ? "rotate-180" : ""
//                           }`}
//                         />
//                       </CardHeader>
//                       {openSections.has(sectionId) && (
//                         <CardContent className="p-4 space-y-4 bg-white/80">
//                           {section.questions.map((question) => (
//                             <div key={question.id} className="space-y-2">
//                               {isSupplierSection(sectionId) ? (
//                                 <div className="flex gap-4 items-end">
//                                   <div className="flex-1 space-y-2">
//                                     <Label htmlFor={question.id} className="text-gray-700">
//                                       {question.label}
//                                     </Label>
//                                     <Input
//                                       id={question.id}
//                                       value={formData[question.id] || ""}
//                                       onChange={(e) => handleInputChange(question.id, e.target.value)}
//                                       placeholder={question.placeholder}
//                                       className="border-blue-200 focus:ring-blue-400 transition-all duration-200 p-2 text-base bg-white"
//                                       disabled={!!suppliers[question.id]}
//                                     />
//                                     {suppliers[question.id] && (
//                                       <p className="text-xs text-gray-500 mt-1">
//                                         Bu maydon {partners.find(p => p.id === suppliers[question.id])?.name || suppliers[question.id]} tomonidan to'ldiriladi
//                                       </p>
//                                     )}
//                                   </div>
//                                   <div className="w-48 space-y-2">
//                                     <Label className="text-gray-700 font-medium text-xs">Ta'minotchi</Label>
//                                     <Select
//                                       onValueChange={(value) => handleSupplierChange(question.id, value)}
//                                       value={suppliers[question.id] || ""}
//                                       disabled={loadingPartners}
//                                     >
//                                       <SelectTrigger className="border-blue-200 focus:ring-blue-400 transition-all duration-200 bg-white/80 h-10">
//                                         <SelectValue placeholder="Tanlang" />
//                                       </SelectTrigger>
//                                       <SelectContent className="bg-white shadow-md">
//                                         {partners.map((partner) => (
//                                           <SelectItem key={partner.id} value={partner.id}>
//                                             {partner.name}
//                                           </SelectItem>
//                                         ))}
//                                       </SelectContent>
//                                     </Select>
//                                   </div>
//                                 </div>
//                               ) : (
//                                 <>
//                                   <Label htmlFor={question.id} className="text-gray-700">
//                                     {question.label}
//                                   </Label>
//                                   <Input
//                                     id={question.id}
//                                     value={formData[question.id] || ""}
//                                     onChange={(e) => handleInputChange(question.id, e.target.value)}
//                                     placeholder={question.placeholder}
//                                     className="border-blue-200 focus:ring-blue-400 transition-all duration-200 p-2 text-base w-full bg-white"
//                                   />
//                                 </>
//                               )}
//                             </div>
//                           ))}
//                         </CardContent>
//                       )}
//                     </Card>
//                   ))}
//                 </div>
//               )}

//               <Button
//                 className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 shadow-md hover:shadow-lg w-full md:w-auto"
//                 onClick={handleSubmit}
//                 disabled={!selectedCategory || submitting}
//               >
//                 {submitting ? "Saqlanmoqda..." : "Saqlash"}
//               </Button>
//             </div>
//           </Card>
//         </div>
//       </main>
//     </div>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { CheckCircle, ChevronDown, Plus } from "lucide-react";
import { categories } from "@/lib/categories";
import { getPartners, createProduct } from "@/lib/api";
import Cookies from "js-cookie";
import { categoryFieldMap } from "../note";

interface Partner {
  id: string;
  name: string;
}

export default function AddProductPage() {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());
  const [suppliers, setSuppliers] = useState<Record<string, string>>({});
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loadingPartners, setLoadingPartners] = useState(true);
  const [errorPartners, setErrorPartners] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoadingPartners(true);
        const data = await getPartners();
        const myId = Cookies.get("myid");
        if (!myId) return;
        const partnerSet = new Set<string>();
        const mappedPartners: Partner[] = [];
        data.forEach((item: any) => {
          let partnerId, partnerName;
          if (item.owner.id === myId) {
            partnerId = item.partner.id;
            partnerName = item.partner.name;
          } else if (item.partner.id === myId) {
            partnerId = item.owner.id;
            partnerName = item.owner.name;
          }
          if (partnerId && partnerId !== myId && !partnerSet.has(partnerId)) {
            partnerSet.add(partnerId);
            mappedPartners.push({ id: partnerId, name: partnerName });
          }
        });
        setPartners(mappedPartners);
      } catch (error: any) {
        setErrorPartners(error.message || "Ta'minotchilarni yuklashda xato");
        console.error(error);
      } finally {
        setLoadingPartners(false);
      }
    };
    fetchPartners();
  }, []);

  useEffect(() => {
    return () => {
      imagePreviews.forEach(URL.revokeObjectURL);
    };
  }, [imagePreviews]);

  const handleInputChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && imageFiles.length < 5) {
      const newFiles = Array.from(files).slice(0, 5 - imageFiles.length);
      const newPreviews = newFiles.map(URL.createObjectURL);
      setImageFiles((prev) => [...prev, ...newFiles]);
      setImagePreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const handleRemoveImage = (index: number) => {
    URL.revokeObjectURL(imagePreviews[index]);
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSupplierChange = (questionId: string, value: string) => {
    setSuppliers((prev) => {
      const newSuppliers = { ...prev };
      if (value === "") {
        delete newSuppliers[questionId]; // Ta'minotchini olib tashlash
      } else {
        newSuppliers[questionId] = value;
      }
      return newSuppliers;
    });
    if (value) {
      setFormData((prev) => ({ ...prev, [questionId]: "" })); // Ta'minotchi tanlanganda maydonni tozalash
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
    return ![
      "1.1",
      "1.2",
      "2.1",
      "2.2",
      "3.1",
      "3.2",
      "4.1",
      "4.2",
      "5.1",
      "5.2",
      "6.1",
      "6.2",
      "7.1",
      "7.2",
      "8.1",
      "8.2",
      "9.1",
      "9.2",
      "1.4",
      "2.4",
      "4.4",
      "6.4",
      "7.4",
      "9.4"
    ].includes(sectionId);
  };

  const handleSubmit = async () => {
    if (!selectedCategory || submitting) return;
    const categoryConfig = categories[selectedCategory];
    if (!categoryConfig) return alert("Kategoriya topilmadi");

    const nameQuestionId = Object.values(categoryConfig.sections).flatMap(
      (sec) => sec.questions
    )[0]?.id;
    if (!formData[nameQuestionId]) return alert("Mahsulot nomi kiritilmadi");

    setSubmitting(true);
    const payload: Record<string, any> = {
      name: formData[nameQuestionId] || "Noma'lum mahsulot",
    };

    const fieldMap = categoryFieldMap[selectedCategory] || {};
    const allQuestions = Object.values(categoryConfig.sections).flatMap((sec) =>
      sec.questions.map((q) => q.id)
    );

    allQuestions.forEach((qid) => {
      const apiField = fieldMap[qid];
      if (!apiField) return;

      const sectionId = qid.split(".").slice(0, 2).join(".");
      const isSupplierSec = isSupplierSection(sectionId);

      if (isSupplierSec) {
        if (suppliers[qid]) {
          payload[`${apiField}_org`] = suppliers[qid];
        } else if (formData[qid]) {
          payload[apiField] = formData[qid];
        }
      } else {
        payload[apiField] = formData[qid] || "";
      }
    });

    try {
      const formDataToSend = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
          formDataToSend.append(key, value);
        }
      });
      if (imageFiles.length > 0) {
        imageFiles.forEach((file) => {
          formDataToSend.append("images", file);
        });
      }

      await createProduct(selectedCategory, formDataToSend);
      setIsSubmitted(true);
      setTimeout(() => {
        router.push("/manufacturer/products");
      }, 3000);
    } catch (error: any) {
      console.error("Yaratishda xato:", error);
      alert(`Xato: ${error.message || "Mahsulot qo‘shilmadi"}`);
    } finally {
      setSubmitting(false);
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
                    setImagePreviews([]);
                  }}
                  value={selectedCategory || ""}
                >
                  <SelectTrigger className="border-blue-200 focus:ring-blue-400 transition-all duration-200 bg-white/80">
                    <SelectValue placeholder="Kategoriyani tanlang" />
                  </SelectTrigger>
                  <SelectContent className="bg-white shadow-md">
                    {Object.entries(categories).map(([key, category]) => (
                      <SelectItem
                        key={key}
                        value={key}
                        className="hover:bg-blue-50"
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedCategory && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="images"
                      className="text-gray-700 font-medium"
                    >
                      Mahsulot Rasmlari (maksimum 5 ta)
                    </Label>
                    <Input
                      id="images"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="hidden"
                      ref={fileInputRef}
                    />
                    <div className="flex flex-wrap gap-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative">
                          <img
                            src={preview}
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
                      {imageFiles.length < 5 && (
                        <div
                          className="w-24 h-24 bg-blue-100/50 rounded-md flex items-center justify-center cursor-pointer 
               transition-all duration-300 hover:bg-blue-200/60 hover:shadow-md hover:shadow-blue-300/50 
               group"
                          onClick={() => {
                            console.log("bosildi------------------");
                            fileInputRef.current?.click();
                          }}
                        >
                          <Plus className="h-6 w-6 text-gray-600 transition-all duration-300 group-hover:text-blue-600 group-hover:scale-125" />
                        </div>
                      )}

                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </div>
                  </div>
                  {loadingPartners && (
                    <p className="text-gray-500">
                      Ta'minotchilar yuklanmoqda...
                    </p>
                  )}
                  {errorPartners && (
                    <p className="text-red-500">{errorPartners}</p>
                  )}
                  {Object.entries(categories[selectedCategory].sections).map(
                    ([sectionId, section]) => (
                      <Card
                        key={sectionId}
                        className="bg-gradient-to-br from-blue-50 to-white/90 border-blue-100 shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        <CardHeader
                          className="flex items-center justify-between p-4 cursor-pointer bg-blue-100/50 hover:bg-blue-200/50 rounded-t-lg"
                          onClick={() => toggleSection(sectionId)}
                        >
                          <h3 className="text-lg font-medium text-gray-800">
                            {section.title}
                          </h3>
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
                                      <Label
                                        htmlFor={question.id}
                                        className="text-gray-700"
                                      >
                                        {question.label}
                                      </Label>
                                      <Input
                                        id={question.id}
                                        value={formData[question.id] || ""}
                                        onChange={(e) =>
                                          handleInputChange(
                                            question.id,
                                            e.target.value
                                          )
                                        }
                                        placeholder={question.placeholder}
                                        className="border-blue-200 focus:ring-blue-400 transition-all duration-200 p-2 text-base bg-white"
                                        disabled={!!suppliers[question.id]}
                                      />
                                      {suppliers[question.id] && (
                                        <p className="text-xs text-gray-500 mt-1">
                                          Bu maydon{" "}
                                          {partners.find(
                                            (p) =>
                                              p.id === suppliers[question.id]
                                          )?.name ||
                                            suppliers[question.id]}{" "}
                                          tomonidan to'ldiriladi
                                        </p>
                                      )}
                                    </div>
                                    <div className="w-48 space-y-2">
                                      <Label className="text-gray-700 font-medium text-xs">
                                        Ta'minotchi
                                      </Label>
                                      <Select
                                        onValueChange={(value) => {
                                          handleSupplierChange(
                                            question.id,
                                            value === "none" ? "" : value
                                          );
                                        }}
                                        value={suppliers[question.id] || "none"} // agar hech narsa tanlanmagan bo‘lsa — "none"
                                        disabled={loadingPartners}
                                      >
                                        <SelectTrigger className="border-blue-200 focus:ring-blue-400 transition-all duration-200 bg-white/80 h-10">
                                          <SelectValue placeholder="Tanlang" />
                                        </SelectTrigger>

                                        <SelectContent className="bg-white shadow-md">
                                          <SelectItem
                                            value="none"
                                            className="hover:bg-blue-50"
                                          >
                                            Ta'minotchi tanlamaslik
                                          </SelectItem>

                                          {partners.map((partner) => (
                                            <SelectItem
                                              key={partner.id}
                                              value={partner.id.toString()}
                                              className="hover:bg-blue-50"
                                            >
                                              {partner.name}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <Label
                                      htmlFor={question.id}
                                      className="text-gray-700"
                                    >
                                      {question.label}
                                    </Label>
                                    <Input
                                      id={question.id}
                                      value={formData[question.id] || ""}
                                      onChange={(e) =>
                                        handleInputChange(
                                          question.id,
                                          e.target.value
                                        )
                                      }
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
                    )
                  )}
                </div>
              )}

              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 shadow-md hover:shadow-lg w-full md:w-auto"
                onClick={handleSubmit}
                disabled={!selectedCategory || submitting}
              >
                {submitting ? "Saqlanmoqda..." : "Saqlash"}
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
