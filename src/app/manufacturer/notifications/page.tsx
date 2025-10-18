// "use client";

// import { useState, useEffect, useRef } from "react";
// import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
// import { Button } from "@/src/components/ui/button";
// import { Alert, AlertDescription, AlertTitle } from "@/src/components/ui/alert";
// import { Input } from "@/src/components/ui/input";
// import { Label } from "@/src/components/ui/label";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
//   DialogTrigger,
// } from "@/src/components/ui/dialog";
// import { Badge } from "@/src/components/ui/badge";
// import {
//   Bell,
//   BellOff,
//   ChevronDown,
//   Edit3,
//   Send,
// } from "lucide-react";
// import Cookies from "js-cookie";
// import { format } from "date-fns";
// import { categories } from "@/lib/categories";
// import { categoryFieldMap, getReverseFieldMap } from "../products/note";
// import { updateProduct } from "@/lib/api";

// interface Notification {
//   id: string;
//   productName: string;
//   categoryKey: string;
//   categoryName: string;
//   createdAt: string;
//   details: Record<string, string>;
//   editableFields: string[];
//   images: string[];
//   status: "pending" | "sent";
//   categoryModel: string;
// }

// interface EditFormData {
//   [key: string]: string;
// }

// export default function NotificationsPage() {
//   const [isMobile, setIsMobile] = useState(false);
//   const [notifications, setNotifications] = useState<Notification[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editFormData, setEditFormData] = useState<EditFormData>({});
//   const [originalFormData, setOriginalFormData] = useState<EditFormData>({});
//   const [openSections, setOpenSections] = useState<Set<string>>(new Set());
//   const [showConfirmDialog, setShowConfirmDialog] = useState(false);
//   const firstEditableInputRef = useRef<HTMLInputElement>(null);

//   const getStatusVariant = (status: "pending" | "sent") => {
//     return status === "pending" ? "warning" : "success";
//   };

//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 768);
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         setIsLoading(true);
//         const response = await fetch("https://api.e-investment.uz/api/v1/products/suppler/products/", {
//           headers: {
//             Authorization: `Bearer ${Cookies.get("token")}`,
//           },
//         });
//         if (!response.ok) throw new Error("Bildirishnomalarni yuklashda xato");
//         const data = await response.json();

//         const mappedNotifications: Notification[] = [];
//         data.product_categories.forEach((cat: any) => {
//           const categoryKey = Object.keys(categories).find(
//             (key) => categories[key].model === cat.model
//           ) || "";
//           const categoryName = categories[categoryKey]?.name || "Noma'lum";
//           const reverseMap = getReverseFieldMap(categoryKey);

//           cat.items.forEach((item: any) => {
//             const details: Record<string, string> = {};
//             const allQuestions = Object.values(categories[categoryKey].sections).flatMap(
//               (sec) => sec.questions.map((q) => q.id)
//             );

//             Object.entries(item).forEach(([apiField, value]) => {
//               if (typeof value !== "string" && typeof value !== "number") return;
//               if (["id", "status", "created_at", "images", "editable_fields"].includes(apiField)) return;

//               const cleanField = apiField.replace("_org", "");
//               const uiId = reverseMap[cleanField];
//               if (uiId && allQuestions.includes(uiId)) {
//                 details[uiId] = value as string;
//               }
//             });

//             details[allQuestions[0]] = item.name || "Noma'lum";

//             // Statusni editable_fields asosida aniqlash
//             const isSent = item.editable_fields.some((field: string) => {
//               const value = item[field];
//               return value !== null && value !== undefined && value !== "";
//             });

//             mappedNotifications.push({
//               id: item.id.toString(),
//               productName: item.name || "Noma'lum mahsulot",
//               categoryKey,
//               categoryName,
//               createdAt: item.created_at,
//               details,
//               editableFields: item.editable_fields || [],
//               images: Array.isArray(item.images)
//                 ? item.images
//                 : item.images
//                 ? [item.images]
//                 : [],
//               status: isSent ? "sent" : "pending",
//               categoryModel: cat.model,
//             });
//           });
//         });

//         // Sort: pending first, then by createdAt descending
//         mappedNotifications.sort((a, b) => {
//           if (a.status === "pending" && b.status !== "pending") return -1;
//           if (a.status !== "pending" && b.status === "pending") return 1;
//           return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
//         });

