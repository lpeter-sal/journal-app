import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures";


describe('Pruebas en el authSlice', () => { 
    
    test('Debe de regresar el estado inicial y llamarse auth', () => { 
        const state = authSlice.reducer( initialState, {} );
        
        expect( state ).toEqual( initialState );
        expect( authSlice.name).toBe('auth');
    });

    test('Debe de realizar la autentificacion', () => { 
        const state = authSlice.reducer( initialState, login( demoUser ) );

        expect( state ).toEqual({
            status: 'authenticated',
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null,
        });
    });

    test('Debe de realizar el logout', () => { 
        const state = authSlice.reducer(authenticatedState, logout() );
        
        expect( state ).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined,
        });
    });


    test('Debe de realizar el logout con argumentos', () => { 
        const errorMessage = 'Credenciales no son correctas';
        const state = authSlice.reducer(authenticatedState, logout({ errorMessage: errorMessage}) );
        
        expect( state ).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage,
        });
    });


    test('Debe de cambiar el estado a checking', () => { 

        const state = authSlice.reducer( authenticatedState, checkingCredentials() );
        expect( state.status ).toBe('checking');
    });

});