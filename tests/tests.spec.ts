import { Browser, expect, type Page, test } from '@playwright/test'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createReport, createMergedReport } from '@createReport'
import { writeFileSync } from 'fs'
import AxeBuilder from '@axe-core/playwright'
import type axe from 'axe-core'
import { A11yPage } from '@/a11yPage.js'
import { TestsOverview } from './components/resultsOverview/testsOverview/testsOverview.js'
import { ResultsOverview } from './components/resultsOverview/resultsOverview.js'
import { ResultItem } from './components/resultsOverview/resultItem.js'

const currentPath = dirname(fileURLToPath(import.meta.url))
const sourcePath = 'file:///' + join(currentPath, 'index1.html')
let results: axe.AxeResults

test.beforeAll(async ({ browser }) => {
    results = await getAxeResults(browser, sourcePath)
})

let a11yPage: A11yPage
let testsOverview: TestsOverview

test.beforeEach(({ page }) => {
    a11yPage = new A11yPage(page)
    testsOverview = a11yPage.resultsOverview.testsOverview
})

test.describe('single report', () => {
    test.describe(() => {
        let outputPath: string

        // eslint-disable-next-line no-empty-pattern
        test.beforeAll(async ({}, testInfo) => {
            outputPath = testInfo.outputPath('a11y-html.html')
            writeFileSync(outputPath, createReport(results))
        })

        test.beforeEach(async ({ page }) => {
            await page.goto('file:///' + outputPath)
        })

        test.describe(() => {
            test.use({ locale: 'de-DE' })

            test('has meta', async () => {
                await expect(testsOverview.infoBar.urlDiv).toHaveText(
                    results.url
                )

                const timestampFormated = new Intl.DateTimeFormat('de-DE', {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                }).format(new Date(results.timestamp))
                await expect(testsOverview.infoBar.timestampDiv).toHaveText(
                    timestampFormated
                )
            })
        })

        test('show details', async () => {
            const labelResultID = 'label'
            const labelResults = results.violations.find(
                ({ id }) => id === labelResultID
            )
            const labelItem = testsOverview.getTestsItem(labelResultID)

            await test.step('row', async () => {
                await expect(labelItem.headerDiv).toHaveText(labelResults.id)
                await expect(
                    labelItem.resultDiv.getByTestId('tag-error')
                ).toBeVisible()
                await expect(labelItem.descriptionDiv).toHaveText(
                    labelResults.description
                )
            })

            await test.step('details', async () => {
                const details = labelItem.details

                await labelItem.openButton.click()

                await expect(details.headerDiv).toHaveText(labelResults.id)
                await expect(
                    details.resultDiv.getByTestId('tag-error')
                ).toBeVisible()
                await expect(details.descriptionSpan).toHaveText(
                    labelResults.description
                )
                await expect(details.helpSpan).toHaveText(labelResults.help)
                await expect(details.urlA).toHaveText(labelResults.helpUrl)

                await test.step('tags', async () => {
                    for (const currentTagResult of labelResults.tags)
                        await expect(
                            details.allTagDivs.getByText(currentTagResult, {
                                exact: true
                            })
                        ).toBeVisible()

                    await expect(details.allTagDivs).toHaveCount(
                        labelResults.tags.length
                    )
                })

                await test.step('nodes', async () => {
                    for (const [
                        index,
                        currentNodeResult
                    ] of labelResults.nodes.entries()) {
                        const currentElement = details.getHTMLElement(
                            currentNodeResult.html
                        )

                        await test.step('rules', async () => {
                            if (index > 0) currentElement.openButton.click()

                            for (const currentRuleResult of currentNodeResult.any) {
                                const currentRule = currentElement.getRule(
                                    currentRuleResult.id
                                )

                                await expect(currentRule.headerDiv).toHaveText(
                                    currentRuleResult.id
                                )
                                await expect(currentRule.typeDiv).toHaveText(
                                    'any'
                                )
                                await expect(currentRule.impactDiv).toHaveText(
                                    currentRuleResult.impact
                                )
                                await expect(
                                    currentRule.descriptionDiv
                                ).toHaveText(currentRuleResult.message)
                            }

                            await expect(
                                currentElement.allAnyRuleDivs
                            ).toHaveCount(currentNodeResult.any.length)
                        })
                    }

                    await expect(details.allElementDivs).toHaveCount(
                        labelResults.nodes.length
                    )
                })
            })
        })

        test.describe('filter', () => {
            //Violations
            const hasLangResultID = 'html-has-lang'
            const regionResultID = 'region'
            //Passed
            const documentTiltleResultID = 'document-title'
            //Incomplete
            const ariaValidResultID = 'aria-valid-attr-value'
            //Inapplicable
            const ariaHiddenResultID = 'aria-hidden-focus'

            test('search', async () => {
                await testsOverview.navBar.searchInput.fill(hasLangResultID)
                await expect(
                    testsOverview.getTestsItem(hasLangResultID).locator
                ).toBeVisible()
                await expect(testsOverview.allItemDivs).toHaveCount(1)
            })

            test('result', async () => {
                await testsOverview.navBar.filterSelect.selectOption(
                    'violations'
                )
                await expect(
                    testsOverview.getTestsItem(hasLangResultID).locator
                ).toBeVisible()
                await expect(
                    testsOverview.getTestsItem(regionResultID).locator
                ).toBeVisible()
                await expect(
                    testsOverview.getTestsItem(documentTiltleResultID).locator
                ).toBeHidden()
                await expect(
                    testsOverview.getTestsItem(ariaValidResultID).locator
                ).toBeHidden()
                await expect(
                    testsOverview.getTestsItem(ariaHiddenResultID).locator
                ).toBeHidden()
            })

            test('tags', async () => {
                const tagsComponent = testsOverview.navBar.tags

                await tagsComponent.openButton.click()
                await tagsComponent.dropdown.allButton.click()
                await expect(testsOverview.allItemDivs).toBeHidden()
                await tagsComponent.dropdown.checkEntry('cat.language')
                await expect(
                    testsOverview.getTestsItem(hasLangResultID).locator
                ).toBeVisible()
                await expect(
                    testsOverview.getTestsItem(regionResultID).locator
                ).toBeHidden()
            })
        })

        test('a11y', async ({ page }, testInfo) => {
            const labelResultID = 'label'

            await testsOverview.getTestsItem(labelResultID).openButton.click()
            await testsOverview.navBar.tags.openButton.click()

            const results = await new AxeBuilder({ page })
                .disableRules('label-title-only')
                .analyze()

            await testInfo.attach('a11y-html.html', {
                body: createReport(results),
                contentType: 'application/octet-stream'
            })
            expect(results.violations).toStrictEqual([])
        })
    })

    test.describe('options', async () => {
        const imageAltResultID = 'image-alt'

        const openReportWithOptions = async (page: Page, options = {}) => {
            const outputPath = test.info().outputPath('a11y-html.html')

            writeFileSync(outputPath, createReport(results, options))
            await page.goto('file:///' + outputPath)
        }

        test('disable all', async ({ page }) => {
            await openReportWithOptions(page)

            await expect(page).toHaveTitle('a11y-html')
            await expect(a11yPage.headingH1).toHaveText('Accessibility Report')
            await expect(testsOverview.infoBar.infoDiv).toBeHidden()
            await expect(
                testsOverview.getTestsItem(imageAltResultID).locator
            ).toBeVisible()
        })

        test('title', async ({ page }) => {
            const title = 'Test Title'

            await openReportWithOptions(page, { title })
            await expect(page).toHaveTitle(title)
        })

        test('heading', async ({ page }) => {
            const heading = 'Test Heading'

            await openReportWithOptions(page, { heading })
            await expect(a11yPage.headingH1).toHaveText(heading)
        })

        test('info', async ({ page }) => {
            const info = 'Test Info'

            await openReportWithOptions(page, { info })
            await expect(testsOverview.infoBar.infoDiv).toHaveText(info)
        })

        test('hide inapplicable', async ({ page }) => {
            await openReportWithOptions(page, { hideInapplicable: true })
            await expect(
                testsOverview.getTestsItem(imageAltResultID).locator
            ).toBeHidden()
        })

        test('screenshot', async ({ page }) => {
            await page.goto(sourcePath)
            const screenshot = await page.screenshot()
            const mimeType = 'image/png'

            await openReportWithOptions(page, {
                screenshot: { data: screenshot, mimeType }
            })

            await testsOverview.openScreenshotButton.click()
            expect(testsOverview.screenshotImg).toHaveAttribute(
                'src',
                `data:${mimeType};base64,${screenshot.toString('base64')}`
            )
        })
    })

    test('open by upload', async ({ page }) => {
        await page.goto(
            'file:///' +
                join(currentPath, '..', 'createReport', 'html', 'index.html')
        )

        const fileChooserPromise = page.waitForEvent('filechooser')
        await page.getByTitle('Upload results').click()
        await (
            await fileChooserPromise
        ).setFiles({
            name: 'results.json',
            buffer: Buffer.from(JSON.stringify(results)),
            mimeType: 'text/json'
        })

        await expect(testsOverview.navBar.locator).toBeVisible()
    })
})

