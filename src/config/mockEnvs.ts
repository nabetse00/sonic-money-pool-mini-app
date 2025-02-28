import {
    mockTelegramEnv,
    isTMA,
    retrieveLaunchParams,
    emitEvent,
} from '@telegram-apps/sdk-react';


export async function envSetup() {
    if (import.meta.env.DEV) {
        console.log("Mock Envs: DEV mode detected")

        if (await isTMA('complete')) {
            console.log("TMA detected not mocking Envs")
            return;
        }

        console.log("Mock Envs: not in TMA, mocking Envs")

        try {
            sessionStorage.clear();
            retrieveLaunchParams();
        } catch (e) {

            sessionStorage.clear();
            const noInsets = {
                left: 0,
                top: 0,
                bottom: 0,
                right: 0,
            } as const;
            const themeParams = {
                accent_text_color: '#6ab2f2',
                bg_color: '#17212b',
                button_color: '#5288c1',
                button_text_color: '#ffffff',
                destructive_text_color: '#ec3942',
                header_bg_color: '#17212b',
                hint_color: '#708499',
                link_color: '#6ab3f3',
                secondary_bg_color: '#232e3c',
                section_bg_color: '#17212b',
                section_header_text_color: '#6ab3f3',
                subtitle_text_color: '#708499',
                text_color: '#f5f5f5',
            } as const;

            mockTelegramEnv({
                launchParams: {
                    tgWebAppThemeParams: themeParams,
                    tgWebAppData: new URLSearchParams([
                        ['user', JSON.stringify({
                            id: 99281932,
                            first_name: 'Andrew',
                            last_name: 'Rogue',
                            username: 'rogue',
                            language_code: 'en',
                            is_premium: true,
                            allows_write_to_pm: true,
                        })],
                        ['chat_type', 'sender'],
                        ['chat_instance', '8428209589180549439'],
                        ['hash', '89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31'],
                        ['signature', '6fbdaab833d39f54518bd5c3eb3f511d035e68cb'],
                        ['auth_date', Date.now().toString()],
                    ]),
                    tgWebAppStartParam: 'debug',
                    tgWebAppVersion: '8',
                    tgWebAppPlatform: 'tdesktop',
                },
                onEvent(e) {
                    if (e[0] === 'web_app_request_theme') {
                        return emitEvent('theme_changed', { theme_params: themeParams });
                    }
                    if (e[0] === 'web_app_request_viewport') {
                        return emitEvent('viewport_changed', {
                            height: window.innerHeight,
                            width: window.innerWidth,
                            is_expanded: true,
                            is_state_stable: true,
                        });
                    }
                    if (e[0] === 'web_app_request_content_safe_area') {
                        return emitEvent('content_safe_area_changed', noInsets);
                    }
                    if (e[0] === 'web_app_request_safe_area') {
                        return emitEvent('safe_area_changed', noInsets);
                    }
                },
            });
            console.warn(
                '⚠️ As long as the current environment was not considered as the Telegram-based one, it was mocked. Take a note, that you should not do it in production and current behavior is only specific to the development process. Environment mocking is also applied only in development mode. So, after building the application, you will not see this behavior and related warning, leading to crashing the application outside Telegram.'
            );
        }
    }
}