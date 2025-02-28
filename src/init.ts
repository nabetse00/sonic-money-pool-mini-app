import {
    backButton,
    miniApp,
    setDebug,
    init as initSDK,
} from '@telegram-apps/sdk-react';
import { envSetup } from './config/mockEnvs'
/**
 * Initializes the application and configures its dependencies.
 */
export async function init(debug: boolean) {
    // Set @telegram-apps/sdk-react debug mode.
    setDebug(debug);
    await envSetup();
    
    // const lp = retrieveLaunchParams()

    // Initialize special event handlers for Telegram Desktop, Android, iOS, etc.
    // Also, configure the package.
    initSDK();
    // Check if all required components are supported.
    if (!backButton.isSupported() || !miniApp.isSupported()) {
        throw new Error('ERR_NOT_SUPPORTED');
    }

    // Mount all components used in the project.
    backButton.mount();
    // await miniApp.mount();
    // await themeParams.mount();
    // initData.restore();
    // await viewport.mount()
    // initData.restore();

    // viewport.bindCssVars();


    // Define components-related CSS variables.
    // miniApp.bindCssVars();
    // themeParams.bindCssVars();
}