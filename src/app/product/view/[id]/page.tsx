// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
// import { Button } from "@/src/components/ui/button";
// import { Sidebar } from "@/src/components/manufacturer/Sidebar";
// import { ChevronDown, ChevronUp, Building2, Star } from "lucide-react";
// import { categoryFieldMap, getReverseFieldMap } from "../../../manufacturer/products/note";
// import { categories } from "@/lib/categories";

// type Question = {
//   id: string;
//   label: string;
//   type: string;
//   placeholder?: string;
// };

// type Section = {
//   title: string;
//   questions: Question[];
// };

// type Category = {
//   name: string;
//   sections: Record<string, Section>;
// };

// type ProductDetails = Record<string, string | undefined>;

// type SuppliersMap = Record<string, string | undefined>;

// type ProductData = {
//   id: string;
//   name: string;
//   category: string;
//   categoryKey: string;
//   created_by: string;
//   scans: number;
//   rating: number;
//   status: string;
//   images: string[];
//   details: ProductDetails;
//   suppliers: SuppliersMap;
// };

// const fetchProductByToken = async (token: string) => {
//   try {
//     const response = await fetch(`https://api.e-investment.uz/api/v1/products/qr/token/${token}/`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     if (!response.ok) {
//       throw new Error("Mahsulotni olishda xatolik yuz berdi");
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("API xatosi:", error);
//     throw error;
//   }
// };

// export default function ProductDetailsPage(): JSX.Element {
//   const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
//   const [isMobile, setIsMobile] = useState<boolean>(false);
//   const [openSections, setOpenSections] = useState<Set<string>>(() => new Set());
//   const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
//   const [productData, setProductData] = useState<ProductData | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();
//   const params = useParams();
//   const token = params.id as string;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const data = await fetchProductByToken(token);
//         const categoryKey = Object.entries(categories).find(([_, cat]) =>
//           cat.sections["1.1"]?.questions.some(q => q.id === "1.1.1")
//         )?.[0] || "1";
//         const reverseMap = getReverseFieldMap(categoryKey);
//         const allQuestions = Object.values(categories[categoryKey].sections).flatMap(sec => sec.questions.map(q => q.id));
        
//         const details: ProductDetails = {};
//         const suppliers: SuppliersMap = {};
        
//         Object.entries(data).forEach(([apiField, value]) => {
//           if (typeof value !== "string" && typeof value !== "number") return;
//           if (["id", "status", "token", "blockchain_hash", "qr_code", "created_at", "created_by", "created_user", "qr_token"].includes(apiField)) return;
          
//           const cleanField = apiField.replace("_org", "");
//           const uiId = reverseMap[cleanField];
          
//           if (uiId && allQuestions.includes(uiId)) {
//             if (apiField.endsWith("_org")) {
//               suppliers[uiId] = value as string;
//             } else {
//               details[uiId] = value as string;
//             }
//           }
//         });
        
//         details["1.1.1"] = data.name || "Noma'lum";

//         let images: string[] = [];
//         if (data.images) {
//           images = Array.isArray(data.images) ? data.images : (data.image ? [data.image] : []);
//         } else if (data.image) {
//           images = [data.image];
//         }

//         setProductData({
//           id: data.id.toString(),
//           name: data.name || "Noma'lum",
//           category: categories[categoryKey].name || "Noma'lum",
//           categoryKey,
//           created_by: data.created_by || "Noma'lum",
//           scans: data.scans || 0,
//           rating: data.rating || 0,
//           status: data.status || "active",
//           images,
//           details,
//           suppliers,
//         });
//       } catch (err) {
//         setError("Mahsulot ma'lumotlarini olishda xatolik yuz berdi");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [token]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prev) => (prev + 1) % (productData?.images.length || 1));
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [productData]);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//       if (window.innerWidth >= 768) setIsSidebarOpen(true);
//       else setIsSidebarOpen(false);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const toggleSection = (sectionId: string) => {
//     setOpenSections((prev) => {
//       const next = new Set(prev);
//       if (next.has(sectionId)) next.delete(sectionId);
//       else next.add(sectionId);
//       return next;
//     });
//   };

//   const calculateSectionCompletion = (sectionId: string): number => {
//     if (!productData) return 0;
//     const section = categories[productData.categoryKey].sections[sectionId];
//     const totalQuestions = section.questions.length;
//     const filledQuestions = section.questions.filter((q) => {
//       const v = productData.details[q.id];
//       return v !== undefined && v !== null && String(v).trim() !== "";
//     }).length;
//     return totalQuestions === 0 ? 0 : (filledQuestions / totalQuestions) * 100;
//   };

