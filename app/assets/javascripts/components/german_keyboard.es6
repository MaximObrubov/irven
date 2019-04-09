;((w, $) => {
  class KeyboardDe {

    constructor($input) {
      this.$input = $input;
      this.specials = [
        "\u00DF", // ß
        "\u00E4", // ä
        "\u00F6", // ö
        "\u00FC", // ü
        "\u00C4", // Ä
        "\u00D6", // Ö
        "\u00DC", // Ü
      ];
    }

    init() {
      
    }
  }
})(window, jQuery);
