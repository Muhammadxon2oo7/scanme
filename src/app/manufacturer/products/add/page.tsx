"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Sidebar } from "@/src/components/manufacturer/Sidebar"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardHeader } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Menu, CheckCircle, Upload, ChevronDown } from "lucide-react"
import { categories } from "@/lib/categories"
import { getPartners } from "@/lib/api" // api.ts faylidan import qilish
import Cookies from "js-cookie" // js-cookie kutubxonasini o'rnatish kerak: npm install js-cookie

export default function AddProductPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());
  const [suppliers, setSuppliers] = useState<Record<string, string>>({});
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [partners, setPartners] = useState<any[]>([]); // API dan kelgan partnerlar
  const [loadingPartners, setLoadingPartners] = useState(true); // Yuklanish holati
  const [errorPartners, setErrorPartners] = useState<string | null>(null); // Xato holati

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoadingPartners(true);
        const data = await getPartners();
        const myId = Cookies.get('myid'); // Cookie dan myid olish
        if (myId) {
          // Filter: owner.id yoki partner.id myId ga teng bo'lmaganlar (o'zini chiqarib tashlash)
          const filteredPartners = data.filter((item: any) => 
            (item.owner.id !== myId && item.partner.id !== myId) ||
            (item.owner.id === myId && item.partner.id !== myId) ||
            (item.partner.id === myId && item.owner.id !== myId)
          );
          // Ta'minotchi nomi: agar myId owner ga teng bo'lsa partner.name, aks holda owner.name
          const mappedPartners = filteredPartners.map((item: any) => ({
            id: item.partner.id !== myId ? item.partner.id : item.owner.id,
            name: item.owner.id === myId ? item.partner.name : item.owner.name
          }));
          setPartners(mappedPartners);
        } else {
          setPartners([]);
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
    if (files && files.length > 0 && images.length < 4) {
      const newImages: string[] = [];
      Array.from(files).slice(0, 4 - images.length).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            newImages.push(reader.result);
            if (newImages.length === files.length || images.length + newImages.length === 4) {
              setImages((prev) => [...prev, ...newImages]);
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!selectedCategory) return;

    const categoryName = categories[selectedCategory].name;
    const productName = formData["1.1.1"] || formData["2.1.1"] || formData["3.1.1"] || formData["4.1.1"] || formData["5.1.1"] || formData["6.1.1"] || formData["7.1.1"] || formData["8.1.1"] || formData["9.1.1"] || "Noma'lum mahsulot";

    const newProduct = {
      id: Date.now().toString(),
      name: productName,
      category: categoryName,
      categoryKey: selectedCategory,
      scans: 0,
      rating: 0,
      status: "in-progress" as const,
      details: { ...formData },
      suppliers: { ...suppliers },
      images: images.length > 0 ? images : ["/default-avatar.png"],
    };

    const existingProducts = JSON.parse(localStorage.getItem("manufacturerProducts") || "[]");
    existingProducts.push(newProduct);
    localStorage.setItem("manufacturerProducts", JSON.stringify(existingProducts));

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({});
      setSuppliers({});
      setImages([]);
      setSelectedCategory(null);
      setOpenSections(new Set());
      if (fileInputRef.current) fileInputRef.current.value = "";
    }, 3000);
  };

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) newSet.delete(sectionId);
      else newSet.add(sectionId);
      return newSet;
    });
  };

  const handleSupplierChange = (questionId: string, value: string) => {
    setSuppliers((prev) => ({ ...prev, [questionId]: value }));
  };

  const isSupplierSection = (sectionId: string) => {
    return !["1.1", "1.2", "2.1", "2.2", "3.1", "3.2", "4.1", "4.2", "5.1", "5.2", "6.1", "6.2", "7.1", "7.2", "8.1", "8.2", "9.1", "9.2"].includes(sectionId);
  };

  return (
    <div className="bg-gradient-to-br  flex min-h-screen  overflow-y-scroll max-h-[90vh]">
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
                    setImages([]);
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
                      {images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image}
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
                                      disabled={!!suppliers[question.id]} // Har qanday tanlangan ta'minotchi uchun disable (o'zim opsiyasi yo'q)
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
                                      disabled={loadingPartners} // Yuklanayotganda disable
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