# a11y-html

Takes axe-core results and creates an html report:

```
import type { Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { createReport } from 'a11y-html'

const analyze = async (page: Page) => {

    const axeBuilder = new AxeBuilder({ page })
    const results = await axeBuilder.analyze()

    const report = createReport(results)

    await test.info().attach('a11y-html', { body: report, contentType: 'text/html' })

}
```

## License

This package is licensed under the [MIT License](./LICENSE).

It also includes third-party dependencies that are either used for type imports or bundled into the generated HTML report. These dependencies are subject to their own licenses.

For a full list of third-party licenses, see [LICENSES-THIRD-PARTY.txt](./LICENSES-THIRD-PARTY.txt).
