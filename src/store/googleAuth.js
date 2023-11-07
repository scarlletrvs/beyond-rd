import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

async function handleGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const auth = getAuth();
    const result = await signInWithPopup(auth, provider);
    const photo = auth.currentUser.photoURL;
    const name = auth.currentUser.displayName;
    const userGoogle = auth.currentUser.email;
    const telefone = auth.currentUser.phoneNumber;
    const user = result.user;

   
    console.log("Usuário autenticado:", user);

    localStorage.setItem("email", user.email);
    localStorage.setItem("telefone", telefone);
    localStorage.setItem("telefone", telefone);
    localStorage.setItem("userImage", photo);
    localStorage.setItem("nome", name);
    localStorage.setItem(
      "userlocal",
      "@" + userGoogle.slice(0, userGoogle.indexOf("@"))
    );
   

    window.location.href = "/home";
    console.log('authregister',auth.currentUser); 

    
  } 
  catch (error) {
    console.error("Erro ao fazer login com o Google:", error);
  }

}

export default handleGoogle;
