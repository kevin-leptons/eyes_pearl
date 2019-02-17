let enabled_elem = find_id('enabled')

main().
catch(e => {
    console.error(e)
})

async function main() {
    let conf = await store.get()

    enabled_elem.checked = conf.enabled

    input_setup('enabled', 'change', async (evt) => {
        let enabled = evt.target.checked
        store.set('enabled', enabled)
    })
}
