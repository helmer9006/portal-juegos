import { Configuration, LogLevel } from "@azure/msal-browser";

// Configuración de MSAL
export const msalConfig: Configuration = {
    auth: {
        clientId: process.env.CLIENT_ID ?? '', // Reemplaza con tu Client ID
        authority: process.env.AUTHORITY,
        knownAuthorities: [process.env.KNOWN_AUTHORITIES ?? ''], // Dominio de tu tenant
        redirectUri: process.env.REDIRECT_URI,
        postLogoutRedirectUri: process.env.REDIRECT_URI,
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