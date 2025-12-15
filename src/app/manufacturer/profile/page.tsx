"use client";

import { useState, useEffect } from "react";

import { getProfile, ProfileData } from "@/lib/api";
import Cookies from "js-cookie";
import { Button } from "@/src/components/ui/button";
import { Edit2, Save, X } from "lucide-react";
import { Alert, AlertDescription } from "@/src/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { ProfileForm } from "@/src/components/manufacturer/dashboard/profile/ProfileForm";

const typeDisplayMap: Record<string, string> = {
  own: "Xususiy",
  state: "Davlat",
};

export default function ManufacturerProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getProfile();
        setProfile(data);

        if (data.id) {
          Cookies.set("myid", data.id);
        }
      } catch (err) {
        setError("Profil ma'lumotlarini yuklashda xatolik yuz berdi");
        console.error("getProfile xatosi:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async (formData: FormData) => {
    setSaveLoading(true);
    setError(null);

    try {
      const token = Cookies.get("token");
      if (!token) throw new Error("Kirish tokeni topilmadi");

      const response = await fetch(
        "https://api.ekoiz.uz/api/v1/accounts/organization/",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Xato: ${response.status}`);
      }

      const updatedProfile = await response.json();
      setProfile(updatedProfile);
      setIsEditing(false);

      setCopySuccess("Ma'lumotlar muvaffaqiyatli saqlandi!");
      setTimeout(() => setCopySuccess(null), 3000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Noma'lum xato";
      setError(`Saqlashda xato: ${errorMessage}`);
      console.error("Saqlash xatosi:", err);
    } finally {
      setSaveLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-muted-foreground">Yuklanmoqda...</p>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-muted-foreground">Ma'lumotlar topilmadi</p>
      </div>
    );
  }

  const displayProfile: ProfileData = {
    ...profile,
    type: typeDisplayMap[profile.type] ?? profile.type,
  };

  return (
    <div className="bg-gradient-to-b from-background to-background/90 min-h-screen">
      <main className="container mx-auto p-6 md:p-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-semibold text-balance tracking-tight">
              Profil
            </h1>
            <p className="text-muted-foreground mt-2 text-base">
              Tashkilot ma'lumotlarini ko‘ring va tahrirlang
            </p>
          </div>

          <div className="flex gap-3">
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                className="shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Edit2 className="mr-2 h-4 w-4" />
                Tahrirlash
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  className="border-primary/30 hover:border-primary/50"
                >
                  <X className="mr-2 h-4 w-4" />
                  Bekor qilish
                </Button>
                <Button
                  onClick={() => {
                    const form = document.querySelector("form");
                    form?.requestSubmit();
                  }}
                  disabled={saveLoading}
                  className="shadow-sm hover:shadow-md"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {saveLoading ? "Saqlanmoqda..." : "Saqlash"}
                </Button>
              </>
            )}
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {copySuccess && (
          <Alert
            variant="default"
            className="mb-6 bg-green-100 text-green-800 border-green-300"
          >
            <AlertDescription>{copySuccess}</AlertDescription>
          </Alert>
        )}

        <ProfileForm
          initialData={displayProfile as ProfileData}
          isEditing={isEditing}
          onSave={handleSave}
          isLoading={saveLoading}
          error={null}
          copySuccess={null}
        />
      </main>
    </div>
  );
}
