;((w, $) => {
  class CardsProcessor {

    constructor(order) {
      this.storage = w.localStorage;
      this.$root = $('body .main-wrapper');
      this.$translations = this.$root.find('.translation');
      this._setOrder(order);
    }

    init() {
      this._subscribeShowTranslation();
      this._subscribeStart();
    }

    showNext() {
      this.currentCard.vanish();
      this.updateProgress();
      this.id = this.order.unshift;
    }

    _subscribeShowTranslation() {
      this.$translations.click(function (e) {
        let $this = $(this).
            FLIP_CLASS = "flip";
        $this.toggleClass(FLIP_CLASS);
      });
    }


    _setOrder(order) {
      if (typeof(Storage) == "undefined") {
        // without support will constantly update progress on reload
        // TODO: should warn user about legacy browser
        this.order = order;
      } else {
        let stored_order = this.storage.getItem("order");

        if (stored_order) {
          this.order = JSON.parse(stored_order);
        } else {
          this.storage.setItem("order", JSON.stringify(order))
          this.order = order;
        }
      }
    }

  }

  if (!w.irven) {w.irven = {}}
  w.irven.CardsProcessor = CardsProcessor;
})(window, jQuery);
