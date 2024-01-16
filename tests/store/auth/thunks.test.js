import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout,  } from "../../../src/store/auth";
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword, startCreatingUserWithEmailPassword, startLogout } from "../../../src/store/auth/thunks";
import { clearNotesLogout } from "../../../src/store/journal/journalSlice";
import { demoUser } from "../../fixtures/authFixtures";


jest.mock('../../../src/firebase/providers');

describe('Pruebas en Thunks', () => { 
    
    const dispatch = jest.fn();
    beforeEach( () => jest.clearAllMocks() );
    
    test('1.0 - Debe de invocar el checkingCredentials', async() => { 
        
        await checkingAuthentication()( dispatch );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    });

    test('2.0 - startGoogleSignIn debe de llamar checkingCredentials y login', async() => { 

        const loginData = { ok:true, ...demoUser }
        await signInWithGoogle.mockResolvedValue( loginData );
        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
    });

    test('2.1 - startGoogleSignIn debe de llamar checkingCredentials y logout - Error', async() => { 

        const loginData = { ok:false, errorMessage: 'Un error en Google' }
        await signInWithGoogle.mockResolvedValue( loginData );
        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );
    });

    test('3.0 - startCreatingUserWithEmailPassword debe de simular registro - Exito', async() => { 
        
        const registerData = { ok:true, ...demoUser }
        const formData = { email: demoUser.email, password: '1234567', displayName: demoUser.displayName}

        await registerUserWithEmailPassword.mockResolvedValue( registerData );
        await startCreatingUserWithEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( registerData ) );
    });

    test('3.1 - startCreatingUserWithEmailPassword debe de simular registro - Error', async() => { 
        
        const registerData = { ok:false, errorMessage: 'Un error en el registro' }
        const formData = { email: demoUser.email, password: '1234567', displayName: demoUser.displayName}

        await registerUserWithEmailPassword.mockResolvedValue( registerData );
        await startCreatingUserWithEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( registerData.errorMessage ) );
    });


    test('4.0 - startLoginWithEmailPassword debe de llamar checkingCredentials y login - Exito', async() => { 
        const loginData = { ok:true, ...demoUser }
        const formData = { email: demoUser.email, password: '1234567'}

        await loginWithEmailPassword.mockResolvedValue( loginData );
        await startLoginWithEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
    });


    test('4.1 - startLoginWithEmailPassword debe de llamar checkingCredentials y login - Error', async() => { 
        const loginData = { ok:false, ...demoUser }
        const formData = { email: demoUser.email, password: '1234567'}

        await loginWithEmailPassword.mockResolvedValue( loginData );
        await startLoginWithEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData ) );
    });

    test('5.0 - startLogout debe de llamar logoutFirebase, clearNotes y logout', async() => { 

        await startLogout()( dispatch );

        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
        expect( dispatch ).toHaveBeenCalledWith( logout() );
        

    });


});