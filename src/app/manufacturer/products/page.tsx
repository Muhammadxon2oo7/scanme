"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Cookies from "js-cookie"
import { Sidebar } from "@/src/components/manufacturer/Sidebar"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardHeader } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Input } from "@/src/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/src/components/ui/dialog"
import { Label } from "@/src/components/ui/label"
import { Clock, Check, Package, Plus, Star, Menu, ChevronDown, Edit3, Save, X, CheckCircle, RotateCcw } from "lucide-react"
import { categories } from "@/lib/categories"
import { getPartners } from "@/lib/api" // api.ts faylidan import

interface Product {
  id: string;
  name: string;
  category: string;
  categoryKey: string;
  scans: number;
  rating: number;
  status: "active" | "in-progress" | "pending";
  details?: Record<string, string>;
  suppliers?: Record<string, string>;
  images?: string[];
}

interface PartnerInfo {
  id: string;
  name: string;
}

const getStatusText = (status: Product["status"]) => {
  switch (status) {
    case "active": return "Faol";
    case "in-progress": return "To'ldirilmoqda";
    case "pending": return "Tasdiqlanishi kutilmoqda";
    default: return "Noma'lum";
  }
};

const getStatusVariant = (status: Product["status"]) => {
  switch (status) {
    case "active": return "default";
    case "in-progress": return "outline";
    case "pending": return "secondary";
    default: return "secondary";
  }
};

