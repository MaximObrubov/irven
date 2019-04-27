;((w, $) => {
  class KeyboardDe {

    constructor($parent) {
      this.KLASS = "irven-keyboard";
      this.$parent = $parent;
      this.specials = {
        estset:  {
          symbol: "\u00DF",
          key: 83
        }, // ß
        aUmlaut: {
          symbol: "\u00E4",
          key: 65
        }, // ä
        oUmlaut: {
          symbol: "\u00F6",
          key: 79
        }, // ö
        uUmlaut: {
          symbol: "\u00FC",
          key: 85
        }, // ü
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
      $main.append($keysblock).appendTo(self.$parent);
    }

    subscribe($input) {
      for (let [key, spec] of Object.entries(this.specials)) {
        spec.btn.on("mousedown", function (e) {
          $input.val($input.val() + spec.symbol);
          setTimeout(function() {$input.focus();}, 0)
        });
        $input.on("keydown", function (e) {
          if (e.shiftKey && e.keyCode == spec.key) {
            e.preventDefault();
            $input.val($input.val() + spec.symbol);
          }
        });
      }
    }


    unsubscribe($input) {
      for (let [key, spec] of Object.entries(this.specials)) {
        $input.off("keydown");
        spec.btn.off("mousedown");
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