//         setNotifications(mappedNotifications);
//       } catch (error: any) {
//         setError(error.message || "Bildirishnomalarni yuklashda xato yuz berdi");
//         console.error(error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchNotifications();
//   }, []);

//   const handleInputChange = (id: string, value: string) => {
//     setEditFormData((prev) => ({ ...prev, [id]: value }));
//   };

//   const toggleSection = (sectionId: string) => {
//     setOpenSections((prev) => {
//       const newSet = new Set(prev);
//       newSet.has(sectionId) ? newSet.delete(sectionId) : newSet.add(sectionId);
//       return newSet;
//     });
//   };

//   const startEditing = (notification: Notification) => {
//     setEditFormData(notification.details);
//     setOriginalFormData(notification.details);
//     setOpenSections(new Set(Object.keys(categories[notification.categoryKey].sections)));
//     setIsEditing(true);

//     // Focus on first editable input after rendering
//     setTimeout(() => {
//       if (firstEditableInputRef.current) {
//         firstEditableInputRef.current.focus();
//       }
//     }, 0);
//   };

//   const cancelEditing = () => {
//     setIsEditing(false);
//     setEditFormData(originalFormData);
//     setOpenSections(new Set());
//   };

//   const hasChanges = () => {
//     if (!selectedNotification) return false;
//     const fieldMap = categoryFieldMap[selectedNotification.categoryKey];
//     return Object.keys(editFormData).some(
//       (key) =>
//         selectedNotification.editableFields.includes(fieldMap[key]) &&
//         editFormData[key] !== originalFormData[key]
//     );
//   };

//   const handleConfirmSave = async () => {
//     if (!selectedNotification) return;

//     try {
//       const fieldMap = categoryFieldMap[selectedNotification.categoryKey] || {};
//       const payload = new FormData();
//       let hasChangesFlag = false;

//       Object.entries(editFormData).forEach(([uiId, value]) => {
//         if (
//           selectedNotification.editableFields.includes(fieldMap[uiId]) &&
//           value !== originalFormData[uiId]
//         ) {
//           const apiField = fieldMap[uiId];
//           if (apiField) {
//             payload.append(apiField, value);
//             hasChangesFlag = true;
//           }
//         }
//       });

//       if (!hasChangesFlag) {
//         setShowConfirmDialog(false);
//         return;
//       }

//       // Update product
//       await updateProduct(
//         selectedNotification.categoryKey,
//         selectedNotification.id,
//         payload
//       );

//       // Update notifications state
//       setNotifications((prev) =>
//         prev
//           .map((n) =>
//             n.id === selectedNotification.id
//               ? { ...n, status: "sent" as const, details: editFormData }
//               : n
//           )
//           .sort((a, b) => {
//             if (a.status === "pending" && b.status !== "pending") return -1;
//             if (a.status !== "pending" && b.status === "pending") return 1;
//             return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
//           })
//       );

//       setIsEditing(false);
//       setEditFormData({});
//       setOriginalFormData({});
//       setOpenSections(new Set());
//       setShowConfirmDialog(false);
//     } catch (error: any) {
//       console.error("Saqlashda xato:", error);
//       setError("Ma'lumotlarni saqlashda xato yuz berdi");
//       setShowConfirmDialog(false);
//     }
//   };

// const renderNotificationDetails = (notification: Notification) => {
//   const category = categories[notification.categoryKey];
//   if (!category) return null;
//   const currentDetails = isEditing ? editFormData : notification.details;
//   const myId = Cookies.get("myid") || "";
//   let isFirstEditable = true; // Har bir notification uchun reset

//   return (
//     <div className="space-y-6">
//       <Card className="bg-gradient-to-br from-blue-50/80 to-white/90 border-blue-100 shadow-sm rounded-lg">
//         <CardHeader className="p-4 bg-blue-100/50 rounded-t-lg">
//           <h4 className="text-lg font-medium text-gray-800">Mahsulot Rasmlari</h4>
//         </CardHeader>
//         <CardContent className="p-4">
//           <div className="flex flex-wrap gap-4">
//             {notification.images.length > 0 ? (
//               notification.images.map((image, index) => (
//                 <img
//                   key={index}
//                   src={image}
//                   alt={`Mahsulot rasmi ${index + 1}`}
//                   className="w-24 h-24 object-cover rounded-md border border-blue-200 transition-transform duration-200 hover:scale-105"
//                 />
//               ))
//             ) : (
//               <div className="w-24 h-24 bg-blue-100/50 rounded-md flex items-center justify-center">
//                 <Bell className="h-6 w-6 text-gray-600" />
//               </div>
//             )}
//           </div>
//         </CardContent>
//       </Card>

