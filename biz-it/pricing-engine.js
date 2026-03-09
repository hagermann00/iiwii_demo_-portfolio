/**
 * Biz-IT Autonomous Pricing Engine
 * Calculates itemized and total costs based on catalog products and dynamic multipliers.
 */

class PricingEngine {
    constructor(catalog) {
        this.catalog = catalog;
    }

    /**
     * Calculate price for a specific product item.
     * @param {string} productId - The ID of the product from the catalog.
     * @param {Object} selectedMultipliers - Key-value pairs of multiplier names and their toggled state (boolean or numeric level).
     * @returns {Object} - Object containing basePrice, adjustment, and finalPrice.
     */
    calculateItemPrice(productId, selectedMultipliers = {}) {
        const product = this.catalog.find(p => p.id === productId);
        if (!product) throw new Error(`Product ${productId} not found in catalog.`);

        let adjustmentFactor = 1.0;
        const appliedMultipliers = [];

        for (const [key, value] of Object.entries(selectedMultipliers)) {
            if (product.multipliers && product.multipliers[key] && value) {
                // If value is boolean true, use the default multiplier
                // If value is a number, we could potentially scale it, but for now we use the fixed rate
                const rate = product.multipliers[key];
                adjustmentFactor *= rate;
                appliedMultipliers.push({ name: key, rate });
            }
        }

        const finalPrice = Math.round(product.basePrice * adjustmentFactor);

        return {
            id: product.id,
            name: product.name,
            basePrice: product.basePrice,
            adjustmentFactor: adjustmentFactor.toFixed(2),
            finalPrice: finalPrice,
            appliedMultipliers
        };
    }

    /**
     * Calculate total for a bundle of selected items.
     * @param {Array} selections - Array of { productId, multipliers }
     * @returns {Object} - Total breakdown.
     */
    calculateTotal(selections) {
        const items = selections.map(s => this.calculateItemPrice(s.productId, s.multipliers));
        const total = items.reduce((sum, item) => sum + item.finalPrice, 0);

        return {
            items,
            total,
            currency: "USD",
            generatedAt: new Date().toISOString()
        };
    }
}

// Export for use in dashboard
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PricingEngine;
} else {
    window.PricingEngine = PricingEngine;
}
