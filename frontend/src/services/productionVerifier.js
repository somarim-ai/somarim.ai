
// Production check
class ProductionVerifier {
    async checkProductionStatus() {
        const response = await fetch('/api');
        return response.ok;
    }
}

export default new ProductionVerifier();