//       {Object.entries(category.sections).map(([sectionId, section]) => (
//         <Card
//           key={sectionId}
//           className="bg-gradient-to-br from-blue-50/80 to-white/90 border-blue-100 shadow-sm rounded-lg"
//         >
//           <CardHeader
//             className={`flex items-center justify-between p-4 bg-blue-100/50 rounded-t-lg ${
//               isEditing ? "cursor-pointer hover:bg-blue-200/50" : ""
//             }`}
//             onClick={() => isEditing && toggleSection(sectionId)}
//           >
//             <h4 className="text-lg font-medium text-gray-800">{section.title}</h4>
//             {isEditing && (
//               <ChevronDown
//                 className={`h-5 w-5 text-gray-600 transition-transform duration-200 ${
//                   openSections.has(sectionId) ? "rotate-180" : ""
//                 }`}
//               />
//             )}
//           </CardHeader>
//           {(isEditing ? openSections.has(sectionId) : true) && (
//             <CardContent className="p-4 space-y-4 bg-white/90">
//               {section.questions.map((question) => {
//                 const rawValue = currentDetails[question.id] || "";
//                 const fieldMap = categoryFieldMap[notification.categoryKey];
//                 const apiField = fieldMap[question.id];
//                 const isEditable = notification.editableFields.includes(apiField);

//                 // Tuzatilgan value aniqlash logikasi
//                 const value = isEditable && notification.status === "pending" && rawValue === myId ? "" : rawValue;

//                 // Tuzatilgan placeholder logikasi
//                 let placeholderText = question.placeholder || "Ma'lumot kiritilmagan";
//                 if (isEditable) {
//                   if (notification.status === "pending") {
//                     placeholderText = rawValue === myId
//                       ? "Bu yerni to'ldirishingiz talab qilinadi"
//                       : "Bu yerga siz ma'lumot kiritishingiz talab qilinadi";
//                   } else if (notification.status === "sent" && !rawValue) {
//                     placeholderText = "Ma'lumot kiritmagansiz";
//                   }
//                 }

//                 // Ref faqat birinchi editable uchun
//                 const inputRef = isEditable && isFirstEditable ? firstEditableInputRef : null;
//                 if (isEditable) isFirstEditable = false;

//                 return (
//                   <div
//                     key={question.id}
//                     className={`space-y-2 p-3 rounded-md border ${
//                       isEditing && isEditable
//                         ? "bg-yellow-50/80 border-yellow-200"
//                         : "bg-white/50 border-blue-100"
//                     }`}
//                   >
//                     <Label htmlFor={question.id} className="text-sm font-medium text-gray-700">
//                       {question.label}
//                     </Label>
//                     {isEditing && isEditable ? (
//                       <Input
//                         id={question.id}
//                         value={value}
//                         onChange={(e) => handleInputChange(question.id, e.target.value)}
//                         placeholder={placeholderText}
//                         className="border-yellow-200 focus:ring-yellow-400 transition-all duration-200 p-2 text-base bg-white rounded-md"
//                         ref={inputRef}
//                       />
//                     ) : (
//                       <p className="text-sm text-gray-900 pl-3 border-l-2 border-blue-200">
//                         {value || (isEditable ? placeholderText : (question.placeholder || "Ma'lumot kiritilmagan"))}
//                       </p>
//                     )}
//                   </div>
//                 );
//               })}
//             </CardContent>
//           )}
//         </Card>
//       ))}
//     </div>
//   );
// };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-background to-background/90">
//         <Card className="p-6 bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-border/50 shadow-lg">
//           <p>Yuklanmoqda...</p>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gradient-to-b from-background to-background/90 flex min-h-screen relative">
//       <main className="flex-1 p-4 sm:p-8 relative z-10">
//         <div className="container mx-auto space-y-6 max-w-5xl">
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//             <div>
//               <h1 className="text-2xl sm:text-4xl font-semibold">Bildirishnomalar</h1>
//               <p className="text-muted-foreground mt-2 text-sm sm:text-base">
//                 Yangi habarlar va bildirishnomalarni ko'ring
//               </p>
//             </div>
//           </div>

