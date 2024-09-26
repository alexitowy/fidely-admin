export interface Company {
    uid?: string,
    email: string,
    password: string,
    defaultAddress: string,
    additionalAddresses: any,
    cif: string,
    category: string,
    companyName: string,
    banner?: string,
    logo?: string,
    galleryImages?: any,
    description?: string,
    phones?: any,
    role?: string,
    timeTables?: any,
    services?: any,
    cards?: any,
}

export type CompanyProfile = Partial<Company>;

export interface Employee {
    id?: string,
    email: string,
    password: string,
    role: string
}