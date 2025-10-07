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
  organization: {
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
    is_active: boolean;
    is_staff: boolean;
    created_at: string;
    update_at: string;
    employees: any[];
    partners: any[];
    last_login: string | null;
    is_superuser: boolean;
  };
  tokens?: {
    access: string;
    refresh: string;
  };
  // Agar API boshqa qo‘shimcha maydonlar yuborsa:
  [key: string]: any; // <-- shuni qoldirsang ham bo‘ladi, lekin qiymatini 'any' qil
}


export interface ProfileData {
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
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: AuthResponse = await response.json();
    if (result.tokens?.access) {
      Cookies.set('token', result.tokens.access, { expires: 1 }); // Access tokenni 1 kunlik cookie’ga saqlash
      Cookies.set('refresh_token', result.tokens.refresh, { expires: 7 }); // Refresh tokenni 7 kunlik cookie’ga saqlash
    }
    return result;
  } catch (error) {
    console.error('Error during manufacturer login:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error occurred');
  }
};

export const getProfile = async (): Promise<ProfileData> => {
  const token = Cookies.get('token');
  if (!token) {
    throw new Error('No access token found');
  }

  try {
    const response = await fetch('https://api.e-investment.uz/api/v1/accounts/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error occurred');
  }
};

export const updateProfile = async (data: Partial<ProfileData>): Promise<ProfileData> => {
  const token = Cookies.get('token');
  if (!token) {
    throw new Error('No access token found');
  }

  try {
    const response = await fetch('https://api.e-investment.uz/api/v1/accounts/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error occurred');
  }
};

export const partialUpdateProfile = async (data: Partial<ProfileData>): Promise<ProfileData> => {
  const token = Cookies.get('token');
  if (!token) {
    throw new Error('No access token found');
  }

  try {
    const response = await fetch('https://api.e-investment.uz/api/v1/accounts/profile', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error partially updating profile:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error occurred');
  }
};

export const deleteProfile = async (): Promise<void> => {
  const token = Cookies.get('token');
  if (!token) {
    throw new Error('No access token found');
  }

  try {
    const response = await fetch('https://api.e-investment.uz/api/v1/accounts/profile', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting profile:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error occurred');
  }
};