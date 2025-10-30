"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/src/components/ui/dialog";
import {
  Package,
  Plus,
  Edit3,
  Save,
  X,
  Trash2,
  ChevronDown,
  ScanEyeIcon,
  Star,
  StarHalf,
  StarOff,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import {
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  updateProductStatus,
  getPartners,
} from "@/lib/api";
import { useToast } from "@/src/components/ui/use-toast";
import {
  Alert,
  AlertDescription,
} from "@/src/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/src/components/ui/alert-dialog";

interface Question {
  label: string;
  value?: string;
  supplierId?: string;
}

interface Section {
  id: string;
  title: string;
  questions: Question[];
}
import { QrCode, Download } from "lucide-react";

interface Product {
  id: string;
  name: string;
  status: "draft" | "pending" | "active";
  category: { id: string; name: string };
  created_by: string;
  qr_code: string | null;
  created_at: string;
  activated_at: string | null;
  images: string[];
  documents: string[];
  rating: number;
  all_scan: number;
  sections: Section[];
}

const getStatusText = (status: Product["status"]) => {
  switch (status) {
    case "draft": return "To‘ldirilmoqda";
    case "pending": return "Admin tasdiqlashi kutilmoqda";
    case "active": return "Faol";
    default: return status;
  }
};

const getStatusVariant = (status: Product["status"]) => {
  switch (status) {
    case "draft": return "secondary";
    case "pending": return "outline";
    case "active": return "default";
    default: return "secondary";
  }
};

export default function ProductsPage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editSections, setEditSections] = useState<Section[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [documentFiles, setDocumentFiles] = useState<File[]>([]);
  const [keptImages, setKeptImages] = useState<string[]>([]);
  const [keptDocuments, setKeptDocuments] = useState<string[]>([]);
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [carouselIndex, setCarouselIndex] = useState<Record<string, number>>({});
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [partners, setPartners] = useState<{ id: string; name: string }[]>([]);
  const [saveAlert, setSaveAlert] = useState<{ type: "error" | "success"; message: string } | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [selectedQrProduct, setSelectedQrProduct] = useState<Product | null>(null);
  // PARTNERLAR YUKLASH
  useEffect(() => {
    const load = async () => {
      const myId = Cookies.get("myid");
      if (!myId) {
        toast({ description: "Foydalanuvchi topilmadi", variant: "destructive" });
        return;
      }

      try {
        const data = await getPartners();
        const partnerSet = new Set<string>();
        const mapped: { id: string; name: string }[] = [];

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
      } catch (err) {
        console.error(err);
        toast({ description: "Hamkorlar yuklanmadi", variant: "destructive" });
      }
    };
    load();
  }, []);

  // Carousel
  useEffect(() => {
    const intervals: Record<string, NodeJS.Timeout> = {};
    products.forEach((product) => {
      if (product.images.length > 1) {
        intervals[product.id] = setInterval(() => {
          setCarouselIndex((prev) => ({
            ...prev,
            [product.id]: ((prev[product.id] || 0) + 1) % product.images.length,
          }));
        }, 3000);
      }
    });
    return () => Object.values(intervals).forEach(clearInterval);
  }, [products]);

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      toast({ description: "Mahsulotlar yuklanmadi", variant: "destructive" });
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleStatusChange = async (productId: string, status: string) => {
    try {
      await updateProductStatus(productId, status);
      await fetchProducts();
      setSelectedProduct(prev => prev ? { ...prev, status: status as any } : null);
      toast({ description: "Status yangilandi" });
    } catch (error) {
      toast({ description: "Status yangilanmadi", variant: "destructive" });
    }
  };

  const startEditing = () => {
    if (!selectedProduct) return;

    const general = selectedProduct.sections.find(s => 
      s.title.toLowerCase().includes("umumiy")
    ) || { id: "general", title: "Umumiy ma’lumotlar", questions: [] };

    const otherSections = selectedProduct.sections.filter(s => 
      !s.title.toLowerCase().includes("umumiy")
    );

    const mapped: Section[] = [
      { ...general, id: "general" },
      ...otherSections.map((s, i) => ({ ...s, id: `sec-${i}` })),
    ];

    setEditSections(mapped);
    setImageFiles([]);
    setDocumentFiles([]);
    setKeptImages(selectedProduct.images);
    setKeptDocuments(selectedProduct.documents);
    setOpenSections(new Set(mapped.map(s => s.id)));
    setIsEditing(true);
    setSaveAlert(null);
  };

  const addSection = () => {
    const newSec: Section = { id: `sec-${Date.now()}`, title: "", questions: [] };
    setEditSections(prev => [...prev, newSec]);
    setOpenSections(prev => new Set(prev).add(newSec.id));
  };

  const removeSection = (id: string) => {
    if (id === "general") return;
    setEditSections(prev => prev.filter(s => s.id !== id));
    setOpenSections(prev => { const n = new Set(prev); n.delete(id); return n; });
  };

  const updateSectionTitle = (id: string, title: string) => {
    setEditSections(prev => prev.map(s => s.id === id ? { ...s, title } : s));
  };

  const addQuestion = (secId: string) => {
    const newQ: Question = { label: "", value: "" };
    setEditSections(prev => prev.map(s => s.id === secId ? { ...s, questions: [...s.questions, newQ] } : s));
  };

  const updateQuestion = (secId: string, qIdx: number, field: "label" | "value", value: string) => {
    setEditSections(prev => prev.map(s =>
      s.id === secId
        ? { ...s, questions: s.questions.map((q, i) => i === qIdx ? { ...q, [field]: value } : q) }
        : s
    ));
  };

  const updateSupplier = (secId: string, qIdx: number, supplierId: string) => {
    setEditSections(prev => prev.map(s =>
      s.id === secId
        ? {
            ...s,
            questions: s.questions.map((q, i) =>
              i === qIdx
                ? supplierId === "none"
                  ? { label: q.label, value: q.value || "" }
                  : { label: q.label, supplierId }
                : q
            ),
          }
        : s
    ));
  };

  const removeQuestion = (secId: string, qIdx: number) => {
    setEditSections(prev => prev.map(s =>
      s.id === secId
        ? { ...s, questions: s.questions.filter((_, i) => i !== qIdx) }
        : s
    ));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const valid = Array.from(files).filter(f => f.size <= 10 * 1024 * 1024);
    const currentTotal = keptImages.length + imageFiles.length;
    const limit = 5;
    const toAdd = valid.slice(0, limit - currentTotal);

    if (valid.length > toAdd.length) {
      toast({ description: `Faqat ${limit} ta rasm yuklash mumkin`, variant: "destructive" });
    }

    setImageFiles(prev => [...prev, ...toAdd]);
  };

  const removeKeptImage = (url: string) => {
    setKeptImages(prev => prev.filter(img => img !== url));
  };

  const removeNewImage = (i: number) => {
    setImageFiles(prev => prev.filter((_, idx) => idx !== i));
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const valid = Array.from(files).filter(f => f.size <= 10 * 1024 * 1024);
    setDocumentFiles(prev => [...prev, ...valid]);
  };

  const removeKeptDocument = (url: string) => {
    setKeptDocuments(prev => prev.filter(doc => doc !== url));
  };

  const removeNewDocument = (i: number) => {
    setDocumentFiles(prev => prev.filter((_, idx) => idx !== i));
  };

  // SAQLASH
  const handleSave = async () => {
    if (!selectedProduct) return;

    setSaveAlert(null);

    const hasEmptyTitle = editSections.some(s => s.title.trim() === "" && s.questions.length > 0);
    const hasEmptyLabel = editSections.some(s => s.questions.some(q => q.label.trim() === ""));
    const hasEmptyValue = editSections.some(s => s.questions.some(q => !q.supplierId && !q.value?.trim()));

    if (hasEmptyTitle || hasEmptyLabel || hasEmptyValue) {
      setSaveAlert({
        type: "error",
        message: hasEmptyTitle
          ? "Bo‘lim nomi to‘ldirilishi shart!"
          : hasEmptyLabel
          ? "Savol nomi to‘ldirilishi shart!"
          : "Qiymat bo‘sh bo‘lmasin!",
      });
      return;
    }

  
    const cleanSections = editSections
  .map(s => ({
    title: s.title,
    questions: s.questions
      .filter(q => q.label.trim() !== "")
      .map(q => {
        if (q.supplierId) {
          
          return {
            label: q.label,
            supplierId: q.supplierId,
            value: q.value || "", 
          };
        } else {
         
          return {
            label: q.label,
            value: q.value || "",
          };
        }
      }),
  }))
  .filter(s => s.title.trim() && s.questions.length > 0);

    const formData = new FormData();
    formData.append("name", selectedProduct.name);
    formData.append("category", String(selectedProduct.category.id));
    formData.append("sections", JSON.stringify(cleanSections));

    // YANGI RASMLAR
    imageFiles.forEach(f => formData.append("images", f));

    // ESKI RASMLARNI PROXY ORQALI
    for (const url of keptImages) {
      try {
        const proxyUrl = `/api/proxy?url=${encodeURIComponent(url)}`;
        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error("Failed");

        const blob = await response.blob();
        const filename = url.split('/').pop() || `image-${Date.now()}`;
        const file = new File([blob], filename, { type: blob.type });
        formData.append("images", file);
      } catch (err) {
        console.error("Rasm yuklanmadi:", url);
        toast({ description: `Rasm yuklanmadi: ${url.split('/').pop()}`, variant: "destructive" });
      }
    }

    // YANGI HUJJATLAR
    documentFiles.forEach(f => formData.append("documents", f));

    // ESKI HUJJATLARNI PROXY ORQALI
    for (const url of keptDocuments) {
      try {
        const proxyUrl = `/api/proxy?url=${encodeURIComponent(url)}`;
        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error("Failed");

        const blob = await response.blob();
        const filename = url.split('/').pop() || `doc-${Date.now()}`;
        const file = new File([blob], filename, { type: blob.type });
        formData.append("documents", file);
      } catch (err) {
        console.error("Hujjat yuklanmadi:", url);
        toast({ description: `Hujjat yuklanmadi: ${url.split('/').pop()}`, variant: "destructive" });
      }
    }

    try {
      await updateProduct(selectedProduct.id, formData);
      await fetchProducts();
      setIsEditing(false);
      setSaveAlert({ type: "success", message: "Mahsulot muvaffaqiyatli yangilandi!" });

      const updated = products.find(p => p.id === selectedProduct.id);
      if (updated) setSelectedProduct(updated);
    } catch (error) {
      setSaveAlert({ type: "error", message: "Saqlashda xato yuz berdi!" });
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteProduct(id);
      await fetchProducts();
      if (selectedProduct?.id === id) setSelectedProduct(null);
      toast({ description: "Mahsulot o‘chirildi" });
    } catch (error) {
      toast({ description: "O‘chirishda xato", variant: "destructive" });
    } finally {
      setDeletingId(null);
    }
  };

  // 📱 SEARCH INPUT DAN KEYIN (taxminan 250-qator)
const filteredProducts = useMemo(() => {
  if (!searchTerm.trim()) return products;
  
  const term = searchTerm.toLowerCase().trim();
  return products.filter(product => {
    // 1️⃣ Mahsulot nomi
    if (product?.name?.toLowerCase().includes(term)) return true;
    
    // 2️⃣ Kategoriya
    if (product?.category?.name.toLowerCase().includes(term)) return true;
    
    // 3️⃣ BARCHA MAHULOT MA'LUMOTLARI
    for (const section of product.sections) {
      if (section?.title.toLowerCase().includes(term)) return true;
      
      for (const question of section.questions) {
        if (question?.label?.toLowerCase().includes(term)) return true;
        if (question?.value?.toLowerCase().includes(term)) return true;
        
        // 4️⃣ SUPPLIER NOMLARI
        const supplier = partners.find(p => p.id === question.supplierId);
        if (supplier?.name?.toLowerCase().includes(term)) return true;
      }
    }
    
    return false;
  });
}, [products, searchTerm, partners]);

  const fetchDetails = async (product: Product) => {
    try {
      const full = await getProductById(product.id);
      setSelectedProduct(full);
    } catch (error) {
      setSelectedProduct(product);
    }
  };
const downloadQR = async () => {
  if (!selectedQrProduct?.qr_code) return;

  const productName = selectedQrProduct.sections[0]?.questions[0]?.value?.trim() || "mahsulot";
  const safeFileName = productName
    .replace(/[^a-zA-Z0-9а-яА-ЯёЁўЎқҚғҒҳҲ ]/g, "")
    .replace(/\s+/g, "_")
    .trim()
    .substring(0, 50);
  const fileName = safeFileName ? `${safeFileName}.png` : `${selectedQrProduct.id}.png`;

  try {
    const response = await fetch(`/api/proxy?url=${encodeURIComponent(selectedQrProduct.qr_code)}`);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    toast({ description: "QR yuklanmadi", variant: "destructive" });
  }
};
  return (
    <div className="flex min-h-screen">
      <main className="flex-1 md:p-8 p-4">
        <div className="container mx-auto space-y-6 max-w-5xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold">Mahsulotlar</h1>
              <p className="text-gray-600 mt-2">Barcha mahsulotlarni boshqaring</p>
            </div>
            <Button asChild>
              <Link href="/employer/products/add">
                <Plus className="mr-2 h-4 w-4" /> Yangi mahsulot
              </Link>
            </Button>
          </div>

          <Input placeholder="Qidirish..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="max-w-sm" />

          <Card className="p-6 bg-gradient-to-br from-white to-blue-50/80">
            <div className="space-y-4 overflow-y-scroll max-h-[70vh]">
              {loadingProducts ? (
                <p className="text-center py-6">Yuklanmoqda...</p>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map(product => {
                  const currentIdx = carouselIndex[product.id] || 0;
                  const displayImg = product.images[currentIdx];

                  return (
                    <Dialog key={product.id} onOpenChange={open => {
                      if (!open) {
                        setIsEditing(false);
                        setSelectedProduct(null);
                        setEditSections([]);
                        setImageFiles([]);
                        setDocumentFiles([]);
                        setKeptImages([]);
                        setKeptDocuments([]);
                        setOpenSections(new Set());
                        setLightboxOpen(false);
                        setSaveAlert(null);
                      } else {
                        setSelectedProduct(product);
                        fetchDetails(product);
                      }
                    }}>
                      <DialogTrigger asChild>
                        {/* <div className="flex items-center justify-between p-4 rounded-lg bg-white/50 border border-blue-200/50 hover:bg-blue-50/80 cursor-pointer">
                          <div className="flex items-center gap-4 flex-1">
                            <div className="w-12 h-12 bg-blue-100/50 rounded-lg flex items-center justify-center overflow-hidden">
                              {displayImg ? <img src={displayImg} alt="" className="w-full h-full object-cover" /> : <Package className="h-6 w-6" />}
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{product.name}</h3>
                              <p className="text-sm text-gray-600">{product.sections[0]?.questions[0]?.value || "Ma'lumot yo'q"}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              {product.status === "active" && (
                                <div className="flex items-center gap-1">
                                  <div className="flex items-center gap-1">
                                    {Array.from({ length: 5 }, (_, i) => {
                                      const starValue = i + 1;
                                      if (product.rating >= starValue) return <Star key={i} className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />;
                                      if (product.rating >= starValue - 0.5) return <StarHalf key={i} className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />;
                                      return <StarOff key={i} className="h-3.5 w-3.5 text-gray-300" />;
                                    })}
                                  </div>
                                  <p className="text-sm font-medium flex items-center gap-[2px]">
                                    <ScanEyeIcon className="h-3 w-3" /> {product.all_scan}
                                  </p>
                                </div>
                              )}
                            </div>
                            <Badge variant={getStatusVariant(product.status)}>{getStatusText(product.status)}</Badge>
                            {product.status === "draft" && (
                              <div onClick={e => e.stopPropagation()}>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="destructive" size="sm" disabled={deletingId === product.id}>
                                      {deletingId === product.id ? "O‘chirilmoqda..." : <Trash2 className="h-4 w-4" />}
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>O‘chirish</AlertDialogTitle>
                                      <AlertDialogDescription>"{product.name}" ni o‘chirishni xohlaysizmi?</AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleDelete(product.id)}>Ha</AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            )}
                          </div>
                        </div> */}
                        <div className="flex items-center justify-between p-4 rounded-lg bg-white/50 border border-blue-200/50 hover:bg-blue-50/80 cursor-pointer">
  <div className="flex items-center gap-4 flex-1">
    <div className="w-12 h-12 bg-blue-100/50 rounded-lg flex items-center justify-center overflow-hidden">
      {displayImg ? (
        <img src={displayImg} alt="" className="w-full h-full object-cover" />
      ) : (
        <Package className="h-6 w-6" />
      )}
    </div>
    <div>
      <h3 className="font-semibold text-lg">
        {product.sections[0]?.questions[0]?.value || product.name}
      </h3>
      <p className="text-sm text-gray-600">{product.category.name}</p>
      <p className="text-xs text-gray-500">
        {format(new Date(product.created_at), "dd.MM.yyyy HH:mm")}
        {product.activated_at && ` | ${format(new Date(product.activated_at), "HH:mm")}`}
      </p>
    </div>
  </div>

  <div className="flex items-center gap-4">
    {/* REYTING + SKAN + QR */}
    {product.status === "active" && (
      <>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }, (_, i) => {
            const starValue = i + 1;
            if (product.rating >= starValue)
              return <Star key={i} className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />;
            if (product.rating >= starValue - 0.5)
              return <StarHalf key={i} className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />;
            return <StarOff key={i} className="h-3.5 w-3.5 text-gray-300" />;
          })}
        </div>
        <p className="text-sm font-medium flex items-center gap-[2px]">
          <ScanEyeIcon className="h-3 w-3" /> {product.all_scan}
        </p>
      </>
    )}

    <Badge variant={getStatusVariant(product.status)}>
      {getStatusText(product.status)}
    </Badge>

    {/* QR IKONKA */}
    {product.status === "active" && product.qr_code && (
      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          setSelectedQrProduct(product);
          setQrModalOpen(true);
        }}
      >
        <QrCode className="h-4 w-4 text-blue-600" />
      </Button>
    )}

    {/* O‘CHIRISH (faqat draft) */}
    {product.status === "draft" && (
      <div onClick={e => e.stopPropagation()}>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm" disabled={deletingId === product.id}>
              {deletingId === product.id ? "..." : <Trash2 className="h-4 w-4" />}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>O‘chirish</AlertDialogTitle>
              <AlertDialogDescription>
                "{product.sections[0]?.questions[0]?.value || product.name}" ni o‘chirishni xohlaysizmi?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Bekor</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDelete(product.id)}>Ha</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    )}
  </div>
</div>
                      </DialogTrigger>
                      <DialogContent className="max-w-[90vw] md:max-w-6xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-2xl">
                            {selectedProduct?.sections[0]?.questions[0]?.value || selectedProduct?.name || "Noma'lum"}
                          </DialogTitle>
                        </DialogHeader>

                        {/* SAQLASH ALERTI */}
                        {saveAlert && (
                          <Alert className={`mb-6 border-${saveAlert.type === "success" ? "green" : "red"}-200 bg-${saveAlert.type === "success" ? "green" : "red"}-50`}>
                            {saveAlert.type === "success" ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                              <AlertCircle className="h-5 w-5 text-red-600" />
                            )}
                            <AlertDescription className={saveAlert.type === "success" ? "text-green-700" : "text-red-700"}>
                              {saveAlert.message}
                            </AlertDescription>
                          </Alert>
                        )}

                        <div className="space-y-6 mt-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm bg-blue-50/50 p-4 rounded-lg border">
                            <div><strong>Kategoriya:</strong> {selectedProduct?.category.name}</div>
                            <div><strong>Status:</strong> {getStatusText(selectedProduct?.status || "draft")}</div>
                            <div><strong>Yaratilgan:</strong> {selectedProduct && format(new Date(selectedProduct.created_at), "dd.MM.yyyy HH:mm")}</div>
                          </div>

                          {isEditing ? (
                            <div className="space-y-6">
                              {/* RASMLAR */}
                              <div>
                                <Label>Rasmlar ({keptImages.length + imageFiles.length}/5)</Label>
                                <input type="file" accept="image/*" multiple ref={imageInputRef} onChange={handleImageChange} className="hidden" />
                                <div className="flex flex-wrap gap-4 mt-2">
                                  {keptImages.map((img, i) => (
                                    <div key={i} className="relative">
                                      <img src={img} alt="" className="w-24 h-24 object-cover rounded-md border" />
                                      <Button variant="destructive" size="sm" className="absolute -top-2 -right-2 h-6 w-6 p-0" onClick={() => removeKeptImage(img)}>
                                        <X className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  ))}
                                  {imageFiles.map((f, i) => (
                                    <div key={i} className="relative">
                                      <img src={URL.createObjectURL(f)} alt="" className="w-24 h-24 object-cover rounded-md border" />
                                      <Button variant="destructive" size="sm" className="absolute -top-2 -right-2 h-6 w-6 p-0" onClick={() => removeNewImage(i)}>
                                        <X className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  ))}
                                  {(keptImages.length + imageFiles.length) < 5 && (
                                    <div className="w-24 h-24 border-2 border-dashed border-blue-300 rounded-lg flex items-center justify-center cursor-pointer" onClick={() => imageInputRef.current?.click()}>
                                      <Plus className="h-6 w-6 text-blue-500" />
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* HUJJATLAR */}
                              <div>
                                <Label>Hujjatlar</Label>
                                <input type="file" accept=".pdf,.doc,.docx,image/*" multiple ref={documentInputRef} onChange={handleDocumentChange} className="hidden" />
                                <div className="flex flex-wrap gap-3 mt-2">
                                  {keptDocuments.map((doc, i) => (
                                    <div key={i} className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md">
                                      <span className="text-sm truncate max-w-[200px]">{doc.split('/').pop()}</span>
                                      <Button size="icon" variant="ghost" onClick={() => removeKeptDocument(doc)}><Trash2 className="h-3 w-3" /></Button>
                                    </div>
                                  ))}
                                  {documentFiles.map((f, i) => (
                                    <div key={i} className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md">
                                      <span className="text-sm truncate max-w-[200px]">{f.name}</span>
                                      <Button size="icon" variant="ghost" onClick={() => removeNewDocument(i)}><Trash2 className="h-3 w-3" /></Button>
                                    </div>
                                  ))}
                                  <div className="w-24 h-24 border-2 border-dashed border-blue-300 rounded-lg flex items-center justify-center cursor-pointer" onClick={() => documentInputRef.current?.click()}>
                                    <Plus className="h-6 w-6 text-blue-500" />
                                  </div>
                                </div>
                              </div>

                              {/* BO‘LIMLAR */}
                              <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                  <h3 className="text-xl font-medium">Bo‘limlar</h3>
                                  <Button onClick={addSection} size="sm"><Plus className="h-4 w-4 mr-1" /> Bo‘lim</Button>
                                </div>
                                {editSections.map(sec => (
                                  <Card key={sec.id} className="border-blue-100">
                                    <CardHeader className="flex items-center justify-between p-4 bg-primary text-white cursor-pointer rounded-t-lg" onClick={() => {
                                      const n = new Set(openSections);
                                      n.has(sec.id) ? n.delete(sec.id) : n.add(sec.id);
                                      setOpenSections(n);
                                    }}>
                                      <Input value={sec.title} onChange={e => updateSectionTitle(sec.id, e.target.value)} onClick={e => e.stopPropagation()} placeholder="Bo‘lim nomi" className="text-lg font-medium bg-transparent border-0" disabled={sec.id === "general"} />
                                      <div className="flex items-center gap-2">
                                        {sec.id !== "general" && <Button size="icon" variant="ghost" onClick={e => { e.stopPropagation(); removeSection(sec.id); }}><Trash2 className="h-4 w-4" /></Button>}
                                        <ChevronDown className={`h-5 w-5 transition-transform ${openSections.has(sec.id) ? "rotate-180" : ""}`} />
                                      </div>
                                    </CardHeader>
                                    {openSections.has(sec.id) && (
                                      <CardContent className="p-4 space-y-4">
                                        <Button size="sm" onClick={() => addQuestion(sec.id)}><Plus className="h-4 w-4 mr-1" /> Maydon</Button>
                                        {sec.questions.map((q, i) => (
                                          <div key={i} className="flex gap-3 items-end">
                                            <div className="flex-1">
                                              <Label>Nomi</Label>
                                              <Input value={q.label} onChange={e => updateQuestion(sec.id, i, "label", e.target.value)} placeholder="Nom" />
                                            </div>
                                        
<div className="flex-1 relative">
  <Label>Qiymati</Label>
  {q.supplierId ? (
    <div className="relative">
      <Input
        value={q.value || ""}
        placeholder={`${partners.find(p => p.id === q.supplierId)?.name || "Ta’minotchi"} tomonidan to‘ldiriladi`}
        className="pr-16 bg-gray-50 border-blue-200"
        readOnly // HECH QACHON TAHRIRLANMAYDI
        disabled // Qo‘shimcha: cursor ko‘rsatmaydi
      />
      {q.value ? (
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 text-green-600 text-xs font-medium">
          <CheckCircle className="h-4 w-4" />
          <span className="hidden sm:inline">
            {partners.find(p => p.id === q.supplierId)?.name}
          </span>
        </div>
      ) : (
        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-orange-500">
          <Clock className="h-4 w-4" />
        </div>
      )}
    </div>
  ) : (
    <Input
      value={q.value || ""}
      onChange={(e) => updateQuestion(sec.id, i, "value", e.target.value)}
      placeholder="Qiymat"
    />
  )}
</div>
                                            <div className="flex items-center gap-2">
                                              {sec.id !== "general" && !q.supplierId && (
                                                <Select onValueChange={(val) => updateSupplier(sec.id, i, val)}>
                                                  <SelectTrigger className="w-48">
                                                    <SelectValue placeholder="Ta’minotchi" />
                                                  </SelectTrigger>
                                                  <SelectContent>
                                                    <SelectItem value="none">Yo‘q</SelectItem>
                                                    {partners.map(p => (
                                                      <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                                                    ))}
                                                  </SelectContent>
                                                </Select>
                                              )}
                                              <Button size="icon" variant="ghost" onClick={() => removeQuestion(sec.id, i)}>
                                                <Trash2 className="h-4 w-4" />
                                              </Button>
                                            </div>
                                          </div>
                                        ))}
                                      </CardContent>
                                    )}
                                  </Card>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-6">
                              <div>
                                <Label>Rasmlar</Label>
                                <div className="flex flex-wrap gap-4 mt-2">
                                  {selectedProduct?.images.map((img, i) => (
                                    <img key={i} src={img} alt="" className="w-24 h-24 object-cover rounded-md border cursor-pointer" onClick={() => { setLightboxIndex(i); setLightboxOpen(true); }} />
                                  ))}
                                </div>
                              </div>

                              <div>
                                <Label>Hujjatlar</Label>
                                <div className="flex flex-wrap gap-3 mt-2">
                                  {selectedProduct?.documents.map((doc, i) => (
                                    <a key={i} href={doc} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">{doc.split('/').pop()}</a>
                                  ))}
                                </div>
                              </div>

                              {selectedProduct?.sections.map((sec, sIdx) => (
                                <Card key={sIdx}>
                                  <CardHeader className="p-4 bg-blue-100/50 rounded-t-lg">
                                    <h4 className="text-lg font-medium">{sec.title}</h4>
                                  </CardHeader>
                                  <CardContent className="p-4 space-y-3">
                                    {sec.questions.map((q, qIdx) => (
                                      <div key={qIdx} className="bg-white/50 p-3 rounded-md border border-blue-100">
                                        <Label className="text-sm font-medium">{q.label}</Label>
                                       
                                        <p className="text-sm pl-3 border-l-2 border-blue-200 flex items-center justify-between">
  <span>
    {q.value ? (
      <span className="font-medium">{q.value}</span>
    ) : (
      <span className="text-orange-600 flex items-center gap-1">
        <Clock className="h-3 w-3" />
        {partners.find(p => p.id === q.supplierId)?.name || "Ta’minotchi"} tomonidan to‘ldiriladi
      </span>
    )}
  </span>

  {/* Agar supplierId va value bor bo'lsa — galochka + ism */}
  {q.supplierId && q.value && (
    <span className="text-green-600 flex items-center gap-1 text-xs font-medium">
      <CheckCircle className="h-3 w-3" />
      <span className="hidden sm:inline">
        {partners.find(p => p.id === q.supplierId)?.name}
      </span>
    </span>
  )}
</p>
                                      </div>
                                    ))}
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          )}
                        </div>

                        <DialogFooter className="flex flex-col sm:flex-row gap-3 justify-end mt-6">
                          {isEditing ? (
                            <>
                              <Button variant="outline" onClick={() => setIsEditing(false)}>Bekor</Button>
                              <Button onClick={handleSave}>Saqlash</Button>
                            </>
                          ) : selectedProduct?.status === "draft" ? (
                            <>
                              <Button variant="outline" onClick={startEditing}>Tahrirlash</Button>
                              <Button onClick={() => handleStatusChange(selectedProduct.id, "pending")}>Tasdiqlashga yuborish</Button>
                            </>
                          ) : selectedProduct?.status === "pending" ? (
                            <Badge variant="outline">Admin tasdiqlashi kutilmoqda</Badge>
                          ) : selectedProduct?.status === "active" ? (
                            <Badge variant="default">Faol</Badge>
                          ) : null}
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  );
                })
              ) : (
                <p className="text-center py-6">Mahsulotlar topilmadi.</p>
              )}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}