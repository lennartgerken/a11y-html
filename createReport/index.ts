import type { AxeResults } from 'axe-core'
import report from './html/index.html?raw'

export default function createReport(results: AxeResults) {
    return `${report}<script>window.axeResults="${Buffer.from(JSON.stringify(results)).toString('base64')}"</script>`
}
