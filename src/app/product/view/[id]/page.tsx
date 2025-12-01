// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter, useParams } from "next/navigation";
// import Link from "next/link";
// import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
// import { Button } from "@/src/components/ui/button";
// import { ChevronDown, ChevronUp, Building2, Star, StarHalf, StarOff, Vote, Package, Home, Clock, CheckCircle } from "lucide-react";
// import { Label } from "@/src/components/ui/label";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog";
// import Cookies from "js-cookie";
// import { getPartners } from "@/lib/api";

// type Question = {
//   label: string;
//   value?: string;
//   supplierId?: string;
// };

// type Section = {
//   title: string;
//   questions: Question[];
// };

// type ProductData = {
//   id: string;
//   name: string;
//   category: { id: string; name: string };
//   created_by: string;
//   rating: number;
//   all_scan: number;
//   status: string;
//   images: string[];
//   documents: string[];
//   sections: Section[];
//   user_rating: number | null;
//   activated_at?: string;
//   created_at: string;
// };

// const fetchProductByToken = async (token: string) => {
//   try {
//     const response = await fetch(`https://api.e-investment.uz/api/v1/products/qr/token/${token}/`, {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//     });
//     if (!response.ok) throw new Error("Mahsulot topilmadi");
//     return await response.json();
//   } catch (error) {
//     console.error("API xatosi:", error);
//     throw error;
//   }
// };

// const submitRating = async (rating: number, productId: string) => {
//   try {
//     console.log("Product ID:", productId, typeof productId);

//     const response = await fetch(`https://api.e-investment.uz/api/v1/products/rating/`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         rating,
//         product: productId, // ✅ endi string sifatida yuboramiz
//       }),
//     });

//     if (!response.ok) throw new Error("Reyting yuborishda xatolik");
//     return await response.json();
//   } catch (error) {
//     console.error("Reyting API xatosi:", error);
//     throw error;
//   }
// };


// export default function ProductDetailsPage(): JSX.Element {
//   const [isMobile, setIsMobile] = useState<boolean>(false);
//   const [openSections, setOpenSections] = useState<Set<string>>(() => new Set());
//   const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
//   const [productData, setProductData] = useState<ProductData | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [ratingFeedback, setRatingFeedback] = useState<string | null>(null);
//   const [isRatingModalOpen, setIsRatingModalOpen] = useState<boolean>(false);
//   const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);
//   const [partners, setPartners] = useState<{ id: string; name: string }[]>([]);

//   const router = useRouter();
//   const params = useParams();
//   const token = params.id as string;

//   // MAHSULOT
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const data = await fetchProductByToken(token);

//         setProductData({
//           id: data.id,
//           name: data.sections[0].questions[0].value || "Noma'lum",
//           category: data.category,
//           created_by: data.created_by || "Noma'lum",
//           rating: data.rating || 0,
//           all_scan: data.all_scan || 0,
//           status: data.status || "active",
//           images: data.images || [],
//           documents: data.documents || [],
//           sections: data.sections || [],
//           user_rating: data.user_rating,
//           activated_at: data.activated_at,
//           created_at: data.created_at,
//         });
//       } catch (err) {
//         setError("Bunday mahsulot mavjud emas, qayta skanerlang");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [token]);

//   // RASIM AVTO-SLAYD
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prev) => (prev + 1) % (productData?.images.length || 1));
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [productData]);

//   // MOBILE
//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const toggleSection = (title: string) => {
//     setOpenSections((prev) => {
//       const next = new Set(prev);
//       if (next.has(title)) next.delete(title);
//       else next.add(title);
//       return next;
//     });
//   };

//   const calculateSectionCompletion = (section: Section): number => {
//     const total = section.questions.length;
//     const filled = section.questions.filter(q => q.value && q.value.trim() !== "").length;
//     return total === 0 ? 0 : (filled / total) * 100;
//   };