export default function ManufacturerProductsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState<Record<string, string>>({});
  const [editImages, setEditImages] = useState<string[]>([]);
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());
  const [isStaff, setIsStaff] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [partnersMap, setPartnersMap] = useState<Record<string, string>>({}); // id -> name
  const [loadingPartners, setLoadingPartners] = useState(true);

  useEffect(() => {
    const staffStatus = Cookies.get("is_staff");
    setIsStaff(staffStatus === "true");

    const savedProducts = JSON.parse(localStorage.getItem("manufacturerProducts") || "[]");
    setProducts(savedProducts);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoadingPartners(true);
        const data = await getPartners();
        const myId = Cookies.get('myid');
        const map: Record<string, string> = {};
        if (myId) {
          data.forEach((item: any) => {
            let partnerId, partnerName;
            if (item.owner.id === myId) {
              partnerId = item.partner.id;
              partnerName = item.partner.name;
            } else {
              partnerId = item.owner.id;
              partnerName = item.owner.name;
            }
            if (partnerId && partnerId !== myId) {
              map[partnerId] = partnerName;
            }
          });
        }
        setPartnersMap(map);
      } catch (error) {
        console.error('Ta\'minotchilarni yuklashda xato:', error);
      } finally {
        setLoadingPartners(false);
      }
    };

    fetchPartners();
  }, []);

  const handleStatusChange = (productId: string, newStatus: Product["status"]) => {
    const updatedProducts = products.map((p) =>
      p.id === productId ? { ...p, status: newStatus } : p
    );
    setProducts(updatedProducts);
    localStorage.setItem("manufacturerProducts", JSON.stringify(updatedProducts));
    setSelectedProduct(null);
  };

  const handleInputChange = (id: string, value: string) => {
    setEditFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && editImages.length < 4) {
      const newImages: string[] = [];
      Array.from(files).slice(0, 4 - editImages.length).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            newImages.push(reader.result);
            if (newImages.length === files.length || editImages.length + newImages.length === 4) {
              setEditImages((prev) => [...prev, ...newImages]);
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    setEditImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveEdit = () => {
    if (!selectedProduct) return;

    const productNameFields = [
      "1.1.1", "2.1.1", "3.1.1", "4.1.1", 
      "5.1.1", "6.1.1", "7.1.1", "8.1.1", "9.1.1"
    ];
    const newName = productNameFields.reduce((acc, field) => acc || editFormData[field], "") || selectedProduct.name;

    const updatedProduct = {
      ...selectedProduct,
      name: newName,
      details: { ...selectedProduct.details, ...editFormData },
      images: editImages.length > 0 ? editImages : selectedProduct.images || ["/default-avatar.png"],
    };

    const updatedProducts = products.map((p) =>
      p.id === selectedProduct.id ? updatedProduct : p
    );

    try {
      setProducts(updatedProducts);
      localStorage.setItem("manufacturerProducts", JSON.stringify(updatedProducts));
      setSelectedProduct(updatedProduct);
      setIsEditing(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Saqlashda xatolik yuz berdi:", error);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderSuppliersList = (suppliers: Record<string, string> | undefined) => {
    if (!suppliers || Object.keys(suppliers).length === 0) return null;

    return (
      <Card className="bg-gradient-to-br from-blue-50/80 to-white/90 border-blue-100 shadow-sm rounded-lg">
        <CardHeader className="p-4 bg-blue-100/50 rounded-t-lg">
          <h4 className="text-lg font-medium text-gray-800">Biriktirilgan Ta'minotchilar</h4>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          {Object.entries(suppliers).map(([questionId, supplierId]) => {
            const question = Object.values(categories[selectedProduct?.categoryKey || "1"].sections)
              .flatMap((section) => section.questions)
              .find((q) => q.id === questionId);
            const isCompleted = selectedProduct?.details?.[questionId];
            const supplierName = partnersMap[supplierId] || "Noma'lum ta'minotchi";
            return (
              <div key={questionId} className="flex justify-between items-center bg-white/50 p-3 rounded-md border border-blue-100">
                <div>
                  <p className="text-sm font-medium text-gray-700">{question?.label}</p>
                  <p className="text-xs text-gray-500">
                    {supplierName}
                  </p>
                </div>
                {isCompleted ? (
                  <Check className="h-5 w-5 text-green-600" />
                ) : (
                  <Clock className="h-5 w-5 text-yellow-600" />
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>
    );
  };

  const renderProductDetails = (product: Product, isViewOnly: boolean = false) => {
    if (!product.categoryKey || !categories[product.categoryKey]) return null;

    const category = categories[product.categoryKey];
    const currentDetails = isEditing ? editFormData : product.details || {};

    return (
      <div className="space-y-6">
        {(isEditing || (product.images && product.images[0] !== "/default-avatar.png")) && (
          <Card className="bg-gradient-to-br from-blue-50/80 to-white/90 border-blue-100 shadow-sm rounded-lg">
            <CardHeader className="p-4 bg-blue-100/50 rounded-t-lg">
              <h4 className="text-lg font-medium text-gray-800">Mahsulot Rasmlari</h4>
            </CardHeader>
            <CardContent className="p-4">
              {isEditing ? (
                <div className="space-y-3">
                  <Label htmlFor="images" className="text-gray-700 font-medium">
                    Rasmlar (maksimum 4 ta)
                  </Label>
                  <div className="flex flex-wrap gap-4">
                    <Input
                      id="images"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="border-blue-200 focus:ring-blue-400 transition-all duration-200 bg-white rounded-md"
                      ref={fileInputRef}
                    />
                    {editImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Mahsulot rasmi ${index + 1}`}
                          className="w-24 h-24 object-cover rounded-md border border-blue-200 transition-transform duration-200 group-hover:scale-105"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute -top-2 -right-2 h-6 w-6 p-0 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-4">
                  {product.images?.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Mahsulot rasmi ${index + 1}`}
                      className="w-24 h-24 object-cover rounded-md border border-blue-200 transition-transform duration-200 hover:scale-105"
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
        {Object.entries(category.sections).map(([sectionId, section]) => (
          <Card key={sectionId} className="bg-gradient-to-br from-blue-50/80 to-white/90 border-blue-100 shadow-sm rounded-lg">
            <CardHeader
              className={`flex items-center justify-between p-4 bg-blue-100/50 rounded-t-lg transition-colors duration-200 ${!isViewOnly ? 'cursor-pointer hover:bg-blue-200/50' : ''}`}
              onClick={() => !isViewOnly && toggleSection(sectionId)}
            >
              <h4 className="text-lg font-medium text-gray-800">{section.title}</h4>
              {!isViewOnly && (
                <ChevronDown
                  className={`h-5 w-5 text-gray-600 transition-transform duration-200 ${
                    openSections.has(sectionId) ? "rotate-180" : ""
                  }`}
                />
              )}
            </CardHeader>
            {(isViewOnly || openSections.has(sectionId)) && (
              <CardContent className="p-4 space-y-4 bg-white/90">
                {section.questions.map((question) => {
                  const value = currentDetails[question.id] || "";
                  const supplierId = product.suppliers?.[question.id];
                  const isSupplierSection = !["1.1", "1.2", "2.1", "2.2", "3.1", "3.2", "4.1", "4.2", "5.1", "5.2", "6.1", "6.2", "7.1", "7.2", "8.1", "8.2", "9.1", "9.2"].includes(sectionId);

                  if (isViewOnly) {
                    return (
                      <div key={question.id} className="space-y-2 bg-white/50 p-3 rounded-md border border-blue-100">
                        <div className="flex justify-between items-start">
                          <Label className="text-sm font-medium text-gray-700">{question.label}</Label>
                          {supplierId && (
                            <span className="text-xs text-gray-500 bg-blue-50 px-2 py-1 rounded-full">
                              {partnersMap[supplierId] || "Noma'lum"}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-900 pl-3 border-l-2 border-blue-200">{value || "Ma'lumot kiritilmagan"}</p>
                      </div>
                    );
                  }

                  return (
                    <div key={question.id} className="space-y-2">
                      <Label htmlFor={question.id} className="text-gray-700 font-medium">{question.label}</Label>
                      <Input
                        id={question.id}
                        value={currentDetails[question.id] || ""}
                        onChange={(e) => handleInputChange(question.id, e.target.value)}
                        placeholder={question.placeholder}
                        className="border-blue-200 focus:ring-blue-400 transition-all duration-200 p-2 text-base bg-white rounded-md"
                        disabled={!!(isSupplierSection && supplierId)}
                      />
                      {isSupplierSection && supplierId && (
                        <p className="text-xs text-gray-500 mt-1 bg-blue-50 px-2 py-1 rounded-full inline-block">
                          Bu maydon {partnersMap[supplierId] || "ta'minotchi"} tomonidan to'ldiriladi
                        </p>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            )}
          </Card>
        ))}
        {renderSuppliersList(product.suppliers)}
      </div>
    );
  };

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) newSet.delete(sectionId);
      else newSet.add(sectionId);
      return newSet;
    });
  };

  useEffect(() => {
    if (selectedProduct && isEditing) {
      setEditFormData(selectedProduct.details || {});
      setEditImages(selectedProduct.images || []);
      setOpenSections(new Set(Object.keys(categories[selectedProduct.categoryKey]?.sections || {})));
    }
  }, [selectedProduct, isEditing]);

  return (
    <div className=" flex min-h-screen">
      {/* <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} /> */}
      <main className="flex-1 md:p-8 p-4">
        <div className="container mx-auto space-y-6 max-w-5xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold text-balance tracking-tight text-gray-800">
                Mahsulotlar
              </h1>
              <p className="text-gray-600 mt-2 text-sm md:text-base">
                Barcha mahsulotlaringizni ko‘ring va boshqaring
              </p>
            </div>
            <div className="flex items-center gap-4">
              {!isStaff && (
                <Button
                  className=" text-white transition-all duration-200 shadow-md hover:shadow-lg rounded-md"
                  asChild
                >
                  <Link href="/manufacturer/products/add">
                    <Plus className="mr-2 h-4 w-4" />
                    Yangi mahsulot
                  </Link>
                </Button>
              )}
              {isMobile && (
                <Button
                  variant="ghost"
                  onClick={() => setIsSidebarOpen(true)}
                  className="text-gray-600 hover:bg-blue-100 rounded-md"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Input
              placeholder="Mahsulot yoki kategoriya bo‘yicha qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm border-blue-200 focus:ring-blue-400 transition-all duration-200 bg-white rounded-md"
            />
          </div>

          <Card className="p-6 bg-gradient-to-br from-white to-blue-50/80 backdrop-blur-md border border-blue-200/50 shadow-lg rounded-lg">
            <div className="space-y-4">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Dialog key={product.id} onOpenChange={(open) => {
                    if (!open) {
                      setIsEditing(false);
                      setSelectedProduct(null);
                    } else {
                      setSelectedProduct(product);
                    }
                  }}>
                    <DialogTrigger asChild>
                      <div className="flex items-center justify-between p-4 rounded-lg bg-white/50 border border-blue-200/50 hover:bg-blue-50/80 transition-all duration-200 hover:shadow-md cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-100/50 rounded-lg flex items-center justify-center">
                            <Package className="h-6 w-6 transition-transform duration-200 hover:scale-110" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800 text-lg">{product.name}</h3>
                            <p className="text-sm text-gray-600">{product.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-700">{product.scans} skan</p>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span className="text-sm text-gray-700">{product.rating}</span>
                            </div>
                          </div>
                          <Badge
                            variant={getStatusVariant(product.status)}
                            className="transition-all duration-200 px-3 py-1 rounded-full"
                          >
                            {getStatusText(product.status)}
                          </Badge>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-[90vw] md:max-w-6xl max-h-[90vh] overflow-y-auto bg-white/95 p-6 rounded-xl shadow-2xl border border-blue-200/50">
                      <DialogHeader className="flex flex-row items-center justify-between border-b border-blue-100 pb-4">
                        <DialogTitle className="text-2xl font-semibold text-gray-800">
                          {product.name} - Tafsilotlar
                        </DialogTitle>
                        
                      </DialogHeader>
                      <div className="space-y-6 mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                          <div>
                            <p><strong className="text-gray-700">Kategoriya:</strong> {product.category}</p>
                            <p><strong className="text-gray-700">Status:</strong> {getStatusText(product.status)}</p>
                          </div>
                          <div>
                            <p><strong className="text-gray-700">Skanlar soni:</strong> {product.scans}</p>
                            <p><strong className="text-gray-700">Reyting:</strong> {product.rating}</p>
                          </div>
                        </div>
                        {loadingPartners ? <p className="text-gray-500">Ta'minotchilar yuklanmoqda...</p> : renderProductDetails(product, isStaff || (!isEditing && product.status !== "in-progress"))}
                      </div>
                      <DialogFooter className="flex flex-col sm:flex-row gap-3 justify-end mt-6 border-t border-blue-100 pt-4">
                        {isStaff && product.status === "pending" ? (
                          <>
                            <Button
                              variant="outline"
                              onClick={() => handleStatusChange(product.id, "in-progress")}
                              className="border-blue-300 hover:bg-blue-100  transition-all duration-200 rounded-md"
                            >
                              <RotateCcw className="mr-2 h-4 w-4" />
                              Qaytarib yuborish
                            </Button>
                            <Button
                              onClick={() => handleStatusChange(product.id, "active")}
                              className="bg-green-600 hover:bg-green-700 text-white transition-all duration-200 shadow-md hover:shadow-lg rounded-md"
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Tasdiqlash
                            </Button>
                          </>
                        ) : (
                          !isStaff && (
                            <>
                              {isEditing ? (
                                <>
                                  <Button
                                    variant="outline"
                                    onClick={() => {
                                      setIsEditing(false);
                                      setEditFormData(selectedProduct?.details || {});
                                      setEditImages(selectedProduct?.images || []);
                                    }}
                                    className="border-blue-300 hover:bg-blue-100  transition-all duration-200 rounded-md"
                                  >
                                    Bekor qilish
                                  </Button>
                                  <Button
                                    onClick={handleSaveEdit}
                                    className=" hover:bg-blue-700 text-white transition-all duration-200 shadow-md hover:shadow-lg rounded-md"
                                  >
                                    <Save className="mr-2 h-4 w-4" />
                                    Saqlash
                                  </Button>
                                </>
                              ) : (
                                <>
                                  {product.status === "in-progress" && (
                                    <>
                                      <Button
                                        variant="outline"
                                        onClick={() => setIsEditing(true)}
                                        className="border-blue-300 hover:bg-blue-100  transition-all duration-200 rounded-md"
                                      >
                                        <Edit3 className="mr-2 h-4 w-4" />
                                        Tahrirlash
                                      </Button>
                                      <Button
                                        onClick={() => handleStatusChange(product.id, "pending")}
                                        className="  text-white transition-all duration-200 shadow-md hover:shadow-lg rounded-md"
                                      >
                                        Tasdiqlash uchun yuborish
                                      </Button>
                                    </>
                                  )}
                                </>
                              )}
                            </>
                          )
                        )}
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                ))
              ) : (
                <p className="text-center text-gray-600 py-6">Mahsulotlar topilmadi.</p>
              )}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}