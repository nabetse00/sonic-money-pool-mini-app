import { postEvent } from '@telegram-apps/bridge';
import {v4 as uuidv4} from 'uuid';

export function TestSendDataButton() {

    async function handleClick() {
        // const obj = { name: "me", value: "test" }
        // const value = JSON.stringify(obj)
        // console.log(`test post event ${value}`)
        // postEvent('web_app_data_send', { data: value })
        const uuid = uuidv4()
        console.log(`test post eventcsutom method  ${uuid}`)
        postEvent('web_app_invoke_custom_method', {req_id:uuid, method:"test", params:"some params" })
    }

    return <>
        <button onClick={handleClick}>
            test post data
        </button>
    </>

}