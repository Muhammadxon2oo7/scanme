import Cookies from 'js-cookie'

export interface ManufacturerLoginData {
  password: string;
  name: string;
  description: string;
  stir: string;
  ceo: string;
  bank_number: string;
  mfo: string;
  email: string;
  phone: string;
  ifut: string;
  region: string;
  district: string;
  address: string;
}

export interface AuthResponse {
  message?: string;
  organization?: {
    id: string;
    name: string;
    description: string;
    type: string;
    stir: string;
    ceo: string;
    bank_number: string;
    mfo: string;
    email: string;
    phone: string;
    ifut: string;
    region: string;
    district: string;
    address: string;
    created_at: string;
    updated_at: string;
  };
  tokens?: {
    access: string;
    refresh: string;
  };
  [key: string]: any;
}

export interface EmployeeLoginData {
  username: string;
  password: string;
}

export interface ProfileData {
  id: string;
  name: string;
  description: string;
  type: string;
  stir: string;
  ceo: string;
  bank_number: string;
  mfo: string;
  email: string;
  phone: string;
  photo?: string | null;
  ifut: string;
  region: string;
  district: string;
  address: string;
  created_at: string;
  updated_at: string;
}

export interface Employee {
  id: number;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  jshshir: string;
  is_active: boolean;
  date_joined: string;
  is_staff: boolean;
}

export interface EmployeeData {
  password: string;
  username: string;
  first_name?: string;
  last_name?: string;
  jshshir?: string;
}

export interface PartnerProfile {
  id: string;
  name: string;
  description: string;
  type: string;
  photo?: string | null;
  stir: string;
  ceo: string;
  bank_number: string;
  mfo: string;
  email: string;
  phone: string;
  ifut: string;
  region: string;
  district: string;
  address: string;
  created_at: string;
  updated_at: string;
}

export interface Partner {
  name: string;
  json(): unknown;
  ok: any;
  id: string;
  partner: PartnerProfile;
  is_active: boolean;
  invited_at: string;
  accepted_at: string | null;
  owner: PartnerProfile;
}

export interface PartnerRequest {
  id: number;
  partner: PartnerProfile;
  is_active: boolean;
  invited_at: string;
  accepted_at: string | null;
  owner: PartnerProfile;
}

export interface PartnerData {
  partner: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  organization?:string;
  created_at?:string;
}

export interface AcceptPartnerRequestData {
  contract: string;
}

export const manufacturerLogin = async (data: ManufacturerLoginData): Promise<AuthResponse> => {
  try {
    const response = await fetch('https://api.ekoiz.uz/api/v1/accounts/auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `HTTP xato! Status: ${response.status}`);
    }

    const result: AuthResponse = await response.json();
    if (result.tokens?.access) {
      Cookies.set('token', result.tokens.access, { expires: 1 });
      Cookies.set('refresh_token', result.tokens.refresh, { expires: 7 });
    }
    return result;
  } catch (error) {
    console.error('Tashkilot loginida xato:', error);
    throw new Error(error instanceof Error ? error.message : 'Noma\'lum xato yuz berdi');
  }
};

export const employeeLogin = async (data: EmployeeLoginData): Promise<AuthResponse> => {
  try {
    const response = await fetch('https://api.ekoiz.uz/api/v1/accounts/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `HTTP xato! Status: ${response.status}`);
    }

    const result: AuthResponse = await response.json();
    if (result.tokens?.access) {
      Cookies.set('token', result.tokens.access, { expires: 1 });
      Cookies.set('refresh_token', result.tokens.refresh, { expires: 7 });
    }
    return result;
  } catch (error) {
    console.error('xodim loginida xato:', error);
    throw new Error(error instanceof Error ? error.message : 'Noma\'lum xato yuz berdi');
  }
};

export const getProfile = async (): Promise<ProfileData> => {
  const token = Cookies.get('token');
  if (!token) {
    throw new Error('Access token topilmadi');
  }

  try {
    const response = await fetch('https://api.ekoiz.uz/api/v1/accounts/organization/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `HTTP xato! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Profil ma\'lumotlarini olishda xato:', error);
    throw new Error(error instanceof Error ? error.message : 'Noma\'lum xato yuz berdi');
  }
};