//           {error && (
//             <Alert variant="destructive">
//               <AlertTitle>Xato</AlertTitle>
//               <AlertDescription>{error}</AlertDescription>
//             </Alert>
//           )}

//           {notifications.length === 0 ? (
//             <Card className="p-12 text-center bg-gradient-to-br from-card to-card/80 shadow-lg">
//               <BellOff className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
//               <p className="text-lg text-muted-foreground">
//                 Hozircha hech qanday bildirishnoma yo‘q
//               </p>
//             </Card>
//           ) : (
//             <Card className="p-6 bg-gradient-to-br from-white to-blue-50/80 border border-blue-200/50 shadow-lg rounded-lg">
//               <div className="space-y-4 overflow-y-scroll max-h-[70vh]">
//                 {notifications.map((notification) => (
//                   <Dialog
//                     key={notification.id}
//                     onOpenChange={(open) => {
//                       if (!open) {
//                         setSelectedNotification(null);
//                         setIsEditing(false);
//                         setEditFormData({});
//                         setOriginalFormData({});
//                         setOpenSections(new Set());
//                         setShowConfirmDialog(false);
//                       } else {
//                         setSelectedNotification(notification);
//                         // Scroll to bottom of modal
//                         setTimeout(() => {
//                           const dialogContent = document.querySelector(".dialog-content");
//                           if (dialogContent) {
//                             dialogContent.scrollTo({ top: dialogContent.scrollHeight, behavior: "smooth" });
//                           }
//                         }, 0);
//                       }
//                     }}
//                   >
//                     <DialogTrigger asChild>
//                       <div className="flex items-center justify-between p-4 rounded-lg bg-white/50 border border-blue-200/50 hover:bg-blue-50/80 transition-all duration-200 cursor-pointer">
//                         <div className="flex items-center gap-4 flex-1">
//                           <div className="w-12 h-12 bg-blue-100/50 rounded-lg flex items-center justify-center overflow-hidden">
//                             {notification.images.length > 0 ? (
//                               <img
//                                 src={notification.images[0]}
//                                 alt={notification.productName}
//                                 className="w-full h-full object-cover"
//                               />
//                             ) : (
//                               <Bell className="h-6 w-6 text-gray-600" />
//                             )}
//                           </div>
//                           <div>
//                             <h3 className="font-semibold text-gray-800 text-lg">
//                               {notification.productName}
//                             </h3>
//                             <p className="text-sm text-gray-600">{notification.categoryName}</p>
//                           </div>
//                         </div>
//                         <div className="text-right">
//                           <Badge
//                             variant={getStatusVariant(notification.status) as any}
//                             className="transition-all duration-200 px-3 py-1 rounded-full"
//                           >
//                             {notification.status === "pending" ? "To'ldirish kutilmoqda" : "Yuborilgan"}
//                           </Badge>
//                           <p className="text-xs text-gray-500 mt-1">
//                             {format(new Date(notification.createdAt), "dd.MM.yyyy HH:mm")}
//                           </p>
//                         </div>
//                       </div>
//                     </DialogTrigger>

//                     <DialogContent className="dialog-content max-w-[90vw] md:max-w-6xl max-h-[90vh] overflow-y-auto bg-white/95 p-6 rounded-xl shadow-2xl border border-blue-200/50">
//                       <DialogHeader className="flex items-center justify-between border-b border-blue-100 pb-4">
//                         <DialogTitle className="text-2xl font-semibold text-gray-800">
//                           {notification.productName} tafsilotlari
//                         </DialogTitle>
//                       </DialogHeader>

//                       <div className="space-y-6 mt-4">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-blue-50/50 p-4 rounded-lg border border-blue-100">
//                           <div>
//                             <p>
//                               <strong>Kategoriya:</strong> {notification.categoryName}
//                             </p>
//                             <p>
//                               <strong>Status:</strong>{" "}
//                               <Badge variant={getStatusVariant(notification.status) as any}>
//                                 {notification.status === "pending" ? "To'ldirish kutilmoqda" : "Yuborilgan"}
//                               </Badge>
//                             </p>
//                           </div>
//                           <div>
//                             <p>
//                               <strong>Yaratilgan sana:</strong>{" "}
//                               {format(new Date(notification.createdAt), "dd.MM.yyyy HH:mm")}
//                             </p>
//                           </div>
//                         </div>
//                         {renderNotificationDetails(notification)}
//                       </div>

