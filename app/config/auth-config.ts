import { Configuration, LogLevel } from "@azure/msal-browser";

// Configuración de MSAL
export const msalConfig: Configuration = {
    auth: {
        clientId: "be18d53c-d696-4ef4-a97c-8b0e87923f7c", // Reemplaza con tu Client ID
        authority: "https://fundaciongruposocial1B2Cpoc.b2clogin.com/fundaciongruposocial1B2Cpoc.onmicrosoft.com/B2C_1_sales-qa-signin",
        knownAuthorities: ["https://fundaciongruposocial1B2Cpoc.b2clogin.com"], // Dominio de tu tenant
        redirectUri: "http://localhost:3000",
        postLogoutRedirectUri: "http://localhost:3000/",
        navigateToLoginRequestUrl: true // Importante: deshabilitar navegación automática
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: true
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) return;
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        break;
                    case LogLevel.Info:
                        console.info(message);
                        break;
                    case LogLevel.Verbose:
                        console.debug(message);
                        break;
                    case LogLevel.Warning:
                        console.warn(message);
                        break;
                    default:
                        break;
                }
            },
            logLevel: LogLevel.Verbose,
        }
    }
};

// Configuración para solicitud de login
export const loginRequest = {
    scopes: ["openid", "profile", "email"] // Ajustar según tus necesidades
};