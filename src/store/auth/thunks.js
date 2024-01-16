import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from '../../firebase/providers';
import { clearNotesLogout } from '../journal/journalSlice';
import { checkingCredentials, login, logout } from './';


export const checkingAuthentication = () => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );
    }
}


export const startGoogleSignIn = () => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const resp = await signInWithGoogle();
        if( !resp.ok ) return dispatch( logout( resp.errorMessage ) );
        
        dispatch( login( resp ) );
    }
}


export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {

    return async( dispatch ) => {
        dispatch(checkingCredentials() );

        const resp = await registerUserWithEmailPassword({ email, password, displayName });
        if( !resp.ok ) return dispatch( logout( resp.errorMessage ) );

        dispatch( login( resp ) );
    }
}

export const startLoginWithEmailPassword = ({ email, password }) => {
    return async ( dispatch ) => {
        dispatch( checkingCredentials() );

        const resp = await loginWithEmailPassword({ email, password });
        if( !resp.ok ) return dispatch( logout( resp ) );
        
        dispatch( login( resp ));
    }
}

export const startLogout = () => {
    return async( dispatch ) => {

        await logoutFirebase();
        dispatch( clearNotesLogout() );
        dispatch( logout() );
    }
}

