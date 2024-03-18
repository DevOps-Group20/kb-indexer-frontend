import {getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {router} from "@/router";
import {defaultToast} from "@/utils/toast";


export const firebaseLogin = async (username: string, password: string) => {
  const auth = getAuth();
  try {
    await signInWithEmailAndPassword(auth, username, password)
    await router.push('/');
  } catch (error) {
    console.log(error);
    defaultToast('Invalid Credentials');
  }
};

export const firebaseLogout = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
    await router.push('/login')
  } catch (error) {
    console.error(error);
    defaultToast('Failed to Log Out');
  }
};

export const getBearerTokenHeader = async () => {
  const user = getAuth().currentUser;
  return user ? 'Bearer ' +  await user.getIdToken() : 'Bearer x';
}
