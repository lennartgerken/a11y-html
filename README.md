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
import { createReport } from 'a11y-html'

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

You can pass additional options to customize the html report:

| Option           | Usage                                                    |
| ---------------- | -------------------------------------------------------- |
| title            | Sets the html title.                                     |
| heading          | Sets the heading of the report.                          |
| info             | Sets an additional info under the url.                   |
| switchInfo       | Swaps the position of info and url, if info is provided. |
| screenshot       | Displays an image in the report.                         |
| hideInapplicable | Hides all results of type `"inapplicable"`.              |

## Merged Report

Multiple results can be merged into one report using `createMergedReport`. Each result can be passed with an info string that is displayed on the overview page:

```
createMergedReport([
    { results: results1, info: 'Info 1' },
    { results: results2, info: 'Info 2' },
    results3
])
```

## License

This package is licensed under the [MIT License](./LICENSE).

It also includes third-party dependencies that are either used for type imports or bundled into the generated html report. These dependencies are subject to their own licenses.

For a full list of third-party licenses, see [LICENSES-THIRD-PARTY.txt](./LICENSES-THIRD-PARTY.txt).
