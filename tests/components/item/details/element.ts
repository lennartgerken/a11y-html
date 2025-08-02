import { Locator } from '@playwright/test'
import { BaseComponent } from '../../baseComponent.js'
import { Rule } from './rule.js'

export class Element extends BaseComponent {

    readonly htmlCode: Locator
    readonly allAnyRuleDivs: Locator

    constructor(locator: Locator) {

        super(locator)

        this.htmlCode = locator.getByTestId('html')
        this.allAnyRuleDivs = locator.getByTestId(/rule/).filter({
            has: this.locator.page().getByTestId('rule-type').getByText('any')
        })

    }

    getRule(id: string) {

        return new Rule(this.locator.getByTestId('rule-' + id))

    }

}