test.describe('merged report', () => {
    let results2: axe.AxeResults
    let outputPathMergedReport: string
    const info = 'Test Info'

    test.beforeAll(async ({ browser }, testInfo) => {
        results2 = await getAxeResults(
            browser,
            'file:///' + join(currentPath, 'index2.html')
        )

        outputPathMergedReport = testInfo.outputPath('a11y-html-merged.html')
        writeFileSync(
            outputPathMergedReport,
            createMergedReport([results, { results: results2, info }])
        )
    })

    let resultsOverview: ResultsOverview
    let resultItem1: ResultItem
    let resultItem2: ResultItem

    test.beforeEach(async ({ page }) => {
        resultsOverview = a11yPage.resultsOverview
        resultItem1 = resultsOverview.getResultItem(results.url)
        resultItem2 = resultsOverview.getResultItem(results2.url)
        await page.goto('file:///' + outputPathMergedReport)
    })

    test.describe('filter', () => {
        test.describe('search', () => {
            test('url', async () => {
                await resultsOverview.navBar.searchInput.fill(results.url)
                await expect(resultItem1.locator).toBeVisible()
                await expect(resultItem2.locator).toBeHidden()
            })
            test('info', async () => {
                await resultsOverview.navBar.searchInput.fill(info)
                await expect(resultItem2.locator).toBeVisible()
                await expect(resultItem1.locator).toBeHidden()
            })
        })
        test('result', async () => {
            await resultsOverview.navBar.filterSelect.selectOption('violations')
            await expect(resultItem1.locator).toBeVisible()
            await expect(resultItem2.locator).toBeHidden()
        })
    })

    test('open and close entry', async () => {
        const testItem = testsOverview.getTestsItem('html-has-lang')

        await resultItem1.urlButton.click()
        await expect(testItem.locator).toBeVisible()
        await expect(resultItem1.locator).toBeHidden()
        await resultsOverview.backButton.click()
        await expect(testItem.locator).toBeHidden()
        await expect(resultItem1.locator).toBeVisible()
    })

    test('show info', async () => {
        await expect(resultItem1.infoDiv).toBeHidden()
        await expect(resultItem2.infoDiv).toHaveText(info)
    })

    test('a11y', async ({ page }, testInfo) => {
        const results = await new AxeBuilder({ page })
            .disableRules('label-title-only')
            .analyze()

        await testInfo.attach('a11y-html.html', {
            body: createReport(results),
            contentType: 'application/octet-stream'
        })
        expect(results.violations).toStrictEqual([])
    })
})

const getAxeResults = async (browser: Browser, path: string) => {
    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto(path)
    const results = await new AxeBuilder({ page }).analyze()

    await context.close()

    return results
}
