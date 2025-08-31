import { expect, type Page, test } from '@playwright/test'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createReport } from '@createReport'
import { writeFileSync } from 'fs'
import AxeBuilder from '@axe-core/playwright'
import type axe from 'axe-core'
import { A11yPage } from '@/a11yPage.js'
import { CreateReportOptions } from '@options'

let currentPath: string
let results: axe.AxeResults

test.beforeAll(async ({ browser }) => {
    currentPath = dirname(fileURLToPath(import.meta.url))

    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto('file:///' + join(currentPath, 'index.html'))
    results = await new AxeBuilder({ page }).analyze()

    await context.close()
})

let a11yPage: A11yPage

test.beforeEach(({ page }) => (a11yPage = new A11yPage(page)))

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
            await expect(a11yPage.infoBar.urlDiv).toHaveText(results.url)

            const timestampFormated = new Intl.DateTimeFormat('de-DE', {
                dateStyle: 'medium',
                timeStyle: 'short'
            }).format(new Date(results.timestamp))
            await expect(a11yPage.infoBar.timestampDiv).toHaveText(
                timestampFormated
            )
        })
    })

    test('show details', async () => {
        const labelResultID = 'label'
        const labelResults = results.violations.find(
            ({ id }) => id === labelResultID
        )
        const labelItem = a11yPage.getItem(labelResultID)

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
                for (const currentNodeResult of labelResults.nodes) {
                    const currentElement = details.getElement(
                        currentNodeResult.html
                    )

                    await test.step('rules', async () => {
                        for (const currentRuleResult of currentNodeResult.any) {
                            const currentRule = currentElement.getRule(
                                currentRuleResult.id
                            )

                            await expect(currentRule.headerDiv).toHaveText(
                                currentRuleResult.id
                            )
                            await expect(currentRule.typeDiv).toHaveText('any')
                            await expect(currentRule.impactDiv).toHaveText(
                                currentRuleResult.impact
                            )
                            await expect(currentRule.descriptionDiv).toHaveText(
                                currentRuleResult.message
                            )
                        }

                        await expect(currentElement.allAnyRuleDivs).toHaveCount(
                            currentNodeResult.any.length
                        )
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
            await a11yPage.navBar.searchInput.fill(hasLangResultID)
            await expect(
                a11yPage.getItem(hasLangResultID).locator
            ).toBeVisible()
            await expect(a11yPage.allItemDivs).toHaveCount(1)
        })

        test('filter result', async () => {
            await a11yPage.navBar.filterSelect.selectOption('violations')
            await expect(
                a11yPage.getItem(hasLangResultID).locator
            ).toBeVisible()
            await expect(a11yPage.getItem(regionResultID).locator).toBeVisible()
            await expect(
                a11yPage.getItem(documentTiltleResultID).locator
            ).toBeHidden()
            await expect(
                a11yPage.getItem(ariaValidResultID).locator
            ).toBeHidden()
            await expect(
                a11yPage.getItem(ariaHiddenResultID).locator
            ).toBeHidden()
        })

        test('filter tags', async () => {
            const tagsComponent = a11yPage.navBar.tags

            await tagsComponent.openButton.click()
            await tagsComponent.dropdown.allButton.click()
            await expect(a11yPage.allItemDivs).toBeHidden()
            await tagsComponent.dropdown.checkEntry('cat.language')
            await expect(
                a11yPage.getItem(hasLangResultID).locator
            ).toBeVisible()
            await expect(a11yPage.getItem(regionResultID).locator).toBeHidden()
        })
    })

    test('a11y', async ({ page }, testInfo) => {
        const labelResultID = 'label'

        await a11yPage.getItem(labelResultID).openButton.click()
        await a11yPage.navBar.tags.openButton.click()

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

    const openReportWithOptions = async (
        page: Page,
        options?: CreateReportOptions
    ) => {
        const outputPath = test.info().outputPath('a11y-html.html')

        writeFileSync(outputPath, createReport(results, options))
        await page.goto('file:///' + outputPath)
    }

    test('disable all', async ({ page }) => {
        await openReportWithOptions(page)

        await expect(page).toHaveTitle('a11y-html')
        await expect(a11yPage.headingH1).toHaveText('Accessibility Report')
        await expect(a11yPage.infoBar.infoDiv).toBeHidden()
        await expect(a11yPage.getItem(imageAltResultID).locator).toBeVisible()
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
        await expect(a11yPage.infoBar.infoDiv).toHaveText(info)
    })

    test('hide inapplicable', async ({ page }) => {
        await openReportWithOptions(page, { hideInapplicable: true })
        await expect(a11yPage.getItem(imageAltResultID).locator).toBeHidden()
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

    await expect(page.locator('nav')).toBeVisible()
})
