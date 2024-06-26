import {getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {router} from "@/router";
import {displayToast} from "@/utils/toast";


export const firebaseLogin = async (username: string, password: string) => {
  const auth = getAuth();
  try {
    await signInWithEmailAndPassword(auth, username, password)
    await router.push('/');
  } catch (error) {
    console.log(error);
    displayToast('Invalid Credentials');
  }
};

export const firebaseLogout = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
    await router.push('/login')
  } catch (error) {
    console.error(error);
    displayToast('Failed to Log Out');
  }
};

export const getBearerTokenHeader = async () => {
  const user = getAuth().currentUser;
  return user ? 'Bearer ' +  await user.getIdToken() : 'Bearer x';
}
