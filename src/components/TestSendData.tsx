import { postEvent } from '@telegram-apps/bridge';

export function TestSendDataButton() {

    async function handleClick() {
        const obj = { name: "me", value: "test" }
        const value = JSON.stringify(obj)
        console.log(`test post event ${value}`)
        postEvent('web_app_data_send', { data: value })
    }

    return <>
        <button onClick={handleClick}>
            test post data
        </button>
    </>

}