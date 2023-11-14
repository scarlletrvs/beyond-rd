import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

async function handleGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const auth = getAuth();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const { displayName, email, phoneNumber, photoURL } = auth.currentUser;

    await addUserToFirestore({
      nome: displayName,
      user:  email.slice(0, email.indexOf("@")), 
      telefone: phoneNumber || "", 
      email: email,
      dataNasc: "", 
      profileImage: photoURL
    });

    console.log("Usuário autenticado:", user);


    window.location.href = "/home";
    console.log('authregister', auth.currentUser);

  } catch (error) {
    console.error("Erro ao fazer login com o Google:", error);
  }
}

async function addUserToFirestore(userData) {
  const db = getFirestore();

  try {
    const userRef = doc(db, "users", userData.email);

    await setDoc(userRef, userData);

    console.log("Documento adicionado com ID: ", userData.email);
  } catch (e) {
    console.error("Erro ao adicionar usuário ao Firestore: ", e);
  }
}

export default handleGoogle;
