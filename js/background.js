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
    console.log('Begin to toggle')

    let conf = await store.get()
    conf.enabled = !conf.enabled

    store.set('enabled', conf.enabled)
    await set_icon(conf.enabled)

    console.log('End Toggle');
}

chrome.runtime.onInstalled.addListener(async () => {
    store.get().
    then(conf => {
        set_icon(conf.enabled)
    }).
    catch(e => {
        console.error(e)
    })

    chrome.browserAction.onClicked.addListener(tab => {
        toggle_enabled().
        catch(e => {
            console.error(e)
        })
    })

    chrome.tabs.onUpdated.addListener(async (id, info, tab) => {
        let conf = await store.get()
        if (!conf.enabled) {
            return
        }
        let url = new URL(tab.url)
        if (['http:', 'https:'].indexOf(url.protocol) < 0) {
            return
        }

        set_css(id, conf)
    })
})

function set_css(id, conf) {
    let cssVariables = `
        :root {
            --bg-color: ${conf.bg_color};
            --fg-color: ${conf.fg_color};
            --pm-color: ${conf.pm_color};
        }

        * {
            background-color: var(--bg-color) !important;
            color: var(--fg-color) !important;
            border-color: var(--fg-color) !important;
            outline-color: var(--fg-color) !important;
        }

        a {
            color: var(--pm-color) !important;
        }
        a:hover {
            background: var(--fg-color) !important;
            color: var(--bg-color) !important;
        }
    `
    let data = {
        code: cssVariables,
        runAt: 'document_start',
        matchAboutBlank: true,
        cssOrigin: 'user'
    }
    chrome.tabs.insertCSS(id, data)
}