export const getEmployeeProfile = async (): Promise<Employee> => {
  const token = Cookies.get('token');
  if (!token) {
    throw new Error('Access token topilmadi');
  }

  try {
    const response = await fetch('https://api.ekoiz.uz/api/v1/accounts/employee/me/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `HTTP xato! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('xodim profilini olishda xato:', error);
    throw new Error(error instanceof Error ? error.message : 'Noma\'lum xato yuz berdi');
  }
};

export const updateEmployeeProfile = async (id: number, data: Partial<EmployeeData>): Promise<Employee> => {
  const token = Cookies.get('token');
  if (!token) {
    throw new Error('Access token topilmadi');
  }

  try {
    const response = await fetch(`https://api.ekoiz.uz/api/v1/accounts/employee/${id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `HTTP xato! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('xodim profilini yangilashda xato:', error);
    throw new Error(error instanceof Error ? error.message : 'Noma\'lum xato yuz berdi');
  }
};

export const updatePassword = async (password: string): Promise<void> => {
  const token = Cookies.get('token');
  if (!token) {
    throw new Error('Access token topilmadi');
  }

  try {
    const response = await fetch('https://api.ekoiz.uz/api/v1/accounts/update/password/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `HTTP xato! Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Parolni yangilashda xato:', error);
    throw new Error(error instanceof Error ? error.message : 'Noma\'lum xato yuz berdi');
  }
};

export const updateProfile = async (data: Partial<ProfileData>): Promise<ProfileData> => {
  const token = Cookies.get('token');
  if (!token) {
    throw new Error('Access token topilmadi');
  }

  try {
    const response = await fetch('https://api.ekoiz.uz/api/v1/accounts/organization/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `HTTP xato! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Profilni yangilashda xato:', error);
    throw new Error(error instanceof Error ? error.message : 'Noma\'lum xato yuz berdi');
  }
};

export const partialUpdateProfile = async (data: Partial<ProfileData>): Promise<ProfileData> => {
  const token = Cookies.get('token');
  if (!token) {
    throw new Error('Access token topilmadi');
  }

  try {
    const response = await fetch('https://api.ekoiz.uz/api/v1/accounts/organization/', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `HTTP xato! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Profilni qisman yangilashda xato:', error);
    throw new Error(error instanceof Error ? error.message : 'Noma\'lum xato yuz berdi');
  }
};

export const deleteProfile = async (): Promise<void> => {
  const token = Cookies.get('token');
  if (!token) {
    throw new Error('Access token topilmadi');
  }

  try {
    const response = await fetch('https://api.ekoiz.uz/api/v1/accounts/organization/', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `HTTP xato! Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Profilni o\'chirishda xato:', error);
    throw new Error(error instanceof Error ? error.message : 'Noma\'lum xato yuz berdi');
  }
};

export const getEmployees = async (): Promise<Employee[]> => {
  const token = Cookies.get('token');
  if (!token) {
    throw new Error('Access token topilmadi');
  }

  try {
    const response = await fetch('https://api.ekoiz.uz/api/v1/accounts/employee/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `HTTP xato! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('xodimlar ro\'yxatini olishda xato:', error);
    throw new Error(error instanceof Error ? error.message : 'Noma\'lum xato yuz berdi');
  }
};

export const addEmployee = async (data: EmployeeData): Promise<Employee> => {
  const token = Cookies.get('token');
  if (!token) {
    throw new Error('Access token topilmadi');
  }

  try {
    const response = await fetch('https://api.ekoiz.uz/api/v1/accounts/employee/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || errorData.username || `HTTP xato! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('xodim qo\'shishda xato:', error);
    throw new Error(error instanceof Error ? error.message : 'Noma\'lum xato yuz berdi');
  }
};

export const deleteEmployee = async (id: number): Promise<void> => {
  const token = Cookies.get('token');
  if (!token) {
    throw new Error('Access token topilmadi');
  }

  try {
    const response = await fetch(`https://api.ekoiz.uz/api/v1/accounts/employee/${id}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `HTTP xato! Status: ${response.status}`);
    }
  } catch (error) {
    console.error('xodimni o\'chirishda xato:', error);
    throw new Error(error instanceof Error ? error.message : 'Noma\'lum xato yuz berdi');
  }
};

export const getPartners = async (): Promise<Partner[]> => {
  const token = Cookies.get('token');
  if (!token) {
    throw new Error('Access token topilmadi');
  }

  try {
    const response = await fetch('https://api.ekoiz.uz/api/v1/accounts/partners/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `HTTP xato! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('ta\'minotchi lar ro\'yxatini olishda xato:', error);
    throw new Error(error instanceof Error ? error.message : 'Noma\'lum xato yuz berdi');
  }
};

export const getPartnerById = async (id: string): Promise<Partner> => {
  const token = Cookies.get('token');
  if (!token) {
    throw new Error('Access token topilmadi');
  }

  try {
    const response = await fetch(`https://api.ekoiz.uz/api/v1/accounts/partners/${id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `HTTP xato! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('ta\'minotchi  ma\'lumotlarini olishda xato:', error);
    throw new Error(error instanceof Error ? error.message : 'Noma\'lum xato yuz berdi');
  }
};

export const addPartner = async (data: PartnerData): Promise<Partner> => {
  const token = Cookies.get('token');
  if (!token) {
    throw new Error('Access token topilmadi');
  }

  try {
    const response = await fetch('https://api.ekoiz.uz/api/v1/accounts/partners/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();

      // 🔹 Barcha holatlar uchun moslashtirilgan xabar
      const errorMessage =
        errorData.non_field_errors?.[0] ||
        errorData.detail ||
        errorData.name ||
        `HTTP xato! Status: ${response.status}`;

      throw new Error(errorMessage);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Hamkor qo'shishda xato:", error);
    throw new Error(error instanceof Error ? error.message : "Noma'lum xato yuz berdi");
  }
};


export const deletePartner = async (id: string): Promise<void> => {
  const token = Cookies.get('token');
  if (!token) {
    throw new Error('Access token topilmadi');
  }

  try {
    const response = await fetch(`https://api.ekoiz.uz/api/v1/accounts/partners/${id}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `HTTP xato! Status: ${response.status}`);
    }
  } catch (error) {
    console.error('ta\'minotchi ni o\'chirishda xato:', error);
    throw new Error(error instanceof Error ? error.message : 'Noma\'lum xato yuz berdi');
  }
};

export const getPartnerRequests = async (): Promise<PartnerRequest[]> => {
  const token = Cookies.get('token');
  if (!token) {
    throw new Error('Access token topilmadi');
  }

  try {
    const response = await fetch('https://api.ekoiz.uz/api/v1/accounts/partners/request/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `HTTP xato! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('ta\'minotchi lik so\'rovlarini olishda xato:', error);
    throw new Error(error instanceof Error ? error.message : 'Noma\'lum xato yuz berdi');
  }
};

export const getMyPartnerRequests = async (): Promise<PartnerRequest[]> => {
  const token = Cookies.get('token');
  if (!token) {
    throw new Error('Access token topilmadi');
  }

  try {
    const response = await fetch('https://api.ekoiz.uz/api/v1/accounts/partners/my/request/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `HTTP xato! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Mening ta\'minotchi lik so\'rovlarimni olishda xato:', error);
    throw new Error(error instanceof Error ? error.message : 'Noma\'lum xato yuz berdi');
  }
};

export const deleteMyPartnerRequest = async (id: number): Promise<void> => {
  const token = Cookies.get('token');
  if (!token) {
    throw new Error('Access token topilmadi');
  }

  try {
    const response = await fetch(`https://api.ekoiz.uz/api/v1/accounts/partners/my/request/${id}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `HTTP xato! Status: ${response.status}`);
    }
  } catch (error) {
    console.error('ta\'minotchi lik so\'rovini o\'chirishda xato:', error);
    throw new Error(error instanceof Error ? error.message : 'Noma\'lum xato yuz berdi');
  }
};

export const acceptPartnerRequest = async (id: number): Promise<void> => {
  const token = Cookies.get('token');
  if (!token) {
    throw new Error('Access token topilmadi');
  }

  try {
    const response = await fetch('https://api.ekoiz.uz/api/v1/accounts/partners/request/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ contract: `${id}` }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || errorData.contract || `HTTP xato! Status: ${response.status}`);
    }
  } catch (error) {
    console.error('ta\'minotchi lik so\'rovini qabul qilishda xato:', error);
    throw new Error(error instanceof Error ? error.message : 'Noma\'lum xato yuz berdi');
  }
};


// PRODUCTS -------------------------------------------------------------------------------------


const API_products = 'https://api.ekoiz.uz/api/v1/products';

export const categoryEndpoints: Record<string, string> = {
  "1": "gadgets",
  "2": "maishiy-texnika",
  "3": "kiyim",
  "4": "food",
  "5": "qurilish",
  "6": "aksessuar",
  "7": "salomatlik",
  "8": "uy-buyum",
  "9": "kanselyariya",
};

export const categoryModels: Record<string, string> = {
  "1": "gadgetproduct",
  "2": "maishiytexnikaproduct",
  "3": "kiyimproduct",
  "4": "foodproduct",
  "5": "qurilishproduct",
  "6": "aksessuarproduct",
  "7": "salomatlikproduct",
  "8": "uybuyumproduct",
  "9": "kanselyariyaproduct",
};

const statusEndpoints = {
  draft: 'draft',
  pending: 'pending',
  active: 'active',
} as const;

type StatusType = keyof typeof statusEndpoints;

// Helper: Auth headers
const getAuthHeaders = (contentType: boolean = true) => {
  const token = Cookies.get('token');
  if (!token) throw new Error('Access token topilmadi');
  return {
    headers: {
      ...(contentType ? { 'Content-Type': 'application/json' } : {}),
      'Authorization': `Bearer ${token}`,
    },
  };
};

// Helper: Response handling
const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `HTTP xato! Status: ${response.status}`);
  }
  return response.json();
};
// Active products (simple GET)
// export const getAllProducts = async (): Promise<any> => {
//   try {
//     const response = await fetch(`${API_products}/product/`, {
//       method: 'GET',
//       ...getAuthHeaders(),
//     });
//     return handleResponse(response);
//   } catch (error) {
//     console.error('Mahsulotlarni olishda xato:', error);
//     throw error;
//   }
// };


// Active products (simple GET)
export const getAllActiveProducts = async (): Promise<any> => {
  try {
    const response = await fetch(`${API_products}/${statusEndpoints.active}/`, {
      method: 'GET',
      ...getAuthHeaders(),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Mahsulotlarni olishda xato:', error);
    throw error;
  }
};

// Products by status
export const getAllProductsByStatus = async (status: StatusType): Promise<any> => {
  try {
    const response = await fetch(`${API_products}/${statusEndpoints[status]}/`, {
      method: 'GET',
      ...getAuthHeaders(),
    });
    return handleResponse(response);
  } catch (error) {
    console.error(`${status} mahsulotlarni olishda xato:`, error);
    throw error;
  }
};

// Get by ID
// export const getProductById = async (categoryKey: string, id: string): Promise<any> => {
//   const endpoint = categoryEndpoints[categoryKey];
//   try {
//     const response = await fetch(`${API_products}/${endpoint}/${id}/`, {
//       method: 'GET',
//       ...getAuthHeaders(),
//     });
//     return handleResponse(response);
//   } catch (error) {
//     console.error('Mahsulotni olishda xato:', error);
//     throw error;
//   }
// };

// Create
// export const createProduct = async (categoryKey: string, data: FormData): Promise<any> => {
//   const endpoint = categoryEndpoints[categoryKey];
//   try {
//     const response = await fetch(`${API_products}/${endpoint}/`, {
//       method: 'POST',
//       ...getAuthHeaders(false),
//       body: data,
//     });
//     return handleResponse(response);
//   } catch (error) {
//     console.error('Mahsulot yaratishda xato:', error);
//     throw error;
//   }
// };

// Update
// export const updateProduct = async (categoryKey: string, id: string, data: FormData): Promise<any> => {
//   const endpoint = categoryEndpoints[categoryKey];
//   try {
//     const response = await fetch(`${API_products}/${endpoint}/${id}/`, {
//       method: 'PATCH',
//       ...getAuthHeaders(false),
//       body: data,
//     });
//     return handleResponse(response);
//   } catch (error) {
//     console.error('Mahsulot yangilashda xato:', error);
//     throw error;
//   }
// };

// Delete
// export const deleteProduct = async (categoryKey: string, id: string): Promise<void> => {
//   const endpoint = categoryEndpoints[categoryKey];
//   try {
//     const response = await fetch(`${API_products}/${endpoint}/${id}/`, {
//       method: 'DELETE',
//       headers: {
//         'Authorization': `Bearer ${Cookies.get('token')}`,
//       },
//     });
//     if (!response.ok) throw new Error('O\'chirish muvaffaqiyatsiz');
//   } catch (error) {
//     console.error('Mahsulot o\'chirishda xato:', error);
//     throw error;
//   }
// };

// Update status
// export const updateProductStatus = async (productId: string, status: string, categoryModel: string): Promise<void> => {
//   try {
//     const response = await fetch(`${API_products}/update-status/`, {
//       method: 'POST',
//       ...getAuthHeaders(),
//       body: JSON.stringify({
//         product_id: productId,
//         status,
//         category: categoryModel,
//       }),
//     });
//     await handleResponse(response);
//   } catch (error) {
//     console.error('Status yangilashda xato:', error);
//     throw error;
//   }
// };


// === KATEGORIYALAR ===
export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${API_products}/categories/`, {
    method: "GET",
    ...getAuthHeaders(),
  }
  );
  return handleResponse(response);
};

export const createCategory = async (data: { name: string; description?: string }): Promise<Category> => {
  const response = await fetch(`${API_products}/categories/`, {
    method: "POST",
    ...getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

// === MAHSULOTLAR ===
// export const createProduct = async (categoryId: string, formData: FormData): Promise<any> => {
//   const response = await fetch(`${API_products}/product/`, {
//     method: "POST",
//     ...getAuthHeaders(),
//     headers: {
//       Authorization: getAuthHeaders().headers.Authorization,
//     },
//     body: formData,
//   });
//   return handleResponse(response);
// };
export const createProduct = async (categoryId: string, formData: FormData): Promise<any> => {
  const authHeaders = getAuthHeaders(false); // ❗ FormData uchun false
  const response = await fetch(`${API_products}/product/`, {
    method: "POST",
    headers: authHeaders.headers,
    body: formData,
  });
  return handleResponse(response);
};


export const getAllProducts = async (): Promise<any> => {
  const response = await fetch(`${API_products}/product/`, getAuthHeaders());
  return handleResponse(response);
};

export const getProductById = async (id: string): Promise<any> => {
  const response = await fetch(`${API_products}/product/${id}/`, getAuthHeaders());
  return handleResponse(response);
};

export const updateProduct = async (id: string, formData: FormData): Promise<any> => {
  const response = await fetch(`${API_products}/product/${id}/`, {
    method: "PATCH",
    ...getAuthHeaders(),
    headers: { Authorization: getAuthHeaders().headers.Authorization },
    body: formData,
  });
  return handleResponse(response);
};

export const updateProductStatus = async (id: string, status: string): Promise<any> => {
  const response = await fetch(`${API_products}/update/status/`, {
    method: "POST",
    ...getAuthHeaders(),
    body: JSON.stringify({ product_id: id, status:status }),
  });
  return handleResponse(response);
};

export const deleteProduct = async (id: string): Promise<any> => {
  const response = await fetch(`${API_products}/product/${id}/`, {
    method: "DELETE",
    ...getAuthHeaders(),
  });
  if (!response.ok) throw new Error("O'chirishda xato");
};