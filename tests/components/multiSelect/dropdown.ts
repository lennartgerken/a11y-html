import { Locator } from '@playwright/test'
import { BaseComponent } from '@/components/baseComponent.js'

export class Dropdown extends BaseComponent {

    readonly allButton: Locator

    constructor(locator: Locator) {

        super(locator)

        this.allButton = locator.getByRole('button', { name: 'all' })

    }

    async checkEntry(label: string) {

        await this.locator.getByRole('checkbox', { name: label }).setChecked(true)

    }

}