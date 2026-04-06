import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface KYCRecordUpdatePayload {
    id: string;
    record: KYCRecordCreatePayload;
}
export interface KYCRecordCreatePayload {
    userId: string;
    panNumber: string;
    aadhaarNumber: string;
    photo: ExternalBlob;
    panDoc: ExternalBlob;
    aadhaarDoc: ExternalBlob;
}
export interface Letter {
    status: LetterStatus;
    referenceNumber: string;
    subject: string;
    authorityName: string;
    body: string;
    date: bigint;
    designation: string;
    createdAt: bigint;
    paperSize: PaperSize;
    recipientAddress: string;
    recipientName: string;
}
export interface KYCRecord {
    id: string;
    status: KYCStatus;
    userId: string;
    submittedAt: bigint;
    panNumber: string;
    aadhaarNumber: string;
    photo: ExternalBlob;
    verifiedAt?: bigint;
    panDoc: ExternalBlob;
    aadhaarDoc: ExternalBlob;
}
export interface FranchiseApplicationUpdatePayload {
    id: string;
    application: FranchiseApplicationCreatePayload;
}
export interface FranchiseApplication {
    id: string;
    status: FranchiseStatus;
    areaPreference: string;
    investmentCapacity: string;
    city: string;
    userId: string;
    createdAt: bigint;
    fullName: string;
    adminNote: string;
    businessExperience: string;
    state: string;
    address: string;
    phone: string;
}
export interface User {
    id: string;
    username: string;
    createdAt: bigint;
    role: AdminRole;
    fullName: string;
    isActive: boolean;
    email: string;
    profilePhotoBlob?: ExternalBlob;
    passwordHash: Uint8Array;
    phone: string;
    walletBalance: bigint;
}
export interface Document {
    id: string;
    blob: ExternalBlob;
    name: string;
    size: bigint;
    description: string;
    docType: string;
    uploadedAt: bigint;
}
export interface LoginAttempt {
    id: string;
    credentials: Credentials;
}
export interface FranchiseApplicationCreatePayload {
    areaPreference: string;
    investmentCapacity: string;
    city: string;
    userId: string;
    fullName: string;
    businessExperience: string;
    state: string;
    address: string;
    phone: string;
}
export interface Credentials {
    username: string;
    password: Uint8Array;
}
export interface UserUpdatePayload {
    id: string;
    user: UserCreatePayload;
}
export interface LoanApplicationCreatePayload {
    documents: string;
    loanAmount: bigint;
    userId: string;
    fullName: string;
    address: string;
    existingLoans: string;
    phone: string;
    purpose: string;
    monthlyIncome: string;
}
export interface LoanApplicationUpdatePayload {
    id: string;
    application: LoanApplicationCreatePayload;
}
export interface LoanApplication {
    id: string;
    status: LoanStatus;
    documents: string;
    loanAmount: bigint;
    userId: string;
    createdAt: bigint;
    fullName: string;
    adminNote: string;
    address: string;
    existingLoans: string;
    phone: string;
    purpose: string;
    monthlyIncome: string;
}
export interface UserCreatePayload {
    username: string;
    role: AdminRole;
    fullName: string;
    email: string;
    profilePhotoBlob?: ExternalBlob;
    passwordHash: Uint8Array;
    phone: string;
}
export interface GalleryItem {
    id: string;
    title: string;
    blob: ExternalBlob;
    description: string;
    category: string;
    uploadedAt: bigint;
}
export enum AdminRole {
    admin = "admin",
    standard = "standard"
}
export enum FranchiseStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum KYCStatus {
    verified = "verified",
    pending = "pending",
    rejected = "rejected"
}
export enum LetterStatus {
    finalized = "finalized",
    draft = "draft"
}
export enum PaperSize {
    a4 = "a4",
    a5 = "a5",
    legal = "legal",
    letter = "letter"
}
export interface backendInterface {
    addDocument(name: string, docType: string, description: string, blob: ExternalBlob, size: bigint): Promise<Document>;
    addGalleryImage(title: string, description: string, category: string, blob: ExternalBlob): Promise<GalleryItem>;
    approveFranchiseApplication(id: string, note: string): Promise<void>;
    approveLoanApplication(id: string, note: string): Promise<void>;
    createLetter(date: bigint, recipientName: string, recipientAddress: string, subject: string, body: string, authorityName: string, designation: string, paperSize: PaperSize, status: LetterStatus): Promise<Letter>;
    createUser(payload: UserCreatePayload): Promise<User>;
    deactivateUser(id: string): Promise<void>;
    deleteDocument(id: string): Promise<boolean>;
    deleteGalleryItem(id: string): Promise<boolean>;
    deleteLetter(referenceNumber: string): Promise<boolean>;
    getAllDocuments(): Promise<Array<Document>>;
    getAllFranchiseApplications(): Promise<Array<FranchiseApplication>>;
    getAllGalleryItems(): Promise<Array<GalleryItem>>;
    getAllKYCRecords(): Promise<Array<KYCRecord>>;
    getAllLetters(): Promise<Array<Letter>>;
    getAllLoanApplications(): Promise<Array<LoanApplication>>;
    getAllUsers(): Promise<Array<User>>;
    getDocument(id: string): Promise<Document | null>;
    getFranchiseApplication(id: string): Promise<FranchiseApplication>;
    getGalleryItem(id: string): Promise<GalleryItem | null>;
    getKYCRecord(id: string): Promise<KYCRecord>;
    getLetter(referenceNumber: string): Promise<Letter | null>;
    getLoanApplication(id: string): Promise<LoanApplication>;
    getStats(): Promise<{
        totalGalleryItems: bigint;
        totalKYC: bigint;
        totalLoans: bigint;
        totalFranchises: bigint;
        totalLetters: bigint;
        totalUsers: bigint;
        totalDocuments: bigint;
    }>;
    getUser(id: string): Promise<User>;
    loginUser(attempt: LoginAttempt): Promise<{
        user?: User;
        error?: string;
    }>;
    rejectFranchiseApplication(id: string, note: string): Promise<void>;
    rejectKYC(id: string): Promise<void>;
    rejectLoanApplication(id: string, note: string): Promise<void>;
    submitFranchiseApplication(payload: FranchiseApplicationCreatePayload): Promise<FranchiseApplication>;
    submitKYC(payload: KYCRecordCreatePayload): Promise<KYCRecord>;
    submitLoanApplication(payload: LoanApplicationCreatePayload): Promise<LoanApplication>;
    updateDocument(id: string, document: Document): Promise<boolean>;
    updateFranchiseApplication(payload: FranchiseApplicationUpdatePayload): Promise<FranchiseApplication>;
    updateGalleryItem(id: string, item: GalleryItem): Promise<boolean>;
    updateKYCRecord(payload: KYCRecordUpdatePayload): Promise<KYCRecord>;
    updateLetter(referenceNumber: string, letter: Letter): Promise<boolean>;
    updateLoanApplication(payload: LoanApplicationUpdatePayload): Promise<LoanApplication>;
    updateUser(payload: UserUpdatePayload): Promise<User>;
    verifyKYC(id: string): Promise<void>;
}
