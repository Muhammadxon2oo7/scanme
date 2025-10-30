// "use client";

// import { useState, useEffect, useRef } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/src/components/ui/button";
// import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
// import { Input } from "@/src/components/ui/input";
// import { Label } from "@/src/components/ui/label";
// import { Textarea } from "@/src/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/src/components/ui/select";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogFooter,
// } from "@/src/components/ui/dialog";
// import { Alert, AlertDescription } from "@/src/components/ui/alert";
// import { CheckCircle, Plus, Trash2, AlertCircle, ChevronDown } from "lucide-react";
// import { getCategories, createCategory, createProduct, getPartners } from "@/lib/api";
// import Cookies from "js-cookie";

// interface Category { id: string; name: string; description?: string }
// interface Question { id: string; label: string; value: string; supplierId?: string }
// interface Section { id: string; title: string; questions: Question[] }
// interface Partner { id: string; name: string }

// export default function AddProductPage() {
//   const router = useRouter();
//   const imageInputRef = useRef<HTMLInputElement>(null);
//   const documentInputRef = useRef<HTMLInputElement>(null);

//   // States
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState<string>("");
//   const [sections, setSections] = useState<Section[]>([
//     {
//       id: "general",
//       title: "Umumiy ma’lumotlar",
//       questions: [{ id: "name", label: "Mahsulot nomi", value: "" }],
//     },
//   ]);
//   const [imageFiles, setImageFiles] = useState<File[]>([]);
//   const [imagePreviews, setImagePreviews] = useState<string[]>([]);
//   const [documentFiles, setDocumentFiles] = useState<File[]>([]);
//   const [partners, setPartners] = useState<Partner[]>([]);
//   const [openSections, setOpenSections] = useState<Set<string>>(new Set(["general"]));
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [error, setError] = useState("");

//   // Modal
//   const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
//   const [newCategoryName, setNewCategoryName] = useState("");
//   const [newCategoryDesc, setNewCategoryDesc] = useState("");
//   const [addCatError, setAddCatError] = useState("");

//   // === FETCH CATEGORIES ===
//   useEffect(() => {
//     const load = async () => {
//       try {
//         const data = await getCategories();
//         setCategories(data);
//       } catch (err: any) {
//         setError(err.message);
//       }
//     };
//     load();
//   }, []);

//   // === FETCH PARTNERS (eski logika saqlanadi) ===
//   useEffect(() => {
//     const load = async () => {
//       try {
//         const data = await getPartners();
//         const myId = Cookies.get("myid");
//         const partnerSet = new Set<string>();
//         const mapped: Partner[] = [];

//         data.forEach((item: any) => {
//           let id, name;
//           if (item.owner.id === myId) {
//             id = item.partner.id;
//             name = item.partner.name;
//           } else if (item.partner.id === myId) {
//             id = item.owner.id;
//             name = item.owner.name;
//           }
//           if (id && id !== myId && !partnerSet.has(id)) {
//             partnerSet.add(id);
//             mapped.push({ id, name });
//           }
//         });
//         setPartners(mapped);
//       } catch (err: any) {
//         console.error(err);
//       }
//     };
//     load();
//   }, []);

//   // Cleanup
//   useEffect(() => {
//     return () => imagePreviews.forEach(URL.revokeObjectURL);
//   }, [imagePreviews]);

//   // === SECTION & QUESTION HANDLERS ===
//   const addSection = () => {
//     const newSec: Section = { id: `sec-${Date.now()}`, title: "", questions: [] };
//     setSections(prev => [...prev, newSec]);
//     setOpenSections(prev => new Set(prev).add(newSec.id));
//   };

//   const removeSection = (id: string) => {
//     if (id === "general") return;
//     setSections(prev => prev.filter(s => s.id !== id));
//     setOpenSections(prev => { const n = new Set(prev); n.delete(id); return n; });
//   };

//   const updateSectionTitle = (id: string, title: string) => {
//     setSections(prev => prev.map(s => s.id === id ? { ...s, title } : s));
//   };

//   const addQuestion = (secId: string) => {
//     const newQ: Question = { id: `q-${Date.now()}`, label: "", value: "" };
//     setSections(prev => prev.map(s => s.id === secId ? { ...s, questions: [...s.questions, newQ] } : s));
//   };

//   const updateQuestion = (secId: string, qId: string, field: "label" | "value", value: string) => {
//     setSections(prev => prev.map(s =>
//       s.id === secId
//         ? { ...s, questions: s.questions.map(q => q.id === qId ? { ...q, [field]: value } : q) }
//         : s
//     ));
//   };

//   const setSupplier = (secId: string, qId: string, supplierId: string) => {
//     setSections(prev => prev.map(s =>
//       s.id === secId
//         ? {
//             ...s,
//             questions: s.questions.map(q =>
//               q.id === qId
//                 ? { ...q, supplierId: supplierId === "none" ? undefined : supplierId, value: supplierId === "none" ? q.value : "" }
//                 : q
//             ),
//           }
//         : s
//     ));
//   };