//                       {notification.status === "pending" && (
//                         <DialogFooter className="flex gap-3 justify-end mt-6 border-t border-blue-100 pt-4">
//                           {!isEditing ? (
//                             <Button
//                               variant="outline"
//                               onClick={() => startEditing(notification)}
//                               className="border-blue-300 hover:bg-blue-100"
//                             >
//                               <Edit3 className="mr-2 h-4 w-4" />
//                               Tahrirlash
//                             </Button>
//                           ) : (
//                             <>
//                               <Button
//                                 onClick={() => setShowConfirmDialog(true)}
//                                 className="bg-blue-600 hover:bg-blue-700 text-white"
//                                 disabled={!hasChanges()}
//                               >
//                                 <Send className="mr-2 h-4 w-4" />
//                                 Yuborish
//                               </Button>
//                               <Button
//                                 variant="outline"
//                                 onClick={cancelEditing}
//                                 className="border-blue-300 hover:bg-blue-100"
//                               >
//                                 Bekor qilish
//                               </Button>
//                             </>
//                           )}
//                         </DialogFooter>
//                       )}
//                     </DialogContent>

//                     {showConfirmDialog && (
//                       <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
//                         <DialogContent className="max-w-md p-6">
//                           <DialogHeader>
//                             <DialogTitle>Tasdiqlash</DialogTitle>
//                           </DialogHeader>
//                           <div className="py-4">
//                             <p>Xaqiqatdan yubormoqchimisiz?</p>
//                           </div>
//                           <DialogFooter className="flex gap-3 justify-end">
//                             <Button
//                               variant="outline"
//                               onClick={() => setShowConfirmDialog(false)}
//                               className="border-blue-300 hover:bg-blue-100"
//                             >
//                               Yo'q
//                             </Button>
//                             <Button
//                               onClick={handleConfirmSave}
//                               className="bg-blue-600 hover:bg-blue-700 text-white"
//                             >
//                               Ha
//                             </Button>
//                           </DialogFooter>
//                         </DialogContent>
//                       </Dialog>
//                     )}
//                   </Dialog>
//                 ))}
//               </div>
//             </Card>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }
"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/src/components/ui/alert";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Badge } from "@/src/components/ui/badge";
import {
  Bell,
  BellOff,
  ChevronDown,
  Edit3,
  Send,
} from "lucide-react";
import Cookies from "js-cookie";
import { format } from "date-fns";
import { categories } from "@/lib/categories";
import { categoryFieldMap, getReverseFieldMap } from "../products/note";
import { updateProduct } from "@/lib/api";

interface Notification {
  id: string;
  productName: string;
  categoryKey: string;
  categoryName: string;
  createdAt: string;
  details: Record<string, string>;
  editableFields: string[];
  images: string[];
  status: "pending" | "sent";
  categoryModel: string;
}

interface EditFormData {
  [key: string]: string;
}

