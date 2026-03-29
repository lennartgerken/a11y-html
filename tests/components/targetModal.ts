import { Locator } from '@playwright/test'
import { BaseComponent } from './baseComponent'

export class TargetModal extends BaseComponent {
    readonly closeButton: Locator
    readonly fullTargetPre: Locator

    constructor(locator: Locator) {
        super(locator)
        this.closeButton = locator.getByRole('button', { name: 'close' })
        this.fullTargetPre = locator.getByTestId('full-target')
    }
}