//   const removeQuestion = (secId: string, qId: string) => {
//     const sec = sections.find(s => s.id === secId);
//     if (sec?.id === "general" && sec.questions.length === 1) return;
//     setSections(prev => prev.map(s => s.id === secId ? { ...s, questions: s.questions.filter(q => q.id !== qId) } : s));
//   };

//   // === IMAGE & DOCUMENT ===
//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (!files) return;
//     const valid = Array.from(files).filter(f => f.size <= 10 * 1024 * 1024);
//     if (valid.length === 0) return alert("Rasm 10MB dan kichik bo‘lishi kerak");
//     const toAdd = valid.slice(0, 5 - imageFiles.length);
//     const previews = toAdd.map(URL.createObjectURL);
//     setImageFiles(prev => [...prev, ...toAdd]);
//     setImagePreviews(prev => [...prev, ...previews]);
//   };

//   const removeImage = (i: number) => {
//     URL.revokeObjectURL(imagePreviews[i]);
//     setImageFiles(prev => prev.filter((_, idx) => idx !== i));
//     setImagePreviews(prev => prev.filter((_, idx) => idx !== i));
//   };

//   const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (!files) return;
//     const valid = Array.from(files).filter(f => {
//       const ext = f.name.toLowerCase();
//       const isDoc = [".pdf", ".doc", ".docx"].some(e => ext.endsWith(e));
//       const isImg = f.type.startsWith("image/");
//       return (isDoc || isImg) && f.size <= 10 * 1024 * 1024;
//     });
//     setDocumentFiles(prev => [...prev, ...valid]);
//   };

//   const removeDocument = (i: number) => {
//     setDocumentFiles(prev => prev.filter((_, idx) => idx !== i));
//   };

//   // === ADD CATEGORY ===
//   const handleAddCategory = async () => {
//     if (!newCategoryName.trim()) return setAddCatError("Nomi bo‘sh bo‘lmasin");
//     try {
//       const newCat = await createCategory({ name: newCategoryName, description: newCategoryDesc });
//       setCategories(prev => [...prev, newCat]);
//       setSelectedCategory(newCat.id);
//       setIsAddCategoryOpen(false);
//       setNewCategoryName("");
//       setNewCategoryDesc("");
//       setAddCatError("");
//     } catch (err: any) {
//       setAddCatError(err.message);
//     }
//   };
// const handleSubmit = async () => {
//   if (!selectedCategory) return alert("Kategoriya tanlang");

//   // 1. Umumiy ma’lumotlar bo‘limini topamiz
//   const generalSection = sections.find(s => s.id === "general");
//   if (!generalSection || generalSection.questions.length === 0) {
//     return alert("Mahsulot nomi kiritilishi shart");
//   }

//   // 2. Mahsulot nomi — faqat birinchi maydon
//   const productName = generalSection.questions[0]?.value.trim();
//   if (!productName) return alert("Mahsulot nomi kiritilishi shart");

//   // 3. Bo‘sh bo‘lim nomlari tekshiruvi
//   const hasEmptyTitle = sections.some(s => s.title.trim() === "" && s.questions.length > 0);
//   if (hasEmptyTitle) return alert("Bo‘lim nomi bo‘sh bo‘lmasin");

//   // 4. Umumiy ma’lumotlar bo‘limini tozalaymiz: 1-inputni olib tashlaymiz
//   const cleanGeneralSection = {
//     title: "Umumiy ma’lumotlar",
//     questions: generalSection.questions
//        // 0-index → Mahsulot nomi → olib tashlanadi
//       .filter(q => q.label.trim() !== "")
//       .map(({ id, supplierId, value, label }) => {
//         if (supplierId) return { label, supplierId };
//         return { label, value };
//       }),
//   };

//   // 5. Boshqa bo‘limlarni tozalaymiz
//   const otherSections = sections
//     .filter(s => s.id !== "general")
//     .map(s => ({
//       title: s.title,
//       questions: s.questions
//         .filter(q => q.label.trim() !== "")
//         .map(({ id, supplierId, value, label }) => {
//           if (supplierId) return { label, supplierId };
//           return { label, value };
//         }),
//     }))
//     .filter(s => s.questions.length > 0);

//   // 6. Final sections: Umumiy + Boshqalar
//   const finalSections = [];
//   if (cleanGeneralSection.questions.length > 0) {
//     finalSections.push(cleanGeneralSection);
//   }
//   finalSections.push(...otherSections);

//   // 7. Payload
//   const payload = {
//     category: selectedCategory,
//     sections: finalSections,
//   };
//   const formData = new FormData();

