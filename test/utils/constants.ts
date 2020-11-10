export var userProfileRegister = {
  firstName: "Faiz",
  lastName: "Ainur Rofiq",
  email: "fs.rofiq@gmail.com",
  gender: "Male",
  profession: "Software Developer",
  phoneNumber: "08665155775",
  photoUrl: "photoku.com",
  idCardUrl: "",
  addressLine1: "Sawangan",
  addressLine2: "",
  city: "Depok",
  province: "Jawa Barat",
  country: "Indonesia",
  postalCode: "16436",
};

export var userProfileUpdate = {
  firstName: "Faiz Ainur",
  lastName: "Rofiq",
  email: "fs.rofiq@gmail.com",
  gender: "Male",
  profession: "Web Developer",
  phoneNumber: "08665155775",
  photoUrl: "photoku.com",
  idCardUrl: "",
  addressLine1: "Sawangan",
  addressLine2: "",
  city: "Depok",
  province: "Jawa Barat",
  country: "Indonesia",
  postalCode: "16436",
};

export var bankAccountRegister = {
  bankName: "Bank Mandiri",
  accountNumber: "10011001011",
  description: "My personal account",
};

export var bankAccountUpdate = {
  bankAccountId: 0,
  bankName: "Bank Mandiri",
  accountNumber: "10011001011",
  description: "My personal account updated",
};

export var donationRegister = {
  title: "Skripsi 2020",
  description: "Untuk biaya skripsi 2020",
  totalNominal: 1000000,
  imageUrl: "",
  expiredDate: "2020-11-20",
};

export var donationUpdate = {
  donationId: "",
  title: "Skripsi 2020",
  description: "Untuk biaya skripsi 2020",
  totalNominal: 1000000,
  imageUrl: "",
  expiredDate: "2020-11-20",
};

export var fundDetailsRegister = {
  donationId: "",
  fundDetails: [
    {
      itemDetail: "Beli credit AWS",
      nominalDetail: 200000,
      description: "Untuk credit cloud service AWS",
    },
    {
      itemDetail: "Sewa hosting dan domain",
      nominalDetail: 300000,
      description: "Sewa hosting dan beli domain untuk website",
    },
  ],
};

export var fundDetailsUpdate = {
  fundDetailsId: 0,
  donationId: "",
  itemDetail: "Beli credit AWS",
  nominalDetail: 200000,
  description: "Untuk credit cloud service AWS",
};

export var createPayment = {
  donationId: "DN-HFJBxfoWwaVbpIqSfRQEOod4k",
  nominal: 10000,
  description: "Semangat yaa",
};