//   const calculateOverallCompletion = (): number => {
//     if (!productData) return 0;
//     const allQuestions = productData.sections.flatMap(s => s.questions);
//     const total = allQuestions.length;
//     const filled = allQuestions.filter(q => q.value && q.value.trim() !== "").length;
//     return total === 0 ? 0 : (filled / total) * 100;
//   };

//   const getCompletionColor = (percentage: number) => {
//     if (percentage >= 80) return "bg-green-500";
//     if (percentage >= 50) return "bg-yellow-500";
//     return "bg-red-500";
//   };

//   // TOUCH SWIPE
//   const [touchStart, setTouchStart] = useState<number | null>(null);
//   const [touchEnd, setTouchEnd] = useState<number | null>(null);

//   const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
//     const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
//     setTouchStart(clientX);
//   };

//   const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
//     const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
//     setTouchEnd(clientX);
//   };

//   const handleTouchEnd = () => {
//     if (touchStart !== null && touchEnd !== null && productData) {
//       const diff = touchStart - touchEnd;
//       if (Math.abs(diff) > 50) {
//         setCurrentImageIndex((prev) => {
//           if (diff > 0) return (prev + 1) % productData.images.length;
//           return (prev - 1 + productData.images.length) % productData.images.length;
//         });
//       }
//     }
//     setTouchStart(null);
//     setTouchEnd(null);
//   };

//   // RATING
//   const renderRatingStars = (rating: number) => {
//     return Array.from({ length: 5 }, (_, i) => {
//       const starValue = i + 1;
//       if (rating >= starValue) return <Star key={i} className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />;
//       if (rating >= starValue - 0.5) return <StarHalf key={i} className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />;
//       return <StarOff key={i} className="h-3.5 w-3.5 text-gray-300" />;
//     });
//   };

 
//   const handleUserRating = async (newRating: number) => {
//   if (!productData || productData.user_rating !== null) return;

//   try {
//     setRatingFeedback(null);
//     await submitRating(newRating, productData.id);

//     setProductData(prev => prev ? { ...prev, user_rating: newRating } : prev);

//     const updated = await fetchProductByToken(token);
//     setProductData({
//       id: updated.id,
//       name: updated.name || "Noma'lum",
//       category: updated.category,
//       created_by: updated.created_by || "Noma'lum",
//       rating: updated.rating || 0, 
//       all_scan: updated.all_scan || 0,
//       status: updated.status || "active",
//       images: updated.images || [],
//       documents: updated.documents || [],
//       sections: updated.sections || [],
//       user_rating: updated.user_rating,
//       activated_at: updated.activated_at,
//       created_at: updated.created_at,
//     });

//     setRatingFeedback("Rahmat! Fikringiz qabul qilindi.");
//     setTimeout(() => {
//       setIsRatingModalOpen(false);
//       setRatingFeedback(null);
//     }, 2000);
//   } catch (err) {
//     setRatingFeedback("Xatolik yuz berdi");
//     setTimeout(() => setRatingFeedback(null), 5000);
//   }
// };


//   if (loading) {
//     return (
//       <div className="bg-gradient-to-b from-background to-background/90 flex min-h-screen items-center justify-center p-4 md:p-8">
//         <Card className="w-full max-w-md bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-2 border-primary/20 shadow-lg">
//           <div className="p-8 text-center space-y-6">
//             <p className="text-gray-600 text-lg">Yuklanmoqda...</p>
//           </div>
//         </Card>
//       </div>
//     );
//   }