// formData.append("category", selectedCategory);
// formData.append("sections", JSON.stringify(finalSections)); // agar sections JSON bo‘lsa
// imageFiles.forEach(f => formData.append("images", f));
// documentFiles.forEach(f => formData.append("documents", f));

//   setIsSubmitting(true);
//   setError("");

//   try {
//     await createProduct(selectedCategory, formData);
//     setIsSuccess(true);
//     setTimeout(() => router.push("/employer/products"), 2000);
//   } catch (err: any) {
//     setError(err.message || "Mahsulot qo‘shilmadi");
//   } finally {
//     setIsSubmitting(false);
//   }
// };
//   return (
//     <div className="min-h-screen w-full  p-4 md:p-0">
//       <div className="container mx-auto max-w-5xl">
//         <h1 className="text-3xl font-bold text-gray-800 mb-2">Yangi Mahsulot Qo‘shish</h1>
//         <p className="text-gray-600 mb-8">Mahsulot ma’lumotlarini to‘ldiring</p>

//         {isSuccess && (
//           <Alert className="mb-6 border-green-200 bg-green-50">
//             <CheckCircle className="h-5 w-5 text-green-600" />
//             <AlertDescription className="text-green-700">
//               Mahsulot muvaffaqiyatli qo‘shildi!
//             </AlertDescription>
//           </Alert>
//         )}

//         {error && (
//           <Alert variant="destructive" className="mb-6">
//             <AlertCircle className="h-5 w-5" />
//             <AlertDescription>{error}</AlertDescription>
//           </Alert>
//         )}

//         <Card className="p-6 bg-white shadow-lg border border-blue-100 h-[70vh] overflow-y-scroll">
//           {/* KATEGORIYA */}
//           <div className="mb-1">
//             <Label className="text-lg font-medium mb-3 block">Kategoriya</Label>
//             <div className="flex gap-3 flex-wrap">
//               <Select value={selectedCategory} onValueChange={setSelectedCategory}>
//                 <SelectTrigger className="flex-1">
//                   <SelectValue placeholder="Kategoriyani tanlang" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {categories.map(cat => (
//                     <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
             
//               <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
//                 <DialogTrigger asChild>
//                   <Button variant="outline"><Plus className="h-4 w-4" /></Button>
//                 </DialogTrigger>
//                 <DialogContent>
//                   <DialogHeader><DialogTitle>Yangi Kategoriya</DialogTitle></DialogHeader>
//                   {addCatError && <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertDescription>{addCatError}</AlertDescription></Alert>}
//                   <div className="space-y-4">
//                     <div><Label>Nomi</Label><Input value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} placeholder="Smartfonlar" /></div>
//                     <div><Label>Tavsif</Label><Textarea value={newCategoryDesc} onChange={e => setNewCategoryDesc(e.target.value)} rows={2} /></div>
//                   </div>
//                   <DialogFooter>
//                     <Button variant="outline" onClick={() => setIsAddCategoryOpen(false)}>Bekor</Button>
//                     <Button onClick={handleAddCategory}>Qo‘shish</Button>
//                   </DialogFooter>
//                 </DialogContent>
//               </Dialog>
//                <div className="w-full">
//               <p className="w-full text-gray-300">
//                 {selectedCategory && categories.find(cat => cat.id === selectedCategory)?.description}
//               </p>

//                </div>
//             </div>
//           </div>

//           {selectedCategory && (
//             <>
//               {/* RASMLAR */}
//               <div className="mb-8">
//                 <Label className="text-lg font-medium mb-3 block">Rasmlar <span className="text-gray-300">(max 5)</span></Label>
//                 <input type="file" accept="image/*" multiple ref={imageInputRef} onChange={handleImageChange} className="hidden" />
//                 <div className="flex flex-wrap gap-4">
//                   {imagePreviews.map((src, i) => (
//                     <div key={i} className="relative group">
//                       <img src={src} alt="" className="w-24 h-24 object-cover rounded-lg border" />
//                       <Button size="icon" variant="destructive" className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100" onClick={() => removeImage(i)}>
//                         <Trash2 className="h-3 w-3" />
//                       </Button>
//                     </div>
//                   ))}
//                   {imageFiles.length < 5 && (
//                     <label onClick={() => imageInputRef.current?.click()} className="w-24 h-24 border-2 border-dashed border-blue-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-50">
//                       <Plus className="h-6 w-6 text-blue-500" />
//                     </label>
//                   )}
//                 </div>
//               </div>

