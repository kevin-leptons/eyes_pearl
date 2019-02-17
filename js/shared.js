const store = {
    set: async (key, value) => {
        return new Promise((resolve, reject) => {
            let conf = {}
            conf[key] = value
            chrome.storage.sync.set(conf, () => {
                resolve()
            })
        })
    },
    get: () => {
        let keys = [
            'enabled',
            'bg_color',
            'fg_color',
            'pm_color'
        ]
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get(keys, (conf) => {
                if (conf.enabled === undefined) {
                    conf.enabled = true
                }

                conf.bg_color = conf.bg_color || '#2f3339'
                conf.fg_color = conf.fg_color || '#98a3b0'
                conf.pm_color = conf.pm_color || '#EE7600'
                resolve(conf)
            })
        })
    }
}

function find_id(id) {
    return document.getElementById(id)
}

function input_setup(id, evt, handler) {
    let elem = find_id(id)
    elem.addEventListener(evt, handler)
}
