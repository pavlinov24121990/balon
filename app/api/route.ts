import { CompanyAdmin } from "@/helpers/interface/interfaces";
import { revalidateTag } from "@/node_modules/next/cache";

export async function fetchCompany(): Promise<CompanyAdmin> {
  try {
    const response = await fetch('http://localhost:3000/api/v1/companies', {
      next: { tags: ['company'], revalidate: 60  }
    });
    revalidateTag('company')
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
