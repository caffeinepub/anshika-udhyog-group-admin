import Text "mo:core/Text";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Blob "mo:core/Blob";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Array "mo:core/Array";

import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import Migration "migration";

// Specify the data migration function in with-clause
(with migration = Migration.run)
actor {
  // Include blob storage component
  include MixinStorage();

  // User Management types
  type AdminRole = {
    #admin;
    #standard;
  };

  type User = {
    id : Text;
    username : Text;
    passwordHash : Blob;
    fullName : Text;
    email : Text;
    phone : Text;
    profilePhotoBlob : ?Storage.ExternalBlob;
    role : AdminRole;
    isActive : Bool;
    createdAt : Int;
    walletBalance : Nat;
  };

  public type UserCreatePayload = {
    username : Text;
    passwordHash : Blob;
    fullName : Text;
    email : Text;
    phone : Text;
    profilePhotoBlob : ?Storage.ExternalBlob;
    role : AdminRole;
  };

  public type UserUpdatePayload = {
    user : UserCreatePayload;
    id : Text;
  };

  public type Credentials = {
    username : Text;
    password : Blob;
  };

  public type LoginAttempt = {
    credentials : Credentials;
    id : Text;
  };

  let users = Map.empty<Text, User>();
  var userIdCounter = 0;

  func getNextUserId() : Text {
    userIdCounter += 1;
    userIdCounter.toText();
  };

  public shared ({ caller }) func createUser(payload : UserCreatePayload) : async User {
    let id = getNextUserId();
    let user : User = {
      id;
      username = payload.username;
      passwordHash = payload.passwordHash;
      fullName = payload.fullName;
      email = payload.email;
      phone = payload.phone;
      profilePhotoBlob = payload.profilePhotoBlob;
      role = payload.role;
      isActive = true;
      createdAt = Time.now();
      walletBalance = 0;
    };
    users.add(id, user);
    user;
  };

  public shared ({ caller }) func updateUser(payload : UserUpdatePayload) : async User {
    switch (users.get(payload.id)) {
      case (null) { Runtime.trap("KYC record not found for update") };
      case (?existingUser) {
        let updatedUser : User = {
          existingUser with
          username = payload.user.username;
          passwordHash = payload.user.passwordHash;
          fullName = payload.user.fullName;
          email = payload.user.email;
          phone = payload.user.phone;
          profilePhotoBlob = payload.user.profilePhotoBlob;
          role = payload.user.role;
        };
        users.add(payload.id, updatedUser);
        updatedUser;
      };
    };
  };

  public shared ({ caller }) func deactivateUser(id : Text) : async () {
    switch (users.get(id)) {
      case (null) { Runtime.trap("KYC record not found for delete") };
      case (?existingUser) {
        let updatedUser = { existingUser with isActive = false };
        users.add(id, updatedUser);
      };
    };
  };

  public query ({ caller }) func getUser(id : Text) : async User {
    switch (users.get(id)) {
      case (null) { Runtime.trap("KYC record not found for get") };
      case (?user) {
        user;
      };
    };
  };

  public query ({ caller }) func getAllUsers() : async [User] {
    users.values().toArray();
  };

  public shared ({ caller }) func loginUser(attempt : LoginAttempt) : async {
    user : ?User;
    error : ?Text;
  } {
    let user = users.get(attempt.id);
    switch (user) {
      case (null) { { user = null; error = ?"User not found" } };
      case (?u) {
        if (u.passwordHash == attempt.credentials.password) {
          { user = ?u; error = null };
        } else {
          { user = null; error = ?"Incorrect password" };
        };
      };
    };
  };

  // Loan Application types
  type LoanStatus = {
    #pending;
    #approved;
    #rejected;
  };

  type LoanApplication = {
    id : Text;
    userId : Text;
    fullName : Text;
    phone : Text;
    address : Text;
    loanAmount : Nat;
    purpose : Text;
    monthlyIncome : Text;
    existingLoans : Text;
    status : LoanStatus;
    createdAt : Int;
    documents : Text;
    adminNote : Text;
  };

  public type LoanApplicationCreatePayload = {
    userId : Text;
    fullName : Text;
    phone : Text;
    address : Text;
    loanAmount : Nat;
    purpose : Text;
    monthlyIncome : Text;
    existingLoans : Text;
    documents : Text;
  };

  public type LoanApplicationUpdatePayload = {
    application : LoanApplicationCreatePayload;
    id : Text;
  };

  let loanApplications = Map.empty<Text, LoanApplication>();
  var loanApplicationIdCounter = 0;

  func getNextLoanApplicationId() : Text {
    loanApplicationIdCounter += 1;
    loanApplicationIdCounter.toText();
  };

  public shared ({ caller }) func submitLoanApplication(payload : LoanApplicationCreatePayload) : async LoanApplication {
    let id = getNextLoanApplicationId();
    let application : LoanApplication = {
      id;
      userId = payload.userId;
      fullName = payload.fullName;
      phone = payload.phone;
      address = payload.address;
      loanAmount = payload.loanAmount;
      purpose = payload.purpose;
      monthlyIncome = payload.monthlyIncome;
      existingLoans = payload.existingLoans;
      status = #pending;
      createdAt = Time.now();
      documents = payload.documents;
      adminNote = "";
    };

    loanApplications.add(id, application);
    application;
  };

  public shared ({ caller }) func updateLoanApplication(payload : LoanApplicationUpdatePayload) : async LoanApplication {
    switch (loanApplications.get(payload.id)) {
      case (null) { Runtime.trap("KYC record not found for update") };
      case (?existingApp) {
        let updatedApplication : LoanApplication = {
          existingApp with
          userId = payload.application.userId;
          fullName = payload.application.fullName;
          phone = payload.application.phone;
          address = payload.application.address;
          loanAmount = payload.application.loanAmount;
          purpose = payload.application.purpose;
          monthlyIncome = payload.application.monthlyIncome;
          existingLoans = payload.application.existingLoans;
          documents = payload.application.documents;
        };
        loanApplications.add(payload.id, updatedApplication);
        updatedApplication;
      };
    };
  };

  public shared ({ caller }) func approveLoanApplication(id : Text, note : Text) : async () {
    switch (loanApplications.get(id)) {
      case (null) { Runtime.trap("KYC record not found for delete") };
      case (?existingApp) {
        let updatedApplication = {
          existingApp with
          status = #approved;
          adminNote = note;
        };
        loanApplications.add(id, updatedApplication);
      };
    };
  };

  public shared ({ caller }) func rejectLoanApplication(id : Text, note : Text) : async () {
    switch (loanApplications.get(id)) {
      case (null) { Runtime.trap("Loan application not found for rejection") };
      case (?application) {
        let updatedApplication = {
          application with
          status = #rejected;
          adminNote = note;
        };
        loanApplications.add(id, updatedApplication);
      };
    };
  };

  public query ({ caller }) func getLoanApplication(id : Text) : async LoanApplication {
    switch (loanApplications.get(id)) {
      case (null) { Runtime.trap("Loan application not found") };
      case (?application) { application };
    };
  };

  public query ({ caller }) func getAllLoanApplications() : async [LoanApplication] {
    loanApplications.values().toArray();
  };

  // Franchise Application types
  type FranchiseStatus = {
    #pending;
    #approved;
    #rejected;
  };

  type FranchiseApplication = {
    id : Text;
    userId : Text;
    fullName : Text;
    phone : Text;
    address : Text;
    city : Text;
    state : Text;
    investmentCapacity : Text;
    businessExperience : Text;
    areaPreference : Text;
    status : FranchiseStatus;
    createdAt : Int;
    adminNote : Text;
  };

  public type FranchiseApplicationCreatePayload = {
    userId : Text;
    fullName : Text;
    phone : Text;
    address : Text;
    city : Text;
    state : Text;
    investmentCapacity : Text;
    businessExperience : Text;
    areaPreference : Text;
  };

  public type FranchiseApplicationUpdatePayload = {
    application : FranchiseApplicationCreatePayload;
    id : Text;
  };

  let franchiseApplications = Map.empty<Text, FranchiseApplication>();
  var franchiseApplicationIdCounter = 0;

  func getNextFranchiseApplicationId() : Text {
    franchiseApplicationIdCounter += 1;
    franchiseApplicationIdCounter.toText();
  };

  public shared ({ caller }) func submitFranchiseApplication(payload : FranchiseApplicationCreatePayload) : async FranchiseApplication {
    let id = getNextFranchiseApplicationId();
    let application : FranchiseApplication = {
      id;
      userId = payload.userId;
      fullName = payload.fullName;
      phone = payload.phone;
      address = payload.address;
      city = payload.city;
      state = payload.state;
      investmentCapacity = payload.investmentCapacity;
      businessExperience = payload.businessExperience;
      areaPreference = payload.areaPreference;
      status = #pending;
      createdAt = Time.now();
      adminNote = "";
    };

    franchiseApplications.add(id, application);
    application;
  };

  public shared ({ caller }) func updateFranchiseApplication(payload : FranchiseApplicationUpdatePayload) : async FranchiseApplication {
    switch (franchiseApplications.get(payload.id)) {
      case (null) { Runtime.trap("Franchise application not found for update") };
      case (?existingApp) {
        let updatedApplication : FranchiseApplication = {
          existingApp with
          userId = payload.application.userId;
          fullName = payload.application.fullName;
          phone = payload.application.phone;
          address = payload.application.address;
          city = payload.application.city;
          state = payload.application.state;
          investmentCapacity = payload.application.investmentCapacity;
          businessExperience = payload.application.businessExperience;
          areaPreference = payload.application.areaPreference;
        };
        franchiseApplications.add(payload.id, updatedApplication);
        updatedApplication;
      };
    };
  };

  public shared ({ caller }) func approveFranchiseApplication(id : Text, note : Text) : async () {
    switch (franchiseApplications.get(id)) {
      case (null) { Runtime.trap("Franchise application not found for approval") };
      case (?application) {
        let updatedApplication = {
          application with
          status = #approved;
          adminNote = note;
        };
        franchiseApplications.add(id, updatedApplication);
      };
    };
  };

  public shared ({ caller }) func rejectFranchiseApplication(id : Text, note : Text) : async () {
    switch (franchiseApplications.get(id)) {
      case (null) { Runtime.trap("Franchise application not found for rejection") };
      case (?application) {
        let updatedApplication = {
          application with
          status = #rejected;
          adminNote = note;
        };
        franchiseApplications.add(id, updatedApplication);
      };
    };
  };

  public query ({ caller }) func getFranchiseApplication(id : Text) : async FranchiseApplication {
    switch (franchiseApplications.get(id)) {
      case (null) { Runtime.trap("Franchise application not found") };
      case (?application) {
        application;
      };
    };
  };

  public query ({ caller }) func getAllFranchiseApplications() : async [FranchiseApplication] {
    franchiseApplications.values().toArray();
  };

  // KYC Management types
  type KYCStatus = {
    #pending;
    #verified;
    #rejected;
  };

  type KYCRecord = {
    id : Text;
    userId : Text;
    aadhaarNumber : Text;
    panNumber : Text;
    aadhaarDoc : Storage.ExternalBlob;
    panDoc : Storage.ExternalBlob;
    photo : Storage.ExternalBlob;
    status : KYCStatus;
    submittedAt : Int;
    verifiedAt : ?Int;
  };

  public type KYCRecordCreatePayload = {
    userId : Text;
    aadhaarNumber : Text;
    panNumber : Text;
    aadhaarDoc : Storage.ExternalBlob;
    panDoc : Storage.ExternalBlob;
    photo : Storage.ExternalBlob;
  };

  public type KYCRecordUpdatePayload = {
    id : Text;
    record : KYCRecordCreatePayload;
  };

  let kycRecords = Map.empty<Text, KYCRecord>();
  var kycRecordIdCounter = 0;

  func getNextKYCRecordId() : Text {
    kycRecordIdCounter += 1;
    kycRecordIdCounter.toText();
  };

  public shared ({ caller }) func submitKYC(payload : KYCRecordCreatePayload) : async KYCRecord {
    let id = getNextKYCRecordId();
    let record : KYCRecord = {
      id;
      userId = payload.userId;
      aadhaarNumber = payload.aadhaarNumber;
      panNumber = payload.panNumber;
      aadhaarDoc = payload.aadhaarDoc;
      panDoc = payload.panDoc;
      photo = payload.photo;
      status = #pending;
      submittedAt = Time.now();
      verifiedAt = null;
    };

    kycRecords.add(id, record);
    record;
  };

  public shared ({ caller }) func updateKYCRecord(payload : KYCRecordUpdatePayload) : async KYCRecord {
    switch (kycRecords.get(payload.id)) {
      case (null) { Runtime.trap("KYC record not found for update") };
      case (?existingRecord) {
        let updatedRecord : KYCRecord = {
          existingRecord with
          userId = payload.record.userId;
          aadhaarNumber = payload.record.aadhaarNumber;
          panNumber = payload.record.panNumber;
          aadhaarDoc = payload.record.aadhaarDoc;
          panDoc = payload.record.panDoc;
          photo = payload.record.photo;
        };
        kycRecords.add(payload.id, updatedRecord);
        updatedRecord;
      };
    };
  };

  public shared ({ caller }) func verifyKYC(id : Text) : async () {
    switch (kycRecords.get(id)) {
      case (null) { Runtime.trap("KYC record not found for verification") };
      case (?record) {
        let updatedRecord = {
          record with
          status = #verified;
          verifiedAt = ?Time.now();
        };
        kycRecords.add(id, updatedRecord);
      };
    };
  };

  public shared ({ caller }) func rejectKYC(id : Text) : async () {
    switch (kycRecords.get(id)) {
      case (null) { Runtime.trap("KYC record not found for rejection") };
      case (?record) {
        let updatedRecord = {
          record with
          status = #rejected;
          verifiedAt = null;
        };
        kycRecords.add(id, updatedRecord);
      };
    };
  };

  public query ({ caller }) func getKYCRecord(id : Text) : async KYCRecord {
    switch (kycRecords.get(id)) {
      case (null) { Runtime.trap("KYC record not found") };
      case (?record) {
        record;
      };
    };
  };

  public query ({ caller }) func getAllKYCRecords() : async [KYCRecord] {
    kycRecords.values().toArray();
  };

  // Existing Features - Letter Management, Gallery & Document Management
  type PaperSize = {
    #a4;
    #a5;
    #letter;
    #legal;
  };

  type LetterStatus = {
    #draft;
    #finalized;
  };

  type Letter = {
    referenceNumber : Text;
    date : Int;
    recipientName : Text;
    recipientAddress : Text;
    subject : Text;
    body : Text;
    authorityName : Text;
    designation : Text;
    paperSize : PaperSize;
    status : LetterStatus;
    createdAt : Int;
  };

  type GalleryItem = {
    id : Text;
    title : Text;
    description : Text;
    category : Text;
    blob : Storage.ExternalBlob;
    uploadedAt : Int;
  };

  type Document = {
    id : Text;
    name : Text;
    docType : Text;
    description : Text;
    blob : Storage.ExternalBlob;
    uploadedAt : Int;
    size : Nat;
  };

  let letters = Map.empty<Text, Letter>();
  let galleryItems = Map.empty<Text, GalleryItem>();
  let documents = Map.empty<Text, Document>();
  var letterCount = 0;

  // Letter Management

  public shared ({ caller }) func createLetter(
    date : Int,
    recipientName : Text,
    recipientAddress : Text,
    subject : Text,
    body : Text,
    authorityName : Text,
    designation : Text,
    paperSize : PaperSize,
    status : LetterStatus,
  ) : async Letter {
    letterCount += 1;
    let referenceNumber = "AUG-LTR-" # letterCount.toText();
    let createdAt = Time.now();

    let letter : Letter = {
      referenceNumber;
      date;
      recipientName;
      recipientAddress;
      subject;
      body;
      authorityName;
      designation;
      paperSize;
      status;
      createdAt;
    };

    letters.add(referenceNumber, letter);
    letter;
  };

  public query ({ caller }) func getLetter(referenceNumber : Text) : async ?Letter {
    letters.get(referenceNumber);
  };

  public query ({ caller }) func getAllLetters() : async [Letter] {
    letters.values().toArray();
  };

  public shared ({ caller }) func updateLetter(referenceNumber : Text, letter : Letter) : async Bool {
    if (not letters.containsKey(referenceNumber)) { return false };
    letters.add(referenceNumber, letter);
    true;
  };

  public shared ({ caller }) func deleteLetter(referenceNumber : Text) : async Bool {
    if (not letters.containsKey(referenceNumber)) { return false };
    letters.remove(referenceNumber);
    true;
  };

  // Gallery Management

  public shared ({ caller }) func addGalleryImage(
    title : Text,
    description : Text,
    category : Text,
    blob : Storage.ExternalBlob,
  ) : async GalleryItem {
    let id = "IMG-" # Time.now().toText();
    let uploadedAt = Time.now();

    let item : GalleryItem = {
      id;
      title;
      description;
      category;
      blob;
      uploadedAt;
    };

    galleryItems.add(id, item);
    item;
  };

  public query ({ caller }) func getGalleryItem(id : Text) : async ?GalleryItem {
    galleryItems.get(id);
  };

  public query ({ caller }) func getAllGalleryItems() : async [GalleryItem] {
    galleryItems.values().toArray();
  };

  public shared ({ caller }) func updateGalleryItem(id : Text, item : GalleryItem) : async Bool {
    if (not galleryItems.containsKey(id)) { return false };
    galleryItems.add(id, item);
    true;
  };

  public shared ({ caller }) func deleteGalleryItem(id : Text) : async Bool {
    if (not galleryItems.containsKey(id)) { return false };
    galleryItems.remove(id);
    true;
  };

  // Document Management

  public shared ({ caller }) func addDocument(
    name : Text,
    docType : Text,
    description : Text,
    blob : Storage.ExternalBlob,
    size : Nat,
  ) : async Document {
    let id = "DOC-" # Time.now().toText();
    let uploadedAt = Time.now();

    let document : Document = {
      id;
      name;
      docType;
      description;
      blob;
      uploadedAt;
      size;
    };

    documents.add(id, document);
    document;
  };

  public query ({ caller }) func getDocument(id : Text) : async ?Document {
    documents.get(id);
  };

  public query ({ caller }) func getAllDocuments() : async [Document] {
    documents.values().toArray();
  };

  public shared ({ caller }) func updateDocument(id : Text, document : Document) : async Bool {
    if (not documents.containsKey(id)) { return false };
    documents.add(id, document);
    true;
  };

  public shared ({ caller }) func deleteDocument(id : Text) : async Bool {
    if (not documents.containsKey(id)) { return false };
    documents.remove(id);
    true;
  };

  // Dashboard Stats

  public query ({ caller }) func getStats() : async {
    totalUsers : Nat;
    totalLoans : Nat;
    totalFranchises : Nat;
    totalLetters : Nat;
    totalGalleryItems : Nat;
    totalDocuments : Nat;
    totalKYC : Nat;
  } {
    {
      totalUsers = users.size();
      totalLoans = loanApplications.size();
      totalFranchises = franchiseApplications.size();
      totalLetters = letters.size();
      totalGalleryItems = galleryItems.size();
      totalDocuments = documents.size();
      totalKYC = kycRecords.size();
    };
  };
};
