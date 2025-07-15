# a11y-html
Takes axe-core results and creates html report:
```
import type { Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { createReport } from 'a11y-html'

const analyze = async (page: Page) => {

    const axeBuilder = new AxeBuilder({ page })
    const results = await axeBuilder.analyze()

    const report = createReport(results)
    
    test.info().attach('a11y-html', { body: report, contentType: 'text/html' })

}
```
