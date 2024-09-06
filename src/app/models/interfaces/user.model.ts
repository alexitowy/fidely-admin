export interface Company {
    uid?: string,
    email: string,
    password: string,
    location: string,
    cif: string,
    category: string,
    companyName: string,
    banner?: string,
    logo?: string,
    images?: any,
    description?: string,
    phones?: any,
    role?: string,
    timeTables?: any,
    services?: any,
    cards?: any,
}

export type CompanyProfile = Partial<Company>;