//               {/* HUJJATLAR */}
//               <div className="mb-8">
//                 <Label className="text-lg font-medium mb-3 block">Hujjatlar <span className="text-gray-300">(barcha kerakli hujjatlar)</span></Label>
//                 <input type="file" accept=".pdf,.doc,.docx,image/*" multiple ref={documentInputRef} onChange={handleDocumentChange} className="hidden" />
//                 <div className="flex flex-wrap gap-3">
//                   {documentFiles.map((f, i) => (
//                     <div key={i} className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md">
//                       <span className="text-sm truncate max-w-[200px]">{f.name}</span>
//                       <Button size="icon" variant="ghost" onClick={() => removeDocument(i)}><Trash2 className="h-3 w-3" /></Button>
//                     </div>
//                   ))}
//                   <label onClick={() => documentInputRef.current?.click()} className="w-24 h-24 border-2 border-dashed border-blue-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-50">
//                     <Plus className="h-6 w-6 text-blue-500" />
//                   </label>
//                 </div>
//               </div>

//               {/* BO‘LIMLAR */}
//               <div className="space-y-6">
//                 <div className="flex justify-between items-center">
//                   <h3 className="text-xl font-medium">Bo‘limlar</h3>
//                   <Button onClick={addSection} size="sm"><Plus className="h-4 w-4 mr-1" /> Bo‘lim</Button>
//                 </div>

//                 {sections.map(sec => (
//                   <Card key={sec.id} className="border-blue-100">
//                     <CardHeader className="flex items-center justify-between p-4 bg-primary text-white cursor-pointer rounded-t-lg" onClick={() => {
//                       const n = new Set(openSections);
//                       n.has(sec.id) ? n.delete(sec.id) : n.add(sec.id);
//                       setOpenSections(n);
//                     }}>
//                       <Input value={sec.title} onChange={e => updateSectionTitle(sec.id, e.target.value)} onClick={e => e.stopPropagation()} placeholder="Bo‘lim nomi" className="text-lg font-medium bg-transparent border-0" disabled={sec.id === "general"} />
//                       <div className="flex items-center gap-2">
//                         {sec.id !== "general" && <Button size="icon" variant="ghost" onClick={e => { e.stopPropagation(); removeSection(sec.id); }}><Trash2 className="h-4 w-4" /></Button>}
//                         <ChevronDown className={`h-5 w-5 transition-transform ${openSections.has(sec.id) ? "rotate-180" : ""}`} />
//                       </div>
//                     </CardHeader>

//                     {openSections.has(sec.id) && (
//                       <CardContent className="p-4 space-y-4">
//                         <Button size="sm" onClick={() => addQuestion(sec.id)}><Plus className="h-4 w-4 mr-1" /> Maydon</Button>
//                         {sec.questions.map((q, i) => (
//                           <div key={q.id} className="flex gap-3 items-end">
//                             <div className="flex-1 space-y-2">
//                               <Label>Nomi</Label>
//                               <Input value={q.label} onChange={e => updateQuestion(sec.id, q.id, "label", e.target.value)} placeholder="Nom yozing" className="border-primary text-primary" disabled={sec.id === "general" && i === 0} />
//                             </div>
//                             <div className="flex-1 space-y-2">
//                               <Label>Qiymati</Label>
//                               <Input value={q.value} onChange={e => updateQuestion(sec.id, q.id, "value", e.target.value)} placeholder="qiymat kiriting" disabled={!!q.supplierId} className="border-primary text-primary" />
//                             </div>
//                             {sec.id !== "general" && (
//                               <div className="w-48">
//                                 <Label>Ta’minotchi</Label>
//                                 <Select value={q.supplierId || "none"} onValueChange={v => setSupplier(sec.id, q.id, v)}>
//                                   <SelectTrigger><SelectValue /></SelectTrigger>
//                                   <SelectContent>
//                                     <SelectItem value="none">Tanlamaslik</SelectItem>
//                                     {partners.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
//                                   </SelectContent>
//                                 </Select>
//                               </div>
//                             )}
//                             <Button size="icon" variant="ghost" onClick={() => removeQuestion(sec.id, q.id)} disabled={sec.id === "general" && i === 0}>
//                               <Trash2 className="h-4 w-4" />
//                             </Button>
//                           </div>
//                         ))}
//                       </CardContent>
//                     )}
//                   </Card>
//                 ))}
//               </div>

//               <div className="mt-8 flex justify-end">
//                 <Button size="lg" onClick={handleSubmit} disabled={isSubmitting || !selectedCategory} className="cursor-pointer hover:bg-primary">
//                   {isSubmitting ? "Saqlanmoqda..." : "Mahsulot qo‘shish"}
//                 </Button>
//               </div>
//             </>
//           )}
//         </Card>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/src/components/ui/dialog";
import { Alert, AlertDescription } from "@/src/components/ui/alert";
import { CheckCircle, Plus, Trash2, AlertCircle, ChevronDown } from "lucide-react";
import { getCategories, createCategory, createProduct, getPartners } from "@/lib/api";
import Cookies from "js-cookie";

interface Category { id: string; name: string; description?: string }
interface Question { id: string; label: string; value: string; supplierId?: string }
interface Section { id: string; title: string; questions: Question[] }
interface Partner { id: string; name: string }

