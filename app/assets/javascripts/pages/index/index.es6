;((w, $) => {
  class CardsProcessor {

    constructor(order) {
      this.localStorage = w.localStorage;

      this._setOrder(verbs);
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


    _setOrder() {
      if (typeof(Storage) !== "undefined" && localStorage.getItem("order")) {
        this.order = JSON.parse(localStorage.getItem("order"));
      } else {
        this.verbs = verbs;
      }
    }


  }
})(window, jQuery);
