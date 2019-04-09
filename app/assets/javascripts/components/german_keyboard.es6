;((w, $) => {
  class KeyboardDe {

    constructor($input) {
      this.KLASS = "irven-keyboard";
      this.$root = $('body');
      this.specials = {
        estset:  {symbol: "\u00DF"}, // ß
        aUmlaut: {symbol: "\u00E4"}, // ä
        oUmlaut: {symbol: "\u00F6"}, // ö
        uUmlaut: {symbol: "\u00FC"}, // ü
      };
    }


    draw() {
      let self = this,
          $main = $(`<div class="${self.KLASS}"/>`),
          $keysblock = $(`<div class="${self.KLASS}-keysblock"/>`);

      Object.keys(this.specials).forEach(function (key) {
        let spec = self.specials[key],
            $btn = self._getButton(spec.symbol);
        $keysblock.append($btn);
        self.specials[key].btn = $btn;
      });
      $main.append($keysblock).appendTo(self.$root);
    }

    subscribe($input) {
      for (let [key, spec] of Object.entries(this.specials)) {
        spec.btn.on("mousedown", function (e) {
          $input.val($input.val() + spec.symbol);
          setTimeout(function() {$input.focus();}, 0)

        });
      }
    }


    unsubscribe($input) {
      for (let [key, spec] of Object.entries(this.specials)) {
        spec.btn.off();
      }
    }

    _getButton(symbol) {
      let key = symbol ? symbol : '',
          $btn = $(`<button class="${this.KLASS}-keysblock-key btn btn-secondary"/>`);
      $btn.append(symbol);
      return $btn;
    }
  }

  if (!w.irven) {w.irven = {}};
  w.irven.KeyboardDe = KeyboardDe;
})(window, jQuery);