//   const calculateOverallCompletion = (): number => {
//     if (!productData) return 0;
//     const allQuestions = Object.values(categories[productData.categoryKey].sections).flatMap((s) => s.questions);
//     const total = allQuestions.length;
//     const filled = allQuestions.filter((q) => {
//       const v = productData.details[q.id];
//       return v !== undefined && v !== null && String(v).trim() !== "";
//     }).length;
//     return total === 0 ? 0 : (filled / total) * 100;
//   };

//   const getCompletionColor = (percentage: number) => {
//     if (percentage >= 80) return "bg-green-500";
//     if (percentage >= 50) return "bg-yellow-500";
//     return "bg-red-500";
//   };

//   const [touchStart, setTouchStart] = useState<number | null>(null);
//   const [touchEnd, setTouchEnd] = useState<number | null>(null);

//   const getClientXFromEvent = (e: React.TouchEvent | React.MouseEvent): number => {
//     if ("touches" in e && e.touches && e.touches.length > 0) {
//       return e.touches[0].clientX;
//     }
//     return (e as React.MouseEvent).clientX;
//   };

//   const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
//     const clientX = getClientXFromEvent(e);
//     setTouchStart(clientX);
//   };

//   const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
//     const clientX = getClientXFromEvent(e);
//     setTouchEnd(clientX);
//   };

//   const handleTouchEnd = () => {
//     if (touchStart !== null && touchEnd !== null && productData) {
//       const diff = touchStart - touchEnd;
//       const threshold = 50;
//       if (diff > threshold) {
//         setCurrentImageIndex((prev) => (prev + 1) % productData.images.length);
//       } else if (diff < -threshold) {
//         setCurrentImageIndex((prev) => (prev - 1 + productData.images.length) % productData.images.length);
//       }
//     }
//     setTouchStart(null);
//     setTouchEnd(null);
//   };

//   const renderRatingStars = (rating: number) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       const filled = i <= Math.floor(rating);
//       stars.push(
//         <Star
//           key={i}
//           aria-hidden
//           className={`h-4 w-4 sm:h-5 sm:w-5 ${filled ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
//         />
//       );
//     }
//     return stars;
//   };

//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
//         <p className="text-gray-600 text-lg">Yuklanmoqda...</p>
//       </div>
//     );
//   }

//   if (error || !productData) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
//         <p className="text-red-600 text-lg">{error || "Mahsulot topilmadi"}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gradient-to-br from-gray-50 to-blue-50 flex min-h-screen">
//       {/* <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} /> */}
//       <main className="w-full p-4 sm:p-6 md:p-8 lg:p-10">
//         <div className="container mx-auto space-y-6">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//             <div>
//               <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800">{productData.name}</h1>
//               <p className="text-gray-600 mt-2 text-sm sm:text-base">Kategoriya: {productData.category}</p>
//               <div className="flex items-center gap-2 mt-2">
//                 <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
//                 <p className="text-gray-600 text-sm sm:text-base">Ishlab chiqaruvchi: {productData?.created_by}</p>
//               </div>
//               <div className="flex items-center gap-2 mt-2">
//                 <span className="text-sm text-gray-700">Reyting:</span>
//                 <div className="flex items-center">{renderRatingStars(productData.rating)}</div>
//                 <span className="text-sm font-medium text-gray-700">{productData.rating}/5</span>
//               </div>
//               <div className="mt-2 flex items-center gap-2">
//                 <span className="text-sm text-gray-700">To‘ldirilganlik:</span>
//                 <div className={`h-2 w-24 rounded-full ${getCompletionColor(calculateOverallCompletion())}`} />
//                 <span className="text-sm font-medium text-gray-700">{Math.round(calculateOverallCompletion())}%</span>
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
//             <Card className="bg-gradient-to-br from-white to-blue-50/80 border-blue-200/50 shadow-lg h-[400px] sm:h-[450px] lg:h-[510px]">
//               <CardHeader>
//                 <h2 className="text-lg sm:text-xl font-medium text-gray-800">Mahsulot Rasmi</h2>
//               </CardHeader>
//               <CardContent
//                 className="relative overflow-hidden"
//                 onTouchStart={handleTouchStart}
//                 onTouchMove={handleTouchMove}
//                 onTouchEnd={handleTouchEnd}
//                 onMouseDown={handleTouchStart}
//                 onMouseMove={handleTouchMove}
//                 onMouseUp={handleTouchEnd}
//                 onMouseLeave={handleTouchEnd}
//               >
//                 <img
//                   src={productData.images[currentImageIndex] || "/placeholder.png"}
//                   alt={`${productData.name} - ${currentImageIndex + 1}`}
//                   className="w-full h-56 sm:h-64 lg:h-80 object-cover rounded-lg shadow-md cursor-grab"
//                 />
//                 <div className="mt-4 grid grid-cols-3 sm:grid-cols-3 gap-2">
//                   {productData.images.map((img, idx) => (
//                     <img
//                       key={idx}
//                       src={img}
//                       alt={`${productData.name} - ${idx + 1}`}
//                       className={`w-full h-12 sm:h-16 object-cover rounded-md cursor-pointer ${currentImageIndex === idx ? "border-2 border-blue-500" : ""}`}
//                       onClick={() => setCurrentImageIndex(idx)}
//                     />
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>