//   if (error || !productData) {
//     return (
//       <div className="bg-gradient-to-b from-background to-background/90 flex min-h-screen items-center justify-center p-4 md:p-8">
//         <Card className="w-full max-w-md bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-2 border-primary/20 shadow-lg">
//           <div className="p-8 text-center space-y-6">
//             <div className="flex justify-center">
//               <Package className="h-16 w-16 text-primary/80 animate-bounce" />
//             </div>
//             <h1 className="text-4xl font-semibold text-balance tracking-tight text-foreground">
//               Mahsulot topilmadi
//             </h1>
//             <p className="text-muted-foreground text-base">
//               {error || "Bunday mahsulot mavjud emas, qayta skanerlang"}
//             </p>
//             <Button variant="outline" asChild>
//               <Link href="/">
//                 <Home className="mr-2 h-4 w-4" /> Asosiy sahifaga
//               </Link>
//             </Button>
//           </div>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen">
//       <main className="w-full p-4 sm:p-6 md:p-8 lg:p-10">
//         <div className="container mx-auto space-y-6">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//             <div>
//               <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800">{productData.name}</h1>
//               <p className="text-gray-600 mt-2 text-sm sm:text-base">Kategoriya: {productData.category.name}</p>
//               <div className="flex items-center gap-2 mt-2">
//                 <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
//                 <p className="text-gray-600 text-sm sm:text-base">Ishlab chiqaruvchi: {productData.created_by}</p>
//               </div>
//               <div className="flex items-center gap-2 mt-2">
//                 <span className="text-sm text-gray-700">Reyting:</span>
//                 <div className="flex items-center">{renderRatingStars(productData.rating)}</div>
//                 <span className="text-sm font-medium text-gray-700">{productData.rating.toFixed(1)}/5.0</span>
//                 <Dialog open={isRatingModalOpen} onOpenChange={setIsRatingModalOpen}>
//                   <DialogTrigger asChild>
//                     <button className="focus:outline-none">
//                       <Vote className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 hover:text-blue-600 transition-colors" />
//                     </button>
//                   </DialogTrigger>
//                   <DialogContent className="sm:max-w-md">
//                     <DialogHeader>
//                       <DialogTitle>Mahsulotni baholang</DialogTitle>
//                     </DialogHeader>
//                     <div className="flex flex-col items-center gap-4 py-4">
//                       <div className="flex items-center gap-2">
//                         {Array.from({ length: 5 }, (_, i) => {
//                           const starValue = i + 1;
//                           return (
//                             <button
//                               key={i}
//                               onClick={() => handleUserRating(starValue)}
//                               disabled={productData.user_rating !== null}
//                               className="focus:outline-none"
//                             >
//                               {productData.user_rating && productData.user_rating >= starValue ? (
//                                 <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
//                               ) : (
//                                 <StarOff className={`h-6 w-6 ${productData.user_rating !== null ? "text-gray-300" : "text-gray-300 hover:text-yellow-400 hover:scale-110 transition-transform"}`} />
//                               )}
//                             </button>
//                           );
//                         })}
//                       </div>
//                       {ratingFeedback && (
//                         <span className={`text-sm ${ratingFeedback.includes("xatolik") ? "text-red-600" : "text-green-600"}`}>
//                           {ratingFeedback}
//                         </span>
//                       )}
//                       {productData.user_rating !== null && !ratingFeedback && (
//                         <span className="text-sm text-gray-600">
//                           Siz allaqachon {productData.user_rating} baho qo'ygansiz
//                         </span>
//                       )}
//                     </div>
//                   </DialogContent>
//                 </Dialog>
//               </div>
//               <div className="mt-2 flex items-center gap-2">
//                 <span className="text-sm text-gray-700">To‘ldirilganlik:</span>
//                 <div className={`h-2 w-24 rounded-full ${getCompletionColor(calculateOverallCompletion())}`} />
//                 <span className="text-sm font-medium text-gray-700">{Math.round(calculateOverallCompletion())}%</span>
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
//             {/* RASMLAR */}
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
//                 <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
//                   <DialogTrigger asChild>
//                     <img
//                       src={productData.images[currentImageIndex] || "/placeholder.png"}
//                       alt="Mahsulot"
//                       className="w-full h-56 sm:h-64 lg:h-80 object-cover rounded-lg shadow-md cursor-pointer hover:opacity-90 transition-opacity"
//                     />
//                   </DialogTrigger>
//                   <DialogContent className="sm:max-w-3xl p-0 border-0 bg-transparent">
//                     <img
//                       src={productData.images[currentImageIndex] || "/placeholder.png"}
//                       alt="Katta rasm"
//                       className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
//                     />
//                   </DialogContent>
//                 </Dialog>
//                 <div className="mt-4 grid grid-cols-3 sm:grid-cols-3 gap-2">
//                   {productData.images.map((img, idx) => (
//                     <img
//                       key={idx}
//                       src={img}
//                       alt={`Rasm ${idx + 1}`}
//                       className={`w-full h-12 sm:h-16 object-cover rounded-md cursor-pointer ${currentImageIndex === idx ? "border-2 border-blue-500" : ""}`}
//                       onClick={() => setCurrentImageIndex(idx)}
//                     />
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* BO‘LIMLAR */}
//             <div className="lg:col-span-2 space-y-4">
//               {productData.sections.map((section) => {
//                 const completion = calculateSectionCompletion(section);
//                 return (
//                   <Card
//                     key={section.title}
//                     className="bg-gradient-to-br from-blue-50 to-white/90 border-blue-100 shadow-sm hover:shadow-md transition-all duration-300"
//                   >
//                     <CardHeader
//                       className="flex items-center justify-between p-4 cursor-pointer bg-blue-100/50 hover:bg-blue-200/50 rounded-t-lg"
//                       onClick={() => toggleSection(section.title)}
//                     >
//                       <div className="flex items-center gap-3">
//                         <div className={`h-3 w-3 rounded-full ${getCompletionColor(completion)}`} />
//                         <h3 className="text-base sm:text-lg font-medium text-gray-800">{section.title}</h3>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <span className="text-sm text-gray-600">{Math.round(completion)}%</span>
//                         {openSections.has(section.title) ? (
//                           <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
//                         ) : (
//                           <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
//                         )}
//                       </div>
//                     </CardHeader>
//                     {openSections.has(section.title) && (
//                       <CardContent className="p-4 bg-white/80">
//                         <div className="space-y-3">
//                           {section.questions.map((q) => {
//                             const supplier = q.supplierId
//                             return (
//                               <div key={q.label} className="space-y-2 bg-white/50 p-3 rounded-md border border-blue-100">
//                                 <Label className="text-sm font-medium text-gray-700">{q.label}</Label>
//                                 <p className="text-sm pl-3 border-l-2 border-blue-200 flex items-center justify-between">
//                                   <span>
//                                     {q.value ? (
//                                       <span className="font-medium">{q.value}</span>
//                                     ) : (
//                                       <span className="text-orange-600 flex items-center gap-1">
//                                         <Clock className="h-3 w-3" />
//                                         {supplier || "Ta’minotchi"} tomonidan to‘ldiriladi
//                                       </span>
//                                     )}
//                                   </span>
//                                   {q.supplierId && q.value && supplier && (
//                                     <span className="text-green-600 flex items-center gap-1 text-xs font-medium">
//                                       <CheckCircle className="h-3 w-3" />
//                                       <span className="hidden sm:inline">{supplier} tomonidan to‘ldirildi</span>
//                                     </span>
//                                   )}
//                                 </p>
//                               </div>
//                             );
//                           })}
//                         </div>
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
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import {
  ChevronDown,
  ChevronUp,
  Building2,
  Star,
  StarHalf,
  StarOff,
  Vote,
  Package,
  Home,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Label } from "@/src/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";

