import React, { useState, useRef, BaseSyntheticEvent } from "react";
import style from "./style.module.scss";
import { initializeApp } from "firebase/app";
import { getDatabase, set, ref as rex } from "firebase/database";
import {
  ref,
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { ClipLoader } from "react-spinners";
import Success from "@/components/Success";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const database = getDatabase(app);

const Print = () => {

  const [deliveryTime, setDeliveryTime] = useState("");
  const [printPreferences, setPrintPreferences] = useState({
    color: "bianco-e-nero",
    sides: "singolo",
  });
  const [copies, setCopies] = useState(1);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    remarks: "",
    privacyPolicyAccepted: false
  });
  const [isLoader, setLoader] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [language, setLanguage] = useState("it"); 
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [files, setFiles] = useState<File[]>([]); // Ensure the state is typed as an array of `File`

  const handleFileUpload = async (e: BaseSyntheticEvent) => {
    const allowedExtensions = [
      "docx",
      "ppt",
      "pptx",
      "doc",
      "jpeg",
      "jpg",
      "png",
      "pdf",
    ];
  
    const selectedFiles = Array.from(e.target.files as FileList);
    const filteredFiles = selectedFiles.filter((file: File) => {
      const fileExtension = file.name.split(".").pop()?.toLowerCase() || ""; // Default to an empty string
      return allowedExtensions.includes(fileExtension);
    });
  
    if (filteredFiles.length !== selectedFiles.length) {
      alert("Some files have unsupported formats. Please upload valid files.");
    }
  
    setFiles((prevFiles) => [...prevFiles, ...filteredFiles]); // This should now work without error
  };
  

  const handleInputChange = (e: BaseSyntheticEvent) => {
    const { name, value } = e.target;

    if (name === "phone" && !/^\d{0,10}$/.test(value)) {
      // Allow only numeric values and up to 10 digits
      return;
    }
  

    setUserInfo({ ...userInfo, [name]: value });
  };

  const handlePrintPreferenceChange = (e: BaseSyntheticEvent) => {
    const { name, value } = e.target;
    setPrintPreferences({ ...printPreferences, [name]: value });
  };

  const increaseCopies = () => {
    setCopies((prevCopies) => prevCopies + 1);
  };

  const decreaseCopies = () => {
    setCopies((prevCopies) => (prevCopies > 1 ? prevCopies - 1 : 1));
  };

  const deleteFile = (fileName: string) => {
    setFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((fileObj: File) => fileObj.name !== fileName);
      // Clear file input if no files remain after deletion
      if (updatedFiles.length === 0 && fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset the input
      }
      return updatedFiles;
    });
  };
  

  const resendHandler = () => {
    setSuccess(false);
    setLoader(false);
  };

  const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setLoader(true);
     // Ensure phone number is exactly 10 digits
  if (!/^\d{10}$/.test(userInfo.phone)) {
    alert("Il numero di telefono deve contenere esattamente 10 cifre.");
    setLoader(false);
    return;
  }


    if (
      files.length === 0 ||
      !userInfo.name ||
      !userInfo.phone ||
      !userInfo.address ||
      !deliveryTime
    ) {
      alert("Per favore, compila tutti i campi e carica almeno un file.");
      return;
    }

    try {
      const fileLinks = [];
      for (let i = 0; i < files.length; i++) {
        const file: File = files[i];
        const storageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        const downloadURL = await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {},
            (error) => {
              reject(error);
            },
            async () => {
              const url = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(url);
            }
          );
        });

        fileLinks.push({
          fileName: file.name,
          url: downloadURL,
        });
      }

      const newUUID = uuidv4();
      const uuid = `${userInfo.name}-${userInfo.phone}-${newUUID}`;
      set(rex(database, "users/" + uuid), {
        username: userInfo.name,
        phone: userInfo.phone,
        address: userInfo.address,
        deliveryTime: deliveryTime,
        numberOfCopies: copies,
        printPreferences: printPreferences,
        files: fileLinks,
        timestamp: new Date().toUTCString(),
        isPrinted: false,
      });

      setSuccess(true);
      setFiles([]);
      setUserInfo({
        name: "",
        email: "",
        phone: "",
        address: "",
        remarks: "",
        privacyPolicyAccepted: false
      });
      setDeliveryTime("");
      setCopies(1);
      setPrintPreferences({
        color: "bianco-e-nero",
        sides: "singolo",
      });
      if (fileInputRef.current) {
        const current = fileInputRef.current;
        current.value = "";
      }
    } catch (error) {
      alert("Invio fallito!");
    }
  };

  const labels: any = {
    it: {
      title: "Servizio di Stampa e Consegna",
      description:
        "Carica i tuoi documenti e seleziona un orario di consegna. Garantiamo consegna il giorno successivo!",
      name: "Nome:",
      phone: "Numero di telefono:",
      address: "Indirizzo di consegna:",
      uploadFiles: "Carica file:",
      printColor: "Colore di stampa:",
      printSides: "Facciate di stampa:",
      numberOfCopies: "Numero di copie:",
      selectDeliveryTime: "Seleziona orario di consegna:",
      submit: "Invia",
      success: "Invio riuscito!",
      alertFillFields:
        "Per favore, compila tutti i campi e carica almeno un file.",
      deliveryTimeOptions: {
        morning: "Mattina (9 AM - 12 PM)",
        afternoon: "Pomeriggio (12 PM - 4 PM)",
        evening: "Sera (4 PM - 7 PM)",
      },
      copyright: "Tutti i diritti riservati.",
      privacyPolicy: "Politica sulla privacy",
    },
    en: {
      title: "Print Delivery Service",
      description:
        "Upload your document(s) and select a delivery time. We ensure next-day delivery!",
      name: "Name:",
      phone: "Phone Number:",
      address: "Delivery Address:",
      uploadFiles: "Upload Files:",
      printColor: "Print Color:",
      printSides: "Print Sides:",
      numberOfCopies: "Number of Copies:",
      selectDeliveryTime: "Select Delivery Time:",
      submit: "Submit",
      success: "Submission successful!",
      alertFillFields: "Please fill all fields and upload at least one file.",
      deliveryTimeOptions: {
        morning: "Morning (9 AM - 12 PM)",
        afternoon: "Afternoon (12 PM - 4 PM)",
        evening: "Evening (4 PM - 7 PM)",
      },
      copyright: "All rights reserved.",
      privacyPolicy: "Privacy Policy",
    },
  };

  return (
    <div className={style.App}>
    <a href="https://ciaoprint.it">
  <img src="/logo.png" alt="Logo" className={style.logo} />
</a>

      <header className={style.Appheader}>
        <h1>{labels[language].title}</h1>
        <p>{labels[language].description}</p>
        <button onClick={() => setLanguage(language === "it" ? "en" : "it")}>
          Passa a {language === "it" ? "English" : "Italiano"}
        </button>
        <p></p>
      {/* New Computer Repair Button */}
      <button 
  onClick={() => window.open("https://wa.me/+393509719486", "_blank")}
  className={style.repairButton}
>
  <span className={style.animation}></span>
  {language === "it" ? "Riparazione Computer Disponibile" : "Computer Repair Available"}
</button>


      </header>
      <form className={style.formcontainer} onSubmit={handleSubmit}>
        <label>{labels[language].name}</label>
        <input
          type="text"
          name="name"
          value={userInfo.name}
          onChange={handleInputChange}
          placeholder={labels[language].name}
          required
        />

        <label>{labels[language].phone}</label>
        <input
          type="tel"
          name="phone"
          value={userInfo.phone}
          onChange={handleInputChange}
          placeholder={labels[language].phone}
          required
        />

        <label>{labels[language].address}</label>
        <textarea
          name="address"
          value={userInfo.address}
          onChange={handleInputChange}
          placeholder={labels[language].address}
          required
        />

        <label>{labels[language].uploadFiles}</label>
        <input
          type="file"
          multiple
          onChange={handleFileUpload}
          required
          ref={fileInputRef}
        />

<div className={style.fileList}>
  {files.length > 0 && (
    <ul>
      {files.map((fileObj: File, index) => (
        <li key={index}>
          {fileObj?.name} -{" "}
          <button
            type="button"
            onClick={() => deleteFile(fileObj.name)}
            className={style.buttonCancel}
          >
            Elimina
          </button>
        </li>
      ))}
    </ul>
  )}
  <p className="text-lg capitalize text-red-500">
    {files.length} file{files.length > 1 ? " caricati" : " caricato"}.
  </p>
</div>



        <label>{labels[language].printColor}</label>
        <select
          name="color"
          value={printPreferences.color}
          onChange={handlePrintPreferenceChange}
        >
          <option value="bianco-e-nero">Bianco & Nero</option>
          <option value="color">Colore</option>
        </select>

        <label>{labels[language].printSides}</label>
        <select
          name="sides"
          value={printPreferences.sides}
          onChange={handlePrintPreferenceChange}
        >
          <option value="singolo">Singolo</option>
          <option value="doppio">Doppio</option>
        </select>

        <label className={style.copyControlsTitle}>
          {labels[language].numberOfCopies}
        </label>
        <div className={style.copyControls}>
          <button type="button" onClick={decreaseCopies}>
            -
          </button>
          <span>{copies}</span>
          <button type="button" onClick={increaseCopies}>
            +
          </button>
        </div>

        <label>{labels[language].selectDeliveryTime}</label>
        <select
          value={deliveryTime}
          onChange={(e) => setDeliveryTime(e.target.value)}
          required
        >
          <option value="">
            {language === "it" ? "Seleziona..." : "Select..."}
          </option>
          <option value="morning">
            {labels[language].deliveryTimeOptions.morning}
          </option>
          <option value="afternoon">
            {labels[language].deliveryTimeOptions.afternoon}
          </option>
          <option value="evening">
            {labels[language].deliveryTimeOptions.evening}
          </option>
        </select>

        <label>
  <input
    type="checkbox"
    required
    checked={userInfo.privacyPolicyAccepted}
    onChange={(e) => setUserInfo({ ...userInfo, privacyPolicyAccepted: e.target.checked })}
  />
  <span style={{ marginLeft: "4px" }}>
    {language === "it" ? "Ho letto la " : "I have read the "}
  </span>
  <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
    {language === "it" ? "Politica sulla Privacy" : "Privacy Policy"}
  </a>
</label>

        {isSuccess ? (
          <Success resendHandler={resendHandler} />
        ) : isLoader ? (
          <ClipLoader
            className={style.loader}
            color="#008000"
            size={"50px"}
            speedMultiplier={0.8}
          />
        ) : (
          <button type="submit" className={style.submitbtn}>
            {labels[language].submit}
          </button>
        )}
      </form>

      <footer className={style.footer}>
{/* copyright */}
      <p>
      Ciao! Print    &copy; {new Date().getFullYear()} {labels[language].copyright}
      </p>

      {/* footer link */}

      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
  <a href="/privacy-policy" target="_blank" rel="noopener noreferrer"> Privacy Policy   </a>
  <a href="/about-us" target="_blank" rel="noopener noreferrer" style={{ marginRight: '20px' }}>About Us</a>
  <a href="/prices" target="_blank" rel="noopener noreferrer" style={{ marginRight: '20px' }}>Prices</a>


</div>


</footer>

    </div>
  );
};

export default Print;