export default function AddProductPage() {
  const router = useRouter();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);

  // States
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sections, setSections] = useState<Section[]>([
    {
      id: "general",
      title: "Umumiy ma’lumotlar",
      questions: [{ id: "name", label: "Mahsulot nomi", value: "" }],
    },
  ]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [documentFiles, setDocumentFiles] = useState<File[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(["general"]));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  // Modal
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDesc, setNewCategoryDesc] = useState("");
  const [addCatError, setAddCatError] = useState("");

  // === FETCH CATEGORIES ===
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err: any) {
        setError(err.message || "Kategoriyalarni yuklashda xatolik");
      }
    };
    load();
  }, []);

  // === FETCH PARTNERS ===
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getPartners();
        const myId = Cookies.get("myid");
        const partnerSet = new Set<string>();
        const mapped: Partner[] = [];

        data.forEach((item: any) => {
          let id, name;
          if (item.owner.id === myId) {
            id = item.partner.id;
            name = item.partner.name;
          } else if (item.partner.id === myId) {
            id = item.owner.id;
            name = item.owner.name;
          }
          if (id && id !== myId && !partnerSet.has(id)) {
            partnerSet.add(id);
            mapped.push({ id, name });
          }
        });
        setPartners(mapped);
      } catch (err: any) {
        console.error("Partners yuklashda xatolik:", err);
      }
    };
    load();
  }, []);

  // Cleanup image previews
  useEffect(() => {
    return () => imagePreviews.forEach(URL.revokeObjectURL);
  }, [imagePreviews]);

  // === SECTION & QUESTION HANDLERS ===
  const addSection = () => {
    const newSec: Section = { id: `sec-${Date.now()}`, title: "", questions: [] };
    setSections(prev => [...prev, newSec]);
    setOpenSections(prev => new Set(prev).add(newSec.id));
  };

  const removeSection = (id: string) => {
    if (id === "general") return;
    setSections(prev => prev.filter(s => s.id !== id));
    setOpenSections(prev => { const n = new Set(prev); n.delete(id); return n; });
  };

  const updateSectionTitle = (id: string, title: string) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, title } : s));
  };

  const addQuestion = (secId: string) => {
    const newQ: Question = { id: `q-${Date.now()}`, label: "", value: "" };
    setSections(prev => prev.map(s => s.id === secId ? { ...s, questions: [...s.questions, newQ] } : s));
  };

  const updateQuestion = (secId: string, qId: string, field: "label" | "value", value: string) => {
    setSections(prev => prev.map(s =>
      s.id === secId
        ? { ...s, questions: s.questions.map(q => q.id === qId ? { ...q, [field]: value } : q) }
        : s
    ));
  };

  const setSupplier = (secId: string, qId: string, supplierId: string) => {
    setSections(prev => prev.map(s =>
      s.id === secId
        ? {
            ...s,
            questions: s.questions.map(q =>
              q.id === qId
                ? { ...q, supplierId: supplierId === "none" ? undefined : supplierId, value: supplierId === "none" ? q.value : "" }
                : q
            ),
          }
        : s
    ));
  };

  const removeQuestion = (secId: string, qId: string) => {
    const sec = sections.find(s => s.id === secId);
    if (sec?.id === "general" && sec.questions.length === 1) return;
    setSections(prev => prev.map(s => s.id === secId ? { ...s, questions: s.questions.filter(q => q.id !== qId) } : s));
  };

  // === IMAGE & DOCUMENT ===
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const valid = Array.from(files).filter(f => f.size <= 10 * 1024 * 1024);
    if (valid.length === 0) {
      setError("Rasm 10MB dan kichik bo‘lishi kerak");
      return;
    }
    const toAdd = valid.slice(0, 5 - imageFiles.length);
    const previews = toAdd.map(URL.createObjectURL);
    setImageFiles(prev => [...prev, ...toAdd]);
    setImagePreviews(prev => [...prev, ...previews]);
  };

  const removeImage = (i: number) => {
    URL.revokeObjectURL(imagePreviews[i]);
    setImageFiles(prev => prev.filter((_, idx) => idx !== i));
    setImagePreviews(prev => prev.filter((_, idx) => idx !== i));
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const valid = Array.from(files).filter(f => {
      const ext = f.name.toLowerCase();
      const isDoc = [".pdf", ".doc", ".docx"].some(e => ext.endsWith(e));
      const isImg = f.type.startsWith("image/");
      return (isDoc || isImg) && f.size <= 10 * 1024 * 1024;
    });
    setDocumentFiles(prev => [...prev, ...valid]);
  };

  const removeDocument = (i: number) => {
    setDocumentFiles(prev => prev.filter((_, idx) => idx !== i));
  };

  // === ADD CATEGORY ===
  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return setAddCatError("Nomi bo‘sh bo‘lmasin");
    try {
      const newCat = await createCategory({ name: newCategoryName, description: newCategoryDesc });
      setCategories(prev => [...prev, newCat]);
      setSelectedCategory(newCat.id);
      setIsAddCategoryOpen(false);
      setNewCategoryName("");
      setNewCategoryDesc("");
      setAddCatError("");
    } catch (err: any) {
      setAddCatError(err.message || "Kategoriya qo‘shilmadi");
    }
  };

  // === SUBMIT WITH VALIDATION ===
  // const handleSubmit = async () => {
  //   setError("");
  //   setIsSuccess(false);

  //   // 1. Kategoriya tanlanganmi?
  //   if (!selectedCategory) {
  //     setError("Kategoriya tanlang");
  //     return;
  //   }

  //   // 2. Umumiy ma’lumotlar bo‘limi
  //   const generalSection = sections.find(s => s.id === "general");
  //   if (!generalSection || generalSection.questions.length === 0) {
  //     setError("Mahsulot nomi kiritilishi shart");
  //     return;
  //   }

  //   const productName = generalSection.questions[0]?.value.trim();
  //   if (!productName) {
  //     setError("Mahsulot nomi kiritilishi shart");
  //     return;
  //   }

  //   // 3. Yaroqli savol funksiyasi
  //   const isValidQuestion = (q: Question): boolean => {
  //     const hasLabel = q.label.trim() !== "";
  //     const hasValue = q.value.trim() !== "";
  //     const hasSupplier = !!q.supplierId;
  //     return hasLabel && (hasValue || hasSupplier);
  //   };

  //   // 4. Bo'sh bo'lim nomlari (faqat to'ldirilgan bo'limlar uchun)
  //   const hasEmptySectionTitle = sections.some(s =>
  //     s.id !== "general" &&
  //     s.title.trim() === "" &&
  //     s.questions.some(isValidQuestion)
  //   );
  //   if (hasEmptySectionTitle) {
  //     setError("Bo‘lim nomi bo‘sh bo‘lmasin");
  //     return;
  //   }

  //   // 5. Tozalash: Umumiy bo'lim (faqat nomi olinadi, qolganlari filter)
  //   const cleanGeneralSection = {
  //     title: "Umumiy ma’lumotlar",
  //     questions: generalSection.questions
  //       .filter(isValidQuestion)
  //       .map(q => ({
  //         label: q.label,
  //         ...(q.supplierId ? { supplierId: q.supplierId } : { value: q.value }),
  //       })),
  //   };

  //   // 6. Boshqa bo'limlar
  //   const otherSections = sections
  //     .filter(s => s.id !== "general")
  //     .map(s => ({
  //       title: s.title,
  //       questions: s.questions
  //         .filter(isValidQuestion)
  //         .map(q => ({
  //           label: q.label,
  //           ...(q.supplierId ? { supplierId: q.supplierId } : { value: q.value }),
  //         })),
  //     }))
  //     .filter(s => s.questions.length > 0 && s.title.trim() !== "");

  //   // 7. Final sections
  //   const finalSections = [];
  //   if (cleanGeneralSection.questions.length > 0) finalSections.push(cleanGeneralSection);
  //   finalSections.push(...otherSections);

  //   // 8. Hech bo'lmaganda bitta to'ldirilgan maydon bo'lishi kerak
  //   if (finalSections.length === 0) {
  //     setError("Hech bo'lmaganda bitta to‘ldirilgan maydon bo‘lishi kerak");
  //     return;
  //   }

  //   // 9. FormData
  //   const formData = new FormData();
  //   formData.append("category", selectedCategory);
  //   formData.append("sections", JSON.stringify(finalSections));
  //   imageFiles.forEach(f => formData.append("images", f));
  //   documentFiles.forEach(f => formData.append("documents", f));

  //   setIsSubmitting(true);

  //   try {
  //     await createProduct(selectedCategory, formData);
  //     setIsSuccess(true);
  //     setTimeout(() => router.push("/employer/products"), 2000);
  //   } catch (err: any) {
  //     setError(err.message || "Mahsulot qo‘shishda xatolik yuz berdi");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleSubmit = async () => {
  setError("");
  setIsSuccess(false);

  // 1. Kategoriya tanlanganmi?
  if (!selectedCategory) {
    setError("Kategoriya tanlang");
    return;
  }

  // 2. Umumiy ma’lumotlar bo‘limi
  const generalSection = sections.find((s) => s.id === "general");
  if (!generalSection || generalSection.questions.length === 0) {
    setError("Mahsulot nomi kiritilishi shart");
    return;
  }

  const productName = generalSection.questions[0]?.value.trim();
  if (!productName) {
    setError("Mahsulot nomi kiritilishi shart");
    return;
  }

  // 3. Yaroqli savol funksiyasi
  const isValidQuestion = (q: Question): boolean => {
    const hasLabel = q.label.trim() !== "";
    const hasSupplier = !!q.supplierId;
    const hasValue = q.value?.trim() !== "";
    // label bo‘lishi shart, supplier yoki value bo‘lishi mumkin
    return hasLabel && (hasSupplier || hasValue);
  };

  // 4. Bo‘lim nomi yozilmagan bo‘lsa — xato
  const hasEmptySectionTitle = sections.some(
    (s) =>
      s.id !== "general" &&
      s.title.trim() === "" &&
      s.questions.some((q) => isValidQuestion(q))
  );

  if (hasEmptySectionTitle) {
    setError("Bo‘lim nomi yozilmagan. Iltimos, to‘ldiring.");
    return;
  }

  // 5. Umumiy ma’lumotlar bo‘limi — faqat to‘ldirilgan inputlar
  const cleanGeneralSection = {
    title: "Umumiy ma’lumotlar",
    questions: generalSection.questions
      .filter(isValidQuestion)
      .map((q) => ({
        label: q.label.trim(),
        value: q.value?.trim() || "",
        ...(q.supplierId ? { supplierId: q.supplierId } : {}),
      })),
  };

  // 6. Boshqa bo‘limlar
  const otherSections = sections
    .filter((s) => s.id !== "general")
    .map((s) => ({
      title: s.title.trim(),
      questions: s.questions
        .filter((q) => q.label.trim() !== "") // label bo‘sh bo‘lmasin
        .map((q) => ({
          label: q.label.trim(),
          value: q.value?.trim() || "", // value bo‘sh bo‘lsa ham ketadi
          ...(q.supplierId ? { supplierId: q.supplierId } : {})
        }))
        .filter((q) => q.label !== ""), // label yo‘q inputlar ketmasin
    }))
    .filter((s) => s.title !== "" && s.questions.length > 0); // nomi bo‘sh yoki savolsiz bo‘limlar ketmasin

  // 7. Final sections
  const finalSections = [];
  if (cleanGeneralSection.questions.length > 0)
    finalSections.push(cleanGeneralSection);
  finalSections.push(...otherSections);

  if (finalSections.length === 0) {
    setError("Hech bo‘lmaganda bitta to‘ldirilgan maydon bo‘lishi kerak");
    return;
  }

  // 8. FormData tayyorlash
  const formData = new FormData();
  formData.append("category", selectedCategory);
  // formData.append("name", productName); // umumiy ma’lumotlardan olinadi
  formData.append("sections", JSON.stringify(finalSections));
  imageFiles.forEach((f) => formData.append("images", f));
  documentFiles.forEach((f) => formData.append("documents", f));

  setIsSubmitting(true);

  try {
    await createProduct(selectedCategory, formData);
    setIsSuccess(true);
    setTimeout(() => router.push("/employer/products"), 2000);
  } catch (err: any) {
    console.error(err);
    setError(err.message || "Mahsulot qo‘shishda xatolik yuz berdi");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="min-h-screen w-full p-4 md:p-0">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Yangi Mahsulot Qo‘shish</h1>
        <p className="text-gray-600 mb-8">Mahsulot ma’lumotlarini to‘ldiring</p>

        {/* SUCCESS ALERT */}
        {isSuccess && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <AlertDescription className="text-green-700">
              Mahsulot muvaffaqiyatli qo‘shildi!
            </AlertDescription>
          </Alert>
        )}

        {/* ERROR ALERT */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-5 w-5" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Card className="p-6 bg-white shadow-lg border border-blue-100 h-[70vh] overflow-y-scroll">
          {/* KATEGORIYA */}
          <div className="mb-1">
            <Label className="text-lg font-medium mb-3 block">Kategoriya</Label>
            <div className="flex gap-3 flex-wrap">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Kategoriyani tanlang" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline"><Plus className="h-4 w-4" /></Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Yangi Kategoriya</DialogTitle></DialogHeader>
                  {addCatError && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{addCatError}</AlertDescription>
                    </Alert>
                  )}
                  <div className="space-y-4">
                    <div><Label>Nomi</Label><Input value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} placeholder="Smartfonlar" /></div>
                    <div><Label>Tavsif</Label><Textarea value={newCategoryDesc} onChange={e => setNewCategoryDesc(e.target.value)} rows={2} /></div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddCategoryOpen(false)}>Bekor</Button>
                    <Button onClick={handleAddCategory}>Qo‘shish</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <div className="w-full">
                <p className="w-full text-gray-400 text-sm">
                  {selectedCategory && categories.find(cat => cat.id === selectedCategory)?.description}
                </p>
              </div>
            </div>
          </div>

          {selectedCategory && (
            <>
              {/* RASMLAR */}
              <div className="mb-8">
                <Label className="text-lg font-medium mb-3 block">Rasmlar <span className="text-gray-400">(max 5)</span></Label>
                <input type="file" accept="image/*" multiple ref={imageInputRef} onChange={handleImageChange} className="hidden" />
                <div className="flex flex-wrap gap-4">
                  {imagePreviews.map((src, i) => (
                    <div key={i} className="relative group">
                      <img src={src} alt="" className="w-24 h-24 object-cover rounded-lg border" />
                      <Button size="icon" variant="destructive" className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100" onClick={() => removeImage(i)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  {imageFiles.length < 5 && (
                    <label onClick={() => imageInputRef.current?.click()} className="w-24 h-24 border-2 border-dashed border-blue-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-50">
                      <Plus className="h-6 w-6 text-blue-500" />
                    </label>
                  )}
                </div>
              </div>

              {/* HUJJATLAR */}
              <div className="mb-8">
                <Label className="text-lg font-medium mb-3 block">Hujjatlar <span className="text-gray-400">(barcha kerakli hujjatlar)</span></Label>
                <input type="file" accept=".pdf,.doc,.docx,image/*" multiple ref={documentInputRef} onChange={handleDocumentChange} className="hidden" />
                <div className="flex flex-wrap gap-3">
                  {documentFiles.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md">
                      <span className="text-sm truncate max-w-[200px]">{f.name}</span>
                      <Button size="icon" variant="ghost" onClick={() => removeDocument(i)}><Trash2 className="h-3 w-3" /></Button>
                    </div>
                  ))}
                  <label onClick={() => documentInputRef.current?.click()} className="w-24 h-24 border-2 border-dashed border-blue-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-50">
                    <Plus className="h-6 w-6 text-blue-500" />
                  </label>
                </div>
              </div>

              {/* BO‘LIMLAR */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-medium">Bo‘limlar</h3>
                  <Button onClick={addSection} size="sm"><Plus className="h-4 w-4 mr-1" /> Bo‘lim</Button>
                </div>

                {sections.map(sec => (
                  <Card key={sec.id} className="border-blue-100">
                    <CardHeader className="flex items-center justify-between p-4 bg-primary text-white cursor-pointer rounded-t-lg" onClick={() => {
                      const n = new Set(openSections);
                      n.has(sec.id) ? n.delete(sec.id) : n.add(sec.id);
                      setOpenSections(n);
                    }}>
                      <Input
                        value={sec.title}
                        onChange={e => updateSectionTitle(sec.id, e.target.value)}
                        onClick={e => e.stopPropagation()}
                        placeholder="Bo‘lim nomi"
                        className="text-lg font-medium bg-transparent border-0 text-white placeholder:text-gray-200"
                        disabled={sec.id === "general"}
                      />
                      <div className="flex items-center gap-2">
                        {sec.id !== "general" && (
                          <Button size="icon" variant="ghost" onClick={e => { e.stopPropagation(); removeSection(sec.id); }}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                        <ChevronDown className={`h-5 w-5 transition-transform ${openSections.has(sec.id) ? "rotate-180" : ""}`} />
                      </div>
                    </CardHeader>

                    {openSections.has(sec.id) && (
                      <CardContent className="p-4 space-y-4">
                        <Button size="sm" onClick={() => addQuestion(sec.id)}><Plus className="h-4 w-4 mr-1" /> Maydon</Button>
                        {sec.questions.map((q, i) => (
                          <div key={q.id} className="flex gap-3 items-end">
                            <div className="flex-1 space-y-2">
                              <Label>Nomi</Label>
                              <Input
                                value={q.label}
                                onChange={e => updateQuestion(sec.id, q.id, "label", e.target.value)}
                                placeholder="Nom yozing"
                                className="border-primary"
                                disabled={sec.id === "general" && i === 0}
                              />
                            </div>
                            <div className="flex-1 space-y-2">
                              <Label>Qiymati</Label>
                              <Input
                                value={q.value}
                                onChange={e => updateQuestion(sec.id, q.id, "value", e.target.value)}
                                placeholder="Qiymat kiriting"
                                disabled={!!q.supplierId}
                                className="border-primary"
                              />
                            </div>
                            {sec.id !== "general" && (
                              <div className="w-48">
                                <Label>Ta’minotchi</Label>
                                <Select value={q.supplierId || "none"} onValueChange={v => setSupplier(sec.id, q.id, v)}>
                                  <SelectTrigger><SelectValue /></SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="none">Tanlamaslik</SelectItem>
                                    {partners.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                                  </SelectContent>
                                </Select>
                              </div>
                            )}
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => removeQuestion(sec.id, q.id)}
                              disabled={sec.id === "general" && i === 0}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>

              <div className="mt-8 flex justify-end">
                <Button
                  size="lg"
                  onClick={handleSubmit}
                  disabled={isSubmitting || !selectedCategory}
                  className="hover:bg-primary"
                >
                  {isSubmitting ? "Saqlanmoqda..." : "Mahsulot qo‘shish"}
                </Button>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}