//             <div className="lg:col-span-2 space-y-4">
//               {Object.entries(categories[productData.categoryKey].sections).map(([sectionId, section]) => {
//                 const completionPercentage = calculateSectionCompletion(sectionId);
//                 return (
//                   <Card
//                     key={sectionId}
//                     className="bg-gradient-to-br from-blue-50 to-white/90 border-blue-100 shadow-sm hover:shadow-md transition-all duration-300"
//                   >
//                     <CardHeader
//                       className="flex items-center justify-between p-4 cursor-pointer bg-blue-100/50 hover:bg-blue-200/50 rounded-t-lg"
//                       onClick={() => toggleSection(sectionId)}
//                     >
//                       <div className="flex items-center gap-3">
//                         <div className={`h-3 w-3 rounded-full ${getCompletionColor(completionPercentage)}`} />
//                         <h3 className="text-base sm:text-lg font-medium text-gray-800">{section.title}</h3>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <span className="text-sm text-gray-600">{Math.round(completionPercentage)}%</span>
//                         {openSections.has(sectionId) ? (
//                           <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
//                         ) : (
//                           <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
//                         )}
//                       </div>
//                     </CardHeader>
//                     {openSections.has(sectionId) && (
//                       <CardContent className="p-4 bg-white/80">
//                         <dl className="space-y-3">
//                           {section.questions.map((question) => (
//                             <div key={question.id} className="flex flex-col sm:flex-row sm:gap-4">
//                               <dt className="text-gray-700 font-medium w-full sm:w-1/2 text-sm sm:text-base">{question.label}</dt>
//                               <dd className="text-gray-600 w-full sm:w-1/2 text-sm sm:text-base">
//                                 {productData.details[question.id] && String(productData.details[question.id]).trim() !== "" ? (
//                                   <span>{productData.details[question.id]}</span>
//                                 ) : (
//                                   <span className="text-gray-400 italic">Ma’lumot kiritilmagan</span>
//                                 )}
//                                 {productData.suppliers[question.id] && (
//                                   <span className="ml-2 text-xs text-gray-500">
//                                     (Hamkor: {productData.suppliers[question.id]})
//                                   </span>
//                                 )}
//                               </dd>
//                             </div>
//                           ))}
//                         </dl>
//                       </CardContent>
//                     )}
//                   </Card>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Sidebar } from "@/src/components/manufacturer/Sidebar";
import { ChevronDown, ChevronUp, Building2, Star } from "lucide-react";
import { categoryFieldMap, getReverseFieldMap } from "../../../manufacturer/products/note";
import { categories } from "@/lib/categories";
import { Label } from "@/src/components/ui/label";

type Question = {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
};

type Section = {
  title: string;
  questions: Question[];
};

type Category = {
  name: string;
  sections: Record<string, Section>;
};

type ProductDetails = Record<string, string | undefined>;

type SuppliersMap = Record<string, string | undefined>;

type ProductData = {
  id: string;
  name: string;
  category: string;
  categoryKey: string;
  created_by: string;
  scans: number;
  rating: number;
  status: string;
  images: string[];
  details: ProductDetails;
  suppliers: SuppliersMap;
};

const modelToKey: Record<string, string> = {
  GadgetProduct: "1",
  MaishiyTexnikaProduct: "2",
  KiyimProduct: "3",
  FoodProduct: "4",
  QurilishProduct: "5",
  AksessuarProduct: "6",
  SalomatlikProduct: "7",
  UyBuyumProduct: "8",
  KanselyariyaProduct: "9",
};

