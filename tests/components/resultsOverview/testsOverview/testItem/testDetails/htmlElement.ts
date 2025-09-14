import { Locator } from '@playwright/test'
import { Rule } from './rule'
import { BaseComponent } from '@/components/baseComponent'

export class HTMLElement extends BaseComponent {
    readonly openButton: Locator
    readonly htmlCode: Locator
    readonly allAnyRuleDivs: Locator

    constructor(locator: Locator) {
        super(locator)

        this.openButton = locator.getByTestId('html-open')
        this.htmlCode = locator.getByTestId('html')
        this.allAnyRuleDivs = locator.getByTestId(/rule/).filter({
            has: this.locator.page().getByTestId('rule-type').getByText('any')
        })
    }

    getRule(id: string) {
        return new Rule(this.locator.getByTestId('rule-' + id))
    }
}
