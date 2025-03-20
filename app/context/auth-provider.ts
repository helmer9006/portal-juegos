'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
    PublicClientApplication,
    InteractionRequiredAuthError,
    AccountInfo,
    IPublicClientApplication,
    EventType,
    AuthenticationResult
} from "@azure/msal-browser";
import { msalConfig, loginRequest } from "../config/auth-config";

interface AuthContextType {
    msalInstance: IPublicClientApplication | null;
    account: AccountInfo | null;
    isAuthenticated: boolean;
    isInitialized: boolean;
    login: (redirectPath?: string) => Promise<void>;
    logout: () => Promise<void>;
    acquireToken: () => Promise<string | null>;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

// 🔄 Crear la instancia de MSAL afuera para reutilizarla
const msalInstance = new PublicClientApplication(msalConfig);

export function AuthProvider({ children }: AuthProviderProps) {
    const [account, setAccount] = useState<AccountInfo | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isInitialized, setIsInitialized] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true); // 🆕 Manejo de carga

    // 🆕 useEffect para inicializar MSAL y manejar eventos
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                console.log("Iniciando MSAL...");
                await msalInstance.initialize();

                const res = await msalInstance.handleRedirectPromise();
                console.log("handleRedirectPromise result:", res);

                if (res?.account) {
                    msalInstance.setActiveAccount(res.account);
                    setAccount(res.account);
                    setIsAuthenticated(true);
                } else {
                    const accounts = msalInstance.getAllAccounts();
                    if (accounts.length > 0) {
                        msalInstance.setActiveAccount(accounts[0]);
                        setAccount(accounts[0]);
                        setIsAuthenticated(true);
                    } else {
                        setIsAuthenticated(false);
                    }
                }

                // 🆕 Agregar evento para LOGIN_SUCCESS
                msalInstance.addEventCallback((event) => {
                    if (event.eventType === EventType.LOGIN_SUCCESS) {
                        const authResult = event.payload as AuthenticationResult;
                        if (authResult?.account) {
                            msalInstance.setActiveAccount(authResult.account);
                            setAccount(authResult.account);
                            setIsAuthenticated(true);
                        }
                    }
                });

                setIsInitialized(true);
            } catch (err) {
                console.error("Error durante la inicialización:", err);
            } finally {
                setIsLoading(false); // 🆕 Finalizar carga aquí
            }
        };

        initializeAuth();
    }, []);

    useEffect(() => {
        const validateToken = async () => {
            if (isAuthenticated && msalInstance) {
                console.warn("Validando token...");
                const token = await acquireToken();
                if (!token) {
                    console.warn("Token inválido o sesión expirada.");
                    await login(); // Redirigir al login si el token no es válido
                } else {
                    console.log("Token válido.");
                }
            }
        };

        validateToken();
    }, [isAuthenticated]);

    const login = async (redirectPath?: string): Promise<void> => {
        console.warn("Iniciando login...");
        if (!isInitialized || isLoading) {
            console.log("MSAL no inicializado o cargando, abortando login...");
            return;
        }

        try {
            const pathToSave = redirectPath || window.location.pathname;
            sessionStorage.setItem("redirectPath", pathToSave);

            const currentAccount = msalInstance.getActiveAccount();
            if (currentAccount) {
                console.log("Usuario ya autenticado.");
                setIsAuthenticated(true);
                return;
            }

            await msalInstance.loginRedirect({
                ...loginRequest,
                redirectUri: window.location.origin
            });
        } catch (error) {
            console.error("Error durante el login:", error);
        }
    };

    const logout = async (): Promise<void> => {
        if (msalInstance && account) {
            try {
                await msalInstance.logoutRedirect({
                    account: account,
                    postLogoutRedirectUri: window.location.origin
                });
            } catch (error) {
                console.error("Error durante logout:", error);
            }
            setAccount(null);
            setIsAuthenticated(false);
        }
    };

    // Función corregida para verificar si el token ha expirado
    const isSessionExpired = async (): Promise<boolean> => {
        const account = msalInstance.getActiveAccount();
        if (!account) return true; // No hay cuenta activa, sesión expirada.

        try {
            const response = await msalInstance.acquireTokenSilent({
                ...loginRequest,
                account: account
            });
            const idTokenClaims = response.idTokenClaims as { exp?: number } | undefined;
            if (!idTokenClaims?.exp) return true; // No hay información de expiración.

            const now = Math.floor(Date.now() / 1000);
            return idTokenClaims.exp < now; // Sesión expirada si exp < ahora.
        } catch (error) {
            console.warn("Error obteniendo token en isSessionExpired:", error);
            return true; // Si hay error, asumir sesión expirada.
        }
    };


    const acquireToken = async (): Promise<string | null> => {
        if (!msalInstance || !account) return null;

        // 🆕 Verificar si la sesión está expirada antes de adquirir un token
        const sessionExpired = await isSessionExpired();
        if (sessionExpired) {
            console.warn("Sesión expirada, redireccionando a login...");
            await login(); // Redirigir a login si la sesión está expirada
            return null;
        }

        try {
            const response = await msalInstance.acquireTokenSilent({
                ...loginRequest,
                account: account
            });
            return response.accessToken ? response.accessToken : response.idToken;
        } catch (error) {
            if (error instanceof InteractionRequiredAuthError) {
                try {
                    await msalInstance.acquireTokenRedirect(loginRequest);
                } catch (redirectError) {
                    console.error("Error durante adquisición de token:", redirectError);
                }
            } else {
                console.error("Error al adquirir token:", error);
            }
        }
        return null;
    };


    const contextValue: AuthContextType = {
        msalInstance,
        account,
        isAuthenticated,
        isInitialized,
        login,
        logout,
        acquireToken,
        setIsAuthenticated,
        isLoading
    };

    return React.createElement(
        AuthContext.Provider,
        { value: contextValue },
        children
    );
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};