const modelToKeyLower: Record<string, string> = Object.fromEntries(
  Object.entries(modelToKey).map(([k, v]) => [k.toLowerCase(), v])
);

const fetchProductByToken = async (token: string) => {
  try {
    const response = await fetch(`https://api.e-investment.uz/api/v1/products/qr/token/${token}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Mahsulotni olishda xatolik yuz berdi");
    }
    return await response.json();
  } catch (error) {
    console.error("API xatosi:", error);
    throw error;
  }
};

export default function ProductDetailsPage(): JSX.Element {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [openSections, setOpenSections] = useState<Set<string>>(() => new Set());
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const token = params.id as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchProductByToken(token);
        
        // Modeldan categoryKey ni aniqlash
        const model = data.model;
        const categoryKey = modelToKey[model] || 
                          modelToKeyLower[model.toLowerCase()] || 
                          modelToKey[model.charAt(0).toUpperCase() + model.slice(1).toLowerCase()] || 
                          "1";
        
        const reverseMap = getReverseFieldMap(categoryKey);
        const allQuestions = Object.values(categories[categoryKey].sections).flatMap(sec => sec.questions.map(q => q.id));
        
        const details: ProductDetails = {};
        const suppliers: SuppliersMap = {};
        
        Object.entries(data).forEach(([apiField, value]) => {
          if (typeof value !== "string" && typeof value !== "number") return;
          if (["id", "status", "token", "blockchain_hash", "qr_code", "created_at", "created_by", "created_user", "qr_token", "model"].includes(apiField)) return;
          
          const cleanField = apiField.replace("_org", "");
          const uiId = reverseMap[cleanField];
          
          if (uiId && allQuestions.includes(uiId)) {
            if (apiField.endsWith("_org")) {
              suppliers[uiId] = value as string;
            } else {
              details[uiId] = value as string;
            }
          }
        });
        
        details["1.1.1"] = data.name || "Noma'lum";

        let images: string[] = [];
        if (data.images) {
          images = Array.isArray(data.images) ? data.images : (data.image ? [data.image] : []);
        } else if (data.image) {
          images = [data.image];
        }

        setProductData({
          id: data.id.toString(),
          name: data.name || "Noma'lum",
          category: categories[categoryKey]?.name || "Noma'lum",
          categoryKey,
          created_by: data.ishlab_chiqaruvchi_tashkilot || data.created_by || "Noma'lum",
          scans: data.scans || 0,
          rating: data.rating || 0,
          status: data.status || "active",
          images,
          details,
          suppliers,
        });
      } catch (err) {
        setError("Mahsulot ma'lumotlarini olishda xatolik yuz berdi");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % (productData?.images.length || 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [productData]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsSidebarOpen(true);
      else setIsSidebarOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) next.delete(sectionId);
      else next.add(sectionId);
      return next;
    });
  };

  const calculateSectionCompletion = (sectionId: string): number => {
    if (!productData) return 0;
    const section = categories[productData.categoryKey].sections[sectionId];
    const totalQuestions = section.questions.length;
    const filledQuestions = section.questions.filter((q) => {
      const v = productData.details[q.id];
      return v !== undefined && v !== null && String(v).trim() !== "";
    }).length;
    return totalQuestions === 0 ? 0 : (filledQuestions / totalQuestions) * 100;
  };

  const calculateOverallCompletion = (): number => {
    if (!productData) return 0;
    const allQuestions = Object.values(categories[productData.categoryKey].sections).flatMap((s) => s.questions);
    const total = allQuestions.length;
    const filled = allQuestions.filter((q) => {
      const v = productData.details[q.id];
      return v !== undefined && v !== null && String(v).trim() !== "";
    }).length;
    return total === 0 ? 0 : (filled / total) * 100;
  };

  const getCompletionColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const getClientXFromEvent = (e: React.TouchEvent | React.MouseEvent): number => {
    if ("touches" in e && e.touches && e.touches.length > 0) {
      return e.touches[0].clientX;
    }
    return (e as React.MouseEvent).clientX;
  };

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = getClientXFromEvent(e);
    setTouchStart(clientX);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = getClientXFromEvent(e);
    setTouchEnd(clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart !== null && touchEnd !== null && productData) {
      const diff = touchStart - touchEnd;
      const threshold = 50;
      if (diff > threshold) {
        setCurrentImageIndex((prev) => (prev + 1) % productData.images.length);
      } else if (diff < -threshold) {
        setCurrentImageIndex((prev) => (prev - 1 + productData.images.length) % productData.images.length);
      }
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const renderRatingStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const filled = i <= Math.floor(rating);
      stars.push(
        <Star
          key={i}
          aria-hidden
          className={`h-4 w-4 sm:h-5 sm:w-5 ${filled ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
        />
      );
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <p className="text-gray-600 text-lg">Yuklanmoqda...</p>
      </div>
    );
  }

  if (error || !productData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <p className="text-red-600 text-lg">{error || "Mahsulot topilmadi"}</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 flex min-h-screen">
      {/* <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} /> */}
      <main className="w-full p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="container mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800">{productData.name}</h1>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">Kategoriya: {productData.category}</p>
              <div className="flex items-center gap-2 mt-2">
                <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                <p className="text-gray-600 text-sm sm:text-base">Ishlab chiqaruvchi: {productData.created_by}</p>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-gray-700">Reyting:</span>
                <div className="flex items-center">{renderRatingStars(productData.rating)}</div>
                <span className="text-sm font-medium text-gray-700">{productData.rating}/5</span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm text-gray-700">To‘ldirilganlik:</span>
                <div className={`h-2 w-24 rounded-full ${getCompletionColor(calculateOverallCompletion())}`} />
                <span className="text-sm font-medium text-gray-700">{Math.round(calculateOverallCompletion())}%</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <Card className="bg-gradient-to-br from-white to-blue-50/80 border-blue-200/50 shadow-lg h-[400px] sm:h-[450px] lg:h-[510px]">
              <CardHeader>
                <h2 className="text-lg sm:text-xl font-medium text-gray-800">Mahsulot Rasmi</h2>
              </CardHeader>
              <CardContent
                className="relative overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleTouchStart}
                onMouseMove={handleTouchMove}
                onMouseUp={handleTouchEnd}
                onMouseLeave={handleTouchEnd}
              >
                <img
                  src={productData.images[currentImageIndex] || "/placeholder.png"}
                  alt={`${productData.name} - ${currentImageIndex + 1}`}
                  className="w-full h-56 sm:h-64 lg:h-80 object-cover rounded-lg shadow-md cursor-grab"
                />
                <div className="mt-4 grid grid-cols-3 sm:grid-cols-3 gap-2">
                  {productData.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${productData.name} - ${idx + 1}`}
                      className={`w-full h-12 sm:h-16 object-cover rounded-md cursor-pointer ${currentImageIndex === idx ? "border-2 border-blue-500" : ""}`}
                      onClick={() => setCurrentImageIndex(idx)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="lg:col-span-2 space-y-4">
              {Object.entries(categories[productData.categoryKey].sections).map(([sectionId, section]) => {
                const completionPercentage = calculateSectionCompletion(sectionId);
                return (
                  <Card
                    key={sectionId}
                    className="bg-gradient-to-br from-blue-50 to-white/90 border-blue-100 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <CardHeader
                      className="flex items-center justify-between p-4 cursor-pointer bg-blue-100/50 hover:bg-blue-200/50 rounded-t-lg"
                      onClick={() => toggleSection(sectionId)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-3 w-3 rounded-full ${getCompletionColor(completionPercentage)}`} />
                        <h3 className="text-base sm:text-lg font-medium text-gray-800">{section.title}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">{Math.round(completionPercentage)}%</span>
                        {openSections.has(sectionId) ? (
                          <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                        ) : (
                          <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                        )}
                      </div>
                    </CardHeader>
                    {openSections.has(sectionId) && (
                      <CardContent className="p-4 bg-white/80">
  <div className="space-y-3">
    {section.questions.map((question) => {
      const value = productData.details[question.id];
      const supplierId = productData.suppliers[question.id];
      return (
        <div key={question.id} className="space-y-2 bg-white/50 p-3 rounded-md border border-blue-100">
          <div className="flex justify-between items-start">
            <Label className="text-sm font-medium text-gray-700">{question.label}</Label>
            {supplierId && (
              <span className="text-xs text-gray-500 bg-blue-50 px-2 py-1 rounded-full">
                Hamkor: {supplierId || "Noma'lum"}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-900 pl-3 border-l-2 border-blue-200">
            {value && String(value).trim() !== "" ? value : "Ma'lumot kiritilmagan"}
          </p>
        </div>
      );
    })}
  </div>
</CardContent>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}