export default function NotificationsPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState<EditFormData>({});
  const [originalFormData, setOriginalFormData] = useState<EditFormData>({});
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const firstEditableInputRef = useRef<HTMLInputElement>(null);

  const getStatusVariant = (status: "pending" | "sent") => {
    return status === "pending" ? "warning" : "success";
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://api.e-investment.uz/api/v1/products/suppler/products/", {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        if (!response.ok) throw new Error("Bildirishnomalarni yuklashda xato");
        const data = await response.json();

        const mappedNotifications: Notification[] = [];
        data.product_categories.forEach((cat: any) => {
          const categoryKey = Object.keys(categories).find(
            (key) => categories[key].model === cat.model
          ) || "";
          const categoryName = categories[categoryKey]?.name || "Noma'lum";
          const reverseMap = getReverseFieldMap(categoryKey);

          cat.items.forEach((item: any) => {
            const details: Record<string, string> = {};
            const allQuestions = Object.values(categories[categoryKey].sections).flatMap(
              (sec) => sec.questions.map((q) => q.id)
            );

            Object.entries(item).forEach(([apiField, value]) => {
              if (typeof value !== "string" && typeof value !== "number") return;
              if (["id", "status", "created_at", "images", "editable_fields"].includes(apiField)) return;

              const cleanField = apiField.replace("_org", "");
              const uiId = reverseMap[cleanField];
              if (uiId && allQuestions.includes(uiId)) {
                details[uiId] = value as string;
              }
            });

            details[allQuestions[0]] = item.name || "Noma'lum";

            // Statusni editable_fields asosida aniqlash
            const isSent = item.editable_fields.some((field: string) => {
              const value = item[field];
              return value !== null && value !== undefined && value !== "";
            });

            mappedNotifications.push({
              id: item.id.toString(),
              productName: item.name || "Noma'lum mahsulot",
              categoryKey,
              categoryName,
              createdAt: item.created_at,
              details,
              editableFields: item.editable_fields || [],
              images: Array.isArray(item.images)
                ? item.images
                : item.images
                ? [item.images]
                : [],
              status: isSent ? "sent" : "pending",
              categoryModel: cat.model,
            });
          });
        });

        // Sort: pending first, then by createdAt descending
        mappedNotifications.sort((a, b) => {
          if (a.status === "pending" && b.status !== "pending") return -1;
          if (a.status !== "pending" && b.status === "pending") return 1;
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });

        setNotifications(mappedNotifications);
      } catch (error: any) {
        setError(error.message || "Bildirishnomalarni yuklashda xato yuz berdi");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleInputChange = (id: string, value: string) => {
    setEditFormData((prev) => ({ ...prev, [id]: value }));
  };

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) => {
      const newSet = new Set(prev);
      newSet.has(sectionId) ? newSet.delete(sectionId) : newSet.add(sectionId);
      return newSet;
    });
  };

  const startEditing = (notification: Notification) => {
    setEditFormData(notification.details);
    setOriginalFormData(notification.details);
    setOpenSections(new Set(Object.keys(categories[notification.categoryKey].sections)));
    setIsEditing(true);

    // Focus on first editable input after rendering
    setTimeout(() => {
      if (firstEditableInputRef.current) {
        firstEditableInputRef.current.focus();
      }
    }, 0);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditFormData(originalFormData);
    setOpenSections(new Set());
  };

  const hasChanges = () => {
    if (!selectedNotification) return false;
    const fieldMap = categoryFieldMap[selectedNotification.categoryKey];
    return Object.keys(editFormData).some(
      (key) =>
        selectedNotification.editableFields.includes(fieldMap[key]) &&
        editFormData[key] !== originalFormData[key]
    );
  };

  const handleConfirmSave = async () => {
    if (!selectedNotification) return;

    try {
      const fieldMap = categoryFieldMap[selectedNotification.categoryKey] || {};
      const payload = new FormData();
      let hasChangesFlag = false;

      Object.entries(editFormData).forEach(([uiId, value]) => {
        if (
          selectedNotification.editableFields.includes(fieldMap[uiId]) &&
          value !== originalFormData[uiId]
        ) {
          const apiField = fieldMap[uiId];
          if (apiField) {
            payload.append(apiField, value);
            hasChangesFlag = true;
          }
        }
      });

      if (!hasChangesFlag) {
        setShowConfirmDialog(false);
        return;
      }

      // Update product
      await updateProduct(
        selectedNotification.categoryKey,
        selectedNotification.id,
        payload
      );

      // Update notifications state
      setNotifications((prev) =>
        prev
          .map((n) =>
            n.id === selectedNotification.id
              ? { ...n, status: "sent" as const, details: editFormData }
              : n
          )
          .sort((a, b) => {
            if (a.status === "pending" && b.status !== "pending") return -1;
            if (a.status !== "pending" && b.status === "pending") return 1;
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          })
      );

      setIsEditing(false);
      setEditFormData({});
      setOriginalFormData({});
      setOpenSections(new Set());
      setShowConfirmDialog(false);
    } catch (error: any) {
      console.error("Saqlashda xato:", error);
      setError("Ma'lumotlarni saqlashda xato yuz berdi");
      setShowConfirmDialog(false);
    }
  };

  const renderNotificationDetails = (notification: Notification) => {
    const category = categories[notification.categoryKey];
    if (!category) return null;
    const currentDetails = isEditing ? editFormData : notification.details;
    let isFirstEditable = true; // Har bir notification uchun reset

    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-br from-blue-50/80 to-white/90 border-blue-100 shadow-sm rounded-lg">
          <CardHeader className="p-4 bg-blue-100/50 rounded-t-lg">
            <h4 className="text-lg font-medium text-gray-800">Mahsulot Rasmlari</h4>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4">
              {notification.images.length > 0 ? (
                notification.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Mahsulot rasmi ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-md border border-blue-200 transition-transform duration-200 hover:scale-105"
                  />
                ))
              ) : (
                <div className="w-24 h-24 bg-blue-100/50 rounded-md flex items-center justify-center">
                  <Bell className="h-6 w-6 text-gray-600" />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {Object.entries(category.sections).map(([sectionId, section]) => (
          <Card
            key={sectionId}
            className="bg-gradient-to-br from-blue-50/80 to-white/90 border-blue-100 shadow-sm rounded-lg"
          >
            <CardHeader
              className={`flex items-center justify-between p-4 bg-blue-100/50 rounded-t-lg ${
                isEditing ? "cursor-pointer hover:bg-blue-200/50" : ""
              }`}
              onClick={() => isEditing && toggleSection(sectionId)}
            >
              <h4 className="text-lg font-medium text-gray-800">{section.title}</h4>
              {isEditing && (
                <ChevronDown
                  className={`h-5 w-5 text-gray-600 transition-transform duration-200 ${
                    openSections.has(sectionId) ? "rotate-180" : ""
                  }`}
                />
              )}
            </CardHeader>
            {(isEditing ? openSections.has(sectionId) : true) && (
              <CardContent className="p-4 space-y-4 bg-white/90">
                {section.questions.map((question) => {
                  const rawValue = currentDetails[question.id] || "";
                  const fieldMap = categoryFieldMap[notification.categoryKey];
                  const apiField = fieldMap[question.id];
                  const isEditable = notification.editableFields.includes(apiField);

                  // Value ni to'g'ridan-to'g'ri details dan olish
                  const value = rawValue;

                  // Placeholder logikasi
                  let placeholderText = question.placeholder || "Ma'lumot kiritilmagan";
                  if (isEditable && notification.status === "pending" && !value) {
                    placeholderText = "Bu yerga siz ma'lumot kiritishingiz talab qilinadi";
                  } else if (isEditable && notification.status === "sent" && !value) {
                    placeholderText = "Ma'lumot kiritmagansiz";
                  }

                  // Ref faqat birinchi editable uchun
                  const inputRef = isEditable && isFirstEditable ? firstEditableInputRef : null;
                  if (isEditable) isFirstEditable = false;

                  return (
                    <div
                      key={question.id}
                      className={`space-y-2 p-3 rounded-md border ${
                        isEditing && isEditable
                          ? "bg-yellow-50/80 border-yellow-200"
                          : "bg-white/50 border-blue-100"
                      }`}
                    >
                      <Label htmlFor={question.id} className="text-sm font-medium text-gray-700">
                        {question.label}
                      </Label>
                      {isEditing && isEditable ? (
                        <Input
                          id={question.id}
                          value={value}
                          onChange={(e) => handleInputChange(question.id, e.target.value)}
                          placeholder={placeholderText}
                          className="border-yellow-200 focus:ring-yellow-400 transition-all duration-200 p-2 text-base bg-white rounded-md"
                          ref={inputRef}
                        />
                      ) : (
                        <p className="text-sm text-gray-900 pl-3 border-l-2 border-blue-200">
                          {value || (isEditable ? placeholderText : (question.placeholder || "Ma'lumot kiritilmagan"))}
                        </p>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-background to-background/90">
        <Card className="p-6 bg-gradient-to-br from-card to-card/80 backdrop-blur-md border-border/50 shadow-lg">
          <p>Yuklanmoqda...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-background to-background/90 flex min-h-screen relative">
      <main className="flex-1 p-4 sm:p-8 relative z-10">
        <div className="container mx-auto space-y-6 max-w-5xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-semibold">Bildirishnomalar</h1>
              <p className="text-muted-foreground mt-2 text-sm sm:text-base">
                Yangi habarlar va bildirishnomalarni ko'ring
              </p>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Xato</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {notifications.length === 0 ? (
            <Card className="p-12 text-center bg-gradient-to-br from-card to-card/80 shadow-lg">
              <BellOff className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground">
                Hozircha hech qanday bildirishnoma yo‘q
              </p>
            </Card>
          ) : (
            <Card className="p-6 bg-gradient-to-br from-white to-blue-50/80 border border-blue-200/50 shadow-lg rounded-lg">
              <div className="space-y-4 overflow-y-scroll max-h-[70vh]">
                {notifications.map((notification) => (
                  <Dialog
                    key={notification.id}
                    onOpenChange={(open) => {
                      if (!open) {
                        setSelectedNotification(null);
                        setIsEditing(false);
                        setEditFormData({});
                        setOriginalFormData({});
                        setOpenSections(new Set());
                        setShowConfirmDialog(false);
                      } else {
                        setSelectedNotification(notification);
                        // Scroll to bottom of modal
                        setTimeout(() => {
                          const dialogContent = document.querySelector(".dialog-content");
                          if (dialogContent) {
                            dialogContent.scrollTo({ top: dialogContent.scrollHeight, behavior: "smooth" });
                          }
                        }, 0);
                      }
                    }}
                  >
                    <DialogTrigger asChild>
                      <div className="flex items-center justify-between p-4 rounded-lg bg-white/50 border border-blue-200/50 hover:bg-blue-50/80 transition-all duration-200 cursor-pointer">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-12 h-12 bg-blue-100/50 rounded-lg flex items-center justify-center overflow-hidden">
                            {notification.images.length > 0 ? (
                              <img
                                src={notification.images[0]}
                                alt={notification.productName}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Bell className="h-6 w-6 text-gray-600" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800 text-lg">
                              {notification.productName}
                            </h3>
                            <p className="text-sm text-gray-600">{notification.categoryName}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant={getStatusVariant(notification.status) as any}
                            className="transition-all duration-200 px-3 py-1 rounded-full"
                          >
                            {notification.status === "pending" ? "To'ldirish kutilmoqda" : "Yuborilgan"}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">
                            {format(new Date(notification.createdAt), "dd.MM.yyyy HH:mm")}
                          </p>
                        </div>
                      </div>
                    </DialogTrigger>

                    <DialogContent className="dialog-content max-w-[90vw] md:max-w-6xl max-h-[90vh] overflow-y-auto bg-white/95 p-6 rounded-xl shadow-2xl border border-blue-200/50">
                      <DialogHeader className="flex items-center justify-between border-b border-blue-100 pb-4">
                        <DialogTitle className="text-2xl font-semibold text-gray-800">
                          {notification.productName} tafsilotlari
                        </DialogTitle>
                      </DialogHeader>

                      <div className="space-y-6 mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                          <div>
                            <p>
                              <strong>Kategoriya:</strong> {notification.categoryName}
                            </p>
                            <p>
                              <strong>Status:</strong>{" "}
                              <Badge variant={getStatusVariant(notification.status) as any}>
                                {notification.status === "pending" ? "To'ldirish kutilmoqda" : "Yuborilgan"}
                              </Badge>
                            </p>
                          </div>
                          <div>
                            <p>
                              <strong>Yaratilgan sana:</strong>{" "}
                              {format(new Date(notification.createdAt), "dd.MM.yyyy HH:mm")}
                            </p>
                          </div>
                        </div>
                        {renderNotificationDetails(notification)}
                      </div>

                      {notification.status === "pending" && (
                        <DialogFooter className="flex gap-3 justify-end mt-6 border-t border-blue-100 pt-4">
                          {!isEditing ? (
                            <Button
                              variant="outline"
                              onClick={() => startEditing(notification)}
                              className="border-blue-300 hover:bg-blue-100"
                            >
                              <Edit3 className="mr-2 h-4 w-4" />
                              Tahrirlash
                            </Button>
                          ) : (
                            <>
                              <Button
                                onClick={() => setShowConfirmDialog(true)}
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                                disabled={!hasChanges()}
                              >
                                <Send className="mr-2 h-4 w-4" />
                                Yuborish
                              </Button>
                              <Button
                                variant="outline"
                                onClick={cancelEditing}
                                className="border-blue-300 hover:bg-blue-100"
                              >
                                Bekor qilish
                              </Button>
                            </>
                          )}
                        </DialogFooter>
                      )}
                    </DialogContent>

                    {showConfirmDialog && (
                      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                        <DialogContent className="max-w-md p-6">
                          <DialogHeader>
                            <DialogTitle>Tasdiqlash</DialogTitle>
                          </DialogHeader>
                          <div className="py-4">
                            <p>Xaqiqatdan yubormoqchimisiz?</p>
                          </div>
                          <DialogFooter className="flex gap-3 justify-end">
                            <Button
                              variant="outline"
                              onClick={() => setShowConfirmDialog(false)}
                              className="border-blue-300 hover:bg-blue-100"
                            >
                              Yo'q
                            </Button>
                            <Button
                              onClick={handleConfirmSave}
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              Ha
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
                  </Dialog>
                ))}
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}