import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

async function handleGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const auth = getAuth();
    const result = await signInWithPopup(auth, provider);
    const photo = auth.currentUser.photoURL;
    const name = auth.currentUser.displayName;
    const userGoogle= auth.currentUser.email;
   

    const user = result.user;
    console.log('Usuário autenticado:', user);

    // Salve o email do usuário no local storage
    localStorage.setItem('email', user.email);
    localStorage.setItem('userImage', photo);
    localStorage.setItem('nome', name);
    localStorage.setItem('userlocal',('@'+userGoogle.slice(0, userGoogle.indexOf('@'))));
  
  
    window.location.href = '/home';

  } catch (error) {
    console.error('Erro ao fazer login com o Google:', error);
  }
}

export default handleGoogle;