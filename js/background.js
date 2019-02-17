async function set_icon(enabled) {
    return new Promise((resolve, reject) => {
        let data = {
            path:  enabled ? '/img/on.png' : '/img/off.png'
        }
        chrome.browserAction.setIcon(data, () => {
            resolve()
        })
    })
}

async function toggle_enabled() {
    let conf = await store.get()
    conf.enabled = !conf.enabled

    store.set('enabled', conf.enabled)
    await set_icon(conf.enabled)
}

chrome.runtime.onInstalled.addListener(async () => {
    store.get().
    then(conf => {
        set_icon(conf.enabled)
    })

    chrome.browserAction.onClicked.addListener(tab => {
        toggle_enabled().
        catch(e => {
            console.error(e)
        })
    })
})