type Question = {
  label: string;
  value?: string;
  supplierId?: string;
};

type Section = {
  title: string;
  questions: Question[];
};

type ProductData = {
  id: string;
  name: string;
  category: { id: string; name: string };
  created_by: string;
  rating: number;
  all_scan: number;
  status: string;
  images: string[];
  documents: string[];
  sections: Section[];
  user_rating: number | null;
  activated_at?: string;
  created_at: string;
};

const fetchProductByToken = async (token: string) => {
  try {
    const response = await fetch(
      `https://api.e-investment.uz/api/v1/products/qr/token/${token}/`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!response.ok) throw new Error("Mahsulot topilmadi");
    return await response.json();
  } catch (error) {
    console.error("API xatosi:", error);
    throw error;
  }
};

const submitRating = async (rating: number, productId: string) => {
  try {
    const response = await fetch(
      `https://api.e-investment.uz/api/v1/products/rating/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          product: productId,
        }),
      }
    );

    if (!response.ok) throw new Error("Reyting yuborishda xatolik");
    return await response.json();
  } catch (error) {
    console.error("Reyting API xatosi:", error);
    throw error;
  }
};

// YANGI: Hujjat yuklab olish komponenti
const DocumentItem = ({ url }: { url: string }) => {
  const fullFilename = decodeURIComponent(url.split("/").pop() || "hujjat").split("?")[0];
  
  // Uzun nomni qisqartirish: maksimal 30 ta belgi (mobil uchun), desktopda 50 ta
  const truncatedFilename = fullFilename.length > 38 
    ? fullFilename.slice(0, 35) + "..." 
    : fullFilename;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = `/api/proxy?url=${encodeURIComponent(url)}`;
    link.download = fullFilename; // Yuklanayotgan fayl nomi to‘liq bo‘ladi
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getIconColor = () => {
    const ext = fullFilename.toLowerCase().split(".").pop();
    if (ext === "pdf") return "text-red-600";
    if (["png", "jpg", "jpeg", "webp", "gif"].includes(ext || "")) return "text-blue-600";
    return "text-gray-600";
  };

  return (
   <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <Package className={`h-6 w-6 flex-shrink-0 ${getIconColor()}`} />
        
        {/* Bu joyda truncate ishlaydi */}
        <span 
          className="text-sm font-medium text-gray-800 truncate block"
          title={fullFilename} // Hover qilganda to‘liq nomi ko‘rinadi
        >
          {truncatedFilename}
        </span>
      </div>

      <Button size="sm" onClick={handleDownload} className="flex-shrink-0 ml-3">
        Yuklab olish
      </Button>
    </div>
  );
};

export default function ProductDetailsPage(): JSX.Element {
  const [openSections, setOpenSections] = useState<Set<string>>(() => new Set());
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [ratingFeedback, setRatingFeedback] = useState<string | null>(null);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState<boolean>(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);

  const params = useParams();
  const token = params.id as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchProductByToken(token);

        setProductData({
          id: data.id,
          name: data.sections[0]?.questions[0]?.value || "Noma'lum",
          category: data.category,
          created_by: data.created_by || "Noma'lum",
          rating: data.rating || 0,
          all_scan: data.all_scan || 0,
          status: data.status || "active",
          images: data.images || [],
          documents: data.documents || [],
          sections: data.sections || [],
          user_rating: data.user_rating,
          activated_at: data.activated_at,
          created_at: data.created_at,
        });
      } catch (err) {
        setError("Bunday mahsulot mavjud emas, qayta skanerlang");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  // Avto-slayd
  useEffect(() => {
    if (!productData?.images.length) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % productData.images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [productData]);

  const toggleSection = (title: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  };

  const calculateSectionCompletion = (section: Section): number => {
    const total = section.questions.length;
    const filled = section.questions.filter(q => q.value && q.value.trim() !== "").length;
    return total === 0 ? 0 : (filled / total) * 100;
  };

  const calculateOverallCompletion = (): number => {
    if (!productData) return 0;
    const allQuestions = productData.sections.flatMap(s => s.questions);
    const total = allQuestions.length;
    const filled = allQuestions.filter(q => q.value && q.value.trim() !== "").length;
    return total === 0 ? 0 : (filled / total) * 100;
  };

  const getCompletionColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Swipe
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setTouchStart(clientX);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setTouchEnd(clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd || !productData) return;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      setCurrentImageIndex((prev) => {
        if (diff > 0) return (prev + 1) % productData.images.length;
        return (prev - 1 + productData.images.length) % productData.images.length;
      });
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const renderRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => {
      const starValue = i + 1;
      if (rating >= starValue) return <Star key={i} className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />;
      if (rating >= starValue - 0.5) return <StarHalf key={i} className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />;
      return <StarOff key={i} className="h-3.5 w-3.5 text-gray-300" />;
    });
  };

  const handleUserRating = async (newRating: number) => {
    if (!productData || productData.user_rating !== null) return;

    try {
      setRatingFeedback(null);
      await submitRating(newRating, productData.id);

      const updated = await fetchProductByToken(token);
      setProductData({
        id: updated.id,
        name: updated.sections[0]?.questions[0]?.value || "Noma'lum",
        category: updated.category,
        created_by: updated.created_by || "Noma'lum",
        rating: updated.rating || 0,
        all_scan: updated.all_scan || 0,
        status: updated.status || "active",
        images: updated.images || [],
        documents: updated.documents || [],
        sections: updated.sections || [],
        user_rating: updated.user_rating,
        activated_at: updated.activated_at,
        created_at: updated.created_at,
      });

      setRatingFeedback("Rahmat! Fikringiz qabul qilindi.");
      setTimeout(() => {
        setIsRatingModalOpen(false);
        setRatingFeedback(null);
      }, 2000);
    } catch (err) {
      setRatingFeedback("Xatolik yuz berdi");
      setTimeout(() => setRatingFeedback(null), 5000);
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-b from-background to-background/90 flex min-h-screen items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-md bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-2 border-primary/20 shadow-lg">
          <div className="p-8 text-center space-y-6">
            <p className="text-gray-600 text-lg">Yuklanmoqda...</p>
          </div>
        </Card>
      </div>
    );
  }

  if (error || !productData) {
    return (
      <div className="bg-gradient-to-b from-background to-background/90 flex min-h-screen items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-md bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-2 border-primary/20 shadow-lg">
          <div className="p-8 text-center space-y-6">
            <div className="flex justify-center">
              <Package className="h-16 w-16 text-primary/80 animate-bounce" />
            </div>
            <h1 className="text-4xl font-semibold text-balance tracking-tight text-foreground">
              Mahsulot topilmadi
            </h1>
            <p className="text-muted-foreground text-base">
              {error || "Bunday mahsulot mavjud emas, qayta skanerlang"}
            </p>
            <Button variant="outline" asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" /> Asosiy sahifaga
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <main className="w-full p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="container mx-auto space-y-6">

          {/* SARLAVHA */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800">{productData.name}</h1>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">Kategoriya: {productData.category.name}</p>
              <div className="flex items-center gap-2 mt-2">
                <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                <p className="text-gray-600 text-sm sm:text-base">Ishlab chiqaruvchi: {productData.created_by}</p>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-gray-700">Reyting:</span>
                <div className="flex items-center">{renderRatingStars(productData.rating)}</div>
                <span className="text-sm font-medium text-gray-700">{productData.rating.toFixed(1)}/5.0</span>
                <Dialog open={isRatingModalOpen} onOpenChange={setIsRatingModalOpen}>
                  <DialogTrigger asChild>
                    <button className="focus:outline-none">
                      <Vote className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 hover:text-blue-600 transition-colors" />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Mahsulotni baholang</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col items-center gap-4 py-4">
                      <div className="flex items-center gap-2">
                        {Array.from({ length: 5 }, (_, i) => {
                          const starValue = i + 1;
                          return (
                            <button
                              key={i}
                              onClick={() => handleUserRating(starValue)}
                              disabled={productData.user_rating !== null}
                              className="focus:outline-none"
                            >
                              {productData.user_rating && productData.user_rating >= starValue ? (
                                <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                              ) : (
                                <StarOff className={`h-6 w-6 ${productData.user_rating !== null ? "text-gray-300" : "text-gray-300 hover:text-yellow-400 hover:scale-110 transition-transform"}`} />
                              )}
                            </button>
                          );
                        })}
                      </div>
                      {ratingFeedback && (
                        <span className={`text-sm ${ratingFeedback.includes("xatolik") ? "text-red-600" : "text-green-600"}`}>
                          {ratingFeedback}
                        </span>
                      )}
                      {productData.user_rating !== null && !ratingFeedback && (
                        <span className="text-sm text-gray-600">
                          Siz allaqachon {productData.user_rating} baho qo'ygansiz
                        </span>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm text-gray-700">To'ldirilganlik:</span>
                <div className={`h-2 w-24 rounded-full ${getCompletionColor(calculateOverallCompletion())}`} />
                <span className="text-sm font-medium text-gray-700">{Math.round(calculateOverallCompletion())}%</span>
              </div>
            </div>
          </div>

          {/* ASOSIY GRID: RASMLAR + BO'LIMLAR */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* RASMLAR */}
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
                <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
                  <DialogTrigger asChild>
                    <img
                      src={productData.images[currentImageIndex] || "/placeholder.png"}
                      alt="Mahsulot"
                      className="w-full h-56 sm:h-64 lg:h-80 object-cover rounded-lg shadow-md cursor-pointer hover:opacity-90 transition-opacity"
                    />
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-3xl p-0 border-0 bg-transparent">
                    <img
                      src={productData.images[currentImageIndex] || "/placeholder.png"}
                      alt="Katta rasm"
                      className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                    />
                  </DialogContent>
                </Dialog>
                <div className="mt-4 grid grid-cols-3 sm:grid-cols-3 gap-2">
                  {productData.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Rasm ${idx + 1}`}
                      className={`w-full h-12 sm:h-16 object-cover rounded-md cursor-pointer ${currentImageIndex === idx ? "border-2 border-blue-500" : ""}`}
                      onClick={() => setCurrentImageIndex(idx)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* BO'LIMLAR */}
            <div className="lg:col-span-2 space-y-4">
              {productData.sections.map((section) => {
                const completion = calculateSectionCompletion(section);
                return (
                  <Card
                    key={section.title}
                    className="bg-gradient-to-br from-blue-50 to-white/90 border-blue-100 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <CardHeader
                      className="flex items-center justify-between p-4 cursor-pointer bg-blue-100/50 hover:bg-blue-200/50 rounded-t-lg"
                      onClick={() => toggleSection(section.title)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-3 w-3 rounded-full ${getCompletionColor(completion)}`} />
                        <h3 className="text-base sm:text-lg font-medium text-gray-800">{section.title}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">{Math.round(completion)}%</span>
                        {openSections.has(section.title) ? (
                          <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                        ) : (
                          <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                        )}
                      </div>
                    </CardHeader>
                    {openSections.has(section.title) && (
                      <CardContent className="p-4 bg-white/80">
                        <div className="space-y-3">
                          {section.questions.map((q) => (
                            <div key={q.label} className="space-y-2 bg-white/50 p-3 rounded-md border border-blue-100">
                              <Label className="text-sm font-medium text-gray-700">{q.label}</Label>
                              <p className="text-sm pl-3 border-l-2 border-blue-200 flex items-center justify-between">
                                <span>
                                  {q.value ? (
                                    <span className="font-medium">{q.value}</span>
                                  ) : (
                                    <span className="text-orange-600 flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      {q.supplierId || "Ta’minotchi"} tomonidan to‘ldiriladi
                                    </span>
                                  )}
                                </span>
                                {q.supplierId && q.value && (
                                  <span className="text-green-600 flex items-center gap-1 text-xs font-medium">
                                    <CheckCircle className="h-3 w-3" />
                                    <span className="hidden sm:inline">tasdiqlangan</span>
                                  </span>
                                )}
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                );
              })}
              {productData.documents && productData.documents.length > 0 && (
            <div className="mt-8">
              <Card className="bg-gradient-to-br from-white to-primary-50/80 border-primary-200/50 shadow-lg">
                <CardHeader className="bg-primary-100/50">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                    <Package className="h-6 w-6 " />
                    Mahsulot hujjatlari ({productData.documents.length})
                  </h2>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {productData.documents.map((url, idx) => (
                      <DocumentItem key={idx} url={url} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
            </div>
          </div>

          {/* YANGI: HUJJATLAR – EN PASTDA */}
          

        </div>
      </main>
    </div>
  );
}