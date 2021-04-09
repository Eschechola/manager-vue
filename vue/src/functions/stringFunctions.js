class StringFunctions{
    capitalize() {
        return this.charAt(0) + this.slice(1).toLowerCase();
    }
}

export default new StringFunctions();