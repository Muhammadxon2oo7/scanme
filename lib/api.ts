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

export interface AcceptPartnerRequestData {
  contract: string;
}

export const manufacturerLogin = async (data: ManufacturerLoginData): Promise<AuthResponse> => {
  try {
    const response = await fetch('https://api.e-investment.uz/api/v1/accounts/auth/', {
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
      Cookies.set('is_staff', 'true', { expires: 1 });
    }
    return result;
  } catch (error) {
    console.error('Tashkilot loginida xato:', error);
    throw new Error(error instanceof Error ? error.message : 'Noma\'lum xato yuz berdi');
  }
};

export const employeeLogin = async (data: EmployeeLoginData): Promise<AuthResponse> => {
  try {
    const response = await fetch('https://api.e-investment.uz/api/v1/accounts/login/', {
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
      Cookies.set('is_staff', 'false', { expires: 1 });
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
    const response = await fetch('https://api.e-investment.uz/api/v1/accounts/organization/', {
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
    const response = await fetch('https://api.e-investment.uz/api/v1/accounts/employee/me/', {
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
    const response = await fetch(`https://api.e-investment.uz/api/v1/accounts/employee/${id}/`, {
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
    const response = await fetch('https://api.e-investment.uz/api/v1/accounts/update/password/', {
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
    const response = await fetch('https://api.e-investment.uz/api/v1/accounts/organization/', {
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
    const response = await fetch('https://api.e-investment.uz/api/v1/accounts/organization/', {
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
    const response = await fetch('https://api.e-investment.uz/api/v1/accounts/organization/', {
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
    const response = await fetch('https://api.e-investment.uz/api/v1/accounts/employee/', {
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
    const response = await fetch('https://api.e-investment.uz/api/v1/accounts/employee/', {
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
    const response = await fetch(`https://api.e-investment.uz/api/v1/accounts/employee/${id}/`, {
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
    const response = await fetch('https://api.e-investment.uz/api/v1/accounts/partners/', {
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
    const response = await fetch(`https://api.e-investment.uz/api/v1/accounts/partners/${id}/`, {
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
    const response = await fetch('https://api.e-investment.uz/api/v1/accounts/partners/', {
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
    const response = await fetch(`https://api.e-investment.uz/api/v1/accounts/partners/${id}/`, {
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
    const response = await fetch('https://api.e-investment.uz/api/v1/accounts/partners/request/', {
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
    const response = await fetch('https://api.e-investment.uz/api/v1/accounts/partners/my/request/', {
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
    const response = await fetch(`https://api.e-investment.uz/api/v1/accounts/partners/my/request/${id}/`, {
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
    const response = await fetch('https://api.e-investment.uz/api/v1/accounts/partners/request/', {
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