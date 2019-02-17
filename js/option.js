let sync_elem = find_id('sync-label')

const sync = {
    begin: () => {
        sync_elem.style.display = 'block'
    },
    end: () => {
        sync_elem.style.display = 'none'
    }
}

main().
catch(e => {
    console.error(e)
})

async function main() {
    sync.begin()

    let bg_color_elem = find_id('bg-color')
    let fg_color_elem = find_id('fg-color')
    let pm_color_elem = find_id('pm-color')
    let conf = await store.get()

    bg_color_elem.value = conf.bg_color
    fg_color_elem.value = conf.fg_color
    pm_color_elem.value = conf.pm_color

    sync.end()

    input_setup('bg-color', 'change', async (e) => {
        sync.begin()

        let color = e.target.value
        await store.set('bg_color', color)

        sync.end()
    })
    input_setup('fg-color', 'change', async (e) => {
        sync.begin()

        let color = e.target.value
        await store.set('fg_color', color)

        sync.end()
    })
    input_setup('pm-color', 'change', async (e) => {
        sync.begin()

        let color = e.target.value
        await store.set('pm_color', color)

        sync.end()
    })
}
