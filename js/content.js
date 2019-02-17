main().
catch(e => {
    console.log(e);
})

async function main() {
    let conf = await store.get()

    if (conf.enabled) {
        set_root_css(conf)
        override_css(conf)
    }
}

function dom_walk(root, callback) {
    callback(root)

    for (let i = 0; i < root.children.length; ++i) {
        dom_walk(root.children[i], callback)
    }
}

function override_css(conf) {
    dom_walk(document.body, (elem) => {
        let bg_img = elem.style.getPropertyValue('background-image')
        if (bg_img) {
            elem.style.setProperty('background-color', conf.bg_color, 'important')
        } else {
            elem.style.setProperty('background', conf.bg_color, 'important')
        }

        if (elem.tagName.toLowerCase() !== 'a') {
            elem.style.setProperty('color', conf.fg_color, 'important')
        } else {
            elem.style.setProperty('color', conf.pm_color, 'important')
        }
    })
}

function set_root_css(conf) {
    let root = document.documentElement

    root.style.setProperty('--bg-color', conf.bg_color)
    root.style.setProperty('--fg-color', conf.fg_color)
    root.style.setProperty('--pm-color', conf.pm_color)
}
