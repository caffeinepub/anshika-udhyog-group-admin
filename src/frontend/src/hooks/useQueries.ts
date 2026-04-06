import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AdminRole,
  type Document,
  ExternalBlob,
  type FranchiseApplication,
  type GalleryItem,
  type KYCRecord,
  type Letter,
  LetterStatus,
  type LoanApplication,
  PaperSize,
  type User,
} from "../backend";
import { useActor } from "./useActor";

export type {
  Letter,
  GalleryItem,
  Document,
  User,
  LoanApplication,
  FranchiseApplication,
  KYCRecord,
};
export { PaperSize, LetterStatus, ExternalBlob, AdminRole };

// ===================== STATS =====================
export function useGetStats() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      if (!actor)
        return {
          totalUsers: 0n,
          totalLoans: 0n,
          totalFranchises: 0n,
          totalLetters: 0n,
          totalGalleryItems: 0n,
          totalDocuments: 0n,
          totalKYC: 0n,
        };
      return actor.getStats();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30000,
  });
}

// ===================== LETTERS =====================
export function useGetAllLetters() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["letters"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllLetters();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateLetter() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      date: bigint;
      recipientName: string;
      recipientAddress: string;
      subject: string;
      body: string;
      authorityName: string;
      designation: string;
      paperSize: PaperSize;
      status: LetterStatus;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createLetter(
        data.date,
        data.recipientName,
        data.recipientAddress,
        data.subject,
        data.body,
        data.authorityName,
        data.designation,
        data.paperSize,
        data.status,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["letters"] });
      qc.invalidateQueries({ queryKey: ["stats"] });
    },
  });
}

export function useUpdateLetter() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      referenceNumber,
      letter,
    }: { referenceNumber: string; letter: Letter }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateLetter(referenceNumber, letter);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["letters"] });
    },
  });
}

export function useDeleteLetter() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (referenceNumber: string) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteLetter(referenceNumber);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["letters"] });
      qc.invalidateQueries({ queryKey: ["stats"] });
    },
  });
}

// ===================== GALLERY =====================
export function useGetAllGalleryItems() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["gallery"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllGalleryItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddGalleryImage() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      title: string;
      description: string;
      category: string;
      blob: ExternalBlob;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addGalleryImage(
        data.title,
        data.description,
        data.category,
        data.blob,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["gallery"] });
      qc.invalidateQueries({ queryKey: ["stats"] });
    },
  });
}

export function useUpdateGalleryItem() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, item }: { id: string; item: GalleryItem }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateGalleryItem(id, item);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["gallery"] });
    },
  });
}

export function useDeleteGalleryItem() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteGalleryItem(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["gallery"] });
      qc.invalidateQueries({ queryKey: ["stats"] });
    },
  });
}

// ===================== DOCUMENTS =====================
export function useGetAllDocuments() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["documents"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllDocuments();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddDocument() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      docType: string;
      description: string;
      blob: ExternalBlob;
      size: bigint;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addDocument(
        data.name,
        data.docType,
        data.description,
        data.blob,
        data.size,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["documents"] });
      qc.invalidateQueries({ queryKey: ["stats"] });
    },
  });
}

export function useUpdateDocument() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      document,
    }: { id: string; document: Document }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateDocument(id, document);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["documents"] });
    },
  });
}

export function useDeleteDocument() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteDocument(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["documents"] });
      qc.invalidateQueries({ queryKey: ["stats"] });
    },
  });
}

// ===================== USERS =====================
export function useGetAllUsers() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllUsers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateUser() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      username: string;
      fullName: string;
      email: string;
      phone: string;
      role: AdminRole;
      password: string;
      profilePhotoBlob?: ExternalBlob;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createUser({
        username: payload.username,
        fullName: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        role: payload.role,
        passwordHash: new TextEncoder().encode(payload.password),
        profilePhotoBlob: payload.profilePhotoBlob,
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
      qc.invalidateQueries({ queryKey: ["stats"] });
    },
  });
}

export function useUpdateUser() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      id: string;
      username: string;
      fullName: string;
      email: string;
      phone: string;
      role: AdminRole;
      password: string;
      profilePhotoBlob?: ExternalBlob;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateUser({
        id: payload.id,
        user: {
          username: payload.username,
          fullName: payload.fullName,
          email: payload.email,
          phone: payload.phone,
          role: payload.role,
          passwordHash: new TextEncoder().encode(payload.password),
          profilePhotoBlob: payload.profilePhotoBlob,
        },
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useDeactivateUser() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deactivateUser(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

// ===================== LOANS =====================
export function useGetAllLoanApplications() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["loans"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllLoanApplications();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitLoanApplication() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      userId: string;
      fullName: string;
      phone: string;
      address: string;
      loanAmount: bigint;
      purpose: string;
      monthlyIncome: string;
      existingLoans: string;
      documents: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.submitLoanApplication(payload);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["loans"] });
      qc.invalidateQueries({ queryKey: ["stats"] });
    },
  });
}

export function useApproveLoanApplication() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, note }: { id: string; note: string }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.approveLoanApplication(id, note);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["loans"] });
    },
  });
}

export function useRejectLoanApplication() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, note }: { id: string; note: string }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.rejectLoanApplication(id, note);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["loans"] });
    },
  });
}

// ===================== FRANCHISE =====================
export function useGetAllFranchiseApplications() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["franchise"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllFranchiseApplications();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitFranchiseApplication() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      userId: string;
      fullName: string;
      phone: string;
      address: string;
      city: string;
      state: string;
      investmentCapacity: string;
      businessExperience: string;
      areaPreference: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.submitFranchiseApplication(payload);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["franchise"] });
      qc.invalidateQueries({ queryKey: ["stats"] });
    },
  });
}

export function useApproveFranchiseApplication() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, note }: { id: string; note: string }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.approveFranchiseApplication(id, note);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["franchise"] });
    },
  });
}

export function useRejectFranchiseApplication() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, note }: { id: string; note: string }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.rejectFranchiseApplication(id, note);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["franchise"] });
    },
  });
}

// ===================== KYC =====================
export function useGetAllKYCRecords() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["kyc"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllKYCRecords();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitKYC() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      userId: string;
      aadhaarNumber: string;
      panNumber: string;
      aadhaarDoc: ExternalBlob;
      panDoc: ExternalBlob;
      photo: ExternalBlob;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.submitKYC(payload);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["kyc"] });
      qc.invalidateQueries({ queryKey: ["stats"] });
    },
  });
}

export function useVerifyKYC() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.verifyKYC(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["kyc"] });
    },
  });
}

export function useRejectKYC() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.rejectKYC(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["kyc"] });
    },
  });
}
