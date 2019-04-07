;((w, $) => {
  class CardsProcessor {

    constructor(order) {
      this.storage = w.localStorage;
      this.$root = $('body .main-wrapper');
      this.$translations = this.$root.find('.translation');
      this.$progress = this.$root.find(".progress")
      this.$progressBar = this.$progress.find(".progress-bar")

      // this.storage.clear();
      this._setOrder(order);
    }

    init() {
      // TODO: now translations showed on hover
      // needs to be on click
      // this._subscribeShowTranslation();
      // this._subscribeStart();
    }

    showNext() {
      let self = this;
      if (this.$currentCard) {
        this._updateOrder();
        this.$currentCard.hide();
      }

      this.updateProgress();
      this.$currentCard = this.$root.find(`.verb-card.verb-${this.order.shift()}`);
      this.$currentCard.fadeIn(400);
      this.$checkBtn = this.$currentCard.find('.card-check');
      this.$checkBtn.on("click", function (e) {
        e.preventDefault();
        if (self._isCorrect(self.$currentCard)) {
          self.showNext();
        } else {
          console.log("not correct");
        }
      })
    }

    updateProgress() {
      this.$progressBar.width(`${parseInt(100 *(1 - this.order.length/this.count))}%`);
    }

    resetProgress() {
      this.storage.clear();
      w.location.reload(true);
    }


    _isCorrect($card) {
      let $inputs = $card.find(".answer-container input[type='text']"),
          results = [];

      $inputs.each(function (index, el) {
        let $input = $(el),
            value = el.value.trim(),
            answer = $input.data('answer').trim(),
            result = value == answer;
        result ? $input.addClass("is-valid") : $input.addClass("is-invalid");
        results.push(result)
      });
      // return results.every((res) => {res == true});
      return true;
    }


    _updateOrder() {
      if (typeof(Storage) !== "undefined") {
        this.storage.setItem("order", JSON.stringify(this.order));
      }
    }


    _setOrder(order) {
      if (typeof(Storage) == "undefined") {
        // without support will constantly update progress on reload
        // TODO: should warn user about legacy browser
        this.order = order;
      } else {
        let stored_order = this.storage.getItem("order"),
            stored_count = this.storage.getItem("count");

        if (stored_order && stored_count) {
          this.order = JSON.parse(stored_order);
          this.count = parseInt(stored_count);
        } else {
          this.storage.setItem("order", JSON.stringify(order))
          this.storage.setItem("count", order.length);
          this.order = order;
          this.count = order.length;
        }
      }
    }

  }

  if (!w.irven) {w.irven = {}}
  w.irven.CardsProcessor = CardsProcessor;
})(window, jQuery);
