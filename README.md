# a11y-html

Takes axe-core results and creates an html report.

## Installation

```
npm i -D a11y-html
```

## Example Usage in Playwright

```
import AxeBuilder from '@axe-core/playwright'
import test from '@playwright/test'
import createReport from 'a11y-html'

test('analyze accessibility', async ({ page }, testInfo) => {
    const axeBuilder = new AxeBuilder({ page })

    await page.goto('[SOME URL]')
    const results = await axeBuilder.analyze()

    const report = createReport(results)

    await testInfo.attach('a11y-html.html', {
        body: report,
        contentType: 'application/octet-stream'
    })
})
```

## Options

You can pass additional options to customize the presentation of the HTML report:

| Option           | Usage                                  |
| ---------------- | -------------------------------------- |
| title            | Sets the html title.                   |
| heading          | Sets the heading of the Report.        |
| info             | Sets an aditional info under the url.  |
| hideInapplicable | Hide all results of type inapplicable. |

## License

This package is licensed under the [MIT License](./LICENSE).

It also includes third-party dependencies that are either used for type imports or bundled into the generated HTML report. These dependencies are subject to their own licenses.

For a full list of third-party licenses, see [LICENSES-THIRD-PARTY.txt](./LICENSES-THIRD-PARTY.txt).
