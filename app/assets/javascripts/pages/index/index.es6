;((w, $) => {
  class CardsProcessor {

    constructor(order) {
      this.storage = w.localStorage;
      this.$root = $('body .main-wrapper');
      this.$cardsContainer = this.$root.find(".cards");
      this.$translations = this.$root.find('.translation');
      this.$progress = this.$root.find(".progress");
      this.$progressBar = this.$progress.find(".progress-bar");

      if (!w.irven.KeyboardDe) {
        throw "German keyboard not loaded";
      }
      this.keyboard = new w.irven.KeyboardDe(this.$cardsContainer);
      this._setOrder(order);
    }

    init() {
      this.keyboard.draw();
      this.updateProgress();
      // TODO: now translations showed on hover
      // needs to be on click
      // this._subscribeShowTranslation();
      // this._subscribeStart();
    }

    showNext() {
      let self = this,
          nextId = this.order.shift();
      this.$currentCard = this.$root.find(`.verb-card.verb-${nextId}`);
      this.$currentCard.fadeIn(400);
      this.$checkBtn = this.$currentCard.find('.card-check');

      let $inputs = this.$currentCard.find(".answer-container input[type='text']");

      $inputs.focus(function (event) {
        let $input = $(this);
        self.keyboard.unsubscribe($input);
        self.keyboard.subscribe($input);
      });

      $inputs.on("keyup", function (e) {
        if (event.keyCode === 13) {
          event.preventDefault();
          self.check($inputs);
        }
      });

      this.$checkBtn.on("click", function (e) {
        e.preventDefault();
        self.check($inputs);
      })
    }

    check($inputs) {
      if (this._isCorrect($inputs)) {
        let self = this;
        this._updateOrder();
        this.updateProgress();
        this.$checkBtn.addClass("btn-success");
        setTimeout(function () {
          self.$currentCard.hide();
          self.showNext();
        }, 1000);
      } else {
        console.log("not correct");
      }
    }

    updateProgress() {
      this.$progressBar.width(`${parseInt(100 *(1 - this.order.length/this.count))}%`);
    }

    resetProgress() {
      this.storage.clear();
      w.location.reload(true);
    }


    _isCorrect($inputs) {
      let self = this,
          results = [];

      $inputs.each(function (index, el) {
        let $input = $(el),
            $tip = $($input.data("tip")),
            value = el.value.trim(),
            answer = $input.data('answer').trim(),
            result = value == answer;
        $input.removeClass("is-valid");
        $input.removeClass("is-invalid");
        $input.removeClass("tipped");
        $tip.removeClass("shown");
        $input.addClass(result ? "is-valid" : "is-invalid");
        if (!result) {
          $tip.addClass("shown");
        }
        results.push(result)
      });

      return results.every((res) => {return res == true});
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
